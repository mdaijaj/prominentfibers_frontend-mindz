import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { calendarFormat } from 'moment';
import { ToastrService } from 'ngx-toastr';
import { EmpRegistrationService } from 'src/app/@shared/services/emp-registration.service';
import { LeadService } from 'src/app/@shared/services/lead.service';
import { RecruitService } from 'src/app/@shared/services/recruitment.service';
import { ConfigurationalmasterService } from '../../../../../@shared/services/configurationalmaster.service';
import { UploadmangeCsvPopupComponent } from '../upload-csv-popup/upload-csv-popup.component';

@Component({
  selector: 'app-create-dates',
  templateUrl: './create-dates.component.html',
  styleUrls: ['./create-dates.component.scss'],
})
export class DatesCreateComponent {
  leadForm: FormGroup;
  jobType: any;
  candidateArray: any;
  interviewGetId: any;
  candidateId: any;
  id: any;
  cellValue: any;

  categoryList: any;
  interview_id: any;
  clicked: boolean = false;
  cutomerType: boolean = false;
  sitAudit: boolean = false;
  lead_id: any;
  singleLeadData: any;
  val: any;
  public searchResult: any;
  mainId: string | null;
  mainEmployeeData: any;
  allAchievement: any;
  submitted: boolean;
  csvMangeData: any;
  now = new Date();
  year = this.now.getFullYear();
  month = this.now.getMonth();
  // day = this.now.getDay();
  date = this.now.getDate();
  maxDate = moment({ year: this.year + 100, month: this.month, date: this.date }).format('YYYY-MM-DD');
  minDate = moment({ year: this.year - 0, month: this.month, date: this.date }).format('YYYY-MM-DD');
  stateList: any;
  cityList: any;
  pinCodeList: any;
  pinCodeTrue: boolean = true;
  countryList: any;
  leadUpdate: any;
  constructor(
    private configService: ConfigurationalmasterService,
    private fb: FormBuilder,
    private _empRegistration: EmpRegistrationService,
    private leadService: LeadService,
    private toast: ToastrService,
    private route: Router,
    private recruitService: RecruitService,
    private activeroute: ActivatedRoute,
    public dialog: MatDialog
  ) {
    this.leadForm = this.fb.group({
      // customer_type: new FormControl(null),
      // site_audit: new FormControl(null),
      associated_company: new FormControl(null, Validators.required),
      br_number: new FormControl(null, Validators.required),
      first_name: new FormControl(null, Validators.required),
      city: new FormControl(null, Validators.required),
      state: new FormControl(null, Validators.required),
      country: new FormControl(null, Validators.required),
      postal_code: new FormControl(null, Validators.required),
      assessment_period: new FormControl(null, Validators.required),
      ea_code: new FormControl(null, Validators.required),
      accredition_logo_details: new FormControl(null, Validators.required),
      add_cert_copy: new FormControl(null, Validators.required),
      lead_created_date: new FormControl(null, Validators.required),
      lead_created_date2: new FormControl(null, Validators.required),
      report_sent_date: new FormControl(null, Validators.required),
      ara_closure_date: new FormControl(null, Validators.required),
      ara_report_received_date: new FormControl(null, Validators.required),
      ara_details_sent_date: new FormControl(null, Validators.required),
      report_sent_review_date: new FormControl(null, Validators.required),
      review_level2_date: new FormControl(null, Validators.required),
      reviewer_checklist_date: new FormControl(null, Validators.required),
      certificate_sent_approval_date: new FormControl(
        null,
        Validators.required
      ),
      certicate_approved_on_date: new FormControl(null, Validators.required),
      sent_for_finace_date: new FormControl(null, Validators.required),
      regional_head_apporvalDate: new FormControl(null, Validators.required),
      finace_approval_date: new FormControl(null, Validators.required),
      certificate_dispatch_date: new FormControl(null, Validators.required),
      certificate_expiry_date: new FormControl(null, Validators.required),
      report_sent_to_customer_date: new FormControl(null, Validators.required),
      certificate_status_date: new FormControl(null, Validators.required),
      certificate_status: new FormControl(null, Validators.required),
      certificate_type: new FormControl(null, Validators.required),
      certificate_type2: new FormControl(null, Validators.required),
      are_due_date: new FormControl(null, Validators.required),
      // ara_closure_date:new FormControl(null),
      certification_type_date: new FormControl(null),
      current_status_date: new FormControl(null),
      // new_location_site: new FormControl(null),
      // segment: new FormControl(null),
      // categories: new FormControl(null),
      current_status: new FormControl(null, Validators.required),
      // last_name: new FormControl(null),
      // email: new FormControl(null),
      // emplyoment_type: new FormControl(null),
      // job_title: new FormControl(null),
      street_address: new FormControl(null, Validators.required),
      address2: new FormControl(null, Validators.required),
    });
  }

