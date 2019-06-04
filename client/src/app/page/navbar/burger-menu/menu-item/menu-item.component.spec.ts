import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { throwError } from 'rxjs';

import { MenuItemComponent } from './menu-item.component';

describe('MenuItemComponent', () => {
  let component: MenuItemComponent;
  let fixture: ComponentFixture<MenuItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MenuItemComponent]
    })
      .compileComponents()
      .catch(err => throwError(new Error(err)));
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component)
      .toBeTruthy()
      .catch(err => throwError(new Error(err)));
  });
});
