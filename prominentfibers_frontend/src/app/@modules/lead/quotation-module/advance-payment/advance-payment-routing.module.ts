import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdvancePaymentComponent } from './advance-payment/advance-payment.component';


const routes: Routes = [
  { path: "", component: AdvancePaymentComponent,
  children: [
    {
      path: '', redirectTo: 'make-advance-payment', pathMatch: 'full'
    },

    {
      path:'make-advance-payment',
      loadChildren:()=>import('./make-advance-payment/make-advance-payment.module').then(m=>m.MakeAdvancePaymentModule)
    },
    {
      path:'advance-paid-list',
      loadChildren:()=>import('./advance-paid/advance-paid.module').then(m=>m.AdvancePaidModule)
    }
  ]},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdvancePaymentRoutingModule { }