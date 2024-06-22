import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneratInvoiceActionComponent } from './generat-invoice-action.component';

describe('GeneratInvoiceActionComponent', () => {
  let component: GeneratInvoiceActionComponent;
  let fixture: ComponentFixture<GeneratInvoiceActionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GeneratInvoiceActionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GeneratInvoiceActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
