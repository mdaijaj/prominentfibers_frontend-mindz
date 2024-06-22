import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmpListComponent } from './emp-list/emp-list.component';
import { AddEmpInPayrollComponent } from './add-emp-in-payroll/add-emp-in-payroll.component';
import { BasicDetailsComponent } from '../../employee-master/employee/basic-details/basic-details.component';
import { EmpBasicDetailsComponent } from './add-emp-in-payroll/emp-basic-details/emp-basic-details.component';
import { EmpSalaryDetalsComponent } from './add-emp-in-payroll/emp-salary-detals/emp-salary-detals.component';
import { EmpPaymentDetalsComponent } from './add-emp-in-payroll/emp-payment-detals/emp-payment-detals.component';
import { SalaryBreakupComponent } from './add-emp-in-payroll/salary-breakup/salary-breakup.component';

const routes: Routes = [
  {path: '', component: EmpListComponent},
  {path:'add-emp', component: AddEmpInPayrollComponent,children:[
    {path:'',redirectTo:'emp-basice-detail',pathMatch:'full'},
    {path:'emp-basice-detail', component: EmpBasicDetailsComponent},
    {path:'emp-salary-detail', component: EmpSalaryDetalsComponent},
    {path:'emp-payment-detail', component: EmpPaymentDetalsComponent},
    {path:'emp-salary-breakup', component: SalaryBreakupComponent},

  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddEmployeeRoutingModule { }
