import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FeaApprovelRoutingModule } from './fea-approvel-routing.module';
import { FeaApprovelCreateComponent } from './fea-approvel-create/fea-approvel-create.component';
import { FeaApprovelComponent } from './fea-approvel.component';
import { MaterialModule } from 'src/app/@shared/material/material.module';
import { AgGridModule } from 'ag-grid-angular';
import { CKEditorModule } from 'ckeditor4-angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LeadModule } from '../../lead.module';
import { PreAuditModule } from 'src/app/@modules/audit/pre-audit/pre-audit.module';
import { FeaApprovelApproveComponent } from './fea-approvel-approve/fea-approvel-approve.component';
import { MatSelectModule } from '@angular/material/select';
import { MatSelectFilterModule } from 'mat-select-filter';


@NgModule({
  declarations: [
    FeaApprovelCreateComponent,
    FeaApprovelComponent,
    FeaApprovelApproveComponent
  ],
  imports: [
    CommonModule,
    FeaApprovelRoutingModule,
    MaterialModule,
    AgGridModule,
    CKEditorModule,
    FormsModule,
    ReactiveFormsModule,
    LeadModule,
    PreAuditModule,
    MatSelectModule, 
    MatSelectFilterModule 
  ]
})
export class FeaApprovelModule { }
