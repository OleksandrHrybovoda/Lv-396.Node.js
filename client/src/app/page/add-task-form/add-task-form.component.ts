import { Component, OnInit, Inject } from '@angular/core';
import { Filter } from '../common/filter';
import { FilterOptions } from '../common/filter-options';
import { FilterReturnService } from '../common/filter-return.service';
import { FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../../common/services/user.service';
import { User } from '../../common/models/user';
import { TasksService } from '../common/tasks.service';
import { TaskCreateRequestBody } from '../common/task';
import { DURATION } from '../common/config';

@Component({
  selector: 'app-add-task-form',
  templateUrl: './add-task-form.component.html',
  styleUrls: ['./add-task-form.component.scss']
})
export class AddTaskFormComponent implements OnInit {
  filter: Filter;
  dropDownCssClassName: string;
  user: User;
  serverErrorMessage: {
    name: string,
    statusText: string,
    message: string
  };
  haveServerError: boolean;
  taskIsJustSend: boolean;
  isSuccessfullyDeleted: boolean;
  filterDefaultVal: number;
  newTaskId: string;
  addTaskForm = this.fb.group({
    taskName: [
      '',
      [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(20),
      ]
    ],
    taskSummary: [
      '',
      [
        Validators.required,
        Validators.minLength(9),
        Validators.maxLength(40)
      ],
    ],
    taskDescription: [
      '',
      Validators.maxLength(400),
    ]
  });

  get taskName(): any {
    return this.addTaskForm.get('taskName');
  }

  get taskSummary(): any {
    return this.addTaskForm.get('taskSummary');
  }

  get taskDescription(): any {
    return this.addTaskForm.get('taskDescription');
  }

  constructor(
    private readonly filterReturnService: FilterReturnService,
    private fb: FormBuilder,
    private readonly userService: UserService,
    private readonly tasksService: TasksService,
    @Inject(DURATION) private duration: number
  ) {}

  ngOnInit(): any {
    this.dropDownCssClassName = 'width-100';
    this.haveServerError = false;
    this.taskIsJustSend = false;
    this.isSuccessfullyDeleted = false;
    this.filterDefaultVal = 1;
    this.getTheFilter();
    this.userService.getUser()
      .subscribe(user => this.user = user);
  }

  getFilterVal = (i: number, data: number) => {
    this.filter.defaultValue = data;
  };

  getTheFilter(): void {
    this.filter = this.filterReturnService.createFilterByName('status', this.filterDefaultVal);
  }

  onSubmit(): void {
    const requestBody: TaskCreateRequestBody = this.getRequestBody(this.addTaskForm.value);
    this.tasksService.createTask(requestBody)
      .subscribe((result: {id: string}) => this.successHandling(result.id),
        error => this.errorHandling(error)
      );
  }

  private successHandling(taskId: string): void {
    this.taskIsJustSend = true;
    this.addTaskForm.reset();
    this.filter.defaultValue = this.filterDefaultVal;
    this.newTaskId = taskId;

    setTimeout(() => {
      this.taskIsJustSend = false;
    }, this.duration);
  }

  private errorHandling(error: any): void {
    this.haveServerError = true;
    this.serverErrorMessage = {
      name: error.status,
      statusText: error.statusText,
      message: error.message
    };
    setTimeout(() => {
      this.haveServerError = false;
    }, this.duration);
  }

  private readonly getRequestBody = (formVal: any): TaskCreateRequestBody => ({
    name: formVal.taskName,
    excerpt: formVal.taskSummary,
    statusName: this.getStatusName(),
    statusValue: this.filter.defaultValue,
    typeName: 'issue',
    typeValue: 1,
    author: this.user._id,
    content: formVal.taskDescription,
    assignTo: this.user.manager._id
  });

  private readonly getStatusName = (): string => {
    const val = this.filter.defaultValue;
    const options: FilterOptions[] = this.filter.options.filter((opt: FilterOptions) => opt.value === val);

    return options[0].name;
  };

  onDelete(event: MouseEvent): void {
    event.preventDefault();
    this.tasksService.deleteTask(this.newTaskId)
      .subscribe(
        () => this.deleteIsSuccess(),
        error => this.errorHandling(error)
      );
  }

  private deleteIsSuccess(): void {
    this.taskIsJustSend = false;
    this.isSuccessfullyDeleted = true;
    setTimeout(() => {
      this.isSuccessfullyDeleted = false;
    }, this.duration);
  }

  isFieldRequired = (field: string): boolean =>
    this.isFieldTouched(field) && this.addTaskForm.get(field)
      .hasError('required');

  isFieldCorrectLength = (field: string): boolean =>
    this.isFieldTouched(field) && this.addTaskForm.get(field)
      .hasError('minlength');

  private readonly isFieldTouched = (field: string): boolean =>
    this.addTaskForm.get(field).touched || this.addTaskForm.get(field).dirty;
}