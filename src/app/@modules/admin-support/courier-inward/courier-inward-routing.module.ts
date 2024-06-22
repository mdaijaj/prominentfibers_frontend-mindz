import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CourierInwardComponent } from './courier-inward.component';
import { CourierResendLinkComponent } from './courier-resend-link/courier-resend-link.component';
import { ResendAcceptRejectComponent } from './resend-accept-reject/resend-accept-reject.component';

const routes: Routes = [
  { path: "", component: CourierInwardComponent},
  {
    path: 'courier-inward-list',
    loadChildren: () =>
      import('./courier-inward-list/courier-inward-list.module').then((m) => m.CourierInwardListModule), 
  },

  {
    path: 'create-inward',
    loadChildren: () =>
      import('./create-inward/create-inward.module').then((m) => m.CreateInwardModule), 
  },

  {
    path: 'courier-re-send',
    component:CourierResendLinkComponent, 
  },

  {
    path: 'courier-accept-reject',
    component:ResendAcceptRejectComponent, 
  },

  {
    path: 'courier-inward-user-list',
    loadChildren: () =>
      import('./courier-user-list/courier-user-list.module').then((m) => m.CourierUserListModule), 
  },
  {
    path: 'courier-acceptance-rejection',
    loadChildren: () =>
      import('./courier-acceptance-rejection/courier-acceptance-rejection.module').then((m) => m.CourierAcceptanceRejectionModule), 
  },
  {
    path: 'courier-redirect',
    loadChildren: () =>
      import('./courier-redirect/courier-redirect.module').then((m) => m.CourierRedirectModule), 
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CourierInwardRoutingModule { }
