import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateHkSAgreementComponent } from './create-hk-s-agreement.component';

const routes: Routes = [
  { path: "", component:CreateHkSAgreementComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CreateHkSAgreementRoutingModule { }
