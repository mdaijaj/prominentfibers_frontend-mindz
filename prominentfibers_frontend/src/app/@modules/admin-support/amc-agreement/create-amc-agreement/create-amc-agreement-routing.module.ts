import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateAmcAgreementComponent } from './create-amc-agreement.component';

const routes: Routes = [
  { path: "", component: CreateAmcAgreementComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CreateAmcAgreementRoutingModule { }
