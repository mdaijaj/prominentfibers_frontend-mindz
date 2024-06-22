import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/@shared/material/material.module';
import { AgGridModule } from 'ag-grid-angular';
import { CKEditorModule } from 'ckeditor4-angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { WorkOrderRoutingModule } from './work-order-routing.module';
import { WorkOrderComponent } from './work-order-list/work-order.component';
import { WorkOrderCreateComponent } from './work-order-create/work-order-create.component';
import { LeadModule } from 'src/app/@modules/lead/lead.module';
import { ClubWorkOrderListComponent } from './club-work-order-list/club-work-order-list.component';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { WorkOrderNonCertComponent } from './work-order-non-cert/work-order-non-cert.component';
import { ActionNonCertComponent } from './action-non-cert/action-non-cert.component';
import { WorkOrderCreateNonCertComponent } from './work-order-create-non-cert/work-order-create-non-cert.component';
import { MatSelectModule } from '@angular/material/select';
import { MatSelectFilterModule } from 'mat-select-filter';
import { BookingDateComponent } from './booking-date/booking-date.component';

// Register the required feature modules with the Grid
@NgModule({
    declarations: [
        WorkOrderComponent,
        WorkOrderCreateComponent,
        ClubWorkOrderListComponent,
        WorkOrderNonCertComponent,
        ActionNonCertComponent,
        WorkOrderCreateNonCertComponent,
        BookingDateComponent,
        
        
    ],
    imports: [
        CommonModule,
        MaterialModule,
        WorkOrderRoutingModule,
        AgGridModule,
        CKEditorModule,
        FormsModule,
        ReactiveFormsModule,
        LeadModule,
        HttpClientModule,
        MatSelectModule, 
        MatSelectFilterModule 
    ],
    exports: [

        
    ]
  
})
export class WorkOrderModule { }
