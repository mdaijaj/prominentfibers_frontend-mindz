import { TestBed } from '@angular/core/testing';

import { AuditorEvaluationService } from './auditor-evaluation.service';

describe('AuditorEvaluationService', () => {
  let service: AuditorEvaluationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuditorEvaluationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
