import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuditManagementComponent } from './audit-management.component';
import { RejectedAuditReportComponent } from './rejected-audit-report/rejected-audit-report.component';
import {ListComponent}from './auditor-master/list/list.component'
const routes: Routes = [
  {
    path: '', component: AuditManagementComponent
  },
  {
    path:'add-auditor',
    loadChildren:()=>import('./add-auditor/add-auditor.module').then(m=>m.AddAuditorModule)
  },
  { path: 'auditor-master', loadChildren: () => import('./auditor-master/auditor-master.module').then(m => m.AuditorMasterModule) },
  {path: 'rejected-audit-report', component: RejectedAuditReportComponent},
  {path:'block-auditor',component:ListComponent},
  // {path:'auditor-evalvator',component:ListComponent},
  {
    path:'auditor-evalvator',
    loadChildren:()=>import('./auditor-evaluate/auditor-evaluate.module').then(m=>m.AuditorEvaluateModule)
  },
  {
    path:'sales-request',
    loadChildren:()=>import('./sales-request/sales-request.module').then(m=>m.SalesRequestModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuditManagementRoutingModule { }
