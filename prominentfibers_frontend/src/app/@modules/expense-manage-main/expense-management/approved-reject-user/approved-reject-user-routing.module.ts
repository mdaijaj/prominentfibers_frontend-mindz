import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApprovedRejectListComponent } from './approved-reject-list/approved-reject-list.component';
import { ApprovedRejectCreateComponent } from './approved-reject-create/approved-reject-create.component';

const routes: Routes = [
  {path:'',component:ApprovedRejectListComponent},
  {path:'approved-reject-create',component:ApprovedRejectCreateComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ApprovedRejectUserRoutingModule { }


