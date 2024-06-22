import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CourierOutwardComponent } from './courier-outward.component';

const routes: Routes = [
  { path: "", component: CourierOutwardComponent},
  {
    path: 'courier-outward-list',
    loadChildren: () =>
      import('./courier-outward-list/courier-outward-list.module').then((m) => m.CourierOutwardListModule), 
  },
  {
    path: 'create-outward',
    loadChildren: () =>
      import('./create-outward/create-outward.module').then((m) => m.CreateOutwardModule), 
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CourierOutwardRoutingModule { }
