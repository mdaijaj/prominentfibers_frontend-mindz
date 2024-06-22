import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CourierOutwardListRoutingModule } from './courier-outward-list-routing.module';
import { CourierOutwardListComponent } from './courier-outward-list.component';
import { MaterialModule } from 'src/app/@shared/material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AgGridModule } from 'ag-grid-angular';
import { OutwardActionComponent } from './outward-action/outward-action.component';
import { OutwardDailogComponent } from './outward-dailog/outward-dailog.component';

@NgModule({
  declarations: [
    CourierOutwardListComponent,
    OutwardActionComponent,
    OutwardDailogComponent
  ],
  imports: [
    CommonModule,
    CourierOutwardListRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    AgGridModule
  ]
})
export class CourierOutwardListModule { }
