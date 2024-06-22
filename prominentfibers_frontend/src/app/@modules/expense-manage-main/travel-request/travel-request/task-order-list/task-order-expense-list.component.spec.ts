import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskOrderExpenseListComponent } from './task-order-expense-list.component';

describe('TaskOrderExpenseListComponent', () => {
  let component: TaskOrderExpenseListComponent;
  let fixture: ComponentFixture<TaskOrderExpenseListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TaskOrderExpenseListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaskOrderExpenseListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
