import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/@shared/material/material.module';
import { AgGridModule } from 'ag-grid-angular';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatTooltip, MatTooltipModule } from '@angular/material/tooltip';
import { HrmsModule } from '../hrms/hrms.module';
import { CRMComponent } from './crm.component';
import { ShairedModule } from 'src/app/@shared/shaired/shaired.module';
import { CRMRoutingModule } from './crm-routing.module';
import { MatIconModule } from '@angular/material/icon';
import { ActionLeadFormSetupComponent } from './pages/action/action-lead-form-setup/action-lead-form-setup.component';
import { CreateLeadComponent } from './pages/create-lead/create-lead.component';
import { CKEditorModule } from 'ckeditor4-angular';
import { ActionLeadFormSetupStatusComponent } from './pages/action/action-lead-form-setup-status/action-lead-form-setup-status.component';
import { ActionLeadFormSetupMandatoryComponent } from './pages/action/action-lead-form-setup-mandatory/action-lead-form-setup-mandatory.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LeadFormSetupComponent } from './pages/lead-form-setup/lead-form-setup.component';
import { LeadStatusComponent } from './pages/lead-status/lead-status.component';
import { LeadDescriptionComponent } from './pages/lead-description/lead-description.component';
import { AddLeadFormSetupDialogComponent } from './pages/dialogs/add-lead-form-setup-dialog/add-lead-form-setup-dialog.component';
import { ViewLeadStatusDialogComponent } from './pages/dialogs/view-lead-status-dialog/view-lead-status-dialog.component';
import { CreateFieldValueComponent } from './pages/create-field-value/create-field-value.component';
import { ActionLeadStatusComponent } from './pages/action/action-lead-status/action-lead-status.component';
import { ViewLeadDescriptionDialogComponent } from './pages/dialogs/view-lead-description-dialog/view-lead-description-dialog.component';
import { LeadSummaryComponent } from './pages/lead-summary/lead-summary.component';
import { AssignUserComponent } from './pages/assign-user/assign-user/assign-user.component';
import { ActionAssignUserComponent } from './pages/assign-user/action-assign-user/action-assign-user.component';
import { AssignUserCreateComponent } from './pages/assign-user/assign-user-create/assign-user-create.component';
import { AssignUserModule } from './assign-user/assign-user.module';
import { CreateProposalComponent } from './pages/proposal/create-proposal/create-proposal.component';
import { AssignProposalDialogComponent } from './pages/proposal/dialogs/assign-proposal-dialog/assign-proposal-dialog.component';
import { DiscountRequestComponent } from './pages/proposal/discount-request/discount-request.component';
import { MatTabsModule } from '@angular/material/tabs';
import { ClosedDealsComponent } from './pages/proposal/closed-deals/closed-deals.component';
import { PaymentProposalComponent } from './pages/proposal/payment-proposal/payment-proposal.component';
import { AllProposalComponent } from './pages/proposal/all-proposal/all-proposal.component';
import { ViewProposalVersionDialogComponent } from './pages/proposal/dialogs/view-proposal-version-dialog/view-proposal-version-dialog.component';
import { ActionViewProposalVersionComponent } from './pages/proposal/action-proposal/action-view-proposal-version/action-view-proposal-version.component';
import { CloseDealDialogComponent } from './pages/dialogs/close-deal-dialog/close-deal-dialog.component';

@NgModule({
  declarations: [
    CRMComponent,
    DashboardComponent,
    LeadFormSetupComponent,
    ActionLeadFormSetupComponent,
    CreateLeadComponent,
    LeadStatusComponent,
    LeadDescriptionComponent,
    ActionLeadFormSetupStatusComponent,
    ActionLeadFormSetupMandatoryComponent,
    AddLeadFormSetupDialogComponent,
    ViewLeadStatusDialogComponent,
    CreateFieldValueComponent,
    ActionLeadStatusComponent,
    ViewLeadDescriptionDialogComponent,
    LeadSummaryComponent,
    AssignUserComponent,
    ActionAssignUserComponent,
    AssignUserCreateComponent,
    CreateProposalComponent,
    AssignProposalDialogComponent,
    DiscountRequestComponent,
    ClosedDealsComponent,
    PaymentProposalComponent,
    AllProposalComponent,
    ViewProposalVersionDialogComponent,
    ActionViewProposalVersionComponent,
    CloseDealDialogComponent,
  ],
  imports: [
    CommonModule,
    CRMRoutingModule,
    MaterialModule,
    HrmsModule,
    AgGridModule,
    HttpClientModule,
    FormsModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatDialogModule,
    MatSidenavModule,
    MatExpansionModule,
    MatListModule,
    MatTooltipModule,
    ReactiveFormsModule,
    ShairedModule,
    CKEditorModule,
    AssignUserModule,
    MatTabsModule,
  ]
})
export class CRMModule { }
