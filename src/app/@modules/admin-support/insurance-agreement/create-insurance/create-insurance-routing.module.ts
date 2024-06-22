import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateInsuranceComponent } from './create-insurance.component';

const routes: Routes = [
  { path: "", component:CreateInsuranceComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CreateInsuranceRoutingModule { }
