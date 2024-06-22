import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InitiateRfpRoutingModule } from './initiate-rfp-routing.module';
import { InitiateRfpComponent } from './initiate-rfp.component';
import { AgGridModule } from 'ag-grid-angular';
import { InitiateRfpActionComponent } from './initiate-rfp-action/initiate-rfp-action.component';
import { MaterialModule } from 'src/app/@shared/material/material.module';
import { SendRfpLinkComponent } from './send-rfp-link/send-rfp-link.component';
import {FormsModule ,ReactiveFormsModule} from '@angular/forms'


@NgModule({
  declarations: [
    InitiateRfpComponent,
    InitiateRfpActionComponent,
    SendRfpLinkComponent
  ],
  imports: [
    CommonModule,
    InitiateRfpRoutingModule,
    AgGridModule,
    MaterialModule,
    ReactiveFormsModule
  ]
})
export class InitiateRfpModule { }
