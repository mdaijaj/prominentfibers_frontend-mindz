import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpPaymentDetalsComponent } from './emp-payment-detals.component';

describe('EmpPaymentDetalsComponent', () => {
  let component: EmpPaymentDetalsComponent;
  let fixture: ComponentFixture<EmpPaymentDetalsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmpPaymentDetalsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmpPaymentDetalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
