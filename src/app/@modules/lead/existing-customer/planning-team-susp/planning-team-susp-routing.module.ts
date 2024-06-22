import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlanningTeamSuspComponent } from './planning-team-susp.component';
import { NotificationComponent } from './notification/notification.component';

const routes: Routes = [
  {path:'',component:PlanningTeamSuspComponent},
  {path:'notification',component:NotificationComponent},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlanningTeamSuspRoutingModule { }
