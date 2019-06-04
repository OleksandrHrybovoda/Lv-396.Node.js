import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { throwError } from 'rxjs';

import { BurgerMenuComponent } from './burger-menu.component';

describe('BurgerMenuComponent', () => {
  let component: BurgerMenuComponent;
  let fixture: ComponentFixture<BurgerMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BurgerMenuComponent]
    })
      .compileComponents()
      .catch(err => throwError(new Error(err)));
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BurgerMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component)
      .toBeTruthy()
      .catch(err => throwError(new Error(err)));
  });
});
