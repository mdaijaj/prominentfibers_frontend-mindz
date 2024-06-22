import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CourierInwardListRoutingModule } from './courier-inward-list-routing.module';
import { CourierInwardListComponent } from './courier-inward-list.component';
import { AgGridModule } from 'ag-grid-angular';
import { MaterialModule } from 'src/app/@shared/material/material.module';
import { InwardActionComponent } from './inward-action/inward-action.component';
import { InwardDailogComponent } from './inward-dailog/inward-dailog.component';


@NgModule({
  declarations: [
    CourierInwardListComponent,
    InwardActionComponent,
    InwardDailogComponent
  ],
  imports: [
    CommonModule,
    CourierInwardListRoutingModule,
    AgGridModule,
    MaterialModule
  ]
})
export class CourierInwardListModule { }
