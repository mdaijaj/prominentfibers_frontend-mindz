import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseOrderMainComponent } from './purchase-order-main.component';

describe('PurchaseOrderMainComponent', () => {
  let component: PurchaseOrderMainComponent;
  let fixture: ComponentFixture<PurchaseOrderMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PurchaseOrderMainComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PurchaseOrderMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
