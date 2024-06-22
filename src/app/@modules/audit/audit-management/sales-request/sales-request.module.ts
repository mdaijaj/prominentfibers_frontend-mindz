import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SalesRequestRoutingModule } from './sales-request-routing.module';
import { SalesRequestComponent } from './sales-request.component';
import { MaterialModule } from 'src/app/@shared/material/material.module';
import { AgGridModule } from 'ag-grid-angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ShairedModule } from 'src/app/@shared/shaired/shaired.module';
import { ActionComponent } from './action/action.component';
import { BookauditorComponent } from './bookauditor/bookauditor.component';
import { MatDatepickerModule } from '@angular/material/datepicker';


@NgModule({
  declarations: [
    SalesRequestComponent,
    ActionComponent,
    BookauditorComponent
  ],
  imports: [
    CommonModule,
    SalesRequestRoutingModule,
    MaterialModule,
    AgGridModule,
    ReactiveFormsModule,
    ShairedModule,
    ReactiveFormsModule,
    FormsModule,
    MatDatepickerModule,
  ]
})
export class SalesRequestModule { }
