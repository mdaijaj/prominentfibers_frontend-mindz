import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpenseMangemeMainComponent } from './expense-mangeme-main.component';

describe('ExpenseMangemeMainComponent', () => {
  let component: ExpenseMangemeMainComponent;
  let fixture: ComponentFixture<ExpenseMangemeMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExpenseMangemeMainComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExpenseMangemeMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
