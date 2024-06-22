import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReceiveRequestCreateComponent } from './receive-request-create/receive-request-create.component';
import { ReceiveRequestListComponent } from './receive-request-list/receive-request-list.component';
import { ReceivedResponseComponent } from './received-response/received-response.component';
import { ResponseConfirmationComponent } from './response-confirmation/response-confirmation.component';
const routes: Routes = [
    { path: '', component: ReceiveRequestListComponent },
    { path: 'receive-request-create', component: ReceiveRequestCreateComponent },
    { path: 'receive-response', component: ReceivedResponseComponent },
    { path: 'response-confirmation', component: ResponseConfirmationComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReceiveRequestRoutingModule { }
