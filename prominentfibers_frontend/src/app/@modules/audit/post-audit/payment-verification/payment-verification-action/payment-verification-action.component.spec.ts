import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentVerificationActionComponent } from './payment-verification-action.component';

describe('PaymentVerificationActionComponent', () => {
  let component: PaymentVerificationActionComponent;
  let fixture: ComponentFixture<PaymentVerificationActionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaymentVerificationActionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaymentVerificationActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
