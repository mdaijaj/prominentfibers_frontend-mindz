import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';
import { ConfigurationalmasterService } from '../@shared/services/configurationalmaster.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { EmpRegistrationService } from '../@shared/services/emp-registration.service';
import { LeadService } from '../@shared/services/lead.service';
import { RecruitService } from '../@shared/services/recruitment.service';

@Component({
  selector: 'app-branching-form',
  templateUrl: './branching-form.component.html',
  styleUrls: ['./branching-form.component.scss']
})
export class BranchingFormComponent {
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
  tentativeTrue: boolean = false;
  confirmTrue: boolean = false;
  fileDetails: any;
  errorMsg: string;
  lead_data: any;
  constructor(
    private configService: ConfigurationalmasterService,
    private fb: FormBuilder,
    private _empRegistration: EmpRegistrationService,
    private leadService: LeadService,
    private toast: ToastrService,
    private route: Router,
    private recruitService: RecruitService,
    private activeroute: ActivatedRoute
  ) {
    this.leadForm = this.fb.group({
      rqst_for: new FormControl(null),
      name_id_of_auditor: new FormControl(null),
      fyi_only: new FormControl(null),
      standard_s: new FormControl(null), 
      fluent_lang_skill_req: new FormControl(null), 
      branch_office_status: new FormControl(null), 
      select_rqst_auditor: new FormControl(null),
      select_rqst_auditor_2: new FormControl(null),
      auditor_type: new FormControl(null),
      ea_code: new FormControl(null),
      select_dates: new FormControl(null),
      select_date_2: new FormControl(null),
      status: new FormControl('Response Confirmed', [Validators.required]),
      auditor_type_2: new FormControl(null),
      tentative_remarks: new FormControl(null),
      upload_po_file: new FormControl(null)
    });
  }

  ngOnInit() {
    this.activeroute.queryParams.subscribe((params) => {
      this.id = params;
      this.lead_id = this.id.lead_id;
      
      this.leadService.getRequestById(this.lead_id).subscribe((res: any) => {
        this.singleLeadData = res.data;
        this.patchFormvalue();
        this.getlead();
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
  trueStatus() {
    this.tentativeTrue = true;
    this.confirmTrue = false;
  }
  confirmStatus() {
    this.confirmTrue = true;
    this.tentativeTrue = false;
  }
  fileInputChange(fileInput: File[] | any) {
    this.errorMsg = '';
    
    if (fileInput.target.files && fileInput.target.files[0]) {
      const file = fileInput.target.files[0];
      
      const reader = new FileReader();
      const fileSizeInMb = file.size / 1024 ** 2;
      if (fileSizeInMb > 30) {
        this.errorMsg = 'File size should be less than 30MB';
        return;
      }
      reader.onload = (e: any) => {
        this.fileDetails.filePath = reader.result;
      };
      reader.readAsDataURL(file);
      this.fileDetails.file = file;
    } else {
      this.fileDetails = { filePath: '', file: null };
    }
  }

  getAuditor() {
    this.configService.getAuditor().subscribe((res:any) => {
      this.auditorData = res.data;
      console.log(this.auditorData);
      
      
    })

  }
  getlead(){
    this.leadService.leadData_br_number(this.singleLeadData.inter_company_br_number).subscribe((res:any)=>{
      this.lead_data =res.data;
      this.leadForm.patchValue({
        Req_Date:this.singleLeadData.due_date,
        ea_code:this.lead_data.ea_code
      })
    })
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

  candidateClick(e: any) {
    
    this.candidateId = e;
    this.recruitService.interViewGetIdBy(e).subscribe((res: any) => {
      this.interviewGetId = res.data;
      
      this.patchFormvalue();
    });
  }

  patchFormvalue() {
    

    this.leadForm.patchValue({
      select_rqst_auditor: this.singleLeadData?.select_rqst_auditor,
      select_rqst_auditor_2: this.singleLeadData?.select_rqst_auditor_2,
      auditor_type: this.singleLeadData?.auditor_type,
      ea_code: this.singleLeadData?.ea_code,
      auditor_type_2: this.singleLeadData?.auditor_type_2,
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
    if (this.leadForm.invalid) {
      this.toast.error('Required fields should not be empty', 'Fields Error');
      
      return;
    }

    
    let val = this.leadForm.value;
    const data = {
      rqst_for: val.rqst_for,
      name_id_of_auditor: val.name_id_of_auditor,
      fyi_only: val.fyi_only,
      standard_s: val.standard_s,
      fluent_lang_skill_req: val.fluent_lang_skill_req,
      select_rqst_auditor: val.select_rqst_auditor,
      select_rqst_auditor_2: val.select_rqst_auditor_2,
      auditor_type: val.auditor_type,
      ea_code: val.ea_code,
      select_dates: val.select_dates,
      select_date_2: val.select_date_2,
      auditor_type_2: val.auditor_type_2,
      inter_company_status:"yes",
      status: "Response Confirm",
    }
    this.leadService.updateRequest(this.lead_id, data).subscribe((res:any)=> {
      
      
      
      this.toast.success("Response Confirmed Successfully..");
      const dataNew = {
        customer_type: "",
        new_location_site: val.new_location_site || "No",
        multiple_site_audit: val.site_audit || "Yes",
        associated_company: this.singleLeadData?.name_legal_status,
        segment: val.segment || 1,
        certificate_type: val.certificate_type || 1,
        first_name: this.singleLeadData?.dqs_contact_person,
        last_name: val.last_name || this.singleLeadData?.dqs_contact_person,
        email: this.singleLeadData?.email1,
        emplyoment_type: val.emplyoment_type || 'Full-Time',
        job_title: val.job_title || 'Sales Manager',
        street_address: val.street_address || 'delhi ',
        address2: val.address2 || 'delhi',
        city: 115,
        city_name: this.singleLeadData?.site_s_list_add,
        state: 25,
        country: 105,
        country_name: "India",
        state_name: "delhi",
        postal_code: val.postal_code || '22',
        region: val.region || 1,
        categories: val.categories || 12,
        br_number1: val.br_number1 || 13,
        br_number: this.singleLeadData.inter_company_br_number,
        regional_bussiness_lead: val.regional_bussiness_lead || 1,
        global_managing_director: val.global_managing_director || 'Dr Murugan',
        global_manager_sales: val.global_manager_sales || 1,
        website_url: val.website_url || 'https://dqsapi.elitetraveltech.in',
        phone_number: this.singleLeadData?.phone1,
        mobile_number: this.singleLeadData?.phone1,
        dqs_contact_source: this.singleLeadData?.dqs_contact_person,
        contact_owner: val.contact_owner || this.singleLeadData?.phone1,
        lead_created_by_name: val.lead_created_by_name ||this.singleLeadData?.dqs_contact_person,
        lead_created_date: moment(this.singleLeadData?.lead_created_date).format('YYYY-MM-DD') || this.singleLeadData?.createdAt,
        status: 'PO Received',
        inter_company_status: 'yes'
      }
      this.leadService.createLead(this.mainId,dataNew).subscribe((res:any) => {
        
        this.route.navigate(['master/lead/inter-company/update-quote']);
      })
    })
  }
}
