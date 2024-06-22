import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import Swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';
import { LeadService } from 'src/app/@shared/services/lead.service';
import { RecruitService } from 'src/app/@shared/services/recruitment.service';
import { ConfigurationalmasterService } from '../../../../@shared/services/configurationalmaster.service';

declare var require: any;
const FileSaver = require('file-saver');

@Component({
  selector: 'app-audit-l2',
  templateUrl: './audit-l2.component.html',
  styleUrls: ['./audit-l2.component.scss'],
})
export class AuditL2Component {
  dateLevel1: any;

  displayedColumns: string[] = ['stage', 'noOfMandays'];
  br2: any;
  parentSide: boolean;
  br1: any;
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
  allAchievement: any;
  errorMsg: string = '';
  stateList: any[] = [];
  countryList: any[] = [];
  cityList: any;
  pinCodeList: any;
  allDataOne: any;
  pinCodeTrue: boolean = true;
  allDataTwo: any;
  allDataMan: any;
  now = new Date();
  mobileBtn: boolean = false;
  // for GST File
  gstBtn: boolean = false;
  verifyGst: boolean = false;
  notVerifyGst: boolean = false;
  // basic form 
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
  enableReject: boolean = false;


  verifyMobile: boolean = false;
  notVerifyMobile: boolean = false;
  VerifyData: any = { precious_job_status: [] };
  // now = new Date();
  year: any = this.now.getFullYear();
  month = this.now.getMonth();
  // day = this.now.getDay();
  date = this.now.getDate();
  maxDate = moment({ year: this.year + 100, month: this.month, date: this.date }).format('YYYY-MM-DD');
  // minDate = moment({ year: this.year - 0, month: this.month, date: this.date }).format('YYYY-MM-DD');
  fileDetails: { filePath: string | any; file: any } = {
    filePath: '',
    file: null,
  };
  fileDetailsOne: { filePath: string | any; file: any } = {
    filePath: '',
    file: null,
  };
  fileDetailsTwo: { filePath: string | any; file: any } = {
    filePath: '',
    file: null,
  };
  fileDetailsThree: { filePath: string | any; file: any } = {
    filePath: '',
    file: null,
  };
  fileDetailsFour: { filePath: string | any; file: any } = {
    filePath: '',
    file: null,
  };
  categoryList: any;
  myDate = new Date();
  submitted: boolean;
  stageData: any[] = [];
  nonCertt: boolean = false;
  unreg: boolean = false;
  gstreg: boolean = false;
  eaCodeList: any;
  rowData: any;
  leadUpdate: any;
  segmentList: any;
  certificateList: any;
  regionSList: any;
  CategorySList: any;
  regionalbheadList: any;
  globalMsalesList: any;
  assesmentList: any;
  gstvalidation: boolean;
  nonCertTrue: any;
  singleLeadData1: any;
  contact_list: any;
  medvalue: boolean;
  singleDocumentData: any;
  otherBtn: boolean;
  notVerifyotherbtn: boolean;
  verfifyotherbtn: boolean;
  basicbtn: boolean;
  notVerifybasicbtn: boolean;
  verfifybasicbtn: boolean;
  btncompanyLogo: boolean;
  notVerifylogo: boolean;
  verifylogo: boolean;
  eacode: boolean = false;
  childSide: boolean;
  child_br_number: any;
  FromDate: any;
  toDate: any;
  // opp_verified_date_level1 = new FormControl();
  // opp_verified_date_level2 = new FormControl();
  startDate = new FormControl();
  endDate = new FormControl();
  nowDate: any;
  otherDocumentData: any
  imageToUpload: any;
  selectedFiles: File[] = [];
  otherFileData: any = [];
  varify_notVarify: boolean = false;
  otherFileCond: any;
  keysToCheck: any;
  docArray: any = [];
  condVerifier: any;
  stageData1: any;

