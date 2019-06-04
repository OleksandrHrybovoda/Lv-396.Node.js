import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccordionModule } from 'ngx-bootstrap/accordion';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ItemComponent } from './item/item.component';
import { AccordionComponent } from './accordion.component';
import { ModalComponent } from '../../modal/modal.component';
import { AddTaskFormComponent } from '../../add-task-form/add-task-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DropdownFilterComponent } from '../../filter/dropdown-filter/dropdown-filter.component';
import { CommentModalComponent } from '../../comment-modal/comment-modal.component';

describe('AccordionComponent', () => {
  let component: AccordionComponent;
  let fixture: ComponentFixture<AccordionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        AccordionModule.forRoot(),
        ModalModule.forRoot(),
        FormsModule,
        ReactiveFormsModule
        ],
      declarations: [
        AccordionComponent,
        ModalComponent,
        ItemComponent,
        AddTaskFormComponent,
        DropdownFilterComponent,
        CommentModalComponent
        ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccordionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component)
      .toBeTruthy();
  });
});
