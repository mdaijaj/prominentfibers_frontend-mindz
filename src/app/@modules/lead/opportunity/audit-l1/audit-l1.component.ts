

import { Component, ElementRef, ViewChild } from '@angular/core';
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
import Swal from 'sweetalert2';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { defaultRippleAnimationConfig } from '@angular/material/core';

declare var require: any;
const FileSaver = require('file-saver');

@Component({
  selector: 'app-audit',
  templateUrl: './audit-l1.component.html',
  styleUrls: ['./audit-l1.component.scss'],
})
export class AuditL1Component {
  displayedColumns: string[] = ['stage', 'noOfMandays'];
  br2: any;
  parentSide: boolean = false;
  childSide: boolean = false;
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
  lead_id: any;
  singleLeadData: any;
  myFiles: any;
  fileList: any;
  enableRem: boolean = false;
  errorMsg: string = '';
  Login_user_id: any = localStorage.getItem('signInUser');
  loginUserId: any = JSON.parse(this.Login_user_id).employee_id;
  loginUserName: any = JSON.parse(this.Login_user_id).first_name;
  stateList: any[] = [];
  countryList: any[] = [];
  cityList: any;
  pinCodeList: any;
  pinCodeTrue: boolean = true;
  allDataOne: any;
  allDataTwo: any;
  allDataMan: any;
  mobileBtn: boolean = false;
  // for GST File
  gstBtn: boolean = false;
  verifyGst: boolean = false;
  notVerifyGst: boolean = false;
  // basic form

  verifyMobile: boolean = false;
  notVerifyMobile: boolean = false;
  VerifyData: any = { precious_job_status: [] };
  allAchievement: any;
  mainId: string | null;
  mainEmployeeData: any;
  categoryList: any;
  myDate = new Date();
  submitted: boolean;
  unreg: boolean = false;
  gstreg: boolean = false;
  stageData: any[] = [];
  nonCertt: boolean = false;
  eaCodeList: any;
  rowData: any;
  now = new Date();
  year = this.now.getFullYear();
  month = this.now.getMonth();
  // day = this.now.getDay();
  date = this.now.getDate();
  maxDate = moment({
    year: this.year + 100,
    month: this.month,
    date: this.date,
  }).format('YYYY-MM-DD');
  minDate = moment({
    year: this.year - 0,
    month: this.month,
    date: this.date,
  }).format('YYYY-MM-DD');
  loginUser: any;
  leadUpdate: any;
  employee_id: any;
  certificateList: any;
  regionSList: any;
  CategorySList: any;
  regionalbheadList: any;
  globalMsalesList: any;
  assesmentList: any;
  segmentList: any;
  gstvalidation: boolean;
  nonCertTrue: any;
  br1: any;
  singleLeadData1: any;
  checkMedTrue = false;
  OtherfileUrl: string;
  OtherfileData: File | null = null;
  contactReviewUrl: string;
  contactReviewData: File | null = null;
  gstFileUrl: string;
  gstFileData: File | null = null;
  companyLogoUrl: string;
  companyLogoData: File | null = null;
  basicFormUrl: string;
  basicformData: File | null = null;
  contact_list: any;
  medvalue: boolean;
  companyLogo: boolean;
  verifylogo: boolean;
  btncompanyLogo: boolean;
  notVerifylogo: boolean;
  verfifybasicbtn: boolean;
  basicbtn: boolean;
  notVerifybasicbtn: boolean;
  otherBtn: boolean;
  verfifyotherbtn: boolean;
  notVerifyotherbtn: boolean;
  contact_owner_id: any;
  eacode: boolean = false;
  //for filter start
  variables: any = [];
  variable: any = [];
  public filteredList1 = this.variables.slice();
  filterData: any = [];
  checkData: any = [];
  stageDataByLeadId: any;
  child_br_number: any;
  enableReject: boolean = false;
  newApprverData: any;
  otherDocumentData: any
  imageToUpload: any;
  selectedFiles: File[] = [];
  otherFileData: any = [];
  varify_notVarify:boolean= false;
  varify_notVarifyGst: boolean=false;
  varify_notVarifyLogo: boolean=false;
  varify_notVarifyBasic: boolean=false;
  varify_notVarifyOther: boolean=false;
  otherFileCond: any;
  keysToCheck:any;
  condVerifier: any;
  docArray: any;
  stageData1: any;

  //for filter end
  constructor(
    private fb: FormBuilder,
    private leadService: LeadService,
    private route: Router,
    private recruitService: RecruitService,
    private activeroute: ActivatedRoute,
    private configService: ConfigurationalmasterService,
    private toast: ToastrService,
    private _empRegistration: EmpRegistrationService,
    private http: HttpClient
  ) {
    this.leadForm = this.fb.group({
      customer_type: [{ value: '', disabled: true }, Validators.required],
      site_audit: [{ value: '', disabled: true }, Validators.required],
      new_location_site: new FormControl(null),
      associated_company: new FormControl(null, Validators.required),
      segment: new FormControl(null, Validators.required),
      certificate_type: new FormControl(null, Validators.required),
      categories: new FormControl(null),
      first_name: new FormControl(null, Validators.required),
      last_name: new FormControl(null, Validators.required),
      email: new FormControl(null, [
        Validators.required,
        Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
      ]),
      emplyoment_type: new FormControl(null),
      job_title: new FormControl(null),
      street_address: new FormControl(null, Validators.required),
      address2: new FormControl(null, Validators.required),
      city: new FormControl(null, Validators.required),
      state: new FormControl(null, Validators.required),
      country: new FormControl(null, Validators.required),
      billing_site: new FormControl(null),
      postal_code: new FormControl(null, Validators.required),
      region: new FormControl(null, Validators.required),
      regional_bussiness_lead: new FormControl(null),
      global_managing_director: new FormControl(null),
      global_manager_sales: new FormControl(null),
      website_url: new FormControl(null),
      phone_number: new FormControl(null),
      urd_number: new FormControl(null),
      lead_created_by_name: new FormControl(null),
      mobile_number: new FormControl(null, [
        Validators.required,
        Validators.maxLength(15),
      ]),
      dqs_contact_source: new FormControl(null, Validators.required),
      contact_owner: new FormControl(null),
      lead_created_date: new FormControl(null, Validators.required),
      standard_program_assement: new FormControl(null, Validators.required),
      remarks: new FormControl(null),
      lead_validate_stage: new FormControl(null),
      validated_by: new FormControl(null, Validators.required),
      lead_validated_date: new FormControl(null, Validators.required),
      lead_validate_remarks: new FormControl(null),
      lead_assgn_contact_owner: new FormControl(null),
      assigned_by: new FormControl(null),
      assigned_date: new FormControl(null),
      stage: new FormControl(null),
      lead_assgn_remark: new FormControl(null),
      industry_sector: new FormControl(null, Validators.required),
      customer_category: new FormControl(null, Validators.required),
      employee_count: new FormControl(null, Validators.required),
      company_remarks: new FormControl(null),
      gst_applicable: new FormControl(null, Validators.required),
      gst_number: new FormControl(null),
      pan_number: new FormControl(null),
      tan_number: new FormControl(null),
      file: new FormControl(null),
      contact_review_form: new FormControl(null),
      gst_file: new FormControl(null),
      basic_form: new FormControl(null),
      company_logo: new FormControl(null),
      other_file: new FormControl(null),
      document_remark: new FormControl(''),
      non_cert_type: new FormControl(null),
      customer_sales_executive: new FormControl(null),
      assigned_to: new FormControl(null),
      opportunity_type: new FormControl(null),
      opportunity_ref: new FormControl(null),
      product_request: new FormControl(null),
      no_of_mandays: new FormControl(null),
      ea_code: new FormControl(null),
      assessment_period: new FormControl(null),
      opp_verifier_name_level1: new FormControl(null, Validators.required),
      opp_verified_date_level1: new FormControl(null, Validators.required),
      opp_verified_remarks_level1: new FormControl(null, [Validators.required]),
      assurity_remarks: new FormControl(null),
      approver_name_l2Id: new FormControl(null),
      contact_owner_id: new FormControl(null),
      phone_code: new FormControl(null),
      mobile_code: new FormControl()
    });
  }

