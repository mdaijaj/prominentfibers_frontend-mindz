import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdvancePaymentListComponent } from './advance-payment-list/advance-payment-list.component';
import { AdvancePaymentCreateComponent } from './advance-payment-create/advance-payment-create.component';


const routes: Routes = [
  { path: "", component: AdvancePaymentListComponent},
  { path: "create-payment", component: AdvancePaymentCreateComponent},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MakeAdvancePaymentRoutingModule { }