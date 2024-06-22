import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaySlipDilogComponent } from './pay-slip-dilog.component';

describe('PaySlipDilogComponent', () => {
  let component: PaySlipDilogComponent;
  let fixture: ComponentFixture<PaySlipDilogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaySlipDilogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaySlipDilogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
