import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MangerListComponent } from './manger-list/manger-list.component';
import { MangerExpenseComponent } from './manger-expense/manger-expense.component';

const routes: Routes = [
  {path:'',redirectTo:'mager-list',pathMatch:'full'},
  {path:'manger-expense',component:MangerExpenseComponent},
  {path:'mager-list',component:MangerListComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MangerApprovalRoutingModule { }
