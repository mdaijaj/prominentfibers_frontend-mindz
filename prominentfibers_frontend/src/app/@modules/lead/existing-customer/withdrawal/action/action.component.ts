import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ICellRendererParams } from 'ag-grid-community';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { AnyCatcher } from 'rxjs/internal/AnyCatcher';
import { RecruitService } from 'src/app/@shared/services/recruitment.service';
import { EmpMasterService } from 'src/app/@shared/services/emp-master.service';
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
    this.notification_staus = params.data.notification_status

  }

  refresh(params: ICellRendererParams): boolean {
    // set value into cell again

    this.cellValue = this.getValueToDisplay(params);
    return true;
  }

  approve(e: any) {
    e.stopPropagation();
 
    if (this.data.data.status == "Reject by RBH") {
      this.toast.warning("Already Rejected");
    }
    else if (this.data.data.status == " Waiting for RBH Approval") {
      this.toast.warning("Please wait Until RBH Approve/Reject");
    }
    else if (this.data.data.status == "Approval by RBH") {
      this.toast.warning("Already Approved");
    }
    // else if (this.data.data.status == "Reject by RBH") {
    //   this.toast.error("Already Rejected");
    // }
    else {

    this.route.navigate(['master/lead/existing-customer/withdrawal/notificaiton'],
          { queryParams: { lead_generate_id: this.params_value, notification: "widthdrwal", notification_id: this.data.data.ap_notification_id } }
        )
    }
  }
  update_list(e: any) {
    e.stopPropagation();

    this.route.navigate(['master/lead/existing-customer/advance-planning/update-advance-plaining'],
      { queryParams: { lead_generate_id: this.params_value, check: false, notification: this.notification_staus } }
    )
  }

  update_certificate(e: any) {
    e.stopPropagation();

    this.route.navigate(['/master/lead/existing-customer/suspection/update-certificate'],
      { queryParams: { lead_generate_id: this.params_value, check: false, notification: this.notification_staus } }
    )
  }
}
