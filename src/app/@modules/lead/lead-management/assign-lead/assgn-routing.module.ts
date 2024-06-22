import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AssignLeadComponent } from './assign-lead-create/assign-lead.component';
import { AssignListComponent } from './assign-lead-list/list-assign.component';

const routes: Routes = [
    { path: '', component: AssignListComponent },
    { path: 'assign-lead', component: AssignLeadComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LeadAssignRoutingModule { }
