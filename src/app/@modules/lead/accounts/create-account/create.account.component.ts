import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { calendarFormat } from 'moment';
import { ToastrService } from 'ngx-toastr';
import { EmpRegistrationService } from 'src/app/@shared/services/emp-registration.service';
import { LeadService } from 'src/app/@shared/services/lead.service';
import { RecruitService } from 'src/app/@shared/services/recruitment.service';
import { ConfigurationalmasterService } from '../../../../@shared/services/configurationalmaster.service';
import { AuthService } from 'src/app/@auth/auth-material/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.scss']
})
export class AccountCreateComponent {
  leadForm: FormGroup;
  jobType: any;
  candidateArray: any;
  categoryList: any;
  interviewGetId: any;
  candidateId: any;
  id: any;
  interview_id: any;
  clicked: boolean = false;
  cutomerType: boolean = false;
  sitAudit: boolean = false;
  unreg: boolean = false;
  gstreg: boolean = false;
  lead_id: any;
  singleLeadData: any;
  val: any;
  public searchResult: any;
  mainId: string | null;
  mainEmployeeData: any;
  allAchievement: any;
  updateLead: any;
  stateList: any;
  countryList: any[] = [];
  cityList: any;
  pinCodeList: any;
  pinCodeTrue: boolean = true;
  allDataOne: any;
  allDataTwo: any;
  allDataMan: any;
  countryName: any;
  stateName: any;
  cityName: any;
  industryList: any;
  nonCertTrue: boolean = false;
  segmentList: any;
  certificateList: any;
  regionSList: any;
  CategorySList: any;
  regionalbheadList: any;
  globalMsalesList: any;
  assesmentList: any;
  gstvalidation: boolean = false;
  newContact: boolean = false;
  segmentValue: boolean;
  allCompanyList: any;
  companyData: any;
  leadNewId: any;
  newChildData: any;
  inputReadonly = true;
  ownerData: any;
  ownerName: any;
  assignData: any;
  asignName: any;
  allSalesPersonList: any;
  contact_list: any;
  medvalue: boolean;
  role:any;
  childEditData: boolean = false;
  dummydate: string;
  childLeadData: any;
  gstShow: boolean = false;
  tanShow: boolean = false;
  contactOwner:any =[];
  contactOwner2:any =[];
  showValue: boolean=true;
  role_id: any;

