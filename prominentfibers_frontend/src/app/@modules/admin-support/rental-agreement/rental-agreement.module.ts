import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RentalAgreementRoutingModule } from './rental-agreement-routing.module';
import { RentalAgreementComponent } from './rental-agreement.component';


@NgModule({
  declarations: [
    RentalAgreementComponent,
  ],
  imports: [
    CommonModule,
    RentalAgreementRoutingModule
  ]
})
export class RentalAgreementModule { }
