import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CourierInwardRoutingModule } from './courier-inward-routing.module';
import { CourierInwardComponent } from './courier-inward.component';
import { CourierResendLinkComponent } from './courier-resend-link/courier-resend-link.component';
import { MaterialModule } from 'src/app/@shared/material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ResendAcceptRejectComponent } from './resend-accept-reject/resend-accept-reject.component';

@NgModule({
  declarations: [
    CourierInwardComponent,
    CourierResendLinkComponent,
    CourierResendLinkComponent,
    ResendAcceptRejectComponent
  ],
  imports: [
    CommonModule,
    CourierInwardRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class CourierInwardModule { }
