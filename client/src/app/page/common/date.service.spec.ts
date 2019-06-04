import { TestBed } from '@angular/core/testing';

import { expect } from '@angular/core/testing/src/testing_internal';
import { DateService } from './date.service';
import { describe } from 'selenium-webdriver/testing';

describe('DateService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DateService = TestBed.get(DateService);
    expect(service)
      .toBeTruthy();
  });
});
