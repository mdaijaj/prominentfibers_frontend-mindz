import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeSalaryComponent } from './employee-salary.component';
import { SalaryActionComponent } from './salary-action/salary-action.component';
import { EmployeeConfigureComponent } from './employee-configure/employee-configure.component';
import { CheckComponent } from './check/check.component';

const routes: Routes = [
  {path:'', component:EmployeeSalaryComponent},
  {path:'salary-action', component:SalaryActionComponent},
  {path:'check_dummy', component:CheckComponent},
  {path:'employee-configure', component:EmployeeConfigureComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeeSalaryRoutingModule { 
}
