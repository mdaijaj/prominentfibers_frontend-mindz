import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateOutwardComponent } from './create-outward.component';

const routes: Routes = [
  { path: "", component: CreateOutwardComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CreateOutwardRoutingModule { }
