import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/@shared/material/material.module';
import { AgGridModule } from 'ag-grid-angular';
import { CKEditorModule } from 'ckeditor4-angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProspectCreateComponent } from './create-prospects/create.prospect.component';
import { LeadProspectRoutingModule } from './prospects-routing.module';
import { LeadModule } from '../lead.module';
import { ListProspectsComponent } from './list-prospects/list-prospects.component';
import { MatSelectModule } from '@angular/material/select';
import { MatSelectFilterModule } from 'mat-select-filter';

@NgModule({
    declarations: [
        ProspectCreateComponent,
        ListProspectsComponent
    ],
    imports: [
        CommonModule,
        MaterialModule,
        LeadProspectRoutingModule,
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
export class LeadProspectModule { }
