import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TravelReqDraftRoutingModule } from './travel-req-draft-routing.module';
import { DraftTravelListComponent } from './draft-travel-list/draft-travel-list.component';
import { DraftTravelUpdateComponent } from './draft-travel-update/draft-travel-update.component';



// import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/@shared/material/material.module';
import { AgGridModule } from 'ag-grid-angular';
import { CKEditorModule } from 'ckeditor4-angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LeadModule } from 'src/app/@modules/lead/lead.module';
// import { TravelRequestRoutingModule } from './travel-request-routing.module';
// import { TravelRequestListComponent } from './travel-request-list/travel-request-list.component';
// import { TravelRequestComponent } from './travel-request-create/travel-request.component';
// import { ActionsComponent } from './actions/actions.component';
// import { ExpenseDialogComponent } from './expense-dialog/expense-dialog.component';
import { NgxMatTimepickerModule } from 'ngx-mat-timepicker';
import { TravelActionComponent } from './travel-action/travel-action.component';
// import { TaskOrderExpenseListComponent } from './task-order-list/task-order-expense-list.component';
// import { ConfirmTravelRequestComponent } from './confirm-travel-request/confirm-travel-request.component';
// import { BookTicketTravelRequestComponent } from './book-ticket-travel-request/book-ticket-travel-request.component';
// import { CancelRequestComponent } from './cancel-request/cancel-request.component';
// import { DownloadTravelTicketComponent } from './download-travel-ticket/download-travel-ticket.component';
// import { ActionsConfirmComponent } from './confirm-travel-request/actions/actionsConfirm.component';



@NgModule({
  declarations: [
    DraftTravelListComponent,
    DraftTravelUpdateComponent,
    TravelActionComponent
  ],
  imports: [
    CommonModule,
    TravelReqDraftRoutingModule,
    MaterialModule,
    // TravelRequestRoutingModule,
    AgGridModule,
    CKEditorModule,
    FormsModule,
    ReactiveFormsModule,
    LeadModule,
    NgxMatTimepickerModule
  ]
})
export class TravelReqDraftModule { }
