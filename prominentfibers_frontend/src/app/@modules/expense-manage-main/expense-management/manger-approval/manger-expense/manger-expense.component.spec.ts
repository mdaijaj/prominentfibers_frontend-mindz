import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MangerExpenseComponent } from './manger-expense.component';

describe('MangerExpenseComponent', () => {
  let component: MangerExpenseComponent;
  let fixture: ComponentFixture<MangerExpenseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MangerExpenseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MangerExpenseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
