import { AfterViewInit, Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidatorFn,
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
  selector: 'app-create-lead',
  templateUrl: './create-lead.component.html',
  styleUrls: ['./create-lead.component.scss'],
})

export class CreateLeadComponent implements OnInit , AfterViewInit{
  Login_user_id: any = localStorage.getItem('signInUser');
  loginUserId: any = JSON.parse(this.Login_user_id).employee_id
  loginUserName: any = JSON.parse(this.Login_user_id).first_name

  leadForm: FormGroup;
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
  contact_list: any;
  c_source: any;
  leadeCreatedBy_single: any;
  AchievemenDataStore: any;
  leadCreatedName: any;
  gmdData: any;
  medvalue: boolean;
  categoryValue: boolean;
  type: any;
  countryNewId: any;
  countryss_id: any;
  country_value: any;
  state_value: any;
  state_id: any;
  states_id: any;
  city_value: any;
  city_id: any;
  phoneCode: any;
  newPhoneCode: any;
  variables: any = [];
  variable:any =[];
  countryVar:any=[];
  countryVar2:any=[];
  stateVar:any=[];
  stateVar2:any=[];
  cityVar:any=[];
  cityVar2:any=[];
  localRoleData: string | null;
  existingCutomer: any;
  existingData: any;
  contactData: any;
  assignContactData: any;
  existingLeadId: any;
  leadAssignId: any;
  certificate_value1: any;
  certificateListCopy: any;
  standardProgramName: any;
  contactSource: any;

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
      associated_company: new FormControl(null, [Validators.required, Validators.maxLength(300)]),
      segment: new FormControl(null, Validators.required),
      certificate_type: new FormControl(null, Validators.required),
      first_name: new FormControl(null, [Validators.required,Validators.maxLength(200), Validators.pattern('^[a-zA-Z]*$')]),
      last_name:  new FormControl(null, [Validators.required,Validators.maxLength(200), Validators.pattern('^[a-zA-Z]*$')]),
      email: new FormControl(null, [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]),
      emplyoment_type: new FormControl(null),
      job_title: new FormControl(null, [Validators.required,Validators.maxLength(200),]),
      street_address: new FormControl(null, [Validators.required,Validators.maxLength(200)]),
      address2: new FormControl(null, [Validators.required,Validators.maxLength(200)]),
      city: new FormControl(null, Validators.required),
      state: new FormControl(null, Validators.required),
      country: new FormControl(null, Validators.required),
      postal_code_id: new FormControl(null, [Validators.maxLength(6),  Validators.pattern('^[0-9]{0,6}$'), 
        this.noNegativeValues()]),
      postal_code: new FormControl(null),
      region: new FormControl(null, Validators.required),//
      regional_bussiness_lead: new FormControl(null, Validators.required),//
      global_managing_director: new FormControl(null, Validators.required),
      global_manager_sales: new FormControl(null, Validators.required),
      website_url: ['', [Validators.pattern(urlRegex)]],
      phone_number: new FormControl(null),
      mobile_number: new FormControl(null,[ Validators.required,   Validators.maxLength(10),Validators.pattern('^[0-9]*$'),
      Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$')
      // Validators.pattern('^[0-9]*$'),
      // Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$')
    
    ]),
      dqs_contact_source: new FormControl(null, Validators.required),
      contact_owner: new FormControl(null, Validators.required),
      lead_created_date: new FormControl(null, Validators.required),
      lead_created_by_name: new FormControl(null, Validators.required),
      standard_program_assement: new FormControl(null, Validators.required),
      remarks: new FormControl(null,Validators.maxLength(200)),
      lead_validate_stage: new FormControl(null),
      validated_by: new FormControl(null),
      lead_validated_date: new FormControl(null),
      lead_validate_remarks: new FormControl(null),
      lead_assgn_contact_owner: new FormControl(null),
      assigned_by: new FormControl(null),
      assigned_date: new FormControl(null),
      stage: new FormControl(null),
      lead_assgn_remark: new FormControl(null),
      br_number1: new FormControl(null),
      categories: new FormControl(null),
      phone_code: new FormControl(null),
      mobile_code: new FormControl()
    });
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
    this.getCountry();
    this.activeroute.queryParams.subscribe(params => {
      

      this.id = params;
      this.lead_id = this.id.lead_id;
      this.type = this.id.type;     
      if (this.lead_id != undefined) {
          this.leadService.getByIdLead(this.lead_id).subscribe((res: any) => {
            this.singleLeadData = res.data;
            if(this.singleLeadData && this.singleLeadData?.segment == 2){
              this.medical = true
            }
            this.configService.getProducts(res.data.certificate_type).subscribe((res:any)=>{
              this.assesmentList=res.data
            },(err:any)=>{
              this.toast.warning("no data found")
            })
            this.patchFormvalueTwo();
            if (res.data.dqs_contact_source === '4') {
              this.get_All_Channel_Partner();
            } else {
              this.allAchievement = this.AchievemenDataStore;
            }
          });
              }
   
    });
    this.globalManager();
    this.getAchievementList();
    this.patchFormvalue();
    this.getCategory();
    this.getCompanyList();
    this.getAllSegment();
    this.getCity();
    this.getAchievementListt();
    this.regionalBusiness();
    this.globalManagerales();
    this.getStandardProgram();
    this.get_cp_contact();
    this.mainId = localStorage.getItem('EmpMainId');
    if (this.mainId != undefined) {
      this._empRegistration.getByUserId(this.mainId).subscribe((res) => {
        this.mainEmployeeData = res.data;
        this.getAchievementList();
        this.patchFormvalue();
        this.globalManager();
        // if (!this.id) {
        // }
      });

      let dataRole:any=localStorage.getItem('signInUser');
      let loginUser = JSON.parse(dataRole);
      this.localRoleData=loginUser.role;
      console.log(dataRole,'dataRole');
      console.log(this.localRoleData,'this.localRoleData');
      
      
    }
    this.getExitingCustomer()

  }

  ngAfterViewInit(): void {
    // setTimeout(() => {
    //   if(this.singleLeadData && this.singleLeadData.country != null || undefined){

    //     this.getCountryID(this.singleLeadData?.country)
    //   }
    // }, 500);
  }

  globalManager() {
    this._configurationalMasterService.ListGmd().subscribe((params: any) => {
      this.gmdData = params.data[0];
    });
  }

  medicalFlow(e: any) {
    const segment_id = e.value;
    console.log(segment_id, "segment_id");
    this.leadService.getCertificateByID(segment_id).subscribe((res: any) => {

      this.certificateList = res.data.new_certificate_types;
      console.log(this.certificateList, ' this.certificateList');
      this.certificateListCopy = res.data;
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
    // this.cutomerType = true;

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
      city: this.singleLeadData?.city,
      state: this.singleLeadData?.state,
      country:this.singleLeadData?.country,
      postal_code_id: this.singleLeadData?.postal_code_id,
      postal_code: this.singleLeadData?.postal_code,
      pincode: this.singleLeadData?.pincode,
      region: this.singleLeadData?.region,
      regional_bussiness_lead: this.singleLeadData?.regional_bussiness_lead,
      global_managing_director: this.gmdData?.director_name,
      global_manager_sales: this.singleLeadData?.global_manager_sales,
      website_url: this.singleLeadData?.website_url,
      phone_number: this.singleLeadData?.phone_number,
      mobile_number: this.singleLeadData?.mobile_number,
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
    this.patchCountryCode(e.value);
    this.leadService.getStateByID(e.value).subscribe((res: any) => {
      this.stateList = res.data;
      console.log(this.stateList,'this.stateList');
      
      this.stateVar = this.stateList.map((res: any) => res.states_name);
      this.stateVar2 = this.stateList;
      this.cityList = [];
    });
  }
  getCity_name(e: any) {
    for (let item of this.cityList) {
      if (item.city_name == e) {
        this.city_id = item.states_id;
        this.cityName = item?.city_name;
      }
    }
  }
  getStateList(e: any) {
    this.cityList = []
    console.log('sate *******************',this.stateList)
    for (let item of this.stateList) {
      if (item.states_name == e) {
        this.states_id = item.states_id;
        this.stateName = item?.states_name;
      }
    }
    this.leadService.getCityByID(this.states_id).subscribe((res: any) => {

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
  fetchSeriesState(value: String) {
    if (value === '') {
      return (this.searchResult = []);
    }
    this.searchResult = this.stateList?.filter(function (series: any) {

      return series.states_name.toLowerCase().startsWith(value);
    });
  }
  fetchSeriesCity(value: String) {
    if (value === '') {
      return (this.searchResult = []);
    }
    this.searchResult = this.cityList?.filter(function (series: any) {

      return series.city_name.toLowerCase().startsWith(value);
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

      this.patchFormvalue();
    });
  }

  patchFormvalue() {
    this.leadForm.patchValue({
      customer_type: "New User",
      // site_audit: "No",
      global_managing_director: this.gmdData?.director_name,
      contact_owner: this.mainEmployeeData?.first_name,
      lead_created_by_name: this.loginUserName,
      lead_created_date: this.myDate,
    });
  }

  getAchievementList() {
    this.recruitService.getAllAchivement().subscribe(
      (res: any) => {

        this.AchievemenDataStore = res.data;
      },
      (err) => {

      }
    );

    this.leadService.getLead().subscribe((res: any) => {

      this.allData = res.result;
    });
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


  childSite() {
    if (this.newChildData?.segment != 'null || undefined') {
      this.leadService.getCertificateByID(this.newChildData?.segment).subscribe((res: any) => {
        this.certificateList = res.data.new_certificate_types;
      });
      this.leadService.getRegionByID(this.newChildData?.segment).subscribe((res: any) => {
        this.regionSList = res.data.new_regions;
      });
      this.leadService.getCategoryBySegID(this.newChildData?.segment).subscribe((res: any) => {
        this.CategorySList = res.data.new_category_masters;

      });
    }
    if (this.companyData?.certificate_type != 'null || undefined') {
      this.leadService.getAssesmentByID(this.companyData?.certificate_type).subscribe((res: any) => {
        this.assesmentList = res.data[0].newitemlist;
      });
    }
    this.leadService.getRBuisnessHead(this.newChildData?.region).subscribe((res: any) => {
      this.regionalbheadList = res.data;

    });
    this.leadService.getGlobalManagerSales(this.newChildData?.region).subscribe((res: any) => {
      this.globalMsalesList = res.data;

    });
    if (this.newChildData?.country != 'undefined || null') {
      this.leadService.getStateByID(this.newChildData?.country).subscribe((res: any) => {

        this.stateList = res.data;
      });
    }
    if (this.newChildData?.state != 'undefined || null') {
      this.leadService.getCityByID(this.newChildData?.state).subscribe((res: any) => {

        this.cityList = res.data;
      });
    }
    if (this.newChildData?.city != 'undefined || null') {
      this.leadService.getPinCodeNew(this.newChildData?.city).subscribe((res: any) => {
        this.pinCodeList = res.data;

      });
    }
    this.leadForm.patchValue({
      first_name: this.newChildData?.first_name,
      last_name: this.newChildData?.last_name,
      email: this.newChildData?.email,
      job_title: this.newChildData?.job_title,
      street_address: this.newChildData?.street_address,
      address2: this.newChildData?.address2,
      country:this.newChildData?.country,
      city: this.newChildData?.city,
      state: this.newChildData?.state,
      postal_code_id: this.newChildData?.postal_code_id,
      postal_code: this.newChildData?.postal_code,
      region: this.newChildData?.region,
    });
    this.leadStatus = true;
    if(this.newChildData && this.newChildData.country != null || undefined){
      this.patchCountryCode(this.newChildData?.country)
    }
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
        // this.variables = this.allCompanyList.map((res: any) => res.associated_company);
        // this.variable = this.allCompanyList
      },
      (err) => {

      }
    );
  }

  customerType(e:any) {

    console.log(e.target.defaultValue,'existing customer');
    this.existingCutomer=e.target.defaultValue
    this.cutomerType = true;
    this.leadForm.reset();
    this.leadForm.patchValue({
      customer_type: "Existing User",
      global_managing_director: this.gmdData?.director_name,
      lead_created_date: this.myDate,
      contact_owner: this.mainEmployeeData?.first_name,
      site_audit: "No",
      lead_created_by_name: this.loginUserName})
  }

  customerTypeNew() {
    this.cutomerType = false;
    this.leadForm.reset();
    this.leadForm.patchValue({
      customer_type: "New User",
      global_managing_director: this.gmdData?.director_name,
      lead_created_date: this.myDate,
      site_audit: "No",
      contact_owner: this.mainEmployeeData?.first_name,
      lead_created_by_name: this.loginUserName})
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
  
  siteAuditNew() {
    this.sitAudit = false;
  }

  back() {
    this.route.navigate(['master/lead/lead-management/generate-lead']);
  }


  certificateChange(event: any) {
    const certi_id = event.value;
    console.log(certi_id, "certi_id");

    this.configService.getProducts(certi_id).subscribe((res:any)=>{
      this.assesmentList=res.data
      if(res.data.length==0){
        this.toast.warning("No Standard/Program/Assessment Exist")

      }
    },(err:any)=>{
      this.toast.warning("no data found")
    })

    this._configurationalMasterService.getProducts(certi_id).subscribe((res:any)=>{
      this.assesmentList=res.data
    })
    let certificate_value1
    console.log(this.certificateList,'this.certificateList');
    
    this.certificateList.forEach((item: any) => {

      if (certi_id === item.certificate_type_id) {
        certificate_value1 = item.certificate_type_name
      }
    });

    console.log(certificate_value1);
    let segment =  this.leadForm.get('segment')?.value
    let siteAuditValue;
    if(segment  == 1){
      if (certificate_value1 === "Non-Cert") {
        siteAuditValue = "No";
      } else {
        siteAuditValue = "Yes";
      }
    }
    this.leadForm.get('site_audit')?.patchValue(siteAuditValue);
    this.leadForm.get('site_audit')?.disable();
    
  }


  submitForm() {
    console.log('states_id',this.states_id);
    
    this.submitted = false;
   Object.keys(this.leadForm.controls).forEach((key:string) => {
      const controlErrors = this.leadForm.get(key)?.errors;
      if (controlErrors != null) {
        console.log(`Control '${key}' has errors: `, controlErrors);
      }
    });
    if (this.leadForm.invalid) {
      this.toast.error(
        'Required fields should not be empty or Invalid.',
        'Error Occurred!'
      );
      return;
    }
    let val = this.leadForm.value;
    console.log('val of form55555555', val);

    for (let item of this.countryList) {
      if (item.countryss_id == val.country) {
        this.countryss_id = item.countryss_id;
        console.log('country id', this.countryss_id)
        this.countryName = item.countryss_name;
        console.log('country name', this.countryName)
      }
    }
    for (let item of this.stateList) {
      if (item.states_id == val.state) {
        this.stateName = item.states_name;
      }
    }
    for (let item of this.cityList) {
      if (item.city_id == val.city) {
        this.city_id = item?.city_id;
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
    for (let item of this.allAchievement) {
      if (item.employee_id == val.lead_created_by_name) {
        this.leadCreatedName = `${item?.first_name} ${item?.last_name}`
      }
    }

    this.submitted = true;
let defaulStatus:any;
    if(this.existingCutomer=='Existing User' && this.localRoleData=='SP'){
defaulStatus="Account"
    }else{
      defaulStatus="Open"
    }
    const siteAuditValue = this.leadForm.get('site_audit')?.value;

      let data: any = {
        customer_type: val.customer_type,
        new_location_site: val.new_location_site || ' ',
        multiple_site_audit: siteAuditValue,
        associated_company: val.associated_company,
        segment: Number(val.segment) || ' ',
        segment_name: this.segment_name,
        certificate_type: val.certificate_type || ' ',
        certificate_type_name: this.certificate_type_name,
        first_name: val.first_name || ' ',
        last_name: val.last_name || ' ',
        email: val.email || ' ',
        emplyoment_type: val.emplyoment_type || ' ',
        job_title: val.job_title || ' ',
        street_address: val.street_address || ' ',
        address2: val.address2 || ' ',
        city: Number(this.city_id) || ' ',
        city_name: this.cityName,
        state: Number(this.states_id) || val.state,
        state_name: this.stateName,
        country: Number(this.countryss_id) || ' ',
        country_name: this.countryName,
        postal_code_id: Number(val.postal_code_id) || '',
        postal_code: this.pinCodeName || ' ',
        region: Number(val.region) || ' ',
        region_name: this.regionName || '',
        categories: val.categories || 1,
        br_number: val.br_number1 || ' ',
        regional_bussiness_lead: Number(val.regional_bussiness_lead) || ' ',
        regional_bussiness_lead_name: this.regional_bussiness_name || '',
        global_managing_director: val.global_managing_director || ' ',
        global_manager_sales: Number(val.global_manager_sales) || ' ',
        global_manager_sales_name: this.global_manager_sales_name || ' ',
        website_url: val.website_url || ' ',
        phone_number:  val.phone_number || ' ',
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
        lead_assgn_contact_owner:this.assignContactData|| val.lead_assgn_contact_owner || ' ',
        assigned_by: val.assigned_by || ' ',
        stage: val.stage || 'Approved',
        lead_assgn_remark: val.lead_assgn_remark || ' ',
        status: defaulStatus,
        dqs_Contact_id: this.c_source?.contact_source_id || val.dqs_contact_source,
        inter_company: "false",
        dqs_Contact_name: this.c_source.contact_source_name,
        // lead_created_by_name: this.leadCreatedName,
        lead_created_by_name: this.loginUserName,
        contact_owner:this.contactData,
        // lead_created_by_id :Number(this.leadeCreatedBy_single?.employee_id) || Number(this.leadeCreatedBy_single?.channel_partner_id),
        // lead_created_by_name:`${this.leadeCreatedBy_single?.first_name} ${this.leadeCreatedBy_single?.last_name}`,
        lead_created_by_id: this.loginUserId,
        leadIdExisting:this.existingLeadId,
        lead_assgn_contact_ownerCopy:this.leadAssignId,
        phone_code: val.phone_code,
        standard_program_assement_name:this.standardProgramName

      };

      if (this.leadeCreatedBy_single?.channel_partner_id) {
        data.channel_Partner_id = this.leadeCreatedBy_single?.channel_partner_id
        data.channel_Partner_name = `${this.leadeCreatedBy_single?.first_name} ${this.leadeCreatedBy_single?.last_name}`
      };

      console.log('data', data)
      this.leadService.createLead(this.loginUserId,data).subscribe(
        (res: any) => {

          this.lead_id = res.data.lead_genration_id;
          this.toast.success('Lead Created Successfully..');
          if(val.customer_type=='Existing User' && this.localRoleData=='SP'){
            this.route.navigate(['master/lead/lead-account'])
            setTimeout(() => {
              this.reloadCurrentRoute()   
            }, 400);
          }else{
            this.route.navigate(['master/lead/lead-management']);
          }
        },
        (err: any) => {

          this.toast.error(err.error.message);
          this.clearInput();
        }
      );
    // }
  }

  reloadCurrentRoute() {
    let currentUrl = this.route.url;
    this.route.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.route.navigate([currentUrl]);
    });
  }

  // edit lead function
  UpdateForm() {
   Object.keys(this.leadForm.controls).forEach((key:string) => {
      const controlErrors = this.leadForm.get(key)?.errors;
      if (controlErrors != null) {
        console.log(`Control '${key}' has errors: `, controlErrors);
      }
    });
    this.submitted = false;
    if (this.leadForm.invalid) {
      this.toast.error('Required fields should not be empty or Invalid.', 'Error Occurred!');
      return;
    }
    if (this.lead_id != null) {
      let val = this.leadForm.value;
      console.log(val);
      const siteAuditValue = this.leadForm.get('site_audit')?.value;

      let data: any = {
        customer_type: val.customer_type,
        new_location_site: val.new_location_site || ' ',
        multiple_site_audit: siteAuditValue,
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
        br_number: val.br_number1 || ' ',
        regional_bussiness_lead: val.regional_bussiness_lead || ' ',
        global_managing_director: val.global_managing_director || ' ',
        global_manager_sales: val.global_manager_sales || ' ',
        website_url: val.website_url || ' ',
        phone_number: val.phone_number || ' ',
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
        lead_assgn_contact_owner: val.lead_assgn_contact_owner || ' ',
        assigned_by: val.assigned_by || ' ',
        stage: val.stage || 'Approved',
        lead_assgn_remark: val.lead_assgn_remark || ' ',
        standard_program_assement_name:this.standardProgramName,
        status: 'Open',

        dqs_Contact_id: this.c_source?.contact_source_id || val.dqs_contact_source,
        dqs_Contact_name: this.c_source?.contact_source_name,
        lead_created_by_name: this.leadCreatedName,
        // lead_created_by_name: this.leadeCreatedBy_single?.employee_id || this.leadeCreatedBy_single?.channel_partner_id,
        lead_created_by_id: `${this.leadeCreatedBy_single?.first_name} ${this.leadeCreatedBy_single?.last_name}`,
      };

      if (this.leadeCreatedBy_single?.channel_partner_id) {
        data.channel_Partner_id = this.leadeCreatedBy_single?.channel_partner_id
        data.channel_Partner_name = `${this.leadeCreatedBy_single?.first_name} ${this.leadeCreatedBy_single?.last_name}`
      };

      this.leadService.editLead(this.lead_id, data).subscribe((res: any) => {


        this.toast.success("Lead Updated Successfully..")
        this.route.navigate(['master/lead/lead-management']);
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

  contact_source_cahnge(e: any) {
    this.c_source = this.contact_list.find((a: any) => a.contact_source_id === e.value);
    if (e.value === 4) {
      this.get_All_Channel_Partner();
    } else {
      this.allAchievement = this.AchievemenDataStore
    }

  };

  lead_created_by_nameChange(e: any) {
    this.leadeCreatedBy_single = this.allAchievement.find((a: any) => a.employee_id || a.channel_partner_id === e.value)

  }

  get_cp_contact() {
    this.leadService.get_contact().subscribe(
      (res: any) => {
        this.contact_list = res.data;

      }, (err) => {

      }
    )
  };

  get_All_Channel_Partner() {
    this.leadService.get_All_Channel_Partner().subscribe(
      (res: any) => {
        this.allAchievement = res.data;

      }, (err) => {

      }
    )
  };


  public toggleInputReadonly() {
    this.inputReadonly = !this.inputReadonly;
  }
  getCurrentRoute(): string {
    return this.activeroute.snapshot.url.map(s => s.path).join('/')
}

// fun1(e: any) {
//   const aa = e
//   let filteredVariable = this.variable.filter((item: any) => aa.includes(item.associated_company));
//   this.allCompanyList = filteredVariable
//   console.log(this.allCompanyList)
// }

countryfilter(e:any){
  const aa = e
  let filteredVariable = this.countryVar2.filter((item: any) => aa.includes(item.countryss_name));
  this.countryList = filteredVariable
  console.log(this.countryList,'this.countryList')
}

stateFilter(e:any){
  const aa = e
  let filteredVariable = this.stateVar2.filter((item: any) => aa.includes(item.states_name));
  this.stateList = filteredVariable
  console.log(this.stateList,'this.stateList')
}
cityFilter(e:any){
  const aa = e
  let filteredVariable = this.cityVar2.filter((item: any) => aa.includes(item.city_name));
  this.cityList = filteredVariable
  console.log(this.cityList,'this.cityList')
}

  convertToLowerCase(inputElement: HTMLInputElement) {
    const currentValue = inputElement.value;
    inputElement.value = currentValue.toLowerCase(); 
  }


  patchCountryCode(id:any){
    this.countryList.forEach((res:any) =>{
      if(res.countryss_id == id){
          let code = "+" + res.phone_code;
          this.leadForm.patchValue({
            phone_code: code,
            mobile_code: code
          })
      }
    })
}

getExitingCustomer(){
  this.leadService.getExistingCustomerCreate(this.mainId).subscribe((res:any)=>{
    this.existingData=res.data;
    console.log('tesryt', this.existingData);
    this.variables = this.existingData.map((res: any) => res.associated_company);
    this.variable = this.existingData
  })
}
checkComp(e: any,id:any,lead_aasignId:any) {
console.log(id,'lead id select');
console.log(lead_aasignId,'lead_aasignId');

this.existingLeadId=id;
this.leadAssignId=lead_aasignId;
  for (let item of this.existingData) {
    if (item.associated_company === e) {
      this.companyData = item;
      this.leadNewId = this.companyData?.lead_genration_id;

    }
  }
  console.log(this.companyData);
  this.leadService.getByIdLead(this.leadNewId).subscribe((res: any) => {
    this.newChildData = res.data;
    this.configService.getProducts(res.data.certificate_type).subscribe((res:any)=>{
      this.assesmentList=res.data
    },(err:any)=>{
      this.toast.warning("no data found")
    })

  });
  if (this.companyData?.segment != 'null || undefined') {
    this.leadService.getCertificateByID(this.companyData?.segment).subscribe((res: any) => {
      this.certificateList = res.data.new_certificate_types;
      console.log(this.certificateList,"certificate list");
      
    });
    this.leadService.getRegionByID(this.companyData?.segment).subscribe((res: any) => {
      this.regionSList = res.data.new_regions;
    });
    this.leadService.getCategoryBySegID(this.companyData?.segment).subscribe((res: any) => {
      this.CategorySList = res.data.new_category_masters;
      console.log(this.CategorySList,"certificate list");


    });
  }
  // if (this.companyData?.certificate_type != 'null || undefined') {
  //   this.leadService.getAssesmentByID(this.companyData?.certificate_type).subscribe((res: any) => {
  //     this.assesmentList = res.data[0].newitemlist;
  //     console.log(this.assesmentList,"certificate list");
  //   });
  // }
console.log(this.companyData,'this.companyData');
this.contactData=this.companyData?.contact_owner;
this.assignContactData=this.companyData?.lead_assgn_contact_owner;

  this.leadForm.patchValue({
    segment: this.companyData?.segment,
    certificate_type: this.companyData?.certificate_type,
    br_number1: this.companyData?.br_number,
  });
  
  let siteAuditValue;
  if (this.companyData?.certificate_type === "Non-Cert") {
    siteAuditValue = "No";
  } else {
    siteAuditValue = "Yes";
  }
  
  this.leadForm.get('site_audit')?.patchValue(siteAuditValue);
  this.leadForm.get('site_audit')?.disable();
  this.leadForm.get('site_audit')?.disable();
}

fun1(e: any) {
  const aa = e
  let filteredVariable = this.variable.filter((item: any) => aa.includes(item.associated_company));
  this.existingData = filteredVariable
  console.log(this.allCompanyList)
}
standardSle(e:any){
  console.log(e,'eee');
  this.standardProgramName=e.product_master_name;
  console.log(this.standardProgramName,' this.standardProgramName');
  
}
selectSource(e:any){
console.log(e,'eeeee');
this.contactSource=e.contact_source_name;

}
}
