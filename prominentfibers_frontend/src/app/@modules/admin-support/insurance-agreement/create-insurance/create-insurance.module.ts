import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CreateInsuranceRoutingModule } from './create-insurance-routing.module';
import { CreateInsuranceComponent } from './create-insurance.component';
import { MaterialModule } from 'src/app/@shared/material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    CreateInsuranceComponent
  ],
  imports: [
    CommonModule,
    CreateInsuranceRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class CreateInsuranceModule { }
