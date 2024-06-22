import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SnmHeadApprovalRoutingModule } from './snm-head-approval-routing.module';
import { ApprovalListComponent } from './approval-list/approval-list.component';
import { ApprovalActionComponent } from './approval-action/approval-action.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AgGridModule } from 'ag-grid-angular';
import { CKEditorModule } from 'ckeditor4-angular';
import { PreAuditModule } from 'src/app/@modules/audit/pre-audit/pre-audit.module';
import { MaterialModule } from 'src/app/@shared/material/material.module';
import { LeadModule } from '../../lead.module';


@NgModule({
  declarations: [
    ApprovalListComponent,
    ApprovalActionComponent
  ],
  imports: [
    CommonModule,
    SnmHeadApprovalRoutingModule,
    MaterialModule,
    AgGridModule,
    CKEditorModule,
    FormsModule,
    ReactiveFormsModule,
    LeadModule,
    PreAuditModule
  ]
})
export class SnmHeadApprovalModule { }
