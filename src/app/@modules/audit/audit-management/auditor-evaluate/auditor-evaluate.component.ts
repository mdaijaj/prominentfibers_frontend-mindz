import { Component, OnInit } from '@angular/core';
import { GridApi, GridReadyEvent } from 'ag-grid-community';
import 'ag-grid-enterprise';
import { EmpRegistrationService } from 'src/app/@shared/services/emp-registration.service';
// import { ActionComponent } from './action/action.component';
// import { EmpListDialogComponent } from './emp-list-dialog/emp-list-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { RbacMasterService } from 'src/app/@shared/services/rbac-master.service';
import { EmpListDialogComponent } from 'src/app/@modules/hrms/employee-master/employee/employee-list/emp-list-dialog/emp-list-dialog.component';
import { LeadService } from 'src/app/@shared/services/lead.service';
import { ActionAuditComponent } from '../add-auditor/action-audit/action-audit.component';
import { Router } from '@angular/router';
import { SalesRequestService } from 'src/app/@shared/services/salesrequest/sales-request.service';
// import { ActionAuditComponent } from '../action-audit/action-audit.component';
@Component({
  selector: 'app-auditor-evaluate',
  templateUrl: './auditor-evaluate.component.html',
  styleUrls: ['./auditor-evaluate.component.scss']
})
export class AuditorEvaluateComponent {
aa: number[];
  auditorLists: any;


constructor(
  private salesRequest_:SalesRequestService,
  private route:Router
){
this.auditorList();
}
auditorList(){
  this.salesRequest_.Auditorlist().subscribe((res:any)=>{
    this.auditorLists=res.data
    console.log(this.auditorLists,"auditLists");
    
  })
}
ngOnInit(){
this.fun()
}

fun(){
  this.aa=[1,1,11,1,1,1,1,1]
}
Evaluation_summary_page(auditor_id:any){
  this.route.navigate(['master/audit/audit-management/auditor-evalvator/evaluation_summary'],
  { queryParams: {auditor_id:auditor_id} })

}

}

