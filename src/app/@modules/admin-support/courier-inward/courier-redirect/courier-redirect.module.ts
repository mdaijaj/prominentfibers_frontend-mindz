import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CourierRedirectRoutingModule } from './courier-redirect-routing.module';
import { CourierRedirectComponent } from './courier-redirect.component';
import { MaterialModule } from 'src/app/@shared/material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    CourierRedirectComponent
  ],
  imports: [
    CommonModule,
    CourierRedirectRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule

  ]
})
export class CourierRedirectModule { }
