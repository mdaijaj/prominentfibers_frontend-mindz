import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TrainingMaterialRoutingModule } from './training-material-routing.module';
import { TrainingMaterialListComponent } from './training-material-list/training-material-list.component';
import { TrainingFeedbackCreateComponent } from './training-feedback-create/training-feedback-create.component';


import { MaterialModule } from 'src/app/@shared/material/material.module';
import { AgGridModule } from 'ag-grid-angular';
import { CKEditorModule } from 'ckeditor4-angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LeadModule } from 'src/app/@modules/lead/lead.module';
@NgModule({
  declarations: [
    TrainingMaterialListComponent,
    TrainingFeedbackCreateComponent
  ],
  imports: [
    CommonModule,
    TrainingMaterialRoutingModule,
    MaterialModule,
    AgGridModule,
    CKEditorModule,
    FormsModule,
    ReactiveFormsModule,
    LeadModule
  ]
})
export class TrainingMaterialModule { }
