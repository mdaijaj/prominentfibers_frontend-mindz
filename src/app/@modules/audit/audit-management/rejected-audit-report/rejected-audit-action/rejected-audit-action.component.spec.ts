import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RejectedAuditActionComponent } from './rejected-audit-action.component';

describe('RejectedAuditActionComponent', () => {
  let component: RejectedAuditActionComponent;
  let fixture: ComponentFixture<RejectedAuditActionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RejectedAuditActionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RejectedAuditActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
