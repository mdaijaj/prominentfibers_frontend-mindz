import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExistingCustomerComponent } from './existing-customer.component';

const routes: Routes = [
  { path: '', component: ExistingCustomerComponent },
    {
      path:'advance-planning',
      loadChildren:()=>import('./advance-planning/advance-planning.module').then(m=>m.AdvancePlanningModule)
    },
    {
      path:'suspection',
      loadChildren:()=>import('./suspection/suspection.module').then(m=>m.SuspectionModule)
    },

    {
      path:'withdrawal',
      loadChildren:()=>import('./withdrawal/withdrawal.module').then(m=>m.WithdrawalModule)
    },
    {
      path:'withdrawal-approval-rbh',
      loadChildren:()=>import('./rbh-approval/rbh-approval.module').then(m=>m.RBHApprovalModule)
    },
    {
      path:'planning-team-susp',
      loadChildren:()=>import('./planning-team-susp/planning-team-susp.module').then(m=>m.PlanningTeamSuspModule)
    },
];



@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExistingCustomerRoutingModule { }
