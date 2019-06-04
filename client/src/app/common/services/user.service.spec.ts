import { TestBed, getTestBed, async } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClientModule } from '@angular/common/http';
import { User, Department, Manager } from '../models/user';
import { api } from '../../../environments/environment';

import { UserService } from './user.service';

describe('UserService', () => {
  let injector: TestBed;
  let service: UserService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, HttpClientTestingModule],
      providers: [UserService]
    });
    injector = getTestBed();
    service = injector.get(UserService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    const service: UserService = TestBed.get(UserService);
    expect(service).toBeTruthy();
  });

  describe('getUsers()', () => {
    it('should return an Observable<User[]>', () => {
      const dummyUsers: Array<User> = [
        {
          watched_issues: [],
          roles: [],
          _id: '5cbb6d7ba4908a0db878c37a',
          firstName: 'Dmytro',
          lastName: 'Sobakapirat',
          position: 'Senior pomidor developer',
          email: 'sobaka-ne-vmerla@gmail.com',
          phone: '3801111111',
          photoURL: 'http://res.cloudinary.com/dd1mk/image/upload/v1555326362/hrms/avatars/iq5boujmnj2u0udtiyl7.jpg',
          type: 'dev',
          manager: {
            _id: '5c9a065b8c40cb0e8cd39d11',
            firstName: 'Skype',
            lastName: 'FileExchanger',
            position: 'Middle QA',
            email: 'dplscode@gmail.com',
            phone: '3802281488',
            contacts: [
              {
                contact_name: 'skype',
                contact_value: 'myskype'
              }
            ],
            department: new Department('', '', []),
            manager: new Manager('5cbb6d7ba4908a0db878c37a'),
          },
          teamlead: {
            photoURL: '',
            firstName: 'Skype',
            lastName: 'FileExchanger',
            position: 'Middle QA',
            email: 'dplscode@gmail.com',
            phone: '3802281488',
            contacts: [
              {
                contactName: 'skype',
                contactValue: 'myskype'
              }
            ],
            department: {_id: '5cab274ece3843324cc6d774'},
            manager: {
              contacts: [{
                contact_name: 'skype',
                contact_value: 'myskype'
              }],
              department: new Department('5cab274ece3843324cc6d774'),
              email: 'dplscode@gmail.com',
              firstName: 'Skype',
              lastName: 'FileExchanger',
              manager: new Manager('5cbb6d7ba4908a0db878c37a'),
              phone: '3802281488',
              position: 'Middle QA',
              _id: '5c9a065b8c40cb0e8cd39d11',
            },
          },
          contacts: [],
          dates: [],
          department: {
            position: [],
            _id: '5cab274ece3843324cc6d774',
            name: 'Sales '
          }
        }
      ];

      service.getAll().subscribe(users => {
        expect(users.length).toBe(1);
        expect(users).toEqual(dummyUsers);
      });

      service.getUsersOfHr().subscribe(users => {
        expect(users.length).toBe(1);
        expect(users).toEqual(dummyUsers);
      });

      const req = httpMock.expectOne(`${api}users`);
      expect(req.request.method).toBe('GET');
      req.flush(dummyUsers);
      
      const userId = service.getUserId();
      const reqUsersOfHr = httpMock.expectOne(`${api}users?hr=${userId}`);
      expect(reqUsersOfHr.request.method).toBe('GET');
      reqUsersOfHr.flush(dummyUsers);
    });
  });
});
