import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EvaluationSummaryComponent } from './evaluation-summary.component';

describe('EvaluationSummaryComponent', () => {
  let component: EvaluationSummaryComponent;
  let fixture: ComponentFixture<EvaluationSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EvaluationSummaryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EvaluationSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
