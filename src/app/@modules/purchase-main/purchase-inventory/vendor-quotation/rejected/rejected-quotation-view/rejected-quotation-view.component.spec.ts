import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RejectedQuotationViewComponent } from './rejected-quotation-view.component';

describe('RejectedQuotationViewComponent', () => {
  let component: RejectedQuotationViewComponent;
  let fixture: ComponentFixture<RejectedQuotationViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RejectedQuotationViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RejectedQuotationViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
