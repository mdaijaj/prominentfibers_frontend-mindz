import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BillingBranchListComponent } from './billing-branch-list.component';

describe('BillingBranchListComponent', () => {
  let component: BillingBranchListComponent;
  let fixture: ComponentFixture<BillingBranchListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BillingBranchListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BillingBranchListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
