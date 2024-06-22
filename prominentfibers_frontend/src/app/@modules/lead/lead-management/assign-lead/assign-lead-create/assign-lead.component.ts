import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { calendarFormat } from 'moment';
import { ToastrService } from 'ngx-toastr';
import { ConfigurationalmasterService } from '../../../../../@shared/services/configurationalmaster.service';
import { EmpRegistrationService } from 'src/app/@shared/services/emp-registration.service';
import { LeadService } from 'src/app/@shared/services/lead.service';
import { RecruitService } from 'src/app/@shared/services/recruitment.service';
import { Validators } from '@angular/forms';
import { NotificationServiceService } from 'src/app/@shared/services/notification/notification-service.service';
import { AnyComponent } from '@fullcalendar/core/preact';

@Component({
  selector: 'app-assign-lead',
  templateUrl: './assign-lead.component.html',
  styleUrls: ['./assign-lead.component.scss'],
})
export class AssignLeadComponent {
  Login_user_id: any = localStorage.getItem('signInUser');
  loginUserId: any = JSON.parse(this.Login_user_id).employee_id
  loginUserName: any = JSON.parse(this.Login_user_id).first_name
  leadForm: FormGroup;
  jobType: any;
  ownerData: any;
  candidateArray: any;
  interviewGetId: any;
  candidateId: any;
  id: any;
  interview_id: any;
  clicked: boolean = false;
  cutomerType: boolean = false;
  lead_id: any;
  sitAudit: boolean = false;
  singleLeadData: any;
  val: any;
  public searchResult: any;
  mainId: string | null;
  mainEmployeeData: any;
  allAchievement: any;
  categoryList: any;
  assignData: any;
  myDate = new Date();
  submitted: boolean;
  asignName: any;
  ownerName: any;
  assignedId: any;
  now = new Date();
  year = this.now.getFullYear();
  month = this.now.getMonth();
  // day = this.now.getDay();
  date = this.now.getDate();
  maxDate = moment({ year: this.year + 100, month: this.month, date: this.date }).format('YYYY-MM-DD');
  minDate = moment({ year: this.year - 0, month: this.month, date: this.date }).format('YYYY-MM-DD');
  allCompanyList: any;
  companyData: any;
  leadNewId: any;
  allData: any;
  stateList: any;
  countryList: any[] = [];
  cityList: any;
  pinCodeList: any;
  pinCodeTrue: boolean = true;
  allDataOne: any;
  allDataTwo: any;
  allDataMan: any;
  leadUpdate: any;
  segmentList: any;
  certificateList: any;
  regionSList: any;
  CategorySList: any;
  regionalbheadList: any;
  globalMsalesList: any;
  assesmentList: any;
  inputReadonly = true;
  rejectTrue: boolean = false;
  contact_list: any;
  medvalue: boolean;
  Emp_id_noti: any;
  Emp_name_noti: any;
  Emp_mail_noti: any;
  Emp_roleID_noti: any;
  Emp_role_noti: any;
  res1: any;
  companyName: any;
  salesPersons: any;
  allSalesPersonList: any;
  cert_id: any;
  contactOwner:any =[];
  contactOwner2:any =[];
  contact_owner_id: any;
  empId: any;
  //for filter end

  constructor(private fb: FormBuilder,
    private leadService: LeadService,
    private route: Router,
    private toast: ToastrService,
    private _notification: NotificationServiceService,
    private recruitService: RecruitService,
    private configService: ConfigurationalmasterService,
    private _empRegistration: EmpRegistrationService,
    private activeroute: ActivatedRoute) {
    // this.checkData=this.variable
    this.leadForm = this.fb.group({
      customer_type: [{ value: '', disabled: true }],
      site_audit: [{ value: '', disabled: true }],
      new_location_site: new FormControl(null),
      associated_company: new FormControl(null, Validators.required),
      segment: new FormControl(null, Validators.required),
      certificate_type: new FormControl(null, Validators.required),
      first_name: new FormControl(null, Validators.required),
      last_name: new FormControl(null, Validators.required),
      email: new FormControl(null, [Validators.required,
         Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]),
      emplyoment_type: new FormControl(null, Validators.required),
      job_title: new FormControl(null, Validators.required),
      street_address: new FormControl(null, Validators.required),
      address2: new FormControl(null, Validators.required),
      city: new FormControl(null, Validators.required),
      state: new FormControl(null, Validators.required),
      country: new FormControl(null, Validators.required),
      postal_code: new FormControl(null, Validators.required),
      region: new FormControl(null, Validators.required),
      regional_bussiness_lead: new FormControl(null, Validators.required),
      global_managing_director: new FormControl(null, Validators.required),
      global_manager_sales: new FormControl(null, Validators.required),
      website_url: new FormControl(null),
      phone_number: new FormControl(null),
      mobile_number: new FormControl(null,[ Validators.required,   Validators.maxLength(15)]),
      dqs_contact_source: new FormControl(null, Validators.required),
      contact_owner: new FormControl(null),
      lead_created_date: new FormControl(null, Validators.required),
      standard_program_assement: new FormControl(null, Validators.required),
      industry: new FormControl(null),
      remarks: new FormControl(null),
      lead_created_by_name: new FormControl(null),
      lead_validate_stage: new FormControl(null),
      validated_by: new FormControl(null, Validators.required),
      lead_validated_date: new FormControl(null, Validators.required),
      lead_validate_remarks: new FormControl(null),
      lead_assgn_contact_owner: new FormControl(null, Validators.required),
      assigned_by: new FormControl(null, Validators.required),
      assigned_date: new FormControl(null, Validators.required),
      stage: new FormControl(null, Validators.required),
      lead_assgn_remark: new FormControl(null),
      categories: new FormControl(null),
      phone_code: new FormControl(),
      mobile_code: new FormControl()
    })
  }

