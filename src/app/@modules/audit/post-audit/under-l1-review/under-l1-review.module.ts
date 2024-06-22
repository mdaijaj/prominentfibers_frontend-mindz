import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UnderL1ReviewRoutingModule } from './under-l1-review-routing.module';
import { UnderL1ReviewComponent } from './under-l1-review.component';
import { AuditCompletedListComponent } from './audit-completed-list/audit-completed-list.component';
import { MaterialModule } from 'src/app/@shared/material/material.module';
import { AgGridModule } from 'ag-grid-angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ShairedModule } from 'src/app/@shared/shaired/shaired.module';
import { PostAuditVarificationComponent } from './post-audit-varification/post-audit-varification.component';
import { UpdateAuditRelatedComponent } from './update-audit-related/update-audit-related.component';


@NgModule({
  declarations: [
    UnderL1ReviewComponent,
    AuditCompletedListComponent,
    PostAuditVarificationComponent,
    UpdateAuditRelatedComponent
  ],
  imports: [
    CommonModule,
    UnderL1ReviewRoutingModule,
    MaterialModule,
    AgGridModule,
    ReactiveFormsModule,
    ShairedModule,FormsModule
  ]
})
export class UnderL1ReviewModule { }
