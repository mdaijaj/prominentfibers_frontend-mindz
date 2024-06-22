import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RejectedPrRoutingModule } from './rejected-pr-routing.module';
import { RejectedPrComponent } from './rejected-pr.component';
import { AgGridModule } from 'ag-grid-angular';
import { MaterialModule } from 'src/app/@shared/material/material.module';
import { RejectedActionComponent } from './rejected-action/rejected-action.component';
import { RejectedDilogComponent } from './rejected-dilog/rejected-dilog.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    RejectedPrComponent,
    RejectedActionComponent,
    RejectedDilogComponent
  ],
  imports: [
    CommonModule,
    RejectedPrRoutingModule,
    AgGridModule,
    MaterialModule,
    FormsModule
  ]
})
export class RejectedPrModule { }
