import { TestBed } from '@angular/core/testing';

import { QualityManagementService } from './quality-management.service';

describe('QualityManagementService', () => {
  let service: QualityManagementService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QualityManagementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
