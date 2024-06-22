import { Component } from '@angular/core';
import {
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
import { ConfigurationalmasterService } from '../../../../@shared/services/configurationalmaster.service';

@Component({
  selector: 'app-create-lead-child',
  templateUrl: './create-lead-child.component.html',
  styleUrls: ['./create-lead-child.component.scss'],
})
export class CreateLeadChildComponent {
  leadForm: FormGroup ;
  jobType: any;
  candidateArray: any;
  interviewGetId: any;
  candidateId: any;
  id: any;
  interview_id: any;
  clicked: boolean = false;
  cutomerType: boolean = false;
  sitAudit: boolean = false;
  nonCertt: boolean = false;
  lead_id: any;
  val: any;
  // New commit
  value: any;
  public searchResult: any;
  mainId: string | null;
  mainEmployeeData: any;
  allAchievement: any;
  categoryList: any;
  allCompanyList: any;
  allData: any;
  companyData: any;
  myDate = new Date();
  submitted: boolean;
  countryList: any[] = [];
  stateList: any[] = [];
  cityList: any;
  countryName: any;
  stateName: any;
  allAchievementt: any;
  allDataOne: any;
  regionList: any;
  allDataTwo: any;
  allDataMan: any;
  leadNewId: any;
  leadStatus: boolean = false;
  pinCodeList: any;
  standardList: any;
  industryList: any;
  cityName: any;
  singleLeadData: any;
  pinCodeTrue: boolean = false;
  medical: boolean = false;
  now = new Date();
  year = this.now.getFullYear();
  month = this.now.getMonth();
  // day = this.now.getDay();
  date = this.now.getDate();
  maxDate = moment({ year: this.year + 100, month: this.month, date: this.date }).format('YYYY-MM-DD');
  minDate = moment({ year: this.year - 0, month: this.month, date: this.date }).format('YYYY-MM-DD');
  edit_lead_id: any;
  newChildData: any;
  segmentList: any;
  certificateList: any;
  assesmentList: any;
  regionSList: any;
  CategorySList: any;
  regionBuisnessList: any;
  regionalbheadList: any;
  globalMsalesList: any;
  regionName: any;
  regional_bussiness_name: any;
  global_manager_sales_name: any;
  pinCodeName: any;
  certificate_type_name: any;
  segment_name: any;
  inputReadonly = true;
  contact_list:any;
  c_source:any;
  leadeCreatedBy_single:any;
  AchievemenDataStore:any;
  leadCreatedName: any;
   gmdData: any;
  medvalue: boolean;
  categoryValue: boolean;
  type: any;
  countryNewId: any;
  countryss_id: any;
  countryVar:any=[];
  countryVar2:any=[];
  stateVar:any=[];
  stateVar2:any=[];
  cityVar:any=[];
  cityVar2:any=[]; 
  programAssement: any;

  constructor(
    private fb: FormBuilder,
    private leadService: LeadService,
    private route: Router,
    private recruitService: RecruitService,
    private configService: ConfigurationalmasterService,
    private activeroute: ActivatedRoute,
    private _configurationalMasterService: ConfigurationalmasterService,
    private toast: ToastrService,
    private _empRegistration: EmpRegistrationService
  ) {
    const urlRegex = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/;
    this.leadForm = this.fb.group({
      customer_type: new FormControl(null),
      new_location_site: new FormControl(null),
      site_audit: new FormControl(null, Validators.required),
      associated_company: new FormControl(null, Validators.required),
      segment: new FormControl(null, Validators.required),
      certificate_type: new FormControl(null, Validators.required),
      first_name: new FormControl(null, Validators.required),
      last_name: new FormControl(null, Validators.required),
      email: new FormControl(null, [Validators.required, Validators.pattern('^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$')]),
      emplyoment_type: new FormControl(null),
      job_title: new FormControl(null, Validators.required),
      street_address: new FormControl(null, Validators.required),
      address2: new FormControl(null, Validators.required),
      city: new FormControl(null, Validators.required),
      state: new FormControl(null, Validators.required),
      country: new FormControl(null, Validators.required),
      postal_code_id: new FormControl(null, Validators.required),
      postal_code: new FormControl(null, [
        Validators.maxLength(6),
        Validators.pattern('^[0-9]*$'),

      ]),
      region: new FormControl(null, Validators.required),//
      regional_bussiness_lead: new FormControl(null,  Validators.required),//
      global_managing_director: new FormControl(null, Validators.required),
      global_manager_sales: new FormControl(null, Validators.required),
      website_url: ['', [Validators.pattern(urlRegex)]],
      phone_number: new FormControl(null),
      mobile_number: new FormControl(null,[ Validators.required,   Validators.maxLength(15)]),
      dqs_contact_source: new FormControl(null),
      contact_owner: new FormControl(null, Validators.required),
      lead_created_date: new FormControl(null),
      lead_created_by_name: new FormControl(null),
      standard_program_assement: new FormControl(null, Validators.required),
      remarks: new FormControl(null),
      lead_validate_stage: new FormControl(null),
      validated_by: new FormControl(null),
      lead_validated_date: new FormControl(null),
      lead_validate_remarks: new FormControl(null),
      lead_assgn_contact_owner: new FormControl(null),
      assigned_by: new FormControl(null),
      assigned_date: new FormControl(null),
      stage: new FormControl(null),
      lead_assgn_remark: new FormControl(null),
      br_number: new FormControl(null),
      categories: new FormControl(null),
      phone_code: new FormControl(),
      mobile_code: new FormControl()
    });
  }

  onEmailInput(event: any) {
    const inputElement = event.target as HTMLInputElement;
    const lowercaseValue = inputElement.value.toLowerCase();
    this.leadForm.controls?.['email'].setValue(lowercaseValue);
  }

  ngOnInit() {
    this.leadForm.patchValue({
      customer_type:"New User",
      site_audit:"No"
    })
    this.leadForm.controls['customer_type'].disable();
    this.leadForm.controls['site_audit'].disable()

    this.globalManager();
    this.mainId = localStorage.getItem('EmpMainId');
      this._empRegistration.getByUserId(this.mainId).subscribe((res) => {
        this.mainEmployeeData = res.data;
        this.getAchievementList();
        this.globalManager();
      });
    this.activeroute.queryParams.subscribe(params => {
      this.id = params;
      this.lead_id = this.id.lead_id;
      this.type= this.id.type;
      if(this.lead_id != undefined && this.type == 'editLead'){
        this.getChildByLeadId()
      }else{
        this.getParentByLeadId();
      }
   
    });
    this.globalManager();
    this.getAchievementList();
    this.getCategory();
    this.getCompanyList();
    this.getCountry();
    this.getAllSegment();
    this.getAchievementListt();
    this.regionalBusiness();
    this.globalManagerales();
    this.getStandardProgram();
    this.get_cp_contact();
    
  }


  getChildByLeadId(){
    this.leadService.getChildLeadById(this.lead_id).subscribe((res: any) => {
      this.singleLeadData = res.data[0];
      this._configurationalMasterService.getProducts(this.singleLeadData.certificate_type).subscribe((res:any)=>{
        this.assesmentList=res.data
        
      },(err:any)=>{
        this.toast.warning("no data found")
      })
        this.patchLeadData()
      if(res.data.dqs_contact_source === '4'){
        this.get_All_Channel_Partner();
      }else{
      this.allAchievement = this.AchievemenDataStore;
      }
    });
  }

  getParentByLeadId(){
    this.leadService.getByIdLead(this.lead_id).subscribe((res: any) => {
      this.singleLeadData = res.data;
      this._configurationalMasterService.getProducts(this.singleLeadData.certificate_type).subscribe((res:any)=>{
        this.assesmentList=res.data
        
      },(err:any)=>{
        this.toast.warning("no data found")
      })
      this.patchFormvalueTwo();
      if(res.data.dqs_contact_source === '4'){
        this.get_All_Channel_Partner();
      }else{
      this.allAchievement = this.AchievemenDataStore;
      }
    });
  }

  globalManager() {
    this._configurationalMasterService.ListGmd().subscribe((params: any) => {
      this.gmdData = params.data[0];
     });
  }

  medicalFlow(e: any) {
    const segment_id = e.value;
    this.leadService.getCertificateByID(segment_id).subscribe((res: any) => {
      this.certificateList = res.data.new_certificate_types;
    });

    this.leadService.getRegionByID(segment_id).subscribe((res: any) => {
      this.regionSList = res.data.new_regions;
    });

    this.leadService.getCategoryBySegID(segment_id).subscribe((res: any) => {
      this.CategorySList = res.data.new_category_masters;
    });
    if (e.value === 2) {
      this.medical = true;
      this.medvalue = true;
    }
    else {
      this.medical = false;
      this.medvalue = false;
    }


  }

  patchFormvalueTwo() {
    console.log('test111')
    if (this.singleLeadData?.segment != 'null || undefined') {
      this.leadService.getCertificateByID(this.singleLeadData?.segment).subscribe((res: any) => {
        this.certificateList = res.data.new_certificate_types;
      });
      this.leadService.getRegionByID(this.singleLeadData?.segment).subscribe((res: any) => {
        this.regionSList = res.data.new_regions;
      });
      this.leadService.getCategoryBySegID(this.singleLeadData?.segment).subscribe((res: any) => {
        this.CategorySList = res.data.new_category_masters;

      });
    }
    // if (this.singleLeadData?.certificate_type != 'null || undefined') {
    //   this.leadService.getAssesmentByID(this.singleLeadData?.certificate_type).subscribe((res: any) => {
    //     this.assesmentList = res.data[0].newitemlist;

    //   });

    // }

    if (this.singleLeadData?.region != 'null || undefined') {
      this.leadService.getRBuisnessHead(this.singleLeadData?.region).subscribe((res: any) => {
        this.regionalbheadList = res.data;

      });
      this.leadService.getGlobalManagerSales(this.singleLeadData?.region).subscribe((res: any) => {
        this.globalMsalesList = res.data;

      });
    }
    if (this.singleLeadData?.country != 'undefined || null') {
      this.leadService.getStateByID(this.singleLeadData?.country).subscribe((res: any) => {
        this.stateList = res.data;
      });
    }
    if (this.singleLeadData?.state != 'undefined || null') {
      this.leadService.getCityByID(this.singleLeadData?.state).subscribe((res: any) => {

        this.cityList = res.data;
      });
    }

    if (this.singleLeadData?.city != 'undefined || null') {
      this.leadService.getPinCodeNew(this.singleLeadData?.city).subscribe((res: any) => {
        this.pinCodeList = res.data;

      });
    }
    console.log(this.mainEmployeeData?.first_name)
    this.leadForm.patchValue({
      customer_type: "New User",
      new_location_site: "",
      site_audit: "No",
      associated_company: this.singleLeadData?.associated_company,
      segment: this.singleLeadData?.segment,
      certificate_type: this.singleLeadData?.certificate_type,
      br_number: this.singleLeadData?.br_number,
      global_managing_director: this.gmdData?.director_name,
      contact_owner: this.mainEmployeeData?.first_name,
      lead_created_by_name: this.mainEmployeeData?.first_name,
      lead_created_date: this.myDate,
    });
    this.leadStatus = true;
  }

  patchLeadData() {
    console.log(this.singleLeadData,'testLead Data')

    if (this.singleLeadData?.segment != 'null || undefined') {
      this.leadService.getCertificateByID(this.singleLeadData?.segment).subscribe((res: any) => {
        this.certificateList = res.data.new_certificate_types;
      });
      this.leadService.getRegionByID(this.singleLeadData?.segment).subscribe((res: any) => {
        this.regionSList = res.data.new_regions;
      });
      this.leadService.getCategoryBySegID(this.singleLeadData?.segment).subscribe((res: any) => {
        this.CategorySList = res.data.new_category_masters;

      });
    }
    if (this.singleLeadData?.region != 'null || undefined') {
      this.leadService.getRBuisnessHead(this.singleLeadData?.region).subscribe((res: any) => {
        this.regionalbheadList = res.data;

      });
      this.leadService.getGlobalManagerSales(this.singleLeadData?.region).subscribe((res: any) => {
        this.globalMsalesList = res.data;

      });
    }
    if (this.singleLeadData?.country != 'undefined || null') {
      this.leadService.getStateByID(this.singleLeadData?.country).subscribe((res: any) => {
        this.patchCountryCode(this.singleLeadData?.country)
        this.stateList = res.data;
      });
    }
    if (this.singleLeadData?.state != 'undefined || null') {
      this.leadService.getCityByID(this.singleLeadData?.state).subscribe((res: any) => {

        this.cityList = res.data;
      });
    }

    if (this.singleLeadData?.city != 'undefined || null') {
      this.leadService.getPinCodeNew(this.singleLeadData?.city).subscribe((res: any) => {
        this.pinCodeList = res.data;

      });
    }


    this.leadForm.patchValue({
      customer_type: "Existing User",
      new_location_site: "No",
      site_audit: this.singleLeadData?.multiple_site_audit,
      associated_company: this.singleLeadData?.associated_company,
      segment: this.singleLeadData?.segment,
      br_number: this.singleLeadData?.br_number,
      assignedManager: this.singleLeadData?.assigned_hiring_manager,
      certificate_type: this.singleLeadData?.certificate_type,
      first_name: this.singleLeadData?.first_name,
      last_name: this.singleLeadData?.last_name,
      email: this.singleLeadData?.email,
      emplyoment_type: this.singleLeadData?.emplyoment_type,
      street_address: this.singleLeadData?.street_address,
      job_title: this.singleLeadData?.job_title,
      address2: this.singleLeadData?.address2,
      city: Number(this.singleLeadData?.city),
      state: Number(this.singleLeadData?.state),
      country: Number(this.singleLeadData?.country),
      postal_code_id: this.singleLeadData?.postal_code_id,
      postal_code: this.singleLeadData?.postal_code,
      pincode: this.singleLeadData?.pincode,
      region: Number(this.singleLeadData?.region),
      regional_bussiness_lead: Number(this.singleLeadData?.regional_bussiness_lead),
      global_managing_director: this.gmdData?.director_name,
      global_manager_sales: Number(this.singleLeadData?.global_manager_sales),
      website_url: this.singleLeadData?.website_url,
      phone_code:Number(this.singleLeadData?.phone_code),
      phone_number: this.singleLeadData?.phone_number,
      mobile_number: Number(this.singleLeadData?.mobile_number),
      dqs_contact_source: Number(this.singleLeadData?.dqs_contact_source),
      contact_owner: this.mainEmployeeData?.first_name || this.singleLeadData?.contact_owner,
      lead_created_date: this.singleLeadData?.lead_created_date,
      standard_program_assement: this.singleLeadData?.standard_program_assement,
      remarks: this.singleLeadData?.remarks,
      categories: this.singleLeadData?.categories,
      lead_created_by_name: this.singleLeadData?.lead_created_by_name
    })
    this.leadStatus = true;
  }
  getCountryID(e: any) {
    console.log(e);
    this.leadService.getStateByID(e.value).subscribe((res: any) => {

      this.stateList = res.data;
      this.stateVar = this.stateList.map((res: any) => res.states_name);
      this.stateVar2 = this.stateList; 
    });
    this.patchCountryCode(e.value)
  }
  getStateID(e: any) {

    this.leadService.getCityByID(e.value).subscribe((res: any) => {

      this.cityList = res.data;
      this.cityVar = this.cityList.map((res: any) => res.city_name);
      this.cityVar2 = this.cityList;
    });
  }
  getPinCode(e: any) {

    this.leadService.getPinCodeNew(e.value).subscribe((res: any) => {
      this.pinCodeList = res.data;

      // if (this.pinCodeList.length === 0) {
      //   this.pinCodeTrue = true;
      // } else {
      //   this.pinCodeTrue = false;
      // }
    });
  }
  getStandardProgram() {
    this._configurationalMasterService.listAsses().subscribe((res: any) => {
      this.standardList = res.data;

    });
  }

  scroll(el: HTMLElement) {
    el.scrollIntoView();
  }

  scrollTwo(el: HTMLElement) {
    el.scrollIntoView();
  }

  get f(): any {
    return this.leadForm.controls;
  }

  getCountry() {
    this.configService.getCountry().subscribe((res: any) => {
      this.countryList = res.data;
      this.countryVar = this.countryList.map((res: any) => res.countryss_name);
      this.countryVar2 = this.countryList;
    });
  }
  getAllSegment() {
    this.configService.getAllSegment().subscribe((res: any) => {
      this.segmentList = res.data;

    });
  }



  getCity() {
    // this.configService.getCity().subscribe((res: any) => {
    //   this.cityList = res.data;
    //
    // });
  }

  getCategory() {
    this.configService.listCategory().subscribe((res: any) => {
      this.categoryList = res.data;

    });
  }

  fetchSeries(value: String) {
    if (value === '') {
      return (this.searchResult = []);
    }
    this.searchResult = this.allCompanyList?.filter(function (series: any) {

      return series.associated_company.toLowerCase().startsWith(value);
    });
  }

  fetchSeriesCountry(value: String) {
    if (value === '') {
      return (this.searchResult = []);
    }

    this.searchResult = this.countryList.filter(function (series: any) {

      return series.countryss_name.toLowerCase().startsWith(value);
    });
  }

  candidateClick(e: any) {

    this.candidateId = e;
    this.recruitService.interViewGetIdBy(e).subscribe((res: any) => {
      this.interviewGetId = res.data;

      this.patchFormvalueTwo();
    });
  }

  patchFormvalue() {
    this.leadForm.patchValue({
      customer_type: "New User",
      site_audit: "No",
      global_managing_director: this.gmdData?.director_name,
      contact_owner: this.mainEmployeeData?.first_name,
      lead_created_by_name: this.mainEmployeeData?.first_name,
      lead_created_date: this.myDate,
    });
  }

  getAchievementList() {
    this.recruitService.getAllAchivement().subscribe(
      (res: any) => { this.AchievemenDataStore = res.data;},
      (err) => { });
  }

  getAchievementListt() {
    this.leadService.regionListGet().subscribe((res: any) => {

      this.allDataOne = res.data;
      this.regionList = res.data;
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

  checkComp(e: any) {

     for (let item of this.allCompanyList) {
      if (item.associated_company === e) {
        this.companyData = item;
        this.leadNewId = this.companyData?.lead_genration_id;
        
      }
    }
    console.log(this.companyData);
    if (this.companyData?.segment != 'null || undefined') {
      this.leadService.getCertificateByID(this.companyData?.segment).subscribe((res: any) => {
        this.certificateList = res.data.new_certificate_types;
      });
      this.leadService.getRegionByID(this.companyData?.segment).subscribe((res: any) => {
        this.regionSList = res.data.new_regions;
      });
      this.leadService.getCategoryBySegID(this.companyData?.segment).subscribe((res: any) => {
        this.CategorySList = res.data.new_category_masters;

      });
    }
    // if (this.companyData?.certificate_type != 'null || undefined') {
    //   this.leadService.getAssesmentByID(this.companyData?.certificate_type).subscribe((res: any) => {
    //     this.assesmentList = res.data[0].newitemlist;
    //   });
    // }
    console.log(this.mainEmployeeData);
    
    this.leadForm.patchValue({

      segment: this.companyData?.segment,
      certificate_type: this.companyData?.certificate_type,
      br_number: this.companyData?.br_number,
      lead_created_by_name: this.mainEmployeeData?.first_name,
    });
  }

  childSite() {
    if (this.singleLeadData?.segment != 'null || undefined') {
      this.leadService.getCertificateByID(this.singleLeadData?.segment).subscribe((res: any) => {
        this.certificateList = res.data.new_certificate_types;
      });
      this.leadService.getRegionByID(this.singleLeadData?.segment).subscribe((res: any) => {
        this.regionSList = res.data.new_regions;
      });
      this.leadService.getCategoryBySegID(this.singleLeadData?.segment).subscribe((res: any) => {
        this.CategorySList = res.data.new_category_masters;

      });
    }
    // if (this.companyData?.certificate_type != 'null || undefined') {
    //   this.leadService.getAssesmentByID(this.singleLeadData?.certificate_type).subscribe((res: any) => {
    //     this.assesmentList = res.data[0].newitemlist;
    //   });
    // }
    this.leadService.getRBuisnessHead(this.singleLeadData?.region).subscribe((res: any) => {
      this.regionalbheadList = res.data;

    });
    this.leadService.getGlobalManagerSales(this.singleLeadData?.region).subscribe((res: any) => {
      this.globalMsalesList = res.data;

    });
    if (this.singleLeadData?.country != 'undefined || null') {
      this.leadService.getStateByID(this.singleLeadData?.country).subscribe((res: any) => {
        this.patchCountryCode(this.singleLeadData?.country)
        this.stateList = res.data;
      });
    }
    if (this.singleLeadData?.state != 'undefined || null') {
      this.leadService.getCityByID(this.singleLeadData?.state).subscribe((res: any) => {

        this.cityList = res.data;
      });
    }
    if (this.singleLeadData?.city != 'undefined || null') {
      this.leadService.getPinCodeNew(this.singleLeadData?.city).subscribe((res: any) => {
        this.pinCodeList = res.data;

      });
    }
    console.log(this.singleLeadData,"hhhhhhhhhhhhhhhhh");
    
    this.leadForm.patchValue({
      first_name: this.singleLeadData?.first_name,
      last_name: this.singleLeadData?.last_name,
      email: this.singleLeadData?.email,
      job_title: this.singleLeadData?.job_title,
      street_address: this.singleLeadData?.street_address,
      address2: this.singleLeadData?.address2,
      city: Number(this.singleLeadData?.city),
      state: Number(this.singleLeadData?.state),
      country: Number(this.singleLeadData?.country),
      postal_code_id: this.singleLeadData?.postal_code_id,
      postal_code: this.singleLeadData?.postal_code,
      region: this.singleLeadData?.region,
      contact_owner:this.singleLeadData?.contact_owner,
      lead_assgn_contact_owner:this.singleLeadData?.lead_assgn_contact_owner
    });
    this.leadStatus = true;
  }

  yesChild() {
    this.leadForm.patchValue({
      first_name: '',
      last_name: '',
      email: '',
      job_title: '',
      street_address: '',
      address2: '',
      city: '',
      state: '',
      country: '',
      postal_code_id: '',
      postal_code: '',
      region: '',
      phone_code: '',
      mobile_code: ''
    });
    this.leadStatus = true;
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

  customerType() {
    this.cutomerType = true;
  }

  customerTypeNew() {
    this.cutomerType = false;
  }
  nonCert() {
    this.nonCertt = true;
  }
  nonCertNew() {
    this.nonCertt = false;
  }

  siteAudit() {
    this.sitAudit = true;
  }
  certificateChange(event: any) {
    const certi_id = event.value;
    console.log('certi_id',certi_id);
    
    this._configurationalMasterService.getProducts(certi_id).subscribe((res:any)=>{
      this.assesmentList=res.data
      console.log(this.assesmentList,"assesment");
      
    },(err:any)=>{
      this.toast.warning("no data found")
    })

    let certificate_value1
    this.certificateList.forEach((item: any) => {

      if (certi_id === item.certificate_type_id) {
        certificate_value1 = item.certificate_type_name
      }
    });


    console.log(certificate_value1);

    // if (certificate_value1 === "Non-Cert") {
    //   this.leadForm.patchValue({
    //     site_audit: "No"
    //   })
    // } else {
    //   this.leadForm.patchValue({
    //     site_audit: "Yes"
    //   })
    // }
    //   this.leadService.getAssesmentByID(certi_id).subscribe((res: any) => {

    //   this.assesmentList = res.data[0].newitemlist;

    // });

    if (event.value === 'Non Cert') {
      this.sitAudit = true;
    }
    else {
      this.medical = false;
    }


  }

  siteAuditNew() {
    this.sitAudit = false;
  }

  back() {
    this.route.navigate(['master/lead/lead-account/account-list']);
  }

  standerProgram(e:any){
    console.log(e.product_master_name);
    this.programAssement = e.product_master_name;
    
  }

  submitForm() {
    this.submitted = false;


    // if (this.leadForm.invalid) {
    //   this.toast.error(
    //     'Required fields should not be empty.',
    //     'Error Occurred!'
    //   );
    //   return;
    // }
    let val = this.leadForm.value;
    console.log('val of form',val);

    for (let item of this.countryList) {
       if (item.countryss_id == val.country) {
        this.countryss_id = item.countryss_id;
        this.countryName = item.countryss_name;       
      }
    }
    for (let item of this.stateList) {
      if (item.states_id == val.state) {
        this.stateName = item.states_name;
      }
    }
    for (let item of this.cityList) {
      if (item.city_id == val.city) {
        this.cityName = item.city_name;
      }
    }
    for (let item of this.regionSList) {
      if (item.new_region_id == val.region) {
        this.regionName = item.new_region_name;
      }

    }
    for (let item of this.regionalbheadList) {

      if (item.new_regional_business_head_id == val.regional_bussiness_lead) {
        this.regional_bussiness_name = item.first_name;
      }

    }
    for (let item of this.globalMsalesList) {

      if (item.new_global_manager_sales_id == val.global_manager_sales) {
        this.global_manager_sales_name = item.first_name;
      }

    }

    //
    // for(let item of this.pinCodeList){
    //   if(item.pincode_id == val.postal_code_id) {
    //     this.pinCodeName = item.pincode_name;
    //   }
    //
    // }
    for (let item of this.certificateList) {
      if (item.certificate_type_id == val.certificate_type) {
        this.certificate_type_name = item.certificate_type_name;
      }

    }
    for (let item of this.segmentList) {
      if (item.segment_id == val.segment) {
        this.segment_name = item.segment_name;
      }

    }


    this.submitted = true;
      const dataNew = {
        lead_genration_id: this.lead_id,
        first_name: val.first_name || ' ',
        last_name: val.last_name || ' ',
        email: val.email || ' ',
        job_title: val.job_title || ' ',
        street_address: val.street_address || ' ',
        address_line2: "Test Address",
        segment: Number(val.segment) || ' ',
        segment_name: this.segment_name,
        city: Number(val.city) || ' ',
        state: Number(val.state) || ' ',
        country: Number(val.country) || ' ',
        country_name: this.countryName,
        state_name: this.stateName,
        city_name: this.cityName,
        postal_code_id: Number(val.postal_code_id) || '',
        postal_code: this.pinCodeName || ' ',
        region: Number(val.region) || ' ',
        region_name: this.regionName || '',
        certificate_type: val.certificate_type || ' ',
        certificate_type_name: this.certificate_type_name,
        regional_bussiness_lead: Number(val.regional_bussiness_lead) || ' ',
        regional_bussiness_lead_name: this.regional_bussiness_name || '',
        global_managing_director: val.global_managing_director || 'Dr Murugan',
        global_manager_sales: Number(val.global_manager_sales) || ' ',
        global_manager_sales_name: this.global_manager_sales_name || ' ',
        website_url: val.website_url || ' ',
        phone_number: val.phone_number || ' ',
        phone_code:val.phone_code || '',
        mobile_number: val.mobile_number || ' ',
        contact_owner:this.singleLeadData?.contact_owner,
        lead_assgn_contact_owner:this.singleLeadData?.lead_assgn_contact_owner,
        standard_program_assement:this.programAssement,
        customer_type:val.customer_type,
        site_audit:val.site_audit,
      };
       this.leadService.createChildLead(dataNew).subscribe((res: any) => {
        this.toast.success("Child Site Added Successfully..");
        this.route.navigate(['master/lead/lead-account/account-list']);
      },(err:any)=>{
        this.toast.error(err.error.message)
      })
      console.log('dataNew', dataNew)
  }

  // edit lead function
  UpdateForm() {

    this.submitted = false;
    // if (this.leadForm.invalid) {
    //   this.toast.error('Required fields should not be empty.', 'Error Occurred!');
    //   return;
    // }
    if (this.lead_id != null) {
      let val = this.leadForm.value;
      console.log(val);
      let data:any = {
        customer_type: val.customer_type,
        new_location_site: val.new_location_site || ' ',
        multiple_site_audit: val.site_audit || 'No',
        associated_company: val.associated_company,
        segment: val.segment || ' ',
        certificate_type: val.certificate_type || ' ',
        first_name: val.first_name || ' ',
        last_name: val.last_name || ' ',
        email: val.email || ' ',
        emplyoment_type: val.emplyoment_type || ' ',
        job_title: val.job_title || ' ',
        street_address: val.street_address || ' ',
        address2: val.address2 || ' ',
        city: Number(val.city) || ' ',
        state: Number(val.state) || ' ',
        country: Number(val.country) || ' ',
        country_name: this.countryName,
        state_name: this.stateName,
        city_name: this.cityName,
        postal_code_id: Number(val.postal_code_id) || '',
        region: val.region || ' ',
        categories: val.categories || 1,
        br_number: val.br_number || ' ',
        regional_bussiness_lead: val.regional_bussiness_lead || ' ',
        global_managing_director: val.global_managing_director || 'Dr Murugan',
        global_manager_sales: val.global_manager_sales || ' ',
        website_url: val.website_url || ' ',
        phone_number: val.phone_number || ' ',
        phone_code:val.phone_code || '',
        mobile_number: val.mobile_number || ' ',
        dqs_contact_source: val.dqs_contact_source || ' ',
        // contact_owner: val.contact_owner || ' ',
        // lead_created_by_name: val.lead_created_by_name || ' ',
        lead_created_date: moment(val.lead_created_date).format('YYYY-MM-DD') || ' ',
        standard_program_assement: val.standard_program_assement || ' ',
        remarks: val.remarks || ' ',
        lead_validate_stage: val.lead_validate_stage || ' ',
        validated_by: val.validated_by || ' ',
        lead_validate_remarks: val.lead_validate_remarks || ' ',
        // lead_assgn_contact_owner: val.lead_assgn_contact_owner || ' ',
        assigned_by: val.assigned_by || ' ',
        stage: val.stage || ' ',
        lead_assgn_remark: val.lead_assgn_remark || ' ',
        contact_owner:this.singleLeadData?.contact_owner,
        lead_assgn_contact_owner:this.singleLeadData?.lead_assgn_contact_owner,
        site_audit:val.site_audit,
        status: 'Open',

        dqs_Contact_id: this.c_source?.contact_source_id || val.dqs_contact_source,
        dqs_Contact_name: this.c_source?.contact_source_name,
        lead_created_by_name: this.leadCreatedName,
        // lead_created_by: this.leadeCreatedBy_single?.employee_id || this.leadeCreatedBy_single?.channel_partner_id,
        lead_created_by_id: `${this.leadeCreatedBy_single?.first_name} ${this.leadeCreatedBy_single?.last_name}`,
        lead_genration_id:this.singleLeadData.lead_genration_id,
      };

      if(this.leadeCreatedBy_single?.channel_partner_id){
        data.channel_Partner_id = this.leadeCreatedBy_single?.channel_partner_id
        data.channel_Partner_name = `${this.leadeCreatedBy_single?.first_name} ${this.leadeCreatedBy_single?.last_name}`
      };

      this.leadService.updateChildLeadById(this.lead_id, data).subscribe((res: any) => {


        this.toast.success("Lead Updated Successfully..")
        this.route.navigate(['master/lead/lead-account/account-list']);
      })
    }
  }
  getBuisnessHead(e: any) {
    const region_id = e.value;
    this.leadService.getRBuisnessHead(region_id).subscribe((res: any) => {
      this.regionalbheadList = res.data;

    });
    this.leadService.getGlobalManagerSales(region_id).subscribe((res: any) => {
      this.globalMsalesList = res.data;

    });
  }
  clearInput() {
    // Clear the input field
    this.leadForm.get('associated_company')?.reset();
    this.leadForm.get('email')?.reset();
  }
  Skip() {
    this.route.navigate([], { queryParams: {} });
  }
  contactOwner(e: any) {

  }

  contact_source_cahnge(e:any){
    this.c_source = this.contact_list.find((a:any)=> a.contact_source_id === e.value);
    if(e.value === 4){
      this.get_All_Channel_Partner();
    }else{
      this.allAchievement = this.AchievemenDataStore
    }

  };

  Lead_Created_ByChange(e:any){
    this.leadeCreatedBy_single = this.allAchievement.find((a:any)=>a.employee_id || a.channel_partner_id === e.value)

  }

  get_cp_contact(){
    this.leadService.get_contact().subscribe(
      (res:any)=>{
        this.contact_list = res.data;

      },(err)=>{

      }
    )
  };

  get_All_Channel_Partner(){
    this.leadService.get_All_Channel_Partner().subscribe(
      (res:any)=>{
        this.allAchievement = res.data;

      },(err)=>{

      }
    )
  };


  public toggleInputReadonly() {
    this.inputReadonly = !this.inputReadonly;
  }
  getCurrentRoute():string{
    return this.activeroute.snapshot.url.map(s => s.path).join('/')
}

patchCountryCode(id:any){
  this.countryList.forEach((res:any) =>{
    if(res.countryss_id == id){
        let code = "+" + res.phone_code;
        this.leadForm.patchValue({
          mobile_code: code
        })
    }
  })
}

countryfilter(e:any){
  const aa = e
  let filteredVariable = this.countryVar2.filter((item: any) => aa.includes(item.countryss_name));
  this.countryList = filteredVariable
}

stateFilter(e:any){
  const aa = e
  let filteredVariable = this.stateVar2.filter((item: any) => aa.includes(item.states_name));
  this.stateList = filteredVariable
}
cityFilter(e:any){
  const aa = e
  let filteredVariable = this.cityVar2.filter((item: any) => aa.includes(item.city_name));
  this.cityList = filteredVariable
}
}
