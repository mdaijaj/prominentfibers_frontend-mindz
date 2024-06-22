import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WithdrawalComponent } from './withdrawal.component';
import { NotificationwComponent } from './notificationw/notificationw.component';

const routes: Routes = [{ path: '', component: WithdrawalComponent },
{path:'notificaiton',component:NotificationwComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WithdrawalRoutingModule { }
