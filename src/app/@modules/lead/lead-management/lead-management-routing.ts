import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LeadAssignModule } from './assign-lead/assign.module';
import { CreateLeadComponent } from './create-lead/create-lead.component';
import { EscalateListComponent } from './escalate-lead/escalate-lead-list/list-escalate.component';
import { LeadHomeComponent } from './lead-home/lead-home.component';
import { LeadGenerationComponent } from './lead-management.component';
import { LeadMasterComponent } from './lead-master/lead-master.component';

const routes: Routes = [
    { path: '', component: LeadHomeComponent},
    { path: 'generate-lead', component: LeadGenerationComponent },
    { path: 'create-lead', component: CreateLeadComponent },
    { 
      path:'validate-lead',
      loadChildren:()=>import('./validate-lead/validate.module').then(m=>m.LeadValidateModule)
    },
    {
      path:'assign-lead',
      loadChildren:()=>import('./assign-lead/assign.module').then(m=>m.LeadAssignModule)
    },
    { 
      path:'escalate-lead',
      loadChildren:()=>import('./escalate-lead/escalate.module').then(m=>m.LeadEscalateModule)
    },
    { 
      path:'lead-validation',
      loadChildren:()=>import('./lead-validation/lead-validation.module').then(m=>m.LeadValidationModule)
    },
    { path: 'lead-master', component: LeadMasterComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LeadManagementRoutingModule { }
