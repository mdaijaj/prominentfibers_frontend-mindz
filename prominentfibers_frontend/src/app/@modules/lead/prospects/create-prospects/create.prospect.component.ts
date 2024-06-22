import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { EmpRegistrationService } from 'src/app/@shared/services/emp-registration.service';
import { LeadService } from 'src/app/@shared/services/lead.service';
import { RecruitService } from 'src/app/@shared/services/recruitment.service';
import { ConfigurationalmasterService } from '../../../../@shared/services/configurationalmaster.service'
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-prospect',
  templateUrl: './create-prospect.component.html',
  styleUrls: ['./create-prospect.component.scss']
})
export class ProspectCreateComponent {
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
  newContact: boolean = false;
  lead_id: any;
  singleLeadData: any;
  val: any;
  public searchResult: any;
  mainId: string | null;
  mainEmployeeData: any;
  allAchievement: any;
  submitted: boolean;
  industryList: any;
  now = new Date();
  year = this.now.getFullYear();
  month = this.now.getMonth();
  // day = this.now.getDay();
  date = this.now.getDate();
  maxDate = moment({ year: this.year + 100, month: this.month, date: this.date }).format('YYYY-MM-DD');
  minDate = moment({ year: this.year - 0, month: this.month, date: this.date }).format('YYYY-MM-DD');
  allCompanyList: any;
  allData: any;
  companyData: any;
  myDate = new Date();
  leadNewId: any;
  unreg: boolean = false;
  gstreg: boolean = false;
  leadUpdate: any;
  stateList:any;
  countryList: any[] = [];
  cityList: any;
  pinCodeList: any;
  pinCodeTrue: boolean = true;
  allDataOne: any;
  allDataTwo: any;
  allDataMan: any;
  gstM: boolean;
  nonCertTrue: boolean = false;
  segmentList: any;
  certificateList: any;
  regionSList: any;
  CategorySList: any;
  regionalbheadList: any;
  globalMsalesList: any;
  assesmentList: any;
  segmentValue: boolean = false;
  certificate_type_name: any;
  segment_name: any;
  pinCodeName: any;
  global_manager_sales_name: any;
  regional_bussiness_name: any;
  regionName: any;
  cityName: any;
  stateName: any;
  countryName: any;
  inputReadonly = true;
  ownerData: any;
  ownerName: any;
  assignData: any;
  asignName: any;
  contact_list: any;
  showValue: boolean=true;
  medvalue: boolean;
  dataNew: {};
    //for filter start
    variables: any = [];
    variable: any = [];
    public filteredList1 = this.variables.slice();
    filterData: any = [];
    checkData: any = []
    //for filter end
    countryVar:any=[];
    countryVar2:any=[];
    stateVar:any=[];
    stateVar2:any=[];
    cityVar:any=[];
    cityVar2:any=[]; 
    contactOwner:any =[];
    contactOwner2:any =[];
  allSalesPersonList: any;
  existingData: any;
  existingLeadId: any;
  leadAssignId: any;
  newChildData: any;
  contactData: any;
  assignContactData: any;
  constructor(
    private configService: ConfigurationalmasterService,
    private fb: FormBuilder,  private _empRegistration: EmpRegistrationService,
    private leadService: LeadService, private toast: ToastrService,
    private route: Router, private recruitService: RecruitService, private activeroute: ActivatedRoute) {
    this.leadForm = this.fb.group({
      customer_type: new FormControl(null),
      site_audit: [{ value: ''}],
      new_location_site: new FormControl(null),
      associated_company: new FormControl(null),
      br_number: new FormControl(null),
      urd_number: new FormControl(null),
      segment: new FormControl(null,Validators.required),
      categories: new FormControl(null),
      certificate_type: new FormControl(null,Validators.required),
      first_name: new FormControl(null,Validators.required),
      last_name: new FormControl(null,Validators.required),
      email: new FormControl(null,[Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]),
      emplyoment_type: new FormControl(null,Validators.required),
      job_title: new FormControl(null,Validators.required),
      street_address: new FormControl(null,Validators.required),
      address2: new FormControl(null,Validators.required),
      lead_created_by_name: new FormControl(null,Validators.required),
      city: new FormControl(null,Validators.required),
      state: new FormControl(null,Validators.required),
      country: new FormControl(null,Validators.required),
      postal_code_id: new FormControl(null,Validators.required),
      region: new FormControl(null,Validators.required),
      regional_bussiness_lead: new FormControl(null,Validators.required),
      global_managing_director: new FormControl(null,Validators.required),
      global_manager_sales: new FormControl(null,Validators.required),
      website_url: new FormControl(null),
      phone_number: new FormControl(null),
      mobile_number: new FormControl(null,[ Validators.required,   Validators.maxLength(10),Validators.pattern('^[0-9]*$'),
      Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$')
      // Validators.pattern('^[0-9]*$'),
      // Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$')
    
    ]),     
      dqs_contact_source: new FormControl(null,Validators.required),   
      lead_created_date: new FormControl(null,Validators.required),
      standard_program_assement: new FormControl(null,Validators.required),
      remarks: new FormControl(null),
      lead_validate_stage: new FormControl(null),
      validated_by: new FormControl(null,Validators.required),
      lead_validated_date: new FormControl(null,Validators.required),
      lead_validate_remarks: new FormControl(null),
      lead_assgn_contact_owner: new FormControl(null,Validators.required),
      assigned_by: new FormControl(null),
      assigned_date: new FormControl(null),
      stage: new FormControl(null),
      lead_assgn_remark: new FormControl(null),
      industry_sector:  new FormControl(null,Validators.required),
      customer_category: new FormControl(null,Validators.required),
      employee_count: new FormControl(null),
      company_remarks: new FormControl(null),
      gst_applicable: new FormControl(null,Validators.required),
      gst_number: new FormControl(null, [Validators.pattern('([0-9]){2}([A-Z]){5}([0-9]){4}([A-Z]){1}([0-9]){1}([0-9]){1}([0-9]){1}$')]),
      pan_number: new FormControl(null, [Validators.pattern('([A-Z]){5}([0-9]){4}([A-Z]){1}$')]),
      tan_number: new FormControl(null, [Validators.pattern('([A-Z]){4}([0-9]){5}([A-Z]){1}$'),]),
      phone_code: new FormControl(null),
      mobile_code: new FormControl()
    })
  }

