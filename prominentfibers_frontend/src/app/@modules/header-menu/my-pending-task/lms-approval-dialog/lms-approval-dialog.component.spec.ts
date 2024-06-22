import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LmsApprovalDialogComponent } from './lms-approval-dialog.component';

describe('LmsApprovalDialogComponent', () => {
  let component: LmsApprovalDialogComponent;
  let fixture: ComponentFixture<LmsApprovalDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LmsApprovalDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LmsApprovalDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
