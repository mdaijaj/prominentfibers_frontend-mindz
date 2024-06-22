import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaveAdjustmentComponent } from './leave-adjustment.component';

describe('LeaveAdjustmentComponent', () => {
  let component: LeaveAdjustmentComponent;
  let fixture: ComponentFixture<LeaveAdjustmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LeaveAdjustmentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LeaveAdjustmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
