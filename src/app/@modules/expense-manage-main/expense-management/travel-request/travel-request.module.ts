import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/@shared/material/material.module';
import { AgGridModule } from 'ag-grid-angular';
import { CKEditorModule } from 'ckeditor4-angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LeadModule } from 'src/app/@modules/lead/lead.module';
import { TravelRequestRoutingModule } from './travel-request-routing.module';
import { TravelRequestListComponent } from './travel-request-list/travel-request-list.component';
// import { TravelRequestComponent } from './travel-request-create/travel-request.component';
import { ActionsComponent } from './actions/actions.component';
import { ExpenseDialogComponent } from './expense-dialog/expense-dialog.component';
import { NgxMatTimepickerModule } from 'ngx-mat-timepicker';
import { TaskOrderExpenseListComponent } from './task-order-list/task-order-expense-list.component';
// import { ConfirmTravelRequestComponent } from './confirm-travel-request/confirm-travel-request.component';
import { BookTicketTravelRequestComponent } from './book-ticket-travel-request/book-ticket-travel-request.component';
import { CancelRequestComponent } from './cancel-request/cancel-request.component';
import { DownloadTravelTicketComponent } from './download-travel-ticket/download-travel-ticket.component';

@NgModule({
    declarations: [
        TravelRequestListComponent,
        // TravelRequestComponent,
        ActionsComponent,
        ExpenseDialogComponent,
        TaskOrderExpenseListComponent,
        // ConfirmTravelRequestComponent,
        BookTicketTravelRequestComponent,
        CancelRequestComponent,
        DownloadTravelTicketComponent
    ],
    imports: [
        CommonModule,
        MaterialModule,
        TravelRequestRoutingModule,
        AgGridModule,
        CKEditorModule,
        FormsModule,
        ReactiveFormsModule,
        LeadModule,
        NgxMatTimepickerModule
    ],
    exports: [
    ]
  
})
export class TravelRequestModule { }
