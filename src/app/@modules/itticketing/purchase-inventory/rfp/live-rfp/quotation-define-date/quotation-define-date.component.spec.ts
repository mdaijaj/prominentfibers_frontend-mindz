import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuotationDefineDateComponent } from './quotation-define-date.component';

describe('QuotationDefineDateComponent', () => {
  let component: QuotationDefineDateComponent;
  let fixture: ComponentFixture<QuotationDefineDateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuotationDefineDateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuotationDefineDateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
