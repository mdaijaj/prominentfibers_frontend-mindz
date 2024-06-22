import { AfterViewInit, Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
// import { EmpMasterService } from '../../@shared/services/emp-master.service';
import { EmpRegistrationService } from 'src/app/@shared/services/emp-registration.service';
// import { RecruitService } from '../services/recruitment.service';
// import { LeadService } from '../services/lead.service';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { TaskOrderAppListDialogComponent } from 'src/app/@shared/task-order-app-list-dialog/task-order-app-list-dialog.component';
import { LeadService } from 'src/app/@shared/services/lead.service';
import { EmpMasterService } from 'src/app/@shared/services/emp-master.service';
import { RecruitService } from 'src/app/@shared/services/recruitment.service';
import * as moment from 'moment';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-order-booking-create',
  templateUrl: './order-booking-create.component.html',
  styleUrls: ['./order-booking-create.component.scss'],
})
export class OrderBookingCreateComponent implements OnInit {
  empId: any;
  singleEmpData: any;
  reportingManager: any;
  title: any;
  lastName: any;
  announceId: any;
  announceData: any;
  achiveId: any;
  achievemenList: any;
  grivenceId: any;
  grivenceSingleData: any;
  complaintId: any;
  listComplaint: any;
  helpDiskId: any;
  helpDiskData: any;
  resign_id: any;
  resignData: any;
  backgroundData: any;
  verifyNewId: any;
  interviewId: any;
  interviewData: any;
  previousData: any;
  finalData: any[] = [];
  leadData: any;
  leadId: any;
  cellValue: any;
  route: any;
  status: any;
  onBoardingId: any;
  onBoardingData: any;
  leadForm: FormGroup;
  singleLeadData: any;
  restLeadData: any;
  dataNew: {
    customer_type: any;
    site_audit: any;
    associated_company: any;
    segment: any;
    certificate_type: any;
    first_name: any;
    last_name: any;
    email: any;
    emplyoment_type: any;
    expense_category: any;
    job_title: any;
    street_address: any;
    address2: any;
    city: any;
    state: any;
    country: any;
    lead_created_by_name: any;
    postal_code: any;
    region: any;
    regional_bussiness_lead: any;
    global_managing_director: any;
    global_manager_sales: any;
    website_url: any;
    phone_number: any;
    mobile_number: any;
    assigned_to: any;
    reject_remarks_a: any;
    reject_remarks_b: any;
    dqs_contact_source: any;
    contact_owner: any;
    lead_created_date: string;
    standard_program_assement: any;
    remarks: any;
    lead_validate_stage: any;
    validated_by: any;
    lead_validated_date: string;
    lead_validate_remarks: any;
    lead_assgn_contact_owner: any;
    assigned_by: any;
    stage: any;
    lead_assgn_remark: any;
    industry_sector: any;
    employee_count: any;
    company_remarks: any;
    gst_applicable: any;
    gst_number: any;
    pan_number: any;
    tan_number: any;
    categories: any;
    product_request: any;
    customer_sales_executive: any;
    opportunity_type: any;
    opportunity_ref: any;
    billing_site: any;
    no_of_mandays: any;
    ea_code: any;
    assessment_period: any;
    accredition_logo_details: any;
    add_cert_copy: any;
    opp_verifier_name_level1: any;
    opp_verified_date_level1: string;
    opp_verified_remarks_level1: any;
    opp_verifier_name_level2: any;
    opp_verified_date_level2: string;
    opp_verified_remarks_level2: any;
    quotation_currency: number;
    slab_quote: any;
    logo_cost: any;
    quote_prepared: any;
    quote_prepared_date: string;
    company_logo_req: any;
    company_logo_cost: any;
    agreed_slab_a: any;
    agreed_slab_b: any;
    agreed_logo_cost: any;
    agreed_accredition: any;
    agreed_discount: any;
    fin_approval: any;
    sales_approval: any;
    audit_approval: any;
    status: string;
  };
  showCheck: any;
  conditionCheck: any;
  disabled: boolean = false;
  dis: boolean=false;
  approvalTypes: any;

