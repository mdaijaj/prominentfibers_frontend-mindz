import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotificationComponent } from './notification.component';
import { LmsComponent } from './lms/lms.component';
import { AdvancePlanningComponent } from './advance-planning/advance-planning.component';
import { CpComponent } from './cp/cp.component';
import { SAndMComponent } from './s-and-m/s-and-m.component';
import { AllNotificationComponent } from './all-notification/all-notification.component';

const routes: Routes = [
  {path:'',component:NotificationComponent},
  {path:'lms',component:LmsComponent},
  {path:'ad-planning',component:AdvancePlanningComponent},
  {path:'cp',component:CpComponent},
  {path:'app-s-and-m',component:SAndMComponent},
  {path:'all-notification',component:AllNotificationComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NotificationRoutingModule { }
