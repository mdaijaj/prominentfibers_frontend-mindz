import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PurchaseOrderComponent } from './purchase-order/purchase-order.component';
import { RaisePoComponent } from './raise-po/raise-po/raise-po.component';
import { PurchaseOrderMainComponent } from './purchase-order-main/purchase-order-main.component';
import { BillingBranchListComponent } from './billing-branch-list/billing-branch-list.component';
import { CreatePoComponent } from './billing-branch-list/create-po/create-po.component';


const routes: Routes = [
  { path: "", component: PurchaseOrderMainComponent,

  children: [
    {
      path: '', redirectTo: 'raise-po', pathMatch: 'full'
    },

    {
      path:'raise-po',
      loadChildren:()=>import('./raise-po/raise-po.module').then(m=>m.RaisePoModule)
    },
    {
      path:'po-issued',
      loadChildren:()=>import('./po-issued/po-issued.module').then(m=>m.PoIssuedModule)
    },

    {
      path:'draft-pos',
      loadChildren:()=>import('./draft-po/draft-po.module').then(m=>m.DraftPoModule)
    },
    {
      path:'approved-po',
      loadChildren:()=>import('./approved-po/approved-po.module').then(m=>m.ApprovedPoModule)
    },
    {
      path:'rejected-po',
      loadChildren:()=>import('./rejected-po/rejected-po.module').then(m=>m.RejectedPoModule)
    },
  ]},
    // {path:"create-PO",component:CreatePurchaseOrderComponent},
    {path:"create-PO",component:CreatePoComponent},
    {path:"billing-branch-list",component:BillingBranchListComponent},
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PurchaseOrderRoutingModule { }