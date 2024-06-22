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
import { RbacMasterService } from 'src/app/@shared/services/rbac-master.service';

@Component({
  selector: 'app-action-non-cert',
  templateUrl: './action-non-cert.component.html',
  styleUrls: ['./action-non-cert.component.scss']
})


export class ActionNonCertComponent implements OnInit {
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
  FEAaprrovel:boolean=false;
  FEAaprrover: boolean;
  verifyDqsData:boolean=false;
  techReview: boolean=false;
  signDocument: boolean = false;
  advancePayment:boolean = false;
  finalTraining: boolean;
  assignAction: any;
  constructor(
    private route: Router,
    private recruitService: RecruitService,
    private toast: ToastrService,
    private _empMasterService: EmpMasterService,
    public dialog: MatDialog,
    private activatedRoute:ActivatedRoute,
    private _rbackService: RbacMasterService,

  ) {
    // this.data = localStorage.getItem("jobId");
    //
  }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((res:any)=>{
      this.invoice_icon=res.invoice;

    })
    this.mainId = localStorage.getItem('signInUser');

  }
  ngAfterViewInit(): void {
    setTimeout(() => {
      this.assignAction = this._rbackService.accessAssignAction();
      console.log(this.assignAction, "assign");
    }, 0);
  };
  public cellValue: any;

  agInit(params: ICellRendererParams): void {
    this.cellValue = this.getValueToDisplay(params);

  }
  openHouseClick(e: any) { }
  getValueToDisplay(params: ICellRendererParams) {
    console.log('params', params)
    this.br_no=params?.data?.br_number
    this.certificate_type = params?.data?.certificate_type_name;

    this.params=params?.data?.training_end_date
    this.interCompanyId = params?.data?.intercompany_id;
    if (params?.data?.status === 'Open') {
      this.enableValidate = true;
      this.enableAssign = false;
    }
    if (params?.data?.status === 'Validated') {
      this.enableValidate = false;
      this.enableAssign = true;
    }
    if (params?.data?.status === 'Assigned') {
      this.enableProspect = false;
      this.enableAccount = true;
    }
    if (params?.data?.status === 'Prospect') {
      this.enableAccount = false;
      this.enableProspect = true;
    }
    if (params?.data?.status === 'Account') {
      this.enableOpportunity = true;
    }
    if (params?.data?.status === 'Opportunity') {
      this.enableSendL1 = true;
      this.nonCert = params.data.non_cert_type;

    }
    console.log(params,'params');

    if(params?.data?.status === 'Documents Signed'){
      this.FEAaprrovel=true;
    }
    if(params?.data?.status==='Sent FEA Approval'){
      this.FEAaprrover=true;
    }
    if (params?.data?.status === 'Sent L1') {
      this.enablePreL1 = true;
      this.nonCert = params.data.non_cert_type;

    }
    if (params?.data?.status === 'Pre L1') {
      this.enablePreL2 = true;
    }
    if (params?.data?.status === 'Pre L2') {
      this.enableQuote = true;
    }
    if (params?.data?.status === 'Quotation') {
      this.prepareQuote = true;
    }
    if (params?.data?.status === 'Quotation Sent') {
      this.updateQuote = true;
    }
    if (params?.data?.status === 'Digitally Signed Document') {
      this.signDocument = true;
    }
    if (params?.data?.status === 'Quote Accepted') {
      this.updateApprove = true;
    }
    if (params?.data?.status === 'Sent S&M Approval') {
      this.updateSM = true;
    }
    if (params?.data?.status === 'S&M Approved') {
      this.updateApprove = true;
    }
    if (params?.data?.status === 'Proforma Invoice Sent') {
      this.sentPI = true;
    }
    if (params?.data?.status === 'PO Received') {
      this.poReceived = true;
    }
    if (params?.data?.status === 'Work Order Created') {
      this.workOrder = true;
    }
    if (params?.data?.status === 'Blocked Auditor') {
      this.finalEditor = true;
    }
    if(params?.data?.certificate_type_name == 'Non Cert'){
      this.finalTraining = true;
    }
    if (params?.data?.status === 'APPROVED TO') {
      this.taskOrder = true;
    }
    if (params?.data?.status === 'Technical Review') {
      this.techReview = true;
    }
    if (params?.data?.status === 'Send for Review') {
      this.postReview = true;
    }
    if (params?.data?.status === 'L1 Reviewed') {
      this.l1Reviewed = true;
    }
    if (params?.data?.status === 'Dates Managed') {
      this.datesManaged = true;
    }
    if (params?.data?.status === 'Request Received') {
      this.performaInvoiceSent = true;
    }
    if (params?.data?.status === 'Request Raised') {
      this.performaInvoiceSent = true;
    }
    if(params?.data?.status==='Advance Payment'){
      this.advancePayment=true;
    }
    if (params?.data?.status === 'Response Submitted') {
      this.responseSent = true;
    }
    if (params?.data?.status === 'Response Confirm') {
      this.responseConfirm = true;
    }
    if (params?.data?.status === 'Document Uploaded') {
      this.documentUploaded = true;
    }

    if (params?.data?.status === 'Verified DQS Data') {
      this.verifyDqsData = true;
    }
    if (params?.data?.lead_genration_id) {
      this.jobIdNew = params?.data?.lead_genration_id;
      return params.data.lead_genration_id;
    }
    // if (params.data.intercompany_id) {
    //   this.jobIdNew = params.data.intercompany_id;
    //   return params.data.intercompany_id;
    // }

    if (params?.data?.status === 'Open House New') {
      this.openHouseNew = true;
    }

  }

  refresh(params: ICellRendererParams): boolean {
    // set value into cell again

    this.cellValue = this.getValueToDisplay(params);
    return true;
  }

   workOrderFunc(e: any) {
    e.stopPropagation();
    console.log('sdfdsf testing')
    // previous code
    // this.route.navigate(['master/audit/pre-audit/work-order/create-non-cert-order'], {
    //   queryParams: { lead_id: this.cellValue, type: 'save' ,br_no:this.br_no},
    // });

    // new code 
    this.route.navigate(['master/audit/pre-audit/work-order/create-order'], {
      queryParams: { lead_id: this.cellValue, type: 'save' ,br_no:this.br_no},
    });
  }
  edit_workOrderFunc(e: any) {
    e.stopPropagation();
    if(this.workOrder){
      if(this.role ==='Administration'){
    this.route.navigate(['master/audit/pre-audit/work-order/create-order'], {
      queryParams: { lead_id: this.cellValue, type: 'updatesave' },
    });
  } else {
    this.toast.warning('Only Admin can change');
  }
}
  }}