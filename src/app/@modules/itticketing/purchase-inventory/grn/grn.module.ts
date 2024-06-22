import { NgModule } from '@angular/core';

import { GrnReportComponent } from './grn-report/grn-report.component';
import { GrnReportActionComponent } from './grn-report-action/grn-report-action.component';
import { GenrateGrnComponent } from './genrate-grn/genrate-grn.component';
import { CommonModule } from '@angular/common';
import { GRNRoutingModule } from './grn-report-routing.module';
import { AgGridModule } from 'ag-grid-angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/@shared/material/material.module';



@NgModule({
  declarations: [
    GrnReportComponent,
    GrnReportActionComponent,
    GenrateGrnComponent
  ],
  imports: [
    CommonModule,
    GRNRoutingModule,
    AgGridModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class GrnModule { }