  onEmailInput(event: any) {
    const inputElement = event.target as HTMLInputElement;
    const lowercaseValue = inputElement.value.toLowerCase();
    this.leadForm.controls?.['email'].setValue(lowercaseValue);
  }

  ngOnInit() {
    this.getAllIndustry();
    this.getAllSegment();
    this.getCountry();
    this.getAchievementListt();
    this.regionalBusiness();
    this.globalManagerales();
    this.getAllSalesPerson();
    this.get_cp_contact();
    

    this.activeroute.queryParams.subscribe((params : any) => {
      this.id = params;
      this.lead_id = this.id.lead_id;
      this.leadUpdate= this.id.type;
      console.log('type value', this.leadUpdate)
      if(params.lead_id ==null || undefined){
        this.showValue = false;
      }else{
        this.showValue = true;
        this.leadForm.controls['customer_type'].disable();
        this.leadForm.controls['site_audit'].disable();
      }
     
      if (this.lead_id === undefined || null) {
        this.newContact = true;

      }
   
       this.leadService.getByIdLead(this.lead_id).subscribe((res:any) => {
          this.singleLeadData = res.data;
          
          this.configService.getProducts(res.data.certificate_type).subscribe((res:any)=>{
            this.assesmentList=res.data
          },(err:any)=>{
            this.toast.warning("no data found")
          })
          console.log('single lead data-->', this.singleLeadData)
           if (this.singleLeadData?.certificate_type_name === "Non-Cert") {
            this.nonCertTrue = false;
  
          } else {
            this.nonCertTrue = true;
  
          }
          if(this.singleLeadData?.segment_name === 'MED'){
            this.medvalue = true;
          }
      
          this.patchFormvalue();
          
        })
      

     
    });
    this.getAchievementList();
      this.patchFormvalue();
      this.getCategory();
    this.mainId = localStorage.getItem("EmpMainId");
    console.log('test',this.mainId);
    
    this.getExitingCustomer()

      if (this.mainId != undefined) {
        this._empRegistration.getByUserId(this.mainId).subscribe((res) => {
          this.mainEmployeeData = res.data;
          console.log(this.mainEmployeeData.first_name);
          
          this.getAchievementList();
          this.patchFormvalue();
          this.patchFormvalueNew();
        })
      }

      // if(!this.lead_id){
       
      // }
  }
  patchFormvalueNew() {
    this.leadForm.patchValue({
      global_managing_director: 'Dr Murugan',
      lead_created_by_name: this.singleLeadData?.lead_created_by_name,
      lead_validated_date: this.myDate,
      assigned_by: this.singleLeadData?.assigned_by,
      assigned_date: this.myDate,
    });
  }
  unregisteredDealer() {
    this.unreg = true;
    this.gstreg = false;
  }
  notApplicable() {
    this.unreg = false;
    this.gstreg = false;
  }
  gstDealer() {
    this.gstreg = true;
    this.unreg = false;
  }
  get_cp_contact(){
    this.leadService.get_contact().subscribe(
      (res:any)=>{
        this.contact_list = res.data;

      },(err)=>{

      }
    )
  };
  getCompanyList() {
    this.leadService.getCompany().subscribe(
      (res: any) => {

        this.allCompanyList = res.result;
      },
      (err) => {

      }
    );
  }

