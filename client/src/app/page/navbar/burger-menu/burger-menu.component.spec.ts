import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Observable } from 'rxjs';

import { BurgerMenuComponent } from './burger-menu.component';
import { MenuItemComponent } from './menu-item/menu-item.component';
import { SocialNetworksComponent } from '../social-networks/social-networks.component';

describe('BurgerMenuComponent', () => {
  let component: BurgerMenuComponent;
  let fixture: ComponentFixture<BurgerMenuComponent>;

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
      burgerMenu: true,
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
      declarations: [
        BurgerMenuComponent,
        MenuItemComponent,
        SocialNetworksComponent
      ],
      imports: [
        RouterTestingModule
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BurgerMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

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

  it(`should return item id`, () => {
    expect(component.trackById(0, mockMenuList[0]))
      .toEqual('upcoming-tasksfalse');
  });
});
