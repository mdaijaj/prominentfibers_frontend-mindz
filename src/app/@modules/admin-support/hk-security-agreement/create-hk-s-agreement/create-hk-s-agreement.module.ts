import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CreateHkSAgreementRoutingModule } from './create-hk-s-agreement-routing.module';
import { CreateHkSAgreementComponent } from './create-hk-s-agreement.component';
import { MaterialModule } from 'src/app/@shared/material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    CreateHkSAgreementComponent
  ],
  imports: [
    CommonModule,
    CreateHkSAgreementRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class CreateHkSAgreementModule { }
