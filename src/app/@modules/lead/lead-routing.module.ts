import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { LeadGenerationComponent } from './lead-management/lead-management.component';
import { LeadComponent } from './lead.component';

const routes: Routes = [
  {
    path:'',component:LeadComponent,
    children:[
      // {
      //   path:'',redirectTo:'lead-management',pathMatch:'full'
      // },
      {
        path:'lead-management',
        loadChildren:()=>import('./lead-management/lead-management.module').then(m=>m.LeadManagementModule)
      },
      {
        path:'lead-prospect',
        loadChildren:()=>import('./prospects/prospects.module').then(m=>m.LeadProspectModule)
      },
      {
        path:'lead-account',
        loadChildren:()=>import('./accounts/account.module').then(m=>m.LeadAccountModule)
      },
      {
        path:'lead-opportunity',
        loadChildren:()=>import('./opportunity/opportunity.module').then(m=>m.LeadOpportunityModule)
      },
      {
        path:'quotation',
        loadChildren:()=>import('./quotation-module/quotation.module').then(m=>m.QuotationModule)
      },
      {
        path:'inter-company',
        loadChildren:()=>import('./inter-company/inter-company.module').then(m=>m.InterCompanyModule)
      },
      {
        path:'existing-customer',
        loadChildren:()=>import('./existing-customer/existing-customer.module').then(m=>m.ExistingCustomerModule)
      },
      {
        path:'reports',
        loadChildren:()=>import('./reports/reports.module').then(m=>m.ReportsModule)
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LeadRoutingModule { }
