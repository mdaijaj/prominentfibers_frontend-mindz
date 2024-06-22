import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LiveRfpComponent } from './live-rfp.component';
import { QuotationComponent } from 'src/app/@modules/lead/quotation-module/quotaion/quotation.component';
import { QuotationDetailsComponent } from './quotation-details/quotation-details.component';

const routes: Routes = [
  { path: "", component: LiveRfpComponent},
  { path:"quotation-details",component:QuotationDetailsComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LiveRfpRoutingModule { }
