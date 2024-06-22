import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/@shared/material/material.module';
import { AgGridModule } from 'ag-grid-angular';
import { CKEditorModule } from 'ckeditor4-angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LeadModule } from '../../lead.module';
import { LeadEscalateRoutingModule } from './escalate-routing.module';
import { EscalateListComponent } from './escalate-lead-list/list-escalate.component';

@NgModule({
    declarations: [
        EscalateListComponent
    ],
    imports: [
        CommonModule,
        MaterialModule,
        LeadEscalateRoutingModule,
        AgGridModule,
        CKEditorModule,
        FormsModule,
        ReactiveFormsModule,
        LeadModule
    ],
    exports: [
    ]
  
})
export class LeadEscalateModule { }
