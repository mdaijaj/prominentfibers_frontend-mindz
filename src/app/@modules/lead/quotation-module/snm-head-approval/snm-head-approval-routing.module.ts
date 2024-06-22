import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApprovalListComponent } from './approval-list/approval-list.component';
import { ApprovalActionComponent } from './approval-action/approval-action.component';

const routes: Routes = [
  {path:'', component:ApprovalListComponent},
  {path:'approval-action', component:ApprovalActionComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SnmHeadApprovalRoutingModule { }
