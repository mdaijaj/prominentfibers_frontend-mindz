import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LeadValidationListComponent } from './lead-validation-list/lead-validation-list.component';

const routes: Routes = [
  { path: '', component: LeadValidationListComponent },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LeadValidationRoutingModule { }
