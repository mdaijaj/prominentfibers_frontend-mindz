import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatOption } from '@angular/material/core';
import { MatSelect } from '@angular/material/select';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { ConfigurationalmasterService } from 'src/app/@shared/services/configurationalmaster.service';
import { LeadService } from 'src/app/@shared/services/lead.service';
import { RecruitService } from 'src/app/@shared/services/recruitment.service';
import Swal from 'sweetalert2';
declare var require: any;

const FileSaver = require('file-saver');

export interface PeriodicElement {
  br_number: string;
  account_name: string;

}

const ELEMENT_DATA: PeriodicElement[] = [
  { account_name: "S1", br_number: "1" },
  { account_name: "S2", br_number: "1" },
  { account_name: "CA1", br_number: "2" }
];


@Component({
  selector: 'app-create-budgetary-quote',
  templateUrl: './create-budgetary-quote.component.html',
  styleUrls: ['./create-budgetary-quote.component.scss']
})

export class CreateBudgetaryQuoteComponent {
  @ViewChild('eacodeselect') eacodeselect: MatSelect;

  Login_user_id: any = localStorage.getItem('signInUser');
  loginUserId: any = JSON.parse(this.Login_user_id).employee_id
  loginUserName: any = JSON.parse(this.Login_user_id).first_name

  displayedColumns: string[] = ['stage', 'noOfMandays'];
  dataSource = ELEMENT_DATA;
  leadForm: FormGroup;
  jobType: any;
  candidateArray: any;
  interviewGetId: any;
  candidateId: any;
  id: any;
  interview_id: any;
  unreg: boolean = false;
  gstreg: boolean = false;
  clicked: boolean = false;
  cutomerType: boolean = false;
  sitAudit: boolean = false;
  lead_id: any;
  allSelectedCode = false;
  singleLeadData: any;
  myFiles: any;
  fileList: any;
  errorMsg: string = '';
  stateList: any[] = [];
  countryList: any[] = [];
  pinCodeList: any;
  pinCodeTrue: boolean = true;
  cityList: any;
  allDataOne: any;
  allDataTwo: any;
  allDataMan: any;
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
  allAchievement: any;
  categoryList: any;
  stageData: any[] = [];
  submitted: boolean;
  nonCertt: boolean = false;
  eaCodeList: any;
  rowData: any;
  loginUser: any;
  now = new Date();
  year = this.now.getFullYear();
  month = this.now.getMonth();
  // day = this.now.getDay();
  date = this.now.getDate();
  maxDate = moment({ year: this.year + 100, month: this.month, date: this.date }).format('YYYY-MM-DD');
  minDate = moment({ year: this.year - 0, month: this.month, date: this.date }).format('YYYY-MM-DD');
  employee_id: any;
  employee_name: any;
  leadUpdate: any;
  semiAnnual: boolean = false;
  singleLeadData1: any;
  childData: any;
  childBlock: boolean = false;
  br1: any;
  br2: any;
  parentSide: boolean = false;
  singleLeadData2: any;
  segmentList: any;
  certificateList: any;
  regionSList: any;
  CategorySList: any;
  regionalbheadList: any;
  globalMsalesList: any;
  assesmentList: any;
  gstvalidation: boolean;
  nonCertTrue: boolean;
  contact_list: any;
  medvalue: boolean;
  checkBoxOne: any;
  childSide: boolean;
  child_billing_Site: boolean;
  child_br_number: any;

  allSelectedBill: boolean = false;
  variablesCopy: any;
  billingData: any;
  billingDataCopy: any;
  otherDocumentData: any;
  selectedFile: File | null;
  @ViewChild('billSite') billSite: MatSelect;

