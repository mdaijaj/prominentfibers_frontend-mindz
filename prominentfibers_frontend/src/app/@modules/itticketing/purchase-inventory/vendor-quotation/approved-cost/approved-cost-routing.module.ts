import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApprovedCostComponent } from './approved-cost.component';

const routes: Routes = [
  { path: "", component: ApprovedCostComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ApprovedCostRoutingModule { }