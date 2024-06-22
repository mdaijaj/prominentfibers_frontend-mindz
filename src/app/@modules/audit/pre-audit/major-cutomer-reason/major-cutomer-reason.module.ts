import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MajorCutomerReasonRoutingModule } from './major-cutomer-reason-routing.module';
import { MajorCustomerReasonComponent } from './major-customer-reason/major-customer-reason.component';
import { MajorCustomerReasonListComponent } from './major-customer-reason-list/major-customer-reason-list.component';
import { MaterialModule } from 'src/app/@shared/material/material.module';
import { AgGridModule } from 'ag-grid-angular';
import { ReactiveFormsModule } from '@angular/forms';
import { ShairedModule } from 'src/app/@shared/shaired/shaired.module';


@NgModule({
  declarations: [
    MajorCustomerReasonComponent,
    MajorCustomerReasonListComponent
  ],
  imports: [
    CommonModule,
    MajorCutomerReasonRoutingModule,
    MaterialModule,
    AgGridModule,
    ReactiveFormsModule,
    ShairedModule
  ]
})
export class MajorCutomerReasonModule { }
