import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/@shared/material/material.module';
import { AgGridModule } from 'ag-grid-angular';
import { CKEditorModule } from 'ckeditor4-angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LeadModule } from '../../lead.module';
import { SendQuotationComponent } from './send-quote-create/send-quotation.component';
import { SendQuoteListComponent } from './send-quote-list/send-quote-list.component';
import { SendQuoteRoutingModule } from './send-quote-routing.module';
import { PreAuditModule } from 'src/app/@modules/audit/pre-audit/pre-audit.module';

@NgModule({
    declarations: [
        SendQuoteListComponent,
        SendQuotationComponent
    ],
    imports: [
        CommonModule,
        MaterialModule,
        SendQuoteRoutingModule,
        AgGridModule,
        CKEditorModule,
        FormsModule,
        ReactiveFormsModule,
        LeadModule,
        PreAuditModule
    ],
    exports: [
    ]
  
})
export class SendQuoteModule { }
