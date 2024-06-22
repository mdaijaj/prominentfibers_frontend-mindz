import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FinanceComponent } from './finance.component';

// const routes: Routes = [{ path: '', component: FinanceComponent }];


const routes: Routes = [
  {
    path: '', component: FinanceComponent,
    children: [
      // {
      //   path: '', redirectTo: 'account-receivable', pathMatch: 'full'
      // },

      {
        path: 'account-receivable',
        loadChildren: () => import('./account-receivable/account-receivable.module').then(m => m.AccountReceivableModule),
      },
      
      {
        path: 'account-payable',
        loadChildren: () => import('./account-payable/account-payable.module').then(m => m.AccountPayableModule),
      },

      {
        path: 'budget-management',
        loadChildren: () => import('./budget-managment/budget-managment.module').then(m => m.BudgetManagmentModule),
      },

    ]
  }
];







@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FinanceRoutingModule { }

