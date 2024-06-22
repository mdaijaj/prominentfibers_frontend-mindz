import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SendLinkVendorComponent } from './send-link-vendor.component';

describe('SendLinkVendorComponent', () => {
  let component: SendLinkVendorComponent;
  let fixture: ComponentFixture<SendLinkVendorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SendLinkVendorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SendLinkVendorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
