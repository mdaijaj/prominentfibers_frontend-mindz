import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEmpInPayrollComponent } from './add-emp-in-payroll.component';

describe('AddEmpInPayrollComponent', () => {
  let component: AddEmpInPayrollComponent;
  let fixture: ComponentFixture<AddEmpInPayrollComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEmpInPayrollComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEmpInPayrollComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
