import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewTicketListComponent } from './new-ticket-list/new-ticket-list.component';
// import { TicketListComponent } from './ticket-list/ticket-list.component';
import { TicketManagementComponent } from './ticket-management.component';

const routes: Routes = [
  {path:'', component:TicketManagementComponent},
  {path:'new-ticket-list', component:NewTicketListComponent},
  {
    path: 'Ticket-content',
    loadChildren: () => import('./ticket-list/ticket-list.module').then(m => m.TicketListModule),
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TicketManagementRoutingModule { }
