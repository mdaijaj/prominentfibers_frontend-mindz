import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HrmsComponent } from './hrms.component';

const routes: Routes = [
  {
    path: '',
    component: HrmsComponent,
    children: [
      // {
      //   path: '', redirectTo: 'employee-master', pathMatch: 'full'
      // },

      {
        path: 'employee-master',
        loadChildren: () =>
          import('./employee-master/employee-master.module').then(
            (m) => m.EmployeeMasterModule
          ),
      },
      {
        path: 'DMS',
        loadChildren: () => import('./dms/dms.module').then((m) => m.DMSModule),
      },
      {
        path: 'rbacmaster',
        loadChildren: () =>
          import('./rbacmaster/rbacmaster.module').then(
            (m) => m.RbacmasterModule
          ),
      },
      {
        path: 'leave-master',
        loadChildren: () =>
          import('./leave-master/leave-master.module').then(
            (m) => m.LeaveMasterModule
          ),
      },

      {
        path: 'payroll',
        loadChildren: () =>
          import('./payroll/payroll.module').then((m) => m.PayrollModule),
      }
    ],
  },
 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HrmsRoutingModule {}
