import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InsuranceAgreementComponent } from './insurance-agreement.component';

const routes: Routes = [
  { path: "", component:InsuranceAgreementComponent},
  {
    path: 'insurance-agreement-list',
    loadChildren: () =>
      import('./insurance-agreement-list/insurance-agreement-list.module').then((m) => m.InsuranceAgreementListModule), 
  },
  {
    path: 'create-insurance-agreement',
    loadChildren: () =>
      import('./create-insurance/create-insurance.module').then((m) => m.CreateInsuranceModule), 
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InsuranceAgreementRoutingModule { }
