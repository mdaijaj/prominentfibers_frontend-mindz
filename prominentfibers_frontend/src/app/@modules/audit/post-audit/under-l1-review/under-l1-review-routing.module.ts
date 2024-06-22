import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuditCompletedListComponent } from './audit-completed-list/audit-completed-list.component';
import { PostAuditVarificationComponent } from './post-audit-varification/post-audit-varification.component';

const routes: Routes = [
  {path:'',component:AuditCompletedListComponent},
  {path:'post-audit-verification',component:PostAuditVarificationComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UnderL1ReviewRoutingModule { }
