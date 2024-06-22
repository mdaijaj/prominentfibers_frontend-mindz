import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateRentalAgreeComponent } from './create-rental-agree.component';

const routes: Routes = [
  { path: "", component: CreateRentalAgreeComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CreateRentalAgreeRoutingModule { }
