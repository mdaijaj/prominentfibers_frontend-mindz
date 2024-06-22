import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyExpenseComponent } from './my-expenses.component';

describe('MyExpenseComponent', () => {
  let component: MyExpenseComponent;
  let fixture: ComponentFixture<MyExpenseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyExpenseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyExpenseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
