import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MangerApprovalRoutingModule } from './manger-approval-routing.module';
import { MangerListComponent } from './manger-list/manger-list.component';
import { MangerExpenseComponent } from './manger-expense/manger-expense.component';
import { MaterialModule } from 'src/app/@shared/material/material.module';
import { AgGridModule } from 'ag-grid-angular';
import { CKEditorModule } from 'ckeditor4-angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LeadModule } from 'src/app/@modules/lead/lead.module';

@NgModule({
  declarations: [
    MangerListComponent,
    MangerExpenseComponent
  ],
  imports: [
    CommonModule,
    MangerApprovalRoutingModule,
    MaterialModule,
    AgGridModule,
    CKEditorModule,
    FormsModule,
    ReactiveFormsModule,
    LeadModule
  ]
})
export class MangerApprovalModule { }
