import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TicketManagementRoutingModule } from './ticket-management-routing.module';
import { TicketManagementComponent } from './ticket-management.component';
import { NewTicketListComponent } from './new-ticket-list/new-ticket-list.component';
import { MaterialModule } from 'src/app/@shared/material/material.module';
import { AgGridModule } from 'ag-grid-angular';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatCardModule} from '@angular/material/card';
import {MatDialogModule} from '@angular/material/dialog';
import { ShairedModule } from 'src/app/@shared/shaired/shaired.module';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CKEditorModule } from 'ckeditor4-angular';
import { ItticketingDialogComponent } from './itticketing-dialog/itticketing-dialog.component';
import { ActionsComponent } from './actions/actions.component';
import { NewTiketActionComponent } from './new-ticket-list/new-tiket-action/new-tiket-action.component';
import { NewTicketDialogComponent } from './new-ticket-list/new-ticket-dialog/new-ticket-dialog.component';

@NgModule({
  declarations: [
    TicketManagementComponent,
    NewTicketListComponent,
    ItticketingDialogComponent,
    ActionsComponent,
    NewTiketActionComponent,
    NewTicketDialogComponent
  ],
  imports: [
    CommonModule,
    TicketManagementRoutingModule,
    MaterialModule,
    AgGridModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule, 
    MatDialogModule,
    MatDialogModule,
    ShairedModule,
    MatExpansionModule,
    MatSidenavModule,
    MatListModule,
    MatTooltipModule,
    CKEditorModule 
  ]
})
export class TicketManagementModule { }
