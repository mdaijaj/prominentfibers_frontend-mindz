import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ICellRendererParams } from 'ag-grid-community';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { RecruitService } from 'src/app/@shared/services/recruitment.service';
import { EmpMasterService } from 'src/app/@shared/services/emp-master.service';
import { AppListDialogComponent } from 'src/app/@shared/app-list-dialog/app-list-dialog.component';
import { EmailSendeComponent } from 'src/app/@shared/components/email-sende/email-sende.component';
import { RbacMasterService } from 'src/app/@shared/services/rbac-master.service';
import { LeadService } from 'src/app/@shared/services/lead.service';

@Component({
  selector: 'app-action',
  templateUrl: './action.component.html',
  styleUrls: ['./action.component.scss'],
})
export class ActionComponent implements OnInit {
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
  FEAaprrovel: boolean = false;
  FEAaprrover: boolean;
  verifyDqsData: boolean = false;
  techReview: boolean = false;
  signDocument: boolean = false;
  advancePayment: boolean = false;
  finalTraining: boolean;
  assignAction: any;
  enableTaskOrder: boolean;
  signDocument_FEA: boolean;
  advancePayment_: boolean;
  verifyDigitalDoc: boolean = false;
  uploadDocsSigned: boolean = false;
  snmHead: boolean = false;
  feaPending: boolean;
  FEA_: boolean = true;
  advancepay: any;
  training_status: boolean;
  role_id: any;
  singInUser: string | null;
  assignId: any;
  wo_id: any;
  advancePaymentList: boolean = false;
  approver_assignL1Id: any;
  approver_assignL2Id: any;
  lead_assign_owner: any;
  salesHeadApproval: boolean = false;
  conatctOwner: any;
  approverL1Name: any;
  approveL2Name: any;
  completenessCheck: boolean = false
  alreadyFea: any;
  leadManagementData: any
  FEAaprroverCopy: boolean = false;
  stage: any;
  certificate_type_: any;
  stage_: any;
  wo_id_: any;
  br: any;
  constructor(
    private route: Router,
    private recruitService: RecruitService,
    private toast: ToastrService,
    private _empMasterService: EmpMasterService,
    public dialog: MatDialog,
    private _rbackService: RbacMasterService,
    private _leadService: LeadService
  ) {
    // this.data = localStorage.getItem("jobId");
    //
  }

