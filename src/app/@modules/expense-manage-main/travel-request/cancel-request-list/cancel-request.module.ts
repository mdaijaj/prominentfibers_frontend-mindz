import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// import { CancelRequestRoutingModule } from './user-access-routing.module';
// import { UserListComponent } from './user-list/user-list.component';
import { MaterialModule } from 'src/app/@shared/material/material.module';
import { AgGridModule } from 'ag-grid-angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LeadModule } from 'src/app/@modules/lead/lead.module';
import { CancelListComponent } from './cacnel-reuest-list/cancel-listcomponent';
import { CancelRequestRoutingModule } from './cancel-request-routing.module';


@NgModule({
  declarations: [
    // UserListComponent
    CancelListComponent
  ],
  imports: [
    CommonModule,
    CancelRequestRoutingModule,
    MaterialModule,
    AgGridModule,
    FormsModule,
    ReactiveFormsModule,
    LeadModule,
  ]
})
export class UserAccessModule { }
