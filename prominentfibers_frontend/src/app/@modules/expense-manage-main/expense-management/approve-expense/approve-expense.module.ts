import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/@shared/material/material.module';
import { AgGridModule } from 'ag-grid-angular';
import { CKEditorModule } from 'ckeditor4-angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ApproveExpenseRoutingModule } from './approve-expense-routing.module';
import { LeadModule } from 'src/app/@modules/lead/lead.module';
import { ApproveExpenseComponent } from './approve-expense-list/approve-expense-list.component';
import { ApproveExpenseCreateComponent } from './approve-expense-create/approve-expense.component';
import { MakePaymentComponent } from './make-payment/make-payment.component';

@NgModule({
    declarations: [
        ApproveExpenseComponent,
        ApproveExpenseCreateComponent,
        MakePaymentComponent
    ],
    imports: [
        CommonModule,
        MaterialModule,
        ApproveExpenseRoutingModule,
        AgGridModule,
        CKEditorModule,
        FormsModule,
        ReactiveFormsModule,
        LeadModule
    ],
    exports: [
    ]
  
})
export class ApproveExpenseModule { }
