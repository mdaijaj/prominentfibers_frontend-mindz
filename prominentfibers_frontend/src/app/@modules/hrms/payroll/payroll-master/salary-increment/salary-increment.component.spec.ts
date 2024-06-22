import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalaryIncrementComponent } from './salary-increment.component';

describe('SalaryIncrementComponent', () => {
  let component: SalaryIncrementComponent;
  let fixture: ComponentFixture<SalaryIncrementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SalaryIncrementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SalaryIncrementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
