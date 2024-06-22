import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdvancePlanningRoutingModule } from './advance-planning-routing.module';
import { MaterialModule } from 'src/app/@shared/material/material.module';
import { SystemSendNotificationComponent } from './system-send-notification/system-send-notification.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UpdateCertificateComponent } from './update-certificate/update-certificate.component';
import { CertificateDetailsComponent } from './certificate-details/certificate-details.component';
import { ActionComponent } from './action/action.component';
import { UpdateAdvancePlainingsComponent } from './update-advance-plainings/update-advance-plainings.component';
import { UpdatedAdvPlainngListComponent } from './updated-adv-plainng-list/updated-adv-plainng-list.component';
import { AgGridModule } from 'ag-grid-angular';
import { RATRALIST200Component } from './ra-tra-list200/ra-tra-list200.component';
import { RATRALIST180Component } from './ra-tra-list180/ra-tra-list180.component';
import { RATRALIST120Component } from './ra-tra-list120/ra-tra-list120.component';
import { RATRALIST150Component } from './ra-tra-list150/ra-tra-list150.component';
import { RATRALIST90Component } from './ra-tra-list90/ra-tra-list90.component';
import { RATRALIST45Component } from './ra-tra-list45/ra-tra-list45.component';
import { RaTraList0Component } from './ra-tra-list0/ra-tra-list0.component';
import { PlainingteamNotiToPostAuditTeamNotificationComponent } from './plainingteam-noti-to-post-audit-team-notification/plainingteam-noti-to-post-audit-team-notification.component';


@NgModule({
  declarations: [
    SystemSendNotificationComponent,
    UpdateCertificateComponent,
    CertificateDetailsComponent,
    ActionComponent,
    UpdateAdvancePlainingsComponent,
    UpdatedAdvPlainngListComponent,
    RATRALIST200Component,
    RATRALIST180Component,
    RATRALIST120Component,
    RATRALIST150Component,
    RATRALIST90Component,
    RATRALIST45Component,
    RaTraList0Component,
    PlainingteamNotiToPostAuditTeamNotificationComponent
  ],
  imports: [
    CommonModule,
    AgGridModule,
    AdvancePlanningRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class AdvancePlanningModule {


  
 }
