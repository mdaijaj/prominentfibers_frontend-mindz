import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CourierAcceptanceRejectionComponent } from './courier-acceptance-rejection.component';

const routes: Routes = [
  { path: "", component: CourierAcceptanceRejectionComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CourierAcceptanceRejectionRoutingModule { }
