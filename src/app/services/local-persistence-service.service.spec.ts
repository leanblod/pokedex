import { TestBed } from '@angular/core/testing';

import { LocalPersistenceService } from './local-persistence.service';

describe('LocalPersistenceServiceService', () => {
  let service: LocalPersistenceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LocalPersistenceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
