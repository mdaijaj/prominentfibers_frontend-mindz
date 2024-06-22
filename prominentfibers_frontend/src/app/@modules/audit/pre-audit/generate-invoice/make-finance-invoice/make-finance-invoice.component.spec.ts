import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MakeFinanceInvoiceComponent } from './make-finance-invoice.component';

describe('MakeFinanceInvoiceComponent', () => {
  let component: MakeFinanceInvoiceComponent;
  let fixture: ComponentFixture<MakeFinanceInvoiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MakeFinanceInvoiceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MakeFinanceInvoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
