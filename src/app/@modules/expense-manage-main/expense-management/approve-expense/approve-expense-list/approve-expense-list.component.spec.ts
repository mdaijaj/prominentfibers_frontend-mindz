import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApproveExpenseComponent } from './approve-expense-list.component';

describe('ApproveExpenseComponent', () => {
  let component: ApproveExpenseComponent;
  let fixture: ComponentFixture<ApproveExpenseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApproveExpenseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApproveExpenseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
