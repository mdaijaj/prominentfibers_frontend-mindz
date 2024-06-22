import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CRMComponent } from './crm.component';
import { CreateLeadComponent } from './pages/create-lead/create-lead.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LeadFormSetupComponent } from './pages/lead-form-setup/lead-form-setup.component';
import { LeadStatusComponent } from './pages/lead-status/lead-status.component';
import { LeadDescriptionComponent } from './pages/lead-description/lead-description.component';
import { CreateFieldValueComponent } from './pages/create-field-value/create-field-value.component';
import { LeadSummaryComponent } from './pages/lead-summary/lead-summary.component';
import { AssignUserComponent } from './pages/assign-user/assign-user/assign-user.component';
import { AssignUserCreateComponent } from './pages/assign-user/assign-user-create/assign-user-create.component';
import { CreateProposalComponent } from './pages/proposal/create-proposal/create-proposal.component';
import { DiscountRequestComponent } from './pages/proposal/discount-request/discount-request.component';
import { ClosedDealsComponent } from './pages/proposal/closed-deals/closed-deals.component';
import { AllProposalComponent } from './pages/proposal/all-proposal/all-proposal.component';

const routes: Routes = [
  {
    path: '', component: CRMComponent,
    children: [
      {
        path: '',
        component: DashboardComponent
      },
      {
        path: 'dashboard',
        component: DashboardComponent,
      },
      {
        path: 'lead-form-setup',
        component: LeadFormSetupComponent,
      },
      {
        path: 'create-lead',
        component: CreateLeadComponent,
      },
      {
        path: 'lead-status',
        component: LeadStatusComponent,
      },
      {
        path: 'lead-description',
        component: LeadDescriptionComponent,
      },
      {
        path: 'create-field-value',
        component: CreateFieldValueComponent,
      },
      {
        path: 'lead-summary',
        component: LeadSummaryComponent,
      },
      {
        path: 'assign-user',
        component: AssignUserComponent,
      },
      {
        path: 'assign-user-create',
        component: AssignUserCreateComponent,
      },
      {
        path: 'create-proposal',
        component: CreateProposalComponent,
      },
      {
        path: 'discount-request',
        component: DiscountRequestComponent,
      },
      {
        path: 'closed-deals',
        component: ClosedDealsComponent,
      },
      {
        path: 'all-proposal',
        component: AllProposalComponent,
      },
    ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CRMRoutingModule { }
