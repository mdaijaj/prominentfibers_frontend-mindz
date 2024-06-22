import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddEmployeeRoutingModule } from './add-employee-routing.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AgGridModule } from 'ag-grid-angular';
import { MaterialModule } from 'src/app/@shared/material/material.module';
import { EmpListComponent } from './emp-list/emp-list.component';
import { ActionComponent } from './emp-list/action/action.component';
import { AddEmpInPayrollComponent } from './add-emp-in-payroll/add-emp-in-payroll.component';
import { EmpBasicDetailsComponent } from './add-emp-in-payroll/emp-basic-details/emp-basic-details.component';
import { EmpSalaryDetalsComponent } from './add-emp-in-payroll/emp-salary-detals/emp-salary-detals.component';
import { EmpPaymentDetalsComponent } from './add-emp-in-payroll/emp-payment-detals/emp-payment-detals.component';
import { SalaryBreakupComponent } from './add-emp-in-payroll/salary-breakup/salary-breakup.component';


@NgModule({
  declarations: [
    AddEmpInPayrollComponent,
    EmpListComponent,
    ActionComponent,
    EmpBasicDetailsComponent,
    EmpSalaryDetalsComponent,
    EmpPaymentDetalsComponent,
    SalaryBreakupComponent,
  ],
  imports: [
    CommonModule,
    AddEmployeeRoutingModule,
    MaterialModule,
    AgGridModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class AddEmployeeModule { }
