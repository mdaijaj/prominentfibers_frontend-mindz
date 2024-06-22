import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdvancePaymentRoutingModule } from './advance-payment-routing.module';
import { AdvancePaymentComponent } from './advance-payment.component';
import {  AgGridModule } from 'ag-grid-angular';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MaterialModule } from 'src/app/@shared/material/material.module';
import { HttpClientModule } from '@angular/common/http';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdvancePaymentCreateComponent } from './advance-payment-create/advance-payment-create.component';
import { ActionComponent } from './action/action.component';
import { AdvancePaymentPipePipe } from 'src/app/@shared/pipe/advance-payment-pipe.pipe';
import { DialogComponent } from './dialog/dialog.component';


@NgModule({
  declarations: [
    AdvancePaymentComponent,
    AdvancePaymentCreateComponent,
    ActionComponent,
    AdvancePaymentPipePipe,
    DialogComponent
  ],
  imports: [
    CommonModule,
    AdvancePaymentRoutingModule,
    AgGridModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MaterialModule,
    HttpClientModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class AdvancePaymentModule { }
