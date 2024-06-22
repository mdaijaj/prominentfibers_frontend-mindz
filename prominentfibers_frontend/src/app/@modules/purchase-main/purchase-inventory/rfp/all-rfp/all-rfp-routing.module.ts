import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllRfpListComponent } from './all-rfp-list/all-rfp-list.component';

const routes: Routes = [
  {path:'',component:AllRfpListComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AllRfpRoutingModule { }
