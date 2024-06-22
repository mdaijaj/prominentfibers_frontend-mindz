import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InitiateRfpComponent } from './initiate-rfp.component';
import { SendRfpLinkComponent } from './send-rfp-link/send-rfp-link.component';

const routes: Routes = [
  { path: "", component: InitiateRfpComponent},
  {
    path: 'send-rfp',component: SendRfpLinkComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InitiateRfpRoutingModule { }
