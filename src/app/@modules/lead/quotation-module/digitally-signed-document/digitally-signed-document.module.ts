import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/@shared/material/material.module';
import { AgGridModule } from 'ag-grid-angular';
import { CKEditorModule } from 'ckeditor4-angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LeadModule } from '../../lead.module';
import { PreAuditModule } from 'src/app/@modules/audit/pre-audit/pre-audit.module';
import { DigitallySignedDocumentListComponent } from './digitally-signed-document-list/digitally-signed-document-list.component';
import { DigitallySignedDocumentNewComponent } from './digitally-signed-document-create/digitally-signed-document.component';
import { DigitallySignedDocumentRoutingModule } from './digitally-signed-document-routing.module';

@NgModule({
    declarations: [
        DigitallySignedDocumentListComponent,
        DigitallySignedDocumentNewComponent
    ],
    imports: [
        CommonModule,
        MaterialModule,
        DigitallySignedDocumentRoutingModule,
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
export class DigitallySignedDocumentModule { }
