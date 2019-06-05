import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';
import { NavbarComponent } from './navbar.component';
import { NavbarProfileComponent } from './navbar-profile/navbar-profile.component';
import { SocialNetworksComponent } from './social-networks/social-networks.component';
import { NavItemsService } from '../common/nav-items.service';
import { MenuItemComponent } from './burger-menu/menu-item/menu-item.component';
import { BurgerMenuComponent } from './burger-menu/burger-menu.component';



describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;
  let navService: NavItemsService;
  let spy: jasmine.Spy;
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
      imports: [
        RouterTestingModule,
        HttpClientModule
      ],
      declarations: [
        NavbarProfileComponent,
        NavbarComponent,
        SocialNetworksComponent,
        MenuItemComponent,
        BurgerMenuComponent
      ],
      providers: [NavItemsService]
    })
      .compileComponents()
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    navService = fixture.debugElement.injector.get(NavItemsService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component)
      .toBeTruthy();
  });

  it(`should set menuList`, () => {
    spy = spyOn(NavItemsService.prototype, 'getNavList').and
      .returnValue(Observable.of(mockMenuList));
    expect(mockMenuList)
      .toEqual(mockMenuList);
  });

  it('should change property active to false on window scroll', () => {
    window.dispatchEvent(new Event('scroll'));
    expect(component.active)
      .toBe(false);
  });

  it(`should return item id`, () => {
    expect(component.trackById(1, mockMenuList[0]))
      .toEqual('upcoming-tasks');
  });
});
