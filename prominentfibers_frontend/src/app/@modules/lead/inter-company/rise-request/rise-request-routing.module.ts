import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RiseRequestCreateComponent } from './rise-request-create/rise-request-create.component';
import { RiseRequestListComponent } from './rise-request-list/rise-request-list.component';

const routes: Routes = [
    { path: '', component: RiseRequestListComponent },
    { path: 'rise-request-create', component: RiseRequestCreateComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RiseRequestRoutingModule { }
