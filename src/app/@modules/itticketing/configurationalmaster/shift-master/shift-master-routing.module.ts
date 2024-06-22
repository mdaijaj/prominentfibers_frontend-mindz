import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShiftMasterListComponent } from './shift-master-list/shift-master-list.component';
import { ShiftMasterCreateComponent } from './shift-master-create/shift-master-create.component';
import { ShiftMasterViewComponent } from './shift-master-view/shift-master-view.component';

const routes: Routes = [
  {path: '', component: ShiftMasterListComponent},
  {path: 'create', component: ShiftMasterCreateComponent},
  {path: 'view', component: ShiftMasterViewComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShiftMasterRoutingModule { }
