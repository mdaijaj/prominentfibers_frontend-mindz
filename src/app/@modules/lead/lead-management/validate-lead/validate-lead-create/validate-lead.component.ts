import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { calendarFormat } from 'moment';
import { ToastrService } from 'ngx-toastr';
import { EmpRegistrationService } from 'src/app/@shared/services/emp-registration.service';
import { LeadService } from 'src/app/@shared/services/lead.service';
import { RecruitService } from 'src/app/@shared/services/recruitment.service';
import { ConfigurationalmasterService } from '../../../../../@shared/services/configurationalmaster.service'

@Component({
  selector: 'app-validate-lead',
  templateUrl: './validate-lead.component.html',
  styleUrls: ['./validate-lead.component.scss'],
})
export class ValidateLeadComponent implements OnInit{
  leadForm: FormGroup;
  inputReadonly = true;
  jobType: any;
  candidateArray: any;
  interviewGetId:any;
  candidateId: any;
  id: any;
  val: any;
  public searchResult: any;
  interview_id: any;
  clicked: boolean = false;
  cutomerType: boolean = false;
  sitAudit: boolean = false;
  lead_id: any;
  show: boolean;
  singleLeadData: any;
  mainId: string | null;
  mainEmployeeData: any;
  allAchievement: any;
  allData: any;
  companyData: any;
  leadNewId: any;
  myDate = new Date();
  countryList: any[] = [];
  cityList: any;
  stateList: any;
  countryName: any;
  now = new Date();
  year = this.now.getFullYear();
  month = this.now.getMonth();
  // day = this.now.getDay();
  date = this.now.getDate();
  maxDate = moment({ year: this.year + 100, month: this.month, date: this.date }).format('YYYY-MM-DD');
  minDate = moment({ year: this.year - 0, month: this.month, date: this.date }).format('YYYY-MM-DD');
  allCompanyList: any;
  pinCodeList:any;
  pinCodeTrue: boolean = true;
  allDataOne: any;
  allDataTwo: any;
  allDataMan: any;
  type: any;
  segmentList: any;
  segment_id: any;
  segment_name: any;
  regionSList: any;
  region_id: any;
  region_name: any;
  certificateList: any;
  CategorySList: any;
  regionalbheadList: any;
  globalMsalesList: any;
  postal_code: any;
  pinCode_name: any;
  assesmentList: any;
  contact_list: any;
  medvalue: boolean;
  rejectTrue: boolean = false;
  medHappening: boolean = false;
  cert_id: any;
  validated_id: any;
  phone_code: any;
  constructor(private fb: FormBuilder,
    private leadService: LeadService,
    private route: Router,
    private recruitService: RecruitService,
    private activeroute: ActivatedRoute,
    private toast: ToastrService,
    private configService: ConfigurationalmasterService,
    private _empRegistration: EmpRegistrationService
    ) {
    this.leadForm = this.fb.group({
      customer_type: [{ value: '', disabled: true }],
      site_audit: [{ value: '', disabled: true }],
      // new_location_site: new FormControl(null),
      associated_company: new FormControl(null),
      segment: new FormControl(null),
      // br_number: new FormControl(null),
      certificate_type: new FormControl(null),
      first_name: new FormControl(null),
      last_name: new FormControl(null),
      email: new FormControl(null,[Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]),
      emplyoment_type: new FormControl(null),
      job_title: new FormControl(null),
      street_address: new FormControl(null),
      address2: new FormControl(null),
      city: new FormControl(null),
      state: new FormControl(null),
      country: new FormControl(null),
      postal_code_id: new FormControl(null),
      postal_code: new FormControl(null),
      region: new FormControl(null),
      regional_bussiness_lead: new FormControl(null),
      global_managing_director: new FormControl(null),
      global_manager_sales: new FormControl(null),
      website_url: new FormControl(null),
      phone_number: new FormControl(null),
      mobile_number: new FormControl(null,[ Validators.required,   Validators.maxLength(10)]),
      dqs_contact_source: new FormControl(null),
      contact_owner: new FormControl(null),
      lead_created_date: new FormControl(null),
      lead_created_by_name: new FormControl(null),
      standard_program_assement: new FormControl(null),
      remarks: new FormControl(null),
      // lead_validate_stage: new FormControl(null),
      validated_by: new FormControl(null),
      lead_validated_date: new FormControl(null),
      lead_validate_remarks: new FormControl(null),
      // lead_assgn_contact_owner: new FormControl(null),
      // assigned_by: new FormControl(null),
      // assigned_date: new FormControl(null),
      stage: new FormControl(null),
      // lead_assgn_remark: new FormControl(null),
      categories: new FormControl(null),
      phone_code: new FormControl(),
      mobile_code: new FormControl()
    })
  }

