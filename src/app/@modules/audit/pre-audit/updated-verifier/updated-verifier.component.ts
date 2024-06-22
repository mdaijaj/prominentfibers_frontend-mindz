import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatOption } from '@angular/material/core';
import { MatSelect } from '@angular/material/select';
import * as moment from 'moment';
import { LeadService } from 'src/app/@shared/services/lead.service';
import { RecruitService } from 'src/app/@shared/services/recruitment.service';
import { ConfigurationalmasterService } from 'src/app/@shared/services/configurationalmaster.service';
import * as FileSaver from 'file-saver';
import Swal from 'sweetalert2';
import { log } from 'console';
@Component({
  selector: 'app-updated-verifier',
  templateUrl: './updated-verifier.component.html',
  styleUrls: ['./updated-verifier.component.scss']
})
export class UpdatedVerifierComponent {
  [x: string]: any;
  toDate: any;
  id: any;
  @ViewChild('eacodeselect') eacodeselect: MatSelect;
  Login_user_id: any = localStorage.getItem('signInUser');
  loginUserId: any = JSON.parse(this.Login_user_id).employee_id
  loginUserName: any = JSON.parse(this.Login_user_id).first_name
  displayedColumns: string[] = ['stage', 'noOfMandays'];
  leadForm: FormGroup;
  jobType: any;
  candidateArray: any;
  interviewGetId: any;
  candidateId: any;
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
  comments1: any;
  comments2: any;
  comments3: any;
  comments4: any;
  comments5: any;
  comments6: any;
  childSide:boolean=false;
   modify_Data:any=[];
   modify_Data_mandys:any=[];
   priceItem:any;
   total_amount:any;
   product_amounts:any;


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
  inlineData:any;
  netAmount:any;
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
  br1: any;
  FromDate: string;
  showTable: boolean;
  logoRequired: boolean;
  logoCost: boolean;
  currencyList: any;
  show1: any;
  show2: any;
  show3: any;
  show4: any;
  show5: any;
  show6: any;
  br_list: any;
  getDataByBR_ID: any;
  br: any;
  billing_add: any;
  mobile: any;
  email: any;
  desig: any;
  name: any;
  gst: any;
  state: any;
  getChild_Company: any;
  br_all: any[];
  br_alls: any[];
  invoice_list: any;
  sr_no: void;
  sr_no_add: number;
  add_dynamic_invoice: any;
  qnt_value: any;
  unit_price: any;
  net_amt: number;
  br_no: any;
  get_invoice_details: any;
  br_numbers: any;
  billing_address: any;
  states: any;
  gstn: any;
  names: any;
  designations: any;
  emails: any;
  mobiles: any;
  child_br_number:any
  mandaysDataAll:any;
  netAmount2:any;
  arraymerge:any;
  netAmount2Copy:any
  constructor(
    private fb: FormBuilder,
    private leadService: LeadService,
    private route: Router,
    private toast: ToastrService,
    private configService: ConfigurationalmasterService,
    private recruitService: RecruitService,
    private activeroute: ActivatedRoute) {
    this.leadForm = this.fb.group({
      phone_code: new FormControl(),
      mobile_code: new FormControl(),
      customer_type: new FormControl(null),
      site_audit: new FormControl(null),
      associated_company: new FormControl(null, Validators.required),
      segment: new FormControl(null, Validators.required),
      certificate_type: new FormControl(null, Validators.required),
      first_name: new FormControl(null, Validators.required),
      s: new FormControl(null),
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
      mobile_number: new FormControl(null, [Validators.required, Validators.maxLength(10),
      Validators.pattern('^[0-9]*$'),
      Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$')]),
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
      travel_expence: new FormControl(null),
      other_expence: new FormControl(null),
      multiple_site: new FormControl(null),
      billing_sites: new FormControl(null),
      l1_verifer_name: new FormControl(null),
      l1_verifer_date: new FormControl(null),
      remarsk_l1: new FormControl(null),
      l2_verifer_name: new FormControl(null),
      l2_verifer_date: new FormControl(null),
      quotation_currency: new FormControl(null),
      remark_l2: new FormControl(null),
      slab_quote: new FormControl(null),
      expense_category: new FormControl(null),
      logo_cost: new FormControl(null),
      company_logo_req: new FormControl(null),
      company_logo_cost: new FormControl(null),
      quote_prepared: new FormControl(null),
      quote_prepared_date: new FormControl(null),
      approver_name_l1Id: new FormControl(null),
      // invoice verification End
      associatedCompany: new FormControl(null),
      BrNumber: new FormControl(null),
      firstName: new FormControl(null),
      Mob_number: new FormControl(null),
      streetAddress: new FormControl(null),
      addressLine: new FormControl(null),
      gstNumber: new FormControl(null),
      creditDay: new FormControl(null),
      jobTitle: new FormControl(null),
      wo_verify_by: new FormControl(null),
      wo_verified_on: new FormControl(null),
      wo_verification_status: new FormControl(null),
      comment1: new FormControl(null),
      comment2: new FormControl(null),
      comment3: new FormControl(null),
      comment4: new FormControl(null),
      comment5: new FormControl(null),
      comment6: new FormControl(null),
      audit_start_date: new FormControl(null),
      audit_end_date: new FormControl(null),
      ICT_Date: new FormControl(null),
      br_lists: new FormControl(null),
      wo_verification_comment:new FormControl()
      //Invoice Verification End
    })
    this.add_dynamic_invoice = this.fb.group({
      item_description: new FormControl(null),
      qty: new FormControl(null),
      unit: new FormControl(null),
      unit_price: new FormControl(null),
      net_amount: new FormControl(null),
      sr_no_add: new FormControl(null),

    })
  }
  ngOnInit() {
    this.activeroute.queryParams.subscribe((params: any) => {
      this.br_no = params.br_number
      this.id = params;
      this.lead_id = this.id?.lead_genration_id;
      
      
      
      this.get_invoice_verification(this.br_no);
      this.leadService.getByIdLead(this.lead_id).subscribe((res: any) => {
        this.singleLeadData = res.data;
        console.log(this.singleLeadData,'this.singleLeadData');
        
        this.nonCertFunc();
        this.patchFormvalue();
        this.getAllProd();
      })
    });
    this.getAchievementList();
    this.getCurrency();
    this.getCategory();
    this.getStage();
    this.getEACode();
    this.getApprover();
    this.getCountry();
    this.getAchievementListt();
    this.regionalBusiness();
    this.globalManagerales();
    this.get_All_BR_Number(this.lead_id);
    this.getByIdChildLead(this.lead_id);
    this.InvoiceLineItems(this.br_no);
    let loginU: any = localStorage.getItem('signInUser')
    let nn = JSON.parse(loginU)
    this.loginUser = nn
    // this.leadService.getByIdLeadId(this.lead_id).subscribe((res: any) => {
      
    //   let x = res.data.map((a: any) => {
    //     return { ...a, checked: false }
    //   })
    //   this.singleLeadData1 = x;
      
    // })
    this.leadService.getByIdLeadId(this.lead_id).subscribe((res: any) => {
      let x = res.data.map((a: any) => {
        return { ...a, checked: false };
      });
      this.singleLeadData1 = x;
      this.singleLeadData1.unshift(
        {br_number:this.singleLeadData?.br_number, associated_company: this.singleLeadData?.associated_company,city_name:this.singleLeadData?.city_name,state_name:this.singleLeadData?.state_name},
    
      )  
    });
    this.sr_no_add = this.invoice_list?.length + 1;
  }

  InvoiceLineItems(br:any) {
    // const data={
    //     br_number: br
    // }
    this.leadService.InvoiceLineItems(br).subscribe((res: any) => {
      this.invoice_list = res.data
      console.log( this.invoice_list,' this.invoice_list');
      // const mandaysData:=[]
      for(let i=0;i<= this.invoice_list.length-1;i++){

  console.log(this.invoice_list[i]?.quantity,'this.invoice_list[i]?.quantity');
  console.log(this.singleLeadData?.slab_quote,'this.singleLeadData?.slab_quote');
  for(let a=0;a<this.invoice_list.length;a++){
    this.invoice_list[a].net_amount=Number(this.invoice_list[a]?.quantity) * Number(this.invoice_list[a]?.unitPrice)

  }
  
  console.log(this.invoice_list,'invoice lsist');
  
      }
      console.log( this.invoice_list,'  this.invoice_list');
      
    })

   
    
  }

  // InvoiceLineItems() {
  // this.invoice_list = [
  //   { sr: 1, items: "items1", quentity: 20, unit: 'kg', unit_price: 200, netAmout: 4000 },
  //   { sr: 2, items: "items2", quentity: 30, unit: 'm', unit_price: 100, netAmout: 3000 },
  //   { sr: 3, items: "items3", quentity: 5, unit: 'cm', unit_price: 200, netAmout: 1000 },
  // ]



  // }

  get_invoice_verification(e: any) {
    this.leadService.get_invoice_verification(e).subscribe((res: any) => {
      

      this.get_invoice_details = res.data
      this.br_numbers = res.data.br_number
      this.billing_address = res.data.billingAddress
      this.states = res.data.state
      this.gstn = res.data.GSTNumber
      this.names = res.data.firstName,
        this.designations = res.data.designation
      this.emails = res.data.email
      this.mobiles = res.data.mobilePhonenumber
      this.comments1 = res.data.CI_assessment_fee_comment1
      this.comments2 = res.data.digitallySignedSoftcopy_comment2
      this.comments3 = res.data.travelLivingClaim_comment3
      this.comments4 = res.data.TL_supportingNotSent_comment4
      this.comments5 = res.data.invoiceIsWithGST_comment5
      this.comments6 = res.data.ClientNamePO_comment6

      
      this.leadForm.patchValue({
        wo_verified_on: this.get_invoice_details?.wo_verifyOn,
        wo_verify_by: this.get_invoice_details?.wo_verifyBy,
        wo_verification_status: this.get_invoice_details?.wo_verification_status,
        wo_verification_comment: this.get_invoice_details?.wo_verifier_comments,
        comment1: this.get_invoice_details?.CI_assessment_fee_comment1,
        comment2: this.get_invoice_details?.digitallySignedSoftcopy_comment2,
        comment3: this.get_invoice_details?.travelLivingClaim_comment3,
        comment4: this.get_invoice_details?.TL_supportingNotSent_comment4,
        comment5: this.get_invoice_details?.invoiceIsWithGST_comment5,
        comment6: this.get_invoice_details?.ClientNamePO_comment6,
        audit_start_date: this.get_invoice_details?.audit_start_date,
        audit_end_date: this.get_invoice_details?.audit_end_date,
        ICT_Date: this.get_invoice_details?.ICTDate,
        br_lists: this.get_invoice_details?.billingAddress,
        associatedCompany: this.get_invoice_details?.associatedCompany,
        BrNumber: this.get_invoice_details?.br_number,
        email: this.get_invoice_details?.email,
        jobTitle: this.get_invoice_details?.discription,
        firstName: this.get_invoice_details?.firstName,
        city: this.get_invoice_details?.city,
        state: this.get_invoice_details?.state,
        Mob_number: this.get_invoice_details?.mobilePhonenumber,
        streetAddress: this.get_invoice_details?.streetAddress,
        addressLine: this.get_invoice_details?.addressLine2,
        gstNumber: this.get_invoice_details?.GSTNumber,
        creditDay: this.get_invoice_details?.creditDays,
      })
    }
    )
  }


  get_All_BR_Number(lead_id: any) {
    this.leadService.get_All_BR_Number(lead_id).subscribe((res: any) => {
      console.log(res,'res>>>>>>>>>>>>>>>>>>>');
      
      let br_all = [];
      br_all.push(res.data[0]?.br_number);
      for (let a = 0; a < res.data[0]?.newLocations.length; a++) {
        br_all.push(res.data[0]?.newLocations[a].br_number)
      }
      
     
      this.br_alls = br_all
      this.br_list = res.data
      console.log( this.br_alls,' this.br_alls');
      
    })
  }
  getByIdChildLead(lead_id: any) {
    this.leadService.getByIdChildLead(lead_id).subscribe((res: any) => {
      
      this.getChild_Company = res.data
    })
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

  getStage() {
    this.leadService.getStage(this.lead_id).subscribe((res: any) => {
      
      this.stageData = res.data;
    })
  }
  nonCertFunc() {
    if (this.singleLeadData?.certificate_type == "Non Cert") {
      this.nonCertt = true
    }
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

  // addStage() {
  //   let val = this.leadForm.value;
  //   let data = {
  //     stage: val.stage,
  //     noOfMandays: Number(val.no_of_mandays),
  //     lead_genration_id: this.lead_id
  //   }
  //   this.leadService.addStage(data).subscribe((res: any) => {
  //     
  //     this.toast.success("Stage Added Successfully..");
  //     this.getStage();
  //   })
  // }

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
  downloadOther(e: any) {
    const pdfUrl = this.singleLeadData?.other_file;
    const pdfName = this.singleLeadData?.document_remark;
    FileSaver.saveAs(pdfUrl, pdfName);
    e.stopPropagation();
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
  viewDocOther() {
    window.open(this.singleLeadData.other_file, '_blank');
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
      customer_type: this.singleLeadData?.customer_type,
      site_audit: this.singleLeadData?.multiple_site_audit,
      associated_company: this.singleLeadData?.associated_company,
      segment: this.singleLeadData?.segment_name,
      br_number: this.singleLeadData?.br_number,
      assignedManager: this.singleLeadData?.assigned_hiring_manager,
      certificate_type: this.singleLeadData?.certificate_type_name,
      first_name: this.singleLeadData?.first_name,
      last_name: this.singleLeadData?.last_name,
      email: this.singleLeadData?.email,
      emplyoment_type: this.singleLeadData?.emplyoment_type,
      street_address: this.singleLeadData?.street_address,
      job_title: this.singleLeadData?.job_title,
      address2: this.singleLeadData?.address2,
      city: this.singleLeadData?.city_name,
      state: this.singleLeadData?.state_name,
      country: this.singleLeadData?.country,
      postal_code: this.singleLeadData?.postal_code,
      region: this.singleLeadData?.region_name,
      urd_number: this.singleLeadData?.urd_number,
      categories: this.singleLeadData?.categories,
      regional_bussiness_lead: this.singleLeadData?.regional_bussiness_lead,
      global_managing_director: this.singleLeadData?.global_managing_director,
      global_manager_sales: this.singleLeadData?.global_manager_sales_name,
      website_url: this.singleLeadData?.website_url,
      phone_number: this.singleLeadData?.phone_number,
      mobile_number: this.singleLeadData?.mobile_number,
      lead_created_by_name: this.singleLeadData?.lead_created_by_name,
      dqs_contact_source: this.singleLeadData?.dqs_contact_source,
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
      s: this.singleLeadData.s,
      non_cert_type: this.singleLeadData?.non_cert_type,
      document_remark: this.singleLeadData?.document_remark,
      lead_genration_id: this.singleLeadData?.lead_genration_id,
      // approver_name_l1Id:this.singleLeadData?. lead_created_by_name,
      approver_name_l1Id: Number(this.employee_id),
      // billing_site_copy:this.singleLeadData.billing_site_copy,


    })

  }
  getByIDBR_Lists(value: any) {
    this.leadForm.patchValue({
      associatedCompany: value?.associated_company,
      BrNumber: value?.br_number,
      Mob_number: value?.mobile_number,
      streetAddress: value?.street_address,
      gstNumber: value?.gst_number,
      creditDay: value?.remaining_count,
      city: value?.city_name,
      state: value?.state_name,
      email: value?.email,
      jobTitle: value?.job_title,
      firstName: value?.first_name,
      addressLine: value?.address2,
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
    this.patchCountryCode(e.value);
    this.leadService.getStateByID(e.value).subscribe((res: any) => {
      
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
    
    const datas = {
      wo_verified_on: this.leadForm.value.wo_verified_on,
      wo_verify_by: this.leadForm.value.wo_verify_by,
      wo_verification_status: this.leadForm.value.wo_verification_status,
      comment1: this.leadForm.value.comment1,
      comment2: this.leadForm.value.comment2,
      comment3: this.leadForm.value.comment3,
      comment4: this.leadForm.value.comment4,
      comment5: this.leadForm.value.comment5,
      comment6: this.leadForm.value.comment6,
      audit_start_date: this.leadForm.value.dit_start_date,
      audit_end_date: this.leadForm.value.audit_end_date,
      ICT_Date: this.leadForm.value.ICT_Date,
      br_lists: this.leadForm.value.br_lists,
      associatedCompany: this.leadForm.value.ociatedCompany,
      BrNumber: this.leadForm.value.BrNumber,
      email: this.leadForm.value.email,
      jobTitle: this.leadForm.value.jobTitle,
      firstName: this.leadForm.value.firstName,
      city: this.leadForm.value.city,
      state: this.leadForm.value.state,
      Mob_number: this.leadForm.value.Mob_number,
      streetAddress: this.leadForm.value.streetAddress,
      addressLine: this.leadForm.value.addressLine,
      gstNumber: this.leadForm.value.gstNumber,
      creditDays: this.leadForm.value.creditDay,
      billing_site_copy:this.singleLeadData.billing_site_copy,

    }
    
    this.submitted = false;
    if (this.leadForm.invalid) {
      this.toast.error(
        'Required fields should not be empty.',
        'Error Occurred!'
      );
      return;
    }
    let val = this.leadForm.value;
    

    this.submitted = true;

    const dataMain = {
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
      s: val.s,
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
      travel_expence: val.travel_expence,
      other_expence: val.other_expence,
      billing_site_copy:this.singleLeadData.billing_site_copy,

      status: "Send Finance"
    }
    const data = {
      contact_review_form: this.fileDetails.file,
      gst_file: this.fileDetailsOne.file,
      basic_form: this.fileDetailsTwo.file,
      company_logo: this.fileDetailsThree.file,
      other_file: this.fileDetailsFour.file,
      document_remark: val.document_remark,
    }

    if (data.contact_review_form) {
      
      


      this.leadService.editLeadDoc(this.lead_id, data).subscribe((res: any) => {
        
      });
    }
    this.leadService.editLead(this.lead_id, dataMain).subscribe((res: any) => {
      
      this.toast.success("Invoice sent to Finance Successfully..")
      this.route.navigate(['master/audit/post-audit/generate-invoice']);
    })

  }
  updateForm() {
    this.submitted = false;
    if (this.leadForm.invalid) {

      this.toast.error('Required fields should not be empty.', 'Error Occurred!');
      return;
    }
    const data = this.leadForm.value;
    
    this.leadService.editLead(this.lead_id, data).subscribe((res: any) => {
      
      
      this.toast.success("Invoice sent to Finance Successfully..")
      this.route.navigate(['master/audit/post-audit/generate-invoice']);
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
  typeChange(e1: any, e: any) {
    this.br1 = e.br_number;
    


    for (let x of this.singleLeadData1) {
      if (x.new_location_id === e.new_location_id) {
        x.checked = e1.target.checked
      }
    }

  }
  addStage(br1: any) {
    let val = this.leadForm.value;
    let data = {
      stage: val.stage,
      noOfMandays: Number(val.no_of_mandays),
      lead_genration_id: this.lead_id,
      br_number: br1,

    }
    

    this.leadService.addStage(data).subscribe((res: any) => {
      
      this.toast.success("Stage Added Successfully..");
      this.getStage();
    })
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
            // window.location.reload();
          });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
      }
    });

    // this.leadService.deleteMandays(e)
  }

  fromDate(e: any) {
    this.FromDate = moment(e.value).format('YYYY-MM-DD');
  }
  ToDate(e: any) {
    this.toDate = moment(e.value).format('YYYY/MM/DD');
    
  }
  showPriceTable() {
    this.showTable = !this.showTable;
  }
  logoReqNew() {
    this.logoRequired = false;
    this.logoCost = true;
  }
  logoReq() {
    this.logoRequired = true;
    this.logoCost = false;
  }
  getCurrency() {
    this.configService.getQuotationcurrency().subscribe((res: any) => {
      this.currencyList = res.data;
      
    });
  }
  _1st_Check(e: any) {
    
    this.show1 = e.target.value

  }
  _2nd_Check(e: any) {
    
    this.show2 = e.target.value

  }
  _3rd_Check(e: any) {
    
    this.show3 = e.target.value

  }
  _4th_Check(e: any) {
    
    this.show4 = e.target.value


  }
  _5th_Check(e: any) {
    
    this.show5 = e.target.value

  }
  _6th_Check(e: any) {
    
    this.show6 = e.target.value

  }
  updateVerifierComments() {

  }
  billingAddress(e: any) {
    
    this.leadService.get_ById_BR_Number(e.value).subscribe((res: any) => {
      console.log(res,'res<<<<<<<<<<<<<<<');
      this.inlineData=res.data;
     console.log(  this.inlineData,'  this.inlineData');
     
     const mandaysData=[]
     for(let i=0;i<=this.inlineData.length;i++){
if(this.inlineData[i]?.mandays_id){
  mandaysData.push(this.inlineData[i])
  this.netAmount=this.inlineData[i].noOfMandays * this.singleLeadData?.slab_quote
}
     }
     console.log(this.netAmount,'this.netAmount');

     for(let a=0;a<this.inlineData.length;a++){
      this.inlineData[a].net_amount=Number(this.inlineData[a]?.noOfMandays) * this.singleLeadData?.slab_quote
  
    }

    console.log( this.inlineData,' this.inlineData<<<<<<<');
    

     this.mandaysDataAll=mandaysData
      console.log(this.mandaysDataAll,'this.mandaysDataAll');
//  this.invoice_list.push(this.mandaysDataAll);
//  console.log( this.invoice_list,' this.invoice_list{{{{{{{{{{{{{{');



      this.getDataByBR_ID = res.data[0]
      this.br = res.data[0].br_number,
        this.billing_add = res.data[0].street_address,
        this.state = res.data[0].state_name,
        this.gst = res.data[0].gst_number,
        this.name = res.data[0].first_name,
        this.desig = res.data[0].job_title,
        this.email = res.data[0].email,
        this.mobile = res.data[0].mobile_number

        this.leadForm.patchValue({
          approver_name_l1Id: this.getDataByBR_ID.approver_name_l1Id, 
          associatedCompany: this.getDataByBR_ID.associated_company,
          BrNumber: this.getDataByBR_ID.br_number,
          firstName: this.getDataByBR_ID.first_name,
          Mob_number: this.getDataByBR_ID.mobile_number,
          streetAddress: this.getDataByBR_ID.street_address,
          addressLine: this.getDataByBR_ID.address2,
          gstNumber: this.getDataByBR_ID.gst_number,
          creditDay: this.getDataByBR_ID.creditDay,
          jobTitle: this.getDataByBR_ID.job_title,
          wo_verify_by: this.getDataByBR_ID.wo_verify_by,
          email  : this.getDataByBR_ID.email    ,
          city:this.getDataByBR_ID.city_name ,
          state:this.getDataByBR_ID.state_name,

        })

       
        this.add_dynamic_invoice({
          item_description:this.getDataByBR_ID.stage,
          qty:this.getDataByBR_ID.noOfMandays,
          unit_price:this.singleLeadData?.slab_quote
          
         })


    })
    this.getByIDBR_Lists(this.getDataByBR_ID)  
  }
  add_new_invoice() {
    this.sr_no_add = this.invoice_list.length + 1;
    this.add_dynamic_invoice.controls.sr_no_add.setValue(this.sr_no_add);
    
    
    const data = {
      sr: this.add_dynamic_invoice.value.sr_no_add,
      items: this.add_dynamic_invoice.value.item_description,
      quentity: this.add_dynamic_invoice.value.qty,
      unit: this.add_dynamic_invoice.value.unit,
      unit_price: this.add_dynamic_invoice.value.unit_price,
      netAmout: this.add_dynamic_invoice.value.net_amount,
    }
    
    if (this.add_dynamic_invoice.invalid) {
      this.toast.error("Error", "Please fill correct details");
    }
    else {
      // this.invoice_list.push(data);
      // this.toast.success("Invoice Create Successfully..");
      // 
    }
  }
  onKey_qty(e: any) {
    
    this.qnt_value = e.target.value;
    const net_amt: any = this.qnt_value * this.unit_price;
    this.add_dynamic_invoice.controls.net_amount.setValue(net_amt);
  }
  onKey_unit_price(e: any) {
    
    this.unit_price = (e.target.value);
    const net_amt: any = this.qnt_value * this.unit_price;
    this.add_dynamic_invoice.controls.net_amount.setValue(net_amt);
  }
  reloadCurrentRoute() {
    let currentUrl = this.route.url;
    this.route.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.route.navigate([currentUrl]);
    });
  }
  createInvoice() {
    
    const data = {
      // sr:this.add_dynamic_invoice.value.sr_no_add,
      item_description: this.add_dynamic_invoice.value.item_description,
      quantity: this.add_dynamic_invoice.value.qty,
      unit: this.add_dynamic_invoice.value.unit,
      unitPrice: this.add_dynamic_invoice.value.unit_price,
      br_number: this.br_no,
      lead_generation: this.lead_id,
    }
    this.leadService.inline_create_invoice(data).subscribe((res: any) => {
      console.log(res);
      this.toast.success("Successfully", "Create Invoice Line Items")

      setTimeout(function(){
        window.location.reload();

      },3000);
    })
    
  }
  add(){
    console.log(this.modify_Data,'this.modify_Data');
    this.arraymerge=this.invoice_list.concat(this.mandaysDataAll)
console.log(this.arraymerge,'this.arraymerge');
    console.log(this.br_no,'this.br_no');
    this.leadService.updateInvoice(this.br_no,this.modify_Data).subscribe((res:any)=>{
      
      this.toast.success("Successfully", "Create Invoice Line Items")
      this.route.navigate(['master/audit/pre-audit/invoice_request_lists'],
        { queryParams: { lead_id: this.lead_id,brNumber:this.br_no}}
      );
    })

  }

  // manual checkbox select
  line_itms_change(e: any, data: any) {
    console.log(e,'e<<<<');
    
    console.log(e.target.checked, "eeeee");
    console.log(data, "eeeee");
    const {
      lineItem_status,
      invoice_inline_id,

    } = data;
    if(e.target.checked==true){
      this.modify_Data.push(
        {lineItem_status:true,invoice_inline_id:invoice_inline_id, statusInvoice:"Send Finance"}
          // invoice_inline_id: data.invoice_inline_id, lineItem_status: true},
      )
      console.log(this.modify_Data, ' <--modify_Data');
    }
    else{
      this.modify_Data.push(
        {lineItem_status:false,invoice_inline_id:invoice_inline_id,}

        // { invoice_inline_id: data.invoice_inline_id, lineItem_status: false},
      )
      console.log(this.modify_Data, ' <--modify_Data');

    }
     
  }


  // mandays Checkbox Select
  mandaysSelect(e: any, data: any) {
    console.log(e,'e<<<<');
    
    console.log(e.target.checked, "eeeee");
    console.log(data, "eeeee");
    const {
      lineItem_status,
      mandays_id,

    } = data;
    if(e.target.checked==true){
      this.modify_Data_mandys.push(
        {lineItem_status:true,invoice_inline_id:mandays_id, statusInvoice:"Send Finance"}
          // invoice_inline_id: data.invoice_inline_id, lineItem_status: true},
      )
      console.log(this.modify_Data_mandys, ' <--modify_Data_mandys');
    }
    else{
      this.modify_Data_mandys.push(
        {lineItem_status:false,invoice_inline_id:mandays_id}

        // { invoice_inline_id: data.invoice_inline_id, lineItem_status: false},
      )
      console.log(this.modify_Data_mandys, ' <--modify_Data_mandys');

    }
     
    // this.modify_Data.push(this.modify_Data_mandys);
    // console.log(this.modify_Data,'this.modify_Data{{{{{{{{{{{{');
    
  }
  getCurrentRoute():string{
    return this.activeroute.snapshot.url.map(s => s.path).join('/')
}

getStage1(br1: any) {
  this.leadService.getStage(br1).subscribe((res: any) => {
    this.stageData = res.data;
    console.log( this.stageData ,'this.stageData');
    
  });
}
typeChangeChild(e: any, event: any) {
  console.log('event******', event?.br_number);
  if (event.checked == true) {
    this.childSide = true;
     this.singleLeadData1.forEach((res: any) => {
      console.log('res ', res);
      if (res.br_number == event.br_number) {
        res.checked = e.checked;
        this.child_br_number = event?.br_number;
        console.log('child br number ******', this.child_br_number);
      } else {
        res.checked = false;
      }
    });
    this.getStage1(this.child_br_number);
  } 
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

getAllProd(){
  this.configService.MSA_Non_Cert().subscribe((res)=>{
     console.log("product",res);
     console.log(this.singleLeadData.product_request.length,'this.singleLeadData?.product_request');
     
let item:any=[]
     for(let a=0;a<=res.data.length;a++){
      console.log(res.data[a]?.product_master_name,'res.data[a]?.product_master_name');
      console.log(this.singleLeadData?.product_request.length,'this.singleLeadData?.product_request.length');
      for(let i=0;i<=this.singleLeadData?.product_request.length-1;i++){

        if(res.data[a]?.product_master_name===this.singleLeadData?.product_request[i]){
          item.push(res.data[a])
          console.log(item,'item');
      }
      }
     }
     this.priceItem = item;
     console.log('terstt',this.priceItem);
     
     console.log(item,'item out');

     this.total_amount = item.reduce((sum:any, item:any) => sum + item.price, 0);
     console.log('test', this.total_amount);
     if(this.singleLeadData.certificate_type_name =='Non-Cert'){
      this.total_amount = item.reduce((sum:any, item:any) => sum + item.price, 0);
      console.log('test', this.total_amount);
      this.leadForm.patchValue({
       slab_quote: this.product_amounts || this.total_amount,
     })
    }
     
 })
 }


}
