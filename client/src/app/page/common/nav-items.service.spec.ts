import { TestBed, fakeAsync, inject, async } from '@angular/core/testing';
import { NavItemsService } from './nav-items.service';

const mockNavItemsList = [
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
const link = {
  id: 'create-user',
  title: 'create user',
  current: false,
  router: 'create-user',
  rightMenu: false,
  burgerMenu: true,
  hr: 'hr',
  dev: ''
};
const userType = 'hr';
const menu = 'burgerMenu';

describe('SocialNetworkService', () => {
  beforeEach(async(() => TestBed.configureTestingModule({})));

  it('should be created', () => {
    const service: NavItemsService = TestBed.get(NavItemsService);
    expect(service)
      .toBeTruthy();
  });

  it('should return items list', fakeAsync(inject([NavItemsService], (service: NavItemsService) => {
    service.getNavList()
      .subscribe(list => {
        expect(list)
          .toEqual(list);
      });
  })));

  it(`must check to which menu the item belongs, and return true \ false`, fakeAsync(inject([NavItemsService], (service: NavItemsService) => {
    service.checkLink(link, userType, menu);
    expect(true);
  })));

  it(`should return item list were in item with router = 'upcoming-tasks' 2 property current = true`, fakeAsync(inject([NavItemsService], (service: NavItemsService) => {
    service.currentRouter('http://localhost:4200/profile/upcoming-tasks')
      .subscribe(list => {
        expect(list)
          .toEqual(mockNavItemsList);
      });
  })));

});
