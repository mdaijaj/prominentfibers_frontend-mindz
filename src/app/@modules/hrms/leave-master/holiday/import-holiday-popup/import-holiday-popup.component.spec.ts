import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportHolidayPopupComponent } from './import-holiday-popup.component';

describe('ImportHolidayPopupComponent', () => {
  let component: ImportHolidayPopupComponent;
  let fixture: ComponentFixture<ImportHolidayPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImportHolidayPopupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImportHolidayPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