  constructor(
    private fb: FormBuilder,
    private leadService: LeadService,
    private route: Router,
    private toast: ToastrService,
    private configService: ConfigurationalmasterService,
    private recruitService: RecruitService,
    private activeroute: ActivatedRoute) {
    this.leadForm = this.fb.group({
      customer_type: new FormControl(null),
      site_audit: new FormControl(null),
      associated_company: new FormControl(null, Validators.required),
      segment: new FormControl(null, Validators.required),
      certificate_type: new FormControl(null, Validators.required),
      first_name: new FormControl(null, Validators.required),
      billing_site: new FormControl(null),
      last_name: new FormControl(null, Validators.required),
      categories: new FormControl(null),
      email: new FormControl(null, [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]),
      emplyoment_type: new FormControl(null),
      job_title: new FormControl(null, Validators.required),
      street_address: new FormControl(null, Validators.required),
      address2: new FormControl(null, Validators.required),
      city: new FormControl(null, Validators.required),
      state: new FormControl(null, Validators.required),
      country: new FormControl(null, Validators.required),
      postal_code: new FormControl(null, Validators.required),
      region: new FormControl(null, Validators.required),
      regional_bussiness_lead: new FormControl(null),
      global_managing_director: new FormControl(null, Validators.required),
      global_manager_sales: new FormControl(null, Validators.required),
      website_url: new FormControl(null),
      phone_number: new FormControl(null),
      lead_created_by_name: new FormControl(null),
      mobile_number: new FormControl(null, [Validators.required, Validators.maxLength(15)]),
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
      stage: new FormControl(null, Validators.required),
      non_cert_type: new FormControl(null),
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
      document_remark: new FormControl(null),
      customer_sales_executive: new FormControl(null),
      assigned_to: new FormControl(null),
      opportunity_type: new FormControl(null),
      opportunity_ref: new FormControl(null),
      product_request: new FormControl(null),
      urd_number: new FormControl(null),
      no_of_mandays: new FormControl(null, Validators.required),
      ea_code: new FormControl(null, Validators.required),
      assessment_period: new FormControl(null, Validators.required),
      approver_name_l1: new FormControl(null),
      phone_code: new FormControl(),
      mobile_code: new FormControl(),
      billing_site_copy: new FormControl(),
      approver_name_l1Id: new FormControl(),
    })
  }

  ngOnInit() {


    this.activeroute.queryParams.subscribe(params => {
      this.id = params;
      this.lead_id = this.id.lead_id;
      this.leadUpdate = this.id.type;

      this.leadService.getByIdChildLead(this.lead_id).subscribe((res: any) => {
        this.childData = res.data;

        if (this.childData.length === 0) {
          this.childBlock = true;
        }
      })
      this.leadService.getByIdLead(this.lead_id).subscribe((res: any) => {
        console.log(res, 'data')
        this.singleLeadData = res.data;
        this.otherDocumentData = res?.other_document_data
        console.log(this.otherDocumentData, 'other')
        // let x = res.data.map((a:any)=>{
        //   return {...a,checked:false}
        // })
        // this.singleLeadData2 = x;
        // 
        // let data1 = {
        //   checked:false
        // }
        // this.singleLeadData2 = this.singleLeadData+data1;

        // if(this.singleLeadData?.billing_site === true){
        //   this.parentSide = true;
        //   this.getStage1(this.singleLeadData?.br_number)
        // }

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
        this.nonCertFunc();
        this.patchFormvalue();
      })
      this.leadService.getByIdLeadId(this.lead_id).subscribe((res: any) => {


        let x = res.data.map((a: any) => {
          return { ...a, checked: false }
        })
        this.singleLeadData1 = x;
        // 
      })

      this.leadService.getByIdLeadId(this.lead_id).subscribe((res: any) => {
        //
        let x = res.data.map((a: any) => {
          return { ...a, checked: false };
        });
        this.singleLeadData1 = x;
        console.log(this.singleLeadData1, 'this.singleLeadData1');
        this.billingData = x;
        console.log(this.billingData, ' this.billingData');

        const billArray: any = [];
        for (let a = 0; a <= this.billingData.length - 1; a++) {
          if (
            this.billingData[a]?.lead_genration_id ===
            this.singleLeadData?.lead_genration_id
          ) {
            billArray.push(this.billingData[a]);
          }
        }
        billArray.push(this.singleLeadData);
        console.log(billArray, ' this.billingData after');

        this.billingDataCopy = billArray;

        this.variablesCopy = this.billingDataCopy.map(
          (res: any) => res?.br_number
        );
        console.log(this.variablesCopy, 'this.variablesCopy');
      });
    });
    this.getAllSegment();
    this.getAchievementList();
    this.getCategory();
    this.getStage(this.br1);
    this.getEACode();
    this.getApprover();
    this.getCountry();
    this.getAchievementListt();
    this.regionalBusiness();
    this.globalManagerales();
    this.get_cp_contact();
    let loginU: any = localStorage.getItem('signInUser')
    let nn = JSON.parse(loginU)
    this.loginUser = nn
  }
  //arr:any =[]
  typeChangeParent(e: any, event: any) {
    console.log(this.singleLeadData.certificate_type_name, "signlekjkjk");
    //     if (this.singleLeadData.certificate_type_name==!'Non-Cert') {
    // this.checkBoxOne=false
    //     }
    if (this.singleLeadData.certificate_type_name == 'Cert') {
      if (this.checkBoxOne) {
        this.childSide = false;
        console.log('child side box is false')
        this.singleLeadData1.forEach((res: any) => {
          res.checked = false
        });
      }

      let br3 = []
      this.br2 = e.br_number;
      let br4 = br3.push(this.br2);

      this.getStage1(this.br2);
      if (e.lead_genration_id === this.singleLeadData.lead_genration_id) {
        this.parentSide = event.target.checked;
        console.log('parentSide', this.parentSide)
      }
    }
    else {
      this.checkBoxOne = false
    }

  }
  typeChange(e1: any, e: any) {
    if (e1.checked == true) {
      console.log('parent side is false')
      this.checkBoxOne = false;

      this.singleLeadData1.forEach((res: any) => {
        if (res.br_number == e.br_number) {
          res.checked = e.checked;
          this.childSide = true;
          this.child_billing_Site = true;
          this.child_br_number = e.br_number
        } else {
          res.checked = false
        }
      })
    } else {
      this.childSide = false;
      this.checkBoxOne = false;
    }
    console.log('singleleaddata111', this.singleLeadData1)
    this.singleLeadData1.map((data: any) => {

      this.getStage(this.child_br_number);
    })
  }


