import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExpenseManageMainRoutingModule } from './expense-manage-main-routing.module';
import { ExpenseMangemeMainComponent } from './expense-mangeme-main.component';

import { MaterialModule } from 'src/app/@shared/material/material.module';
import { AgGridModule } from 'ag-grid-angular';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatCardModule} from '@angular/material/card';
import {MatDialogModule} from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { HrmsModule } from '../hrms/hrms.module';
import { ShairedModule } from 'src/app/@shared/shaired/shaired.module';
// import { FinanceComponent } from './finance.component';
// import { FinanceRoutingModule } from './finance-routing.module';
import { MatTooltipModule } from '@angular/material/tooltip';

@NgModule({
  declarations: [
    ExpenseMangemeMainComponent
  ],
  imports: [
    CommonModule,
    ExpenseManageMainRoutingModule,
    MaterialModule,
    HrmsModule,
    AgGridModule,
    HttpClientModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatDialogModule,
    MatSidenavModule,
    MatExpansionModule,
    MatListModule,
    MatTooltipModule,
    ReactiveFormsModule,
    ShairedModule
  ]
})
export class ExpenseManageMainModule { }
