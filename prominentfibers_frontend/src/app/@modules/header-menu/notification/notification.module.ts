import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NotificationRoutingModule } from './notification-routing.module';
import { NotificationComponent } from './notification.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/@shared/material/material.module';
import { LmsComponent } from './lms/lms.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import {  MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatListModule } from '@angular/material/list';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSidenavModule } from '@angular/material/sidenav';
import { AdvancePlanningComponent } from './advance-planning/advance-planning.component';
import { CpComponent } from './cp/cp.component';
import { AllNotificationComponent } from './all-notification/all-notification.component';
import { SAndMComponent } from './s-and-m/s-and-m.component';
@NgModule({
  declarations: [
    NotificationComponent,
    AdvancePlanningComponent,
    LmsComponent,
    CpComponent,
    AllNotificationComponent,
    SAndMComponent
  ],
  imports: [
    CommonModule,
    NotificationRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    MaterialModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatDialogModule,
    MatSidenavModule,
    MatExpansionModule,
    MatListModule,
    MatTooltipModule,
  ]
})
export class NotificationModule { }
