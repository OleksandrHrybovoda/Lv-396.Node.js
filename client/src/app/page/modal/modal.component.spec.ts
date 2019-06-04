import { async, ComponentFixture, TestBed, fakeAsync, inject } from '@angular/core/testing';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ModalComponent } from './modal.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { DropdownFilterComponent } from '../filter/dropdown-filter/dropdown-filter.component';
import { AddTaskFormComponent } from '../add-task-form/add-task-form.component';
import { FILTERS } from '../common/config';
import { TasksService } from '../common/tasks.service';
import { UserService } from '../../common/services/user.service';
import { Observable } from 'rxjs';
import { FiltersService } from '../common/filters.service';
import { filter } from 'rxjs/operators';
import { FilterReturnService } from '../common/filter-return.service';

describe('ModalComponent', () => {
  let component: ModalComponent;
  let fixture: ComponentFixture<ModalComponent>;
  let item: any;
  item = {
    id: '0',
    name: 'Upcoming task name',
    excerpt: 'This content is straight in the template.',
    status: { name: 'LOW', value: 2 },
    type: { name: 'issue', value: 1 },
    date: '22/03/2019',
    author: 'Alex Somename',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod ' +
      'tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ' +
      'ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis',
  };

  const filterReturnServiceMock = {
    createFilterByName: () => {
      const filters = {
        defaultValue: 1,
        id: 1,
        isCalendar: false,
        name: 'status',
        options: [
                  {name: 'High', value: 0},
                  {name: 'Normal', value: 1},
                  {name: 'Low', value: 2}
                 ]
      };

      return filters;
    }
  };

  const tasksServiceMock = {
    getUserTasks: () => {}
  };

  class userServiceMock {
    getAllHr() {
      return Observable.empty();
    }
    getUser() {
      return Observable.empty();
    }
  }

  const filterServiceMock = {
    getFilters: () => {}
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ModalModule.forRoot(),
        ReactiveFormsModule,
        FormsModule,
       ],
      declarations: [
        ModalComponent,
        DropdownFilterComponent,
        AddTaskFormComponent
      ],
      providers: [
                  {provide: FILTERS, useValue: filterReturnServiceMock},
                  {provide: TasksService, useValue: tasksServiceMock},
                  {provide: UserService, useClass: userServiceMock},
                  {provide: FiltersService, useValue: filterServiceMock}
                 ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalComponent);
    component = fixture.componentInstance;
    component.item = item;
    fixture.detectChanges();
  });

  it('should create', () => {
    fakeAsync(
      inject([FilterReturnService],
      (filterMock: FilterReturnService) => {
    expect(component)
      .toBeTruthy();
  }));
});
});
