import { NgModule } from '@angular/core';

import { AdvancePaymentActionComponent } from './advance-payment-action/advance-payment-action.component';
import { AdvancePaymentComponent } from './advance-payment/advance-payment.component';
import { CommonModule } from '@angular/common';
import { AgGridModule } from 'ag-grid-angular';
import { MaterialModule } from 'src/app/@shared/material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdvancePaymentRoutingModule } from './advance-payment-routing.module';



@NgModule({
  declarations: [
    AdvancePaymentActionComponent,
    AdvancePaymentComponent
  ],
  imports: [
    CommonModule,
    AgGridModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    AdvancePaymentRoutingModule
  ]
})
export class AdvancePaymentModule { }