  ngOnInit() {

    this.activeroute.queryParams.subscribe(params => {
      this.id = params;
      this.lead_id = this.id.lead_id;
      this.leadUpdate = this.id.type;
      this.leadService.getByIdLead(this.lead_id).subscribe((res: any) => {
        this.singleLeadData = res.data;
        this.cert_id=res.data.certificate_type
        this.configService.getProducts(this.cert_id).subscribe((res:any)=>{
          this.assesmentList=res.data
        },(err:any)=>{
          this.toast.warning("no data found")
        })
        this.companyName = res.data.associated_company
        console.log(this.companyName, res.data.associated_company, "singleLe");
        if (this.singleLeadData?.segment_name === 'MED') {
          this.medvalue = true;
        }
        this.patchFormvalue();
      })
    });
    this.getAchievementList();
    // this.getSalesPerson();
    this.patchFormvalue();
    this.getAllSegment();
    this.getCategory();
    this.getCountry();
    this.getAchievementListt();
    this.regionalBusiness();
    this.globalManagerales();
    this.get_cp_contact();
    this.getAllSalesPerson();
    this.mainId = localStorage.getItem("EmpMainId");

    if (this.mainId != undefined) {
      this._empRegistration.getByUserId(this.mainId).subscribe((res) => {
        this.mainEmployeeData = res.data;

        this.getAchievementList();
        this.patchFormvalue();
      })
    }
    // this.leadForm.controls['city'].disable();
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
  get_cp_contact() {
    this.leadService.get_contact().subscribe(
      (res: any) => {
        this.contact_list = res.data;

      }, (err) => {

      }
    )
  };
  // getSalesPerson(){
  //   this.recruitService.getSalesPerson().subscribe((res:any)=>{
  //     this.salesPersons=res.data
  //     console.log(this.salesPersons, "this.salesPersons");
  //       this.variables = this.salesPersons.map((res: any) => res.first_name)
  //       this.checkData = this.salesPersons
  //       this.variable = this.salesPersons
  //       console.log(this.variables, "this.salesPersons");
  //   })
  // }

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
        console.log(this.allAchievement, "this.allAchievement");

      },
      (err) => {

      }
    );
    this.leadService.getLead().subscribe((res: any) => {

      this.allData = res.result;
    });
  }
  checkComp(e: any) {

    for (let item of this.allData) {
      if (item.associated_company === e) {
        this.companyData = item;
        this.leadNewId = this.companyData?.lead_genration_id;

      }
    }
  }

  fetchSeries(value: String) {
    if (value === '') {
      return this.searchResult = []
    }
    this.searchResult = this.allAchievement.filter(function (series: any) {

      return series.first_name.toLowerCase().startsWith(value)
    })

  }

  candidateClick(e: any) {

    this.candidateId = e;
    this.recruitService.interViewGetIdBy(e).subscribe((res: any) => {
      this.interviewGetId = res.data;

      this.patchFormvalue();
    })
  }

  patchFormvalue() {

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
        this.stateList = res.data;
        this.patchCountryCode(this.singleLeadData?.country)
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
      email: this.singleLeadData?.email,
      emplyoment_type: this.singleLeadData?.emplyoment_type,
      street_address: this.singleLeadData?.street_address,
      job_title: this.singleLeadData?.job_title,
      address2: this.singleLeadData?.address2,
      city: this.singleLeadData?.city,
      state: this.singleLeadData?.state,
      country: this.singleLeadData?.country,
      postal_code: this.singleLeadData?.postal_code,
      region: this.singleLeadData?.region,
      regional_bussiness_lead: this.singleLeadData?.regional_bussiness_lead,
      global_managing_director: this.singleLeadData?.global_managing_director,
      global_manager_sales: this.singleLeadData?.global_manager_sales,
      website_url: this.singleLeadData?.website_url,
      phone_number: this.singleLeadData?.phone_number,
      mobile_number: this.singleLeadData?.mobile_number,
      dqs_contact_source: this.singleLeadData?.dqs_Contact_id,
      contact_owner: this.singleLeadData?.contact_owner,
      lead_created_date: this.singleLeadData?.lead_created_date,
      standard_program_assement: this.singleLeadData?.standard_program_assement,
      industry_sector: this.singleLeadData?.industry,
      remarks: this.singleLeadData?.remarks,
      categories: this.singleLeadData?.categories,
      lead_validated_date: this.singleLeadData?.lead_validated_date,
      lead_created_by_name: this.singleLeadData?.lead_created_by_name,
      validated_by: this.singleLeadData?.validated_by,
      lead_validate_remarks: this.singleLeadData?.lead_validate_remarks,
      assigned_date: this.myDate,
      assigned_by: this.mainEmployeeData?.first_name,
      phone_code: this.singleLeadData?.userrespectiveleads[0]?.phone_code,

    })
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
  getCountryID(e: any) {

    this.leadService.getStateByID(e.value).subscribe((res: any) => {
      this.patchCountryCode(e.value)
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

  submitForm() {
    // 'Account'
    this.submitted = false;
 
    if (this.leadForm.invalid) {
      this.toast.error('Required fields should not be empty.', 'Error Occurred!');
      return;
    }
    let val = this.leadForm.value;

    let dynamicStatus:any
    if(this.singleLeadData?.customer_type  == 'New User'){
      dynamicStatus = 'Assigned'
    }else if(this.singleLeadData?.customer_type == "Existing User"){
      dynamicStatus = 'Account'
    }

    for (let item of this.allAchievement) {
       if (val.assigned_by === item.first_name) {
        this.assignedId = item.employee_id;
      }
    }

   console.log('allSalesPersonList**', this.allSalesPersonList)
   this.allSalesPersonList.forEach((item: any)=>{
    if(item.first_name == val.contact_owner){
      this.contact_owner_id = (item.employee_id).toString();
      console.log('contact owner id -->', this.contact_owner_id)
    }
   })
   console.log('employee_id', this.contact_owner_id)

    const data = {
      customer_type: this.singleLeadData?.customer_type,
      multiple_site_audit: this.singleLeadData?.multiple_site_audit,
      associated_company: this.singleLeadData?.associated_company,
      segment: val.segment,
      certificate_type: val.certificate_type,
      first_name: val.first_name,
      last_name: val.last_name,
      email: val.email,
      emplyoment_type: val.emplyoment_type,
      job_title: val.job_title,
      lead_created_by_name: val.lead_created_by_name || " ",
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
      // contact_owner: val.contact_owner,
      lead_created_date: moment(val.lead_created_date).format('YYYY-MM-DD'),
      standard_program_assement: val.standard_program_assement,
      industry: val.industry,
      remarks: val.remarks,
      lead_validate_stage: val.lead_validate_stage,
      validated_by: val.validated_by,
      lead_validated_date: moment(val.lead_validated_date).format('YYYY-MM-DD'),
      lead_validate_remarks: val.lead_validate_remarks,
      // lead_assgn_contact_owner: this.ownerName,
      lead_assgn_contact_owner: val.lead_assgn_contact_owner,  
      contact_owner: this.Emp_name_noti,  
      assigned_by: this.asignName || this.mainEmployeeData?.first_name,
      assigned_date: moment(val.assigned_date).format('YYYY-MM-DD'),
      stage: val.stage,
      categories: val.categories,
      lead_assgn_remark: val.lead_assgn_remark,
      userId: this.ownerData,
      assignById: this.assignData || this.assignedId,
      standard_program_assement_name:this.singleLeadData?.standard_program_assement_name,
      dqs_Contact_name:this.singleLeadData?.dqs_Contact_name,

      status: dynamicStatus
    }


    console.log('data',data);   

    this.leadService.editLead(this.lead_id, data).subscribe((res: any) => {

      this.toast.success("Lead Assigned Successfully..")
      this.create_notification()
      if(this.singleLeadData?.customer_type  == 'New User'){
      this.route.navigate(['master/lead/lead-management'],
        // { queryParams: { assignById: this.assignData, userId: this.ownerData } }
      );
      }else{
        this.route.navigate(['master/lead/lead-management']
      );
      }
    })


  }
  updateLead() {
    this.submitted = false;
    if (this.leadForm.invalid) {

      this.toast.error('Required fields should not be empty.', 'Error Occurred!');
      return;
    }
    let val = this.leadForm.value;

    const data = {
      customer_type: this.singleLeadData?.customer_type,
      multiple_site_audit: this.singleLeadData?.multiple_site_audit,
      associated_company: this.singleLeadData?.associated_company,
      segment: val.segment,
      certificate_type: val.certificate_type,
      first_name: val.first_name,
      last_name: val.last_name,
      email: val.email,
      emplyoment_type: val.emplyoment_type,
      job_title: val.job_title,
      lead_created_by_name: val.lead_created_by_name || " ",
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
      standard_program_assement: val.standard_program_assement,
      industry: val.industry,
      remarks: val.remarks,
      lead_validate_stage: val.lead_validate_stage,
      validated_by: val.validated_by,
      lead_validated_date: moment(val.lead_validated_date).format('YYYY-MM-DD'),
      lead_validate_remarks: val.lead_validate_remarks,
      // lead_assgn_contact_owner: this.ownerName,
      lead_assgn_contact_owner: val.lead_assgn_contact_owner,     
      assigned_by: this.asignName || this.mainEmployeeData?.first_name,
      assigned_date: moment(val.assigned_date).format('YYYY-MM-DD'),
      stage: val.stage,
      categories: val.categories,
      lead_assgn_remark: val.lead_assgn_remark,
      userId: this.ownerData,
      assignById: this.assignData || this.assignedId,
      standard_program_assement_name:this.singleLeadData?.standard_program_assement_name,
      dqs_Contact_name:this.singleLeadData?.dqs_Contact_name,

      status: "Assigned"
    }



    this.leadService.editLead(this.lead_id, val).subscribe((res: any) => {


      this.toast.success("Updatedm Assignment Successfully..")
      this.route.navigate(['master/lead/lead-management']);

    })

  }

  rejectNew() {
    const data = {
      status: "Rejected"
    }
    this.leadService.editLead(this.lead_id, data).subscribe((res: any) => {

      this.toast.success(res.message);
      this.route.navigate(['master/lead/lead-management/validate-lead'],
        { queryParams: { lead_id: this.lead_id } }
      );
    })
  }

  rejectLead() {
    this.rejectTrue = true;
  }

  rejectLeadTwo() {
    this.rejectTrue = false;
  }

  reject() {
    const data = {
      status: "Rejected"
    }
    this.leadService.editLead(this.lead_id, data).subscribe((res: any) => {
      this.toast.success(res.message);
      this.route.navigate(['master/lead/lead-management/validate-lead'],
        { queryParams: { lead_id: this.lead_id } }
      );
    })
  }
  wnerClick(e: any) {
    this.ownerData = e.employee_id;
    console.log('owner data', this.ownerData)
    this.ownerName = e.first_name;
    console.log(this.ownerName);
    
  }

  assignClick(e: any) {

    this.assignData = e.employee_id;
    this.asignName = e.first_name;

  }
  back() {
    this.route.navigate(['master/lead/lead-management/assign-lead']);
  }
  public toggleInputReadonly() {
    this.inputReadonly = !this.inputReadonly;
  }
  disableIt(event: any) {
    var which = event.which
    if (which === 13 || which === 9) {
      event.target.disabled = true
    }
  }
  getSP(e: any) {
    // console.log(e, "e");
    setTimeout(() => {
        this._notification.get_EmployeeDetails(this.ownerData).subscribe((res: any) => {
        this.Emp_id_noti = this.ownerData
        this.Emp_name_noti = res.data.first_name
        this.Emp_mail_noti = res.data.employee_official_email
        this.Emp_role_noti = res.data.user_role
        this.Emp_roleID_noti = res.data.role_master_id,
        this.empId=res.data.employee_id;
      })
    }, 1);
  }
  create_notification() {
    let data =
      [
        {
          employee_id: this.Emp_id_noti,
          emp_name: this.Emp_name_noti,
          employee_official_email: this.Emp_mail_noti,
          role: this.Emp_role_noti,
          role_id: this.Emp_roleID_noti,
          type: 'S&M',
          remark: `You are assined for ${this.companyName}`,
          subject: `Regarding Assin for ${this.companyName}`,
          textData: `
    Dear ${this.Emp_name_noti}, <br>
         It is informed to you that you are assigned lead ${this.companyName}. 
          <br>   Regards,
          ${this.loginUserName}
    `,
        }
      ]
      this._notification.create_notification(data).subscribe((responsive: any) => {
      // console.log(responsive);
      // this.toast.success("noti")
      this.res1 = responsive
    },
      // (error)=>{
      //   this.toast.error("Somthing went wrong","ERROR")
      // }
    )
  }
 

  contactFilter(e: any) {
    const aa = e
    let filteredVariable = this.contactOwner2.filter((item: any) => aa.includes(item.first_name));
    this.allSalesPersonList = filteredVariable
    console.log(this.allSalesPersonList, "checkkkk")
  }
  certificate(e:any){
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
