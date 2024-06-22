import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TicketListRoutingModule } from './ticket-list-routing.module';
import { TicketListComponent } from './ticket-list.component';
import { AgGridModule } from 'ag-grid-angular';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { MaterialModule } from 'src/app/@shared/material/material.module';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';


@NgModule({
  declarations: [
    TicketListComponent
  ],
  imports: [
    CommonModule,
    TicketListRoutingModule,
    AgGridModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MaterialModule,
    MatIconModule,
    MatButtonModule,
  ]
})
export class TicketListModule { }
