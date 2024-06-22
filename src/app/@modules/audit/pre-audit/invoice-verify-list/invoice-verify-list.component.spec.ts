import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoiceVerifyListComponent } from './invoice-verify-list.component';

describe('InvoiceVerifyListComponent', () => {
  let component: InvoiceVerifyListComponent;
  let fixture: ComponentFixture<InvoiceVerifyListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InvoiceVerifyListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InvoiceVerifyListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
