import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PaymentVerificationComponent } from './payment-verification.component';
import { PaymentVerificationCheckComponent } from './payment-verification-check/payment-verification-check.component';


const routes: Routes = [
  {path:'', component:PaymentVerificationComponent},
  {path:'payment-check', component:PaymentVerificationCheckComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PaymentVarificationRoutingModule { }