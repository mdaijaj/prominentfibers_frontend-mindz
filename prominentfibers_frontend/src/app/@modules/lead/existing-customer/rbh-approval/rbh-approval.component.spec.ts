import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RbhApprovalComponent } from './rbh-approval.component';

describe('RbhApprovalComponent', () => {
  let component: RbhApprovalComponent;
  let fixture: ComponentFixture<RbhApprovalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RbhApprovalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RbhApprovalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
