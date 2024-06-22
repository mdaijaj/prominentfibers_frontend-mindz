import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CreateOutwardRoutingModule } from './create-outward-routing.module';
import { CreateOutwardComponent } from './create-outward.component';
import { MaterialModule } from 'src/app/@shared/material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    CreateOutwardComponent
  ],
  imports: [
    CommonModule,
    CreateOutwardRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule
  ]
})
export class CreateOutwardModule { }
