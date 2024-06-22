import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SendLinkVendorRoutingModule } from './send-link-vendor-routing.module';
import { SendLinkVendorComponent } from './send-link-vendor.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/@shared/material/material.module';
import { AgGridModule } from 'ag-grid-angular';
import { BankActionComponent } from './bank-details/bank-action/bank-action.component';

import { DocumentsComponent } from './documents/documents.component';
import { RejectRemarkComponent } from './reject-remark/reject-remark.component';
import { BankDetailsComponent } from './bank-details/bank-details.component';
import { BasicDetailsComponent } from './basic-details/basic-details.component';

@NgModule({
  declarations: [
    SendLinkVendorComponent,
    BankActionComponent,
    DocumentsComponent,
    RejectRemarkComponent,
    BankDetailsComponent,
    BasicDetailsComponent
  ],
  imports: [
    CommonModule,
    SendLinkVendorRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    AgGridModule,

  ]
})
export class SendLinkVendorModule { }
