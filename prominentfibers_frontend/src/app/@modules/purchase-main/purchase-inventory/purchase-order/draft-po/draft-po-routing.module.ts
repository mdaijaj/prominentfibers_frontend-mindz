import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DraftPoComponent } from './draft-po/draft-po.component';
import { ApprovedPoUpdateComponent } from './approved-po-update/approved-po-update.component';

const routes: Routes = [
  { path: "", component: DraftPoComponent },
  { path: 'approved-po-update', component: ApprovedPoUpdateComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DraftPORoutingModule { }