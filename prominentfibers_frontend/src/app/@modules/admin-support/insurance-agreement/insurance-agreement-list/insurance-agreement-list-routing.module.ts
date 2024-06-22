import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InsuranceAgreementListComponent } from './insurance-agreement-list.component';

const routes: Routes = [
  { path: "", component: InsuranceAgreementListComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InsuranceAgreementListRoutingModule { }
