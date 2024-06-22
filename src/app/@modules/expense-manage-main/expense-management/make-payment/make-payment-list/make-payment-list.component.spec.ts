import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MakePaymentListComponent } from './make-payment-list.component';

describe('MakePaymentListComponent', () => {
  let component: MakePaymentListComponent;
  let fixture: ComponentFixture<MakePaymentListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MakePaymentListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MakePaymentListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
