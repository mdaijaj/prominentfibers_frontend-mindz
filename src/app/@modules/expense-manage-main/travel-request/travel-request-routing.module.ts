import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TravelRequestMainComponent } from './travel-request.component';

const routes: Routes = [
  {path:'', component:TravelRequestMainComponent},
  {
    path: 'travel-request',
    loadChildren: () => import('./travel-request/travel-request.module').then(m => m.TravelRequestModule),
  },
  {
    path: 'user-access',
    loadChildren: () => import('./user-access/user-access.module').then(m => m.UserAccessModule),
  },
  {
    path: 'agent-access',
    loadChildren: () => import('./agent-access/agent-access.module').then(m => m.AgentAccessModule),
  },
  {
    path: 'manger-access',
    loadChildren: () => import('./manger-access/manger-access.module').then(m => m.MangerAccessModule),
  },
  {
    path: 'Draft-travel',
    loadChildren: () => import('./travel-req-draft/travel-req-draft.module').then(m => m.TravelReqDraftModule),
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TravelRequestRoutingModule { }
