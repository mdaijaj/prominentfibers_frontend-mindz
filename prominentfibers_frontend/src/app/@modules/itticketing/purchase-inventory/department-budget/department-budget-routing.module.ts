import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DepartmentBudgetComponent } from './department-budget.component';
import { ActionComponent } from './action/action.component';
import { CreateBudgetComponent } from './create-budget/create-budget.component';

const routes: Routes = [{
  path:'',component:DepartmentBudgetComponent
},
{path:'action',component:ActionComponent},
{path:'create-budget',component:CreateBudgetComponent},];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DepartmentBudgetRoutingModule { }
