import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvancePaymentCreateComponent } from './advance-payment-create.component';

describe('AdvancePaymentCreateComponent', () => {
  let component: AdvancePaymentCreateComponent;
  let fixture: ComponentFixture<AdvancePaymentCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdvancePaymentCreateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdvancePaymentCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
