import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CreateRentalAgreeRoutingModule } from './create-rental-agree-routing.module';
import { CreateRentalAgreeComponent } from './create-rental-agree.component';
import { MaterialModule } from 'src/app/@shared/material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    CreateRentalAgreeComponent
  ],
  imports: [
    CommonModule,
    CreateRentalAgreeRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class CreateRentalAgreeModule { }
