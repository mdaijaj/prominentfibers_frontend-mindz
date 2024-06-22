import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdvancePaymentComponent } from './advance-payment.component';
import { AdvancePaymentCreateComponent } from './advance-payment-create/advance-payment-create.component';

const routes: Routes = [
  {path:'',component:AdvancePaymentComponent},
  {path:'advance_payment_create',component:AdvancePaymentCreateComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdvancePaymentRoutingModule { }
