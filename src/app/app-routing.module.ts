import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './@auth/auth-material/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'auth',
    pathMatch: 'full',
  },

  {
    path: 'auth',
    loadChildren: () =>
      import('../app/@auth/auth.module').then((m) => m.AuthModule),
  },

  {
    path: 'master',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('../app/@modules/master.module').then((m) => m.MasterModule),
  },
  {
    path: 'request-form',
    loadChildren: () =>
      import('../app/request/request.module').then((m) => m.RequestModule),
  },

  {
    path: 'send-rfp-link',
    loadChildren: () =>
      import('../app/send-rfp/send-rfp.module').then((m) => m.SendRfpModule),
  },

  {
    path: 'advance-planning',
    loadChildren: () =>
      import(
        './@modules/lead/existing-customer/advance-planning/advance-planning.module'
      ).then((m) => m.AdvancePlanningModule),
  },
  {
    path: 'suspection',
    loadChildren: () =>
      import(
        './@modules/lead/existing-customer/suspection/suspection.module'
      ).then((m) => m.SuspectionModule),
  },
  {
    path: 'withdrawal',
    loadChildren: () =>
      import(
        './@modules/lead/existing-customer/withdrawal/withdrawal.module'
      ).then((m) => m.WithdrawalModule),
  },
  {
    path: 'finance',
    loadChildren: () =>
      import('./@modules/finance/finance.module').then((m) => m.FinanceModule),
  },
  {
    path: 'account-receivable',
    loadChildren: () =>
      import(
        './@modules/finance/account-receivable/account-receivable.module'
      ).then((m) => m.AccountReceivableModule),
  },
  {
    path: 'invoice-request',
    loadChildren: () =>
      import(
        './@modules/finance/account-receivable/invoice-request/invoice-request.module'
      ).then((m) => m.InvoiceRequestModule),
  },
  {
    path: 'e-invoice',
    loadChildren: () =>
      import(
        './@modules/finance/account-receivable/e-invoice/e-invoice.module'
      ).then((m) => m.EInvoiceModule),
  },
  {
    path: 'shared-invoice',
    loadChildren: () =>
      import(
        './@modules/finance/account-receivable/shared-invoice/shared-invoice.module'
      ).then((m) => m.SharedInvoiceModule),
  },
  {
    path: 'customer-type',
    loadChildren: () =>
      import(
        './@modules/itticketing/configurationalmaster/customer-type/customer-type.module'
      ).then((m) => m.CustomerTypeModule),
  },
  {
    path: 'training-name',
    loadChildren: () =>
      import(
        './@modules/itticketing/configurationalmaster/training-name/training-name.module'
      ).then((m) => m.TrainingNameModule),
  },
  {
    path: 'level-slab',
    loadChildren: () =>
      import(
        './@modules/itticketing/configurationalmaster/level-slab/level-slab.module'
      ).then((m) => m.LevelSlabModule),
  },
  {
    path: 'pricing-level',
    loadChildren: () =>
      import(
        './@modules/itticketing/configurationalmaster/pricing-level/pricing-level.module'
      ).then((m) => m.PricingLevelModule),
  },

  {
    path: 'receive-response',
    loadChildren: () =>
      import('./answering-form/answering-form.module').then(
        (m) => m.AnsweringFormModule
      ),
  },

  {
    path: 'response-confirmation',
    loadChildren: () =>
      import('./branching-form/branching-form.module').then(
        (m) => m.BranchingFormModule
      ),
  },

  {
    path: 'send-vendor',
    loadChildren: () =>
      import('./send-link-vendor/send-link-vendor.module').then(
        (m) => m.SendLinkVendorModule
      ),
  },
  {
    path: 'training-material',
    loadChildren: () =>
      import(
        './@modules/audit/pre-audit/training-material/training-material.module'
      ).then((m) => m.TrainingMaterialModule),
  },
  {
    path: 'training--result',
    loadChildren: () =>
      import(
        './@modules/audit/pre-audit/training-result/training-result.module'
      ).then((m) => m.TrainingResultModule),
  },

  {
    path: 'new-employee-form',
    loadChildren: () =>
      import('./new-employee-form/new-employee-form.module').then(
        (m) => m.NewEmployeeFormModule
      ),
  },
  {
    path: 'open-house-training',
    loadChildren: () =>
      import('../app/registration/registration.module').then((m) => m.RegistrationModule),
  },
  { 
    path: 'production', 
    loadChildren: () => 
     import('./@modules/production/production.module').then(m => m.ProductionModule) },
  { 
      path: 'quality-management', 
      loadChildren: () => 
      import('./@modules/quality-management/quality-management.module').then(m => m.QualityManagementModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