  noNegativeValues(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      if (control.value && control.value < 0) {
        return { 'negativeValue': true };
      }
      return null;
    }
  }
  ngOnInit() {

    this.activeroute.queryParams.subscribe(params => {
      this.id = params;
      this.lead_id = this.id.lead_id;

      this.type = this.id.type;

      this.leadService.getByIdLead(this.lead_id).subscribe((res:any) => {
        this.singleLeadData = res.data;
        this.phone_code = res.phone_code,
        this.cert_id=res.data.certificate_type
        console.log(this.singleLeadData.certificate_type,"signkjk");
        
        this.configService.getProducts(this.cert_id).subscribe((res:any)=>{
          this.assesmentList=res.data
        },(err:any)=>{
          this.toast.warning("no data found")
        })
        if(this.singleLeadData?.segment_name === 'MED'){
          this.medvalue = true;
        }

        this.patchFormvalue();
      })
    });
    this.getAllSegment();
    this.get_cp_contact();
    this.getAchievementList();
    this.patchFormvalue();
    this.getCountry();
    this.getAchievementListt();
    this.regionalBusiness();
    this.globalManagerales();
    this.mainId = localStorage.getItem("EmpMainId");

      if (this.mainId != undefined) {
        this._empRegistration.getByUserId(this.mainId).subscribe((res) => {
          this.mainEmployeeData = res.data;
          console.log(' this.mainEmployeeData', this.mainEmployeeData)
          this.validated_id = this.mainEmployeeData?.employee_id;
          this.getAchievementList();
          this.patchFormvalue();
        })
      }
  }

  fetchSeries(value: String) {
    if (value === '') {
      return this.searchResult = []
    }
    this.searchResult = this.allAchievement.filter(function (series:any) {

      return series.first_name.toLowerCase().startsWith(value)
    })

  }

  candidateClick(e:any){

    this.candidateId = e;
    this.recruitService.interViewGetIdBy(e).subscribe((res:any)=>{
      this.interviewGetId=res.data;

      this.patchFormvalue();
    })
  }
  getCompanyList() {
    this.leadService.getCompany().subscribe(
      (res: any) => {

        this.allCompanyList = res.result;
      },
      (err) => {

      }
    );
  }
  checkComp(e: any) {

    for (let item of this.allData) {
      if (item.associated_company === e) {
        this.companyData = item;
        this.leadNewId = this.companyData?.lead_genration_id;

      }
    }
    this.leadForm.patchValue({
      segment: this.companyData?.segment,
      certificate_type: this.companyData?.certificate_type,
      br_number1: this.companyData?.br_number,
    });
  }

  rejectLead() {
    this.rejectTrue = true;
  }

  rejectLeadTwo() {
    this.rejectTrue = false;
  }


  getAchievementList() {
    this.recruitService.getAllAchivement().subscribe(
      (res: any) => {

        this.allAchievement = res.data;
      },
      (err) => {

      }
    );

    this.leadService.getLead().subscribe((res: any) => {

      this.allData = res.result;
    });
  }

  patchFormvalue() {
     if(this.singleLeadData?.segment != 'null || undefined'){
      this.leadService.getCertificateByID(this.singleLeadData?.segment).subscribe((res:any) => {
        this.certificateList = res.data.new_certificate_types;
      });
      this.leadService.getRegionByID(this.singleLeadData?.segment).subscribe((res:any) => {
        this.regionSList = res.data.new_regions;
      });
      this.leadService.getCategoryBySegID(this.singleLeadData?.segment).subscribe((res:any) => {
        this.CategorySList = res.data.new_category_masters;

      });
    }

    if(this.singleLeadData?.region != 'null || undefined'){
      this.leadService.getRBuisnessHead(this.singleLeadData?.region).subscribe((res:any) => {
        this.regionalbheadList = res.data;

       });
       this.leadService.getGlobalManagerSales(this.singleLeadData?.region).subscribe((res:any) => {
         this.globalMsalesList = res.data;

        });
    }


    if (this.singleLeadData?.country != 'undefined || null') {
      this.leadService.getStateByID(this.singleLeadData?.country).subscribe((res:any) => {

        this.stateList = res.data;
        this.patchCountryCode(this.singleLeadData?.country)
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


      });
    }
    if (this.singleLeadData?.segment_name === "MED") {
      this.medHappening = true;
    }
    // if (this.singleLeadData?.certificate_type != 'undefined || null') {
    //   this.leadService.getAssesmentByID(this.singleLeadData?.certificate_type).subscribe((res:any) => {

    //  this.assesmentList = res.data[0].newitemlist;

    // });
    // }
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
      email: this.singleLeadData?.email,
      emplyoment_type: this.singleLeadData?.emplyoment_type,
      street_address: this.singleLeadData?.street_address,
      job_title: this.singleLeadData?.job_title,
      address2: this.singleLeadData?.address2,
      city:  this.singleLeadData?.city,
      state:  this.singleLeadData?.state,
      country:  this.singleLeadData?.country,
      postal_code_id:this.singleLeadData?.postal_code_id,
      postal_code: this.singleLeadData?.postal_code_id,
      region: this.singleLeadData?.region,
      regional_bussiness_lead:this.singleLeadData?.regional_bussiness_lead,
      global_managing_director:"Dr Murugan",
      global_manager_sales:this.singleLeadData?.global_manager_sales,
      website_url:this.singleLeadData?.website_url,
      phone_number:this.singleLeadData?.phone_number,
      mobile_number: this.singleLeadData?.mobile_number,
      dqs_contact_source: Number(this.singleLeadData?.dqs_contact_source),
      contact_owner: this.singleLeadData?.contact_owner,
      lead_created_date: this.singleLeadData?.lead_created_date,
      standard_program_assement:  this.singleLeadData?.standard_program_assement,
      remarks:  this.singleLeadData?.remarks,
      categories:  this.singleLeadData?.categories,
      lead_created_by_name: this.singleLeadData?.lead_created_by_name,
      validated_by:  this.mainEmployeeData?.first_name || " ",
      lead_validated_date: this.myDate,
      stage: "Test",
      phone_code: this.singleLeadData?.userrespectiveleads[0]?.phone_code,

    })
    }

  getCountryID(e: any) {

    this.patchCountryCode(e.value)
    this.leadService.getStateByID(e.value).subscribe((res:any) => {
      this.stateList = res.data;
    });

    this.leadForm.get('city')?.reset()

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

  getAllSegment() {
    this.configService.getAllSegment().subscribe((res: any) => {
      this.segmentList = res.data;

    });
  }

  getCountry() {
    this.configService.getCountry().subscribe((res: any) => {
      this.countryList = res.data;
    });
  }
  getAchievementListt() {
    this.leadService.regionListGet().subscribe((res: any) => {

      this.allDataOne = res.data;
    });
  }
  regionalBusiness() {
    this.leadService.getListBusiness().subscribe((res: any) => {

      this.allDataTwo = res.data;
    });
  }

  globalManagerales() {
    this.leadService.getGlobalSalesM().subscribe((res: any) => {

      this.allDataMan = res.data;
    });
  }

  customerType() {
    this.cutomerType = true;
  }

  customerTypeNew() {
    this.cutomerType = false;
  }

  siteAudit() {
    this.sitAudit = true;
  }

  siteAuditNew() {
    this.sitAudit = false;
  }
  get_cp_contact(){
    this.leadService.get_contact().subscribe(
      (res:any)=>{
        this.contact_list = res.data;

      },(err)=>{

      }
    )
  };

  submitForm() {

    // Object.keys(this.leadForm.controls).forEach((key:string) => {
    //   const controlErrors = this.leadForm.get(key)?.errors;
    //   if (controlErrors != null) {
    //     console.log(`Control '${key}' has errors: `, controlErrors);
    //   }
    // });
    let val = this.leadForm.value;
    // if (this.leadForm.invalid) {
    //   this.toast.error('Required fields should not be empty.', 'Error Occurred!');
    //   return;
    // }

    const data = {
      customer_type: this.singleLeadData?.customer_type,
      site_audit: this.singleLeadData?.multiple_site_audit,
      associated_company: this.singleLeadData?.associated_company,
      segment: val.segment || " ",
      certificate_type: val.certificate_type || " ",
      first_name: val.first_name || " ",
      last_name: val.last_name || " ",
      email: val.email || " ",
      emplyoment_type: val.emplyoment_type,
      job_title: val.job_title || " ",
      lead_created_by_name: val.lead_created_by_name || " ",
      street_address: val.street_address || " ",
      address2: val.address2 || " ",
      city: val.city || " ",
      state: val.state || " ",
      country: val.country || " ",
      postal_code_id: Number(val.postal_code_id) || " ",
      postal_code: val.postal_code || " ",
      region: val.region || " ",
      regional_bussiness_lead: val.regional_bussiness_lead || " ",
      global_managing_director: val.global_managing_director || " ",
      global_manager_sales: val.global_manager_sales || " ",
      website_url: val.website_url || " ",
      categories: val.categories || " ",
      phone_number: val.phone_number || " ",
      mobile_number: val.mobile_number || " ",
      dqs_contact_source: val.dqs_contact_source || " ",
      lead_created_date: moment(val.lead_created_date).format('YYYY-MM-DD') || " ",
      standard_program_assement: val.standard_program_assement || " ",
      remarks: val.remarks || " ",
      // lead_validate_stage: val.lead_validate_stage || " ",
      validated_by: val.validated_by || " ",
      validated_id:  this.validated_id,
      lead_validate_remarks: val.lead_validate_remarks || " ",
      // lead_assgn_contact_owner: val.lead_assgn_contact_owner || " ",
      lead_validated_date: moment(val.lead_validated_date).format('YYYY-MM-DD'),
      // assigned_by: val.assigned_by || " ",
      stage: val.stage || "Test",
      // lead_assgn_remark: val.lead_assgn_remark || " ",
      standard_program_assement_name:this.singleLeadData?.standard_program_assement_name,
      dqs_Contact_name:this.singleLeadData?.dqs_Contact_name,
      status:"Validated"
    }

      this.leadService.editLead(this.lead_id, data).subscribe((res:any) => {
      this.toast.success("Lead Validated Successfully..")
      this.route.navigate(
        ['master/lead/lead-management'],
        // { queryParams: { lead_id: this.lead_id } }
      );
    })

  }
  updateForm(){
    if (this.leadForm.invalid) {
      this.toast.error('Required fields should not be empty.', 'Error Occurred!');
      return;
    }
    let val = this.leadForm.value;

    const data = {
      customer_type: val.customer_type,
      site_audit: val.multiple_site_audit,
      associated_company: val.associated_company,
      segment: val.segment || " ",
      certificate_type: val.certificate_type || " ",
      first_name: val.first_name || " ",
      last_name: val.last_name || " ",
      email: val.email || " ",
      emplyoment_type: val.emplyoment_type || " ",
      job_title: val.job_title || " ",
      lead_created_by_name: val.lead_created_by_name || " ",
      street_address: val.street_address || " ",
      address2: val.address2 || " ",
      city: val.city || " ",
      state: val.state || " ",
      country: val.country || " ",
      postal_code_id: Number(val.postal_code_id) || '',
      postal_code: val.postal_code || " ",
      region: val.region || " ",
      regional_bussiness_lead: val.regional_bussiness_lead || " ",
      global_managing_director: val.global_managing_director || " ",
      global_manager_sales: val.global_manager_sales || " ",
      website_url: val.website_url || " ",
      categories: val.categories || " ",
      phone_number: val.phone_number || " ",
      mobile_number: val.mobile_number || " ",
      dqs_contact_source: val.dqs_contact_source || " ",
      lead_created_date: moment(val.lead_created_date).format('YYYY-MM-DD') || " ",
      standard_program_assement: val.standard_program_assement || " ",
      remarks: val.remarks || " ",
      // lead_validate_stage: val.lead_validate_stage || " ",
      validated_by: val.validated_by || " ",
      lead_validate_remarks: val.lead_validate_remarks || " ",
      // lead_assgn_contact_owner: val.lead_assgn_contact_owner || " ",
      lead_validated_date: moment(val.lead_validated_date).format('YYYY-MM-DD'),
      // assigned_by: val.assigned_by || " ",
      stage: val.stage || " ",
      // lead_assgn_remark: val.lead_assgn_remark || " ",
      standard_program_assement_name:this.singleLeadData?.standard_program_assement_name,
      dqs_Contact_name:this.singleLeadData?.dqs_Contact_name,

      status:"Validated"
    }

    this.leadService.editLead(this.lead_id, data).subscribe((res:any) => {


      this.toast.success("Lead Updated Successfully..")
      this.route.navigate(['master/lead/lead-management']);
    })
  }
  back() {
    this.route.navigate(['/master/lead/lead-management/validate-lead']);
  }
  certificate(e:any){
    console.log(e,'eeeeee');
    
    const cert_id=e.value
    this.configService.getProducts(cert_id).subscribe((res:any)=>{
      this.assesmentList=res.data
      
    },(err:any)=>{
      this.toast.warning("no data found")
    })

    if (e.value ===1) {
      // this.sitAudit = true;
      this.leadForm.patchValue({
        site_audit:"Yes"
      })
    }
    else if(e.value ===2) {
      // this.medical = false;
      this.leadForm.patchValue({
        site_audit:"No"
      })
    }
  }

  reject() {
    const data = {
      status: "Rejected"
    }
    this.leadService.editLead(this.lead_id, data).subscribe((res:any) => {

      this.toast.success(res.message);
      this.route.navigate(['master/lead/lead-management/generate-lead'],
        { queryParams: { lead_id: this.lead_id } }
      );
    })
  }
  public toggleInputReadonly() {
    this.inputReadonly = !this.inputReadonly;
  }

  patchCountryCode(id:any){
      this.countryList.forEach((res:any) =>{
        if(res.countryss_id == id){
            let code = "+" + res.phone_code;
            this.leadForm.patchValue({
              // phone_code: code,
              mobile_code: code
            })
        }
      })
  }

  regionSelect(e:any){
console.log(e,'eeeeeeee');
let val=e.value;
console.log(val);
this.leadForm.get('regional_bussiness_lead')?.reset(),
this.leadForm.get('global_manager_sales')?.reset()
  }
  segmentChange(e:any){
    this.leadForm.get('certificate_type')?.reset()

  }

}
