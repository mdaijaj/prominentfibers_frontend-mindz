import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdvancePaidListComponent } from './advance-paid-list/advance-paid-list.component';
import { AdvancePaidRoutingModule } from './advance-paid-routing-module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AgGridModule } from 'ag-grid-angular';
import { MaterialModule } from 'src/app/@shared/material/material.module';



@NgModule({
  declarations: [
    AdvancePaidListComponent
  ],
  imports: [
    CommonModule,
    AdvancePaidRoutingModule,
    AgGridModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class AdvancePaidModule { }
