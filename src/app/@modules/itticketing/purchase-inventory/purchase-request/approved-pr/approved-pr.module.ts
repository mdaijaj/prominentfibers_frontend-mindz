import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ApprovedPrRoutingModule } from './approved-pr-routing.module';
import { ApprovedPrComponent } from './approved-pr.component';
import { AgGridModule } from 'ag-grid-angular';
import { MaterialModule } from 'src/app/@shared/material/material.module';
import { ApprovedActionComponent } from './approved-action/approved-action.component';
import { ApprovedDilogComponent } from './approved-dilog/approved-dilog.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ApprovedPrComponent,
    ApprovedActionComponent,
    ApprovedDilogComponent
  ],
  imports: [
    CommonModule,
    ApprovedPrRoutingModule,
    AgGridModule,
    MaterialModule,
    FormsModule

  ]
})
export class ApprovedPrModule { }
