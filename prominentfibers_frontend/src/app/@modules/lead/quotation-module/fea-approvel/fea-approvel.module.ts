import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FeaApprovelRoutingModule } from './fea-approvel-routing.module';
import { FeaApprovelCreateComponent } from './fea-approvel-create/fea-approvel-create.component';
import { FeaAaprovelListComponent } from './fea-aaprovel-list/fea-aaprovel-list.component';
import { MaterialModule } from 'src/app/@shared/material/material.module';
import { AgGridModule } from 'ag-grid-angular';
import { CKEditorModule } from 'ckeditor4-angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LeadModule } from '../../lead.module';
import { PreAuditModule } from 'src/app/@modules/audit/pre-audit/pre-audit.module';
import { FeaPendingListComponent } from './fea-pending-list/fea-pending-list.component';

@NgModule({
  declarations: [
    FeaApprovelCreateComponent,
    FeaAaprovelListComponent,
    FeaPendingListComponent
  ],
  imports: [
    CommonModule,
    FeaApprovelRoutingModule,
    AgGridModule,
    CKEditorModule,
    FormsModule,
    ReactiveFormsModule,
    LeadModule,
    PreAuditModule,
    MaterialModule
  ]
})
export class FeaApprovelModule { }
