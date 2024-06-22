import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgGridModule } from 'ag-grid-angular';
import { MaterialModule } from 'src/app/@shared/material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PendingApprovalComponent } from './pending-approval.component';
import { PendingApprovalRoutingModule } from './pending-approval-routing.module';
import { PendingApprovalActionComponent } from './pending-approval-action/pending-approval-action.component';

@NgModule({
  declarations: [
     PendingApprovalComponent,
     PendingApprovalActionComponent
  ],
  imports: [
    CommonModule,
    PendingApprovalRoutingModule,
    AgGridModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class PendingApprovalModule { }