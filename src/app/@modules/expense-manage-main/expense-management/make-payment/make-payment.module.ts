import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MakePaymentRoutingModule } from './make-payment-routing.module';
import { MakePaymentListComponent } from './make-payment-list/make-payment-list.component';
import { AgGridModule } from 'ag-grid-angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/@shared/material/material.module';
import { MakePaymentCreateComponent } from './make-payment-create/make-payment-create.component';


@NgModule({
  declarations: [
    MakePaymentListComponent,
    MakePaymentCreateComponent
  ],
  imports: [
    CommonModule,
    MakePaymentRoutingModule,
    AgGridModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule
  ]
})
export class MakePaymentModule { }
