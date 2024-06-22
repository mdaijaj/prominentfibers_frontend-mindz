import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PurchaseInventoryComponent } from './purchase-inventory.component';
import { ApprovedVendorListComponent } from './approved-vendor-list/approved-vendor-list.component';
import { UnapprovedVendorListComponent } from './unapproved-vendor-list/unapproved-vendor-list.component';
import { VendorManagementComponent } from './vendor-management/vendor-management.component';
import { CreateVandorComponent } from './create-vandor/create-vandor.component';
import { BankDetailsComponent } from './bank-details/bank-details.component';
import { BasicDetailsComponent } from './basic-details/basic-details.component';
import { DocumentsComponent } from './documents/documents.component';

const routes: Routes = [
  {
    path: '',
    component: PurchaseInventoryComponent,
  },
  {path:'vendor-management', component:VendorManagementComponent,
  children: [
    {
      path: '', redirectTo: 'unapproved-vender-list', pathMatch: 'full'
    },
    {
      path: 'approved-vender-list',
      component: ApprovedVendorListComponent,
    },
    {
      path: 'unapproved-vender-list',
      component: UnapprovedVendorListComponent,
    },
   
    {
      path:'purchase-request',
      loadChildren:()=>import('./purchase-request/purchase-request.module').then(m=>m.PurchaseRequestModule)
    },
    {
      path:'purchase-request',
      loadChildren:()=>import('./purchase-request/purchase-request.module').then(m=>m.PurchaseRequestModule)
    },
  
    {
      path:'rfp',
      loadChildren:()=>import('./rfp/rfp.module').then(m=>m.RfpModule)
    },
  
    {
      path:'vendor-quotation',
      loadChildren:()=>import('./vendor-quotation/vendor-quotation.module').then(m=>m.VendorQuotationModule)
    },
  
    {
      path:'purchase-order',
      loadChildren:()=>import('./purchase-order/purchase-order.module').then(m=>m.PurchaseOrderModule)
    },
    {
      path:'grn',
      loadChildren:()=>import('./grn/grn.module').then(m=>m.GrnModule)
    },
    {
      path:'invoice',
      loadChildren:()=>import('./invoice/invoice.module').then(m=>m.InvoiceModule)
    },
  ]},

  {
    path: 'create-vender',
    component: CreateVandorComponent,
    children: [
      {
        path: '', redirectTo: 'basic-details', pathMatch: 'full'
      },
      {
        path: 'basic-details', 
        component: BasicDetailsComponent,
      },
      {
        path: 'bank-details',
        component: BankDetailsComponent,
      },
      {
        path: 'documents',
        component: DocumentsComponent,
      },
    
    ]
  },
  {
    path:'purchase-request',
    loadChildren:()=>import('./purchase-request/purchase-request.module').then(m=>m.PurchaseRequestModule)
  },

  {
    path:'rfp',
    loadChildren:()=>import('./rfp/rfp.module').then(m=>m.RfpModule)
  },

  {
    path:'vendor-quotation',
    loadChildren:()=>import('./vendor-quotation/vendor-quotation.module').then(m=>m.VendorQuotationModule)
  },

  {
    path:'purchase-order',
    loadChildren:()=>import('./purchase-order/purchase-order.module').then(m=>m.PurchaseOrderModule)
  },
  {
    path:'grn',
    loadChildren:()=>import('./grn/grn.module').then(m=>m.GrnModule)
  },
  {
    path:'invoice',
    loadChildren:()=>import('./invoice/invoice.module').then(m=>m.InvoiceModule)
  },
  
  {
    path:'inventory',
    loadChildren:()=>import('./inventory/inventory.module').then(m=>m.InventoryModule)
  },
  {
    path:'department-budget',
    loadChildren:()=>import('./department-budget/department-budget.module').then(m=>m.DepartmentBudgetModule)
  },
//  {
//       path:'department-wise-budget',
//       component:DepartmentWiseBudgetComponent
//     }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PurchaseInventoryRoutingModule { }
