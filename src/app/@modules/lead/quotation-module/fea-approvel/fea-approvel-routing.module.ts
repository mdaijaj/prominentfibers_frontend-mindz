import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FeaAaprovelListComponent } from './fea-aaprovel-list/fea-aaprovel-list.component';
import { FeaApprovelCreateComponent } from './fea-approvel-create/fea-approvel-create.component';
import { FeaPendingListComponent } from './fea-pending-list/fea-pending-list.component';

const routes: Routes = [
  {path:'',component:FeaAaprovelListComponent},
  {path:'fea-approvel-create',component:FeaApprovelCreateComponent},
  {path:'fea-pending-list',component:FeaPendingListComponent},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FeaApprovelRoutingModule { }
