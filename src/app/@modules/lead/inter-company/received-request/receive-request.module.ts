import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/@shared/material/material.module';
import { AgGridModule } from 'ag-grid-angular';
import { CKEditorModule } from 'ckeditor4-angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ReceiveRequestRoutingModule } from './receive-request-routing.module';
import { LeadModule } from '../../lead.module';
import { ReceiveRequestCreateComponent } from './receive-request-create/receive-request-create.component';
import { ReceiveRequestListComponent } from './receive-request-list/receive-request-list.component';
import { ReceivedResponseComponent } from './received-response/received-response.component';
import { ResponseConfirmationComponent } from './response-confirmation/response-confirmation.component';
import { MatSelectFilterModule } from 'mat-select-filter';


@NgModule({
    declarations: [
        ReceiveRequestCreateComponent,
        ReceiveRequestListComponent,
        ReceivedResponseComponent,
        ResponseConfirmationComponent
    ],
    imports: [
        CommonModule,
        MaterialModule,
        ReceiveRequestRoutingModule,
        AgGridModule,
        CKEditorModule,
        FormsModule,
        ReactiveFormsModule,
        LeadModule,
        MatSelectFilterModule
    ],
    exports: [
    ]
  
})
export class ReceiveRequestModule { }
