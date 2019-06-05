import { fakeAsync, async, ComponentFixture, getTestBed, TestBed, inject, tick } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { HttpClientModule } from '@angular/common/http';
import { switchMap, map } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { RouterTestingModule } from '@angular/router/testing';
import { NavbarProfileComponent } from './navbar-profile.component';
import { NavItemsService } from '../../common/nav-items.service';
import { UserService } from '../../../common/services/user.service';
import { MenuItemComponent } from '../burger-menu/menu-item/menu-item.component';

describe('NavbarProfileComponent', () => {
  let component: NavbarProfileComponent;
  let fixture: ComponentFixture<NavbarProfileComponent>;
  let navItemsService: NavItemsService;
  let userService: UserService;
  const mockMenuList = [
    {
      id: 'upcoming-tasks',
      title: 'upcoming tasks',
      current: false,
      router: '/profile/upcoming-tasks',
      rightMenu: false,
      burgerMenu: true,
      hr: 'hr',
      dev: ''
    },
    {
      id: 'issues',
      title: 'issues',
      current: false,
      router: '/profile/upcoming-tasks',
      rightMenu: false,
      burgerMenu: true,
      hr: '',
      dev: 'developer'
    },
    {
      id: 'upcoming-dates',
      title: 'upcoming dates',
      current: false,
      router: '/profile/upcoming-dates',
      rightMenu: false,
      burgerMenu: true,
      hr: 'hr',
      dev: 'developer'
    },
    {
      id: 'contact-info',
      title: 'contact info',
      current: false,
      router: '/profile/contact-info',
      rightMenu: false,
      burgerMenu: true,
      hr: 'hr',
      dev: 'developer'
    },
    {
      id: 'log-out',
      title: 'log out',
      current: false,
      router: '',
      rightMenu: true,
      burgerMenu: false,
      hr: 'hr',
      dev: 'developer',
      logout: true
    },
    {
      id: 'my-profile',
      title: 'my profile',
      current: false,
      router: '/profile/my-profile',
      rightMenu: true,
      burgerMenu: true,
      hr: 'hr',
      dev: 'developer'
    },
    {
      id: 'edit-profile',
      title: 'edit profile',
      current: false,
      router: '/profile/edit-user/:id',
      rightMenu: true,
      burgerMenu: false,
      hr: 'hr',
      dev: ''
    },
    {
      id: 'create-user',
      title: 'create user',
      current: false,
      router: '/profile/create-user',
      rightMenu: false,
      burgerMenu: true,
      hr: 'hr',
      dev: ''
    }
  ];



  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientModule,
        HttpClientTestingModule
      ],
      declarations: [
        NavbarProfileComponent,
        MenuItemComponent
      ],
      providers: [
        UserService,
        NavItemsService
      ]
    })
      .compileComponents()
  }));

  beforeEach(async(() => {
    fixture = TestBed.createComponent(NavbarProfileComponent);
    component = fixture.componentInstance;
    navItemsService = fixture.debugElement.injector.get(NavItemsService);
    userService = fixture.debugElement.injector.get(UserService);
    component.menuList = mockMenuList;
    fixture.detectChanges();
  }));


  it('should create', () => {
    expect(component)
      .toBeTruthy();
  });

  it(`should be inject service, shouldn't get navites list if note async`, () => {
    jasmine.createSpy('getNavList').and
      .returnValue(Observable.of(mockMenuList));
    expect(mockMenuList)
      .toEqual(mockMenuList);
    fixture.detectChanges();
  });

});