  ngOnInit() {
    this.activeroute.queryParams.subscribe((params) => {
      this.id = params;
      this.lead_id = this.id.lead_id;
      this.leadUpdate = this.id.type;
      this.get_cp_contact();
      this.leadService.getByIdLead(this.lead_id).subscribe((res: any) => {
        if(res && res.data){
          this.singleLeadData = res.data;
          console.log(this.singleLeadData,"singggggg");
          
          this.otherFileCond= this.singleLeadData?.Lead_management_docs[0]?.hasOwnProperty('other_file');
          console.log( this.otherFileCond,'hasAgeKey');
          this.otherDocumentData = res?.data?.Lead_management_docs;
          this.getLocationData();
        }
        console.log(this.otherDocumentData)
        this.configService.getProducts(res.data.certificate_type).subscribe((res:any)=>{
          this.assesmentList=res.data
        },(err:any)=>{
          this.toast.warning("no data found")
        })
    
        console.log('billing_site single lead data', this.singleLeadData);
        this.checkMed();
        // if(this.singleLeadData?.billing_site === true){
        //   this.parentSide = true;
        //   this.getStage1(this.singleLeadData?.br_number)
        // }
        this.verifierAllDoc();

        if (this.singleLeadData?.export === 'Export Wise') {
          this.gstvalidation = false;
        }
        if (this.singleLeadData?.certificate_type_name === 'Non-Cert') {
          this.nonCertTrue = false;
        } else {
          this.nonCertTrue = true;
        }
        if (this.singleLeadData?.segment_name === 'MED') {
          this.medvalue = true;
        }
        if (this.singleLeadData?.certificate_type_name === 'Cert') {
          this.eacode = true;
        }

        this.patchFormvalue();
        this.nonCertFunc();
      });
    });
    // this.getStage(this.br1);
    this.getAchievementList();
    this.getAllSegment();
    this.patchFormvalue();
    this.getCategory();
    this.getEACode();
    this.getApprover();
    this.getCountry();
    this.getAchievementListt();
    this.regionalBusiness();
    this.globalManagerales();
    this.getAllApprover();
    this.mainId = localStorage.getItem('EmpMainId');

    if (this.mainId != undefined) {
      this._empRegistration.getByUserId(this.mainId).subscribe((res) => {
        this.mainEmployeeData = res.data;

        this.getAchievementList();
        this.patchFormvalue();
        this.getCategory();
      });
    }
    this.getStage(this.br1);
    let loginU: any = localStorage.getItem('signInUser');
    let nn = JSON.parse(loginU);
    this.loginUser = nn;
    console.log(this.singleLeadData?.Lead_management_docs," !!!");
    
   
  }
  verifierAllDoc() {
    console.log(this.singleLeadData, 'singlelead data');

    let docData: any = []
    // docData.push(this.singleLeadData.basic_form="true");
    if (this.singleLeadData.basic_form) {
      docData.push(this.singleLeadData.basic_form_cond = "true");
    }
    if (this.singleLeadData.company_logo) {
      docData.push(this.singleLeadData.company_logo_cond = "true");
    }
    if (this.singleLeadData.contact_review_form) {
      docData.push(this.singleLeadData.contact_review_form_cond = "true");
    }
    if (this.singleLeadData.gst_file) {
      docData.push(this.singleLeadData.gst_file_cond = "true");
    }


    // let doc2:any=[]
    for (let b = 0; b <= this.singleLeadData?.Lead_management_docs.length; b++) {
      if (this.singleLeadData?.Lead_management_docs[b]?.other_file) {
        docData.push(this.singleLeadData.other_file_cond = "true");
      }
    }
    console.log(docData, 'doc2');
    this.docArray = docData

    console.log(docData, 'docDatadocData');
    // this.verifyStatus=docData.er
  }
  getLocationData(){
    this.leadService.getByIdLeadId(this.lead_id).subscribe((res: any) => {
      if(res && res.data && this.singleLeadData){
        this.singleLeadData1 = res.data;
        this.singleLeadData1.unshift(
          {br_number:this.singleLeadData?.br_number, associated_company: this.singleLeadData?.associated_company,city_name:this.singleLeadData?.city_name,state_name:this.singleLeadData?.state_name, emp_count: this.singleLeadData?.employee_count},
        )  
      }
      console.log( this.singleLeadData1," this.singleLeadData1 this.singleLeadData1");
      
      this.fetchStageDataForLeads();
    });
  }

  checkMed() {
    if (this.singleLeadData?.segment === 2) {
      this.checkMedTrue = true;
    } else {
      this.checkMedTrue = false;
    }
  }
  get_cp_contact() {
    this.leadService.get_contact().subscribe(
      (res: any) => {
        this.contact_list = res.data;
      },
      (err) => {}
    );
  }

