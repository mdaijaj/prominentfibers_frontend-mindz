import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreatePurchaseOrderComponent } from './create-purchase-order/create-purchase-order.component';
import { PurchaseOrderComponent } from './purchase-order/purchase-order.component';
import { RaisePoComponent } from './raise-po/raise-po/raise-po.component';
import { PurchaseOrderMainComponent } from './purchase-order-main/purchase-order-main.component';


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
  ]},
    {path:"create-PO",component:CreatePurchaseOrderComponent},
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PurchaseOrderRoutingModule { }