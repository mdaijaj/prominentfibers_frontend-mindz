import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorQuotationComponent } from './vendor-quotation.component';

describe('VendorQuotationComponent', () => {
  let component: VendorQuotationComponent;
  let fixture: ComponentFixture<VendorQuotationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VendorQuotationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VendorQuotationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
