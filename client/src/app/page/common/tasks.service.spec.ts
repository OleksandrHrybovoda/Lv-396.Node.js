import { TestBed, getTestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { TasksService } from './tasks.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { MockBackend } from '@angular/http/testing';
import { Http, ConnectionBackend, BaseRequestOptions, Response, ResponseOptions } from '@angular/http';
import { Task } from './task';
import { HttpClientModule } from '@angular/common/http';
import { api } from '../../../environments/environment';

describe('TasksService', () => {
  let injector: TestBed;
  let service: TasksService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
    providers: [TasksService],
    imports: [HttpClientModule, HttpClientTestingModule]
  });
    injector = getTestBed();
    service = injector.get(TasksService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    const service: TasksService = TestBed.get(TasksService);
    expect(service)
      .toBeTruthy();
  });

  describe('getUsersTasks()', () => {
    it('should return an Observable<Task[]>', () => {
      const mockTasks: Array<Task> = [
        {
          id: '0',
          name: 'Upcoming task name',
          excerpt: 'This content is straight in the template.',
          status: { name: 'LOW', value: 2 },
          type: { name: 'issue', value: 1 },
          date: '22/03/2019',
          author: { _id: '1', firstName: 'Alex', lastName: 'Somename' },
          content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod ' +
            'tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ' +
            'ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis',
          assignTo: 'ALEX1',
          reassigned: 'UseerId',
          resolvedByAuthor: false,
          resolvedByPerformer: false,
        },
        {
          id: '1',
          name: 'Upcoming task name2',
          excerpt: 'This content is straight in the template2.',
          status: { name: 'HIGHT', value: 0 },
          type: { name: 'issue', value: 1 },
          date: '23/03/2019',
          author: { _id: '1', firstName: 'Alex', lastName: 'Somename' },
          content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod ' +
            'tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ' +
            'ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis',
          assignTo: 'ALEX1',
          reassigned: 'UseerId',
          resolvedByAuthor: false,
          resolvedByPerformer: false,
        },
        {
          id: '2',
          name: 'Upcoming task name3',
          excerpt: 'This content is straight in the template3.',
          status: { name: 'LOW', value: 2 },
          type: { name: 'task', value: 0 },
          date: '24/03/2019',
          author: { _id: '1', firstName: 'Alex', lastName: 'Somename' },
          content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor ' +
            'incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud ' +
            'exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis',
          assignTo: 'ALEX1',
          reassigned: 'UseerId',
          resolvedByAuthor: false,
          resolvedByPerformer: false,
        },
        {
          id: '3',
          name: 'Upcoming task name4',
          excerpt: 'This content is straight in the template4.',
          status: { name: 'NORMAL', value: 1 },
          type: { name: 'task', value: 0 },
          date: '25/03/2019',
          author: { _id: '1', firstName: 'Alex', lastName: 'Somename' },
          content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor ' +
            'incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud ' +
            'exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis',
          assignTo: 'ALEX1',
          reassigned: 'UseerId',
          resolvedByAuthor: false,
          resolvedByPerformer: false,
        },
        {
          id: '4',
          name: 'Upcoming task name5',
          excerpt: 'This content is straight in the template5.',
          status: { name: 'LOW', value: 2 },
          type: { name: 'task', value: 0 },
          date: '26/03/2019',
          author: { _id: '1', firstName: 'Alex', lastName: 'Somename' },
          content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor ' +
            'incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud ' +
            'exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis',
          assignTo: 'ALEX1',
          reassigned: 'UseerId',
          resolvedByAuthor: false,
          resolvedByPerformer: false,
        }];

      service.getUserTasks('1')
        .subscribe(tasks => {
        expect(tasks.length)
          .toBe(5);
        expect(tasks)
          .toEqual(mockTasks);
      });

      const req = httpMock.expectOne(`${api}issues?userId=1`);
      expect(req.request.method)
        .toBe('GET');
      req.flush(mockTasks);
    });
  });
});


