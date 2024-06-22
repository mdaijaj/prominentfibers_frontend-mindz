import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PaidExpenseRoutingModule } from './paid-expense-routing.module';
import { PaidListComponent } from './paid-list/paid-list.component';
import { AgGridModule } from 'ag-grid-angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/@shared/material/material.module';


@NgModule({
  declarations: [
    PaidListComponent
  ],
  imports: [
    CommonModule,
    PaidExpenseRoutingModule,
    AgGridModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule
  ]
})
export class PaidExpenseModule { }
