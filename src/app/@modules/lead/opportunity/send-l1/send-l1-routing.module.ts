import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SendL1Component } from './create-send-l1/send-l1.component';
import { ListSendL1Component } from './list-send-l1/list-send-l1.component';

const routes: Routes = [
  { path: '', component: ListSendL1Component },
  { path: 'send-for-l1', component: SendL1Component },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SendL1RoutingModule {}
