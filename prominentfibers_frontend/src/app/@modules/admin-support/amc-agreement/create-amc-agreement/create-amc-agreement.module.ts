import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CreateAmcAgreementRoutingModule } from './create-amc-agreement-routing.module';
import { CreateAmcAgreementComponent } from './create-amc-agreement.component';
import { MaterialModule } from 'src/app/@shared/material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    CreateAmcAgreementComponent
  ],
  imports: [
    CommonModule,
    CreateAmcAgreementRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class CreateAmcAgreementModule { }
