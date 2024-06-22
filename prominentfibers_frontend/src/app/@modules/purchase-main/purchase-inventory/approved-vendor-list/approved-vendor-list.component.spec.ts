import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApprovedVendorListComponent } from './approved-vendor-list.component';

describe('ApprovedVendorListComponent', () => {
  let component: ApprovedVendorListComponent;
  let fixture: ComponentFixture<ApprovedVendorListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApprovedVendorListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApprovedVendorListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
