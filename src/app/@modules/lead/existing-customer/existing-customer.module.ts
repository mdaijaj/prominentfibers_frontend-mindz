import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExistingCustomerRoutingModule } from './existing-customer-routing.module';
import { ExistingCustomerComponent } from './existing-customer.component';
import { AdvancePlanningComponent } from './advance-planning/advance-planning.component';
import { MaterialModule } from 'src/app/@shared/material/material.module';
import { AgGridModule } from 'ag-grid-angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EmailSendeComponent } from './email-sende/email-sende.component';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';


@NgModule({
  declarations: [
    ExistingCustomerComponent,
    AdvancePlanningComponent,
    EmailSendeComponent
  
  ],
  imports: [
    CommonModule,
    ExistingCustomerRoutingModule,
    MaterialModule,
    AgGridModule,
    FormsModule,
    ReactiveFormsModule,
    CKEditorModule
  ]
})
export class ExistingCustomerModule { }
