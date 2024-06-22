import { TestBed } from '@angular/core/testing';

import { DMSService } from './dms.service';

describe('DMSService', () => {
  let service: DMSService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DMSService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
