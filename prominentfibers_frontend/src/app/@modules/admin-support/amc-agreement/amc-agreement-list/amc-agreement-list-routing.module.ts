import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AmcAgreementListComponent } from './amc-agreement-list.component';

const routes: Routes = [
  { path: "", component: AmcAgreementListComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AmcAgreementListRoutingModule { }
