import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RejectedPrComponent } from './rejected-pr.component';

const routes: Routes = [
  { path: "", component:RejectedPrComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RejectedPrRoutingModule { }
