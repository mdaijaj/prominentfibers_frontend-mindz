import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/@shared/material/material.module';
import { AgGridModule } from 'ag-grid-angular';
import { CKEditorModule } from 'ckeditor4-angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LeadModule } from '../../lead.module';
import { LeadValidateRoutingModule } from './validate-routing.module';
import { ValidateLeadComponent } from './validate-lead-create/validate-lead.component';
import { ValidateListComponent } from './validate-lead-list/list-validate.component';

@NgModule({
    declarations: [
        ValidateLeadComponent,
        ValidateListComponent
    ],
    imports: [
        CommonModule,
        MaterialModule,
        LeadValidateRoutingModule,
        AgGridModule,
        CKEditorModule,
        FormsModule,
        ReactiveFormsModule,
        LeadModule
    ],
    exports: [
    ]
  
})
export class LeadValidateModule { }
