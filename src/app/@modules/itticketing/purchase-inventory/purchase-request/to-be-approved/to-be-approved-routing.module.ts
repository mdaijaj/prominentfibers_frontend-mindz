import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ToBeApprovedComponent } from './to-be-approved.component';

const routes: Routes = [
  { path: "", component: ToBeApprovedComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ToBeApprovedRoutingModule { }
