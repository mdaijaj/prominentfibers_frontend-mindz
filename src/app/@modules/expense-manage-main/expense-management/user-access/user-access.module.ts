import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserAccessRoutingModule } from './user-access-routing.module';
import { UserListComponent } from './user-list/user-list.component';
import { MaterialModule } from 'src/app/@shared/material/material.module';
import { AgGridModule } from 'ag-grid-angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LeadModule } from 'src/app/@modules/lead/lead.module';


@NgModule({
  declarations: [
    UserListComponent
  ],
  imports: [
    CommonModule,
    UserAccessRoutingModule,
    MaterialModule,
    AgGridModule,
    FormsModule,
    ReactiveFormsModule,
    LeadModule,
  ]
})
export class UserAccessModule { }
