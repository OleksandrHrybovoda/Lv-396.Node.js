import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';

import { MenuItemComponent } from './menu-item.component';
import { NavItemsService } from '../../../common/nav-items.service';
import { UserService } from '../../../../common/services/user.service'


describe('MenuItemComponent', () => {
  let component: MenuItemComponent;
  let fixture: ComponentFixture<MenuItemComponent>;

  const mockSettings = {
    type: 'burgerMenu',
    style: 'burger-menu-elem'
  };

  const mockLink = {
    id: 'create-user',
    title: 'create user',
    current: false,
    router: '/profile/create-user',
    rightMenu: false,
    burgerMenu: true,
    hr: 'hr',
    dev: ''
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientModule
      ],
      declarations: [
        MenuItemComponent
      ],
      providers: [
        NavItemsService,
        UserService
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuItemComponent);
    component = fixture.componentInstance;
    component.settings = mockSettings;
    component.link = mockLink;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component)
      .toBeTruthy();
  });
});
