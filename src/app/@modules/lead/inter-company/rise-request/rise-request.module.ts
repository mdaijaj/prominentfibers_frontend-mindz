import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/@shared/material/material.module';
import { AgGridModule } from 'ag-grid-angular';
import { CKEditorModule } from 'ckeditor4-angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RiseRequestRoutingModule } from './rise-request-routing.module';
import { LeadModule } from '../../lead.module';
import { RiseRequestCreateComponent } from './rise-request-create/rise-request-create.component';
import { RiseRequestListComponent } from './rise-request-list/rise-request-list.component';

@NgModule({
    declarations: [
        RiseRequestCreateComponent,
        RiseRequestListComponent
    ],
    imports: [
        CommonModule,
        MaterialModule,
        RiseRequestRoutingModule,
        AgGridModule,
        CKEditorModule,
        FormsModule,
        ReactiveFormsModule,
        LeadModule
    ],
    exports: [
    ]
  
})
export class RiseRequestModule { }
