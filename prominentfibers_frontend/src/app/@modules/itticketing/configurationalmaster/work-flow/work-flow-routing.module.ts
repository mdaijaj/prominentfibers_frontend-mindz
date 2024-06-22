import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WorkFlowComponent } from './work-flow.component';
import { AddWorkFlowComponent } from './add-work-flow/add-work-flow.component';

const routes: Routes = [
  {
    path:'',component:WorkFlowComponent
  },
  {
    path:'add-work-flow',component:AddWorkFlowComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WorkFlowRoutingModule { }