  ngOnInit() {
    this.activeroute.queryParams.subscribe((params) => {
      this.id = params;
      this.lead_id = this.id.lead_id;
      this.leadUpdate = this.id.type;  
      
      this.leadService.getByIdLead(this.lead_id).subscribe((res: any) => {
        this.singleLeadData = res.data;
        
        this.patchFormvalue();
      });
    });
    this.getAchievementList();
    this.patchFormvalue();
    this.getCategory();
    this.getCountry();
    this.mainId = localStorage.getItem('EmpMainId');
    
    if (this.mainId != undefined) {
      this._empRegistration.getByUserId(this.mainId).subscribe((res) => {
        this.mainEmployeeData = res.data;
        
        this.getAchievementList();
        this.patchFormvalue();
      });
    }
    // this.getByCsvmange();
  }
  getCountry() {
    this.configService.getCountry().subscribe((res: any) => {
      this.countryList = res.data;
      
    });
  }

  get f() {
    return this.leadForm.controls;
  }

  fetchSeries(value: String) {
    if (value === '') {
      return (this.searchResult = []);
    }
    this.searchResult = this.allAchievement.filter(function (series: any) {
      
      return series.first_name.toLowerCase().startsWith(value);
    });
  }

  getAchievementList() {
    this.recruitService.getAllAchivement().subscribe(
      (res: any) => {
        
        this.allAchievement = res.data;
      },
      (err) => {
        
      }
    );
  }

  getCategory() {
    this.configService.listCategory().subscribe((res: any) => {
      this.categoryList = res.data;
      
    });
  }

  // getByCsvmange(){
  //   this.leadService.getByIdCsvMange(this.lead_id).subscribe((res:any)=>{
  //     this.csvMangeData=res;
  //     

  //   })
  // }

  candidateClick(e: any) {
    
    this.candidateId = e;
    this.recruitService.interViewGetIdBy(e).subscribe((res: any) => {
      this.interviewGetId = res.data;
      
      this.patchFormvalue();
    });
  }
  getCountryID(e: any) {
    
    this.leadService.getStateByID(e.value).subscribe((res:any) => {
      
      this.stateList = res.data;
    });
  }

getStateID(e: any) {
    
    this.leadService.getCityByID(e.value).subscribe((res:any) => {
      
      this.cityList = res.data;
    });
  }

  getPinCode(e: any) {
    
    this.leadService.getPinCodeNew(e.value).subscribe((res:any) => {
      this.pinCodeList = res.data;
      
      if (this.pinCodeList.length === 0) {
        this.pinCodeTrue = true;
      } else {
        this.pinCodeTrue = false;
      }
    });
  }


