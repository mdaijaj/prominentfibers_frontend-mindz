import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminSupportComponent } from './admin-support.component';

const routes: Routes = [
  { path: "", component: AdminSupportComponent,
  children: [
    {
      path: '', redirectTo: 'courier-inward', pathMatch: 'full'
    },

    {
      path: 'amc-agreement',
      loadChildren: () => import('./amc-agreement/amc-agreement.module').then(m => m.AmcAgreementModule),
    },
    
    {
      path: 'courier-inward',
      loadChildren: () => import('./courier-inward/courier-inward.module').then(m => m.CourierInwardModule),
    },
    {
      path: 'courier-outward',
      loadChildren: () => import('./courier-outward/courier-outward.module').then(m => m.CourierOutwardModule),
    },
    {
      path: 'rental-agreement',
      loadChildren: () => import('./rental-agreement/rental-agreement.module').then(m => m.RentalAgreementModule),
    },
    {
      path: 'house-keeping-sicurity-agreement',
      loadChildren: () => import('./hk-security-agreement/hk-security-agreement.module').then(m => m.HkSecurityAgreementModule),
    },
    {
      path: 'insurance-agreement',
      loadChildren: () => import('./insurance-agreement/insurance-agreement.module').then(m => m.InsuranceAgreementModule),
    }
  ]
},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminSupportRoutingModule { }
