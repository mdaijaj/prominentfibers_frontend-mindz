import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/@shared/material/material.module';
import { AgGridModule } from 'ag-grid-angular';
import { CKEditorModule } from 'ckeditor4-angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LeadModule } from '../../lead.module';
import { PreAuditModule } from 'src/app/@modules/audit/pre-audit/pre-audit.module';
import { SignedDocumentRoutingModule } from './signed-document-routing.module';
import { SignedDocumentListComponent } from './signed-document-list/signed-document-list.component';
import { SignedDocumentNewComponent } from './signed-document-create/signed-document.component';

@NgModule({
    declarations: [
        SignedDocumentListComponent,
        SignedDocumentNewComponent
    ],
    imports: [
        CommonModule,
        MaterialModule,
        SignedDocumentRoutingModule,
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
export class SignedDocumentModule { }