  patchFormvalue() {
    
    if (this.singleLeadData?.country != 'undefined || null') {
      this.leadService.getStateByID(this.singleLeadData?.country).subscribe((res:any) => {
        
        this.stateList = res.data;
      });
    }
    if (this.singleLeadData?.state != 'undefined || null') {
      this.leadService.getCityByID(this.singleLeadData?.state).subscribe((res:any) => {
        
        this.cityList = res.data;
      });
    }
    if (this.singleLeadData?.city != 'undefined || null') {
      this.leadService.getPinCodeNew(this.singleLeadData?.city).subscribe((res:any) => {
        this.pinCodeList = res.data;
        
        // if (this.pinCodeList.length === 0) {
        //   this.pinCodeTrue = true;
        // } else {
        //   this.pinCodeTrue = false;
        // }
      });
    }
    this.leadForm.patchValue({
      associated_company: this.singleLeadData?.associated_company,
      first_name: this.singleLeadData?.first_name,
      br_number: this.singleLeadData?.br_number,
      street_address: this.singleLeadData?.street_address,
      address2: this.singleLeadData?.address2,
      city: this.singleLeadData?.city,
      state: this.singleLeadData?.state,
      country: this.singleLeadData?.country,
      postal_code: this.singleLeadData?.postal_code,
      product_request: this.singleLeadData?.product_request,
      opportunity_type: this.singleLeadData?.opportunity_type,
      assessment_period: this.singleLeadData?.assessment_period,
      ea_code: this.singleLeadData?.ea_code,
      agreed_logo_cost: this.singleLeadData?.agreed_logo_cost,
      auditor_name: this.singleLeadData?.auditor_name,
      remarks: this.singleLeadData?.remarks,
      status: this.singleLeadData?.status,
      accredition_logo_details: this.singleLeadData?.accredition_logo_details,
      add_cert_copy: this.singleLeadData?.add_cert_copy,
      // auditorType: this.singleLeadData.auditorType,
      // auditorType2: this.singleLeadData.auditorType2,
      // auditorType3: this.singleLeadData.auditorType3,
      // auditorName: this.singleLeadData.auditorName,
      // auditorName2: this.singleLeadData.auditorName2,
      // auditorName3: this.singleLeadData.auditorName3,
      // CGCMNeeded: this.singleLeadData.CGCMNeeded,
      // eaCode: this.singleLeadData.eaCode,
      // eaCode2: this.singleLeadData.eaCode2,
      lead_created_date: this.singleLeadData?.training_end_date,
      lead_created_date2: this.singleLeadData?.lead_created_date2,
      report_sent_date: this.singleLeadData?.report_sent_date,
      are_due_date: this.singleLeadData?.are_due_date,
      ara_closure_date: this.singleLeadData?.ara_closure_date,
      ara_report_received_date: this.singleLeadData?.ara_report_received_date,
      ara_details_sent_date: this.singleLeadData?.ara_details_sent_date,
      report_sent_review_date: this.singleLeadData?.report_sent_review_date,
      review_level2_date: this.singleLeadData?.review_level2_date,
      reviewer_checklist_date: this.singleLeadData?.reviewer_checklist_date,
      certificate_sent_approval_date:this.singleLeadData?.certificate_sent_approval_date,
      certicate_approved_on_date:this.singleLeadData?.certicate_approved_on_date,
      sent_for_finace_date: this.singleLeadData?.sent_for_finace_date,
      regional_head_apporvalDate: this.singleLeadData?.regional_head_apporvalDate,
      finace_approval_date: this.singleLeadData?.finace_approval_date,
      certificate_dispatch_date: this.singleLeadData?.certificate_dispatch_date,
      report_sent_to_customer_date:this.singleLeadData?.report_sent_to_customer_date,
      certificate_status_date: this.singleLeadData?.certificate_status_date,
      certification_type_date: this.singleLeadData?.certification_type_date,
      current_status_date: this.singleLeadData?.current_status_date,
      certificate_expiry_date: this.singleLeadData?.certificate_expiry_date,

    });
  }

  customerType() {
    this.cutomerType = true;
  }
  siteAudit() {
    this.sitAudit = true;
  }

  siteAuditNew() {
    this.sitAudit = false;
  }

  customerTypeNew() {
    this.cutomerType = false;
  }

