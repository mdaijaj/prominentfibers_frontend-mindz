import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SendForSMComponent } from './send-for-s&m-create/send-for-s&m.component';
import { SendForSMListComponent } from './send-for-s&m-list/send-for-s&m-list.component';

const routes: Routes = [
    { path: '', component: SendForSMListComponent },
    { path: 'send-for-sm-quote', component: SendForSMComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SendForSMRoutingModule { }
