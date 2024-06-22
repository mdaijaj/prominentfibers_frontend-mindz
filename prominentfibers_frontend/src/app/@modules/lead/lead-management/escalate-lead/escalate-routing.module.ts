import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EscalateListComponent } from './escalate-lead-list/list-escalate.component';

const routes: Routes = [
    { path: '', component: EscalateListComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LeadEscalateRoutingModule { }