  // minDate: string;
  constructor(
    private fb: FormBuilder,
    private leadService: LeadService,
    private toast: ToastrService,
    private configService: ConfigurationalmasterService,
    private route: Router,
    private recruitService: RecruitService,
    private activeroute: ActivatedRoute
  ) {
    this.leadForm = this.fb.group({
      customer_type: [{ value: '', disabled: true }, Validators.required],
      site_audit: [{ value: '', disabled: true }, Validators.required],
      new_location_site: new FormControl(null),
      associated_company: new FormControl(null),
      billing_site: new FormControl(null),
      segment: new FormControl(null, Validators.required),
      certificate_type: new FormControl(null, Validators.required),
      first_name: new FormControl(null, Validators.required),
      last_name: new FormControl(null, Validators.required),
      email: new FormControl(null, [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]),
      emplyoment_type: new FormControl(null),
      job_title: new FormControl(null),
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
      lead_created_by_name: new FormControl(null),
      phone_number: new FormControl(null, Validators.required),
      mobile_number: new FormControl(null, [Validators.required, Validators.maxLength(15)]),
      dqs_contact_source: new FormControl(null, Validators.required),
      contact_owner: new FormControl(null),
      lead_created_date: new FormControl(null),
      standard_program_assement: new FormControl(null, Validators.required),
      remarks: new FormControl(null, Validators.required),
      lead_validate_stage: new FormControl(null),
      validated_by: new FormControl(null),
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
      gst_number: new FormControl(null, Validators.required),
      pan_number: new FormControl(null),
      tan_number: new FormControl(null),
      file: new FormControl(null),
      contact_review_form: new FormControl(null),
      gst_file: new FormControl(null),
      basic_form: new FormControl(null),
      company_logo: new FormControl(null),
      other_file: new FormControl(null),
      categories: new FormControl(null),
      document_remark: new FormControl(null),
      customer_sales_executive: new FormControl(null),
      assigned_to: new FormControl(null),
      opportunity_type: new FormControl(null),
      opportunity_ref: new FormControl(null),
      product_request: new FormControl(null),
      no_of_mandays: new FormControl(null),
      ea_code: new FormControl(null),
      urd_number: new FormControl(null),
      non_cert_type: new FormControl(null),
      assessment_period: new FormControl(null),
      opp_verifier_name_level1: new FormControl(null),
      opp_verified_date_level1: new FormControl(null),
      opp_verified_remarks_level1: new FormControl(null),
      opp_verifier_name_level2: new FormControl(null),
      opp_verified_date_level2: new FormControl(null),
      opp_verified_remarks_level2: new FormControl(null, [Validators.required]),
      assurity_remarks: new FormControl(null),
      phone_code: new FormControl(),
      mobile_code: new FormControl(),
      startDate: new FormControl(null),
      endDate: new FormControl(null),
    });
  }

