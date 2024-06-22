import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AmcAgreementRoutingModule } from './amc-agreement-routing.module';
import { AmcAgreementComponent } from './amc-agreement.component';


@NgModule({
  declarations: [
    AmcAgreementComponent
  ],
  imports: [
    CommonModule,
    AmcAgreementRoutingModule
  ]
})
export class AmcAgreementModule { }