  submitForm() {
    
    // this.submitted = false;

    // if (val.invalid) {
    //   this.toast.error('Required fields should not be empty', 'Fields Empty');
    //   return;
    // }
    // if (this.leadForm.invalid) {
    // this.toast.error('Required fields should not be empty.', 'Error Occurred!');
    //   return;
    // }

    let val = this.leadForm.value;
    

    const data = {
      customer_type: val.customer_type,
      multiple_site_audit: val.site_audit || ' ',
      associated_company: val.associated_company,
      segment: val.segment,
      certificate_type: val.certificate_type,
      first_name: val.first_name,
      last_name: val.last_name,
      email: val.email,
      emplyoment_type: val.emplyoment_type,
      lead_created_by_name: val.lead_created_by_name || ' ',
      job_title: val.job_title,
      street_address: val.street_address,
      address2: val.address2,
      city: val.city,
      state: val.state,
      country: val.country,
      postal_code: val.postal_code,
      region: val.region,
      regional_bussiness_lead: val.regional_bussiness_lead,
      global_managing_director: val.global_managing_director,
      global_manager_sales: val.global_manager_sales,
      website_url: val.website_url,
      phone_number: val.phone_number,
      mobile_number: val.mobile_number,
      dqs_contact_source: val.dqs_contact_source,
      contact_owner: val.contact_owner,
      lead_created_date: moment(val.lead_created_date).format('YYYY-MM-DD'),
      lead_created_date2: moment(val.lead_created_date2).format('YYYY-MM-DD'),
      report_sent_date: moment(val.report_sent_date).format('YYYY-MM-DD'),
      are_due_date: moment(val.are_due_date).format('YYYY-MM-DD'),
      ara_closure_date: moment(val.ara_closure_date).format('YYYY-MM-DD'),
      ara_report_received_date: moment(val.ara_report_received_date).format(
        'YYYY-MM-DD'
      ),
      ara_details_sent_date: moment(val.ara_details_sent_date).format(
        'YYYY-MM-DD'
      ),
      report_sent_review_date: moment(val.report_sent_review_date).format(
        'YYYY-MM-DD'
      ),
      review_level2_date: moment(val.review_level2_date).format('YYYY-MM-DD'),
      reviewer_checklist_date: moment(val.reviewer_checklist_date).format(
        'YYYY-MM-DD'
      ),
      certificate_sent_approval_date: moment(
        val.certificate_sent_approval_date
      ).format('YYYY-MM-DD'),
      certicate_approved_on_date: moment(val.certicate_approved_on_date).format(
        'YYYY-MM-DD'
      ),
      sent_for_finace_date: moment(val.sent_for_finace_date).format(
        'YYYY-MM-DD'
      ),
      regional_head_apporvalDate: moment(val.regional_head_apporvalDate).format( 'YYYY-MM-DD'
      ),
      finace_approval_date: moment(val.finace_approval_date).format('YYYY-MM-DD'
      ),
      certificate_dispatch_date: moment(val.certificate_dispatch_date).format('YYYY-MM-DD'
      ),
      certificate_expiry_date: moment(val.certificate_expiry_date).format( 'YYYY-MM-DD'),
      report_sent_to_customer_date: moment(
        val.report_sent_to_customer_date
      ).format('YYYY-MM-DD'),
      // certificate_status_date:val.certificate_status_date,
      // certification_type_date: moment(val.certification_type_date).format(
      //   'YYYY-MM-DD'
      // ),

      // current_status_date: moment(val.current_status_date).format('YYYY-MM-DD'),
      certificate_status: val.certificate_status,
      certificate_type2: val.certificate_type2,
      current_status: val.current_status,
      standard_program_assement: val.standard_program_assement,
      remarks: val.remarks,
      lead_validate_stage: val.lead_validate_stage,
      validated_by: val.validated_by,
      lead_validated_date: moment(val.lead_validated_date).format('YYYY-MM-DD'),
      lead_validate_remarks: val.lead_validate_remarks,
      lead_assgn_contact_owner: val.lead_assgn_contact_owner,
      assigned_by: val.assigned_by,
      // assigned_date: moment(val.assigned_date).format('YYYY-MM-DD'),
      stage: val.stage,
      lead_assgn_remark: val.lead_assgn_remark,
      customer_category: val.customer_category,
      industry_sector: val.industry,
      employee_count: val.employee_count,
      company_remarks: val.company_remarks,
      certificate_status_date:val.certificate_status_date,
       status: 'Dates Managed',
    };
    this.leadService.editLead(this.lead_id, data).subscribe((res: any) => {
      
      this.route.navigate(['master/audit/post-audit/upload-docs'], {
        queryParams: { lead_id: this.lead_id },
      });
      this.toast.success('Lead Updated Successfully..');
    });
  }
  updateForm(){
    // this.submitted = false;
    // if (this.leadForm.invalid) {
      
    //   this.toast.error('Required fields should not be empty.', 'Error Occurred!');
    //   return;
    // }
    const data = this.leadForm.value;
    
    this.leadService.editLead(this.lead_id, data).subscribe((res:any) => {
      
      
      this.toast.success("Updated Assignment Successfully..")
      this.route.navigate(['master/audit/post-audit/manage-dates']);
    })

  }
  openDialog() {
    const dialogRef = this.dialog.open(UploadmangeCsvPopupComponent, {
      width: '30%',
      // maxWidth: '100vw',
      // maxHeight: '60vh',
      // height: '60%',
      // panelClass: 'full-screen-modal',
      data: { id: this.cellValue },
    });
  }
}
