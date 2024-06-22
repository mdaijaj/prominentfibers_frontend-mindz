import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DraftMyExpenseComponent } from './draft-my-expense.component';

describe('DraftMyExpenseComponent', () => {
  let component: DraftMyExpenseComponent;
  let fixture: ComponentFixture<DraftMyExpenseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DraftMyExpenseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DraftMyExpenseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
