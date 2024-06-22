import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FeaApprovelCreateComponent } from './fea-approvel-create/fea-approvel-create.component';
import { FeaApprovelComponent } from './fea-approvel.component';
import { FeaApprovelApproveComponent } from './fea-approvel-approve/fea-approvel-approve.component';

const routes: Routes = [
  {path:'fea-approvel-create',component:FeaApprovelCreateComponent},
  {path:'fea-approvel-list',component:FeaApprovelComponent},
  {path:'fea-approver',component:FeaApprovelApproveComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FeaApprovelRoutingModule { }
