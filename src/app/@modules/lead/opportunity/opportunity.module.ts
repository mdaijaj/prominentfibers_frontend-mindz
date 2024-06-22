import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/@shared/material/material.module';
import { AgGridModule } from 'ag-grid-angular';
import { CKEditorModule } from 'ckeditor4-angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OpportunityListComponent } from './list-opportunity/list-opportunity.component';
import { LeadOpportunityRoutingModule } from './opportunity-routing.module';
import { OpportunityHome } from './opportunity-home/opportunity-home.component';
import { AuditL1Component } from './audit-l1/audit-l1.component';
import { AuditL2Component } from './audit-l2/audit-l2.component';
import { SendL1Component } from './send-l1/create-send-l1/send-l1.component';
import { L1ReviewComponent } from './l1-review/l1-review.component';
import { L2ReviewComponent } from './l2-review/l2-review.component';
import { LeadModule } from '../lead.module';
import { CreateBudgetaryQuoteComponent } from './create-budgetary-quote/create-budgetary-quote.component';
import { MatSelectModule } from '@angular/material/select';
import { MatSelectFilterModule } from 'mat-select-filter';
// import { FeaApprovelComponent } from './fea-approvel/fea-approvel.component';
// import { SicAccreditionDetailsComponent } from './sic-accredition-details/sic-accredition-details.component';

@NgModule({
    declarations: [
        OpportunityListComponent,
        OpportunityHome,
        AuditL1Component,
        AuditL2Component,
        L1ReviewComponent,
        L2ReviewComponent,
        CreateBudgetaryQuoteComponent,
        // FeaApprovelComponent,
        // SicAccreditionDetailsComponent
    ],
    imports: [
        CommonModule,
        MaterialModule,
        LeadOpportunityRoutingModule,
        AgGridModule,
        CKEditorModule,
        FormsModule,
        ReactiveFormsModule,
        LeadModule,
        MatSelectModule, 
        MatSelectFilterModule 
    ],
    exports: [
    ]
  
})
export class LeadOpportunityModule { }
