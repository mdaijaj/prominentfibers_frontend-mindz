import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/@shared/material/material.module';
import { AgGridModule } from 'ag-grid-angular';
import { CKEditorModule } from 'ckeditor4-angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LeadModule } from '../../lead.module';
import { SendForSMComponent } from './send-for-s&m-create/send-for-s&m.component';
import { SendForSMListComponent } from './send-for-s&m-list/send-for-s&m-list.component';
import { SendForSMRoutingModule } from './send-for-sm-routing.module';
import { PreAuditModule } from 'src/app/@modules/audit/pre-audit/pre-audit.module';

@NgModule({
    declarations: [
        SendForSMListComponent,
        SendForSMComponent
    ],
    imports: [
        CommonModule,
        MaterialModule,
        SendForSMRoutingModule,
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
export class SendForSMQuoteModule { }
