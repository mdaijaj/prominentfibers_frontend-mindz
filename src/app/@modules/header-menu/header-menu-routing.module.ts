import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { MyPendingTaskComponent } from './my-pending-task/my-pending-task.component';

const routes: Routes = [
  {path:'pending-task', component : MyPendingTaskComponent},
  {
    path: 'notification',
    loadChildren: () => import('./notification/notification.module').then(m => m.NotificationModule),
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HeaderMenuRoutingModule { }
