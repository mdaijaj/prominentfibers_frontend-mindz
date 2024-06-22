import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalaryIncrementListComponent } from './salary-increment-list.component';

describe('SalaryIncrementListComponent', () => {
  let component: SalaryIncrementListComponent;
  let fixture: ComponentFixture<SalaryIncrementListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SalaryIncrementListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SalaryIncrementListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
