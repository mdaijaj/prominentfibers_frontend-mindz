import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/@shared/material/material.module';
import { AgGridModule } from 'ag-grid-angular';
import { CKEditorModule } from 'ckeditor4-angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PreAuditRoutingModule } from './pre-audit-routing.module';
import { PreAuditHomeComponent } from './pre-audit-home/pre-audit-home.component';
import { TaskOrderListComponent } from './task-order/task-order.component';
import { PlanningAuditDetailsComponent } from './planning-audit-details/planning-audit-details.component';
import { LeadModule } from '../../lead/lead.module';
import { VerifyInvoiceRequestComponent } from './verify-invoice-request/verify-invoice-request.component';
import { InvoiceRequestListComponent } from './invoice-request-list/invoice-request-list.component';
import { UpdatedVerifierComponent } from './updated-verifier/updated-verifier.component';
import { InvoiceVerifyListComponent } from './invoice-verify-list/invoice-verify-list.component';
import { SalesRequestComponent } from './sales-request/sales-request.component';
import { DialogComponent } from './sales-request/dialog/dialog/dialog.component';
import { CdkAccordionModule } from '@angular/cdk/accordion';
import { TOPDFComponent } from './to-pdf/to-pdf.component';
import { OpenHouseModuleModule } from './open-house-training/open-house-training.module';
import { AckComponent } from './ack/ack.component';

@NgModule({
    declarations: [
        PreAuditHomeComponent,
        TaskOrderListComponent,
        PlanningAuditDetailsComponent,
        VerifyInvoiceRequestComponent,
        InvoiceRequestListComponent,
        UpdatedVerifierComponent,
        InvoiceVerifyListComponent,
        SalesRequestComponent,
        DialogComponent,
        TOPDFComponent,
        AckComponent
    ],
    imports: [
        CommonModule,
        MaterialModule,
        PreAuditRoutingModule,
        AgGridModule,
        CKEditorModule,
        FormsModule,
        ReactiveFormsModule,
        LeadModule,
        CdkAccordionModule,
        OpenHouseModuleModule
    ],
    exports: [
        PlanningAuditDetailsComponent
    ]

})
export class PreAuditModule { }
