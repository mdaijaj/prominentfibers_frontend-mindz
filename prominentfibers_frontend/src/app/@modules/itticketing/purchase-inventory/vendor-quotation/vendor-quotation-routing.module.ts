import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { VendorQuotationComponent } from './vendor-quotation.component';
import { ApproveProcessComponent } from './approve-process/approve-process.component';

const routes: Routes = [
  { path: "", component: VendorQuotationComponent,
  children: [
    {
      path: '', redirectTo: 'pending-approval', pathMatch: 'full'
    },

    {
      path:'approved-cost',
      loadChildren:()=>import('./approved-cost/approved-cost.module').then(m=>m.ApprovedCostModule)
    },
    {
      path:'pending-approval',
      loadChildren:()=>import('./pending-approval/pending-approval.module').then(m=>m.PendingApprovalModule)
    },

    {
      path:'rejected',
      loadChildren:()=>import('./rejected/rejected.module').then(m=>m.RejectedModule)
    },
  ]},
  {path:'approve-process',component:ApproveProcessComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VendorQuotationRoutingModule { }