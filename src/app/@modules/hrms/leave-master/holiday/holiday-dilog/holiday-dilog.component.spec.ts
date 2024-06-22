import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HolidayDilogComponent } from './holiday-dilog.component';

describe('HolidayDilogComponent', () => {
  let component: HolidayDilogComponent;
  let fixture: ComponentFixture<HolidayDilogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HolidayDilogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HolidayDilogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