  mySet:any = new Map();
  Verify_contact(e: any,v:any) {
    console.log(e,'eeeee');
  
    if (this.leadForm.value.contact_review_form === null) {
      this.toast.error('Select Contact Review Form');
      return;
    }
    Swal.fire({
      title: 'Are you sure to verify this Contact Review Form',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      cancelButtonColor: '#f44336',
      confirmButtonColor: '#3f51b5',
      confirmButtonText: 'Yes',
      cancelButtonText: 'Not Now',
      width: '350',
    }).then((result) => {
      if (result.isConfirmed) {
        this.VerifyData.mobile_no = this.leadForm.value.contact_review_form;
        this.VerifyData.contact_review_form = 'true';
        this.mobileBtn = true;
        this.verifyMobile = true;
        this.varify_notVarify =true;
        this.mySet.set("contact",e)
        console.log(this.mySet);
        this.common(v)
        this.toast.success('Contact Review Form verified');
      }
    });
  }

  NotVerify_contact(e: any) {
    if (this.leadForm.value.contact_review_form === null) {
      this.toast.error('Select Contact Review Form');
      return;
    }
    Swal.fire({
      title: 'Are you sure to not verify this Contact Review Form',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      cancelButtonColor: '#f44336',
      confirmButtonColor: '#3f51b5',
      confirmButtonText: 'Yes',
      cancelButtonText: 'Not Now',
    }).then((result) => {
      if (result.isConfirmed) {
        this.VerifyData.mobile_no = this.leadForm.value.contact_review_form;
        this.VerifyData.contact_review_form = 'false';
        this.mobileBtn = true;
        this.notVerifyMobile = true;
        this.enableReject = true;
        // this.mySet.set(e)

        // this.varify_notVarify =true;
      }
    });
  }

  Verify_GST(e: any,v:any) {
    if (this.leadForm.value.gst_file === null) {
      this.toast.error('Select Candidate');
      return;
    }
    Swal.fire({
      title: 'Are you sure to verify this Email',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      cancelButtonColor: '#f44336',
      confirmButtonColor: '#3f51b5',
      confirmButtonText: 'Yes',
      cancelButtonText: 'Not Now',
    }).then((result) => {
      if (result.isConfirmed) {
        this.gstBtn = true;
        this.verifyGst = true;
        this.VerifyData.gst_file = this.leadForm.value.gst_file;
        this.VerifyData.gst_file_status = 'true';
        this.toast.success('GST File verified');
        this.varify_notVarifyGst =true;
        this.mySet.set('gst',e)
        console.log(this.mySet);
        this.common(v)

      }
    });
  }

  NotVerify_GST(e: any) {
    if (this.leadForm.value.gst_file === null) {
      this.toast.error('Select Candidate');
      return;
    }
    Swal.fire({
      title: 'Are you sure to not verify this Email',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      cancelButtonColor: '#f44336',
      confirmButtonColor: '#3f51b5',
      confirmButtonText: 'Yes',
      cancelButtonText: 'Not Now',
    }).then((result) => {
      if (result.isConfirmed) {
        this.VerifyData.gst_file = this.leadForm.value.gst_file;
        this.VerifyData.gst_file_status = 'false';
        this.gstBtn = true;
        this.notVerifyGst = true;
        this.enableReject = true;
        // this.varify_notVarify =true;
      }
    });
  }
  Verify_CompanyLogo(e: any,v:any) {
    if (this.leadForm.value.company_logo === null) {
      this.toast.error('Select Company Logo');
      return;
    }
    Swal.fire({
      title: 'Are you sure to verify this Company Logo',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      cancelButtonColor: '#f44336',
      confirmButtonColor: '#3f51b5',
      confirmButtonText: 'Yes',
      cancelButtonText: 'Not Now',
    }).then((result) => {
      if (result.isConfirmed) {
        this.btncompanyLogo = true;
        this.verifylogo = true;
        this.VerifyData.companylogo = this.leadForm.value.company_logo;
        this.VerifyData.companylogo_status = 'true';
        this.toast.success('Company Logo verified');
        this.varify_notVarifyLogo =true;
        this.mySet.set('companyLogo',e)
        console.log(this.mySet);
        this.common(v)

      }
    });
  }

  NotVerify_CompanyLogo(e: any) {
    if (this.leadForm.value.company_logo === null) {
      this.toast.error('Select Company Logo');
      return;
    }
    Swal.fire({
      title: 'Are you sure to not verify this  Company Logo',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      cancelButtonColor: '#f44336',
      confirmButtonColor: '#3f51b5',
      confirmButtonText: 'Yes',
      cancelButtonText: 'Not Now',
    }).then((result) => {
      if (result.isConfirmed) {
        this.VerifyData.companylogo = this.leadForm.value.company_logo;
        this.VerifyData.companylogo_status = 'false';
        this.btncompanyLogo = true;
        this.notVerifylogo = true;
        this.enableReject = true;
        // this.varify_notVarify =true;
      }
    });
  }
  Verify_Basicform(e: any,v:any) {
    if (this.leadForm.value.basic_form === null) {
      this.toast.error('Select Basic Form');
      return;
    }
    Swal.fire({
      title: 'Are you sure to verify this Basic Form',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      cancelButtonColor: '#f44336',
      confirmButtonColor: '#3f51b5',
      confirmButtonText: 'Yes',
      cancelButtonText: 'Not Now',
    }).then((result) => {
      if (result.isConfirmed) {
        this.basicbtn = true;
        this.verfifybasicbtn = true;
        this.VerifyData.basic_form = this.leadForm.value.basic_form;
        this.VerifyData.basic_form_status = 'true';
        this.toast.success('Basic Form verified');
        this.varify_notVarifyBasic =true;
        this.mySet.set('basicForm',e)
        console.log(this.mySet);
        this.common(v)

      }
    });
  }

  NotVerify_Basicform(e: any) {
    if (this.leadForm.value.basic_form === null) {
      this.toast.error('Select Basic Form');
      return;
    }
    Swal.fire({
      title: 'Are you sure to not verify this  Basic Form',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      cancelButtonColor: '#f44336',
      confirmButtonColor: '#3f51b5',
      confirmButtonText: 'Yes',
      cancelButtonText: 'Not Now',
    }).then((result) => {
      if (result.isConfirmed) {
        this.VerifyData.basic_form = this.leadForm.value.basic_form;
        this.VerifyData.basic_form_status = 'false';
        this.basicbtn = true;
        this.notVerifybasicbtn = true;
        this.enableReject = true;
        // this.varify_notVarify =true;
      }
    });
  }
  
