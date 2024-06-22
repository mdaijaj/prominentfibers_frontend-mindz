import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddComponentTypeComponent } from './add-component-type/add-component-type.component';
import { AddComponentComponent } from './add-component/add-component.component';
import { AddCreateComponent } from './add-create/add-create.component';
import { AddTypeCreateComponent } from './add-type-create/add-type-create.component';
import { ConfigurationCreateComponent } from './configuration-create/configuration-create.component';
import { ConfigurationComponent } from './configuration/configuration.component';
import { EmployeeSalaryComponent } from './employee-salary/employee-salary.component';
import { EsiCreateComponent } from './esi-create/esi-create.component';
import { EsiComponent } from './esi/esi.component';
import { ItrComponent } from './itr/itr.component';
import { PayrollComponentComponent } from './add-component-type/payroll-component/payroll-component.component';
import { PayrollMasterComponent } from './payroll-master.component';
import { PayrollReportComponent } from './payroll-report/payroll-report.component';
import { PfCreateComponent } from './add-component-type/pf-create/pf-create.component';
import { PfEsiComponent } from './pf-esi/pf-esi.component';
import { SalaryProcessComponent } from './salary-process/salary-process.component';
import { ReportGenerateComponent } from './report-generate/report-generate.component';
import { EmployeeConfigureComponent } from './employee-configure/employee-configure.component';
import { ItrDeductionComponent } from './itr-deduction/itr-deduction.component';
import { OtherDeductionComponent } from './other-deduction/other-deduction.component';
import { OtherAllowanceComponent } from './other-allowance/other-allowance.component';
import { VariableComponent } from './variable/variable.component';
import { GeneratePaySlipComponent } from './generate-pay-slip/generate-pay-slip.component';
import { ProcessComponent } from './process/process.component';
import { SalaryProcessListComponent } from './salary-process-list/salary-process-list.component';
import { SalaryIncrementComponent } from './salary-increment/salary-increment.component';
import { SalaryIncrementListComponent } from './salary-increment-list/salary-increment-list.component';

const routes: Routes = [
  
//   {path:'', component:PayrollMasterComponent},
//   {path:'payroll-component', component:PayrollComponentComponent,
//   children: [
//     {
//       path: '', redirectTo: 'add-component-type', pathMatch: 'full'
//     },
//     {
//       path: 'add-component-type', component: AddComponentTypeComponent

//     },
//     {
//       path: 'add-component', component: AddComponentComponent
//     },
//     {
//       path: 'pf-list', component: PfEsiComponent
//     },
//     {
//       path: 'esi-list', component: EsiComponent
//     },
//     {
//       path: 'esi-create', component: EsiCreateComponent
//     },
//     {
//       path: 'configuration', component: ConfigurationComponent
//     },
//     {
//       path: 'add-type-create', component: AddTypeCreateComponent
//     },
//     {
//       path: 'add-create', component: AddCreateComponent
//     },
//     {
//       path: 'pf-create', component: PfCreateComponent
//     },
//     {
//       path: 'configure-create', component: ConfigurationCreateComponent
//     },
//   ]

// },
//   {path:'employee-salary', component:EmployeeSalaryComponent},
//   {path:'employee-configure', component:EmployeeConfigureComponent},
//   {path:'salary-process', component:SalaryProcessComponent,
//   children: [
//     {
//       path: '', redirectTo: 'generate-pay-slip', pathMatch: 'full'
//     },
//     {
//       path:'generate-pay-slip', component:GeneratePaySlipComponent
//     },
//     {
//       path:'process', component:ProcessComponent
//     },
//     {
//       path:'list', component:SalaryProcessListComponent
//     },
   
//     {
//       path:'salary-increment', component:SalaryIncrementComponent
//     },
//     {
//       path:'salary-increment-list', component:SalaryIncrementListComponent
//     },
//   ]
// },
//   {path:'payroll-report', component:PayrollReportComponent},
//   {path:'report-generate', component:ReportGenerateComponent},
//   {path:'itr', component:ItrComponent,
//   children: [
//     {
//       path: '', redirectTo: 'itr-deduction', pathMatch: 'full'
//     },
//     {
//       path: 'itr-deduction', component: ItrDeductionComponent
//     },
//     {
//       path: 'other-deduction', component: OtherDeductionComponent
//     },
//     {
//       path: 'other-allowance', component: OtherAllowanceComponent
//     },
//     {
//       path: 'variable', component: VariableComponent
//     },
//   ]
// },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PayrollMasterRoutingModule { }
