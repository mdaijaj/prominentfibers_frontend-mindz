import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { calendarFormat } from 'moment';
import { ToastrService } from 'ngx-toastr';
import { EmpRegistrationService } from 'src/app/@shared/services/emp-registration.service';
import { LeadService } from 'src/app/@shared/services/lead.service';
import { RecruitService } from 'src/app/@shared/services/recruitment.service';
import { ConfigurationalmasterService } from '../../../../../@shared/services/configurationalmaster.service'

@Component({
  selector: 'app-rise-request-create',
  templateUrl: './rise-request-create.component.html',
  styleUrls: ['./rise-request-create.component.scss']
})
export class RiseRequestCreateComponent {
  leadForm: FormGroup;
  jobType: any;
  candidateArray: any;
  interviewGetId:any;
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
  constructor(
    private configService: ConfigurationalmasterService,
    private fb: FormBuilder,  private _empRegistration: EmpRegistrationService,
    private leadService: LeadService, private toast: ToastrService,
    private route: Router, private recruitService: RecruitService, private activeroute: ActivatedRoute) {
      this.leadForm = this.fb.group({
        expiry_date_of_certi: new FormControl(null),
        parent_ref: new FormControl(null),
        due_date: new FormControl(null),
        manifacturing_site: new FormControl(null),
        status: new FormControl(null),
        current_certi: new FormControl(null),
        planned_dates: new FormControl(null),
        name_legal_status: new FormControl(null),
        ref_no_s: new FormControl(null),
        standard_s: new FormControl(null),
        scope: new FormControl(null),
        accreditation: new FormControl(null),
        dqs_contact_person: new FormControl(null),
        type_assessment: new FormControl(null),
        phone: new FormControl(null),
        Frequency_audit_cycle: new FormControl(null),
        remote_location: new FormControl(null),
        email: new FormControl(null,[Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]),
        part_sampling_procedure: new FormControl(null),
        corporate_scheme: new FormControl(null),
        design_function: new FormControl(null),
        detailed_calculation: new FormControl(null),
        audit_language: new FormControl(null),
        no_audit_days: new FormControl(null),
        certi_req: new FormControl(null),
        local_contact_person: new FormControl(null),
        site_s_list_add: new FormControl(null),
        headcounts: new FormControl(null),
      })
  }

  ngOnInit() {
    this.activeroute.queryParams.subscribe(params => {
      this.id = params;
      this.lead_id = this.id.lead_id;
      
      this.leadService.getByIdLead(this.lead_id).subscribe((res:any) => {
        this.singleLeadData = res.data;
        
        this.patchFormvalue();
      })
    });
    this.getAchievementList();
      this.patchFormvalue();
      this.getCategory();
    this.mainId = localStorage.getItem("EmpMainId");
      
      if (this.mainId != undefined) {
        this._empRegistration.getByUserId(this.mainId).subscribe((res) => {
          this.mainEmployeeData = res.data;
          
          this.getAchievementList();
          this.patchFormvalue();
        })
      }
  }

  get f() {
    return this.leadForm.controls;
  }

  fetchSeries(value: String) {
    if (value === '') {
      return this.searchResult = []
    }
    this.searchResult = this.allAchievement.filter(function (series:any) {
      
      return series.first_name.toLowerCase().startsWith(value)
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
      
    })
  }

  
  candidateClick(e:any){
    
    this.candidateId = e;
    this.recruitService.interViewGetIdBy(e).subscribe((res:any)=>{
      this.interviewGetId=res.data;
      
      this.patchFormvalue();
    })
  }

