import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainingFeedbackCreateComponent } from './training-feedback-create.component';

describe('TrainingFeedbackCreateComponent', () => {
  let component: TrainingFeedbackCreateComponent;
  let fixture: ComponentFixture<TrainingFeedbackCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrainingFeedbackCreateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrainingFeedbackCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