  Verify_Other(e: any) {
    console.log(e,'eee ');
    
    if (this.leadForm.value.other_file === null) {
      this.toast.error('Select  Other Form');
      return;
    }
    Swal.fire({
      title: 'Are you sure to verify this Other Form',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      cancelButtonColor: '#f44336',
      confirmButtonColor: '#3f51b5',
      confirmButtonText: 'Yes',
      cancelButtonText: 'Not Now',
    }).then((result) => {
      if (result.isConfirmed) {
        this.otherBtn = true;
        this.verfifyotherbtn = true;
        this.VerifyData.other_file = this.leadForm.value.other_file;
        this.VerifyData.other_file_status = 'true';
        this.toast.success('Other File verified');
        this.varify_notVarifyOther =true;
        this.mySet.set('other',e)
        console.log(this.mySet[0]);
        

      }
    });
  }

  NotVerify_Other(e: any) {
    if (this.leadForm.value.basic_form === null) {
      this.toast.error('Select Other File');
      return;
    }
    this.enableReject = true;
    Swal.fire({
      title: 'Are you sure to not verify this  Other File',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      cancelButtonColor: '#f44336',
      confirmButtonColor: '#3f51b5',
      confirmButtonText: 'Yes',
      cancelButtonText: 'Not Now',
    }).then((result) => {
      if (result.isConfirmed) {
        this.VerifyData.other_file = this.leadForm.value.other_file;
        this.VerifyData.other_file_status = 'false';
        this.otherBtn = true;
        this.notVerifyotherbtn = true;
        this.enableReject = true;
        // this.varify_notVarify =true;
      }
    });
  }

