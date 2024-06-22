import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseMainComponent } from './purchase-main.component';

describe('PurchaseMainComponent', () => {
  let component: PurchaseMainComponent;
  let fixture: ComponentFixture<PurchaseMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PurchaseMainComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PurchaseMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
