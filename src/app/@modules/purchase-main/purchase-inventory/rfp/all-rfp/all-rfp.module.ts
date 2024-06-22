import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AllRfpRoutingModule } from './all-rfp-routing.module';
import { AllRfpListComponent } from './all-rfp-list/all-rfp-list.component';
import { AgGridModule } from 'ag-grid-angular';
import { MaterialModule } from 'src/app/@shared/material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AllRfpListComponent
  ],
  imports: [
    CommonModule,
    AllRfpRoutingModule,
    AgGridModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class AllRfpModule { }
