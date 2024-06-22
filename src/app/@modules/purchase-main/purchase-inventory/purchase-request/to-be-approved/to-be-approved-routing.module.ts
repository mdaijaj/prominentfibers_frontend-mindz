import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ToBeApprovedComponent } from './to-be-approved.component';
import { ApprovedPrUpdateComponent } from './approved-pr/approved-pr.component';

const routes: Routes = [
  { path: "", component: ToBeApprovedComponent},
  {path:'approved-pr',component:ApprovedPrUpdateComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ToBeApprovedRoutingModule { }
