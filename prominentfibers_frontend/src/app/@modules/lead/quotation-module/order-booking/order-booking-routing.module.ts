import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrderBookingCreateComponent } from './order-booking-create/order-booking-create.component';
import { OrderBookingListComponent } from './order-booking-list/order-booking-list.component';

const routes: Routes = [
  {path:'',component:OrderBookingListComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrderBookingRoutingModule { }
