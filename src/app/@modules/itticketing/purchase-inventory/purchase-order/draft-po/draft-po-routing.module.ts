import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DraftPoComponent } from './draft-po/draft-po.component';

const routes: Routes = [
  { path: "", component: DraftPoComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DraftPORoutingModule { }