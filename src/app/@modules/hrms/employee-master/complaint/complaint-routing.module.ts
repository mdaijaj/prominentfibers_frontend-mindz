import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ComplaintCreateComponent } from './complaint-create/complaint-create.component';
import { ComplaintListComponent } from './complaint-list/complaint-list.component';

const routes: Routes = [
  {path:'complaint-create',component:ComplaintCreateComponent},
  {path:'complaint-list',component:ComplaintListComponent}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ComplaintRoutingModule { }
