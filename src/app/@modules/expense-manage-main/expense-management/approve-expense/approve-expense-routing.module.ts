import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApproveExpenseComponent } from './approve-expense-list/approve-expense-list.component';
import { ApproveExpenseCreateComponent } from './approve-expense-create/approve-expense.component';
import { MakePaymentComponent } from './make-payment/make-payment.component';

const routes: Routes = [
    { path: '', component: ApproveExpenseComponent },
    { path: 'approve-expense-create', component: ApproveExpenseCreateComponent },
    {path:'make-payment',component:MakePaymentComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ApproveExpenseRoutingModule { }
