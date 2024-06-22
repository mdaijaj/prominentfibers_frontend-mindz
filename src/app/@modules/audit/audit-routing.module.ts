import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuditComponent } from './audit.component';

// const routes: Routes = [{ path: '', component: FinanceComponent }];


const routes: Routes = [
  {
    path: '', component: AuditComponent,
    children: [
      // {
      //   path: '', redirectTo: 'pre-audit', pathMatch: 'full'
      // },
      {
        path:'post-audit',
        loadChildren:()=>import('./post-audit/post-audit.module').then(m=>m.PostAuditModule)
      },
      {
        path:'pre-audit',
        loadChildren:()=>import('./pre-audit/pre-audit.module').then(m=>m.PreAuditModule)
      },
      {
        path:'audit-management',
        loadChildren:()=>import('./audit-management/audit-management.module').then(m=>m.AuditManagementModule)
      },


    ]
  }
];







@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuditRoutingModule { }

