import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuditManagementComponent } from '../audit-management.component';
import { AddAuditorListComponent } from './add-auditor-list/add-auditor-list.component';
import { AddAuditorCreateComponent } from './add-auditor-create/add-auditor-create.component';

const routes: Routes = [
  { path: '', component:AddAuditorListComponent },
  {path:'add-auditor-create',component:AddAuditorCreateComponent}
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddAuditorRoutingModule { }
