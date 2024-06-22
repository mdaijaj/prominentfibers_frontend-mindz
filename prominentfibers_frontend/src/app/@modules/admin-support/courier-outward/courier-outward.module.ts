import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CourierOutwardRoutingModule } from './courier-outward-routing.module';
import { CourierOutwardComponent } from './courier-outward.component';


@NgModule({
  declarations: [
    CourierOutwardComponent
  ],
  imports: [
    CommonModule,
    CourierOutwardRoutingModule
  ]
})
export class CourierOutwardModule { }