  segmentSelectChange(event: any){
    const segment_id = event.value;

     this.leadService.getCertificateByID(segment_id).subscribe((res:any) => {
       this.certificateList = res.data.new_certificate_types;
     });

     this.leadService.getRegionByID(segment_id).subscribe((res:any) => {
       this.regionSList = res.data.new_regions;
     });

     this.leadService.getCategoryBySegID(segment_id).subscribe((res:any) => {
       this.CategorySList = res.data.new_category_masters;
     });

     if(event.value==='MED'){
       this.segmentValue = true;
     }
     else
     {
       this.segmentValue = false;
     }
     this.leadForm.get('certificate_type')?.reset(),
     this.leadForm.get('regional_bussiness_lead')?.reset(),
     this.leadForm.get('global_manager_sales')?.reset(),
     this.leadForm.get('region')?.reset()


 }
 certificate_value1: any;

 certificateChange(event: any){
  const certi_id = event;
     this.configService.getProducts(certi_id).subscribe((res:any)=>{
      this.assesmentList=res.data
    },(err:any)=>{
      this.toast.warning("no data found")
    })



   this.certificateList.forEach((item: any) => {

    if(certi_id === item.certificate_type_id)
    {
     this.certificate_value1 = item.certificate_type_name
    }
    console.log(this.certificate_value1);
    
  });




  if (this.certificate_value1 === "Non-Cert") {
    this.leadForm.patchValue({
     site_audit: "No"
   })
  } else {
    this.leadForm.patchValue({
     site_audit: "Yes"
   })
  }

  // this.leadService.getAssesmentByID(certi_id).subscribe((res:any) => {

  //   this.assesmentList = res.data[0].newitemlist;

  // });

  if(event.value==='Non Cert'){
   this.sitAudit = true;
  }
  else
  {
    this.segmentValue = false;
  }


 }

