import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnapprovedVendorListComponent } from './unapproved-vendor-list.component';

describe('UnapprovedVendorListComponent', () => {
  let component: UnapprovedVendorListComponent;
  let fixture: ComponentFixture<UnapprovedVendorListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UnapprovedVendorListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UnapprovedVendorListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
