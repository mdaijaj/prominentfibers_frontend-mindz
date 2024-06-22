import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WorkOrderComponent } from './work-order-list/work-order.component';
import { ClubWorkOrderListComponent } from './club-work-order-list/club-work-order-list.component';
import { WorkOrderNonCertComponent } from './work-order-non-cert/work-order-non-cert.component';
import { WorkOrderCreateComponent } from './work-order-create/work-order-create.component';
import { WorkOrderCreateNonCertComponent } from './work-order-create-non-cert/work-order-create-non-cert.component';

const routes: Routes = [
    { path: '', component: WorkOrderComponent },
    { path: 'create-order', component: WorkOrderCreateComponent },
    { path: 'create-non-cert-order', component: WorkOrderCreateNonCertComponent},
    { path: 'club-work-order-list', component: ClubWorkOrderListComponent },
    { path: 'work-order-list', component: WorkOrderComponent },
    { path: 'work-order-non-cert', component: WorkOrderNonCertComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WorkOrderRoutingModule { }
