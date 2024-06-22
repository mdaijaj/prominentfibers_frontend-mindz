import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlanningTeamSuspRoutingModule } from './planning-team-susp-routing.module';
import { PlanningTeamSuspComponent } from './planning-team-susp.component';
import { MaterialModule } from 'src/app/@shared/material/material.module';
import { AgGridModule } from 'ag-grid-angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CKEditorModule } from 'ckeditor4-angular';
import { NotificationComponent } from './notification/notification.component';
import { ActionsComponent } from './actions/actions.component';


@NgModule({
  declarations: [
    PlanningTeamSuspComponent,
    NotificationComponent,
    ActionsComponent
  ],
  imports: [
    CommonModule,
    PlanningTeamSuspRoutingModule,
    MaterialModule,
    AgGridModule,
    FormsModule,
    ReactiveFormsModule,
    CKEditorModule
  ]
})
export class PlanningTeamSuspModule { }
