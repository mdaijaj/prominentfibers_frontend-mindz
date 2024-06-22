import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MangeAccessListComponent } from './mange-access-list/mange-access-list.component';

const routes: Routes = [
  {path:'',component:MangeAccessListComponent}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MangerAccessRoutingModule { }
