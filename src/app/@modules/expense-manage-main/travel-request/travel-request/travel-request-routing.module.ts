import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TravelRequestListComponent } from './travel-request-list/travel-request-list.component';
import { TravelRequestComponent } from './travel-request-create/travel-request.component';
import { TaskOrderExpenseListComponent } from './task-order-list/task-order-expense-list.component';
import { ConfirmTravelRequestComponent } from './confirm-travel-request/confirm-travel-request.component';
import { BookTicketTravelRequestComponent } from './book-ticket-travel-request/book-ticket-travel-request.component';
import { CancelRequestComponent } from './cancel-request/cancel-request.component';
import { DownloadTravelTicketComponent } from './download-travel-ticket/download-travel-ticket.component';
import { CacncelTicketApprovedComponent } from './cacncel-ticket-approved/cacncel-ticket-approved.component';

const routes: Routes = [
    { path: '', component: TravelRequestListComponent },
    { path: 'create-request', component: TravelRequestComponent },
    {path:'task-order-travel',component:TaskOrderExpenseListComponent},
    {path:'confirm-travel-request',component:ConfirmTravelRequestComponent},
    {path:'book-travel-request',component:BookTicketTravelRequestComponent},
    {path:'cancel-reuest',component:CancelRequestComponent},
    {path:'download-ticket',component:DownloadTravelTicketComponent},
    {path:'cancel-ticket_approved',component:CacncelTicketApprovedComponent},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TravelRequestRoutingModule { }
