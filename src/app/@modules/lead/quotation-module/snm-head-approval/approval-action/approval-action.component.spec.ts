import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApprovalActionComponent } from './approval-action.component';

describe('ApprovalActionComponent', () => {
  let component: ApprovalActionComponent;
  let fixture: ComponentFixture<ApprovalActionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApprovalActionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApprovalActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
