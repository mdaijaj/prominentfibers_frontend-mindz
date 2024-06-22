import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CourierUserListRoutingModule } from './courier-user-list-routing.module';
import { CourierUserListComponent } from './courier-user-list.component';
import { AgGridModule } from 'ag-grid-angular';
import { MaterialModule } from 'src/app/@shared/material/material.module';
import { InwardActionComponent } from './inward-action/inward-action.component';

@NgModule({
  declarations: [
    CourierUserListComponent,
    InwardActionComponent,

  ],
  imports: [
    CommonModule,
    CourierUserListRoutingModule,
    AgGridModule,
    MaterialModule
  ]
})
export class CourierUserListModule { }
