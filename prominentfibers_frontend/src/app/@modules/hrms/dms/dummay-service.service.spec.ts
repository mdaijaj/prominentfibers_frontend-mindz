import { TestBed } from '@angular/core/testing';

import { DummayServiceService } from './dummay-service.service';

describe('DummayServiceService', () => {
  let service: DummayServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DummayServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