  get_cp_contact() {
    this.leadService.get_contact().subscribe(
      (res: any) => {
        this.contact_list = res.data;

      }, (err) => {

      }
    )
  };
  typeChange1(e: any, event: any) {
    let br3 = []
    this.br2 = e.br_number;
    let br4 = br3.push(this.br2);

    this.getStage1(this.br2);
    if (e.lead_genration_id === this.singleLeadData.lead_genration_id) {
      this.parentSide = event.target.checked;
      console.log('parentSide', this.parentSide)
    }
  }

  reloadCurrentRoute() {
    let currentUrl = this.route.url;
    let newVal = currentUrl.split("?")
    let prm = newVal[1].split('=')
    let val = newVal[1].slice(8)
    // alert(`${newVal[0]}?${prm[0]}=${val}`)



    this.route.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.route.navigate([newVal[0]], { queryParams: { [prm[0]]: val } });
    });

  }

  deleteDays(e: any) {


    Swal.fire({
      title: 'Are you sure want to Remove?',
      // text: 'You will not be able to recover this file!',
      icon: 'warning',
      showCancelButton: true,
      cancelButtonColor: '#8B817D',
      confirmButtonColor: '#f44336',
      confirmButtonText: 'Delete!',
      cancelButtonText: 'Skip',
    }).then((result) => {
      if (result.value) {
        this.leadService
          .deleteMandays(e)
          .subscribe((res) => {
            this.reloadCurrentRoute();
            // window.location.reload();
          });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
      }
    });

    // this.leadService.deleteMandays(e)
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
  annualFunc() {
    this.semiAnnual = true;
  }
  annualSemiFunc() {
    this.semiAnnual = false;
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

  addStage1(br2: any) {
    let val = this.leadForm.value;
    let data = {
      stage: val.stage,
      noOfMandays: Number(val.no_of_mandays),
      lead_genration_id: this.lead_id,
      br_number: br2.br_number,

    }


    this.leadService.addStage(data).subscribe((res: any) => {

      if (res.code === 200) {
        this.getStage1(br2.br_number);
        this.toast.success("Stage Added Successfully..");
      }
      if (res.code === 405) {
        this.toast.error(res.message);
      }
    })
  }

  nonCertFunc() {
    if (this.singleLeadData?.certificate_type == "Non Cert") {
      this.nonCertt = true
    }
  }
  getAllSegment() {
    this.configService.getAllSegment().subscribe((res: any) => {
      this.segmentList = res.data;

    });
  }

  getAchievementList() {
    this.recruitService.getAllAchivement().subscribe(
      (res: any) => {

        this.allAchievement = res.data;

        let filterUser = this.allAchievement.find((res: any) => res.employee_id == this.loginUserId)
        this.employee_id = filterUser.employee_id,
          this.leadForm.controls['approver_name_l1Id'].patchValue(Number(this.employee_id))


        //  

        //  this.employee_name=filterUser.first_name

        // let arr:any=[]
        // for(let a=0;a<this.allAchievement.length;a++){
        //   if(){

        //   }

        // }
        // 


      },
      (err) => {

      }
    );

  }

  addStage(br1: any) {
    let val = this.leadForm.value;
    let data = {
      stage: val.stage,
      noOfMandays: Number(val.no_of_mandays),
      lead_genration_id: this.lead_id,
      br_number: this.child_br_number,
    }
    this.leadService.addStage(data).subscribe((res: any) => {

      this.toast.success("Stage Added Successfully..");
      if (res.code === 200) {
        this.getStage(this.child_br_number);
      }
      if (res.code === 405) {
        this.toast.error(res.message);
      }

    })
  }


  getCategory() {
    this.configService.listCategory().subscribe((res: any) => {
      this.categoryList = res.data;

    })
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
  downloadOther(pdfName: any, pdfUrl: any) {
    // const pdfUrl = this.singleLeadData?.other_file;
    // const pdfName = this.singleLeadData?.document_remark;
    FileSaver.saveAs(pdfUrl, pdfName);
    // e.stopPropagation();
  }
  downloadBasic(e: any) {
    const pdfUrl = this.singleLeadData?.basic_form;
    const pdfName = this.singleLeadData?.first_name;
    FileSaver.saveAs(pdfUrl, pdfName);
    e.stopPropagation();
  }
  value(value: any) {
    throw new Error('Method not implemented.');
  }

  candidateClick(e: any) {

    this.candidateId = e;
    this.recruitService.interViewGetIdBy(e).subscribe((res: any) => {
      this.interviewGetId = res.data;

      this.patchFormvalue();
    })
  }

  viewDocLogo() {
    window.open(this.singleLeadData.company_logo, '_blank');
  }
  viewDocOther(url: any) {
  console.log(url, 'url')
    window.open(url, '_blank');
  }
  viewDocReview() {
    window.open(this.singleLeadData.contact_review_form, '_blank');
  }
  viewDocGST() {
    window.open(this.singleLeadData.gst_file, '_blank');
  }
  viewDocBasic() {
    window.open(this.singleLeadData.basic_form, '_blank');
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
      this.selectedFile = file
      console.log(file, 'file')
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

    console.log(this.fileDetailsFour, 'four')
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
    if (this.singleLeadData?.certificate_type != 'undefined || null') {
      this.leadService.getAssesmentByID(this.singleLeadData?.certificate_type).subscribe((res: any) => {

        this.assesmentList = res.data[0].newitemlist;

      });
    }
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
    if (this.singleLeadData?.certificate_type != 'undefined || null') {
      this.leadService.getAssesmentByID(this.singleLeadData?.certificate_type).subscribe((res: any) => {

        this.assesmentList = res.data[0].newitemlist;

      });
    }
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
      urd_number: this.singleLeadData?.urd_number,
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
      lead_created_date: this.singleLeadData?.lead_created_date,
      assigned_to: this.singleLeadData?.assigned_to,
      assessment_period: this.singleLeadData?.assessment_period,
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
      customer_sales_executive: this.singleLeadData?.customer_sales_executive,
      opportunity_type: this.singleLeadData.opportunity_type,
      opportunity_ref: this.singleLeadData.OpportunityRef_no,
      no_of_mandays: this.singleLeadData.no_of_mandays,
      ea_code: this.singleLeadData.ea_code,
      billing_site: this.singleLeadData.billing_site,
      non_cert_type: this.singleLeadData?.non_cert_type,
      document_remark: this.singleLeadData?.document_remark,
      lead_genration_id: this.singleLeadData?.lead_genration_id,
      // approver_name_l1Id:this.singleLeadData?. lead_created_by_name,
      approver_name_l1Id: Number(this.employee_id),
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

    this.leadService.getStateByID(e.value).subscribe((res: any) => {
      this.patchCountryCode(e.value)
      this.stateList = res.data;
    });
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

  submitForm() {
    console.log('sadasd')
    this.submitted = false;
    if (this.parentSide === true) {
      //   if (this.leadForm.invalid) {
      //   this.toast.error(
      //     'Required fields should not be empty.',
      //     'Error Occurred!'
      //   );
      //   return;
      // }  
      let val = this.leadForm.value;

      this.submitted = true;

      const dataMain = {
        budgetaryQuote: "TRUE",
        customer_type: val.customer_type,
        multiple_site_audit: val.site_audit || " ",
        associated_company: val.associated_company,
        segment: val.segment,
        non_cert_type: val.non_cert_type,
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
        assigned_to: val.assigned_to,
        country: val.country,
        postal_code: val.postal_code,
        region: val.region,
        regional_bussiness_lead: val.regional_bussiness_lead,
        global_managing_director: val.global_managing_director,
        global_manager_sales: val.global_manager_sales,
        website_url: val.website_url,
        phone_number: val.phone_number,
        lead_created_by_name: val.lead_created_by_name,
        mobile_number: val.mobile_number,
        dqs_contact_source: val.dqs_contact_source,
        contact_owner: val.contact_owner,
        lead_created_date: moment(val.lead_created_date).format('YYYY-MM-DD'),
        standard_program_assement: val.standard_program_assement,
        remarks: val.remarks,
        categories: val.categories,
        lead_validate_stage: val.lead_validate_stage,
        validated_by: val.validated_by,
        lead_validated_date: moment(val.lead_validated_date).format('YYYY-MM-DD'),
        lead_validate_remarks: val.lead_validate_remarks,
        lead_assgn_contact_owner: val.lead_assgn_contact_owner,
        assigned_by: val.assigned_by,
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
        assessment_period: val.assessment_period,
        industry_sector: val.industry_sector,
        employee_count: val.employee_count,
        company_remarks: val.company_remarks,
        gst_applicable: val.gst_applicable,
        gst_number: val.gst_number,
        pan_number: val.pan_number,
        tan_number: val.tan_number,
        approver_name_l1Id: Number(this.employee_id),
        approver_name_l1: this.loginUserName,
        status: "Pre L2"
      }
      const data = {
        contact_review_form: this.fileDetails.file,
        gst_file: this.fileDetailsOne.file,
        basic_form: this.fileDetailsTwo.file,
        company_logo: this.fileDetailsThree.file,
        // other_file: this.fileDetailsFour.file,
        document_remark: val.document_remark,
      }

      if (data.contact_review_form) {

        this.leadService.editLeadDoc(this.lead_id, data).subscribe((res: any) => {

        });
      }
      this.leadService.editLead(this.lead_id, dataMain).subscribe((res: any) => {

        this.toast.success("Opportunity to L1 Approved Successfully..")
        this.route.navigate(['master/lead/lead-opportunity'],
          { queryParams: { lead_id: [this.lead_id], employee_id: this.employee_id } }
        );
      })

    }
    else {
      this.toast.error(
        'Please Select Site.',
        'Error Occurred!'
      );

    }


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
  reject() {
    const data = {
      status: "Rejected"
    }
    this.leadService.editLead(this.lead_id, data).subscribe((res: any) => {

      this.toast.success(res.message);
      this.route.navigate(['master/lead/lead-opportunity/opportunity-list'],
        { queryParams: { lead_id: this.lead_id } }
      );
    })
  }
  toggleAllCodeSelect() {
    if (this.allSelectedCode) {
      this.eacodeselect.options.forEach((item: MatOption) => item.select());
    } else {
      this.eacodeselect.options.forEach((item: MatOption) => item.deselect());
    }
  }
  optionEaCode() {
    let newStatus = true;
    this.eacodeselect.options.forEach((item: MatOption) => {
      if (!item.selected) {
        newStatus = false;
      }
    });
    this.allSelectedCode = newStatus;
  }
  cancel() {
    window.location.reload()
  }
  selectApprover(e: any) {

    this.employee_id = e.value
    let filterUserName = this.allAchievement.find((res: any) => res.employee_id == this.employee_id)

    this.loginUserName = filterUserName.first_name

  }

  optionEaCodeCopy(e: any) {
    console.log(e);

    let newStatusCopy = true;
    this.billSite.options.forEach((item: MatOption) => {
      if (!item.selected) {
        newStatusCopy = false;
      }
    });
    this.allSelectedBill = newStatusCopy;
  }

  toggleAllCodeSelect2() {
    if (this.allSelectedBill) {
      this.billSite.options.forEach((item: MatOption) => item.select());
    } else {
      this.billSite.options.forEach((item: MatOption) => item.deselect());
    }
  }

  billFilter(e: any) {
    console.log(e, 'eeee billing');
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

  uploadOtherDoc() {
    if (!this.selectedFile) {
      this.toast.error("File not selected")

      return;
    }
  
    
    if (this.fileDetailsFour) {

      const formData: any = new FormData();
      formData.append('other_file',  this.fileDetailsFour.file,);
      console.log(this.lead_id, 'dd', formData)
      this.leadService.uploadOtherDoc(this.lead_id, formData).subscribe((res: any) => {
        console.log("response", res)
        if (res.code == 200) {
          this.toast.success(res.message)
        }
      })
    }

  };
  
}