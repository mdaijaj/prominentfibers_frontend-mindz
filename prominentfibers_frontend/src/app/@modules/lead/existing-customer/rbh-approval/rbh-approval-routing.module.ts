import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RbhApprovalComponent } from './rbh-approval.component';
import { NotificationComponent } from './notification/notification.component';

const routes: Routes = [
  {path:'',component:RbhApprovalComponent},
  {path:'notification',component:NotificationComponent},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RBHApprovalRoutingModule { }
