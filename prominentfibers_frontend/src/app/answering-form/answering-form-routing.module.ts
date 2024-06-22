import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AnsweringFormComponent } from './answering-form.component';

const routes: Routes = [
  { path: "", component: AnsweringFormComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AnsweringFormRoutingModule { }
