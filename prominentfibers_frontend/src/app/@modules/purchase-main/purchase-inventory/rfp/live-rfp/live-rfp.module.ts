import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LiveRfpRoutingModule } from './live-rfp-routing.module';
import { LiveRfpComponent } from './live-rfp.component';
import { AgGridModule } from 'ag-grid-angular';
import { LiveRfpActionComponent } from './live-rfp-action/live-rfp-action.component';
import { MaterialModule } from 'src/app/@shared/material/material.module';
import { ExtendPrDateComponent } from './extend-pr-date/extend-pr-date.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { QuotationDetailsComponent } from './quotation-details/quotation-details.component';
import { QuotationDownloadActionComponent } from './quotation-download-action/quotation-download-action.component';
import { QuotationDefineDateComponent } from './quotation-define-date/quotation-define-date.component';



@NgModule({
  declarations: [
    LiveRfpComponent,
    LiveRfpActionComponent,
    ExtendPrDateComponent,
    QuotationDetailsComponent,
    QuotationDownloadActionComponent,
    QuotationDefineDateComponent,
  ],
  imports: [
    CommonModule,
    LiveRfpRoutingModule,
    AgGridModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class LiveRfpModule { }
