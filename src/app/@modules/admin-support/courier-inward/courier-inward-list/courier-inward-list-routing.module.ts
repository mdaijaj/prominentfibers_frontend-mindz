import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CourierInwardListComponent } from './courier-inward-list.component';

const routes: Routes = [
  { path: "", component: CourierInwardListComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CourierInwardListRoutingModule { }
