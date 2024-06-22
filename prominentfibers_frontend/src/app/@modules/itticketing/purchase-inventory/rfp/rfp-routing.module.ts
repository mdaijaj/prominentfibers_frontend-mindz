import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RfpComponent } from './rfp.component';
import { AuthGuard } from 'src/app/@auth/auth-material/auth.guard';

const routes: Routes = [
  { path: "", component: RfpComponent,
  children: [
    {
      path: '', redirectTo: 'initiate-rfp', pathMatch: 'full'
    },

    {
      canActivate: [AuthGuard],
      path:'initiate-rfp',
      loadChildren:()=>import('./initiate-rfp/initiate-rfp.module').then(m=>m.InitiateRfpModule)
    },

    {
      canActivate: [AuthGuard],
      path:'live-rfp',
      loadChildren:()=>import('./live-rfp/live-rfp.module').then(m=>m.LiveRfpModule)
    },

    {
      canActivate: [AuthGuard],
      path:'close-rfp',
      loadChildren:()=>import('./close-rfp/close-rfp.module').then(m=>m.CloseRfpModule)
    },
  ]},
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RfpRoutingModule { }
