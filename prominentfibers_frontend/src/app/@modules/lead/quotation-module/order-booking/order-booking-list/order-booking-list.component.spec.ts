import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderBookingListComponent } from './order-booking-list.component';

describe('OrderBookingListComponent', () => {
  let component: OrderBookingListComponent;
  let fixture: ComponentFixture<OrderBookingListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderBookingListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrderBookingListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
