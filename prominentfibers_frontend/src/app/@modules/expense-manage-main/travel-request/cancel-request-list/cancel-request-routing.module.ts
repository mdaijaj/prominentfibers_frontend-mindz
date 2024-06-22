import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// import { UserListComponent } from './user-list/user-list.component';
import { CancelListComponent } from './cacnel-reuest-list/cancel-listcomponent';

const routes: Routes = [
  {path:'',component:CancelListComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CancelRequestRoutingModule { }
