import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HkSecurityAgreementRoutingModule } from './hk-security-agreement-routing.module';
import { HkSecurityAgreementComponent } from './hk-security-agreement.component';


@NgModule({
  declarations: [
    HkSecurityAgreementComponent
  ],
  imports: [
    CommonModule,
    HkSecurityAgreementRoutingModule
  ]
})
export class HkSecurityAgreementModule { }
