import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MangerAccessRoutingModule } from './manger-access-routing.module';
import { MangeAccessListComponent } from './mange-access-list/mange-access-list.component';
import { MaterialModule } from 'src/app/@shared/material/material.module';
import { AgGridModule } from 'ag-grid-angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LeadModule } from 'src/app/@modules/lead/lead.module';

@NgModule({
  declarations: [
    MangeAccessListComponent
  ],
  imports: [
    CommonModule,
    MangerAccessRoutingModule,
    MaterialModule,
    AgGridModule,
    FormsModule,
    ReactiveFormsModule,
    LeadModule,
  ]
})
export class MangerAccessModule { }
