import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InvoiceComponent } from './invoice/invoice.component';
import { InvoiceActionComponent } from './invoice-action/invoice-action.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AgGridModule } from 'ag-grid-angular';
import { MaterialModule } from 'src/app/@shared/material/material.module';
import { InvoiceRoutingModule } from './invoice-routing.module';
import { GenrateInvoiceComponent } from './genrate-invoice/genrate-invoice.component';



@NgModule({
  declarations: [
    InvoiceComponent,
    InvoiceActionComponent,
    GenrateInvoiceComponent,
  ],
  imports: [
    CommonModule,
    InvoiceRoutingModule,
    AgGridModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class InvoiceModule { }
