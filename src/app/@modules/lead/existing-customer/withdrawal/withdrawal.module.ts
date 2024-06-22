import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WithdrawalRoutingModule } from './withdrawal-routing.module';
import { WithdrawalComponent } from './withdrawal.component';
import { MaterialModule } from 'src/app/@shared/material/material.module';
import { AgGridModule } from 'ag-grid-angular';
import { ActionComponent } from './action/action.component';
import { NotificationwComponent } from './notificationw/notificationw.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    WithdrawalComponent,
    ActionComponent,
    NotificationwComponent
  ],
  imports: [
    CommonModule,
    WithdrawalRoutingModule,
    MaterialModule,
    AgGridModule,
    AgGridModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class WithdrawalModule { }
