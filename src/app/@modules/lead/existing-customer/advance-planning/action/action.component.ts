import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ICellRendererParams } from 'ag-grid-community';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { AnyCatcher } from 'rxjs/internal/AnyCatcher';
import { RecruitService } from 'src/app/@shared/services/recruitment.service';
import { EmpMasterService } from 'src/app/@shared/services/emp-master.service';
import { AdvancePlanningComponent } from '../advance-planning.component';
import { log } from 'console';
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
  forCSP2: any;
  type: any;
  assign_by: any;
  constructor(private route: Router, private recruitService: RecruitService, private toast: ToastrService, private _empMasterService: EmpMasterService,
    public dialog: MatDialog,
    private activateRoute: ActivatedRoute,) {
    // this.data = localStorage.getItem("jobId");
    // 
    this.activateRoute.queryParams.subscribe((res: any) => {

      console.log(res);




    })


  }

  ngOnInit(): void {
    const url = window.location.href;
    console.log(window.location.href);
    const lastSegment = url.substr(url.lastIndexOf('/') + 1);
    console.log('Last Segment:', lastSegment);
    this.type = lastSegment
  }
  public cellValue: any;

  agInit(params: ICellRendererParams): void {
    this.cellValue = this.getValueToDisplay(params);

  }
  getValueToDisplay(params: ICellRendererParams) {

    this.data = params
    this.params_value = params.data.lead_genration_id
    this.forCSP = params.data.for_csp
    this.forCSP2 = params.data.forCSP2
    this.notification_staus = params.data.notification_status
    this.assign_by = params.data.assignById


  }

  refresh(params: ICellRendererParams): boolean {
    // set value into cell again

    this.cellValue = this.getValueToDisplay(params);
    return true;
  }
  approves(e: any) {
    e.stopPropagation();
    console.log(this.data, 'datass');
    console.log(this.params_value, "params_value");
    this.route.navigate(['master/audit/pre-audit/update-advance-plaining'],
      { queryParams: { lead_generate_id: this.params_value, notification: this.notification_staus, type: this.type } }
    )
  }


  approve(e: any) {
    console.log(this.data, "this.data");

    e.stopPropagation();

    if (this.data.data.for_csp == ! 'csp' && this.data.data.forCSP2 == 'csp2') {
      console.log(this.params_value, "params_value");
      this.route.navigate(['master/audit/pre-audit/update-advance-plaining'],
        { queryParams: { lead_generate_id: this.params_value, notification: this.notification_staus, type: this.type, assignby: this.assign_by } }
      )
    }
    else if (this.data.data.remaining_count == 0) {
      console.log(this.params_value, "params_value");
      this.route.navigate(['master/audit/pre-audit/send-notification'],
        { queryParams: { lead_generate_id: this.params_value, notification: "sus_date", type: this.type, assignby: this.assign_by } }
      )
    }
    else if (this.data.data.status == " Waiting for RBH Approval") {
      console.log(this.params_value, "params_value");
      this.route.navigate(['master/audit/pre-audit/send-notification'],
        { queryParams: { lead_generate_id: this.params_value, notifications: "rbh_approval", notification_id: this.data.data.ap_notification_id, assignby: this.assign_by } }
      )
    }
    // else if (this.data.data.forCSP == 'csp') {
    //   this.toast.error("Already send notification");
    // }
    // else if (this.data.data.forCSP == 'csp' && this.data.data.forCSP2 == 'csp2') {
    //   this.toast.success("Already send notification");
    // }
    else {
      console.log(this.params_value, "params_value");
      this.route.navigate(['master/audit/pre-audit/send-notification'],
        { queryParams: { lead_generate_id: this.params_value, notification: this.notification_staus, type: this.type, assignby: this.assign_by } }
      )
    }
  }
  update_list(e: any) {
    e.stopPropagation();
    if (this.data.data.status == "ready for widthdrawal") {
      this.toast.warning('Please take approval to RBH')
    }
    else if (this.data.data.status == " Waiting for RBH Approval") {
      this.toast.warning('Please wait till approve/reject by RBH')
    }
    else {
      console.log(this.params_value, "params_value");
      this.route.navigate(['master/audit/pre-audit/update-advance-plaining'],
        { queryParams: { lead_generate_id: this.params_value, check: false, notification: this.notification_staus, type: this.type, assignby: this.assign_by } }
      )

    }
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
}
