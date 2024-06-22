import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaymentVerificationComponent } from './payment-verification.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AgGridModule } from 'ag-grid-angular';
import { MaterialModule } from 'src/app/@shared/material/material.module';
import { ShairedModule } from 'src/app/@shared/shaired/shaired.module';
import { PaymentVarificationRoutingModule } from './payment-verification-routing.module';
import { PaymentVerificationActionComponent } from './payment-verification-action/payment-verification-action.component';
import { PaymentVerificationCheckComponent } from './payment-verification-check/payment-verification-check.component';



@NgModule({
  declarations: [PaymentVerificationComponent, PaymentVerificationActionComponent, PaymentVerificationCheckComponent],
  imports: [
    CommonModule,
    MaterialModule,
    AgGridModule,
    ReactiveFormsModule,
    ShairedModule,
    FormsModule,
    PaymentVarificationRoutingModule
  ]
})
export class PaymentVerificationModule { }
