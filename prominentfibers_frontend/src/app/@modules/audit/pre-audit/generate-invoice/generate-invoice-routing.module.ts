import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuditListComponent } from './audit-list/audit-list.component';
import { MakeFinanceInvoiceComponent } from './make-finance-invoice/make-finance-invoice.component';

const routes: Routes = [
  { path: '', component: AuditListComponent },
  { path: 'finance-invoice', component: MakeFinanceInvoiceComponent },
  
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GenerateInvoiceRoutingModule { }
