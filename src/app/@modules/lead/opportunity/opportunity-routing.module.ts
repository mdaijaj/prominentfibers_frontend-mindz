import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuditL1Component } from './audit-l1/audit-l1.component';
import { AuditL2Component } from './audit-l2/audit-l2.component';
import { L1ReviewComponent } from './l1-review/l1-review.component';
import { L2ReviewComponent } from './l2-review/l2-review.component';
import { OpportunityListComponent } from './list-opportunity/list-opportunity.component';
import { OpportunityHome } from './opportunity-home/opportunity-home.component';
import { CreateBudgetaryQuoteComponent } from './create-budgetary-quote/create-budgetary-quote.component';

const routes: Routes = [
    { path: '', component: OpportunityHome },
    { path: 'opportunity-list', component: OpportunityListComponent },
    { path: 'audit-l1', component: AuditL1Component },
    { path: 'audit-l2', component: AuditL2Component },
    {
      path:'send-l1',
      loadChildren:()=>import('./send-l1/send-l1.module').then(m=>m.SendL1Module)
    },
    { path: 'review-l1', component: L1ReviewComponent },
    { path: 'create-budgetary-quote', component: CreateBudgetaryQuoteComponent },
    { path: 'review-l2', component: L2ReviewComponent },
    {
      path:'fea-approvel',
      loadChildren:()=>import('./fea-approvel/fea-approvel.module').then(m=>m.FeaApprovelModule)
    },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LeadOpportunityRoutingModule { }
