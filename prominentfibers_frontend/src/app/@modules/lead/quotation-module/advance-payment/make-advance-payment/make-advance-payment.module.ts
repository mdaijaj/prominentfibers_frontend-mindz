import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdvancePaymentListComponent } from './advance-payment-list/advance-payment-list.component';
import { AdvancePaymentCreateComponent } from './advance-payment-create/advance-payment-create.component';
import { MakeAdvancePaymentRoutingModule } from './make-advance-payment-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AgGridModule } from 'ag-grid-angular';
import { MaterialModule } from 'src/app/@shared/material/material.module';



@NgModule({
  declarations: [
    AdvancePaymentListComponent,
    AdvancePaymentCreateComponent
  ],
  imports: [
    CommonModule,
    MakeAdvancePaymentRoutingModule,
    AgGridModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class MakeAdvancePaymentModule { }