  constructor(
    private configService: ConfigurationalmasterService,
    private fb: FormBuilder,
    private leadService: LeadService,
    private route: Router,
    private _empRegistration: EmpRegistrationService,
    private toast: ToastrService,
    private recruitService: RecruitService,
    private activeroute: ActivatedRoute, private authServies: AuthService) {
    this.leadForm = this.fb.group({
      customer_type: [{ value: '' }, Validators.required],
      site_audit: [{ value: '', }, Validators.required],
      new_location_site: new FormControl(null),
      associated_company: new FormControl(null, Validators.required),
      segment: new FormControl(null, Validators.required),
      certificate_type: new FormControl(null, Validators.required),
      lead_created_by_name: new FormControl(null),
      first_name: new FormControl(null, Validators.required),
      last_name: new FormControl(null, Validators.required),
      email: new FormControl(null, [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]),
      categories: new FormControl(null),
      emplyoment_type: new FormControl(null),
      job_title: new FormControl(null),
      urd_number: new FormControl(null),
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
      region: new FormControl(null, Validators.required),
      regional_bussiness_lead: new FormControl(null, Validators.required),
      global_managing_director: new FormControl(null, Validators.required),
      global_manager_sales: new FormControl(null, Validators.required),
      website_url: new FormControl(null),
      phone_number: new FormControl(null),
      mobile_number: new FormControl(null,[ Validators.required,   Validators.maxLength(15)]),
      dqs_contact_source: new FormControl(null, Validators.required),
      contact_owner: new FormControl(null, Validators.required),
      lead_created_date: new FormControl(null, Validators.required),
      standard_program_assement: new FormControl(null, Validators.required),
      remarks: new FormControl(null, Validators.required),
      lead_validate_stage: new FormControl(null),
      validated_by: new FormControl(null, Validators.required),
      lead_validated_date: new FormControl(null, Validators.required),
      lead_validate_remarks: new FormControl(null, Validators.required),
      lead_assgn_contact_owner: new FormControl(null),
      assigned_by: new FormControl(null),
      assigned_date: new FormControl(null),
      stage: new FormControl(null),
      lead_assgn_remark: new FormControl(null),
      industry_sector: new FormControl(null, Validators.required),
      customer_category: new FormControl(null, Validators.required),
      employee_count: new FormControl(null, [Validators.required,Validators.pattern('^[0-9]*$')]),
      company_remarks: new FormControl(null, Validators.required),
      gst_applicable: new FormControl(null, Validators.required),
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
    this.getAllSalesPerson();
    this.activeroute.queryParams.subscribe(params => {
      this.id = params;
      this.lead_id = this.id.lead_id;
      this.role = this.id.role;
      this.role_id = this.id.role_id
      this.updateLead = this.id.type;
      this.leadForm.controls['site_audit'].disable();
      if (this.updateLead === "editLead") {
        this.leadService.getByIdNewChild(this.lead_id).subscribe((res: any) => {
          console.log(res.data);
          this.singleLeadData = res.data[0];
          this.childLeadData = res.data[1];
          this.childEditData = true;
          this.patchFormvalueTwo();
          this.leadForm.controls['site_audit'].disable();
        })
      } else {
        this.leadService.getByIdLead(this.lead_id).subscribe((res: any) => {
          this.singleLeadData = res.data;
          this.configService.getProducts(res.data.certificate_type).subscribe((res:any)=>{
            this.assesmentList=res.data
          },(err:any)=>{
            this.toast.warning("no data found")
          })
  
          if (this.singleLeadData?.certificate_type_name === "Non-Cert") {
            this.nonCertTrue = false;
  
          } else {
            this.nonCertTrue = true;
  
          }
          if(this.singleLeadData?.export === "Export Wise"){
            this.gstvalidation = false;
          }
  
          if(this.singleLeadData?.segment_name === 'MED'){
            this.medvalue = true;
          }
          this.patchFormvalue();
          this.leadForm.controls['customer_type'].disable();
        })
      }
    });
   
    this.get_cp_contact();
    this.getAchievementList();
    this.patchFormvalue();
    this.getAllSegment();
    this.getCategory();
    this.getCountry();
    this.getAllIndustry();
    this.getAchievementListt();
    this.regionalBusiness();
    this.globalManagerales();
    this.mainId = localStorage.getItem("EmpMainId");

    if (this.mainId == undefined) {
      this._empRegistration.getByUserId(this.mainId).subscribe((res) => {
        this.mainEmployeeData = res.data;

        this.getAchievementList();
        this.patchFormvalue();
      })
    }
  }
  getAllIndustry() {
    this.configService.listIndustry().subscribe((res: any) => {
      this.industryList = res.data;

    });
  }
  get_cp_contact(){
    let val=this.leadForm.value;
    console.log(val,'valvalvalvalval');
    
    this.leadService.get_contact().subscribe(
      (res:any)=>{
        this.contact_list = res.data;
       
//         for(let i=0;i<=res.data.length;i++){
// if(){

// }
//         }


      },(err)=>{

      }
    )
  };
  certificateChange(event: any){
    const certi_id = event.value;
    this.configService.getProducts(certi_id).subscribe((res:any)=>{
      this.assesmentList=res.data
    },(err:any)=>{
      this.toast.warning("no data found")
    })


    let certificate_value1
     this.certificateList.forEach((item: any) => {

      if(certi_id === item.certificate_type_id)
      {
       certificate_value1 = item.certificate_type_name
      }
    });




    if (certificate_value1 === "Non-Cert") {
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

   });
   this.leadService.getGlobalManagerSales(region_id).subscribe((res:any) => {
     this.globalMsalesList = res.data;

    });
    this.leadForm.get('regional_bussiness_lead')?.reset(),
    this.leadForm.get('global_manager_sales')?.reset()
  }
  regionBuisnessList(arg0: string, regionBuisnessList: any) {
    throw new Error('Method not implemented.');
  }
  checkUnreg() {

    if (this.singleLeadData?.lead_genration_id === undefined || null) {
      this.newContact = true;
    }
    if (this.singleLeadData?.gst_applicable === "Unregistered Dealer") {
      this.unreg = true;
      this.gstreg = false;
    } else if(this.singleLeadData?.gst_applicable === "Export Wise") {
      this.unreg = false;
      this.gstreg = false;
    } else if(this.singleLeadData?.gst_applicable === "Not Applicable") {
      this.unreg = false;
      this.gstreg = false;
    } else {
      this.gstreg = true;
      this.unreg = false;
    }
  }
  unregisteredDealer() {
    this.unreg = true;
    this.gstreg = false;
  }
  gstDealer() {
    this.gstreg = true;
    this.unreg = false;
  }
  notApplicable() {
    this.unreg = false;
    this.gstreg = false;
  }
  fetchSeries(value: String) {
    if (value === '') {
      return this.searchResult = []
    }
    this.searchResult = this.allAchievement.filter(function (series: any) {

      return series.first_name.toLowerCase().startsWith(value)
    })

  }

  checkComp(e: any) {

    for (let item of this.allCompanyList) {
      if (item.associated_company === e) {
        this.companyData = item;
        this.leadNewId = this.companyData?.lead_genration_id;

      }
    }
    this.leadService.getByIdLead(this.leadNewId).subscribe((res:any) => {
      this.newChildData = res.data;

    });
    if(this.companyData?.segment != 'null || undefined'){
      this.leadService.getCertificateByID(this.companyData?.segment).subscribe((res:any) => {
        this.certificateList = res.data.new_certificate_types;
      });
    }

    this.leadForm.patchValue({
      segment: this.companyData?.segment,
      certificate_type: this.companyData?.certificate_type,
      br_number1: this.companyData?.br_number,
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

    })
  }
  getAllSegment() {
    this.configService.getAllSegment().subscribe((res: any) => {
      this.segmentList = res.data;

    });
  }

  candidateClick(e: any) {

    this.candidateId = e;
    this.recruitService.interViewGetIdBy(e).subscribe((res: any) => {
      this.interviewGetId = res.data;

      this.patchFormvalue();
    })
  }

  patchFormvalue() {
    this.checkUnreg();
    console.log('singlelead data', this.singleLeadData)

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
    // if (this.singleLeadData?.certificate_type != 'undefined || null') {
    //   this.leadService.getAssesmentByID(this.singleLeadData?.certificate_type).subscribe((res: any) => {

    //     this.assesmentList = res.data[0].newitemlist;

    //   });
    // }
    if (this.singleLeadData?.br_number) {
      this.leadForm.patchValue({
        customer_type: "Existing User",
        site_audit: "No",
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
        state: this.singleLeadData?.state,
        country: this.singleLeadData?.country,
        postal_code: this.singleLeadData?.postal_code_id,
        region: this.singleLeadData?.region,
        regional_bussiness_lead: this.singleLeadData?.regional_bussiness_lead,
        global_managing_director:"Dr Murugan",
        global_manager_sales: this.singleLeadData?.global_manager_sales,
        website_url: this.singleLeadData?.website_url,
        phone_number: this.singleLeadData?.phone_number,
        mobile_number: this.singleLeadData?.mobile_number,
        lead_assgn_contact_owner: Number(this.singleLeadData?.lead_assgn_contact_owner),
        assigned_by: this.singleLeadData?.assigned_by,
        assigned_date: this.singleLeadData?.assigned_date,
        stage: this.singleLeadData?.stage,
        lead_assgn_remark: this.singleLeadData?.lead_assgn_remark,
        dqs_contact_source: this.singleLeadData?.dqs_Contact_id,
        contact_owner: this.singleLeadData?.contact_owner,
        lead_created_date: this.singleLeadData?.lead_created_date,
        standard_program_assement: this.singleLeadData?.standard_program_assement,
        remarks: this.singleLeadData?.remarks,
        lead_validated_date: this.singleLeadData?.lead_validated_date,
        lead_validate_remarks: this.singleLeadData?.lead_validate_remarks,
        industry_sector: this.singleLeadData?.industry_sector,
        lead_created_by_name: this.singleLeadData?.lead_created_by_name,
        validated_by: this.singleLeadData?.validated_by,
        customer_category: this.singleLeadData?.customer_category,
        employee_count: this.singleLeadData?.employee_count,
        company_remarks: this.singleLeadData?.company_remarks,
        gst_applicable: this.singleLeadData?.gst_applicable,
        gst_number: this.singleLeadData?.gst_number,
        pan_number: this.singleLeadData?.pan_number,
        tan_number: this.singleLeadData?.tan_number,
        phone_code: this.singleLeadData?.userrespectiveleads[0]?.phone_code,
      })
    } else {
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
        state: this.singleLeadData?.state,
        country: this.singleLeadData?.country,
        postal_code: this.singleLeadData?.postal_code_id,
        region: this.singleLeadData?.region,
        regional_bussiness_lead: this.singleLeadData?.regional_bussiness_lead,
        global_managing_director:"Dr Murugan",
        global_manager_sales: this.singleLeadData?.global_manager_sales,
        website_url: this.singleLeadData?.website_url,
        phone_number: this.singleLeadData?.phone_number,
        mobile_number: this.singleLeadData?.mobile_number,
        lead_assgn_contact_owner: Number(this.singleLeadData?.lead_assgn_contact_owner),
        assigned_by: this.singleLeadData?.assigned_by,
        assigned_date: this.singleLeadData?.assigned_date,
        stage: this.singleLeadData?.stage,
        lead_assgn_remark: this.singleLeadData?.lead_assgn_remark,
        dqs_contact_source: this.singleLeadData?.dqs_Contact_id,
        contact_owner: this.singleLeadData?.contact_owner,
        lead_created_date: this.singleLeadData?.lead_created_date,
        standard_program_assement: this.singleLeadData?.standard_program_assement,
        remarks: this.singleLeadData?.remarks,
        lead_validated_date: this.singleLeadData?.lead_validated_date,
        lead_validate_remarks: this.singleLeadData?.lead_validate_remarks,
        industry_sector: this.singleLeadData?.industry_sector || this.singleLeadData?.industry_sector,
        lead_created_by_name: this.singleLeadData?.lead_created_by_name,
        validated_by: this.singleLeadData?.validated_by,
        customer_category: this.singleLeadData?.customer_category,
        employee_count: this.singleLeadData?.employee_count,
        company_remarks: this.singleLeadData?.company_remarks,
        gst_applicable: this.singleLeadData?.gst_applicable,
        gst_number: this.singleLeadData?.gst_number,
        pan_number: this.singleLeadData?.pan_number,
        tan_number: this.singleLeadData?.tan_number,
        phone_code: this.singleLeadData?.userrespectiveleads[0]?.phone_code,


      })
    }
  }

  patchFormvalueTwo() {
    this.checkUnreg();
    console.log('singlelead data', this.childLeadData)

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

    if (this.childLeadData?.region != 'null || undefined') {
      this.leadService.getRBuisnessHead(Number(this.childLeadData?.region)).subscribe((res: any) => {
        this.regionalbheadList = res.data;

      });
      this.leadService.getGlobalManagerSales(Number(this.childLeadData?.region)).subscribe((res: any) => {
        this.globalMsalesList = res.data;

      });
    }


    if (this.childLeadData?.country != 'undefined || null') {
      this.leadService.getStateByID(Number(this.childLeadData?.country)).subscribe((res: any) => {
        this.stateList = res.data;
        console.log(this.stateList);
        this.patchCountryCode(this.childLeadData?.country)
      });
    }
    if (this.childLeadData?.state != 'undefined || null') {
      this.leadService.getCityByID(Number(this.childLeadData?.state)).subscribe((res: any) => {

        this.cityList = res.data;
      });
    }
    if (this.childLeadData?.city != 'undefined || null') {
      this.leadService.getPinCodeNew(Number(this.childLeadData?.city)).subscribe((res: any) => {
        this.pinCodeList = res.data;


      });
    }
    if (this.singleLeadData?.certificate_type != 'undefined || null') {
      // this.leadService.getAssesmentByID(this.singleLeadData?.certificate_type).subscribe((res: any) => {

      //   this.assesmentList = res.data[0].newitemlist;

      // });

      this.configService.getProducts(this.singleLeadData?.certificate_type).subscribe((res:any)=>{
        this.assesmentList=res.data
      },(err:any)=>{
        this.toast.warning("no data found")
      })
    }
    if (this.childLeadData?.br_number) {
      this.leadForm.patchValue({
        customer_type: "Existing User",
        site_audit: "No",
        associated_company: this.singleLeadData?.associated_company,
        segment: this.singleLeadData?.segment,
        br_number: this.childLeadData?.br_number,
        assignedManager: this.singleLeadData?.assigned_hiring_manager,
        certificate_type: this.singleLeadData?.certificate_type,
        first_name: this.childLeadData?.first_name,
        last_name: this.childLeadData?.last_name,
        categories: this.singleLeadData?.categories,
        email: this.childLeadData?.email,
        emplyoment_type: this.singleLeadData?.emplyoment_type,
        street_address: this.childLeadData?.street_address,
        job_title: this.singleLeadData?.job_title,
        address2: this.singleLeadData?.address2,
        city: Number(this.childLeadData?.city),
        state: Number(this.childLeadData?.state),
        country: Number(this.childLeadData?.country),
        postal_code: this.singleLeadData?.postal_code_id,
        region: Number(this.childLeadData?.region),
        regional_bussiness_lead: this.singleLeadData?.regional_bussiness_lead,
        global_managing_director:"Dr Murugan",
        global_manager_sales: Number(this.childLeadData?.global_manager_sales),
        website_url: this.childLeadData?.website_url,
        phone_number: this.childLeadData?.phone_number,
        mobile_number: this.childLeadData?.mobile_number,
        lead_assgn_contact_owner: Number(this.singleLeadData?.lead_assgn_contact_owner),
        assigned_by: this.singleLeadData?.assigned_by,
        assigned_date: this.singleLeadData?.assigned_date,
        stage: this.singleLeadData?.stage,
        lead_assgn_remark: this.singleLeadData?.lead_assgn_remark,
        dqs_contact_source: this.singleLeadData?.dqs_Contact_id,
        contact_owner: this.singleLeadData?.contact_owner,
        lead_created_date: this.singleLeadData?.lead_created_date,
        standard_program_assement: this.singleLeadData?.standard_program_assement,
        remarks: this.singleLeadData?.remarks,
        lead_validated_date: this.singleLeadData?.lead_validated_date,
        lead_validate_remarks: this.singleLeadData?.lead_validate_remarks,
        industry_sector: this.singleLeadData?.industry_sector,
        lead_created_by_name: this.singleLeadData?.lead_created_by_name,
        validated_by: this.singleLeadData?.validated_by,
        customer_category: this.singleLeadData?.customer_category,
        employee_count: this.singleLeadData?.employee_count,
        company_remarks: this.singleLeadData?.company_remarks,
        gst_applicable: this.singleLeadData?.gst_applicable,
        gst_number: this.singleLeadData?.gst_number,
        pan_number: this.singleLeadData?.pan_number,
        tan_number: this.singleLeadData?.tan_number,
        urd_number:this.singleLeadData?.urd_number,
        phone_code: this.singleLeadData?.userrespectiveleads[0]?.phone_code,


      })
    } else {
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
        state: this.singleLeadData?.state,
        country: this.singleLeadData?.country,
        postal_code: this.singleLeadData?.postal_code_id,
        region: this.singleLeadData?.region,
        regional_bussiness_lead: this.singleLeadData?.regional_bussiness_lead,
        global_managing_director:"Dr Murugan",
        global_manager_sales: this.singleLeadData?.global_manager_sales,
        website_url: this.singleLeadData?.website_url,
        phone_number: this.singleLeadData?.phone_number,
        mobile_number: this.singleLeadData?.mobile_number,
        lead_assgn_contact_owner: this.singleLeadData?.lead_assgn_contact_owner,
        assigned_by: this.singleLeadData?.assigned_by,
        assigned_date: this.singleLeadData?.assigned_date,
        stage: this.singleLeadData?.stage,
        lead_assgn_remark: this.singleLeadData?.lead_assgn_remark,
        dqs_contact_source: this.singleLeadData?.dqs_Contact_id,
        contact_owner: this.singleLeadData?.contact_owner,
        lead_created_date: this.singleLeadData?.lead_created_date,
        standard_program_assement: this.singleLeadData?.standard_program_assement,
        remarks: this.singleLeadData?.remarks,
        lead_validated_date: this.singleLeadData?.lead_validated_date,
        lead_validate_remarks: this.singleLeadData?.lead_validate_remarks,
        industry_sector: this.singleLeadData?.industry_sector || this.singleLeadData?.industry_sector,
        lead_created_by_name: this.singleLeadData?.lead_created_by_name,
        validated_by: this.singleLeadData?.validated_by,
        customer_category: this.singleLeadData?.customer_category,
        employee_count: this.singleLeadData?.employee_count,
        company_remarks: this.singleLeadData?.company_remarks,
        gst_applicable: this.singleLeadData?.gst_applicable,
        gst_number: this.singleLeadData?.gst_number,
        pan_number: this.singleLeadData?.pan_number,
        tan_number: this.singleLeadData?.tan_number,
        phone_code: this.singleLeadData?.userrespectiveleads[0]?.phone_code,


      })
    }
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

  reject() {
    // const data = {
    //   status: "Rejected"
    // }
    // this.leadService.editLead(this.lead_id, data).subscribe((res: any) => {

    //   this.toast.success(res.message);
    //   this.route.navigate(['master/lead/lead-account'],
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
        this.leadService.editLead(this.lead_id, data).subscribe((res: any) => {
    
          this.toast.success(res.message);
          this.route.navigate(['master/lead/lead-prospect'],
            { queryParams: { lead_id: this.lead_id } }
          );
        })
      };
    });
  }
  editForm() {
    const data = this.leadForm.value;
    this.leadService.editLead(this.lead_id, data).subscribe((res: any) => {


      this.toast.success("Account Updated Successfully..")
      this.route.navigate(['master/lead/lead-management/generate-lead']);
    })
  }

  getCountryID(e: any) {

    this.leadService.getStateByID(e.value).subscribe((res: any) => {

      this.stateList = res.data;
    });
    this.leadForm.get('city')?.reset()

  }

  getCountry() {
    this.configService.getCountry().subscribe((res: any) => {
      this.countryList = res.data;

    });
  }

  getStateID(e: any) {

    this.leadService.getCityByID(e.value).subscribe((res: any) => {

      this.cityList = res.data;
    });
  }

  getPinCode(e: any) {

    this.leadService.getPinCodeNew(e.value).subscribe((res: any) => {
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
  updateChildForm() {
    // if (this.leadForm.invalid) {
    //   this.toast.error('Required fields should not be empty', 'Fields Empty');
    //   return;
    // }
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
      categories: val.categories,
      country: val.country,
      postal_code: val.postal_code,
      urd_number: val.urd_number,
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
      standard_program_assement_name:this.singleLeadData?.standard_program_assement_name,
      dqs_Contact_name:this.singleLeadData?.dqs_Contact_name,
      


      // lead_created_by_name:val.lead_created_by_name
    }
    this.leadService.updateChildLead(this.lead_id, data).subscribe((res: any) => {
      this.route.navigate(['master/lead/lead-account'],
        { queryParams: { lead_id: this.lead_id } }
      );

    })
  }
  submitForm() {
    // if (this.leadForm.invalid) {
    //   this.toast.error('Required fields should not be empty', 'Fields Empty');
    //   return;
    // }
    this.dummydate = "2023-09-30";
    let val = this.leadForm.value;
    if (this.gstreg === true) {
      if (val.gst_number == null) {
        this.gstShow = true;
        console.log(this.gstShow);
        
        this.toast.error('GST Number should not be empty', 'Fields Empty');
        return;
      } else if(val.tan_number == null) {
        this.tanShow = true;
        this.toast.error('TAN Number should not be empty', 'Fields Empty');
        return;
      }
    }
    
    const data:any = {
      customer_type: this.singleLeadData?.customer_type,
      multiple_site_audit: this.singleLeadData?.multiple_site_audit || " ",
      associated_company: this.singleLeadData?.associated_company,
      segment: val.segment,
      certificate_type: val.certificate_type,
      first_name: val.first_name,
      last_name: val.last_name,
      email: val.email,
      emplyoment_type: val.emplyoment_type,
      lead_created_by_name: val.lead_created_by_name || this.singleLeadData?.lead_created_by_name,
      job_title: val.job_title,
      street_address: val.street_address,
      address2: val.address2,
      city: val.city,
      state: val.state,
      categories: val.categories,
      country: val.country,
      postal_code: val.postal_code,
      urd_number: val.urd_number,
      region: val.region,
      regional_bussiness_lead: val.regional_bussiness_lead,
      global_managing_director: val.global_managing_director,
      global_manager_sales: val.global_manager_sales,
      website_url: val.website_url,
      phone_number: val.phone_number,
      mobile_number: val.mobile_number,
      dqs_contact_source: val.dqs_contact_source || Number(this.singleLeadData?.dqs_contact_source),
      contact_owner: val.contact_owner,
      lead_created_date: moment(val.lead_created_date).format('YYYY-MM-DD') || "2023-01-01",
      standard_program_assement: val.standard_program_assement,
      remarks: val.remarks,
      lead_validate_stage: val.lead_validate_stage,
      validated_by: val.validated_by || 'Test',
      // lead_validated_date: moment(val.lead_validated_date).format('YYYY-MM-DD'),
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

      status: "Account"
    }
    if (this.singleLeadData?.lead_validated_date != null) {
      data.lead_validated_date =  moment(val.lead_validated_date).format('YYYY-MM-DD');
    }
    console.log(data,'datadatadatadata');
    
    this.leadService.editLead(this.lead_id, data).subscribe((res: any) => {

      this.toast.success("Prospects to Convert Account Successfully..")
        this.route.navigate(['/master/lead/lead-account']); 
      setTimeout(() => {   
        this.reloadCurrentRoute();
      }, 100); 
  })
}

reloadCurrentRoute() {
  let currentUrl = this.route.url;
  this.route.navigateByUrl('/', { skipLocationChange: true }).then(() => {
    this.route.navigate([currentUrl]);
  });
}

  submitNewForm() {
    let val = this.leadForm.value;
    const data = {
      customer_type: val.customer_type,
      new_location_site: val.new_location_site || ' ',
      multiple_site_audit: val.site_audit || ' ',
      associated_company: val.associated_company,
      segment: Number(val.segment) || ' ',
      segment_name: val.segment_name,
      certificate_type: val.certificate_type || ' ',
      certificate_type_name:val.certificate_type_name,
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
      postal_code_id: Number(val.postal_code_id) || ' ',
      postal_code:val.postal_code || '',
      region: Number(val.region) || ' ',
      region_name: val.region_name || '',
      categories: val.categories,
      br_number1: val.br_number1 || ' ',
      regional_bussiness_lead: Number(val.regional_bussiness_lead) || ' ',
      // regional_bussiness_lead_name: this.regional_bussiness_name || '',
      global_managing_director: val.global_managing_director || 'Dr Murugan',
      global_manager_sales:Number(val.global_manager_sales) || ' ',
      // global_manager_sales_name: this.global_manager_sales_name || ' ',
      website_url: val.website_url || ' ',
      phone_number: val.phone_number || ' ',
      mobile_number: val.mobile_number || ' ',
      dqs_contact_source: val.dqs_contact_source || ' ',
      contact_owner: val.contact_owner || ' ',
      lead_created_by_name: val.lead_created_by_name || ' ',
      lead_created_date: moment(val.lead_created_date).format('YYYY-MM-DD') || ' ',
      standard_program_assement: val.standard_program_assement || ' ',
      remarks: val.remarks || ' ',
      lead_validate_stage: val.lead_validate_stage || ' ',
      validated_by: val.validated_by || ' ',
      lead_validate_remarks: val.lead_validate_remarks || ' ',
      lead_assgn_contact_owner: val.lead_assgn_contact_owner || ' ',
      assigned_by: val.assigned_by || ' ',
      stage: val.stage || ' ',
      lead_assgn_remark: val.lead_assgn_remark || ' ',
      // lead_created_by_name:val.lead_created_by_name,
      standard_program_assement_name:this.singleLeadData?.standard_program_assement_name,
      dqs_Contact_name:this.singleLeadData?.dqs_Contact_name,

      status: 'Account',
    };

  this.leadService.createLead( this.mainId,data).subscribe(
    (res: any) => {

      this.lead_id = res.data.lead_genration_id;
      this.toast.success('Account Created Successfully..');

      this.route.navigate(['master/lead/lead-account/account-list']);
    },
    (err: any) => {

      this.toast.error(err.error.message);
    }
  );
  }
  back() {
    this.route.navigate(['master/lead/lead-prospect']);
  }
  public toggleInputReadonly() {
    this.inputReadonly = !this.inputReadonly;
  }
  wnerClick(e:any){

    this.ownerData=e.employee_id;

    this.ownerName=e.first_name;


      }

      assignClick(e:any){

        this.assignData=e.employee_id;
        this.asignName=e.first_name;

      }

      getCurrentRoute():string{
        return this.activeroute.snapshot.url.map(s => s.path).join('/')
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

getAllSalesPerson() {
  this.leadService.getAllSalesPerson().subscribe((res:any) => {
    this.allSalesPersonList = res.data;
    console.log(this.allSalesPersonList);
    this.contactOwner = this.allSalesPersonList.map((res: any) => res.first_name)
    this.contactOwner2 = this.allSalesPersonList
  })
}

contactFilter(e: any) {
  const aa = e
  let filteredVariable = this.contactOwner2.filter((item: any) => aa.includes(item.first_name));
  this.allSalesPersonList = filteredVariable
  console.log(this.allSalesPersonList, "checkkkk")
}

contactSource(e:any){
  console.log(e,'eeeee');
  

}
}
