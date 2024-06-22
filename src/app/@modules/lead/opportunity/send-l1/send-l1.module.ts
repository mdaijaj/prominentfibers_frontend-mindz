import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/@shared/material/material.module';
import { AgGridModule } from 'ag-grid-angular';
import { CKEditorModule } from 'ckeditor4-angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LeadModule } from '../../lead.module';
import { ListSendL1Component } from './list-send-l1/list-send-l1.component';
import { SendL1Component } from './create-send-l1/send-l1.component';
import { SendL1RoutingModule } from './send-l1-routing.module';
import { SicAccreditionDetailsComponent } from '../sic-accredition-details/sic-accredition-details.component';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import {  MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectFilterModule } from 'mat-select-filter';

@NgModule({
    declarations: [
        ListSendL1Component,
        SendL1Component,
        SicAccreditionDetailsComponent
    ],
    imports: [
        CommonModule,
        MaterialModule,
        SendL1RoutingModule,
        AgGridModule,
        CKEditorModule,
        FormsModule,
        ReactiveFormsModule,
        LeadModule,
        MatCheckboxModule,
        MatSelectModule, 
        MatFormFieldModule,
        MatSelectFilterModule 

    ],
    exports: [

    ]
})
export class SendL1Module {}
