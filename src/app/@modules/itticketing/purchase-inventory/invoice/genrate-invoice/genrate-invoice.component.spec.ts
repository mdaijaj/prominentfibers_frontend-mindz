import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenrateInvoiceComponent } from './genrate-invoice.component';

describe('GenrateInvoiceComponent', () => {
  let component: GenrateInvoiceComponent;
  let fixture: ComponentFixture<GenrateInvoiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GenrateInvoiceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GenrateInvoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