  constructor(
    private _empService: EmpRegistrationService,
    private leadService: LeadService,
    private recruitService: RecruitService,
    private _empMaster: EmpMasterService,
    private toster: ToastrService,
    public dialog: MatDialogRef<OrderBookingCreateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private router: Router
  ) {
    if (this.data.jobId) {
      this.empId = this.data.jobId;
    }
    this.leadForm = this.fb.group({
      status: new FormControl(null),
    });
  }

  ngOnInit(): void {
    //job-Description
    if (this.data) {
      this.leadId = this.data.lead_id;
      this.leadService.getByIdLead(this.leadId).subscribe((res: any) => {
        console.log(res,"result");
        
        if (res && res.data) {
          this.singleLeadData = res.data;
          console.log(this.singleLeadData, "singh");

          console.log(this.singleLeadData.advance_statuses[0], "singleLeadData");
          const result: any = {};
          const a: any = {
            FEA_approed: this.singleLeadData.advance_statuses[0]["FEA_approed"],
            Advance_Payment: this.singleLeadData.advance_statuses[0]["Advance_Payment"],
            Sales_Request: this.singleLeadData.advance_statuses[0]["Sales_Request"],
            SM_Approved: this.singleLeadData.advance_statuses[0]["SM_Approved"],
          };
          this.conditionCheck = a
          // if (this.conditionCheck.Advance_Payment == null && this.conditionCheck.FEA_approed == null) {
          //   this.disabled = true
          // }
          // const a = this.singleLeadData.advance_statuses[0]
          for (const key in a) {
            if (a[key] === "1") {
              result[key] = true;
            } else {
              result[key] = false;
            }
          }
          this.showCheck = result
          console.log(result, "result");
          if(result.FEA_approed==false && result.Advance_Payment==false){
            this.dis=true

          }

          this.restLeadData = res.data.leadmanagement2s[0];
        }
      });
    }
  }
  getStatus(e: any) {
    this.status = e.value;
    const test = {
      status: this.status,
    };
  }
  approvalType(e:any){
    console.log(e,'codeeee Test');
    this.approvalTypes=e.value
    

  }

  updateLead() {
    console.log(this.conditionCheck);

  
    if(this.approvalTypes=='Work Order Created'){
      if (this.conditionCheck.Advance_Payment == null && this.conditionCheck.FEA_approed == null) {
        this.toster.warning("Without Advance payment or FEA Approval", "Can't Book Order")
        this.disabled = true
      }
      // if ( this.approvalTypes!=='Work Order Created') {
      //   this.toster.warning("Please select Update Status", "Can't Book Order")
      //   this.disabled = true
      // }
      else {
        this.raiseWorkOrder();
      this.reloadCurrentRoute()
      this.toster.success("successfully Order Booked")
    
      }
    }
    else{
      this.toster.warning("Please select Update Status", "Can't Book Order")

    }




    // if( FEA_approed: this.singleLeadData.advance_statuses[0]["FEA_approed"],
    // Advance_Payment){

    // }
    // if (this.leadForm.value.status == null) {
    //   this.toster.error('Please Select status.');
    //   return;
    // }
  }

