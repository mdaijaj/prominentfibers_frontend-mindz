import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RentalAgreementComponent } from './rental-agreement.component';

const routes: Routes = [
  { path: "", component: RentalAgreementComponent},
  {
    path: 'rental-agreement-list',
    loadChildren: () =>
      import('./rental-agreement-list/rental-agreement-list.module').then((m) => m.RentalAgreementListModule), 
  },
  {
    path: 'create-rental-agreement',
    loadChildren: () =>
      import('./create-rental-agree/create-rental-agree.module').then((m) => m.CreateRentalAgreeModule), 
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RentalAgreementRoutingModule { }
