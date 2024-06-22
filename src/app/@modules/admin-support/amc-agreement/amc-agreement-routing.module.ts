import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AmcAgreementComponent } from './amc-agreement.component';

const routes: Routes = [
  { path: "", component: AmcAgreementComponent},
  {
    path: 'amc-agreement-list',
    loadChildren: () =>
      import('./amc-agreement-list/amc-agreement-list.module').then((m) => m.AmcAgreementListModule), 
  },
  {
    path: 'create-amc-agreement',
    loadChildren: () =>
      import('./create-amc-agreement/create-amc-agreement.module').then((m) => m.CreateAmcAgreementModule), 
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AmcAgreementRoutingModule { }
