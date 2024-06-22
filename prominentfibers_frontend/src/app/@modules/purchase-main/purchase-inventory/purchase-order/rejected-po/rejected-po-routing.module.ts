import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RejectedPoComponent } from './rejected-po.component';

const routes: Routes = [
  { path: "", component: RejectedPoComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RejectedPoRoutingModule { }
