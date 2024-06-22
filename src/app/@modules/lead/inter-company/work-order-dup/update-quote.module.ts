import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/@shared/material/material.module';
import { AgGridModule } from 'ag-grid-angular';
import { CKEditorModule } from 'ckeditor4-angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LeadModule } from '../../lead.module';
import { UpdateQuoteRoutingModule } from './update-quote-routing.module';
import { UpdateQuoteListComponent } from './update-quote-list/update-quote-list.component';
import { UpdateQuotationComponent } from './update-quote-create/update-quotation.component';
import { PreAuditModule } from 'src/app/@modules/audit/pre-audit/pre-audit.module';

@NgModule({
    declarations: [
        UpdateQuoteListComponent,
        UpdateQuotationComponent
    ],
    imports: [
        CommonModule,
        MaterialModule,
        UpdateQuoteRoutingModule,
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
export class UpdateQuoteModule { }
