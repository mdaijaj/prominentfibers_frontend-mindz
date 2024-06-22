import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RentalAgreementListComponent } from './rental-agreement-list.component';

const routes: Routes = [
  { path: "", component: RentalAgreementListComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RentalAgreementListRoutingModule { }
