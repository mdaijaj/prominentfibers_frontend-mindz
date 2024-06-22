import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { calendarFormat } from 'moment';
import { ToastrService } from 'ngx-toastr';
import { jsPDF } from 'jspdf';
import domtoimage from 'dom-to-image';
import { EmpRegistrationService } from 'src/app/@shared/services/emp-registration.service';
import { RecruitService } from 'src/app/@shared/services/recruitment.service';
import { ConfigurationalmasterService } from 'src/app/@shared/services/configurationalmaster.service';
import Swal from 'sweetalert2';
import { LeadService } from 'src/app/@shared/services/lead.service';

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
  selector: 'app-update-proforma-invoice',
  templateUrl: './update-proforma-invoice.component.html',
  styleUrls: ['./update-proforma-invoice.component.scss']
})
export class UpdateProformaInvoiceComponent {
  // displayedColumns: string[] = ['stage', 'noOfMandays'];
  br2: any;
  parentSide: boolean;
  br1: any;

  displayedColumns: string[] = ['account_name', 'br_number'];
  dataSource = ELEMENT_DATA;
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
  allAchievement: any;
  errorMsg: string = '';
  stateList: any[] = [];
  countryList: any[] = [];
  pinCodeList: any;
  allDataOne: any;
  allDataTwo: any;
  pinCodeTrue: boolean = true;
  cityList: any;
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
  quotePrepared: boolean = false;
  dataMain: {
    expense_category: any; customer_type: any; assigned_to: any; categories: any; site_audit: any; associated_company: any; segment: any; certificate_type: any; first_name: any; last_name: any; email: any; emplyoment_type: any; job_title: any; street_address: any; address2: any; city: any; state: any; country: any; postal_code: any; region: any; regional_bussiness_lead: any; global_managing_director: any; global_manager_sales: any; website_url: any; phone_number: any; mobile_number: any; dqs_contact_source: any; contact_owner: any; lead_created_date: string; standard_program_assement: any; remarks: any;
    add_cert_copy: any; accredition_logo_details: any; lead_validate_stage: any; validated_by: any; lead_validated_date: string; lead_validate_remarks: any; lead_assgn_contact_owner: any; assigned_by: any; stage: any; lead_assgn_remark: any; industry_sector: any; employee_count: any; company_remarks: any; gst_applicable: any; gst_number: any; pan_number: any; tan_number: any; product_request: any; customer_sales_executive: any; opportunity_type: any; opportunity_ref: any; billing_site: any; no_of_mandays: any; ea_code: any; assessment_period: any; opp_verifier_name_level1: any; opp_verified_date_level1: string;
    opp_verified_remarks_level1: any; reject_remarks_a: any; reject_remarks_b: any; opp_verifier_name_level2: any; opp_verified_date_level2: string; opp_verified_remarks_level2: any; quotation_currency: number; slab_quote: any; logo_cost: any; quote_prepared: any; quote_prepared_date: string; status: string; company_logo_req: any; company_logo_cost: any;
    agreed_slab_a: any;
    agreed_slab_b: any;
    agreed_logo_cost: any;
    agreed_accredition: any;
    lead_created_by_name: any;
    agreed_discount: any;
    fin_approval: any;
    sales_approval: any;
    audit_approval: any;
    scope_of_programe: any;
    payment_terms: any,
    advance_payment:any
    asessment_invoice: any;
    digital_signed_invoice: any;
    travel_claim: any;
    tl_support: any;
    export_service: any;
    client_name_pmo: any;
    customer_audit_date: any;
  };
  enableBtns: boolean = false;
  quoteSent: boolean = false;
  rejectRemarks: boolean = false;
  rejectRemarksA: boolean = false;
  categoryList: any;
  myDate = new Date();
  mainId: string | null;
  mainEmployeeData: any;
  logoRequired: boolean = false;

