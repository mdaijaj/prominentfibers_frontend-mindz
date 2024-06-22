import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RBHApprovalRoutingModule } from './rbh-approval-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/@shared/material/material.module';
import { AgGridModule } from 'ag-grid-angular';
import { RbhApprovalComponent } from './rbh-approval.component';
import { ActionComponent } from './action/action.component';
import { NotificationComponent } from './notification/notification.component';


@NgModule({
  declarations: [
    RbhApprovalComponent,
    ActionComponent,
    NotificationComponent
  ],
  imports: [
    CommonModule,
    RBHApprovalRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    AgGridModule,
  ]
})
export class RBHApprovalModule { }
