import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ICellRendererParams } from 'ag-grid-community';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { RecruitService } from 'src/app/@shared/services/recruitment.service';
import { EmpMasterService } from 'src/app/@shared/services/emp-master.service';
import { DialogAuditorAssignComponent } from '../dialog-auditor-assign/dialog-auditor-assign.component';

@Component({
  selector: 'app-action',
  templateUrl: './action.component.html',
  styleUrls: ['./action.component.scss']
})
export class ActionComponent {
  jobIdNew: any;
  // data: string | null;
  emailIdNew: any
  achivementId: any;
  grivanceId: any;
  complaint_id: any;
  helpDeskId: any;
  achieveId: any;
  resignId: any;
  announcmentStatus: any;
  openHouseTraining: any;
  params_value: ICellRendererParams<any, any>;
  data: ICellRendererParams<any, any>;
  forCSP: any;
  notification_staus: any;
  status: any;
  leadId: any;
  constructor(private route: Router, private recruitService: RecruitService, private toast: ToastrService, private _empMasterService: EmpMasterService,
    public dialog: MatDialog) {
    // this.data = localStorage.getItem("jobId");
    // 

  }

  ngOnInit(): void {
  }
  public cellValue: any;

  agInit(params: ICellRendererParams): void {
    this.cellValue = this.getValueToDisplay(params);
    console.log(params,'params');
    
  }
  getValueToDisplay(params: ICellRendererParams) {
    console.log(params,'params');
    
    this.data = params
    this.status=params.data.status
    
  this.leadId=params.data.lead_genrate_id;
    this.params_value = params.data.lead_genration_id
    this.forCSP = params.data.for_csp
    this.notification_staus=params.data.notification_status
  }

  refresh(params: ICellRendererParams): boolean {
    // set value into cell again
    
    this.cellValue = this.getValueToDisplay(params);
    return true;
  }

  approve(e: any) {
  }
  update_list(e: any) {
    e.stopPropagation();
    

  }
  notification(e:any){
    e.stopPropagation();
    
 
  }

  invoice(e:any){
    console.log(this.leadId,'this.leadId');
    
    this.route.navigate(['master/audit/pre-audit/updated-verifier'],
  {
    queryParams: { lead_genration_id: this.leadId, br_number: this.data.data.br_number}
  }
);
}
openDialog(data:any,e:any) {
  e.stopPropagation();
if(data.data.status=="Booked"){
this.toast.warning('Already Booked')
}
else{
  const dialogRef = this.dialog.open(DialogAuditorAssignComponent,{
    data:{data,e}
  });
  dialogRef.afterOpened().subscribe(result => {
    
  });
  dialogRef.afterClosed().subscribe(result => {
    
  });
}
}
}
