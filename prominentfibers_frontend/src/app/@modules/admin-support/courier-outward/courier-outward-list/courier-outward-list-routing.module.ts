import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CourierOutwardListComponent } from './courier-outward-list.component';

const routes: Routes = [
  { path: "", component: CourierOutwardListComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CourierOutwardListRoutingModule { }
