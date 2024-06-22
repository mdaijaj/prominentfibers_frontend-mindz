import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/@shared/material/material.module';
import { AgGridModule } from 'ag-grid-angular';
import { CKEditorModule } from 'ckeditor4-angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LeadModule } from '../../lead.module';
import { PreAuditModule } from 'src/app/@modules/audit/pre-audit/pre-audit.module';
import { VerifiedSignedDocumentListComponent } from './verify-signed-document-list/verify-signed-document-list.component';
import { VerifiedSignedDocumentNewComponent } from './verify-signed-document-create/verify-signed-document.component';
import { VerifiedSignedDocumentRoutingModule } from './verify-signed-document-routing.module';

@NgModule({
    declarations: [
        VerifiedSignedDocumentListComponent,
        VerifiedSignedDocumentNewComponent
    ],
    imports: [
        CommonModule,
        MaterialModule,
        VerifiedSignedDocumentRoutingModule,
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
export class VerifiedSignedDocumentModule { }
