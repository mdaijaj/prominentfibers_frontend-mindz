import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RaisePoComponent } from './raise-po/raise-po.component';

const routes: Routes = [
  { path: "", component: RaisePoComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RaisePORoutingModule { }