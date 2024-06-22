import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ApprovedPoRoutingModule } from './approved-po-routing.module';
import { ApprovedPoComponent } from './approved-po.component';
import { FormsModule } from '@angular/forms';
import { AgGridModule } from 'ag-grid-angular';
import { MaterialModule } from 'src/app/@shared/material/material.module';
import { ApprovedActionComponent } from './approved-action/approved-action.component';
import { ApprovedDilogComponent } from './approved-dilog/approved-dilog.component';


@NgModule({
  declarations: [
    ApprovedPoComponent,
    ApprovedActionComponent,
    ApprovedDilogComponent
  ],
  imports: [
    CommonModule,
    ApprovedPoRoutingModule,
    AgGridModule,
    MaterialModule,
    FormsModule
  ]
})
export class ApprovedPoModule { }
