import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgGridModule } from 'ag-grid-angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuditListComponent } from './audit-list/audit-list.component';
import { GenerateInvoiceRoutingModule } from './generate-invoice-routing.module';
import { MaterialModule } from 'src/app/@shared/material/material.module';
import { MatCardModule } from '@angular/material/card';
import { GeneratInvoiceActionComponent } from './generat-invoice-action/generat-invoice-action.component';
import { MakeFinanceInvoiceComponent } from './make-finance-invoice/make-finance-invoice.component';

@NgModule({
  declarations: [
    AuditListComponent,
    GeneratInvoiceActionComponent,
    MakeFinanceInvoiceComponent
  ],
  imports: [
    CommonModule,
    GenerateInvoiceRoutingModule,
    AgGridModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule   
  ],
  exports:[
    AuditListComponent
  ]
})
export class GenerateInvoiceModule { }

