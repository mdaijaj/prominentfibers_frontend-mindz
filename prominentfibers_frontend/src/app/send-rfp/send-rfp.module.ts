import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SendRfpRoutingModule } from './send-rfp-routing.module';
import { SendRfpComponent } from './send-rfp.component';
import { AgGridModule } from 'ag-grid-angular';
import { MaterialModule } from '../@shared/material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    SendRfpComponent
  ],
  imports: [
    CommonModule,
    SendRfpRoutingModule,
    AgGridModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class SendRfpModule { }
