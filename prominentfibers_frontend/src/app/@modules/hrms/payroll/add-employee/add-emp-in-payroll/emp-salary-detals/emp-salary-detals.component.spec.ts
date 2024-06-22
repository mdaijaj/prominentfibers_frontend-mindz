import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpSalaryDetalsComponent } from './emp-salary-detals.component';

describe('EmpSalaryDetalsComponent', () => {
  let component: EmpSalaryDetalsComponent;
  let fixture: ComponentFixture<EmpSalaryDetalsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmpSalaryDetalsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmpSalaryDetalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
