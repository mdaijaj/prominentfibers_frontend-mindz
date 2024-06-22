import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttendPopupComponent } from './attend-popup.component';

describe('AttendPopupComponent', () => {
  let component: AttendPopupComponent;
  let fixture: ComponentFixture<AttendPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AttendPopupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AttendPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
