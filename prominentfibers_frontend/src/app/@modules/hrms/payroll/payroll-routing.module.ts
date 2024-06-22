import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PayrollComponent } from './payroll.component';


const routes: Routes = [
  { path: '', component: PayrollComponent },
  {
    path: 'Payroll-component',
    loadChildren: () => import('./payroll-component/payroll-component.module').then(m => m.PayrollComponentModule),
  },
  {
    path: 'employee-salary',
    loadChildren: () => import('./employee-salary/employee-salary.module').then(m => m.EmployeeSalaryModule),
  },
  {
    path: 'salary-process',
    loadChildren: () => import('./salary-process/salary-process.module').then(m => m.SalaryProcessModule),
  },
  {
    path: 'advance-payment',
    loadChildren: () => import('./advance-payment/advance-payment.module').then(m => m.AdvancePaymentModule),
  },
  {
    path: 'bonus',
    loadChildren: () => import('./bonus/bonus.module').then(m => m.BonusModule),
  },
  // {
  //   path: 'itr-deduction',
  //   loadChildren: () => import('./itr-deduction/itr-deduction.module').then(m => m.ItrDeductionModule),
  // },
  {
    path: 'add-employee',
    loadChildren: () => import('./add-employee/add-employee.module').then(m => m.AddEmployeeModule),
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PayrollRoutingModule { }
