import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UpdateQuotationComponent } from './update-quote-create/update-quotation.component';
import { UpdateQuoteListComponent } from './update-quote-list/update-quote-list.component';

const routes: Routes = [
    { path: '', component: UpdateQuoteListComponent },
    { path: 'update-quote', component: UpdateQuotationComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UpdateQuoteRoutingModule { }
