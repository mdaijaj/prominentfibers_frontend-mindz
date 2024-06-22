import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MajorCustomerReasonComponent } from './major-customer-reason/major-customer-reason.component';
import { MajorCustomerReasonListComponent } from './major-customer-reason-list/major-customer-reason-list.component';

const routes: Routes = [
  {path:'',component:MajorCustomerReasonListComponent},
  {path:'major-cutomer-create',component:MajorCustomerReasonComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MajorCutomerReasonRoutingModule { }
