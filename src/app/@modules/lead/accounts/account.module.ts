import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/@shared/material/material.module';
import { AgGridModule } from 'ag-grid-angular';
import { CKEditorModule } from 'ckeditor4-angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LeadAccountRoutingModule } from './account-routing.module';
import { AccountListComponent } from './list-account/list-account.component';
import { AccountCreateComponent } from './create-account/create.account.component';
import { LeadModule } from '../lead.module';
import { AccountHome } from './account-home/account-home.component';
import { ConvertOpportunityComponent } from './convert-opportunity/convert-opportunity.component';
import { CustomerAccountComponent } from './customer-account/customer-account.component';
import { OpenHouseRegListComponent } from './open-house-reg-list/open-house-reg-list.component';
import { OpenHouseRegCreateComponent } from './open-house-reg-create/open-house-reg-create.component';
import { OpenHouseTrainingCreateComponent } from './open-house-training-create/open-house-training-create.component';
import { CreateLeadChildComponent } from './create-lead-child/create-lead-child.component';
import { MatSelectFilterModule } from 'mat-select-filter';
import { MatSelectModule } from '@angular/material/select';
import { OpportunityExistCustComponent } from './opportunity-exist-cust/opportunity-exist-cust.component';
import { OpportunityExistActionComponent } from './opportunity-exist-cust/opportunity-exist-action/opportunity-exist-action.component';

@NgModule({
    declarations: [
        AccountListComponent,
        AccountCreateComponent,
        AccountHome,
        ConvertOpportunityComponent,
        CustomerAccountComponent,
        CreateLeadChildComponent,
        OpenHouseRegListComponent,
        OpenHouseRegCreateComponent,
        OpenHouseTrainingCreateComponent,
        OpportunityExistCustComponent,
        OpportunityExistActionComponent
    ],
    imports: [
        CommonModule,
        MaterialModule,
        LeadAccountRoutingModule,
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
export class LeadAccountModule { }
