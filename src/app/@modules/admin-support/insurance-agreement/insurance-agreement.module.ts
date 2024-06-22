import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InsuranceAgreementRoutingModule } from './insurance-agreement-routing.module';
import { InsuranceAgreementComponent } from './insurance-agreement.component';


@NgModule({
  declarations: [
    InsuranceAgreementComponent
  ],
  imports: [
    CommonModule,
    InsuranceAgreementRoutingModule
  ]
})
export class InsuranceAgreementModule { }
