import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CourierAcceptanceRejectionRoutingModule } from './courier-acceptance-rejection-routing.module';
import { CourierAcceptanceRejectionComponent } from './courier-acceptance-rejection.component';
import { MaterialModule } from 'src/app/@shared/material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [CourierAcceptanceRejectionComponent],
  imports: [
    CommonModule,
    CourierAcceptanceRejectionRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class CourierAcceptanceRejectionModule {}
