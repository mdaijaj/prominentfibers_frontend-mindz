import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BranchingFormComponent } from './branching-form.component';

const routes: Routes = [
  {path: "", component: BranchingFormComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BranchingFormRoutingModule { }
