import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplyLeavePopupComponent } from './apply-leave-popup.component';

describe('ApplyLeavePopupComponent', () => {
  let component: ApplyLeavePopupComponent;
  let fixture: ComponentFixture<ApplyLeavePopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApplyLeavePopupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApplyLeavePopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