  ngOnInit(): void {
    console.log(this.route.url);
    const pathSegments = this.route.url.split('/');
    const lastSegment = pathSegments[pathSegments.length - 1];
    console.log(lastSegment);
    if (lastSegment == "task-orders") {
      this.invoice_icon = 'yes'

    }
    // this.activatedRoute.queryParams.subscribe((res:any)=>{
    //   this.invoice_icon=res.invoice;

    // })
    let loginUser: any = localStorage.getItem('signInUser');
    let role_id: any = JSON.parse(loginUser).role_id;
    this.role_id = role_id;
    console.log('singn in user id', role_id)
    this.mainId = localStorage.getItem("EmpMainId");
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
    this.alreadyFea = params.data;
    this.br_no = params?.data?.br_number
    this.stage_ = params?.data?.stage;
    this.wo_id_ = params?.data?.workOrdercomponentId;
    this.br = params?.data?.lead_managment?.br_number;
    this.certificate_type_ = params?.data?.lead_managment?.certificate_type_name || params?.data?.lead_managment?.certificate_type;
    this.certificate_type = params?.data?.certificate_type_name || params?.data?.certificate_type;
    this.wo_id = params?.data?.workOrdercomponentId
    this.params = params?.data?.training_end_date
    this.stage = params?.data.stage
    this.interCompanyId = params?.data?.intercompany_id;
    this.advancepay = params?.data?.status3;
    this.assignId = Number(params.data?.lead_assgn_contact_owner);
    console.log(this.assignId, 'this.assignId');
    this.approver_assignL1Id = params?.data?.approver_name_l1Id;
    console.log(this.approver_assignL1Id, 'this.approver_assignL1Id');
    this.approver_assignL2Id = params?.data?.approver_name_l2Id;
    this.lead_assign_owner = Number(params?.data?.lead_assgn_contact_owner);
    this.conatctOwner = params?.data?.contact_owner;
    this.approverL1Name = params?.data?.approver_name_l1;
    this.approveL2Name = params?.data?.approver_name_l2;
    if (params?.data?.status === 'Open') {
      this.enableValidate = true;
      this.enableAssign = false;
    }
    if (params?.data?.status === 'Sent FEA Approval Pending') {
      this.feaPending = true;
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
    if (params?.data?.status3 === 'Advance Payment') {
      this.advancePaymentList = true;
    }

    if (params.data?.status == 'Training Material') {
      this.enableTaskOrder = true;
      this.finalEditor = false;
      this.training_status = true;
    }
    console.log(params, 'params');

    if (params?.data?.status === 'Documents Signed') {
      this.FEAaprrovel = true;
    }
    if (params?.data?.status === 'Sent FEA Approval') {
      this.FEAaprrover = true;
      this.FEA_ = false
    }
    if (params?.data?.status === 'Sent FEA Approval') {
      this.FEAaprroverCopy = true;
      this.FEA_ = false
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
      this.signDocument_FEA = true;

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
    if (params?.data?.status === 'Sales Head Approval') {
      this.salesHeadApproval = true;
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
    if (params?.data?.auditor_status === 'Blocked Auditor') {
      this.finalEditor = true;
    }
    if (params?.data?.certificate_type_name == 'Non Cert') {
      this.finalTraining = true;
    }
    if (params?.data?.status === 'APPROVED TO') {
      this.taskOrder = true;
    }
    if (params?.data?.status === 'Completeness Check') {
      this.completenessCheck = true;
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
    if (params?.data?.status === 'Digitally Signed Documents') {
      this.verifyDigitalDoc = true;
    }
    if (params?.data?.status === 'Advance Payment') {
      this.advancePayment = true;
      this.advancePayment_ = false;

    }
    // if(params?.data?.status==='Advance Payments'){
    //   this.advancePayment=true;
    //   this.advancePayment_=false;

    // }
    if (params?.data?.status === 'Documents Signed Uploaded') {
      this.uploadDocsSigned = true;
    }
    if (params?.data?.status === 'S&M Head Approved') {
      this.snmHead = true;
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

    if (params?.data?.status === 'Account') {
      this.openHouseNew = true;
    }

  }

  refresh(params: ICellRendererParams): boolean {
    // set value into cell again

    this.cellValue = this.getValueToDisplay(params);
    return true;
  }

  validate(e: any) {
    e.stopPropagation();
    this.route.navigate(
      ['master/lead/lead-management/validate-lead/validate-lead'],
      { queryParams: { lead_id: this.cellValue, type: 'validate' } }
    );
  }

  edit1(e: any) {
    if (this.enableValidate) {
      this.route.navigate(
        ['master/lead/lead-management/create-lead'],
        { queryParams: { lead_id: this.cellValue } }
      );
    }
  }

  assign(e: any) {
    e.stopPropagation();
    this.route.navigate(
      ['master/lead/lead-management/assign-lead/assign-lead'],
      { queryParams: { lead_id: this.cellValue, type: 'assign' } }
    );
  }
  editLeadValidate(e: any) {
    e.stopPropagation();
    this.route.navigate(
      ['master/lead/lead-management/validate-lead/validate-lead'],
      { queryParams: { lead_id: this.cellValue, type: 'update' } }
    );
  }
  prospect(e: any) {
    e.stopPropagation();

    console.log(this.assignId, 'this.assignId');
    console.log(this.mainId, 'this.mainId');

    if (this.assignId == this.mainId) {
      this.route.navigate(['master/lead/lead-prospect/create-prospect'], {
        queryParams: { lead_id: this.cellValue, type: 'prospect' },
      });


    } else {
      this.toast.warning("You Are Not Authorize To Perform Action Only " + this.conatctOwner + " Can Perform Action")
    }
  }
  prospect_edit(e: any) {
    e.stopPropagation();
    this.route.navigate(['master/lead/lead-management/assign-lead/assign-lead'], {
      queryParams: { lead_id: this.cellValue, type: 'edit' },
    });
  }
  account(e: any) {
    e.stopPropagation();
    this.route.navigate(['master/lead/lead-account/create-account'], {
      queryParams: { lead_id: this.cellValue, type: 'account' },
    });
  }
  edit_p(e: any) {
    e.stopPropagation();
    this.route.navigate(['master/lead/lead-prospect/create-prospect'], {
      queryParams: { lead_id: this.cellValue, type: 'edit' },
    });
  }
  opportunity(e: any) {
    e.stopPropagation();
    this.route.navigate(['master/lead/lead-account/customer-account'], {
      queryParams: { lead_id: this.cellValue },
    });
  }
  salesRequest(e: any) {
    console.log('sdsad', e)
    e.stopPropagation();

    this.route.navigate(['master/audit/pre-audit/sales-request'], {
      queryParams: { lead_id: this.cellValue, br: this.br_no },
    });
  }
  salesRequestCopy(e: any) {
    console.log('sdsad', e)
    e.stopPropagation();

    if (this.role_id === 22) {
      this.route.navigate(['master/audit/pre-audit/sales-request'], {
        queryParams: { lead_id: this.cellValue, br: this.br_no },
      });
    } else {
      this.toast.warning("Only SP Can Perform Action")
    }

  }

  openHouse(e: any) {
    e.stopPropagation();


    if (this.enableSendL1) {
      if (this.nonCert === 'Open House') {
        this.route.navigate(
          ['master/lead/lead-account/open-house-reg-create'],
          {
            queryParams: { lead_id: this.cellValue },
          }
        );
      } else {
        this.toast.warning('Only Applicable for Open House Leads..');
      }
    }
  }
  sendL1(e: any) {
    e.stopPropagation();

    if (this.role_id == 34) {
      if (this.certificate_type == 'Non-Cert') {


        this.route.navigate(['master/lead/quotation/prepare-quotation'], {
          queryParams: { lead_id: this.cellValue, type: 'savequote' },
        });
      }
      else {
        this.route.navigate(['master/lead/lead-opportunity/send-l1/send-for-l1'], {
          queryParams: { lead_id: this.cellValue, type: 'sendL1' },
        });
      }
    }
    else {
      this.toast.warning("You Are Not Authorize To Perform Action Only Sales Support Team Can Action")
    }


  }
  sendBudget(e: any) {
    e.stopPropagation();
    this.route.navigate(['master/lead/lead-opportunity/create-budgetary-quote'], {
      queryParams: { lead_id: this.cellValue, type: 'savebudget' },
    });

  }
  edit_sendL1(e: any) {
    e.stopPropagation();
    if (this.enableSendL1) {
      if (this.role === 'Administration') {
        this.route.navigate(['master/lead/lead-opportunity/send-l1/send-for-l1'], {
          queryParams: { lead_id: this.cellValue, type: 'updatesendL1' },
        });
      } else {
        this.toast.warning('Only Admin can change');
      }
    }
  }
  preL1(e: any) {
    e.stopPropagation();

    if (this.approver_assignL1Id == this.mainId) {
      this.route.navigate(['master/lead/lead-opportunity/audit-l1'], {
        queryParams: { lead_id: this.cellValue, type: 'approve' },
      });
    } else {
      this.toast.warning("You Are Not Authorize To Perform Action Only " + this.approverL1Name + ' Can perform Action')
    }

  }
  edit_preL1(e: any) {
    e.stopPropagation();
    if (this.enablePreL1) {
      if (this.role === 'Administration') {
        this.route.navigate(['master/lead/lead-opportunity/audit-l1'], {
          queryParams: { lead_id: this.cellValue, type: 'updateapprove' },
        });
      } else {
        this.toast.warning('Only Admin can change');
      }
    }
  }
  preL2(e: any) {
    e.stopPropagation();
    console.log(this.approver_assignL2Id, 'this.approver_assignL2Id');
    console.log(this.mainId, 'this.mainId');

    if (this.approver_assignL2Id == this.mainId) {
      this.route.navigate(['master/lead/lead-opportunity/audit-l2'], {
        queryParams: { lead_id: this.cellValue, type: 'approve' },
      });
    } else {
      this.toast.warning("You Are Not Authorize To Perform Action Only " + this.approveL2Name + "Can Action")

    }
  }

  navigateToSalesApproval(e: any) {
    e.stopPropagation();
    this.route.navigate(['master/lead/quotation/S&M-head-Approval/approval-action'], {
      queryParams: { lead_id: this.cellValue, type: 'approve' },
    });
  }

  edit_preL2(e: any) {
    e.stopPropagation();
    if (this.enablePreL2) {
      if (this.role === 'Administration') {
        this.route.navigate(['master/lead/lead-opportunity/audit-l2'], {
          queryParams: { lead_id: this.cellValue, type: 'updateapprove' },
        });
      } else {
        this.toast.warning('Only Admin can change');
      }
    }
  }
  quote(e: any) {
    e.stopPropagation();
    if (this.role_id == 34) {
      this.route.navigate(['master/lead/quotation/prepare-quotation'], {
        queryParams: { lead_id: this.cellValue, type: 'savequote' },
      });
    } else {
      this.toast.warning("Only Sales Support Team Can Perform Action")

    }


  }
  edit_quote(e: any) {
    e.stopPropagation();
    if (this.enableQuote) {
      if (this.role === 'Administration') {
        this.route.navigate(['master/lead/quotation/prepare-quotation'], {
          queryParams: { lead_id: this.cellValue, type: 'updatesavequote' },
        });
      } else {
        this.toast.warning('Only Admin can change');
      }
    }
  }

  prepare(e: any) {
    e.stopPropagation();

    // if(this.mainId==this.lead_assign_owner){
    this.route.navigate(['master/lead/quotation/send-quotation/send-quote'], {
      queryParams: { lead_id: this.cellValue, type: 'sendquote' },
    });
    // }
    //   else{
    // this.toast.warning("You Are Not Authorize To Perform Action Only " + this.conatctOwner + " Can Action")

    //   }

  }
  edit_prepare(e: any) {
    e.stopPropagation();
    if (this.prepareQuote) {
      if (this.role === 'Administration') {
        this.route.navigate(['master/lead/quotation/send-quotation/send-quote'], {
          queryParams: { lead_id: this.cellValue, type: 'updatesendquote' },
        });
      } else {
        this.toast.warning('Only Admin can change');
      }
    }
  }
  update(e: any) {
    e.stopPropagation();

    if (this.role_id == 34) {
      this.route.navigate(
        ['master/lead/quotation/update-quotation/update-quote'],
        { queryParams: { lead_id: this.cellValue, type: 'quoteaccepted' } }
      );
    } else {
      this.toast.warning("You Are Not Authorize To Perform Action Only Sales Support Team Action")

    }

  }
  edit_update(e: any) {
    e.stopPropagation();
    if (this.updateQuote) {
      if (this.role === 'Administration') {
        this.route.navigate(
          ['master/lead/quotation/update-quotation/update-quote'],
          {
            queryParams: { lead_id: this.cellValue, type: 'updatequoteaccepted' }
          });
      } else {
        this.toast.warning('Only Admin can change');
      }
    }
  }
  signDocs(e: any) {
    e.stopPropagation();
    this.route.navigate(
      ['master/lead/quotation/signed-document/sign-doc'],
      { queryParams: { lead_id: this.cellValue, type: 'quoteaccepted' } }
    );
  }
  uploadDocsSignedTwo(e: any) {
    e.stopPropagation();
    this.route.navigate(
      ['master/lead/quotation/sales-support/snm-head-approver'],
      { queryParams: { lead_id: this.cellValue, type: 'verifyDSD' } }
    );
  }
  snmHeadFunc(e: any) {
    e.stopPropagation();
    this.route.navigate(
      ['master/lead/quotation/verify-signed-document/verify-sign-doc'],
      { queryParams: { lead_id: this.cellValue, type: 'verifyDSD' } }
    );
  }
  approve(e: any) {
    e.stopPropagation();
    this.route.navigate(['master/lead/quotation/proforma-invoice'], {
      queryParams: { lead_id: this.cellValue, type: 'updateQuotation', br_Number: this.br_no },
    });
  }
  edit_approve(e: any) {
    e.stopPropagation();
    if (this.updateApprove) {
      if (this.role === 'Administration') {
        this.route.navigate(['master/lead/quotation/proforma-invoice'], {
          queryParams: { lead_id: this.cellValue, type: 'editupdateQuotation' },
        });
      } else {
        this.toast.warning('Only Admin can change');
      }
    }
  }
  approveSM(e: any) {
    e.stopPropagation();
    this.route.navigate(
      ['master/lead/quotation/send-for-s&m/send-for-sm-quote'],
      { queryParams: { lead_id: this.cellValue } }
    );
  }

  sentPIFunc(e: any) {
    e.stopPropagation();
    this.route.navigate(['master/lead/quotation/update-proforma'], {
      queryParams: { lead_id: this.cellValue, type: 'bookorder' },
    });
  }
  edit_sentPIFunc(e: any) {
    e.stopPropagation();
    if (this.sentPI) {
      if (this.role === 'Administration') {
        this.route.navigate(['master/lead/quotation/update-proforma'], {
          queryParams: { lead_id: this.cellValue, type: 'updatebookorder' },
        });
      } else {
        this.toast.warning('Only Admin can change');
      }
    }
  }
  workOrderFunc(e: any) {
    e.stopPropagation();
    this.route.navigate(['master/audit/pre-audit/work-order/create-order'], {
      queryParams: { lead_id: this.cellValue, type: 'save', br_no: this.br_no, WO_ID: this.wo_id, stage: this.stage },
    });
  }
  edit_workOrderFunc(e: any) {
    e.stopPropagation();
    if (this.workOrder) {
      if (this.role === 'Administration') {
        this.route.navigate(['master/audit/pre-audit/work-order/create-order'], {
          queryParams: { lead_id: this.cellValue, type: 'updatesave' },
        });
      } else {
        this.toast.warning('Only Admin can change');
      }
    }
  }
  RaiseOrderEditorFunc(e: any) {
    e.stopPropagation();
    this.route.navigate(
      ['master/audit/pre-audit/blocked-auditor/blocked-auditor-save'],
      { queryParams: { lead_id: this.cellValue, type: 'riseto', br_no: this.br } }
    );

  }
  finalEditorFunc(e: any) {
    e.stopPropagation();
    if (this.certificate_type_ == 'Non-Cert' || this.certificate_type_ == '2' || this.certificate_type_ == '4') {
      this.route.navigate(
        ['master/audit/pre-audit/work-order/create-non-cert-order'],
        { queryParams: { lead_id: this.cellValue, type: 'save', br_no: this.br,stage:this.stage_,wo_id:this.wo_id_ } }
      );
    }
    if (this.certificate_type_ == 'Cert' || this.certificate_type_ == '1' || this.certificate_type_ == '3') {
      this.route.navigate(
        ['master/audit/pre-audit/blocked-auditor/blocked-auditor-save'],
        { queryParams: { lead_id: this.cellValue, type: 'riseto', br_no: this.br,stage:this.stage_,wo_id:this.wo_id_ } }
      );
    }

  }


  edit_finalEditorFunc(e: any) {
    e.stopPropagation();
    if (this.finalEditor) {
      if (this.role === 'Administration') {
        this.route.navigate(
          ['master/audit/pre-audit/blocked-auditor/blocked-auditor-save'],
          {
            queryParams: { lead_id: this.cellValue, type: 'updateriseto' }
          });
      } else {
        this.toast.warning('Only Admin can change');
      }
    }
  }

  poReceivedFunc(e: any) {
    e.stopPropagation();
    this.route.navigate(
      ['master/lead/inter-company/update-quote/update-quote'],
      { queryParams: { lead_id: this.cellValue } }
    );
  }
  auditVerification(e: any) {
    e.stopPropagation();
    this.route.navigate(
      ['master/audit/post-audit/under-l1-review/post-audit-verification'],
      { queryParams: { audit_id: this.cellValue, type: 'underL1Review' } }
    );
  }

  navigateToCompletenessCreate(e: any) {
    e.stopPropagation();
    this.route.navigate(
      ['master/audit/post-audit/completeness-check/completness-create'],
      { queryParams: { audit_id: this.cellValue, type: 'completenessCheck' } }
    );
  }

  edit_auditVerification(e: any) {
    e.stopPropagation();
    if (this.taskOrder) {
      if (this.role === 'Administration') {
        this.route.navigate(
          ['master/audit/post-audit/under-l1-review/post-audit-verification'],
          {
            queryParams: { audit_id: this.cellValue, type: 'updateunderL1Review' }
          });
      } else {
        this.toast.warning('Only Admin can change');
      }
    }
  }
  techreviewauditVerification(e: any) {
    e.stopPropagation();
    this.route.navigate(
      ['master/audit/post-audit/techreview/techreview-audit-verification'],
      { queryParams: { techreviewaudit_id: this.cellValue, type: 'undertechReview' } }
    );
  }
  edit_techreviewauditVerification(e: any) {
    e.stopPropagation();
    if (this.taskOrder) {
      if (this.role === 'Administration') {
        this.route.navigate(
          ['master/audit/post-audit/techreview/techreview-audit-verification'],
          {
            queryParams: { techreviewaudit_id: this.cellValue, type: 'updateundertechReview' }
          });
      } else {
        this.toast.warning('Only Admin can change');
      }
    }
  }
  reviewL1(e: any) {
    e.stopPropagation();
    this.route.navigate(['master/audit/post-audit/l1-review/l1-reviewer'], {
      queryParams: { audit_id: this.cellValue, type: 'L-1Reviewer' },
    });
  }
  edit_reviewL1(e: any) {
    e.stopPropagation();
    this.route.navigate(['master/audit/post-audit/l1-review/l1-reviewer'], {
      queryParams: { audit_id: this.cellValue, type: 'updateL-1Reviewer' },
    });
  }
  l1Review(e: any) {
    e.stopPropagation();

    this.route.navigate(['master/audit/post-audit/manage-dates/create-dates'], {
      queryParams: { lead_id: this.cellValue, type: 'ManageDates' },
    });
  }
  edit_l1Review(e: any) {
    e.stopPropagation();

    this.route.navigate(['master/audit/post-audit/manage-dates/create-dates'], {
      queryParams: { lead_id: this.cellValue, type: 'updateManageDates' },
    });
  }
  managedDates(e: any) {
    e.stopPropagation();
    this.route.navigate(['master/audit/post-audit/upload-docs/create-upload'], {
      queryParams: { lead_id: this.cellValue, type: 'UploadCertificate' },
    });
  }
  edit_managedDates(e: any) {
    e.stopPropagation();
    this.route.navigate(['master/audit/post-audit/upload-docs/create-upload'], {
      queryParams: { lead_id: this.cellValue, type: 'updateUploadCertificate' },
    });
  }
  documentUpload(e: any) {
    e.stopPropagation();
    this.route.navigate(
      ['master/audit/post-audit/upload-docs-list/verify-dqs_data'],
      { queryParams: { lead_id: this.cellValue, type: 'VerifyDQSData' } }
    );
  }
  edit_documentUpload(e: any) {
    e.stopPropagation();
    this.route.navigate(
      ['master/audit/post-audit/upload-docs-list/verify-dqs_data'],
      { queryParams: { lead_id: this.cellValue, type: 'updateVerifyDQSData' } }
    );
  }
  perfomaInvoice(e: any) {
    e.stopPropagation();
    this.route.navigate(
      ['receive-response'],
      { queryParams: { lead_id: this.interCompanyId } }
    );
  }
  responseSentFunc(e: any) {
    e.stopPropagation();
    this.route.navigate(
      ['response-confirmation'],
      { queryParams: { lead_id: this.interCompanyId } }
    );
  }

  edit(e: any) {
    e.stopPropagation();
    this.route.navigate(['master/audit/post-audit/l1-review/l1-reviewer'], {
      queryParams: { audit_id: this.interCompanyId },
    });
    //   if(this.enableValidate){
    //     this.route.navigate(
    //       ['master/lead/lead-management/create-lead'],
    //       { queryParams: { edit_lead_id: this.cellValue } }
    //     );
    // }
  };

  feaApprovelRequest(e: any) {
    e.stopPropagation();

    if (this.role_id === 22) {
      this.toast.warning("Only FEA Admin can change")

      return
    } else {
      this.route.navigate(['master/lead/lead-opportunity/fea-approvel/fea-approvel-create'], {
        queryParams: { lead_id: this.cellValue },
      });
    }

  }

  feaApprovel(e: any) {
    e.stopPropagation();
    if (this.alreadyFea.status3) {
      this.toast.warning('Already FEA Approval requested')
      return
    }
    e.stopPropagation();
    // this.getLeadbyId(this.cellValue);
    // Swal.fire({
    //   title: 'Are you sure to send for FEA Approval?',
    //   text: "You won't be able to revert this!",
    //   icon: 'question',
    //   showCancelButton: true,
    //   cancelButtonColor: "#f44336",
    //   confirmButtonColor: "#3f51b5",
    //   confirmButtonText: 'Yes',
    //   cancelButtonText: 'No'
    // }).then((result) => {
    //   if (result.isConfirmed) {
    //     this.leadManagementData.status3 = "Sent FEA Approval Pending"
    //     this._leadService.editLead(this.cellValue, this.leadManagementData).subscribe((res:any) =>{
    //       if(res && res.code == 200){
    //         this.toast.success('Successfully send for FEA approval.')
    //       }
    //     })
  
    //   };
    // });
    this.route.navigate(['master/lead/lead-opportunity/fea-approvel/fea-approvel-create',],
    {
      queryParams: {
        lead_id: this.cellValue,
        type: 'feaApproval',
        role: 'order_booking',
      },
    })
  }

  // getLeadbyId(id:any){
  //   this._leadService.getByIdLead(id).subscribe((res:any) =>{
  //     console.log(res.data,"leadDta");
  //     this.leadManagementData = res.data
      
  //   })
  // }

  feaApprover(e:any){
    e.stopPropagation();
    this.route.navigate(['master/lead/lead-opportunity/fea-approvel/fea-approver'], {
      queryParams: { lead_id: this.cellValue },
    });
  }

  cutomerMajor(e: any) {
    e.stopPropagation();
    this.route.navigate(['master/audit/pre-audit/Cutomer-major-reason/major-cutomer-create'], {
      queryParams: { lead_id: this.cellValue },
    });
  }

  // training_feedback(e: any){
  //   e.stopPropagation();
  //   this.route.navigate(['master/audit/pre-audit/Cutomer-major-reason/major-cutomer-create'], {
  //     queryParams: { lead_id: this.cellValue },
  //   });
  // }
  delete(e: any) {


    if (this.jobIdNew) {
      this.jobDescription();
    }
    if (this.resignId) {
      this.deleteResignation();
    }

    //announcement
    if (this.emailIdNew) {
      this.announcementDelete();
    }

    //grivance
    if (this.grivanceId) {
      this.grivanceDelete();
    }

    //complaint
    if (this.complaint_id) {
      this.complaintDelete();
    }

    if (this.helpDeskId) {
      // alert('delete helpdesk');
      this.helpDiskDelete();
    }

    if (this.achivementId) {
      // alert('delete achive');
      this.achivementDelete();
    }

    e.stopPropagation();
  }

  // job description
  jobDescription() {
    const data = {
      jobId: Number(this.cellValue),
    };
    this.recruitService.deleteJob(data).subscribe((res: any) => {

      this.toast.success('Job Details Deleted successfully..');
      window.location.reload();
    });
  }

  deleteResignation() {
    const data = {
      resign_id: Number(this.cellValue),
    };
    this.recruitService
      .deleteResignation(this.resignId, data)
      .subscribe((res: any) => {

        this.toast.success('Resignation Deleted Successfully..');
        window.location.reload();
      });
  }

  //announcement
  announcementDelete() {
    const data2 = {
      email_id: Number(this.cellValue),
    };

    const emilId = data2.email_id;
    this._empMasterService
      .deleteAnnounce(this.emailIdNew, data2)
      .subscribe((res: any) => {

        this.toast.success(' Deleted successfully..');
        window.location.reload();
      });
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

  createAdvancePayment(e: any) {
    e.stopPropagation();
    console.log('advance payment status--', this.advancepay)
    if (this.advancepay == "Advance Payment") {
      this.toast.warning('Advance Payment Already Done');
    }
    else if (this.advancepay == 'Sent FEA Approval Pending') {
      this.toast.warning('Already Send for FEA Approval');
    }
    else {
      this.route.navigate(['master/lead/quotation/advance-payment/make-advance-payment/create-payment'], {
        queryParams: { lead_id: this.cellValue, type: 'createAdvancePayment' },
      });
    }
  }

  createDSD(e: any) {
    e.stopPropagation();
    this.route.navigate(['master/lead/quotation/digital-signed-document/digital-sign-doc'], {
      queryParams: { lead_id: this.cellValue, type: 'createDSD' },
    });
  }

  verifyDSD(e: any) {
    e.stopPropagation();
    this.route.navigate(['master/lead/quotation/verify-signed-document/verify-sign-doc'], {
      queryParams: { lead_id: this.cellValue, type: 'verifyDSD' },
    });
  }
}
