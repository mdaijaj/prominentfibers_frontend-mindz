import { TrainingResultComponent } from './training-result.component';
import { NgModule } from '@angular/core';
import { MaterialModule } from 'src/app/@shared/material/material.module';
import { AgGridModule } from 'ag-grid-angular';
import { CKEditorModule } from 'ckeditor4-angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LeadModule } from 'src/app/@modules/lead/lead.module';
import { TrainingResultRoutingModule } from './training-result-routing.module';




@NgModule({
  declarations: [
    TrainingResultComponent
  ],
  imports: [
    TrainingResultRoutingModule,
    MaterialModule,
    AgGridModule,
    CKEditorModule,
    FormsModule,
    ReactiveFormsModule,
    LeadModule
  ]
})
export class TrainingResultModule { }
