import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { NavbarComponent } from './navbar.component';
import { NavbarProfileComponent } from './navbar-profile/navbar-profile.component';
import { SocialNetworksComponent } from './social-networks/social-networks.component';
import { NavItemsService } from '../common/nav-items.service';
import { Observable, throwError, of } from 'rxjs';


describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;
  let navService: NavItemsService;
  let spy: jasmine.Spy;
  const mockMenuList = [
    {
      id: 'upcoming-tasks',
      title: 'upcoming tasks',
      current: true,
      router: '/profile',
      rightMenu: false,
      burgerMenu: true,
      hr: 'hr',
      dev: 'developer'
    },
    {
      id: 'issues',
      title: 'issues',
      current: false,
      router: '',
      rightMenu: false,
      burgerMenu: true,
      hr: '',
      dev: 'developer'
    },
    {
      id: 'contact-info',
      title: 'contact info',
      current: false,
      router: 'contact-info',
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
      router: 'my-profile',
      rightMenu: true,
      burgerMenu: true,
      hr: 'hr',
      dev: 'developer'
    },
    {
      id: 'edit-profile',
      title: 'edit profile',
      current: false,
      router: '',
      rightMenu: true,
      burgerMenu: false,
      hr: 'hr',
      dev: ''
    },
    {
      id: 'create-user',
      title: 'create user',
      current: false,
      router: 'create-user',
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
        SocialNetworksComponent
      ],
      providers: [NavItemsService]
    })
      .compileComponents()
      .catch(err => throwError(new Error(err)));
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    navService = fixture.debugElement.injector.get(NavItemsService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component)
      .toBeTruthy()
      .catch(err => throwError(new Error(err)));
  });

  it(`should set menuList`, () => {
    spy = spyOn(NavItemsService.prototype, 'getNavList').and
      .returnValue(Observable.of(mockMenuList));
    expect(component.menuList)
      .toEqual(mockMenuList)
      .catch(err => throwError(new Error(err)));
  });

  it('should change property active to false on window scroll', () => {
    window.dispatchEvent(new Event('scroll'));
    expect(component.active)
      .toBe(false)
      .catch(err => throwError(new Error(err)));
  });

  it(`should return item id`, () => {
    expect(component.trackById(1, mockMenuList[0]))
      .toEqual('upcoming-tasks');
  });
});
