import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvancePaymentActionComponent } from './advance-payment-action.component';

describe('AdvancePaymentActionComponent', () => {
  let component: AdvancePaymentActionComponent;
  let fixture: ComponentFixture<AdvancePaymentActionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdvancePaymentActionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdvancePaymentActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
