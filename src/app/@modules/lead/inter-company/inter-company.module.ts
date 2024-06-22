import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/@shared/material/material.module';
import { AgGridModule } from 'ag-grid-angular';
import { CKEditorModule } from 'ckeditor4-angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LeadModule } from '../lead.module';
import { InterCompanyRoutingModule } from './inter-company-routing.module';
import { InterCompanyHomeComponent } from './inter-company-home/inter-company-home.component';

@NgModule({
    declarations: [
        InterCompanyHomeComponent
    ],
    imports: [
        CommonModule,
        MaterialModule,
        InterCompanyRoutingModule,
        AgGridModule,
        CKEditorModule,
        FormsModule,
        ReactiveFormsModule,
        LeadModule
    ],
    exports: [
    ]
  
})
export class InterCompanyModule { }
