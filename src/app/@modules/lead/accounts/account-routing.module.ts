import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountHome } from './account-home/account-home.component';
import { ConvertOpportunityComponent } from './convert-opportunity/convert-opportunity.component';
import { AccountCreateComponent } from './create-account/create.account.component';
import { CustomerAccountComponent } from './customer-account/customer-account.component';
import { AccountListComponent } from './list-account/list-account.component';
import { OpenHouseRegCreateComponent } from './open-house-reg-create/open-house-reg-create.component';
import { OpenHouseRegListComponent } from './open-house-reg-list/open-house-reg-list.component';
import { OpenHouseTrainingCreateComponent } from './open-house-training-create/open-house-training-create.component';
import { CreateLeadChildComponent } from './create-lead-child/create-lead-child.component';
import { OpportunityExistCustComponent } from './opportunity-exist-cust/opportunity-exist-cust.component';

const routes: Routes = [
    { path: '', component: AccountHome },
    { path: 'account-list', component: AccountListComponent },
    { path: 'create-account', component: AccountCreateComponent },
    { path: 'create-child', component: CreateLeadChildComponent },
    { path: 'convert-opportunity', component: ConvertOpportunityComponent },
    { path: 'customer-account', component: CustomerAccountComponent },
    { path: 'open-house-list',component:OpenHouseRegListComponent},
    { path: 'open-house-reg-create',component:OpenHouseRegCreateComponent},
    { path: 'open-house-training-create',component:OpenHouseTrainingCreateComponent},
    { path: 'account-master', loadChildren: () => import('./account-master/account-master.module').then(m => m.AccountMasterModule) },
     {path:'opportunity-exist-cutomer',component:OpportunityExistCustComponent}
  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LeadAccountRoutingModule { }
