import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ICellRendererParams } from 'ag-grid-community';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { AnyCatcher } from 'rxjs/internal/AnyCatcher';
import { RecruitService } from 'src/app/@shared/services/recruitment.service';
import { EmpMasterService } from 'src/app/@shared/services/emp-master.service';
import { AdvancePlanningComponent } from '../../advance-planning/advance-planning.component';
import { aD } from '@fullcalendar/core/internal-common';
import { EmailSendeComponent } from '../../email-sende/email-sende.component';

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
  ad_planning:any="Advance Planning";
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
    
  }
  getValueToDisplay(params: ICellRendererParams) {
    this.data = params
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
    e.stopPropagation();
    if (this.data.data.for_csp == 'csp') {
      this.route.navigate(['master/lead/existing-customer/advance-planning/update-advance-plaining'],
        { queryParams: { lead_generate_id: this.params_value,notification:this.notification_staus } }
      )
    }
    else {
      this.route.navigate(['master/lead/existing-customer/advance-planning/send-notification'],
        { queryParams: { lead_generate_id: this.params_value,notification:this.notification_staus } }
      )
    }
  }
  update_list(e: any) {
    e.stopPropagation();
    this.route.navigate(['master/lead/existing-customer/suspection/update-certificate'],
      { queryParams: { lead_generate_id: this.params_value} }
    )
  }
  notification(e:any){
    e.stopPropagation();
    this.route.navigate(['master/lead/existing-customer/advance-planning/send-notification'],
      { queryParams: { lead_generate_id: this.params_value,notification:"post_audit" } }
    )
  }
  openDialog() {
    const dialogRef
      = this.dialog.open(AdvancePlanningComponent, {
        width: '150%',
        maxWidth: '100vw',
        maxHeight: '100vh',
        height: '100%',
        panelClass: 'full-screen-modal',
        data: { id: this.cellValue }
      });
    dialogRef.afterClosed().subscribe(result => {
      
    });
  }

  emailSend(e:any,ad_data:any){
    e.stopPropagation();
    const dialogRef = this.dialog.open(EmailSendeComponent, {
      width: '50%',
      maxWidth: '100vw',
      maxHeight: '100vh',
      height: '90%',
      position: {bottom: '10px', right:'10px'} ,
      panelClass: 'full-screen-modal',
      data: { ad_data:this.data.data },
    });
    dialogRef.afterClosed().subscribe((result) => {   
    });
  }
}
