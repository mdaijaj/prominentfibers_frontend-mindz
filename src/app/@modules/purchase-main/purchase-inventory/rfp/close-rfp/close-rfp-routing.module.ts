import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CloseRfpComponent } from './close-rfp.component';

const routes: Routes = [
  { path: "", component: CloseRfpComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CloseRfpRoutingModule { }
