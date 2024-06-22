import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateProformaInvoiceComponent } from './update-proforma-invoice.component';

describe('UpdateProformaInvoiceComponent', () => {
  let component: UpdateProformaInvoiceComponent;
  let fixture: ComponentFixture<UpdateProformaInvoiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateProformaInvoiceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateProformaInvoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
