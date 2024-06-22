import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ValidateLeadComponent } from './validate-lead-create/validate-lead.component';
import { ValidateListComponent } from './validate-lead-list/list-validate.component';

const routes: Routes = [
    { path: '', component: ValidateListComponent },
    { path: 'validate-lead', component: ValidateLeadComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LeadValidateRoutingModule { }
