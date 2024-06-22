import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApprovedPrComponent } from './approved-pr.component';

const routes: Routes = [
  { path: "", component: ApprovedPrComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ApprovedPrRoutingModule { }
