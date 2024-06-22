import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DraftPoComponent } from './draft-po/draft-po.component';
import { DraftPoActionComponent } from './draft-po-action/draft-po-action.component';
import { DraftPORoutingModule } from './draft-po-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AgGridModule } from 'ag-grid-angular';
import { MaterialModule } from 'src/app/@shared/material/material.module';



@NgModule({
  declarations: [
    DraftPoComponent,
    DraftPoActionComponent
  ],
  imports: [
    CommonModule,
    DraftPORoutingModule,
    AgGridModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class DraftPoModule { }
