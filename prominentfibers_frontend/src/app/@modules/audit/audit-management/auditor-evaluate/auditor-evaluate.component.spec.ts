import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuditorEvaluateComponent } from './auditor-evaluate.component';

describe('AuditorEvaluateComponent', () => {
  let component: AuditorEvaluateComponent;
  let fixture: ComponentFixture<AuditorEvaluateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuditorEvaluateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuditorEvaluateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