  ngOnInit() {

    console.log(this.now, "current date");
    console.log(this.year, "current date");
    console.log(this.month, "current date");
    console.log(this.date, "current date");
    //  let todayday = new Date(this.convertDate());
    // console.log(todayday,'todayday');
    this.leadForm.patchValue({
      opp_verified_date_level2: this.now,
    })

    this.getAchievementList();
    this.getCategory();
    this.getEACode();
    this.getCountry();
    this.getAllSegment();
    this.getAchievementListt();
    this.regionalBusiness();
    this.globalManagerales();
    this.get_cp_contact();
    this.activeroute.queryParams.subscribe((params) => {
      this.id = params;
      this.lead_id = this.id.lead_id;
      this.leadUpdate = this.id.type;
      this.leadService.getByIdLead(this.lead_id).subscribe((res: any) => {
        if (res && res.data) {
          console.log(res, 'res')
          this.otherDocumentData = res?.data.Lead_management_docs;
          this.configService.getProducts(res.data.certificate_type).subscribe((res: any) => {
            this.assesmentList = res.data
          }, (err: any) => {
            this.toast.warning("no data found")
          })
          this.singleLeadData = res.data;

          this.getLocationData()
        }
        console.log(this.singleLeadData.opp_verified_date_level1, 'this.singleLeadData');
        this.dateLevel1 = this.singleLeadData?.opp_verified_date_level1;
        console.log(this.dateLevel1, 'this.dateLevel1');
        console.log(this.singleLeadData, 'this.singleLeadData');

        // for(let a=0;a<this.singleLeadData?.Lead_management_docs.length;a++){
        //   this.otherFileCond= this.singleLeadData?.Lead_management_docs[a]?.hasOwnProperty('other_file');
        //   console.log( this.otherFileCond,'hasAgeKey');
        // }
        // const allHaveOtherFile = this.singleLeadData?.Lead_management_docs.every(
        //   (item:any) => item?.hasOwnProperty('other_file')
        // );
        // this.otherFileCond= this.singleLeadData?.Lead_management_docs[0]?.hasOwnProperty('other_file');
        //  console.log( this.otherFileCond,'hasAgeKey');
        // console.log( allHaveOtherFile,'allHaveOtherFile');
        // this.otherFileCond=allHaveOtherFile
        this.verifierAllDoc();


        this.convertDate()

        console.log('singlelead data-->', this.singleLeadData)
        if (this.singleLeadData?.billing_site === true) {
          this.parentSide = true;
          this.getStage1(this.singleLeadData?.br_number)
        }
        if (this.singleLeadData?.export === "Export Wise") {
          this.gstvalidation = false;
        }
        if (this.singleLeadData?.certificate_type_name === "Non-Cert") {
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

    this.nowDate = this.singleLeadData?.opp_verified_date_level1;
    console.log();


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
    for (let b = 0; b <= this.singleLeadData.Lead_management_docs.length; b++) {
      if (this.singleLeadData.Lead_management_docs[b]?.other_file) {
        docData.push(this.singleLeadData.other_file_cond = "true");
      }
    }
    console.log(docData, 'doc2');
    this.docArray = docData

    console.log(docData, 'docDatadocData');
    // this.verifyStatus=docData.er
  }

  getLocationData() {
    this.leadService.getByIdLeadId(this.lead_id).subscribe((res: any) => {
      if (res && res.data) {
        this.singleLeadData1 = res.data;
        this.singleLeadData1.unshift(
          { br_number: this.singleLeadData?.br_number, associated_company: this.singleLeadData?.associated_company, city_name: this.singleLeadData?.city_name, state_name: this.singleLeadData?.state_name },
        )
        console.log(this.singleLeadData1, " this.singleLeadData1 this.singleLeadData1");
        this.fetchStageDataForLeads();
      }
    });
  }

  convertDate() {
    console.log(this.dateLevel1, " this.dateLevel1");

    const currentDate = this.dateLevel1;
    const year = this.dateLevel1.slice(0, 4)
    const month = this.dateLevel1.slice(5, 7) // Adding 1 because months are zero-based
    const day = this.dateLevel1.slice(8, 10);
    console.log(year, 'year');
    console.log(month, 'month');
    console.log(day, 'day');

    const formattedDate = `${year}-${month}-${day}`;
    console.log(formattedDate, "formd"); // Output: "YYYY-MM-DD"
    this.minDate = moment({ year: year - 0, month: month, date: day }).format('YYYY-MM-DD');
  }
  checkUnreg() {

    if (this.singleLeadData?.gst_applicable === "Unregistered Dealer") {
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

  fileDownloadMethod(fileData: any, e: any) {
    console.log(fileData);

    if (fileData) {
      FileSaver.saveAs(fileData, fileData?.name);
    }
  }

  fileViewMethod(filename: string) {
    console.log(filename);
    console.log(this.singleLeadData);

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
      console.log('No File Available');
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
        this.OtherfileUrl = URL.createObjectURL(file)
      } else if (filename == 'contactReview') {
        this.contactReviewData = file;
        this.contactReviewUrl = URL.createObjectURL(file)
      } else if (filename == 'gst') {
        this.gstFileData = file;
        this.gstFileUrl = URL.createObjectURL(file)
      } else if (filename == 'companyLogo') {
        this.companyLogoData = file;
        this.companyLogoUrl = URL.createObjectURL(file)
      } else if (filename == 'basicForm') {
        this.basicformData = file;
        this.basicFormUrl = URL.createObjectURL(file)
      } else {
        console.log('No File Available');
      }
    }
  }

  mySet: any = new Map();

  Verify_contact(e: any,v:any) {
    if (this.leadForm.value.contact_review_form === null) {
      this.toast.error('Select Contact Review Form');
      return;
    };

    Swal.fire({
      title: 'Are you sure to verify this Contact Review Form',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      cancelButtonColor: "#f44336",
      confirmButtonColor: "#3f51b5",
      confirmButtonText: 'Yes',
      cancelButtonText: 'Not Now',
      width: '350',
    }).then((result) => {
      if (result.isConfirmed) {
        this.VerifyData.mobile_no = this.leadForm.value.contact_review_form;
        this.VerifyData.contact_review_form = e;
        this.mobileBtn = true;
        this.verifyMobile = true;
        this.varify_notVarify = true;
        this.mySet.set("contact", e)
        console.log(this.mySet);
        this.common(v)
        this.toast.success('Contact Review Form verified');
      }
    });
  };

  NotVerify_contact(e: any) {
    if (this.leadForm.value.contact_review_form === null) {
      this.toast.error('Select Contact Review Form');
      return;
    };

    Swal.fire({
      title: 'Are you sure to not verify this Contact Review Form',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      cancelButtonColor: "#f44336",
      confirmButtonColor: "#3f51b5",
      confirmButtonText: 'Yes',
      cancelButtonText: 'Not Now'
    }).then((result) => {
      if (result.isConfirmed) {
        this.VerifyData.mobile_no = this.leadForm.value.contact_review_form;
        this.VerifyData.contact_review_form = e;
        this.mobileBtn = true;
        this.notVerifyMobile = true;
        this.enableReject = true;
        this.varify_notVarify = true;

      }
    });

  };
  Verify_GST(e: any,v:any) {
    if (this.leadForm.value.gst_file === null && !this.singleLeadData?.gst_file) {
      this.toast.error('GST file not uploaded.');
      return
    };
    Swal.fire({
      title: 'Are you sure to verify this GST File',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      cancelButtonColor: "#f44336",
      confirmButtonColor: "#3f51b5",
      confirmButtonText: 'Yes',
      cancelButtonText: 'Not Now'
    }).then((result) => {
      if (result.isConfirmed) {
        this.gstBtn = true;
        this.verifyGst = true;
        this.VerifyData.gst_file = this.leadForm.value.gst_file;
        this.VerifyData.gst_file_status = e;
        this.toast.success('GST File verified');
        this.varify_notVarify = true;
        this.mySet.set('gst', e)
        this.common(v)

        console.log(this.mySet);
      }
    });
  };

  NotVerify_GST(e: any) {
    if (this.leadForm.value.gst_file === null && !this.singleLeadData?.gst_file) {
      this.toast.error('GST file not uploaded.');
      return
    };

    Swal.fire({
      title: 'Are you sure to not verify this GST File',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      cancelButtonColor: "#f44336",
      confirmButtonColor: "#3f51b5",
      confirmButtonText: 'Yes',
      cancelButtonText: 'Not Now'
    }).then((result) => {
      if (result.isConfirmed) {
        this.VerifyData.gst_file = this.leadForm.value.gst_file;
        this.VerifyData.gst_file_status = e;
        this.gstBtn = true;
        this.notVerifyGst = true;
        this.enableReject = true;
        this.varify_notVarify = true;

      }
    });
  };
  Verify_CompanyLogo(e: any,v:any) {
    if (this.leadForm.value.company_logo === null && !this.singleLeadData?.company_logo) {
      this.toast.error('Select Company Logo');
      return
    };
    Swal.fire({
      title: 'Are you sure to verify this Company Logo',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      cancelButtonColor: "#f44336",
      confirmButtonColor: "#3f51b5",
      confirmButtonText: 'Yes',
      cancelButtonText: 'Not Now'
    }).then((result) => {
      if (result.isConfirmed) {
        this.btncompanyLogo = true;
        this.verifylogo = true;
        this.VerifyData.companylogo = this.leadForm.value.company_logo;
        this.VerifyData.companylogo_status = e;
        this.toast.success('Company Logo verified');
        this.varify_notVarify = true;
        this.mySet.set('companyLogo', e)
        console.log(this.mySet);
        this.common(v)

      }
    });
  };

  NotVerify_CompanyLogo(e: any) {
    if (this.leadForm.value.company_logo === null && !this.singleLeadData?.company_logo) {
      this.toast.error('Select Company Logo');
      return
    };

    Swal.fire({
      title: 'Are you sure to not verify this  Company Logo',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      cancelButtonColor: "#f44336",
      confirmButtonColor: "#3f51b5",
      confirmButtonText: 'Yes',
      cancelButtonText: 'Not Now'
    }).then((result) => {
      if (result.isConfirmed) {
        this.VerifyData.companylogo = this.leadForm.value.company_logo;
        this.VerifyData.companylogo_status = e;
        this.btncompanyLogo = true;
        this.notVerifylogo = true;
        this.enableReject = true;
        this.varify_notVarify = true;

      }
    });
  };
  Verify_Basicform(e: any,v:any) {
    if (this.leadForm.value.basic_form === null && !this.singleLeadData?.basic_form) {
      this.toast.error('Select Basic Form');
      return
    };
    Swal.fire({
      title: 'Are you sure to verify this Basic Form',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      cancelButtonColor: "#f44336",
      confirmButtonColor: "#3f51b5",
      confirmButtonText: 'Yes',
      cancelButtonText: 'Not Now'
    }).then((result) => {
      if (result.isConfirmed) {
        this.basicbtn = true;
        this.verfifybasicbtn = true;
        this.VerifyData.basic_form = this.leadForm.value.basic_form;
        this.VerifyData.basic_form_status = e;
        this.toast.success('Basic Form verified');
        this.varify_notVarify = true;
        this.mySet.set('basicForm', e);
        console.log(this.mySet);
        this.common(v)

      }
    });
  };

  NotVerify_Basicform(e: any) {
    if (this.leadForm.value.basic_form === null && !this.singleLeadData?.basic_form) {
      this.toast.error('Select Basic Form');
      return
    };

    Swal.fire({
      title: 'Are you sure to not verify this  Basic Form',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      cancelButtonColor: "#f44336",
      confirmButtonColor: "#3f51b5",
      confirmButtonText: 'Yes',
      cancelButtonText: 'Not Now'
    }).then((result) => {
      if (result.isConfirmed) {
        this.VerifyData.basic_form = this.leadForm.value.basic_form;
        this.VerifyData.basic_form_status = e;
        this.basicbtn = true;
        this.notVerifybasicbtn = true;
        this.enableReject = true;
        this.varify_notVarify = true;

      }
    });
  };
  Verify_Other(e: any,v:any) {
    if (this.leadForm.value.other_file === null) {
      this.toast.error('Select  Other Form');
      return
    };
    Swal.fire({
      title: 'Are you sure to verify this Other Form',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      cancelButtonColor: "#f44336",
      confirmButtonColor: "#3f51b5",
      confirmButtonText: 'Yes',
      cancelButtonText: 'Not Now'
    }).then((result) => {
      if (result.isConfirmed) {
        this.otherBtn = true;
        this.verfifyotherbtn = true;
        this.VerifyData.other_file = this.leadForm.value.other_file;
        this.VerifyData.other_file_status = e;
        this.toast.success('Other File verified');
        this.varify_notVarify = true;
        this.common(v)

      }
    });
  };

  NotVerify_Other(e: any) {
    if (this.leadForm.value.basic_form === null) {
      this.toast.error('Select Other File');
      return
    };

    Swal.fire({
      title: 'Are you sure to not verify this  Other File',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      cancelButtonColor: "#f44336",
      confirmButtonColor: "#3f51b5",
      confirmButtonText: 'Yes',
      cancelButtonText: 'Not Now'
    }).then((result) => {
      if (result.isConfirmed) {
        this.VerifyData.other_file = this.leadForm.value.other_file;
        this.VerifyData.other_file_status = e;
        this.otherBtn = true;
        this.notVerifyotherbtn = true;
        this.varify_notVarify = true;
      }
    });
  };


  getAchievementList() {
    this.recruitService.getAllAchivement().subscribe(
      (res: any) => {

        this.allAchievement = res.data;
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
  getCategory() {
    this.configService.listCategory().subscribe((res: any) => {
      this.categoryList = res.data;

    });
  }
  nonCertFunc() {
    if (this.singleLeadData?.certificate_type == "Non Cert") {
      this.nonCertt = true
    }
  }
  viewDocLogo() {
    window.open(this.singleLeadData.company_logo, '_blank');
  }
  // viewDocOther() {
  //   window.open(this.singleLeadData.other_file, '_blank');
  // }
  viewDocReview() {
    window.open(this.singleLeadData.contact_review_form, '_blank');
  }
  viewDocGST() {
    window.open(this.singleLeadData.gst_file, '_blank');
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
          this.toast.success('Document rejected sucessfully.');
          this.route.navigate(['master/lead/lead-account'], {
            queryParams: { lead_id: this.lead_id },
          });
        });
      }
    });

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

  downloadGst(e: any) {
    const pdfUrl = this.singleLeadData?.gst_file;
    const pdfName = this.singleLeadData?.gst_applicable;
    FileSaver.saveAs(pdfUrl, pdfName);
    e.stopPropagation();
  }
  downloadContact(e: any) {
    const pdfUrl = this.singleLeadData?.contact_review_form;
    const pdfName = this.singleLeadData?.contact_owner;
    FileSaver.saveAs(pdfUrl, pdfName);
    e.stopPropagation();
  }
  downloadLogo(e: any) {
    const pdfUrl = this.singleLeadData?.company_logo;
    const pdfName = this.singleLeadData?.associated_company;
    FileSaver.saveAs(pdfUrl, pdfName);
    e.stopPropagation();
  }
  // downloadOther(e: any) {
  //   const pdfUrl = this.singleLeadData?.other_file;
  //   const pdfName = this.singleLeadData?.document_remark;
  //   FileSaver.saveAs(pdfUrl, pdfName);
  //   e.stopPropagation();
  // }
  downloadBasic(e: any) {
    const pdfUrl = this.singleLeadData?.basic_form;
    const pdfName = this.singleLeadData?.first_name;
    FileSaver.saveAs(pdfUrl, pdfName);
    e.stopPropagation();
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

  fileInputChangeOne(fileInput: File[] | any) {
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
        this.fileDetailsOne.filePath = reader.result;
      };
      reader.readAsDataURL(file);
      this.fileDetailsOne.file = file;
    } else {
      this.fileDetailsOne = { filePath: '', file: null };
    }
  }

  fileInputChangeTwo(fileInput: File[] | any) {
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
        this.fileDetailsTwo.filePath = reader.result;
      };
      reader.readAsDataURL(file);
      this.fileDetailsTwo.file = file;
    } else {
      this.fileDetailsTwo = { filePath: '', file: null };
    }
  }

  fileInputChangeThree(fileInput: File[] | any) {
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
        this.fileDetailsThree.filePath = reader.result;
      };
      reader.readAsDataURL(file);
      this.fileDetailsThree.file = file;
    } else {
      this.fileDetailsThree = { filePath: '', file: null };
    }
  }

  fileInputChangeFour(fileInput: File[] | any) {
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
        this.fileDetailsFour.filePath = reader.result;
      };
      reader.readAsDataURL(file);
      this.fileDetailsFour.file = file;
    } else {
      this.fileDetailsFour = { filePath: '', file: null };
    }
  }

  patchFormvalue() {
    this.checkUnreg();
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
    //   this.leadService.getAssesmentByID(this.singleLeadData?.certificate_type).subscribe((res:any) => {

    //  this.assesmentList = res.data[0].newitemlist;

    // });
    // }
    console.log('compnay_logo_file_status', this.singleLeadData?.compnay_logo_file_status)
    this.leadForm.patchValue({
      opp_verified_remarks_level2: this.singleLeadData?.opp_verified_remarks_level2,
      phone_code: this.singleLeadData?.userrespectiveleads[0]?.phone_code,
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
      non_cert_type: this.singleLeadData?.non_cert_type,
      city: this.singleLeadData?.city,
      state: this.singleLeadData?.state,
      country: this.singleLeadData?.country,
      postal_code: this.singleLeadData?.postal_code,
      region: this.singleLeadData?.region,
      urd_number: this.singleLeadData?.urd_number,
      assessment_period: this.singleLeadData?.assessment_period,
      categories: this.singleLeadData?.categories,
      regional_bussiness_lead: this.singleLeadData?.regional_bussiness_lead,
      global_managing_director: this.singleLeadData?.global_managing_director,
      global_manager_sales: this.singleLeadData?.global_manager_sales,
      website_url: this.singleLeadData?.website_url,
      phone_number: this.singleLeadData?.phone_number,
      mobile_number: this.singleLeadData?.mobile_number,
      lead_created_by_name: this.singleLeadData?.lead_created_by_name,
      dqs_contact_source: this.singleLeadData?.dqs_Contact_id,
      contact_owner: this.singleLeadData?.contact_owner,
      assigned_to: this.singleLeadData?.assigned_to,
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
      document_remark: this.singleLeadData?.document_remark,
      tan_number: this.singleLeadData?.tan_number,
      product_request: this.singleLeadData?.product_request,
      customer_sales_executive: this.singleLeadData?.customer_sales_executive,
      opportunity_type: this.singleLeadData?.opportunity_type,
      opportunity_ref: this.singleLeadData?.OpportunityRef_no,
      no_of_mandays: this.singleLeadData?.no_of_mandays,
      ea_code: this.singleLeadData?.ea_code,
      billing_site: this.singleLeadData?.billing_site,
      opp_verifier_name_level1: this.singleLeadData?.opp_verifier_name_level1,
      opp_verified_date_level1: this.singleLeadData?.opp_verified_date_level1,
      opp_verified_remarks_level1: this.singleLeadData?.opp_verified_remarks_level1,
      opp_verifier_name_level2: this.singleLeadData?.approver_name_l2,
      // opp_verified_date_level2: this.myDate,
      contact_review_form: this.singleLeadData?.contact_review_form,
      gst_file: this.singleLeadData?.gst_file,
      basic_form: this.singleLeadData?.basic_form,
      company_logo: this.singleLeadData?.company_logo,
      other_file: this.singleLeadData?.other_file,
      lead_assgn_contact_owner: this.singleLeadData?.lead_assgn_contact_owner,
      
    });
  }

  getEACode() {
    this.configService.getEacode().subscribe((res: any) => {
      this.eaCodeList = res.data;

    });
  }
  getStage(br1: any) {
    this.leadService.getStage(br1).subscribe((res: any) => {

      this.stageData = res.data;
    })
  }

  getStage1(br1: any) {
    this.leadService.getStage(br1).subscribe((res: any) => {

      this.stageData = res.data;
    })
  }

  typeChange1(e: any, event: any) {
    let br3 = []
    this.br2 = e.br_number;
    let br4 = br3.push(this.br2);
    this.getStage1(this.br2);
    if (e.lead_genration_id === this.singleLeadData.lead_genration_id) {
      this.parentSide = event.target.checked;

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

  customerType() {
    this.cutomerType = true;
  }
  siteAudit() {
    this.sitAudit = true;
  }

  siteAuditNew() {
    this.sitAudit = false;
  }

  viewDocBasic() {
    window.open(this.singleLeadData.basic_form, '_blank');
  }

  customerTypeNew() {
    this.cutomerType = false;
  }

  getCountryID(e: any) {
    this.patchCountryCode(e.value)

    this.leadService.getStateByID(e.value).subscribe((res: any) => {

      this.stateList = res.data;
    });
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

  getStateID(e: any) {

    this.leadService.getCityByID(e.value).subscribe((res: any) => {

      this.cityList = res.data;
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

  submitForm() {

    this.submitted = false;

    // if (this.leadForm.invalid) {
    //   this.toast.error('Required fields should not be empty', 'Fields Empty');
    //   return;
    // }
    if (!this.condVerifier==true) {
      this.toast.warning('Please Verify Document ', 'Action');
      return;
    }
    let val = this.leadForm.value;

    // if (!this.varify_notVarify) {
    //   this.toast.warning('Please Verify Document ','Action');
    //   console.log('a',this.varify_notVarify);

    //   return;
    // }
    console.log(this.otherFileCond, 'codddddddddddddddddd');

    // if(this.otherFileCond==true){
    this.keysToCheck = ['contact', 'gst', 'companyLogo', 'basicForm', 'other'];

    //  }else{
    //    this.keysToCheck= ['contact', 'gst', 'companyLogo', 'basicForm'];

    //  }
    // for (const key of this.keysToCheck) {
    //   if (!this.mySet.has(key) || this.mySet.get(key) !== true) {
    //     console.log(`Error: ${key} is missing or not true`);
    //     this.toast.warning('Please Verify Document ', 'Action');
    //     return; // Return if key is missing or value is not true
    //   }
    // }
    console.log("Form submitted successfully"); //
    console.log('b', this.varify_notVarify);


    const dataMain = {
      customer_type: this.singleLeadData?.customer_type,
      site_audit: val.site_audit || this.singleLeadData?.multiple_site_audit,
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
      state: val.state,
      country: val.country,
      postal_code: val.postal_code,
      region: val.region,
      non_cert_type: val.non_cert_type,
      categories: val.categories,
      regional_bussiness_lead: val.regional_bussiness_lead,
      global_managing_director: val.global_managing_director,
      global_manager_sales: val.global_manager_sales,
      website_url: val.website_url,
      phone_number: val.phone_number,
      product_request: val.product_request,
      customer_sales_executive: val.customer_sales_executive,
      opportunity_type: val.opportunity_type,
      opportunity_ref: val.opportunity_ref,
      billing_site: val.billing_site,
      no_of_mandays: val.no_of_mandays,
      ea_code: val.ea_code,
      assigned_to: val.assigned_to,
      assessment_period: val.assessment_period,
      mobile_number: val.mobile_number,
      lead_created_by_name: val.lead_created_by_name,
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
      stage: val.stage,
      lead_assgn_remark: val.lead_assgn_remark,
      industry_sector: val.industry_sector,
      employee_count: val.employee_count,
      company_remarks: val.company_remarks,
      gst_applicable: val.gst_applicable,
      gst_number: val.gst_number,
      pan_number: val.pan_number,
      tan_number: val.tan_number,
      opp_verifier_name_level1: val.opp_verifier_name_level1,
      billing_site_copy: this.singleLeadData.billing_site_copy,
      opp_verified_date_level1: moment(val.opp_verified_date_level1).format(
        'YYYY-MM-DD'
      ),
      opp_verified_remarks_level1: val.opp_verified_remarks_level1,
      opp_verifier_name_level2: val.opp_verifier_name_level2,
      opp_verified_date_level2: moment(val.opp_verified_date_level2).format(
        'YYYY-MM-DD'
      ),
      opp_verified_remarks_level2: val.opp_verified_remarks_level2,
      // lead_created_by_name:val.lead_created_by_name,
      multiple_site_audit: val.site_audit || this.singleLeadData?.multiple_site_audit,

      status: 'Pre L2',
    };
    const data = {
      contact_review_form: this.fileDetails.file,
      contact_staus: this.VerifyData.contact_review_form,
      gst_file: this.fileDetailsOne.file,
      gst_status: this.VerifyData.gst_file_status,
      basic_form: this.fileDetailsTwo.file,
      Basic_Form_status: this.VerifyData.basic_form_status,
      company_logo: this.fileDetailsThree.file,
      compnay_logo_file_status: this.VerifyData.companylogo_status,
      other_file: this.fileDetailsFour.file,
      other_status: this.VerifyData.other_file_status,
      document_remark: val.document_remark,
    };
    if (data.contact_review_form) {
      this.leadService.editLeadDoc_Status(this.lead_id, data).subscribe((res: any) => {

      });
    }
    this.leadService.editLead(this.lead_id, dataMain).subscribe((res: any) => {

      this.toast.success('Opportunity Updated Successfully..');
      this.route.navigate(['master/lead/lead-opportunity'],
        // {
        //   queryParams: { lead_id: this.lead_id },
        // }
      );
    });
  }
  updateForm() {
    this.submitted = false;
    if (this.leadForm.invalid) {

      this.toast.error('Required fields should not be empty.', 'Error Occurred!');
      return;
    }
    const data = this.leadForm.value;

    this.leadService.editLead(this.lead_id, data).subscribe((res: any) => {


      this.toast.success("Updated Assignment Successfully..")
      this.route.navigate(['master/lead/lead-opportunity']);
    })

  }
  certificate(e: any) {
    const cert_id = e.value
    this.configService.getProducts(cert_id).subscribe((res: any) => {
      this.assesmentList = res.data
    }, (err: any) => {
      this.toast.warning("no data found")
    })
    if (e.value === 1) {
      // this.sitAudit = true;
      this.leadForm.patchValue({
        site_audit: "Yes"
      })
    }
    else if (e.value === 2) {
      // this.medical = false;
      this.leadForm.patchValue({
        site_audit: "No"
      })
    }
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
  // now = new Date();
  // year = this.now.getFullYear();
  // month = this.now.getMonth();
  // // day = this.now.getDay();
  // dates = this.now.getDate();
  // maxDate = moment({ year: this.year + 100, month: this.month, date: this.dates }).format('YYYY-MM-DD');
  minDate = moment({ year: 2023 - 0, month: 10, date: 23 }).format('YYYY-MM-DD');
  fromDate(e: any) {
    this.FromDate = moment(e.value).format('YYYY-MM-DD');
  }
  ToDate(e: any) {
    this.toDate = moment(e.value).format('YYYY/MM/DD');
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
          let dd = {...data.data[0], stage:data.data, singleData: this.singleLeadData1[a]}
          modify.push(dd);
        })   
       
    }
    this.stageData=modify
    this.stageData1=modify1

  }


  otherVarifyStatus: any = []
  Status: any = []

  otherVarify(data: any, i: any, e: any,v:any) {
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
        this.varify_notVarify = true;
        this.otherVarifyStatus[i] = true
        if (!this.Status.includes(i)) {
          this.Status.push(this.otherVarifyStatus[i], i)
          console.log(this.Status);
          this.toast.success('Other file Is Verify SuccessFully')
          const confirmCount = this.Status.filter((item: any) => item == "false");
          if (!confirmCount) {
            this.enableReject = true;

          }
        }
        this.mySet.set('other', e)
        console.log(this.mySet);
        this.common(v)
      }
    })

  }

  otherNotVarify(data: any, i: any) {
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
        this.varify_notVarify = true;
        if (!this.Status.includes(i)) {
          console.log(this.Status);
          this.Status.push(this.otherVarifyStatus[i], i);
          const confirmCount = this.Status.filter((item: any) => item == "false");
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
