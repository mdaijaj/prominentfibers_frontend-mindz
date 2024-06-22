import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentVerificationCheckComponent } from './payment-verification-check.component';

describe('PaymentVerificationCheckComponent', () => {
  let component: PaymentVerificationCheckComponent;
  let fixture: ComponentFixture<PaymentVerificationCheckComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaymentVerificationCheckComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaymentVerificationCheckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
