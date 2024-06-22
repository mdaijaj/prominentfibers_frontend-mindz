import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewTicketListComponent } from '../new-ticket-list/new-ticket-list.component';
import { TicketListComponent } from './ticket-list.component';

const routes: Routes = [
  {path:'',component:TicketListComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TicketListRoutingModule { }
