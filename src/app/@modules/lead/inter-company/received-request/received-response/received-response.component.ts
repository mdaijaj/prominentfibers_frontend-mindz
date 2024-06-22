import { ChangeDetectionStrategy, Component, NgZone } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { calendarFormat } from 'moment';
import { ToastrService } from 'ngx-toastr';
import { EmpRegistrationService } from 'src/app/@shared/services/emp-registration.service';
import { LeadService } from 'src/app/@shared/services/lead.service';
import { RecruitService } from 'src/app/@shared/services/recruitment.service';
import { ConfigurationalmasterService } from '../../../../../@shared/services/configurationalmaster.service';

@Component({
  selector: 'app-received-response',
  templateUrl: './received-response.component.html',
  styleUrls: ['./received-response.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReceivedResponseComponent {
  leadForm: FormGroup;
  jobType: any;
  candidateArray: any;
  interviewGetId: any;
  candidateId: any;
  id: any;
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
  auditorData: any;
  data: any;
  
  constructor(
    private configService: ConfigurationalmasterService,
    private fb: FormBuilder,
    private _empRegistration: EmpRegistrationService,
    private leadService: LeadService,
    private toast: ToastrService,
    private route: Router,
    private recruitService: RecruitService,
    private activeroute: ActivatedRoute,
    private ngZone:NgZone
  ) {
    this.leadForm = this.fb.group({
      Leading_DQS_office: new FormControl(null, [Validators.required]),
      Answering_DQS_office: new FormControl(null, [Validators.required]),
      Ref_No: new FormControl(null, [Validators.required]),
      Standards: new FormControl(null, [Validators.required]),
      Auditor: new FormArray([
        new FormGroup({
          name: new FormControl(null, [Validators.required]),
          audit_no: new FormControl(null, [Validators.required]),
          audit_roll: new FormControl(null, [Validators.required]),
        }),
      ]),
      Agreed_confirm_details: new FormControl(null),
      Blocked: new FormControl(null),
      Lead_Shreepad: new FormControl(null),
      Co_auditor: new FormControl(null),
      Req_Date: new FormControl(null),
      Remakrs: new FormControl(null),
      Req_Date_audit: new FormControl(null),
      No_audito_avialble: new FormControl(null),
      No_audito_avialable_with_req: new FormControl(null),
      Auditor_timeframe: new FormControl(null),
      Sign: new FormControl(null),
      Ans_Date: new FormControl(null),
    });
  }

  ngOnInit() {

    this.ngZone.runOutsideAngular(() => {});
    this.ngZone?.run(()=>{})

    this.activeroute.queryParams.subscribe((params) => {
      this.id = params;
      this.lead_id = this.id.lead_id;
      
      this.leadService.getRequestById(this.lead_id).subscribe((res: any) => {
        this.singleLeadData = res.data;
        
        this.patchFormvalue();
      });
    });
    this.getAchievementList();
    this.patchFormvalue();
    this.getCategory();
    this.getAuditor();
    this.mainId = localStorage.getItem('EmpMainId');
    
    if (this.mainId != undefined) {
      this._empRegistration.getByUserId(this.mainId).subscribe((res) => {
        this.mainEmployeeData = res.data;
        
        this.getAchievementList();
        this.patchFormvalue();
      });
    }
  }

  // get f() {
  //   return this.leadForm.controls;
  // }

  fetchSeries(value: String) {
    if (value === '') {
      return (this.searchResult = []);
    }
    this.searchResult = this.allAchievement.filter(function (series: any) {
      
      return series.first_name.toLowerCase().startsWith(value);
    })
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

  candidateClick(e: any) {
    
    this.candidateId = e;
  }

  patchFormvalue() {
    

    this.leadForm.patchValue({
      customer_type: this.singleLeadData?.customer_type,
      site_audit: this.singleLeadData?.multiple_site_audit,
      associated_company: this.singleLeadData?.associated_company,
      segment: this.singleLeadData?.segment,
      br_number: this.singleLeadData?.br_number,
      assignedManager: this.singleLeadData?.assigned_hiring_manager,
      certificate_type: this.singleLeadData?.certificate_type,
      first_name: this.singleLeadData?.first_name,
      last_name: this.singleLeadData?.last_name,
      categories: this.singleLeadData?.categories,
      email: this.singleLeadData?.email,
      emplyoment_type: this.singleLeadData?.emplyoment_type,
      street_address: this.singleLeadData?.street_address,
      job_title: this.singleLeadData?.job_title,
      address2: this.singleLeadData?.address2,
      city: this.singleLeadData?.city,
      state: this.singleLeadData?.state_name,
      country: this.singleLeadData?.country_name,
      postal_code: this.singleLeadData?.postal_code,
      region: this.singleLeadData?.region,
      regional_bussiness_lead: this.singleLeadData?.regional_bussiness_lead,
      global_managing_director: this.singleLeadData?.global_managing_director,
      global_manager_sales: this.singleLeadData?.global_manager_sales,
      website_url: this.singleLeadData?.website_url,
      phone_number: this.singleLeadData?.phone_number,
      mobile_number: this.singleLeadData?.mobile_number,
      dqs_contact_source: this.singleLeadData?.dqs_contact_source,
      contact_owner:
        this.mainEmployeeData?.first_name || this.singleLeadData?.contact_owner,
      lead_created_date: this.singleLeadData?.lead_created_date,
      standard_program_assement: this.singleLeadData?.standard_program_assement,
      remarks: this.singleLeadData?.remarks,
      lead_validated_date: this.singleLeadData?.lead_validated_date,
      lead_validate_remarks: this.singleLeadData?.lead_validate_remarks,
      industry: this.singleLeadData?.industry,
      lead_created_by_name:
        this.mainEmployeeData?.first_name ||
        this.singleLeadData?.lead_created_by_name,
      validated_by:
        this.mainEmployeeData?.first_name || this.singleLeadData?.validated_by,
      customer_category: this.singleLeadData?.customer_category,
      employee_count: this.singleLeadData?.employee_count,
      company_remarks: this.singleLeadData?.company_remarks,
      gst_applicable: this.singleLeadData?.gst_applicable,
      gst_number: this.singleLeadData?.gst_number,
      pan_number: this.singleLeadData?.pan_number,
      tan_number: this.singleLeadData?.tan_number,
    });
  }

  getAuditor() {
    this.configService.getAuditor().subscribe((res: any) => {
      this.auditorData = res.data;
      
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
    let val = this.leadForm.value;
    this.sendResponce();
    const data = {
      rqst_for: this.singleLeadData.rqst_for,
      name_id_of_auditor: this.singleLeadData.name_id_of_auditor,
      fyi_only: this.singleLeadData.fyi_only,
      standard_s: this.singleLeadData.standard_s,
      fluent_lang_skill_req: this.singleLeadData.fluent_lang_skill_req,
      select_rqst_auditor: val.select_rqst_auditor,
      select_rqst_auditor_2: val.select_rqst_auditor_2,
      auditor_type: val.auditor_type,
      ea_code: val.ea_code,
      select_dates: val.select_dates,
      select_date_2: val.select_date_2,
      auditor_type_2: val.auditor_type_2,
      business_sector: this.singleLeadData.business_sector,
      status: 'Response Submitted',
    };
    this.leadService.updateRequest(this.lead_id, data).subscribe((res: any) => {
      
      this.toast.success('Response Submitted Successfully..');
    });
  }

  get CF_1(): any {
    return this.leadForm.controls;
  }

  addRow() {
    <FormArray>this.CF_1.Auditor.push(
      new FormGroup({
        name: new FormControl(null),
        audit_no: new FormControl(null),
        audit_roll: new FormControl(null),
      })
    );
  }

  sendResponce() {
    let val = this.leadForm.value;

    this.data = {
      Leading_DQS_office: val.Leading_DQS_office,
      Answering_DQS_office: val.Answering_DQS_office,
      Ref_No: val.Ref_No,
      Standards: val.Standards,

      Auditor:val.Auditor,
      Agreed_confirm_details: [
        { Blocked: val.Blocked },
        { Lead_Shreepad: val.Lead_Shreepad },
        { Co_auditor: val.Co_auditor },
      ],

      Remakrs: val.Remakrs,
      Req_Date: val.Req_Date,
      Req_Date_audit: val.Req_Date_audit,
      No_audito_avialble: val.No_audito_avialble,
      No_audito_avialable_with_req: val.No_audito_avialable_with_req,
      Auditor_timeframe: val.Auditor_timeframe,
      Sign: val.Sign,
      Ans_Date: val.Ans_Date,
      status: 'Response Submitted',
    };

    

    this.leadService.sendResponce(this.data).subscribe((res: any) => {
      
      this.toast.success(res.message);
      this.route.navigate(['master/lead/inter-company/rise-request'])
    });
  }
}
