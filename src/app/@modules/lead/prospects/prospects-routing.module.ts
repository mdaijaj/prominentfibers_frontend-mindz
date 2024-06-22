import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProspectCreateComponent } from './create-prospects/create.prospect.component';
import { ListProspectsComponent } from './list-prospects/list-prospects.component';

const routes: Routes = [
    { path: '', component: ListProspectsComponent },
    { path: 'create-prospect', component: ProspectCreateComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LeadProspectRoutingModule { }
