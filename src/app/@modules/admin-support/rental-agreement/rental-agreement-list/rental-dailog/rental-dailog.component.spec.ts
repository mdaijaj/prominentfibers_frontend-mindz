import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RentalDailogComponent } from './rental-dailog.component';

describe('RentalDailogComponent', () => {
  let component: RentalDailogComponent;
  let fixture: ComponentFixture<RentalDailogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RentalDailogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RentalDailogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
