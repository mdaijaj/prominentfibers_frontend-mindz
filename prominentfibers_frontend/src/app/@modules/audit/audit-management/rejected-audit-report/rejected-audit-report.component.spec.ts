import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RejectedAuditReportComponent } from './rejected-audit-report.component';

describe('RejectedAuditReportComponent', () => {
  let component: RejectedAuditReportComponent;
  let fixture: ComponentFixture<RejectedAuditReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RejectedAuditReportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RejectedAuditReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
