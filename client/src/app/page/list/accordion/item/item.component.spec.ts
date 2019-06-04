import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccordionModule } from 'ngx-bootstrap/accordion';
import { ModalModule } from 'ngx-bootstrap/modal';

import { ItemComponent } from './item.component';
import { ModalComponent } from '../../../modal/modal.component';
import { AccordionComponent } from '../accordion.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { CommentModalComponent } from '../../../comment-modal/comment-modal.component';
import { AddTaskFormComponent } from '../../../add-task-form/add-task-form.component';
import { DropdownFilterComponent } from '../../../filter/dropdown-filter/dropdown-filter.component';
import { ToastrModule } from 'ngx-toastr';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TasksService } from '../../../common/tasks.service';
import { UserService } from '../../../../common/services/user.service';

describe('ItemComponent', () => {
  let component: ItemComponent;
  let fixture: ComponentFixture<ItemComponent>;

  const tasksServiceMock = {
    getUserTasks: () => {}
  };

  const userServiceMock = {
    getUser: () => {}
  };


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        AccordionModule.forRoot(),
        ModalModule.forRoot(),
        ReactiveFormsModule,
        FormsModule,
        HttpClientTestingModule,
        RouterTestingModule,
        ToastrModule.forRoot(),
        ],
      declarations: [
        ModalComponent,
        AccordionComponent,
        ItemComponent,
        AddTaskFormComponent,
        DropdownFilterComponent,
        CommentModalComponent
        ],
      providers: [ {provide: TasksService, useValue: tasksServiceMock},
                   {provide: UserService, useValue: userServiceMock},
                   RouterTestingModule,
                 ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component)
      .toBeTruthy();
  });
});
