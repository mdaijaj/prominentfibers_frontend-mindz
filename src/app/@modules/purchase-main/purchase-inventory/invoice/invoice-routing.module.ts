import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InvoiceComponent } from './invoice/invoice.component';
import { GenrateInvoiceComponent } from './genrate-invoice/genrate-invoice.component';



const routes: Routes = [
  { path: "", component: InvoiceComponent},
  {path:"genrate-invoice", component:GenrateInvoiceComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InvoiceRoutingModule { }