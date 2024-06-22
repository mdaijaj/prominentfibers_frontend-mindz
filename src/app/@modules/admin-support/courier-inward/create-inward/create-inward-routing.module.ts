import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateInwardComponent } from './create-inward.component';

const routes: Routes = [
  { path: "", component: CreateInwardComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CreateInwardRoutingModule { }
