import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepartmentBudgetComponent } from './department-budget.component';

describe('DepartmentBudgetComponent', () => {
  let component: DepartmentBudgetComponent;
  let fixture: ComponentFixture<DepartmentBudgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DepartmentBudgetComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DepartmentBudgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