  reloadCurrentRoute() {
    let currentUrl = this.route.url;
    this.route.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.route.navigate([currentUrl]);
    });
  }
  

  raiseWorkOrder() {
    let val = this.leadForm.value;
    this.dataNew = {
      customer_type: val.customer_type,
      site_audit: val.site_audit || ' ',
      associated_company: val.associated_company,
      segment: val.segment,
      certificate_type: val.certificate_type,
      first_name: val.first_name,
      last_name: val.last_name,
      email: val.email,
      emplyoment_type: val.emplyoment_type,
      expense_category: val.expense_category,
      job_title: val.job_title,
      street_address: val.street_address,
      address2: val.address2,
      city: val.city,
      state: val.state,
      country: val.country,
      lead_created_by_name: val.lead_created_by_name,
      postal_code: val.postal_code,
      region: val.region,
      regional_bussiness_lead: val.regional_bussiness_lead,
      global_managing_director: val.global_managing_director,
      global_manager_sales: val.global_manager_sales,
      website_url: val.website_url,
      phone_number: val.phone_number,
      mobile_number: val.mobile_number,
      assigned_to: val.assigned_to,
      reject_remarks_a: val.reject_remarks_a || ' ',
      reject_remarks_b: val.reject_remarks_b || ' ',
      dqs_contact_source: val.dqs_contact_source,
      contact_owner: val.contact_owner,
      lead_created_date: moment(val.lead_created_date).format('YYYY-MM-DD'),
      standard_program_assement: val.standard_program_assement,
      remarks: val.remarks,
      lead_validate_stage: val.lead_validate_stage,
      validated_by: val.validated_by,
      lead_validated_date: moment(val.lead_validated_date).format('YYYY-MM-DD'),
      lead_validate_remarks: val.lead_validate_remarks,
      lead_assgn_contact_owner: val.lead_assgn_contact_owner,
      assigned_by: val.assigned_by,
      stage: val.stage,
      lead_assgn_remark: val.lead_assgn_remark,
      industry_sector: val.industry_sector,
      employee_count: val.employee_count,
      company_remarks: val.company_remarks,
      gst_applicable: val.gst_applicable,
      gst_number: val.gst_number,
      pan_number: val.pan_number,
      tan_number: val.tan_number,
      categories: val.categories,
      product_request: val.product_request,
      customer_sales_executive: val.customer_sales_executive,
      opportunity_type: val.opportunity_type,
      opportunity_ref: val.opportunity_ref,
      billing_site: val.billing_site,
      no_of_mandays: val.no_of_mandays,
      ea_code: val.ea_code,
      assessment_period: val.assessment_period,
      accredition_logo_details: val.accredition_logo_details,
      add_cert_copy: val.add_cert_copy,
      opp_verifier_name_level1: val.opp_verifier_name_level1,
      opp_verified_date_level1: moment(val.opp_verified_date_level1).format(
        'YYYY-MM-DD'
      ),
      opp_verified_remarks_level1: val.opp_verified_remarks_level1,
      opp_verifier_name_level2: val.opp_verifier_name_level2,
      opp_verified_date_level2: moment(val.opp_verified_date_level2).format(
        'YYYY-MM-DD'
      ),
      opp_verified_remarks_level2: val.opp_verified_remarks_level2,
      quotation_currency: Number(val.quotation_currency),
      slab_quote: val.slab_quote,
      logo_cost: val.logo_cost,
      quote_prepared: val.quote_prepared,
      quote_prepared_date: moment(val.quote_prepared_date).format('YYYY-MM-DD'),
      company_logo_req: val.company_logo_req,
      company_logo_cost: val.company_logo_cost,
      agreed_slab_a: val.agreed_slab_a,
      agreed_slab_b: val.agreed_slab_b,
      agreed_logo_cost: val.agreed_logo_cost,
      agreed_accredition: val.agreed_accredition,
      agreed_discount: val.agreed_discount,
      fin_approval: val.fin_approval,
      sales_approval: val.sales_approval,
      audit_approval: val.audit_approval,
      status: 'Work Order Created',
    };

    if ((this.singleLeadData?.certificate_type == 1) || (this.singleLeadData?.certificate_type == 3)) {
      this.leadService.editLead(this.leadId, this.dataNew).subscribe((res: any) => {
        this.multiWorkOrder();
        this.route.navigate(['master/lead/quotation/approved'], {
        });
      })
    }
    if ((this.singleLeadData?.certificate_type == 2) || (this.singleLeadData?.certificate_type == 4)) {
      this.leadService.editLead(this.leadId, this.dataNew).subscribe((res: any) => {
        this.multiWorkOrderNonCert();
        this.route.navigate(['master/lead/quotation/approved'], {
        });
        this.toster.success(res.message)
        // this.reloadCurrentRoute();
      },(err:any)=>{
        console.log(err.error.message);
        
      })
    }

  }
  multiWorkOrderNonCert() {
    let val = this.leadForm.value;
    console.log(val);

    const dataOne = {
      lead_genration_id: this.singleLeadData?.lead_genration_id,
      br_number: this.singleLeadData?.br_number,
      customer_type: this.singleLeadData?.customer_type,
      site_audit: this.singleLeadData?.site_audit || ' ',
      associated_company: this.singleLeadData?.associated_company,
      segment: this.singleLeadData?.segment,
      certificate_type: this.singleLeadData?.certificate_type,
      first_name: this.singleLeadData?.first_name,
      last_name: this.singleLeadData?.last_name,
      email: this.singleLeadData?.email,
      emplyoment_type: this.singleLeadData?.emplyoment_type,
      expense_category: this.singleLeadData?.expense_category,
      job_title: this.singleLeadData?.job_title,
      street_address: this.singleLeadData?.street_address,
      address2: this.singleLeadData?.address2,
      city: this.singleLeadData?.city,
      state: this.singleLeadData?.state,
      country: this.singleLeadData?.country,
      lead_created_by_name: this.singleLeadData?.lead_created_by_name,
      postal_code: this.singleLeadData?.postal_code,
      region: this.singleLeadData?.region,
      regional_bussiness_lead: this.singleLeadData?.regional_bussiness_lead,
      global_managing_director: this.singleLeadData?.global_managing_director,
      global_manager_sales: this.singleLeadData?.global_manager_sales,
      website_url: this.singleLeadData?.website_url,
      phone_number: this.singleLeadData?.phone_number,
      mobile_number: this.singleLeadData?.mobile_number,
      assigned_to: this.singleLeadData?.assigned_to,
      reject_remarks_a: this.singleLeadData?.reject_remarks_a || ' ',
      reject_remarks_b: this.singleLeadData?.reject_remarks_b || ' ',
      dqs_contact_source: this.singleLeadData?.dqs_contact_source,
      contact_owner: this.singleLeadData?.contact_owner,
      lead_created_date: this.singleLeadData?.lead_created_date,
      standard_program_assement: this.singleLeadData?.standard_program_assement,
      remarks: this.singleLeadData?.remarks,
      lead_validate_stage: this.singleLeadData?.lead_validate_stage,
      validated_by: this.singleLeadData?.validated_by,
      lead_validated_date: this.singleLeadData?.lead_validated_date,
      lead_validate_remarks: this.singleLeadData?.lead_validate_remarks,
      lead_assgn_contact_owner: this.singleLeadData?.lead_assgn_contact_owner,
      assigned_by: this.singleLeadData?.assigned_by,
      stage: this.singleLeadData?.stage,
      lead_assgn_remark: this.singleLeadData?.lead_assgn_remark,
      industry_sector: this.singleLeadData?.industry_sector,
      employee_count: this.singleLeadData?.employee_count,
      company_remarks: this.singleLeadData?.company_remarks,
      gst_applicable: this.singleLeadData?.gst_applicable,
      gst_number: this.singleLeadData?.gst_number,
      pan_number: this.singleLeadData?.pan_number,
      tan_number: this.singleLeadData?.tan_number,
      categories: this.singleLeadData?.categories,
      product_request: this.singleLeadData?.product_request,
      customer_sales_executive: this.singleLeadData?.customer_sales_executive,
      opportunity_type: this.singleLeadData?.opportunity_type,
      opportunity_ref: this.singleLeadData?.opportunity_ref,
      billing_site: this.singleLeadData?.billing_site,
      no_of_mandays: this.singleLeadData?.no_of_mandays,
      ea_code: this.singleLeadData?.ea_code,
      assessment_period: this.singleLeadData?.assessment_period,
      accredition_logo_details: this.singleLeadData?.accredition_logo_details,
      add_cert_copy: this.singleLeadData?.add_cert_copy,
      opp_verifier_name_level1: this.singleLeadData?.opp_verifier_name_level1,
      opp_verified_date_level1: moment(new Date()).format('YYYY-MM-DD'),
      opp_verified_remarks_level1:
        this.singleLeadData?.opp_verified_remarks_level1,
      opp_verifier_name_level2: this.singleLeadData?.opp_verifier_name_level2,
      opp_verified_date_level2: moment(new Date()).format('YYYY-MM-DD'),
      opp_verified_remarks_level2:
        this.singleLeadData?.opp_verified_remarks_level2,
      quotation_currency: this.singleLeadData?.quotation_currency,
      slab_quote: this.singleLeadData?.slab_quote,
      logo_cost: this.singleLeadData?.logo_cost,
      quote_prepared: this.singleLeadData?.quote_prepared,
      quote_prepared_date: this.singleLeadData?.quote_prepared_date,
      company_logo_req: this.singleLeadData?.company_logo_req,
      company_logo_cost: this.singleLeadData?.company_logo_cost,
      agreed_slab_a: this.singleLeadData?.agreed_slab_a,
      agreed_slab_b: this.singleLeadData?.agreed_slab_b,
      agreed_logo_cost: this.singleLeadData?.agreed_logo_cost,
      agreed_accredition: this.singleLeadData?.agreed_accredition,
      agreed_discount: this.singleLeadData?.agreed_discount,
      fin_approval: this.singleLeadData?.fin_approval,
      sales_approval: this.singleLeadData?.sales_approval,
      audit_approval: this.singleLeadData?.audit_approval,
      scope_of_programe: val.scope_of_programe,
      payment_terms: val.payment_terms,
      advance_payment: val.advance_payment,
      status: 'Work Order Created',
    };
    this.leadService
      .multipleWorkOrderCreateNonCert(dataOne)
      .subscribe((res: any) => {
        this.toster.success(res.message)
        // this.reloadCurrentRoute();
       });
  }

  multiWorkOrder() {
    let val = this.leadForm.value;
    console.log(val);

    const dataOne = {
      lead_genration_id: this.singleLeadData?.lead_genration_id,
      br_number: this.singleLeadData?.br_number,
      customer_type: this.singleLeadData?.customer_type,
      site_audit: this.singleLeadData?.site_audit || ' ',
      associated_company: this.singleLeadData?.associated_company,
      segment: this.singleLeadData?.segment,
      certificate_type: this.singleLeadData?.certificate_type,
      first_name: this.singleLeadData?.first_name,
      last_name: this.singleLeadData?.last_name,
      email: this.singleLeadData?.email,
      emplyoment_type: this.singleLeadData?.emplyoment_type,
      expense_category: this.singleLeadData?.expense_category,
      job_title: this.singleLeadData?.job_title,
      street_address: this.singleLeadData?.street_address,
      address2: this.singleLeadData?.address2,
      city: this.singleLeadData?.city,
      state: this.singleLeadData?.state,
      country: this.singleLeadData?.country,
      lead_created_by_name: this.singleLeadData?.lead_created_by_name,
      postal_code: this.singleLeadData?.postal_code,
      region: this.singleLeadData?.region,
      regional_bussiness_lead: this.singleLeadData?.regional_bussiness_lead,
      global_managing_director: this.singleLeadData?.global_managing_director,
      global_manager_sales: this.singleLeadData?.global_manager_sales,
      website_url: this.singleLeadData?.website_url,
      phone_number: this.singleLeadData?.phone_number,
      mobile_number: this.singleLeadData?.mobile_number,
      assigned_to: this.singleLeadData?.assigned_to,
      reject_remarks_a: this.singleLeadData?.reject_remarks_a || ' ',
      reject_remarks_b: this.singleLeadData?.reject_remarks_b || ' ',
      dqs_contact_source: this.singleLeadData?.dqs_contact_source,
      contact_owner: this.singleLeadData?.contact_owner,
      lead_created_date: this.singleLeadData?.lead_created_date,
      standard_program_assement: this.singleLeadData?.standard_program_assement,
      remarks: this.singleLeadData?.remarks,
      lead_validate_stage: this.singleLeadData?.lead_validate_stage,
      validated_by: this.singleLeadData?.validated_by,
      lead_validated_date: this.singleLeadData?.lead_validated_date,
      lead_validate_remarks: this.singleLeadData?.lead_validate_remarks,
      lead_assgn_contact_owner: this.singleLeadData?.lead_assgn_contact_owner,
      assigned_by: this.singleLeadData?.assigned_by,
      stage: this.singleLeadData?.stage,
      lead_assgn_remark: this.singleLeadData?.lead_assgn_remark,
      industry_sector: this.singleLeadData?.industry_sector,
      employee_count: this.singleLeadData?.employee_count,
      company_remarks: this.singleLeadData?.company_remarks,
      gst_applicable: this.singleLeadData?.gst_applicable,
      gst_number: this.singleLeadData?.gst_number,
      pan_number: this.singleLeadData?.pan_number,
      tan_number: this.singleLeadData?.tan_number,
      categories: this.singleLeadData?.categories,
      product_request: this.singleLeadData?.product_request,
      customer_sales_executive: this.singleLeadData?.customer_sales_executive,
      opportunity_type: this.singleLeadData?.opportunity_type,
      opportunity_ref: this.singleLeadData?.opportunity_ref,
      billing_site: this.singleLeadData?.billing_site,
      no_of_mandays: this.singleLeadData?.no_of_mandays,
      ea_code: this.singleLeadData?.ea_code,
      assessment_period: this.singleLeadData?.assessment_period,
      accredition_logo_details: this.singleLeadData?.accredition_logo_details,
      add_cert_copy: this.singleLeadData?.add_cert_copy,
      opp_verifier_name_level1: this.singleLeadData?.opp_verifier_name_level1,
      opp_verified_date_level1: moment(new Date()).format('YYYY-MM-DD'),
      opp_verified_remarks_level1:
        this.singleLeadData?.opp_verified_remarks_level1,
      opp_verifier_name_level2: this.singleLeadData?.opp_verifier_name_level2,
      opp_verified_date_level2: moment(new Date()).format('YYYY-MM-DD'),
      opp_verified_remarks_level2:
        this.singleLeadData?.opp_verified_remarks_level2,
      quotation_currency: this.singleLeadData?.quotation_currency,
      slab_quote: this.singleLeadData?.slab_quote,
      logo_cost: this.singleLeadData?.logo_cost,
      quote_prepared: this.singleLeadData?.quote_prepared,
      quote_prepared_date: this.singleLeadData?.quote_prepared_date,
      company_logo_req: this.singleLeadData?.company_logo_req,
      company_logo_cost: this.singleLeadData?.company_logo_cost,
      agreed_slab_a: this.singleLeadData?.agreed_slab_a,
      agreed_slab_b: this.singleLeadData?.agreed_slab_b,
      agreed_logo_cost: this.singleLeadData?.agreed_logo_cost,
      agreed_accredition: this.singleLeadData?.agreed_accredition,
      agreed_discount: this.singleLeadData?.agreed_discount,
      fin_approval: this.singleLeadData?.fin_approval,
      sales_approval: this.singleLeadData?.sales_approval,
      audit_approval: this.singleLeadData?.audit_approval,
      scope_of_programe: val.scope_of_programe,
      payment_terms: val.payment_terms,
      advance_payment: val.advance_payment,
      status: 'Work Order Created',
    };
    this.leadService
      .multipleWorkOrderCreate(dataOne)
      .subscribe((res: any) => { });
  }

  statusGet() {
    const test = {
      status: this.status,
    };

    this.recruitService
      .statusResignation(this.resign_id, test)
      .subscribe((res: any) => {
        this.toster.success(`Resignation ${this.status}`);
      });
    window.location.reload();
  }

  createAdvancePayment(e: any) {
    if (this.showCheck.Advance_Payment || this.showCheck.FEA_approed) {
      e.stopPropagation();
      this.showCheck.FEA_approed ?  this.toster.warning("FEA Approval already done.") : this.toster.warning("Advance Payment already done.")
    }
    else {
      e.stopPropagation();
      this.router.navigate(
        [
          'master/lead/quotation/advance-payment/make-advance-payment/create-payment',
        ],
        {
          queryParams: {
            lead_id: this.leadId,
            type: 'createAdvancePayment',
            role: 'order_booking',
          },
        }
      );
      this.dialog.close();
    }

  }

  navigateToFeaApproval(e: any) {
    if (this.showCheck.FEA_approed || this.showCheck.Advance_Payment) {
      e.stopPropagation();
      this.showCheck.FEA_approed ?  this.toster.warning("FEA Approval already done.") : this.toster.warning("Advance Payment already done.")
    }else if( this.singleLeadData.status3 == "Sent FEA Approval Pending"){
      this.toster.warning('Already FEA Approval requested')
      return
    }
    else {
      // e.stopPropagation();
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
      //     this.singleLeadData.status3 = "Sent FEA Approval Pending"
      //     this.leadService.editLead(this.leadId, this.singleLeadData).subscribe((res:any) =>{
      //       if(res && res.code == 200){
      //         this.toster.success('Successfully send for FEA approval.')
      //       }
      //     })
    
      //   };
      // });
      this.router.navigate(['master/lead/lead-opportunity/fea-approvel/fea-approvel-create',],
        {
          queryParams: {
            lead_id: this.leadId,
            type: 'feaApproval',
            role: 'order_booking',
          },
        }
);
      this.dialog.close();
    }
  }
}
