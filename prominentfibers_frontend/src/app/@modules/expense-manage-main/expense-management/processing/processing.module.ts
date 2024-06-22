import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProcessingRoutingModule } from './processing-routing.module';
import { ProcessingComponent } from './processing/processing.component';
import { ProcessingListComponent } from './processing-list/processing-list.component';
import { materialize } from 'rxjs';
import { MaterialModule } from 'src/app/@shared/material/material.module';
import { AgGridModule } from 'ag-grid-angular';
import { CKEditorModule } from 'ckeditor4-angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LeadModule } from 'src/app/@modules/lead/lead.module';


@NgModule({
  declarations: [
    ProcessingComponent,
 
    ProcessingListComponent,
  ],
  imports: [
    CommonModule,
    ProcessingRoutingModule,
    MaterialModule,
    AgGridModule,
    CKEditorModule,
    FormsModule,
    ReactiveFormsModule,
    LeadModule
  ]
})
export class ProcessingModule { }
