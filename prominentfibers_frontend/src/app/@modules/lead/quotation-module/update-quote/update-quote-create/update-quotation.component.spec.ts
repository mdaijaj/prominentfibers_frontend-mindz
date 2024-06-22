import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateQuotationComponent } from './update-quotation.component';

describe('UpdateQuotationComponent', () => {
  let component: UpdateQuotationComponent;
  let fixture: ComponentFixture<UpdateQuotationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateQuotationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateQuotationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
