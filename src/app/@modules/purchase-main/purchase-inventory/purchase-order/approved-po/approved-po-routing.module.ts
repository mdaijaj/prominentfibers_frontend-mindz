import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApprovedPoComponent } from './approved-po.component';

const routes: Routes = [
  { path: "", component: ApprovedPoComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ApprovedPoRoutingModule { }
