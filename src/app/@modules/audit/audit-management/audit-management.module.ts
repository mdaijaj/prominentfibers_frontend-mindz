import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuditManagementRoutingModule } from './audit-management-routing.module';
import { AuditManagementComponent } from './audit-management.component';
import { MaterialModule } from 'src/app/@shared/material/material.module';
import { AgGridModule } from 'ag-grid-angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ShairedModule } from 'src/app/@shared/shaired/shaired.module';
import { RejectedAuditReportComponent } from './rejected-audit-report/rejected-audit-report.component';
import { RejectedAuditActionComponent } from './rejected-audit-report/rejected-audit-action/rejected-audit-action.component';


@NgModule({
  declarations: [
    AuditManagementComponent,
    RejectedAuditReportComponent,
    RejectedAuditActionComponent
  ],
  imports: [
    CommonModule,
    AuditManagementRoutingModule,
    MaterialModule,
    AgGridModule,
    ReactiveFormsModule,
    ShairedModule,
    FormsModule,
  ]
})
export class AuditManagementModule { }
