import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/@shared/material/material.module';
import { AgGridModule } from 'ag-grid-angular';
import { CKEditorModule } from 'ckeditor4-angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AssignLeadComponent } from './assign-lead-create/assign-lead.component';
import { AssignListComponent } from './assign-lead-list/list-assign.component';
import { LeadAssignRoutingModule } from './assgn-routing.module';
import { LeadModule } from '../../lead.module';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectFilterModule } from 'mat-select-filter';

@NgModule({
    declarations: [
        AssignLeadComponent,
        AssignListComponent
    ],
    imports: [
        CommonModule,
        MaterialModule,
        LeadAssignRoutingModule,
        AgGridModule,
        CKEditorModule,
        FormsModule,
        ReactiveFormsModule,
        LeadModule,
        MatSelectModule, 
        MatFormFieldModule,
        MatSelectFilterModule 
    ],
    exports: [
    ]
  
})
export class LeadAssignModule { }
