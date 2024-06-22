import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExpenseMangemeMainComponent } from './expense-mangeme-main.component';

const routes: Routes = [
  {
    path: '', component: ExpenseMangemeMainComponent,
    children: [
      // {
      //   path: '', redirectTo: 'expense-managment', pathMatch: 'full'
      // },
 
      {
        path: 'expense-managment',
        loadChildren: () => import('./expense-management/expense-management.module').then(m => m.ExpenseManagementModule),
      },
      {
        path: 'travel-request',
        loadChildren: () => import('./travel-request/travel-request.module').then(m => m.TravelRequestMainModule),
      },

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExpenseManageMainRoutingModule { }
