import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgGridModule } from 'ag-grid-angular';
import { MaterialModule } from 'src/app/@shared/material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ApprovedCostComponent } from './approved-cost.component';
import { ApprovedCostRoutingModule } from './approved-cost-routing.module';

@NgModule({
  declarations: [
     ApprovedCostComponent
  ],
  imports: [
    CommonModule,
    ApprovedCostRoutingModule,
    AgGridModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class ApprovedCostModule { }