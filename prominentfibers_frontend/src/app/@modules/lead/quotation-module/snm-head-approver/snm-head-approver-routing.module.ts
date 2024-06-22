import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SnMHeadListComponent } from './snm-head-approver-list/snm-head-approver-list.component';
import { SnMHeadNewComponent } from './snm-head-approver-create/snm-head-approver.component';

const routes: Routes = [
    { path: '', component: SnMHeadListComponent },
    { path: 'snm-head-approver', component: SnMHeadNewComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SnMHeadRoutingModule { }
