import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AgGridModule } from 'ag-grid-angular';
import { MaterialModule } from 'src/app/@shared/material/material.module';

import { InventoryComponent } from './inventory/inventory.component';
import { InventoryRoutingModule } from './inventory-routing.module';



@NgModule({
  declarations: [
InventoryComponent,
  ],
  imports: [
    CommonModule,
    AgGridModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    InventoryRoutingModule
  ]
})
export class InventoryModule { }
