import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HkSecurityAgreementComponent } from './hk-security-agreement.component';

const routes: Routes = [
  { path: "", component: HkSecurityAgreementComponent},
  {
    path: 'house-keeping-security-agreement-list',
    loadChildren: () =>
      import('./hk-security-agreement-list/hk-security-agreement-list.module').then((m) => m.HkSecurityAgreementListModule), 
  },
  {
    path: 'create-house-keeping-security-agreement',
    loadChildren: () =>
      import('./create-hk-s-agreement/create-hk-s-agreement.module').then((m) => m.CreateHkSAgreementModule), 
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HkSecurityAgreementRoutingModule { }
