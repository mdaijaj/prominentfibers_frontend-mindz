import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrderBookingRoutingModule } from './order-booking-routing.module';
import { OrderBookingCreateComponent } from './order-booking-create/order-booking-create.component';
import { OrderBookingListComponent } from './order-booking-list/order-booking-list.component';
import { MaterialModule } from 'src/app/@shared/material/material.module';
import { AgGridModule } from 'ag-grid-angular';
import { CKEditorModule } from 'ckeditor4-angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LeadModule } from '../../lead.module';
import { PreAuditModule } from 'src/app/@modules/audit/pre-audit/pre-audit.module';

@NgModule({
  declarations: [
    OrderBookingCreateComponent,
    OrderBookingListComponent
  ],
  imports: [
    CommonModule,
    OrderBookingRoutingModule,
    AgGridModule,
    CKEditorModule,
    FormsModule,
    ReactiveFormsModule,
    LeadModule,
    PreAuditModule,
    MaterialModule
  ]
})
export class OrderBookingModule { }
