import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MakePaymentListComponent } from './make-payment-list/make-payment-list.component';
import { MakePaymentCreateComponent } from './make-payment-create/make-payment-create.component';

const routes: Routes = [
  {path:'',component:MakePaymentListComponent},
  {path:'make-payment-create',component:MakePaymentCreateComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MakePaymentRoutingModule { }
