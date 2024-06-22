import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdvancePlanningComponent } from './advance-planning.component';
import { SystemSendNotificationComponent } from './system-send-notification/system-send-notification.component';
import { UpdateCertificateComponent } from './update-certificate/update-certificate.component';
import { CertificateDetailsComponent } from './certificate-details/certificate-details.component';
import { UpdateAdvancePlainingsComponent } from './update-advance-plainings/update-advance-plainings.component';
import { UpdatedAdvPlainngListComponent } from './updated-adv-plainng-list/updated-adv-plainng-list.component';
import { Component } from 'ag-grid-community';
import { RATRALIST200Component } from './ra-tra-list200/ra-tra-list200.component';
import { RATRALIST150Component } from './ra-tra-list150/ra-tra-list150.component';
import { RATRALIST180Component } from './ra-tra-list180/ra-tra-list180.component';
import { RATRALIST120Component } from './ra-tra-list120/ra-tra-list120.component';
import { RATRALIST90Component } from './ra-tra-list90/ra-tra-list90.component';
import { RATRALIST45Component } from './ra-tra-list45/ra-tra-list45.component';
import { RaTraList0Component } from './ra-tra-list0/ra-tra-list0.component';
import { PlainingteamNotiToPostAuditTeamNotificationComponent } from './plainingteam-noti-to-post-audit-team-notification/plainingteam-noti-to-post-audit-team-notification.component';

const routes: Routes = [
  { path: '', component: AdvancePlanningComponent },
  { path: 'RA-TRA200', component: RATRALIST200Component },
  { path: 'RA-TRA150', component: RATRALIST150Component },
  { path: 'RA-TRA180', component: RATRALIST180Component },
  { path: 'RA-TRA120', component: RATRALIST120Component },
  { path: 'RA-TRA90', component: RATRALIST90Component },
  { path: 'RA-TRA45', component: RATRALIST45Component },
  { path: 'RA-TRA0', component: RaTraList0Component },
  { path: 'send-notification', component: SystemSendNotificationComponent },
  { path: 'update-certificate', component: UpdateCertificateComponent },
  { path: 'certificate-detail', component: CertificateDetailsComponent },
  { path: 'update-advance-plaining', component: UpdateAdvancePlainingsComponent },
  { path: 'update-advance-plaining-list', component: UpdatedAdvPlainngListComponent },
  { path: 'notify_planing_to_postAudit', component: PlainingteamNotiToPostAuditTeamNotificationComponent },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdvancePlanningRoutingModule { }