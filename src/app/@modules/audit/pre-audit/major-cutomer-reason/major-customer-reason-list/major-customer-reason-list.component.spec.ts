import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MajorCustomerReasonListComponent } from './major-customer-reason-list.component';

describe('MajorCustomerReasonListComponent', () => {
  let component: MajorCustomerReasonListComponent;
  let fixture: ComponentFixture<MajorCustomerReasonListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MajorCustomerReasonListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MajorCustomerReasonListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
