import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HkSecurityAgreementListComponent } from './hk-security-agreement-list.component';

const routes: Routes = [
  { path: "", component: HkSecurityAgreementListComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HkSecurityAgreementListRoutingModule { }
