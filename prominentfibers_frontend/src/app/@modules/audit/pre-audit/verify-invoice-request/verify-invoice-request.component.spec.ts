import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerifyInvoiceRequestComponent } from './verify-invoice-request.component';

describe('VerifyInvoiceRequestComponent', () => {
  let component: VerifyInvoiceRequestComponent;
  let fixture: ComponentFixture<VerifyInvoiceRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerifyInvoiceRequestComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VerifyInvoiceRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
