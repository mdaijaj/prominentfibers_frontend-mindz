import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MakePaymentCreateComponent } from './make-payment-create.component';

describe('MakePaymentCreateComponent', () => {
  let component: MakePaymentCreateComponent;
  let fixture: ComponentFixture<MakePaymentCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MakePaymentCreateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MakePaymentCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
