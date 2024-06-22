import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgGridModule } from 'ag-grid-angular';
import { MaterialModule } from 'src/app/@shared/material/material.module';
import { AuditorMasterRoutingModule } from './auditor-master-routing.module';
import { ListComponent } from './list/list.component';
import { ActionComponent } from './action/action.component';
import { DialogAuditorAssignComponent } from './dialog-auditor-assign/dialog-auditor-assign.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  declarations: [
    ListComponent,
    ActionComponent,
    DialogAuditorAssignComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AuditorMasterRoutingModule,
    AgGridModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    BrowserAnimationsModule
  ]
})
export class AuditorMasterModule { }

