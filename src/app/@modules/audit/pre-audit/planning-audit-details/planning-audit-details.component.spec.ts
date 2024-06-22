import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanningAuditDetailsComponent } from './planning-audit-details.component';

describe('PlanningAuditDetailsComponent', () => {
  let component: PlanningAuditDetailsComponent;
  let fixture: ComponentFixture<PlanningAuditDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlanningAuditDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlanningAuditDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
