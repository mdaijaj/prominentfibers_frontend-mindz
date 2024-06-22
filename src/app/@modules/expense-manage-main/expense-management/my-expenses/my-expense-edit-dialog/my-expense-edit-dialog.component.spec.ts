import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyExpenseEditDialogComponent } from './my-expense-edit-dialog.component';

describe('MyExpenseEditDialogComponent', () => {
  let component: MyExpenseEditDialogComponent;
  let fixture: ComponentFixture<MyExpenseEditDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyExpenseEditDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyExpenseEditDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
