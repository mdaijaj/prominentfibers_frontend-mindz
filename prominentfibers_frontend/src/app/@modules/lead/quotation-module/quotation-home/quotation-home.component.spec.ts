import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuotationHome } from './quotation-home.component';

describe('QuotationHome', () => {
  let component: QuotationHome;
  let fixture: ComponentFixture<QuotationHome>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuotationHome ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuotationHome);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
