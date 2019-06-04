import { TestBed } from '@angular/core/testing';

import { CreateUpdateUserService } from './create-update-user.service';

describe('CreateUpdateUserService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CreateUpdateUserService = TestBed.get(CreateUpdateUserService);
    expect(service).toBeTruthy();
  });
});
