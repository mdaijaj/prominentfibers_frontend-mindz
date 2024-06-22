import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PaidListComponent } from './paid-list/paid-list.component';

const routes: Routes = [
  {path:'',component:PaidListComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PaidExpenseRoutingModule { }
