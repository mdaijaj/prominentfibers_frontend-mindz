import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PurchaseRequestComponent } from './purchase-request.component';
import { AllPrComponent } from './all-pr/all-pr.component';
import { ToBeApprovedComponent } from './to-be-approved/to-be-approved.component';
import { ApprovedPrComponent } from './approved-pr/approved-pr.component';

const routes: Routes = [
  { path: "", component: PurchaseRequestComponent,
  children: [
    {
      path: '', redirectTo: 'all-pr-list', pathMatch: 'full'
    },
    {
      path:'all-pr-list',
      loadChildren:()=>import('./all-pr/all-pr.module').then(m=>m.AllPrModule)
    },
    {
      path:'to-be-approved',
      loadChildren:()=>import('./to-be-approved/to-be-approved.module').then(m=>m.ToBeApprovedModule)
    },
    {
      path:'approved-pr',
      loadChildren:()=>import('./approved-pr/approved-pr.module').then(m=>m.ApprovedPrModule)
    },
    {
      path:'rejected-pr',
      loadChildren:()=>import('./rejected-pr/rejected-pr.module').then(m=>m.RejectedPrModule)
    },
    

  ]},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PurchaseRequestRoutingModule { }
