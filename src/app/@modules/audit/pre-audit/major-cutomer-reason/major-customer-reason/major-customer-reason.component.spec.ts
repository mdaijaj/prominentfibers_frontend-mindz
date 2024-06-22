import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MajorCustomerReasonComponent } from './major-customer-reason.component';

describe('MajorCustomerReasonComponent', () => {
  let component: MajorCustomerReasonComponent;
  let fixture: ComponentFixture<MajorCustomerReasonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MajorCustomerReasonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MajorCustomerReasonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
