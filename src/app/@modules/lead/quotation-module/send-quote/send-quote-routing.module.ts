import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SendQuotationComponent } from './send-quote-create/send-quotation.component';
import { SendQuoteListComponent } from './send-quote-list/send-quote-list.component';

const routes: Routes = [
    { path: '', component: SendQuoteListComponent },
    { path: 'send-quote', component: SendQuotationComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SendQuoteRoutingModule { }
