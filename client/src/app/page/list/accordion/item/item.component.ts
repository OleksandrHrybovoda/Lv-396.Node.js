import { Component, OnInit, Input, HostListener } from '@angular/core';
import { Task } from '../../../common/task';
import { TasksService } from '../../../common/tasks.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../../../common/services/user.service';
import { User } from '../../../../common/models/user';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent implements OnInit {
  @Input() task: Task;
  user = new User();
  userId: string;
  users: User[];
  tasks: object;
  checkedResolve: boolean;
  cssClass: string;
  cssClassVisible: string;
  markResolve: boolean;
  alertMessage: string;
  unreadClass: string;
  userType: string;
  isOpen: boolean;

  constructor(private readonly router: Router,
              private readonly route: ActivatedRoute,
              private readonly userService: UserService,
              private readonly tasksService: TasksService) { }

  ngOnInit(): void {
    this.userService.takeUser
      .subscribe(user => {
        this.user = user;
        this.changeClassUnread();
    });
    this.userService.getAll()
      .subscribe(users => this.users = users);
    this.cssClass = '';
    this.isOpen = false;
    this.isOpen = this.task.isOpen;
    this.unreadClass = '';
    this.userType = this.userService.getUserType();
    this.userId = this.userService.getUserId();
  }

  openTask(): void {
    this.isOpen = true;
    this.changeClassUnread();
    this.checkedAuthorOrPerformer();
    this.taskIsWatched();
  }

  private isHr(): boolean {
    return this.userType === 'hr';
  }

  private isDev(): boolean {
    return this.userType === 'developer';
  }

  private setStyle(): void {
    this.unreadClass = this.isOpen ? 'unread-open' : 'unread';
  }

  changeClassUnread(): void {
    const condHrTasks = !this.user.watched_issues.includes(this.task.id) &&
                        this.userId !== this.task.author._id &&
                        !this.checkedAuthorOrPerformer();

    const condDevTasks = !this.task.resolvedByAuthor &&
                         this.task.resolvedByPerformer;
    if (this.isHr() && condHrTasks) {
      this.setStyle();
    }
    if (this.isDev() && condDevTasks) {
      this.setStyle();
    }
  }

  checkedAuthorOrPerformer(): boolean {
    this.checkedResolve = this.user._id === this.task.author._id ?  this.task.resolvedByAuthor : this.task.resolvedByPerformer;
    this.cssClass = this.checkedResolve ? 'hiddenMark' : '';

    return this.checkedResolve;
  }

  taskIsWatched(): void {
    if (!this.user.watched_issues.includes(this.task.id)) {
      this.tasksService.taskIsWatched(this.user._id, this.task.id)
        .subscribe(task => task);
    }
  }

  loadUser(): boolean {
    this.userService.getUser()
      .subscribe(user => this.user = user);

    return false;
  }

  selectUser(uid: string): void {
    this.router.navigate(['/profile/my-profile/', uid], { relativeTo: this.route })
      .catch(err => throwError(new Error(err)));
  }

  resolveClick(): void {
    this.tasksService.updateResolvedBy(this.user._id, this.task.id)
      .subscribe((item: any) => item);
    this.cssClass = 'hiddenMark';
    this.cssClassVisible = 'visible';
    this.markResolve = true;
    this.alertMessage = 'Your issue has been marked as resolved.';
    setTimeout(() => {
      this.markResolve = false;
    }, 3000);
  }

}
