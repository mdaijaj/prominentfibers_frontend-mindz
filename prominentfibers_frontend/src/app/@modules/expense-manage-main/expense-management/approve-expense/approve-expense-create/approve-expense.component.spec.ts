import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApproveExpenseCreateComponent } from './approve-expense.component';

describe('ApproveExpenseCreateComponent', () => {
  let component: ApproveExpenseCreateComponent;
  let fixture: ComponentFixture<ApproveExpenseCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApproveExpenseCreateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApproveExpenseCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
