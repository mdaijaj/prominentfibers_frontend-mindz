import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/@shared/material/material.module';
import { AgGridModule } from 'ag-grid-angular';
import { CKEditorModule } from 'ckeditor4-angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LeadModule } from 'src/app/@modules/lead/lead.module';
import { MyExpenseRoutingModule } from './my-expenses-routing.module';
import { MyExpenseListComponent } from './my-expenses-list/my-expenses-list.component';
import { MyExpenseComponent } from './my-expenses/my-expenses.component';
import { TaskOrderListComponent } from './task-order-list/task-order-list.component';
import { MyExpencePipe } from 'src/app/@shared/pipe/my-expence.pipe';
import { MyExpenseEditDialogComponent } from './my-expense-edit-dialog/my-expense-edit-dialog.component';
// import { ProcessingComponent } from './processing/processing.component';
// import { PostedComponent } from './posted/posted.component';
// import { ProcessingListComponent } from './processing-list/processing-list.component';
// import { PostedListComponent } from './posted-list/posted-list.component';
import { UpdateMyExpenseComponent } from './update-my-expense/update-my-expense.component';
import { DraftMyExpenseComponent } from './draft-my-expense/draft-my-expense.component';


@NgModule({
    declarations: [
        MyExpenseListComponent,
        MyExpenseComponent,
        TaskOrderListComponent,
        MyExpencePipe,
        MyExpenseEditDialogComponent,
        // ProcessingComponent,
        // PostedComponent,
        // ProcessingListComponent,
        // PostedListComponent,
        UpdateMyExpenseComponent,
        DraftMyExpenseComponent,
  
    ],
    imports: [
        CommonModule,
        MaterialModule,
        MyExpenseRoutingModule,
        AgGridModule,
        CKEditorModule,
        FormsModule,
        ReactiveFormsModule,
        LeadModule
    ],
    exports: [
    ]
  
})
export class MyExpenseModule { }