  checkUnreg() {
    if (this.singleLeadData?.gst_applicable === 'Unregistered Dealer') {
      this.unreg = true;
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
  getApprover() {
    this.configService.listApprover().subscribe((params: any) => {
      this.rowData = params.data;
    });
  }
  getCategory() {
    this.configService.listCategory().subscribe((res: any) => {
      this.categoryList = res.data;
    });
  }
  getEACode() {
    this.configService.getEacode().subscribe((res: any) => {
      this.eaCodeList = res.data;
    });
  }
  nonCertFunc() {
    if (this.singleLeadData?.certificate_type == 'Non Cert') {
      this.nonCertt = true;
    }
  }
  // downloadGst(e: any) {
  //   const pdfUrl = this.singleLeadData?.gst_file;
  //   const pdfName = this.singleLeadData?.gst_applicable;
  //   FileSaver.saveAs(pdfUrl, pdfName);
  //   e.stopPropagation();
  // }
  // downloadContact(e: any) {
  //   const pdfUrl = this.singleLeadData?.contact_review_form;
  //   const pdfName = this.singleLeadData?.contact_owner;
  //   FileSaver.saveAs(pdfUrl, pdfName);
  //   e.stopPropagation();
  // }
  // downloadLogo(e: any) {
  //   const pdfUrl = this.singleLeadData?.company_logo;
  //   const pdfName = this.singleLeadData?.associated_company;
  //   FileSaver.saveAs(pdfUrl, pdfName);
  //   e.stopPropagation();
  // }
  // downloadOther(e: any) {
  //   // const pdfUrl = this.singleLeadData?.other_file;
  //   // const pdfName = this.singleLeadData?.document_remark;
  //   // FileSaver.saveAs(pdfUrl, pdfName);
  //   // e.stopPropagation();

  //   if (this.OtherfileData) {
  //   FileSaver.saveAs(this.OtherfileData, this.OtherfileData?.name);
  //   }
  // }
  // downloadBasic(e: any) {
  //   const pdfUrl = this.singleLeadData?.basic_form;
  //   const pdfName = this.singleLeadData?.first_name;
  //   FileSaver.saveAs(pdfUrl, pdfName);
  //   e.stopPropagation();
  // }
  value(value: any) {
    throw new Error('Method not implemented.');
  }

  getAchievementList() {
    this.recruitService.getAllAchivement().subscribe(
      (res: any) => {
        this.allAchievement = res.data;
        this.variables = this.allAchievement.map((res: any) => res.first_name);
        this.checkData = this.allAchievement;
        this.variable = this.allAchievement;
        let filterUser = this.allAchievement.find(
          (res: any) => res.employee_id == this.loginUserId
        );
        (this.employee_id = filterUser.employee_id),
          this.leadForm.controls['approver_name_l2Id'].patchValue(
            Number(this.employee_id)
          );
      },
      (err) => {}
    );
  }

  enableRemarks() {
    Swal.fire({
      title: `Are you sure to reject documents?`,
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      cancelButtonColor: '#f44336',
      confirmButtonColor: '#3f51b5',
      confirmButtonText: 'Yes',
      cancelButtonText: 'Not Now',
    }).then((result) => {
      if (result.isConfirmed) {
        this.enableRem = true;
        const data = {
          status: 'Account',
        };
        this.leadService.editLead(this.lead_id, data).subscribe((res: any) => {
          this.toast.success(res.message);
          this.route.navigate(['master/lead/lead-account'], {
            queryParams: { lead_id: this.lead_id },
          });
        });
      }
    });
  }

  patchCountryCode(id: any) {
    this.countryList.forEach((res: any) => {
      if (res.countryss_id == id) {
        let code = "+" + res.phone_code;
        this.leadForm.patchValue({
          // phone_code: code,
          mobile_code: code
        })
      }
    })
  }

  reject() {
    const data = {
      status: 'Rejected',
    };
    this.leadService.editLead(this.lead_id, data).subscribe((res: any) => {
      this.toast.success(res.message);
      this.route.navigate(['master/lead/lead-account'], {
        queryParams: { lead_id: this.lead_id },
      });
    });
  }

  candidateClick(e: any) {
    this.candidateId = e;
    this.recruitService.interViewGetIdBy(e).subscribe((res: any) => {
      this.interviewGetId = res.data;

      this.patchFormvalue();
    });
  }

  // viewDocLogo() {
  //   window.open(this.singleLeadData.company_logo, '_blank');
  // }
  // viewDocOther() {
  //   window.open(this.singleLeadData.other_file, '_blank');
  // }
  // viewDocReview() {
  //   window.open(this.singleLeadData.contact_review_form, '_blank');
  // }
  // viewDocGST() {
  //   window.open(this.singleLeadData.gst_file, '_blank');
  // }

  // viewDocBasic() {
  //   window.open(this.singleLeadData.basic_form, '_blank');
  // }

  // fileInputChange(fileInput: File[] | any) {
  //   this.errorMsg = '';

  //   if (fileInput.target.files && fileInput.target.files[0]) {
  //     const file = fileInput.target.files[0];

  //     const reader = new FileReader();
  //     const fileSizeInMb = file.size / 1024 ** 2;
  //     if (fileSizeInMb > 30) {
  //       this.errorMsg = 'File size should be less than 30MB';
  //       return;
  //     }
  //     reader.onload = (e: any) => {
  //       this.fileDetails.filePath = reader.result;
  //     };
  //     reader.readAsDataURL(file);
  //     this.fileDetails.file = file;
  //   } else {
  //     this.fileDetails = { filePath: '', file: null };
  //   }
  // }

  // fileInputChangeOne(fileInput: File[] | any) {
  //   this.errorMsg = '';

  //   if (fileInput.target.files && fileInput.target.files[0]) {
  //     const file = fileInput.target.files[0];
  //     const reader = new FileReader();
  //     const fileSizeInMb = file.size / 1024 ** 2;
  //     if (fileSizeInMb > 30) {
  //       this.errorMsg = 'File size should be less than 30MB';
  //       return;
  //     }
  //     reader.onload = (e: any) => {
  //       this.fileDetailsOne.filePath = reader.result;
  //     };
  //     reader.readAsDataURL(file);
  //     this.fileDetailsOne.file = file;
  //   } else {
  //     this.fileDetailsOne = { filePath: '', file: null };
  //   }
  // }

  // fileInputChangeTwo(fileInput: File[] | any) {
  //   this.errorMsg = '';

  //   if (fileInput.target.files && fileInput.target.files[0]) {
  //     const file = fileInput.target.files[0];
  //     const reader = new FileReader();
  //     const fileSizeInMb = file.size / 1024 ** 2;
  //     if (fileSizeInMb > 30) {
  //       this.errorMsg = 'File size should be less than 30MB';
  //       return;
  //     }
  //     reader.onload = (e: any) => {
  //       this.fileDetailsTwo.filePath = reader.result;
  //     };
  //     reader.readAsDataURL(file);
  //     this.fileDetailsTwo.file = file;
  //   } else {
  //     this.fileDetailsTwo = { filePath: '', file: null };
  //   }
  // }

  // fileInputChangeThree(fileInput: File[] | any) {
  //   this.errorMsg = '';

  //   if (fileInput.target.files && fileInput.target.files[0]) {
  //     const file = fileInput.target.files[0];
  //     const reader = new FileReader();
  //     const fileSizeInMb = file.size / 1024 ** 2;
  //     if (fileSizeInMb > 30) {
  //       this.errorMsg = 'File size should be less than 30MB';
  //       return;
  //     }
  //     reader.onload = (e: any) => {
  //       this.fileDetailsThree.filePath = reader.result;
  //     };
  //     reader.readAsDataURL(file);
  //     this.fileDetailsThree.file = file;
  //   } else {
  //     this.fileDetailsThree = { filePath: '', file: null };
  //   }
  // }

  // fileInputChangeFour(fileInput: File[] | any) {
  //   this.errorMsg = '';

  //   if (fileInput.target.files && fileInput.target.files[0]) {
  //     const file = fileInput.target.files[0];
  //     const reader = new FileReader();
  //     const fileSizeInMb = file.size / 1024 ** 2;
  //     if (fileSizeInMb > 30) {
  //       this.errorMsg = 'File size should be less than 30MB';
  //       return;
  //     }
  //     reader.onload = (e: any) => {
  //       this.fileDetailsFour.filePath = reader.result;
  //     };
  //     reader.readAsDataURL(file);
  //     this.fileDetailsFour.file = file;
  //     this.OtherfileData = file;
  //     this.OtherfileUrl = URL.createObjectURL(file)
  //   } else {
  //     this.fileDetailsFour = { filePath: '', file: null };
  //   }
  // }

  patchFormvalue() {
    this.checkUnreg();
    if (this.singleLeadData?.segment != 'null || undefined') {
      this.leadService
        .getCertificateByID(this.singleLeadData?.segment)
        .subscribe((res: any) => {
          this.certificateList = res.data.new_certificate_types;
        });
      this.leadService
        .getRegionByID(this.singleLeadData?.segment)
        .subscribe((res: any) => {
          this.regionSList = res.data.new_regions;
        });
      this.leadService
        .getCategoryBySegID(this.singleLeadData?.segment)
        .subscribe((res: any) => {
          this.CategorySList = res.data.new_category_masters;
        });
    }

    if (this.singleLeadData?.region != 'null || undefined') {
      this.leadService
        .getRBuisnessHead(this.singleLeadData?.region)
        .subscribe((res: any) => {
          this.regionalbheadList = res.data;
        });
      this.leadService
        .getGlobalManagerSales(this.singleLeadData?.region)
        .subscribe((res: any) => {
          this.globalMsalesList = res.data;
        });
    }

    if (this.singleLeadData?.country != 'undefined || null') {
      this.leadService
        .getStateByID(this.singleLeadData?.country)
        .subscribe((res: any) => {
          this.patchCountryCode(this.singleLeadData?.country)
          this.stateList = res.data;
        });
    }
    if (this.singleLeadData?.state != 'undefined || null') {
      this.leadService
        .getCityByID(this.singleLeadData?.state)
        .subscribe((res: any) => {
          this.cityList = res.data;
        });
    }
    if (this.singleLeadData?.city != 'undefined || null') {
      this.leadService
        .getPinCodeNew(this.singleLeadData?.city)
        .subscribe((res: any) => {
          this.pinCodeList = res.data;
        });
    }
    // if (this.singleLeadData?.certificate_type != 'undefined || null') {
    //   this.leadService
    //     .getAssesmentByID(this.singleLeadData?.certificate_type)
    //     .subscribe((res: any) => {
    //       this.assesmentList = res.data[0].newitemlist;
    //     });
    // }
console.log(this.singleLeadData?.opp_verified_remarks_level1,'this.singleLeadData?.opp_verified_remarks_level1');
console.log(this.singleLeadData?.userrespectiveleads[0]?.phone_code,'this.singleLeadData?.userrespectiveleads[0]?.phone_code');

    this.leadForm.patchValue({
      opp_verified_remarks_level1: this.singleLeadData?.opp_verified_remarks_level1,
      phone_code: this.singleLeadData?.userrespectiveleads[0]?.phone_code,
      opp_verifier_name_level1: this.loginUserName,
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
      lead_created_by_name: this.singleLeadData?.lead_created_by_name,
      address2: this.singleLeadData?.address2,
      city: this.singleLeadData?.city,
      non_cert_type: this.singleLeadData?.non_cert_type,
      state: this.singleLeadData?.state,
      country: this.singleLeadData?.country,
      postal_code: this.singleLeadData?.postal_code,
      region: this.singleLeadData?.region,
      urd_number: this.singleLeadData?.urd_number,
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
      remarks: this.singleLeadData?.remarks,
      lead_validated_date: this.singleLeadData?.lead_validated_date,
      validated_by: this.singleLeadData?.validated_by,
      lead_validate_remarks: this.singleLeadData?.lead_validate_remarks,
      industry_sector: this.singleLeadData?.industry_sector,
      customer_category: this.singleLeadData?.customer_category,
      employee_count: this.singleLeadData?.employee_count,
      company_remarks: this.singleLeadData?.company_remarks,
      gst_applicable: this.singleLeadData?.gst_applicable,
      gst_number: this.singleLeadData?.gst_number,
      pan_number: this.singleLeadData?.pan_number,
      tan_number: this.singleLeadData?.tan_number,
      product_request: this.singleLeadData?.product_request,
      assigned_to: this.singleLeadData?.assigned_to,
      assessment_period: this.singleLeadData?.assessment_period,
      customer_sales_executive: this.singleLeadData?.customer_sales_executive,
      opportunity_type: this.singleLeadData?.opportunity_type,
      opportunity_ref: this.singleLeadData?.OpportunityRef_no,
      no_of_mandays: this.singleLeadData?.no_of_mandays,
      ea_code: this.singleLeadData?.ea_code,
      // billing_site: this.singleLeadData?.billing_site,
      document_remark: this.singleLeadData?.document_remark||'',

      contact_review_form: this.singleLeadData?.contact_review_form,
      gst_file: this.singleLeadData?.gst_file,
      basic_form: this.singleLeadData?.basic_form,
      company_logo: this.singleLeadData?.company_logo,
      other_file: this.singleLeadData?.other_file,

      // opp_verifier_name_level1: this.mainEmployeeData?.first_name,
      opp_verified_date_level1: this.myDate,
      approver_name_l2Id: this.employee_id,
      lead_assgn_contact_owner: this.singleLeadData?.lead_assgn_contact_owner,
    });
  }

  getStage(br1: any) {
    this.leadService.getStage(br1).subscribe((res: any) => {
      this.stageData = res.data;
      console.log(this.stageData,'this.stageData');  
    });
  }

  getStage1(br1: any) {
    this.leadService.getStage(br1).subscribe((res: any) => {
      this.stageData = res.data;
      console.log( this.stageData ,'this.stageData');
      
    });
  }

  getStageByLead_id(lead_id: any) {
    this.leadService.getStageByLeadId(this.lead_id).subscribe((res: any) => {
      this.stageDataByLeadId = res?.groupedArrays;

    });
  }

  selectApprover(e: any) {
    this.employee_id = e.value;
    let filterUserName = this.allAchievement.find(
      (res: any) => res.employee_id == this.employee_id
    );

    this.loginUserName = filterUserName.first_name;
    this.contact_owner_id = e.value;
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

  getCountry() {
    this.configService.getCountry().subscribe((res: any) => {
      this.countryList = res.data;
    });
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

  submitForm() {
    console.log(this.mySet);
    
    this.submitted = false;

    console.log(!this.mySet.has(true),'!this.mySet.has(true)');
    
    // if(!this.mySet.has(true)){
    //   this.toast.warning('Please Verify Document ','Action');
    //    return;
    // }
    // if(this.singleLeadData.Lead_management_docs){

    // }
    if (!this.condVerifier==true) {
      this.toast.warning('Please Verify Document ', 'Action');
      return;
    }
    // if(this.otherFileCond==true){
    //    this.keysToCheck = ['contact', 'gst', 'companyLogo', 'basicForm', 'other'];

    // }else{
    //   this.keysToCheck= ['contact', 'gst', 'companyLogo', 'basicForm'];

    // }
    // console.log(this.keysToCheck,'this.keysToCheck');
    //  for (const key of this.keysToCheck) {
    //     if (!this.mySet.has(key)|| this.mySet.get(key)!== true) {
    //         console.log(`Error: ${key} is missing or not true`);
    //         this.toast.warning('Please Verify Document ','Action');
    //         return; // Return if key is missing or value is not true
    //     }
    // }
    console.log("Form submitted successfully"); //
    let val = this.leadForm.value;
    // this.leadForm.controls['contact_owner_id'].setValue(this.contact_owner_id);
    const dataMain = {
      contact_owner_id: this.contact_owner_id,
      customer_type: this.singleLeadData?.customer_type,
      multiple_site_audit: this.singleLeadData?.multiple_site_audit || val.site_audit,
      associated_company: this.singleLeadData?.associated_company,
      segment: val.segment,
      certificate_type: val.certificate_type,
      first_name: val.first_name,
      last_name: val.last_name,
      email: val.email,
      emplyoment_type: val.emplyoment_type,
      job_title: val.job_title,
      street_address: val.street_address,
      address2: val.address2,
      city: val.city,
      categories: val.categories,
      state: val.state,
      country: val.country,
      assigned_to: val.assigned_to,
      non_cert_type: val.non_cert_type,
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
      remarks: val.remarks,
      lead_validate_stage: val.lead_validate_stage,
      validated_by: val.validated_by,
      lead_validated_date: moment(val.lead_validated_date).format('YYYY-MM-DD'),
      lead_validate_remarks: val.lead_validate_remarks,
      lead_assgn_contact_owner: this.singleLeadData?.lead_assgn_contact_owner,
      assigned_by: val.assigned_by,
      // assigned_date: moment(val.assigned_date).format('YYYY-MM-DD'),
      stage: val.stage,
      lead_assgn_remark: val.lead_assgn_remark,
      customer_category: val.customer_category,
      product_request: val.product_request,
      customer_sales_executive: val.customer_sales_executive,
      opportunity_type: val.opportunity_type,
      opportunity_ref: val.opportunity_ref,
      billing_site: val.billing_site,
      no_of_mandays: val.no_of_mandays,
      ea_code: val.ea_code,
      lead_created_by_name: val.lead_created_by_name,
      assessment_period: val.assessment_period,
      industry_sector: val.industry_sector,
      employee_count: val.employee_count,
      company_remarks: val.company_remarks,
      gst_applicable: val.gst_applicable,
      gst_number: val.gst_number,
      pan_number: val.pan_number,
      tan_number: val.tan_number,
      approver_name_l2Id: val.approver_name_l2Id,
      approver_name_l2: this.loginUserName,
      opp_verifier_name_level1: val.opp_verifier_name_level1,
      billing_site_copy: this.singleLeadData.billing_site_copy,
      // lead_created_by_name:val.lead_created_by_name,
      opp_verified_date_level1: moment(val.opp_verified_date_level1).format(
        'YYYY-MM-DD'
      ),
      opp_verified_remarks_level1: val.opp_verified_remarks_level1,
      site_audit:val.site_audit || this.singleLeadData?.multiple_site_audit,

      status: 'Pre L1',
    };
    console.log( this.VerifyData,' this.VerifyData');
    console.log(dataMain,'dataMaindataMaindataMain');
    console.log(this.singleLeadData?.lead_assgn_contact_owner,'this.singleLeadData?.lead_assgn_contact_owner');

    const data = {
      contact_review_form: this.contactReviewData || this.singleLeadData.contact_review_form,
      contact_review_form_status: this.VerifyData.contact_review_form,
      gst_file: this.gstFileData || this.singleLeadData.gst_file,
      gst_file_status: this.VerifyData.gst_file_status,
      basic_form: this.basicformData || this.singleLeadData.basic_form,
      Basic_Form_status: this.VerifyData.basic_form_status,
      company_logo: this.companyLogoData || this.singleLeadData.company_logo,
      compnay_logo_file_status: this.VerifyData.companylogo_status,
      // other_file: this.OtherfileData,
      // other_status: this.VerifyData.other_file_status,
      document_remark: val.document_remark||'',
    };
    console.log('datadata', data), 
    console.log('daatamain', dataMain)
      this.leadService
        .editLeadDoc_Status(this.lead_id, data)
        .subscribe((res: any) => {});
    this.leadService.editLead(this.lead_id, dataMain).subscribe((res: any) => {
      this.toast.success('Opportunity Updated Successfully..');
      this.route.navigate(['master/lead/lead-opportunity'], {
        queryParams: { lead_id: this.lead_id },
      });
    });
  }
  updateForm() {
    this.submitted = false;
    if (this.leadForm.invalid) {
      this.toast.error(
        'Required fields should not be empty.',
        'Error Occurred!'
      );
      return;
    }
    const data = this.leadForm.value;

    this.leadService.editLead(this.lead_id, data).subscribe((res: any) => {
      this.toast.success('Updated Assignment Successfully..');
      this.route.navigate(['master/lead/lead-opportunity']);
    });
  }

  typeChangeParent(e: any, event: any) {
    console.log('event******', e);
    if (this.singleLeadData?.billing_site == true) {
      this.parentSide = true;
      this.childSide = false;
      this.getStage1(this.singleLeadData?.br_number);
    }
    else
    {
      this.parentSide = false;
      this.leadForm.patchValue({
        billing_site: false,
    })
  }
}

  // typeChangeChild(e: any, event: any) {
  //   console.log('event******', event?.br_number);
  //   if (event.checked == true) {
  //     this.childSide = true;
  //      this.singleLeadData1.forEach((res: any) => {
  //       console.log('res ', res);
  //       if (res.br_number == event.br_number) {
  //         res.checked = e.checked;
  //         this.child_br_number = event?.br_number;
  //         console.log('child br number ******', this.child_br_number);
  //       } else {
  //         res.checked = false;
  //       }
  //     });
  //     this.getStage1(this.child_br_number);
  //   } 
  // }
  fileDownloadMethod(fileData: any, e: any) {
    console.log(fileData);

    if (fileData) {
      FileSaver.saveAs(fileData, fileData?.name);
    }
  }

  fileViewMethod(filename: string) {
    if (filename == 'other') {
      if (this.OtherfileUrl) {
        window.open(this.OtherfileUrl, '_blank');
      } else {
        window.open(this.singleLeadData?.other_file, '_blank');
      }
    } else if (filename == 'contactReview') {
      if (this.contactReviewUrl) {
        window.open(this.contactReviewUrl, '_blank');
      } else {
        window.open(this.singleLeadData?.contact_review_form, '_blank');
      }
    } else if (filename == 'gst') {
      if (this.gstFileUrl) {
        window.open(this.gstFileUrl, '_blank');
      } else {
        window.open(this.singleLeadData?.gst_file, '_blank');
      }
    } else if (filename == 'companyLogo') {
      if (this.companyLogoUrl) {
        window.open(this.companyLogoUrl, '_blank');
      } else {
        window.open(this.singleLeadData?.company_logo, '_blank');
      }
    } else if (filename == 'basicForm') {
      if (this.basicFormUrl) {
        window.open(this.basicFormUrl, '_blank');
      } else {
        window.open(this.singleLeadData?.basic_form, '_blank');
      }
    } else {
    }
  }

  fileUploadMethod(fileInput: File[] | any, filename: string) {
    this.errorMsg = '';
    if (fileInput.target.files && fileInput.target.files[0]) {
      const file = fileInput.target.files[0];
      const fileSizeInMb = file.size / 1024 ** 2;
      if (fileSizeInMb > 30) {
        this.errorMsg = 'File size should be less than 30MB';
        return;
      }
      if (filename == 'other') {
        this.OtherfileData = file;
        this.OtherfileUrl = URL.createObjectURL(file);
      } else if (filename == 'contactReview') {
        this.contactReviewData = file;
        this.contactReviewUrl = URL.createObjectURL(file);
      } else if (filename == 'gst') {
        this.gstFileData = file;
        this.gstFileUrl = URL.createObjectURL(file);
      } else if (filename == 'companyLogo') {
        this.companyLogoData = file;
        this.companyLogoUrl = URL.createObjectURL(file);
      } else if (filename == 'basicForm') {
        this.basicformData = file;
        this.basicFormUrl = URL.createObjectURL(file);
      } else {
      }
    }
  }
  fun1(e: any) {
    const aa = e;
    let filteredVariable = this.variable.filter((item: any) =>
      aa.includes(item.first_name)
    );
    this.checkData = filteredVariable;
    console.log(this.checkData, 'checkkkk');
  }
  certificate(e:any){
    const cert_id=e.value
    this.configService.getProducts(cert_id).subscribe((res:any)=>{
      this.assesmentList=res.data
    },(err:any)=>{
      this.toast.warning("no data found")
    })


  }
  getAllApprover(){
    this.leadService.getAllL2ApproverNew().subscribe((res: any) => {
      // this.segmentList = res.data;
console.log(res,'reesss aprover');
this.newApprverData=res.data
    });
  }
  onChange(event: any, index: number) {
    const file: File | null = event.target.files[0] || null;

    if (!file) {
      return; // No file selected, nothing to do.
    }

    const fileSizeInMb = file.size / (1024 * 1024);

    if (fileSizeInMb > 30) {
      this.errorMsg = 'File size should be less than 30MB';
      return;
    }

    this.selectedFiles[index] = file;

    this.imageToUpload = file;
    this.otherFileData.push({ index, filePath: this.imageToUpload });

    const reader = new FileReader();
    // reader.onload = (e: any) => {
    //   this.imagePath[index] = e.target.result;
    // };
    reader.readAsDataURL(this.imageToUpload);
  }
  viewDocOther(index: number) {
    const file = this.selectedFiles[index];
    if (file) {
      // If a file was uploaded, open the uploaded file
      const fileUrl = URL.createObjectURL(file);
      window.open(fileUrl, '_blank');
    } else {
      const fileData = this.otherDocumentData[index]; // Adjust this line based on your data structure
      if (fileData && fileData.other_file) {
        window.open(fileData.other_file, '_blank');
      }
    }
  }

  downloadOther(index: number) {
    const file = this.selectedFiles[index];
    if (file) {
      const fileBlob = new Blob([file], { type: file.type });
      const fileUrl = URL.createObjectURL(fileBlob);

      const a = document.createElement('a');
      a.href = fileUrl;
      a.download = file.name;
      a.style.display = 'none';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } else {
      const fileData = this.otherDocumentData[index];
      if (fileData) {
        FileSaver.saveAs(fileData.other_file, fileData?.name);
      }
    }
  }

  uploadOtherDoc(i: any) {
    let file: any = this.otherFileData.find((e: any) => e.index === i);

    if (file == null || undefined) {
      this.toast.error('Fields should not be blank');
      return;
    }
    if (file) {
      let filePath: File = file.filePath;
      const formData: any = new FormData();
      formData.append('other_file', filePath, filePath.name);
      this.leadService
        .uploadOtherDoc(this.lead_id, formData)
        .subscribe((res: any) => {
          if (res.code == 200) {
            this.toast.success(res.message);
          }
        });
    }
  }

  fetchStageDataForLeads() {
    const modify:any=[]
    const modify1:any=[]

    for (let a=0;a<this.singleLeadData1.length;a++) {
      const brNumber = this.singleLeadData1[a].br_number;
      this.leadService.getStage(brNumber)
        .subscribe((data: any) => {
          console.log(this.singleLeadData1,"singledata");
          
          console.log(data.data,"cl");
          let dd = {...data.data[0], stage:data.data, singleData: this.singleLeadData1[a]}
          modify.push(dd);
            console.log();
            
          // modify.push({stages:data.data})
    

          // for(let b=0;b<this.singleLeadData1[a].length;b++){
          //   modify1.push({stage:this.singleLeadData1[b].stage,mandays:this.singleLeadData1[b].noOfMandays})
          // }
          
          // let obj = {
          //   ...lead,...data.data
          //  }

          //  console.log('obk',obj);
           

          // this.stageData.push({ lead: obj, stageData: data.data });
          
        });
        // console.log('data123',this.stageData.length);

        
    }

    
    this.stageData=modify
    this.stageData1=modify1

    console.log(modify,'modify');
    console.log(modify1,'modify1');

    


  }

  otherVarifyStatus:any = []
  Status:any = []

  otherVarify(data:any,i:any,e:any,v:any){
   console.log('data', data, i);
   Swal.fire({
    title: 'Are you sure to verify this  Other File',
    text: "You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    cancelButtonColor: '#f44336',
    confirmButtonColor: '#3f51b5',
    confirmButtonText: 'Yes',
    cancelButtonText: 'Not Now',
  }).then((result) => {
    if (result.isConfirmed) {
      this.otherVarifyStatus[i] = true
      if (!this.Status.includes(i)) {
      this.Status.push(this.otherVarifyStatus[i],i)
      console.log(this.Status);
      this.toast.success('Other file Is Verify SuccessFully')
      const confirmCount = this.Status.filter((item:any) => item == "false");
        if (!confirmCount) {
          this.enableReject = true;
          
          // this.toast.success('Other file Is Verify SuccessFully')
        }
      }
      this.mySet.set('other',e)
          console.log(this.mySet);
          this.common(v)
    }
  })
   
  }

  otherNotVarify(data:any,i:any){
  Swal.fire({
    title: 'Are you sure to not verify this  Other File',
    text: "You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    cancelButtonColor: '#f44336',
    confirmButtonColor: '#3f51b5',
    confirmButtonText: 'Yes',
    cancelButtonText: 'Not Now',
  }).then((result) => {
    if (result.isConfirmed) {
      this.otherVarifyStatus[i] = false;
      if (!this.Status.includes(i)) {
        console.log(this.Status);
        this.Status.push(this.otherVarifyStatus[i],i);
        const confirmCount = this.Status.filter((item:any) => item == "false");
        if (confirmCount) {
          this.enableReject = true;
          this.toast.success('Other file Is Not Verify')
        
        }
      }
    }
  });
   }
   common(Index: any) {
    const is = false
    console.log(Index, "index");
    console.log(
      this.docArray
      , "docArray"
    );
    this.docArray[Index] = is

    console.log(
      this.docArray
      , "docArray"
    );
    const aa = this.docArray.every((obj: any) => obj == false)
    console.log(aa, "jkjkjkjkjkj");
this.condVerifier=aa;
console.log(this.condVerifier);

  }
}
