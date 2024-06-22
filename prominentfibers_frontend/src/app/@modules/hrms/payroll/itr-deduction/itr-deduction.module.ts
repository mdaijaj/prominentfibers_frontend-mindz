import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ItrDeductionRoutingModule } from './itr-deduction-routing.module';
import { ItrHeaderComponent } from './itr-header/itr-header.component';
import { ItrActionComponent } from './itr-action/itr-action.component';
import { ItrComponent } from './itr/itr.component';
import { AgGridModule } from 'ag-grid-angular';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MaterialModule } from 'src/app/@shared/material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { VariableComponent } from './variable/variable.component';
import { OtherAllowanceComponent } from './other-allowance/other-allowance.component';
import { OtherDeducActionComponent } from './other-deduction/other-deduc-action/other-deduc-action.component';
import { ItrDilogComponent } from './itr-dilog/itr-dilog.component';
import { OtherDeducDilogComponent } from './other-deduction/other-deduc-dilog/other-deduc-dilog.component';
import { ItrAllowanceActionComponent } from './other-allowance/itr-allowance-action/itr-allowance-action.component';
@NgModule({
  declarations: [
    ItrComponent,
    ItrActionComponent,
    ItrDilogComponent,
    ItrHeaderComponent,
    OtherAllowanceComponent,
    ItrAllowanceActionComponent,
    ItrDilogComponent,
    VariableComponent,
    OtherDeducActionComponent,
    OtherDeducDilogComponent,
    ItrActionComponent
  ],
  imports: [
    CommonModule,
    ItrDeductionRoutingModule,
    AgGridModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
  ]
})
export class ItrDeductionModule { }
