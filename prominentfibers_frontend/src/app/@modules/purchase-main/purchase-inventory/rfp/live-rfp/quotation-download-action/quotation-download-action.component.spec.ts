import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuotationDownloadActionComponent } from './quotation-download-action.component';

describe('QuotationDownloadActionComponent', () => {
  let component: QuotationDownloadActionComponent;
  let fixture: ComponentFixture<QuotationDownloadActionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuotationDownloadActionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuotationDownloadActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
