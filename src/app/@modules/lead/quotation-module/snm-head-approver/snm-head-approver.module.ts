import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/@shared/material/material.module';
import { AgGridModule } from 'ag-grid-angular';
import { CKEditorModule } from 'ckeditor4-angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LeadModule } from '../../lead.module';
import { PreAuditModule } from 'src/app/@modules/audit/pre-audit/pre-audit.module';
import { SnMHeadRoutingModule } from './snm-head-approver-routing.module';
import { SnMHeadNewComponent } from './snm-head-approver-create/snm-head-approver.component';
import { SnMHeadListComponent } from './snm-head-approver-list/snm-head-approver-list.component';

@NgModule({
    declarations: [
        SnMHeadListComponent,
        SnMHeadNewComponent
    ],
    imports: [
        CommonModule,
        MaterialModule,
        SnMHeadRoutingModule,
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
export class SnMHeadModule { }