  patchFormvalue() { 
    
    
    this.leadForm.patchValue({
      customer_type:this.singleLeadData?.customer_type,
      site_audit: this.singleLeadData?.multiple_site_audit,
      associated_company: this.singleLeadData?.associated_company,
      segment:this.singleLeadData?.segment,
      br_number: this.singleLeadData?.br_number,
      assignedManager:this.singleLeadData?.assigned_hiring_manager,
      certificate_type:this.singleLeadData?.certificate_type,
      first_name:this.singleLeadData?.first_name,
      last_name:this.singleLeadData?.last_name,
      categories:this.singleLeadData?.categories,
      email: this.singleLeadData?.email,
      emplyoment_type: this.singleLeadData?.emplyoment_type,
      street_address: this.singleLeadData?.street_address,
      job_title: this.singleLeadData?.job_title,
      address2: this.singleLeadData?.address2,
      city:  this.singleLeadData?.city,
      state:  this.singleLeadData?.state_name,
      country:  this.singleLeadData?.country_name,
      postal_code:this.singleLeadData?.postal_code,
      region: this.singleLeadData?.region,
      regional_bussiness_lead:this.singleLeadData?.regional_bussiness_lead,
      global_managing_director:this.singleLeadData?.global_managing_director,
      global_manager_sales:this.singleLeadData?.global_manager_sales,
      website_url:this.singleLeadData?.website_url,
      phone_number:this.singleLeadData?.phone_number,
      mobile_number: this.singleLeadData?.mobile_number,
      dqs_contact_source: this.singleLeadData?.dqs_contact_source,
      contact_owner:  this.mainEmployeeData?.first_name || this.singleLeadData?.contact_owner,
      lead_created_date: this.singleLeadData?.lead_created_date,
      standard_program_assement:  this.singleLeadData?.standard_program_assement,
      remarks:  this.singleLeadData?.remarks,
      lead_validated_date: this.singleLeadData?.lead_validated_date,
      lead_validate_remarks: this.singleLeadData?.lead_validate_remarks,
      industry:  this.singleLeadData?.industry,
      lead_created_by_name:  this.mainEmployeeData?.first_name || this.singleLeadData?.lead_created_by_name,
      validated_by:  this.mainEmployeeData?.first_name || this.singleLeadData?.validated_by,
      customer_category: this.singleLeadData?.customer_category,
      employee_count: this.singleLeadData?.employee_count,
      company_remarks: this.singleLeadData?.company_remarks,
      gst_applicable: this.singleLeadData?.gst_applicable,
      gst_number: this.singleLeadData?.gst_number,
      pan_number: this.singleLeadData?.pan_number,
      tan_number: this.singleLeadData?.tan_number
    })
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
    
    let val: any = this.leadForm.value;
    let data = {
      email1: val.email,
      expiry_date_of_certi: val.expiry_date_of_certi,
      parent_ref: Number(val.parent_ref),
      due_date: val.due_date,
      manifacturing_site: val.manifacturing_site,
      current_certi: Number(val.current_certi),
      planned_dates: val.planned_dates,
      name_legal_status: val.name_legal_status,
      ref_no_s: Number(val.ref_no_s),
      standard_s: val.standard_s,
      scope: val.scope,
      accreditation: val.accreditation,
      dqs_contact_person: val.dqs_contact_person,
      type_assessment: val.type_assessment,
      phone1: Number(val.phone),
      Frequency_audit_cycle: val.Frequency_audit_cycle,
      remote_location: val.remote_location,
      part_sampling_procedure: val.part_sampling_procedure,
      corporate_scheme: val.corporate_scheme,
      design_function: val.design_function,
      detailed_calculation: val.detailed_calculation,
      audit_language: val.audit_language,
      no_audit_days: val.no_audit_days,
      certi_req: Number(val.certi_req),
      local_contact_person: val.local_contact_person,
      site_s_list_add: val.site_s_list_add,
      headcounts: val.headcounts,
      status: "Request Raised",
    }
    
    this.leadService.addRequest(data).subscribe((res: any) => {
      if(res){
        this.route.navigate(['master/lead/inter-company/receive-request']);
        this.toast.success("Form Submitted Successfully..");
      }
    })
    // this.http.post('https://dqsdevapi.elitetraveltech.in/api/v1/createinterCompany', data); 
  }
 
}