  qoutationType: any;
  approvalSent: boolean = false;
  invoiceSent: boolean = false;
  finReq: boolean = false;
  saleReq: boolean = false;
  auditReq: boolean = false;
  logoCost: boolean = false;
  showTable: boolean = false;
  unreg: boolean = false;
  gstreg: boolean = false;
  stageData: any[] = [];
  bookRequest: boolean = false;
  currencyList: any;
  toaster: any;
  now = new Date();
  year = this.now.getFullYear();
  month = this.now.getMonth();
  // day = this.now.getDay();
  date = this.now.getDate();
  maxDate = moment({ year: this.year + 100, month: this.month, date: this.date }).format('YYYY-MM-DD');
  minDate = moment({ year: this.year - 0, month: this.month, date: this.date }).format('YYYY-MM-DD');
  leadUpdate: any;
  segmentList: any;
  certificateList: any;
  regionSList: any;
  CategorySList: any;
  regionalbheadList: any;
  globalMsalesList: any;
  assesmentList: any;
  gstvalidation: boolean;
  nonCertTrue: boolean;
  msa_document: boolean = false;
  med_document: boolean;
  checkMedTrue: boolean = false;
  show1_value: boolean = true;
  show2_value: boolean = true;
  show3: any;
  show3_value: boolean = true;
  show4: any;
  show4_value: boolean = true;
  show5: any;
  show5_value: boolean = true;
  show6: any;
  show6_value: boolean = true;
  invoice_gst: any = 'export_of_service';
  show1: any;
  show2: any;
  contact_list: any;
  childSide: boolean;
  child_br_number: any;
  singleLeadData1: any;
  priceItem: any;
  total_amount: any;
  product_amounts: any;
  constructor(
    private fb: FormBuilder,
    private route: Router,
    private configService: ConfigurationalmasterService,
    private leadService: LeadService,
    private recruitService: RecruitService,
    private activeroute: ActivatedRoute,
    private toast: ToastrService,
    private _empRegistration: EmpRegistrationService
  ) {
    this.leadForm = this.fb.group({
      customer_type: new FormControl(null),
      site_audit: new FormControl(null),
      billing_site: new FormControl(null),
      associated_company: new FormControl(null, Validators.required),
      segment: new FormControl(null, Validators.required),
      certificate_type: new FormControl(null, Validators.required),
      first_name: new FormControl(null, Validators.required),
      categories: new FormControl(null, Validators.required),
      last_name: new FormControl(null, [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]),
      email: new FormControl(null, Validators.required),
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
      lead_created_by_name: new FormControl(null),
      mobile_number: new FormControl(null, [Validators.required, Validators.maxLength(10),
      Validators.pattern('^[0-9]*$'),
      Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$')]),
      dqs_contact_source: new FormControl(null, Validators.required),
      contact_owner: new FormControl(null, Validators.required),
      lead_created_date: new FormControl(null, Validators.required),
      standard_program_assement: new FormControl(null, Validators.required),
      remarks: new FormControl(null),
      lead_validate_stage: new FormControl(null, Validators.required),
      validated_by: new FormControl(null, Validators.required),
      lead_validated_date: new FormControl(null, Validators.required),
      lead_validate_remarks: new FormControl(null, Validators.required),
      lead_assgn_contact_owner: new FormControl(null, Validators.required),
      assigned_by: new FormControl(null, Validators.required),
      assigned_date: new FormControl(null, Validators.required),
      stage: new FormControl(null, Validators.required),
      lead_assgn_remark: new FormControl(null, Validators.required),
      industry_sector: new FormControl(null, Validators.required),
      customer_category: new FormControl(null, Validators.required),
      employee_count: new FormControl(null, Validators.required),
      company_remarks: new FormControl(null, Validators.required),
      customer_sales_executive: new FormControl(null, Validators.required),
      assigned_to: new FormControl(null, Validators.required),
      opportunity_type: new FormControl(null, Validators.required),
      opportunity_ref: new FormControl(null, Validators.required),
      product_request: new FormControl(null, Validators.required),
      no_of_mandays: new FormControl(null),
      ea_code: new FormControl(null, Validators.required),
      assessment_period: new FormControl(null, Validators.required),
      gst_applicable: new FormControl(null, Validators.required),
      gst_number: new FormControl(null, Validators.required),
      pan_number: new FormControl(null, Validators.required),
      tan_number: new FormControl(null, Validators.required),
      file: new FormControl(null, Validators.required),
      contact_review_form: new FormControl(null, Validators.required),
      gst_file: new FormControl(null, Validators.required),
      basic_form: new FormControl(null, Validators.required),
      company_logo: new FormControl(null, Validators.required),
      other_file: new FormControl(null),
      urd_number: new FormControl(null),
      accredition_logo_details: new FormControl(null, Validators.required),
      add_cert_copy: new FormControl(null, Validators.required),
      document_remark: new FormControl(null, Validators.required),
      opp_verifier_name_level1: new FormControl(null, Validators.required),
      opp_verified_date_level1: new FormControl(null, Validators.required),
      opp_verified_remarks_level1: new FormControl(null, Validators.required),
      opp_verifier_name_level2: new FormControl(null, Validators.required),
      opp_verified_date_level2: new FormControl(null, Validators.required),
      opp_verified_remarks_level2: new FormControl(null, Validators.required),
      quotation_currency: new FormControl(null, Validators.required),
      slab_quote: new FormControl(null, Validators.required),
      logo_cost: new FormControl(null, Validators.required),
      quote_prepared: new FormControl(null, Validators.required),
      quote_prepared_date: new FormControl(null, Validators.required),
      agreed_slab_a: new FormControl(null, Validators.required),
      agreed_slab_b: new FormControl(null, Validators.required),
      agreed_logo_cost: new FormControl(null, Validators.required),
      agreed_accredition: new FormControl(null, Validators.required),
      agreed_discount: new FormControl(null, Validators.required),
      reject_remarks_a: new FormControl(null),
      reject_remarks_b: new FormControl(null),
      expense_category: new FormControl(null, Validators.required),
      company_logo_req: new FormControl(null, Validators.required),
      company_logo_cost: new FormControl(null, Validators.required),
      fin_approval: new FormControl(null, Validators.required),
      sales_approval: new FormControl(null, Validators.required),
      audit_approval: new FormControl(null, Validators.required),
      scope_of_programe: new FormControl(null),
      payment_terms: new FormControl(null),
      advance_payment: new FormControl(null),
      asessment_invoice: new FormControl(null),
      travel_claim: new FormControl(null),
      tl_support: new FormControl(null),
      export_service_value: new FormControl(null),
      export_of_Service: new FormControl(null),
      form_a2_received: new FormControl(null),
      customer_audit_date: new FormControl(null),
      phone_code: new FormControl(),
      mobile_code: new FormControl()
    })
  }

  ngOnInit() {
    this.get_cp_contact();
    this.getAchievementList();
    this.getAllSegment();
    this.getCurrency();
    this.getCountry();
    this.getAchievementListt();
    this.regionalBusiness();
    this.globalManagerales();
    this.activeroute.queryParams.subscribe((params: any) => {
      this.id = params;
      this.lead_id = this.id.lead_id;
      this.leadUpdate = this.id.type;


      this.qoutationType = params.type


      this.leadService.getByIdLead(this.lead_id).subscribe((res: any) => {
        this.singleLeadData = res.data;
        this.checkMed()
        if(this.singleLeadData?.billing_site === true){
          this.parentSide = true;
          this.getStage1(this.singleLeadData?.br_number)
        }
        if (this.singleLeadData.status === "Quotation") {
          this.quotePrepared = true;
        } else if (this.singleLeadData.status === "Quotation Sent") {
          this.quoteSent = true;
        } else if (this.singleLeadData.status === "Sent S&M Approval") {
          this.approvalSent = true;
        } else if (this.singleLeadData.status === "Proforma Invoice Sent") {
          this.invoiceSent = true;
        }
        if (this.singleLeadData?.export === "Export Wise") {
          this.gstvalidation = false;
        }
        if (this.singleLeadData?.certificate_type_name === "Non-Cert") {
          this.nonCertTrue = false;

        } else {
          this.nonCertTrue = true;

        }

        if (this.singleLeadData?.segment_name == 'MSA') {

          this.msa_document = true;
          this.med_document = false;
        }
        if (this.singleLeadData?.segment_name == 'MED') {
          this.msa_document = false;
          this.med_document = true;

        }
        this.patchFormvalue();
        this.getCategory();
      })
    });
    this.mainId = localStorage.getItem("EmpMainId");

    if (this.mainId != undefined) {
      this._empRegistration.getByUserId(this.mainId).subscribe((res) => {
        this.mainEmployeeData = res.data;

        this.getAchievementList();
        this.patchFormvalue();
      })
    }
     this.leadService.getByIdLeadId(this.lead_id).subscribe((res: any) => {
      let x = res.data.map((a: any) => {
        return { ...a, checked: false };
      });
      this.singleLeadData1 = x;
      this.singleLeadData1.unshift(
        {br_number:this.singleLeadData?.br_number, associated_company: this.singleLeadData?.associated_company,city_name:this.singleLeadData.city_name,state_name:this.singleLeadData.state_name},
    
      )  
    });

    this.getAllProd();
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
  checkMed() {


    if (this.singleLeadData?.segment === 2) {
      this.checkMedTrue = true;
      this.msa_document = false;
          this.med_document = true;


    } else {
      this.checkMedTrue = false;
      this.msa_document = true;
      this.med_document = false;

    }
  }
  get_cp_contact(){
    this.leadService.get_contact().subscribe(
      (res:any)=>{
        this.contact_list = res.data;

      },(err)=>{

      }
    )
  };
  
  typeChangeChild(e: any, event: any) {
    if (event.checked == true) {
    this.childSide = true;
     this.singleLeadData1.forEach((res: any) => {
        if (res.br_number == event.br_number) {
        res.checked = e.checked;
        this.child_br_number = event?.br_number;
        } else {
        res.checked = false;
      }
    });
    this.getStage1(this.child_br_number);
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

  toPdf() {
    console.log("check");
    
    const dashboard = document.getElementById('dashboard');

    const dashboardHeight = dashboard!.clientHeight;
    const dashboardWidth = dashboard!.clientWidth;
    const options = { background: 'white', width: dashboardWidth, height: dashboardHeight };

    domtoimage.toPng(dashboard!, options).then((imgData) => {
      const doc = new jsPDF(dashboardWidth > dashboardHeight ? 'l' : 'p', 'mm', [dashboardWidth, dashboardHeight]);
      const imgProps = doc.getImageProperties(imgData);
      const pdfWidth = doc.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

      doc.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      doc.save('DQS-Quotation.pdf');
    });
  }

  getCategory() {
    this.configService.listCategory().subscribe((res: any) => {
      this.categoryList = res.data;

    })
  }

  print() {
    window.print();
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

  getAchievementList() {
    this.recruitService.getAllAchivement().subscribe(
      (res: any) => {

        this.allAchievement = res.data;
      },
      (err) => {

      }
    );
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


  candidateClick(e: any) {

    this.candidateId = e;
    this.recruitService.interViewGetIdBy(e).subscribe((res: any) => {
      this.interviewGetId = res.data;

      this.patchFormvalue();
    })
  }

  _1st_Check(e: any) {

    this.show1 = e.target.value
    if(this.show1 == 'true'){
      this.show1_value = true;
    }
    else
    {
      this.show1_value = false;
    }
  }
  _2nd_Check(e: any) {

    this.show2 = e.target.value
    if(this.show2 == 'true'){
      this.show2_value = true;
    }
    else
    {
      this.show2_value = false;
    }

  }
  _3rd_Check(e: any) {

    this.show3 = e.target.value
    if(this.show3 == 'true'){
      this.show3_value = true;
    }
    else
    {
      this.show3_value = false;
    }
  }
  _4th_Check(e: any) {

    this.show4 = e.target.value
    if(this.show4 == 'true'){
      this.show4_value = true;
    }
    else
    {
      this.show4_value = false;
    }

  }
  invoice_with_gst(e: any) {

    this.show5 = e.target.value
    if(this.show5 == 'true'){
      this.show5_value = true;

    }
    else
    {
      this.show5_value = false;

    }
  }
  export_service(e: any){

   this.invoice_gst = e.target.value;

  }
  _6th_Check(e: any) {

    this.show6 = e.target.value
    if(this.show6 == 'true'){
      this.show6_value = true;
    }
    else
    {
      this.show6_value = false;
    }

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

  getValue() {
    if (this.singleLeadData.gst_file != null) {
      this.enableBtns = true
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
    if (this.singleLeadData?.certificate_type != 'undefined || null') {
      this.leadService.getAssesmentByID(this.singleLeadData?.certificate_type).subscribe((res: any) => {

        this.assesmentList = res.data.new_spas;

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
      assessment_period: this.singleLeadData?.assessment_period,
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
      standard_program_assement: this.singleLeadData?.standard_program_assement,
      assigned_to: this.singleLeadData?.assigned_to,
      remarks: this.singleLeadData?.remarks,
      categories: this.singleLeadData?.categories,
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
      document_remark: this.singleLeadData?.document_remark,
      product_request: this.singleLeadData.product_request,
      customer_sales_executive: this.singleLeadData.customer_sales_executive,
      opportunity_type: this.singleLeadData.opportunity_type,
      opportunity_ref: this.singleLeadData.OpportunityRef_no,
      no_of_mandays: this.singleLeadData.no_of_mandays,
      ea_code: this.singleLeadData.ea_code,
      billing_site: this.singleLeadData.billing_site,
      opp_verifier_name_level1: this.singleLeadData?.opp_verifier_name_level1,
      opp_verified_date_level1: this.singleLeadData?.opp_verified_date_level1,
      opp_verified_remarks_level1: this.singleLeadData?.opp_verified_remarks_level1,
      opp_verifier_name_level2: this.singleLeadData?.opp_verifier_name_level2,
      opp_verified_date_level2: this.singleLeadData?.opp_verified_date_level2,
      opp_verified_remarks_level2: this.singleLeadData?.opp_verified_remarks_level2,
      quotation_currency: this.singleLeadData?.quotation_currency,
      expense_category: this.singleLeadData?.expense_category,
      company_logo_req: this.singleLeadData?.company_logo_req,
      company_logo_cost: this.singleLeadData?.company_logo_cost,
      accredition_logo_details: this.singleLeadData?.accredition_logo_details,
      add_cert_copy: this.singleLeadData?.add_cert_copy,
      agreed_slab_a: this.singleLeadData?.agreed_slab_a,
      urd_number: this.singleLeadData?.urd_number,
      slab_quote: "18000.00",
      logo_cost: this.singleLeadData?.logo_cost,
      quote_prepared: this.mainEmployeeData?.first_name,
      quote_prepared_date: this.myDate,
      scope_of_programe: this.singleLeadData?.scope_of_programe,
      payment_terms: this.singleLeadData?.payment_terms,
      advance_payment: this.singleLeadData?.advance_payment
    })
    if (this.singleLeadData?.company_logo_cost) {
      this.logoCost = true;
    }
  }

  showPriceTable() {
    this.showTable = !this.showTable;
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

  reject() {
    this.rejectRemarks = true;
  }
  accept() {
    this.rejectRemarks = false;
  }

  rejectA() {
    this.rejectRemarksA = true;
  }
  acceptA() {
    this.rejectRemarksA = false;
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

  logoReq() {
    this.logoRequired = true;
    this.logoCost = false;
  }

  logoReqNew() {
    this.logoRequired = false;
    this.logoCost = true;
  }

  finApprove() {
    this.finReq = true;
    this.bookRequest = false;
  }

  finApproveNew() {
    this.finReq = false;
    this.bookRequest = true;
  }

  saleApprove() {
    this.saleReq = true;
    this.bookRequest = false;
  }

  saleApproveNew() {
    this.saleReq = false;
    this.bookRequest = true;
  }

  auditApprove() {
    this.auditReq = true;
    this.bookRequest = false;
  }
  getCurrency() {
    this.configService.getQuotationcurrency().subscribe((res: any) => {
      this.currencyList = res.data;

    });
  }

  auditApproveNew() {
    this.auditReq = false;
    this.bookRequest = true;
  }


  viewDocBasic() {
    window.open(this.singleLeadData.basic_form, '_blank');
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
  globalManagerales() {
    this.leadService.getGlobalSalesM().subscribe((res: any) => {

      this.allDataMan = res.data;
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

  submitForm() {
    let val = this.leadForm.value;

  }


  sentPI() {
    let val = this.leadForm.value;
    const dataMain = {
      customer_type: val.customer_type,
      site_audit: val.site_audit || " ",
      associated_company: val.associated_company,
      segment: val.segment,
      certificate_type: val.certificate_type,
      first_name: val.first_name,
      last_name: val.last_name,
      email: val.email,
      lead_created_by_name: val.lead_created_by_name,
      emplyoment_type: val.emplyoment_type,
      expense_category: val.expense_category,
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
      assigned_to: val.assigned_to,
      reject_remarks_a: val.reject_remarks_a || " ",
      reject_remarks_b: val.reject_remarks_b || " ",
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
      industry_sector: val.industry_sector,
      employee_count: val.employee_count,
      company_remarks: val.company_remarks,
      gst_applicable: val.gst_applicable,
      gst_number: val.gst_number,
      pan_number: val.pan_number,
      tan_number: val.tan_number,
      categories: val.categories,
      product_request: val.product_request,
      customer_sales_executive: val.customer_sales_executive,
      opportunity_type: val.opportunity_type,
      opportunity_ref: val.opportunity_ref,
      billing_site: val.billing_site,
      no_of_mandays: val.no_of_mandays,
      ea_code: val.ea_code,
      assessment_period: val.assessment_period,
      accredition_logo_details: val.accredition_logo_details,
      add_cert_copy: val.add_cert_copy,
      opp_verifier_name_level1: val.opp_verifier_name_level1,
      opp_verified_date_level1: moment(val.opp_verified_date_level1).format('YYYY-MM-DD'),
      opp_verified_remarks_level1: val.opp_verified_remarks_level1,
      opp_verifier_name_level2: val.opp_verifier_name_level2,
      opp_verified_date_level2: moment(val.opp_verified_date_level2).format('YYYY-MM-DD'),
      opp_verified_remarks_level2: val.opp_verified_remarks_level2,
      quotation_currency: Number(val.quotation_currency),
      slab_quote: val.slab_quote,
      logo_cost: val.logo_cost,
      quote_prepared: val.quote_prepared,
      quote_prepared_date: moment(val.quote_prepared_date).format('YYYY-MM-DD'),
      company_logo_req: val.company_logo_req,
      company_logo_cost: val.company_logo_cost,
      agreed_slab_a: val.agreed_slab_a,
      agreed_slab_b: val.agreed_slab_b,
      agreed_logo_cost: val.agreed_logo_cost,
      agreed_accredition: val.agreed_accredition,
      agreed_discount: val.agreed_discount,
      fin_approval: val.fin_approval,
      sales_approval: val.sales_approval,
      audit_approval: val.audit_approval,
      payment_terms: val.payment_terms,
      advance_payment : val.advance_payment,
      digital_signed_invoice: val.digital_signed_invoice,
      travel_claim: val.travel_claim,
      tl_support: val.tl_support,
      export_service: this.invoice_gst,
      client_name_pmo: val.client_name_pmo,
      customer_audit_date: val.customer_audit_date,
    }
    this.leadService.editLead(this.lead_id, dataMain).subscribe((res: any) => {

      this.toast.success("Quotation Prepared Successfully..")
      this.route.navigate(['master/lead/quotation/perform-invoice'],
        { queryParams: { lead_id: this.lead_id } }
      );
    })
  }

  submitSMForm() {
    let val = this.leadForm.value;

    const dataMain = {
      customer_type: val.customer_type,
      site_audit: val.site_audit || " ",
      associated_company: val.associated_company,
      segment: val.segment,
      certificate_type: val.certificate_type,
      first_name: val.first_name,
      last_name: val.last_name,
      email: val.email,
      emplyoment_type: val.emplyoment_type,
      expense_category: val.expense_category,
      job_title: val.job_title,
      street_address: val.street_address,
      address2: val.address2,
      city: val.city,
      lead_created_by_name: val.lead_created_by_name,
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
      assigned_to: val.assigned_to,
      reject_remarks_a: val.reject_remarks_a || " ",
      reject_remarks_b: val.reject_remarks_b || " ",
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
      industry_sector: val.industry_sector,
      employee_count: val.employee_count,
      company_remarks: val.company_remarks,
      gst_applicable: val.gst_applicable,
      gst_number: val.gst_number,
      pan_number: val.pan_number,
      tan_number: val.tan_number,
      categories: val.categories,
      product_request: val.product_request,
      customer_sales_executive: val.customer_sales_executive,
      opportunity_type: val.opportunity_type,
      opportunity_ref: val.opportunity_ref,
      billing_site: val.billing_site,
      no_of_mandays: val.no_of_mandays,
      ea_code: val.ea_code,
      assessment_period: val.assessment_period,
      accredition_logo_details: val.accredition_logo_details,
      add_cert_copy: val.add_cert_copy,
      opp_verifier_name_level1: val.opp_verifier_name_level1,
      opp_verified_date_level1: moment(val.opp_verified_date_level1).format('YYYY-MM-DD'),
      opp_verified_remarks_level1: val.opp_verified_remarks_level1,
      opp_verifier_name_level2: val.opp_verifier_name_level2,
      opp_verified_date_level2: moment(val.opp_verified_date_level2).format('YYYY-MM-DD'),
      opp_verified_remarks_level2: val.opp_verified_remarks_level2,
      quotation_currency: Number(val.quotation_currency),
      slab_quote: val.slab_quote,
      logo_cost: val.logo_cost,
      quote_prepared: val.quote_prepared,
      quote_prepared_date: moment(val.quote_prepared_date).format('YYYY-MM-DD'),
      company_logo_req: val.company_logo_req,
      company_logo_cost: val.company_logo_cost,
      agreed_slab_a: val.agreed_slab_a,
      agreed_slab_b: val.agreed_slab_b,
      agreed_logo_cost: val.agreed_logo_cost,
      agreed_accredition: val.agreed_accredition,
      agreed_discount: val.agreed_discount,
      fin_approval: val.fin_approval,
      sales_approval: val.sales_approval,
      audit_approval: val.audit_approval,
      scope_of_programe: val.scope_of_programe,
      payment_terms: val.payment_terms,
      asessment_invoice: val.asessment_invoice,
      digital_signed_invoice: val.digital_signed_invoice,
      travel_claim: val.travel_claim,
      client_name_pmo: val.client_name_pmo,
      customer_audit_date: val.customer_audit_date,
      status: "Sent S&M Approval"
    }
    const data = {
      gst_file: this.fileDetailsOne.file,
      basic_form: this.fileDetailsTwo.file,
      other_file: this.fileDetailsFour.file,
      document_remark: val.document_remark,
    }

    if (data.gst_file) {
      this.leadService.editLeadDoc(this.lead_id, data).subscribe((res: any) => {

      });
    }

    this.leadService.editLead(this.lead_id, dataMain).subscribe((res: any) => {

      this.toast.success("Quotation Prepared Successfully..")
      this.route.navigate(['master/lead/lead-opportunity/approved'],
        { queryParams: { lead_id: this.lead_id } }
      );
    })
  }

  submitQAForm() {
    let val = this.leadForm.value;


    const dataMain = {
      customer_type: val.customer_type,
      site_audit: val.site_audit || " ",
      associated_company: val.associated_company,
      segment: val.segment,
      certificate_type: val.certificate_type,
      first_name: val.first_name,
      last_name: val.last_name,
      email: val.email,
      lead_created_by_name: val.lead_created_by_name,
      emplyoment_type: val.emplyoment_type,
      expense_category: val.expense_category,
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
      assigned_to: val.assigned_to,
      reject_remarks_a: val.reject_remarks_a || " ",
      reject_remarks_b: val.reject_remarks_b || " ",
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
      industry_sector: val.industry_sector,
      employee_count: val.employee_count,
      company_remarks: val.company_remarks,
      gst_applicable: val.gst_applicable,
      gst_number: val.gst_number,
      pan_number: val.pan_number,
      tan_number: val.tan_number,
      categories: val.categories,
      product_request: val.product_request,
      customer_sales_executive: val.customer_sales_executive,
      opportunity_type: val.opportunity_type,
      opportunity_ref: val.opportunity_ref,
      billing_site: val.billing_site,
      no_of_mandays: val.no_of_mandays,
      ea_code: val.ea_code,
      assessment_period: val.assessment_period,
      accredition_logo_details: val.accredition_logo_details,
      add_cert_copy: val.add_cert_copy,
      opp_verifier_name_level1: val.opp_verifier_name_level1,
      opp_verified_date_level1: moment(val.opp_verified_date_level1).format('YYYY-MM-DD'),
      opp_verified_remarks_level1: val.opp_verified_remarks_level1,
      opp_verifier_name_level2: val.opp_verifier_name_level2,
      opp_verified_date_level2: moment(val.opp_verified_date_level2).format('YYYY-MM-DD'),
      opp_verified_remarks_level2: val.opp_verified_remarks_level2,
      quotation_currency: Number(val.quotation_currency),
      slab_quote: val.slab_quote,
      logo_cost: val.logo_cost,
      quote_prepared: val.quote_prepared,
      quote_prepared_date: moment(val.quote_prepared_date).format('YYYY-MM-DD'),
      company_logo_req: val.company_logo_req,
      company_logo_cost: val.company_logo_cost,
      agreed_slab_a: val.agreed_slab_a,
      agreed_slab_b: val.agreed_slab_b,
      agreed_logo_cost: val.agreed_logo_cost,
      agreed_accredition: val.agreed_accredition,
      agreed_discount: val.agreed_discount,
      fin_approval: val.fin_approval,
      sales_approval: val.sales_approval,
      audit_approval: val.audit_approval,
      scope_of_programe: val.scope_of_programe,
      payment_terms: val.payment_terms,
      advance_payment : val.advance_payment,
      asessment_invoice: val.asessment_invoice,
      digital_signed_invoice: val.digital_signed_invoice,
      travel_claim: val.travel_claim,
      tl_support: val.tl_support,
      export_service: this.invoice_gst,
      client_name_pmo: val.client_name_pmo,
      status: "Quote Accepted"
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

      this.toast.success("Quotation Prepared Successfully..")
      this.route.navigate(['master/lead/lead-opportunity/approved'],
        { queryParams: { lead_id: this.lead_id } }
      );
    })
  }
  rejectBtn() {
    const data = {
      status: "Rejected"
    }
    Swal.fire({
      title: 'Are you sure?',
      text: "You want to reject this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#04883e',
      confirmButtonText: 'Yes, Reject it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.leadService.editLead(this.lead_id, data).subscribe((res: any) => {
          //
          this.toaster.success(res.message);
          this.route.navigate(['master/lead/quotation/perform-invoice'],
            { queryParams: { lead_id: this.lead_id } }
          );

        },
          (err) => {

            this.toaster.error('Somthing wrong please try again..!', 'Error Message ');
          }
        )

      }
    })
  }



  approveBtn() {
    const data = {
      status: "S&M Approved"
    }
    this.leadService.editLead(this.lead_id, data).subscribe((res: any) => {

      this.toast.success(res.message);
      this.route.navigate(['master/lead/quotation/perform-invoice'],
        { queryParams: { lead_id: this.lead_id } }
      );
    })
  }

  bookBtn() {
    // if (this.leadForm.invalid) {
    //   this.toast.error(
    //     'Required fields should not be empty.',
    //     'Error Occurred!'
    //   );
    //   return;
    // }
    let val = this.leadForm.value;


    const dataMain = {
      customer_type: val.customer_type,
      site_audit: val.site_audit || " ",
      associated_company: val.associated_company,
      segment: val.segment,
      certificate_type: val.certificate_type,
      first_name: val.first_name,
      last_name: val.last_name,
      email: val.email,
      emplyoment_type: val.emplyoment_type,
      expense_category: val.expense_category,
      job_title: val.job_title,
      street_address: val.street_address,
      address2: val.address2,
      city: val.city,
      state: val.state,
      country: val.country,
      lead_created_by_name: val.lead_created_by_name,
      postal_code: val.postal_code,
      region: val.region,
      regional_bussiness_lead: val.regional_bussiness_lead,
      global_managing_director: val.global_managing_director,
      global_manager_sales: val.global_manager_sales,
      website_url: val.website_url,
      phone_number: val.phone_number,
      mobile_number: val.mobile_number,
      assigned_to: val.assigned_to,
      reject_remarks_a: val.reject_remarks_a || " ",
      reject_remarks_b: val.reject_remarks_b || " ",
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
      industry_sector: val.industry_sector,
      employee_count: val.employee_count,
      company_remarks: val.company_remarks,
      gst_applicable: val.gst_applicable,
      gst_number: val.gst_number,
      pan_number: val.pan_number,
      tan_number: val.tan_number,
      categories: val.categories,
      product_request: val.product_request,
      customer_sales_executive: val.customer_sales_executive,
      opportunity_type: val.opportunity_type,
      opportunity_ref: val.opportunity_ref,
      billing_site: val.billing_site,
      no_of_mandays: val.no_of_mandays,
      ea_code: val.ea_code,
      assessment_period: val.assessment_period,
      accredition_logo_details: val.accredition_logo_details,
      add_cert_copy: val.add_cert_copy,
      opp_verifier_name_level1: val.opp_verifier_name_level1,
      opp_verified_date_level1: moment(val.opp_verified_date_level1).format('YYYY-MM-DD'),
      opp_verified_remarks_level1: val.opp_verified_remarks_level1,
      // asessment_invoice: val.assesment_invoice,
      opp_verifier_name_level2: val.opp_verifier_name_level2,
      opp_verified_date_level2: moment(val.opp_verified_date_level2).format('YYYY-MM-DD'),
      opp_verified_remarks_level2: val.opp_verified_remarks_level2,
      quotation_currency: Number(val.quotation_currency),
      slab_quote: val.slab_quote,
      logo_cost: val.logo_cost,
      quote_prepared: val.quote_prepared,
      quote_prepared_date: moment(val.quote_prepared_date).format('YYYY-MM-DD'),
      company_logo_req: val.company_logo_req,
      company_logo_cost: val.company_logo_cost,
      agreed_slab_a: val.agreed_slab_a,
      agreed_slab_b: val.agreed_slab_b,
      agreed_logo_cost: val.agreed_logo_cost,
      agreed_accredition: val.agreed_accredition,
      agreed_discount: val.agreed_discount,
      fin_approval: val.fin_approval,
      sales_approval: val.sales_approval,
      audit_approval: val.audit_approval,
      scope_of_programe: val.scope_of_programe,
      payment_terms: val.payment_terms,
      advance_payment : val.advance_payment,
      asessment_invoice: val.asessment_invoice,
      travel_claim: val.travel_claim,
      tl_support: val.tl_support,
      export_service: this.invoice_gst,
      customer_audit_date: val.customer_audit_date,
      status: "Digitally Signed Document"
    }
    //

    const data_quote = {
      asessment_invoice: val.asessment_invoice,
      asessment_invoice_isChecked: this.show1_value,
      digital_signed_invoice: val.digital_signed_invoice,
      digital_signed_invoice_isChecked: this.show2_value,
      travel_claim: val.travel_claim,
      travel_claim_isChecked: this.show3_value,
      tl_support: val.tl_support,
      tl_support_isChecked:this.show4_value,
      export_service: this.invoice_gst,
      export_service_isChecked:this.show5_value,
      client_name_pmo: val.client_name_pmo,
      client_name_pmo_isChecked: this.show6_value,
      customer_audit_date: val.customer_audit_date

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
    if (this.singleLeadData?.segment_name == 'MED') {
      this.leadService.createQuote(data_quote).subscribe((res: any)=>{

       })
    }

    this.leadService.editLead(this.lead_id, dataMain).subscribe((res: any) => {

      // this.multiWorkOrder();
      this.toast.success("Quotation Prepared Successfully..")
      this.route.navigate(['master/lead/quotation/signed-document'],
        { queryParams: { lead_id: this.lead_id } }
      );
    })
  }


  multiWorkOrder() {
    let val = this.leadForm.value;

    const data = {
      lead_genration_id: this.singleLeadData?.lead_genration_id,
      br_number: this.singleLeadData?.br_number,
      customer_type: this.singleLeadData?.customer_type,
      site_audit: this.singleLeadData?.site_audit || " ",
      associated_company: this.singleLeadData?.associated_company,
      segment: this.singleLeadData?.segment,
      certificate_type: this.singleLeadData?.certificate_type,
      first_name: this.singleLeadData?.first_name,
      last_name: this.singleLeadData?.last_name,
      email: this.singleLeadData?.email,
      emplyoment_type: this.singleLeadData?.emplyoment_type,
      expense_category: this.singleLeadData?.expense_category,
      job_title: this.singleLeadData?.job_title,
      street_address: this.singleLeadData?.street_address,
      address2: this.singleLeadData?.address2,
      city: this.singleLeadData?.city,
      state: this.singleLeadData?.state,
      country: this.singleLeadData?.country,
      lead_created_by_name: this.singleLeadData?.lead_created_by_name,
      postal_code: this.singleLeadData?.postal_code,
      region: this.singleLeadData?.region,
      regional_bussiness_lead: this.singleLeadData?.regional_bussiness_lead,
      global_managing_director: this.singleLeadData?.global_managing_director,
      global_manager_sales: this.singleLeadData?.global_manager_sales,
      website_url: this.singleLeadData?.website_url,
      phone_number: this.singleLeadData?.phone_number,
      mobile_number: this.singleLeadData?.mobile_number,
      assigned_to: this.singleLeadData?.assigned_to,
      reject_remarks_a: this.singleLeadData?.reject_remarks_a || " ",
      reject_remarks_b: this.singleLeadData?.reject_remarks_b || " ",
      dqs_contact_source: this.singleLeadData?.dqs_contact_source,
      contact_owner: this.singleLeadData?.contact_owner,
      lead_created_date: this.singleLeadData?.lead_created_date,
      standard_program_assement: this.singleLeadData?.standard_program_assement,
      remarks: this.singleLeadData?.remarks,
      lead_validate_stage: this.singleLeadData?.lead_validate_stage,
      validated_by: this.singleLeadData?.validated_by,
      lead_validated_date: this.singleLeadData?.lead_validated_date,
      lead_validate_remarks: this.singleLeadData?.lead_validate_remarks,
      lead_assgn_contact_owner: this.singleLeadData?.lead_assgn_contact_owner,
      assigned_by: this.singleLeadData?.assigned_by,
      stage: this.singleLeadData?.stage,
      lead_assgn_remark: this.singleLeadData?.lead_assgn_remark,
      industry_sector: this.singleLeadData?.industry_sector,
      employee_count: this.singleLeadData?.employee_count,
      company_remarks: this.singleLeadData?.company_remarks,
      gst_applicable: this.singleLeadData?.gst_applicable,
      gst_number: this.singleLeadData?.gst_number,
      pan_number: this.singleLeadData?.pan_number,
      tan_number: this.singleLeadData?.tan_number,
      categories: this.singleLeadData?.categories,
      product_request: this.singleLeadData?.product_request,
      customer_sales_executive: this.singleLeadData?.customer_sales_executive,
      opportunity_type: this.singleLeadData?.opportunity_type,
      opportunity_ref: this.singleLeadData?.opportunity_ref,
      billing_site: this.singleLeadData?.billing_site,
      no_of_mandays: this.singleLeadData?.no_of_mandays,
      ea_code: this.singleLeadData?.ea_code,
      assessment_period: this.singleLeadData?.assessment_period,
      accredition_logo_details: this.singleLeadData?.accredition_logo_details,
      add_cert_copy: this.singleLeadData?.add_cert_copy,
      opp_verifier_name_level1: this.singleLeadData?.opp_verifier_name_level1,
      opp_verified_date_level1: this.singleLeadData?.opp_verified_date_level1,
      opp_verified_remarks_level1: this.singleLeadData?.opp_verified_remarks_level1,
      opp_verifier_name_level2: this.singleLeadData?.opp_verifier_name_level2,
      opp_verified_date_level2: this.singleLeadData?.opp_verified_date_level2,
      opp_verified_remarks_level2: this.singleLeadData?.opp_verified_remarks_level2,
      quotation_currency: this.singleLeadData?.quotation_currency,
      slab_quote: this.singleLeadData?.slab_quote,
      logo_cost: this.singleLeadData?.logo_cost,
      quote_prepared: this.singleLeadData?.quote_prepared,
      quote_prepared_date: this.singleLeadData?.quote_prepared_date,
      company_logo_req: this.singleLeadData?.company_logo_req,
      company_logo_cost: this.singleLeadData?.company_logo_cost,
      agreed_slab_a: this.singleLeadData?.agreed_slab_a,
      agreed_slab_b: this.singleLeadData?.agreed_slab_b,
      agreed_logo_cost: this.singleLeadData?.agreed_logo_cost,
      agreed_accredition: this.singleLeadData?.agreed_accredition,
      agreed_discount: this.singleLeadData?.agreed_discount,
      fin_approval: this.singleLeadData?.fin_approval,
      sales_approval: this.singleLeadData?.sales_approval,
      audit_approval: this.singleLeadData?.audit_approval,
      scope_of_programe: val.scope_of_programe,
      payment_terms: val.payment_terms,
      advance_payment : val.advance_payment,
      status: "Work Order Created"
    }
    this.leadService.multipleWorkOrderCreate(data).subscribe((res: any) => {

    })
  }
  updatebookBtn() {
    // this.submitted = false;
    // if (this.leadForm.invalid) {

    //   this.toast.error('Required fields should not be empty.', 'Error Occurred!');
    //   return;
    // }
    const data = this.leadForm.value;

    this.leadService.editLead(this.lead_id, data).subscribe((res: any) => {


      this.toast.success("Updated Assignment Successfully..")
      this.route.navigate(['master/lead/quotation/perform-invoice']);
    })

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
