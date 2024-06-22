import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RejectedPoRoutingModule } from './rejected-po-routing.module';
import { AgGridModule } from 'ag-grid-angular';
import { MaterialModule } from 'src/app/@shared/material/material.module';
import { FormsModule } from '@angular/forms';
import { RejectedPoComponent } from './rejected-po.component';
import { RejectedActionComponent } from './rejected-action/rejected-action.component';
import { RejectedDilogComponent } from './rejected-dilog/rejected-dilog.component';


@NgModule({
  declarations: [
    RejectedPoComponent,
    RejectedActionComponent,
    RejectedDilogComponent
  ],
  imports: [
    CommonModule,
    RejectedPoRoutingModule,
    AgGridModule,
    MaterialModule,
    FormsModule
  ]
})
export class RejectedPoModule { }
