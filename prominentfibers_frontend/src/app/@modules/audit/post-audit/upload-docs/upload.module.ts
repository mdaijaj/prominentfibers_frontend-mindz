import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/@shared/material/material.module';
import { AgGridModule } from 'ag-grid-angular';
import { CKEditorModule } from 'ckeditor4-angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UploadCreateComponent } from './create-upload/create.upload.component';
import { ListUploadComponent } from './list-upload/list-upload.component';
import { LeadUploadRoutingModule } from './upload-routing.module';
import { LeadModule } from 'src/app/@modules/lead/lead.module';
import { MatSelectModule } from '@angular/material/select';
import { MatSelectFilterModule } from 'mat-select-filter';

@NgModule({
    declarations: [
        ListUploadComponent,
        UploadCreateComponent
    ],
    imports: [
        CommonModule,
        MaterialModule,
        LeadUploadRoutingModule,
        AgGridModule,
        CKEditorModule,
        FormsModule,
        ReactiveFormsModule,
        LeadModule,
        MatSelectModule, 
        MatSelectFilterModule 
    ],
    exports: [
    ]
  
})
export class LeadUploadtModule { }
