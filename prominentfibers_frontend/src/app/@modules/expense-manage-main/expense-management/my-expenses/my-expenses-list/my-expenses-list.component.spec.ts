import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyExpenseListComponent } from './my-expenses-list.component';

describe('MyExpenseListComponent', () => {
  let component: MyExpenseListComponent;
  let fixture: ComponentFixture<MyExpenseListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyExpenseListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyExpenseListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
