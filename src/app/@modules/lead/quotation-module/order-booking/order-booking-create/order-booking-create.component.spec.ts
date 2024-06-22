import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderBookingCreateComponent } from './order-booking-create.component';

describe('OrderBookingCreateComponent', () => {
  let component: OrderBookingCreateComponent;
  let fixture: ComponentFixture<OrderBookingCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderBookingCreateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrderBookingCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
