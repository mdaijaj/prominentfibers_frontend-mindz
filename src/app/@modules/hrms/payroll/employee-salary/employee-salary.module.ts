import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeSalaryRoutingModule } from './employee-salary-routing.module';
import { AgGridModule } from 'ag-grid-angular';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MaterialModule } from 'src/app/@shared/material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SalaryActionComponent } from './salary-action/salary-action.component';
import { EmployeeSalaryComponent } from './employee-salary.component';
import { EmployeeConfigureComponent } from './employee-configure/employee-configure.component';
import { CheckComponent } from './check/check.component';
@NgModule({
  declarations: [
    EmployeeSalaryComponent,
    SalaryActionComponent,  
    EmployeeConfigureComponent, CheckComponent  
  ],
  imports: [
    CommonModule,
    EmployeeSalaryRoutingModule,
    AgGridModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
  ]
})
export class EmployeeSalaryModule { 

}
