import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ItrDeductionComponent } from './itr-deduction.component';

import { ItrHeaderComponent } from './itr-header/itr-header.component';
import { OtherDeductionComponent } from './other-deduction/other-deduction.component';
import { OtherAllowanceComponent } from './other-allowance/other-allowance.component';
import { VariableComponent } from './variable/variable.component';
const routes: Routes = [
  {path:'', component:ItrHeaderComponent,
  // children: [
  //   {
  //     path: '', redirectTo: 'itr-deduction', pathMatch: 'full'
  //   },
  //   {
  //     path: 'other-deduction', component: OtherDeductionComponent
  //   },
  //   {
  //     path: 'other-allowance', component: OtherAllowanceComponent
  //   },
  //   {
  //     path: 'variable', component: VariableComponent
  //   },
  //   {
  //     path: 'itr-deductionss', component: ItrDeductionComponent
  //   },
  // ]
},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ItrDeductionRoutingModule { }
