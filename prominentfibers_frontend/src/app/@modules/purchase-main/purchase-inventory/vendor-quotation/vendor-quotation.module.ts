import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VendorQuotationRoutingModule } from './vendor-quotation-routing.module';
import { VendorQuotationComponent } from './vendor-quotation.component';
import { ApproveProcessComponent } from './approve-process/approve-process.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AgGridModule } from 'ag-grid-angular';
import { MaterialModule } from 'src/app/@shared/material/material.module';
import { ApproveProcessRemarkComponent } from './approve-process-remark/approve-process-remark.component';



@NgModule({
  declarations: [
    VendorQuotationComponent,
    ApproveProcessComponent,
    ApproveProcessRemarkComponent
  ],
  imports: [
    CommonModule,
    VendorQuotationRoutingModule,
    AgGridModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class VendorQuotationModule { }