import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateMyExpenseComponent } from './update-my-expense.component';

describe('UpdateMyExpenseComponent', () => {
  let component: UpdateMyExpenseComponent;
  let fixture: ComponentFixture<UpdateMyExpenseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateMyExpenseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateMyExpenseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
