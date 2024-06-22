import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgGridModule } from 'ag-grid-angular';
import { MaterialModule } from 'src/app/@shared/material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RejectedRoutingModule } from './rejected-routing.module';
import { RejectedComponent } from './rejected.component';
import { RejectedActionComponent } from './rejected-action/rejected-action.component';
import { RejectedQuotationViewComponent } from './rejected-quotation-view/rejected-quotation-view.component';

@NgModule({
  declarations: [
     RejectedComponent,
     RejectedActionComponent,
     RejectedQuotationViewComponent
  ],
  imports: [
    CommonModule,
    RejectedRoutingModule,
    AgGridModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class RejectedModule { }