 getBuisnessHead(e:any){
  const region_id = e.value;
  this.leadService.getRBuisnessHead(region_id).subscribe((res:any) => {
  this.regionalbheadList = res.data;
  this.leadForm.get('regional_bussiness_lead')?.reset(),
  this.leadForm.get('global_manager_sales')?.reset()

 });
 this.leadService.getGlobalManagerSales(region_id).subscribe((res:any) => {
   this.globalMsalesList = res.data;

  });
}
  regionBuisnessList(arg0: string, regionBuisnessList: any) {
    throw new Error('Method not implemented.');
  }

  checkComp(e: any) {

    for (let item of this.allData) {
      if (item.associated_company === e) {
        this.companyData = item;
        this.leadNewId = this.companyData?.lead_genration_id;

      }
    }
  }
  get f() {
    return this.leadForm.controls;
  }

  getAllIndustry() {
    this.configService.listIndustry().subscribe((res: any) => {
      this.industryList = res.data;
      console.log(this.industryList,"industryList");
      
      this.variables = this.industryList.map((res: any) => res.industry_sector_name)
      this.checkData = this.industryList
      this.variable = this.industryList

    });
  }
  fetchSeries(value: String) {
    if (value === '') {
      return this.searchResult = []
    }
    this.searchResult = this.allAchievement.filter_company_name(function (series:any) {

      return series.first_name.toLowerCase().startsWith(value)
    })

  }

