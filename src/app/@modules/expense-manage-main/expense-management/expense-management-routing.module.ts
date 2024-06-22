import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExpenseManagementComponent } from './expense-management.component';

const routes: Routes = [
  {path:'', component:ExpenseManagementComponent},
  {
    path: 'travel-request',
    loadChildren: () => import('./travel-request/travel-request.module').then(m => m.TravelRequestModule),
  },
  {
    path: 'my-expenses',
    loadChildren: () => import('./my-expenses/my-expenses.module').then(m => m.MyExpenseModule),
  },
  {
    path: 'approve-expense',
    loadChildren: () => import('./approve-expense/approve-expense.module').then(m => m.ApproveExpenseModule),
  },
  {
    path: 'make-payment',
    loadChildren: () => import('./make-payment/make-payment.module').then(m => m.MakePaymentModule),
  },
  {
    path: 'paid-expense',
    loadChildren: () => import('./paid-expense/paid-expense.module').then(m => m.PaidExpenseModule),
  },
  {
    path: 'processing-expense',
    loadChildren: () => import('./processing/processing.module').then(m => m.ProcessingModule),
  },
  {
    path: 'posted-expense',
    loadChildren: () => import('./posted/posted.module').then(m => m.PostedModule),
  },
  {
    path: 'manger-expense',
    loadChildren: () => import('./manger-approval/manger-approval.module').then(m => m.MangerApprovalModule),
  },
  {
    path: 'user-access',
    loadChildren: () => import('./user-access/user-access.module').then(m => m.UserAccessModule),
  },
  {
    path: 'agent-access',
    loadChildren: () => import('./agent-access/agent-access.module').then(m => m.AgentAccessModule),
  },
  {
    path: 'manger-access',
    loadChildren: () => import('./manger-access/manger-access.module').then(m => m.MangerAccessModule),
  },
  {
    path: 'aproved-reject-user',
    loadChildren: () => import('./approved-reject-user/approved-reject-user.module').then(m => m.ApprovedRejectUserModule),
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExpenseManagementRoutingModule { }
