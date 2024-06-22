import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PurchaseRequestRoutingModule } from './purchase-request-routing.module';
import { PurchaseRequestComponent } from './purchase-request.component';
import { AgGridModule } from 'ag-grid-angular';



@NgModule({
  declarations: [
    PurchaseRequestComponent,
  ],
  imports: [
    CommonModule,
    PurchaseRequestRoutingModule,
    AgGridModule
  ]
})
export class PurchaseRequestModule { }
