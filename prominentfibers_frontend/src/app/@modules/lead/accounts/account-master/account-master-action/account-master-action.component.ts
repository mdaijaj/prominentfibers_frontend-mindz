import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ICellRendererParams } from 'ag-grid-community';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { RecruitService } from 'src/app/@shared/services/recruitment.service';
import { EmpMasterService } from 'src/app/@shared/services/emp-master.service';
import { AppListDialogComponent } from 'src/app/@shared/app-list-dialog/app-list-dialog.component';
import { EmailSendeComponent } from 'src/app/@shared/components/email-sende/email-sende.component';

@Component({
  selector: 'app-account-master-action',
  templateUrl: './account-master-action.component.html',
  styleUrls: ['./account-master-action.component.scss']
})
export class AccountMasterActionComponent {
  jobIdNew: any;
  // data: string | null;
  emailIdNew: any;
  achivementId: any;
  grivanceId: any;
  complaint_id: any;
  helpDeskId: any;
  achieveId: any;
  resignId: any;
  enableValidate: boolean = false;
  enableAssign: boolean = false;
  enableProspect: boolean = false;
  enableAccount: boolean = false;
  enableOpportunity: boolean = false;
  enableSendL1: boolean = false;
  enablePreL1: boolean = false;
  enablePreL2: boolean = false;
  enableQuote: boolean = false;
  prepareQuote: boolean = false;
  updateQuote: boolean = false;
  updateApprove: boolean = false;
  updateSM: boolean = false;
  sentPI: boolean = false;
  workOrder: boolean = false;
  finalEditor: boolean = false;
  taskOrder: boolean = false;
  postReview: boolean = false;
  l1Reviewed: boolean = false;
  datesManaged: boolean = false;
  performaInvoiceSent: boolean = false;
  documentUploaded: boolean = false;
  interCompanyId: any;
  responseSent: boolean = false;
  responseConfirm: boolean = false;
  poReceived: boolean = false;
  openHouseNew: boolean = false;
  nonCert: any;
  leadService: any;
  lead_id: boolean;
  params: ICellRendererParams<any, any>;
  employee_id: string;
  role: string;
  invoice_data: any;
  certificate_type: any;
  invoice_icon: any;
  br_no: any;
  mainId: string | null;
  mainEmployeeData: any;
  leadNewId: any;
  lead_status: any;
  constructor(
    private route: Router,
    private recruitService: RecruitService,
    private toast: ToastrService,
    private _empMasterService: EmpMasterService,
    public dialog: MatDialog,
    private activatedRoute:ActivatedRoute
  ) {
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
    
    this.leadNewId = params?.data?.lead_genration_id;
    this.lead_status = params?.data?.status;
   
  }

  refresh(params: ICellRendererParams): boolean {
    // set value into cell again
    this.cellValue = this.getValueToDisplay(params);
    
    return true;
  }

  validate(e: any) {
    e.stopPropagation();
    // if(this.lead_status != 'Verified DQS Data'){
    //   this.toast.warning('Your Lead Status Is Not Verified DQS Data')
    //   return
    // }
    e.stopPropagation();
    this.route.navigate(
      ['master/lead/lead-account/customer-account'],
      { queryParams: { lead_id: this.leadNewId, status: 'true' } }
    );
  }

 
  //grivance
  grivanceDelete() {
    Swal.fire({
      title: 'Are you sure want to Remove?',
      // text: 'You will not be able to recover this file!',
      icon: 'warning',
      showCancelButton: true,
      cancelButtonColor: '#8B817D',
      confirmButtonColor: '#f44336',
      confirmButtonText: 'Delete!',
      cancelButtonText: 'Skip',
    }).then((result) => {
      if (result.value) {
        this._empMasterService
          .deleteGrievanceById(this.grivanceId)                                
          .subscribe((res) => {
            window.location.reload();
          });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
      }
    });
  }

  //complaint
  complaintDelete() {
    Swal.fire({
      title: 'Are you sure want to remove?',
      text: 'You will not be able to recover this file!',
      icon: 'warning',
      showCancelButton: true,
      cancelButtonColor: '#f44336',
      confirmButtonColor: '#3f51b5',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it',
    }).then((result) => {
      if (result.value) {
        this._empMasterService
          .deleteCompalintById(this.complaint_id)
          .subscribe((res) => {
            window.location.reload();
          });
        // Swal.fire(
        //   'Deleted!',
        //   'Your imaginary file has been deleted.',
        //   'success'
        // )
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        // Swal.fire(
        //   'Cancelled',
        //   'Your imaginary file is safe :)',
        //   'error'
        // )
      }
    });
  }

  //help-disk
  helpDiskDelete() {
    if (
      confirm('Are you sure you want to Delete this thing into the database?')
    ) {
      this._empMasterService
        .deleteHelpDesk(this.helpDeskId)
        .subscribe((res) => {
          this.toast.success('Grievancy Data is Deleted Successfully!');
          window.location.reload();
          
        });
    }
  }

  //achivement delete

  achivementDelete() {
    const data = {
      achieveId: this.cellValue,
    };
    this.achieveId = Number(this.cellValue);
    this.recruitService
      .deleteAchievement(this.achieveId, data)
      .subscribe((res: any) => {
        
        this.toast.success('Achievement Deleted successfully..');
        window.location.reload();
      });
  }

  openDialog() {
    const dialogRef = this.dialog.open(AppListDialogComponent, {
      width: '100%',
      maxWidth: '100vw',
      maxHeight: '100vh',
      height: '100%',
      panelClass: 'full-screen-modal',
      data: { id: this.cellValue },
    });

    dialogRef.afterClosed().subscribe((result) => {
      
    });
  }

  emailSend(e: any) {
    e.stopPropagation();

    const dialogRef = this.dialog.open(EmailSendeComponent, {
      width: '40%',
      // maxWidth: '100vw',
      // maxHeight: '100vh',
      height: '70%',
      position: { bottom: '10px', right: '10px' },
      panelClass: 'full-screen-modal',
      data: { id: this.cellValue },
    });

    dialogRef.afterClosed().subscribe((result) => {
      
    });
  }
  verify_invoice_request(e: any) {
    e.stopPropagation();
    
    
    this.route.navigate(['master/audit/pre-audit/verify_invoice_request'],
    {
      queryParams: { lead_genration_id: this.cellValue }
    })

  }
  invoice_request_list(e: any) {
    e.stopPropagation();
    this.route.navigate(['master/audit/pre-audit/invoice_request_lists'],
    {
      queryParams: { lead_genration_id: this.cellValue }
    })
    

  }
}
