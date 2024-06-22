import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MasterComponent } from './master.component';

const routes: Routes = [
  {
    path: '', component: MasterComponent,
    children: [
      // {
      //   path: '', redirectTo: 'hrms', pathMatch: 'full'
      // },
      {
        path: 'hrms',
        loadChildren: () => import('./hrms/hrms.module').then(m => m.HrmsModule),
      },
      {
        path: 'warehouse-management',
        loadChildren: () => import('./warehouse/warehouse.module').then(m => m.WarehouseModule),
      },
      {
        path: 'lead',
        loadChildren: () => import('./lead/lead.module').then(m => m.LeadModule),
      },
      {
        path: 'audit',
        loadChildren: () => import('./audit/audit.module').then(m => m.AuditModule),
      },
      {
        path: 'header-menu',
        loadChildren: () => import('./header-menu/header-menu.module').then(m => m.HeaderMenuModule),
      },
      {
        path: 'finance',
        loadChildren: () => import('./finance/finance.module').then(m => m.FinanceModule),
      },
      {
        path: 'configurational-master',
        loadChildren: () => import('././itticketing/configurationalmaster/configurationalmaster.module').then(m => m.ConfigurationalmasterModule),
      },
      {
        path: 'expense-main',
        loadChildren: () => import('./expense-manage-main/expense-manage-main.module').then(m => m.ExpenseManageMainModule),
      },
      {
        path: 'vendor',
        loadChildren: () => import('./vendor/vendor-management/vendor-management.module').then(m => m.VendorManagementModule)
      },

      {
        path: 'admin-support',
        loadChildren: () => import('./admin-support/admin-support.module').then(m => m.AdminSupportModule)
      },

      
      {
        path: 'crm',
        loadChildren: () => import('./crm/crm.module').then(m => m.CRMModule)
      },
      {
        path:'production',
        loadChildren: () => import('./production/production.module').then(m=>m.ProductionModule)
      },
      {
        path:'purchase-main',
        loadChildren: () => import('./purchase-main/purchase-main.module').then(m=>m.PurchaseMainModule)
      },
      {
        path: 'quality-management',
        loadChildren: () => import('./quality-management/quality-management-routing.module').then(m => m.QualityManagementRoutingModule)
      }
    ]
  },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MasterRoutingModule { }
