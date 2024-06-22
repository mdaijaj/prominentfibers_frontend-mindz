import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CloseRfpRoutingModule } from './close-rfp-routing.module';
import { CloseRfpComponent } from './close-rfp.component';
import { AgGridModule } from 'ag-grid-angular';
import { CloseRfpActionComponent } from './close-rfp-action/close-rfp-action.component';
import { MaterialModule } from 'src/app/@shared/material/material.module';
import { CloseRfpExtendDateComponent } from './close-rfp-extend-date/close-rfp-extend-date.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    CloseRfpComponent,
    CloseRfpActionComponent,
    CloseRfpExtendDateComponent
  ],
  imports: [
    CommonModule,
    CloseRfpRoutingModule,
    AgGridModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule

  ]
})
export class CloseRfpModule { }
