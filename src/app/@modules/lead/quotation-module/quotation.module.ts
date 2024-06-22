import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/@shared/material/material.module';
import { AgGridModule } from 'ag-grid-angular';
import { CKEditorModule } from 'ckeditor4-angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { QuotationRoutingModule } from './quotation-routing.module';
import { QuotationListComponent } from './list-quotation/list-quotation.component';
import { QuotationComponent } from './quotaion/quotation.component';
import { LeadModule } from '../lead.module';
import { QuotationHome } from './quotation-home/quotation-home.component';
import { ProformaInvoiceComponent } from './proforma-invoice/proforma-invoice.component';
import { ApprovedComponent } from './approved/approved.component';
import { PerformInvoiceComponent } from './perform-invoice/perform-invoice.component';
import { UpdateProformaInvoiceComponent } from './update-proforma-invoice/update-proforma-invoice.component';
import { SMApprovedListComponent } from './s&m-approved-list/s&m-approved-list.component';
import { PreAuditModule } from '../../audit/pre-audit/pre-audit.module';

@NgModule({
    declarations: [
        QuotationListComponent,
        QuotationComponent,
        QuotationHome,
        ProformaInvoiceComponent,
        ApprovedComponent,
        PerformInvoiceComponent,
        SMApprovedListComponent,
        UpdateProformaInvoiceComponent,
    ],
    imports: [
        CommonModule,
        MaterialModule,
        QuotationRoutingModule,
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
export class QuotationModule { }
