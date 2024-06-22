import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlanningAuditDetailsComponent } from './planning-audit-details/planning-audit-details.component';
import { PreAuditHomeComponent } from './pre-audit-home/pre-audit-home.component';
import { TaskOrderListComponent } from './task-order/task-order.component';
import { AdvancePlanningComponent } from '../../lead/existing-customer/advance-planning/advance-planning.component';
import { RATRALIST200Component } from '../../lead/existing-customer/advance-planning/ra-tra-list200/ra-tra-list200.component';
import { RATRALIST150Component } from '../../lead/existing-customer/advance-planning/ra-tra-list150/ra-tra-list150.component';
import { RATRALIST180Component } from '../../lead/existing-customer/advance-planning/ra-tra-list180/ra-tra-list180.component';
import { RATRALIST120Component } from '../../lead/existing-customer/advance-planning/ra-tra-list120/ra-tra-list120.component';
import { RATRALIST90Component } from '../../lead/existing-customer/advance-planning/ra-tra-list90/ra-tra-list90.component';
import { RaTraList0Component } from '../../lead/existing-customer/advance-planning/ra-tra-list0/ra-tra-list0.component';
import { RATRALIST45Component } from '../../lead/existing-customer/advance-planning/ra-tra-list45/ra-tra-list45.component';
import { SystemSendNotificationComponent } from '../../lead/existing-customer/advance-planning/system-send-notification/system-send-notification.component';
import { UpdateCertificateComponent } from '../../lead/existing-customer/advance-planning/update-certificate/update-certificate.component';
import { CertificateDetailsComponent } from '../../lead/existing-customer/advance-planning/certificate-details/certificate-details.component';
import { UpdateAdvancePlainingsComponent } from '../../lead/existing-customer/advance-planning/update-advance-plainings/update-advance-plainings.component';
import { PlainingteamNotiToPostAuditTeamNotificationComponent } from '../../lead/existing-customer/advance-planning/plainingteam-noti-to-post-audit-team-notification/plainingteam-noti-to-post-audit-team-notification.component';
import { UpdatedAdvPlainngListComponent } from '../../lead/existing-customer/advance-planning/updated-adv-plainng-list/updated-adv-plainng-list.component';
import { VerifyInvoiceRequestComponent } from './verify-invoice-request/verify-invoice-request.component';
import { InvoiceRequestListComponent } from '../pre-audit/invoice-request-list/invoice-request-list.component';
import { UpdatedVerifierComponent } from './updated-verifier/updated-verifier.component';
import { InvoiceVerifyListComponent } from './invoice-verify-list/invoice-verify-list.component';
import { SalesRequestComponent } from './sales-request/sales-request.component';
import { TOPDFComponent } from './to-pdf/to-pdf.component';
import { AckComponent } from './ack/ack.component';

const routes: Routes = [
    { path: '', component: PreAuditHomeComponent },
    {
      path:'advance-planning',
      loadChildren:()=>import('../../lead/existing-customer/advance-planning/advance-planning.module').then(m=>m.AdvancePlanningModule)
    },
    {
      path:'work-order',
      loadChildren:()=>import('./work-order/work-order.module').then(m=>m.WorkOrderModule)
    },
    {
      path:'blocked-auditor',
      loadChildren:()=>import('./blocked-auditor/blocked-auditor.module').then(m=>m.BlockedAuditorModule)
    },
    {
      path:'training-material',
      loadChildren:()=>import('./training-material/training-material.module').then(m=>m.TrainingMaterialModule)},
    {
      path:'training-result',
      loadChildren:()=>import('./training-result/training-result.module').then(m=>m.TrainingResultModule)
    },
    { path: 'auditor-master', loadChildren: () => import('./auditor-master/auditor-master.module').then(m => m.AuditorMasterModule) },

    { path: 'task-order', component: TaskOrderListComponent },
    { path: 'task-orders', component: TaskOrderListComponent },
    { path: 'Planning-Audit-Details', component: PlanningAuditDetailsComponent },
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
    { path: 'verify_invoice_request', component: VerifyInvoiceRequestComponent },
    { path: 'invoice_request_lists', component: InvoiceRequestListComponent },
     { path: 'updated-verifier', component: UpdatedVerifierComponent },
     {path:'invoice-verify-list',component:InvoiceVerifyListComponent},
     {path:'sales-request',component:SalesRequestComponent},
     {path:'ts-order',component:TaskOrderListComponent},

     {path:'to-pdf',component:TOPDFComponent},
     {path:'ack',component:AckComponent},




     {
      path:'generate-invoice',
      loadChildren:()=>import('./generate-invoice/generate-invoice.module').then(m=>m.GenerateInvoiceModule)
    },
    {
      path:'Cutomer-major-reason',
      loadChildren:()=>import('./major-cutomer-reason/major-cutomer-reason.module').then(m=>m.MajorCutomerReasonModule)
    },
    {
      path: 'open-house-training',
      loadChildren: () =>
        import('./open-house-training/open-house-training.module').then(
          (m) => m.OpenHouseModuleModule
        ),
    },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PreAuditRoutingModule { }
