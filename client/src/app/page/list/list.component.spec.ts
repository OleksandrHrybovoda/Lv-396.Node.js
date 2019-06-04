import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';

import { ListComponent } from './list.component';
import { AccordionComponent } from './accordion/accordion.component';
import { ItemComponent } from './accordion/item/item.component';
import { CommentModalComponent } from '../comment-modal/comment-modal.component';
import { ModalComponent } from '../modal/modal.component';
import { AddTaskFormComponent } from '../add-task-form/add-task-form.component';
import { DropdownFilterComponent } from '../filter/dropdown-filter/dropdown-filter.component';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { ModalModule } from 'ngx-bootstrap/modal';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

describe('ListComponent', () => {
  let component: ListComponent;
  let fixture: ComponentFixture<ListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AccordionComponent,
        ListComponent,
        ItemComponent,
        CommentModalComponent,
        ModalComponent,
        AddTaskFormComponent,
        DropdownFilterComponent,
      ],
      imports: [
        AccordionModule.forRoot(),
        ModalModule.forRoot(),
        FormsModule,
        ReactiveFormsModule,
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component)
      .toBeTruthy();
  });
});
