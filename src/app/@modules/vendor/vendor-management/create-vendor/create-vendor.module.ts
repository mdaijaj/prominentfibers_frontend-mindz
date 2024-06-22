import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CreateVendorRoutingModule } from './create-vendor-routing.module';
import { CreateVendorComponent } from './create-vendor.component';
import { BasicDetailsComponent } from './basic-details/basic-details.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/@shared/material/material.module';
import { AgGridModule } from 'ag-grid-angular';
import { BankActionComponent } from './bank-details/bank-action/bank-action.component';

import { DocumentsComponent } from './documents/documents.component';
import { RejectRemarkComponent } from './reject-remark/reject-remark.component';
import { BankDetailsComponent } from './bank-details/bank-details.component';
import { BankDailogComponent } from './bank-details/bank-dailog/bank-dailog.component';
import { CountryPipe } from 'src/app/@shared/pipe/filterPipes/country.pipe';


@NgModule({
  declarations: [
    CreateVendorComponent,
    BasicDetailsComponent,
    BankDetailsComponent, 
    DocumentsComponent,
    RejectRemarkComponent,
    BankActionComponent,
    BankDailogComponent,
    CountryPipe

  ],
  imports: [
    CommonModule,
    CreateVendorRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    AgGridModule


  ]
})
export class CreateVendorModule { }
