import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/@shared/material/material.module';
import { AgGridModule } from 'ag-grid-angular';
import { CKEditorModule } from 'ckeditor4-angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LeadDatesRoutingModule } from './dates-routing.module';
import { DatesCreateComponent } from './create-dates/create.dates.component';
import { ListDatesComponent } from './list-dates/list-dates.component';
import { UploadmangeCsvPopupComponent } from './upload-csv-popup/upload-csv-popup.component';
import { LeadModule } from 'src/app/@modules/lead/lead.module';

@NgModule({
    declarations: [
        DatesCreateComponent,
        ListDatesComponent,
        UploadmangeCsvPopupComponent
    ],
    imports: [
        CommonModule,
        MaterialModule,
        LeadDatesRoutingModule,
        AgGridModule,
        CKEditorModule,
        FormsModule,
        ReactiveFormsModule,
        LeadModule
    ],
    exports: [
    ]
  
})
export class LeadDatesModule { }
