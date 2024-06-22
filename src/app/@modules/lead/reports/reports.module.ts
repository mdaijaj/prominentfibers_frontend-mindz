import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportsComponent } from './reports/reports.component';
import { ReportsRoutingModule } from './reports-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AgGridModule } from 'ag-grid-angular';
import { CKEditorModule } from 'ckeditor4-angular';
import { MaterialModule } from 'src/app/@shared/material/material.module';
import { LeadModule } from '../lead.module';



@NgModule({
  declarations: [
    ReportsComponent
  ],
  imports: [
    CommonModule,
    ReportsRoutingModule,
    MaterialModule,
    AgGridModule,
    CKEditorModule,
    FormsModule,
    ReactiveFormsModule,
    LeadModule
  ]
})
export class ReportsModule { }