  submitNewForm() {
    let val = this.leadForm.value;
    for (let item of this.countryList) {
      if(item.countryss_id == val.country) {
        this.countryName = item.countryss_name;
      }
    }
    for (let item of this.stateList) {
      if(item.states_id == val.state) {
        this.stateName = item.states_name;
      }
    }
    for (let item of this.cityList) {
      if(item.city_id == val.city) {
        this.cityName = item.city_name;
      }
    }
    for (let item of this.regionSList) {
     if(item.new_region_id == val.region) {
        this.regionName = item.new_region_name;
      }

    }
    for (let item of this.regionalbheadList) {

      if(item.new_regional_business_head_id == val.regional_bussiness_lead) {
        this.regional_bussiness_name = item.first_name;
      }

    }
    for (let item of this.globalMsalesList) {

      if(item.new_global_manager_sales_id == val.global_manager_sales) {
        this.global_manager_sales_name = item.first_name;
      }

    }


    for(let item of this.pinCodeList){
      if(item.pincode_id == val.postal_code_id) {
        this.pinCodeName = item.pincode_name.toString();
      }

    }
    for(let item of this.certificateList){
      if(item.certificate_type_id == val.certificate_type) {
        this.certificate_type_name = item.certificate_type_name;
      }

    }
    for(let item of this.segmentList){
      if(item.segment_id == val.segment) {
        this.segment_name = item.segment_name;
      }

    }
    const data = {
      customer_type: val.customer_type,
        new_location_site: val.new_location_site || ' ',
        multiple_site_audit: val.site_audit || ' ',
        associated_company: val.associated_company,
        segment: Number(val.segment) || ' ',
        segment_name: this.segment_name,
        certificate_type: val.certificate_type || ' ',
        certificate_type_name:this.certificate_type_name,
        first_name: val.first_name || ' ',
        last_name: val.last_name || ' ',
        email: val.email || ' ',
        emplyoment_type: val.emplyoment_type || ' ',
        job_title: val.job_title || ' ',
        street_address: val.street_address || ' ',
        address2: val.address2 || ' ',
        lead_created_by_id: Number(this.mainId),
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
        categories: val.categories,
        br_number1: val.br_number1 || ' ',
        regional_bussiness_lead: Number(val.regional_bussiness_lead) || ' ',
        regional_bussiness_lead_name: this.regional_bussiness_name  || '',
        global_managing_director: val.global_managing_director || 'Dr Murugan',
        global_manager_sales:Number(val.global_manager_sales) || ' ',
        global_manager_sales_name:  this.global_manager_sales_name || ' ',
        website_url: val.website_url || ' ',
        phone_number: val.phone_number || ' ',
        mobile_number: val.mobile_number || ' ',
        dqs_contact_source: val.dqs_contact_source || '1',
        // contact_owner: val.contact_owner || ' ',
        lead_created_by_name: val.lead_created_by_name || this.mainEmployeeData?.first_name,
        lead_created_date: moment(val.lead_created_date).format('YYYY-MM-DD') || ' ',
        lead_validated_date:  val.lead_validated_date,
        standard_program_assement: val.standard_program_assement || ' ',
        remarks: val.remarks || ' ',
        lead_validate_stage: val.lead_validate_stage || ' ',
        validated_by: val.validated_by || ' ',
        lead_validate_remarks: val.lead_validate_remarks || ' ',
        lead_assgn_contact_owner: val.lead_assgn_contact_owner ||this.mainId|| ' ',
        assigned_by: val.assigned_by || ' ',
        stage: val.stage || ' ',
        lead_assgn_remark: val.lead_assgn_remark || ' ',
        customer_category: val.customer_category,
        industry_sector: val.industry_sector,
        employee_count: val.employee_count,
        company_remarks: val.company_remarks,
        gst_applicable: val.gst_applicable,
        gst_number: val.gst_number,
        pan_number: val.pan_number,
        tan_number: val.tan_number,
                // lead_created_by_name:val.lead_created_by_name,
      standard_program_assement_name:this.singleLeadData?.standard_program_assement_name,
      dqs_Contact_name:this.singleLeadData?.dqs_Contact_name,
      // lead_assgn_contact_owner:,
        create_prospect: "true",
        status: 'Prospect',
        phone_code:val.phone_code
    };
    this.dataNew={
      lead_assgn_contact_owner: val.lead_assgn_contact_owner ||this.mainId|| '',
      assigned_by: val.assigned_by,
      assigned_date: moment(val.assigned_date).format('YYYY-MM-DD'),
      stage: val.stage,
      lead_assgn_remark: val.lead_assgn_remark,
      industry_sector: val.industry_sector,
      customer_category: val.customer_category,
      employee_count: val.employee_count,
      company_remarks: val.company_remarks,
      gst_applicable: val.gst_applicable,
      gst_number: val.gst_number,
      pan_number: val.pan_number,
     tan_number: val.tan_number,	
    }

  this.leadService.createLead(this.mainId,data).subscribe(
    (res: any) => {

      this.lead_id = res.data.lead_genration_id;
      this.toast.success('Prospect Created Successfully..');
      this.leadService.editLead(this.lead_id, this.dataNew).subscribe((res:any) => {      
        console.log(res);
      })

      this.route.navigate(['master/lead/lead-prospect']);
    },
    (err: any) => {

      this.toast.error(err.error.message);
    }
  );
  }
  getAllSalesPerson() {
    this.leadService.getAllSalesPerson().subscribe((res:any) => {
      this.allSalesPersonList = res.data;
      console.log(this.allSalesPersonList);
      this.contactOwner = this.allSalesPersonList.map((res: any) => res.first_name)
      this.contactOwner2 = this.allSalesPersonList
    })
  }
  getAchievementList() {
    this.recruitService.getAllAchivement().subscribe(
      (res: any) => {

        this.allAchievement = res.data;
        console.log(this.allAchievement,'this.allAchievement');
        
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
  getAllSegment() {
    this.configService.getAllSegment().subscribe((res: any) => {
      this.segmentList = res.data;

    });
  }

  candidateClick(e:any){

    this.candidateId = e;
    this.recruitService.interViewGetIdBy(e).subscribe((res:any)=>{
      this.interviewGetId=res.data;

      this.patchFormvalue();
    })
  }

  patchFormvalue() {
    if(this.singleLeadData?.segment != 'null || undefined'){
      this.leadService.getCertificateByID(this.singleLeadData?.segment).subscribe((res:any) => {
        this.certificateList = res.data.new_certificate_types;
        this.certificateList.forEach((item: any) => {

          if(this.singleLeadData?.certificate_type_name === item.certificate_type_name)
          {
           this.certificate_value1 = item.certificate_type_name
          }
          console.log(this.certificate_value1);
          
        });
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

  //   if (this.singleLeadData?.certificate_type != 'undefined || null') {
  //     this.leadService.getAssesmentByID(this.singleLeadData?.certificate_type).subscribe((res:any) => {

  //    this.assesmentList = res.data[0].newitemlist;

  //  });
  //  }
    if (this.singleLeadData?.country != 'undefined || null') {
      this.leadService.getStateByID(this.singleLeadData?.country).subscribe((res:any) => {
        this.patchCountryCode(this.singleLeadData?.country)
        this.stateList = res.data;
        this.stateVar = this.stateList.map((res: any) => res.states_name);
        this.stateVar2 = this.stateList;
      });
    }
    if (this.singleLeadData?.state != 'undefined || null') {
      this.leadService.getCityByID(this.singleLeadData?.state).subscribe((res:any) => {

        this.cityList = res.data;
        this.cityVar = this.cityList.map((res: any) => res.city_name);
        this.cityVar2 = this.cityList;
      });
    }
    if (this.singleLeadData?.city != 'undefined || null') {
      this.leadService.getPinCodeNew(this.singleLeadData?.city).subscribe((res:any) => {
        this.pinCodeList = res.data;


      });
    }
    this.leadForm.patchValue({
      customer_type:this.singleLeadData?.customer_type || "New User",
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
      state:  this.singleLeadData?.state,
      country:  this.singleLeadData?.country,
      postal_code_id:this.singleLeadData?.postal_code_id,
      postal_code:this.singleLeadData?.postal_code_id,
      region: this.singleLeadData?.region,
      regional_bussiness_lead:this.singleLeadData?.regional_bussiness_lead,
      global_managing_director:this.singleLeadData?.global_managing_director,
      global_manager_sales:this.singleLeadData?.global_manager_sales,
      website_url:this.singleLeadData?.website_url,
      phone_number:this.singleLeadData?.phone_number,
      mobile_number: this.singleLeadData?.mobile_number,
      dqs_contact_source: Number(this.singleLeadData?.dqs_contact_source),
      contact_owner: this.singleLeadData?.contact_owner,
      lead_created_date: this.singleLeadData?.lead_created_date,
      standard_program_assement:  this.singleLeadData?.standard_program_assement,
      remarks:  this.singleLeadData?.remarks,
      lead_validated_date: this.singleLeadData?.lead_validated_date,
      lead_validate_remarks: this.singleLeadData?.lead_validate_remarks,
      industry_sector: this.singleLeadData?.industry_sector,
      lead_created_by_name: this.singleLeadData?.lead_created_by_name,
      validated_by:  this.singleLeadData?.validated_by,
      customer_category: this.singleLeadData?.customer_category,
      employee_count: this.singleLeadData?.employee_count,
      company_remarks: this.singleLeadData?.company_remarks,
      gst_applicable: this.singleLeadData?.gst_applicable,
      gst_number: this.singleLeadData?.gst_number,
      pan_number: this.singleLeadData?.pan_number,
      tan_number: this.singleLeadData?.tan_number,
      lead_assgn_contact_owner: Number(this.singleLeadData?.lead_assgn_contact_owner),
      assigned_by: this.singleLeadData?.assigned_by,
      assigned_date: this.singleLeadData?.assigned_date,
      stage: this.singleLeadData?.stage,
      lead_assgn_remark: this.singleLeadData?.lead_assgn_remark,
      phone_code: this.singleLeadData?.userrespectiveleads[0]?.phone_code,

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

  getCountryID(e: any) {

    this.leadService.getStateByID(e.value).subscribe((res:any) => {
      this.patchCountryCode(e.value);
      this.stateList = res.data;
      this.stateVar = this.stateList.map((res: any) => res.states_name);
      this.stateVar2 = this.stateList;  
    });
    this.leadForm.get('city')?.reset()

  }

  getCountry() {
    this.configService.getCountry().subscribe((res: any) => {
      this.countryList = res.data;
      this.countryVar = this.countryList.map((res: any) => res.countryss_name);
      this.countryVar2 = this.countryList;
    });
  }

  getStateID(e: any) {

    this.leadService.getCityByID(e.value).subscribe((res:any) => {

      this.cityList = res.data;
      this.cityVar = this.cityList.map((res: any) => res.city_name);
      this.cityVar2 = this.cityList;
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
  wnerClick(e:any){

    this.ownerData=e.employee_id;

    this.ownerName=e.first_name;


      }

      assignClick(e:any){

        this.assignData=e.employee_id;
        this.asignName=e.first_name;

      }

  submitForm() {
    //
    this.submitted = false;
    if (this.leadForm.invalid) {
      this.toast.error('Required fields should not be empty', 'Fields Empty');
      return;
    }
    let val = this.leadForm.value;

    if(this.gstM==true){
      if(val.tan_number==null|| undefined){
        this.toast.error('Please fill Tan Number', 'Fields Empty');
        return;
      }
    }

    const data = {
      customer_type: this.singleLeadData?.customer_type,
      multiple_site_audit: this.singleLeadData?.multiple_site_audit || " ",
      associated_company: this.singleLeadData?.associated_company,
      segment: val.segment,
      certificate_type: val.certificate_type,
      first_name: val.first_name,
      last_name: val.last_name,
      email: val.email,
      emplyoment_type: val.emplyoment_type,
      lead_created_by_name: val.lead_created_by_name || " ",
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
      urd_number: val.urd_number,
      dqs_contact_source: val.dqs_contact_source,
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
      customer_category: val.customer_category,
      industry_sector: val.industry_sector,
      employee_count: val.employee_count,
      company_remarks: val.company_remarks,
      gst_applicable: val.gst_applicable,
      gst_number: val.gst_number,
      pan_number: val.pan_number,
      tan_number: val.tan_number,
      // lead_created_by_name:val.lead_created_by_name,
      standard_program_assement_name:this.singleLeadData?.standard_program_assement_name,
      dqs_Contact_name:this.singleLeadData?.dqs_Contact_name,

      status: "Prospect"
    }

    this.leadService.editLead(this.lead_id, data).subscribe((res:any) => {

      this.route.navigate(['master/lead/lead-prospect'],
        { queryParams: { lead_id: this.lead_id } }
      );
      this.toast.success("Lead Convert to Prospect Successfully..");
    })

  }
  updateForm(){
    this.submitted = false;

    if (this.leadForm.invalid) {
      this.toast.error('Required fields should not be empty', 'Fields Empty');
      return;
    }
    let val = this.leadForm.value;

    const data = {
      customer_type: this.singleLeadData?.customer_type,
      multiple_site_audit: this.singleLeadData?.multiple_site_audit || " ",
      associated_company: this.singleLeadData?.associated_company,
      segment: val.segment,
      certificate_type: val.certificate_type,
      first_name: val.first_name,
      last_name: val.last_name,
      email: val.email,
      emplyoment_type: val.emplyoment_type,
      lead_created_by_name: val.lead_created_by_name || " ",
      job_title: val.job_title,
      street_address: val.street_address,
      address2: val.address2,
      city: val.city,
      state: val.state,
      country: val.country,
      postal_code: val.postal_code,
      region: val.region,
      urd_number: val.urd_number,
      regional_bussiness_lead: val.regional_bussiness_lead,
      global_managing_director: val.global_managing_director,
      global_manager_sales: val.global_manager_sales,
      website_url: val.website_url,
      phone_number: val.phone_number,
      mobile_number: val.mobile_number,
      dqs_contact_source: val.dqs_contact_source,
      lead_created_date: moment(val.lead_created_date).format('YYYY-MM-DD'),
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
      industry_sector: val.industry_sector,
      employee_count: val.employee_count,
      company_remarks: val.company_remarks,
      gst_applicable: val.gst_applicable,
      gst_number: val.gst_number,
      pan_number: val.pan_number,
      tan_number: val.tan_number,
      // lead_created_by_name:val.lead_created_by_name,
      standard_program_assement_name:this.singleLeadData?.standard_program_assement_name,
      dqs_Contact_name:this.singleLeadData?.dqs_Contact_name,

      status: "Prospect"
    }


    this.leadService.editLead(this.lead_id, data).subscribe((res:any) => {


      this.toast.success("Update Prospect Successfully..")
      this.route.navigate(['master/lead/lead-management/assign-lead']);
    })

  }

  tanMandatory(){
    this.gstM = true;
  }
  tanNotMandatory(){
    this.gstM = false;
  }
  reject() {
    // const data = {
    //   status: "Rejected"
    // }
    // this.leadService.editLead(this.lead_id, data).subscribe((res:any) => {

    //   this.toast.success(res.message);
    //   this.route.navigate(['master/lead/lead-management/assign-lead'],
    //     { queryParams: { lead_id: this.lead_id } }
    //   );
    // })


    Swal.fire({
      title: 'Are you sure to Lost this Lead ?',
      text: "You won't be able to revert this!",
      icon: 'question',
      showCancelButton: true,
      cancelButtonColor: "#f44336",
      confirmButtonColor: "#3f51b5",
      confirmButtonText: 'Yes',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.isConfirmed) {
        const data = {
          status: "Rejected"
        }
        this.leadService.editLead(this.lead_id, data).subscribe((res:any) => {
    
          this.toast.success(res.message);
          this.route.navigate(['master/lead/lead-management/assign-lead'],
            { queryParams: { lead_id: this.lead_id } }
          );
        })
      };
    });



  }
  public toggleInputReadonly() {
    this.inputReadonly = !this.inputReadonly;
  }

  industryFilter(e: any) {
    const aa = e
    let filteredVariable = this.variable.filter((item: any) => aa.includes(item.industry_sector_name));
    this.checkData = filteredVariable
    console.log(this.checkData, "checkkkk")

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

  contactFilter(e:any){
    const aa = e
    let filteredVariable = this.contactOwner2.filter((item: any) => aa.includes(item.first_name));
    this.allSalesPersonList = filteredVariable
    console.log(this.allSalesPersonList, "checkkkk")
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

_keyUp(event: any) {
  const pattern = /[0-9\+\-\ ]/;
  let inputChar = String.fromCharCode(event.key);

  if (!pattern.test(inputChar)) {
    // invalid character, prevent input
    event.preventDefault();
  }
}

getExitingCustomer(){
  console.log('this.mainId', this.mainId);
  
  this.leadService.getExistingCustomerCreate(this.mainId).subscribe((res:any)=>{
    this.existingData=res.data;
    console.log('tesryt', this.existingData);
    this.variables = this.existingData.map((res: any) => res.associated_company);
    this.variable = this.existingData
  })
}

checkComps(e: any,id:any,lead_aasignId:any) {
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
    // this.configService.getProducts(res.data.certificate_type).subscribe((res:any)=>{
    //   this.assesmentList=res.data
    // },(err:any)=>{
    //   this.toast.warning("no data found")
    // })

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
    br_number: Number(this.companyData?.br_number),
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
  // if (this.companyData?.certificate_type != 'null || undefined') {
  //   this.leadService.getAssesmentByID(this.companyData?.certificate_type).subscribe((res: any) => {
  //     this.assesmentList = res.data[0].newitemlist;
  //   });
  // }
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
  if(this.newChildData && this.newChildData.country != null || undefined){
    this.patchCountryCode(this.newChildData?.country)
  }
}

}
