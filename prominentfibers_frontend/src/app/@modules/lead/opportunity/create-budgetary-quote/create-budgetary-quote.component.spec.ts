import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateBudgetaryQuoteComponent } from './create-budgetary-quote.component';

describe('CreateBudgetaryQuoteComponent', () => {
  let component: CreateBudgetaryQuoteComponent;
  let fixture: ComponentFixture<CreateBudgetaryQuoteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateBudgetaryQuoteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateBudgetaryQuoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
