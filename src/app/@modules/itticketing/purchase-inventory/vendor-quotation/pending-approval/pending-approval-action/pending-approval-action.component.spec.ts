import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingApprovalActionComponent } from './pending-approval-action.component';

describe('PendingApprovalActionComponent', () => {
  let component: PendingApprovalActionComponent;
  let fixture: ComponentFixture<PendingApprovalActionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PendingApprovalActionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PendingApprovalActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
