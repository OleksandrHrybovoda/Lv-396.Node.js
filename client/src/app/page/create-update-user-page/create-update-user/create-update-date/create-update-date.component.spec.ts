import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateUpdateDateComponent } from './create-update-date.component';

describe('CreateUpdateDateComponent', () => {
  let component: CreateUpdateDateComponent;
  let fixture: ComponentFixture<CreateUpdateDateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateUpdateDateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateUpdateDateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
