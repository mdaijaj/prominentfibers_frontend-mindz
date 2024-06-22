import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdvancePaidListComponent } from './advance-paid-list/advance-paid-list.component';

const routes: Routes = [
  { path: "", component: AdvancePaidListComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdvancePaidRoutingModule { }