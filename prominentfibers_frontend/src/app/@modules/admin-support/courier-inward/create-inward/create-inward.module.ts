import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CreateInwardRoutingModule } from './create-inward-routing.module';
import { CreateInwardComponent } from './create-inward.component';
import { MaterialModule } from 'src/app/@shared/material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    CreateInwardComponent
  ],
  imports: [
    CommonModule,
    CreateInwardRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class CreateInwardModule { }
