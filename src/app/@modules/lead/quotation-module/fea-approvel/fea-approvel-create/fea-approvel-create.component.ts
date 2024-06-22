
import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { calendarFormat } from 'moment';
import { ToastrService } from 'ngx-toastr';
import { jsPDF } from 'jspdf';
import domtoimage from 'dom-to-image';
import { EmpRegistrationService } from 'src/app/@shared/services/emp-registration.service';
import { LeadService } from 'src/app/@shared/services/lead.service';
import { RecruitService } from 'src/app/@shared/services/recruitment.service';
import { ConfigurationalmasterService } from 'src/app/@shared/services/configurationalmaster.service';

declare var require: any;
const FileSaver = require('file-saver');
                     
export interface PeriodicElement {
  br_number: string;
  account_name: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {account_name: "S1", br_number: "1"},
  {account_name: "S2", br_number: "1"},
  {account_name: "CA1", br_number: "2"}
];


@Component({
  selector: 'app-fea-approvel-create',
  templateUrl: './fea-approvel-create.component.html',
  styleUrls: ['./fea-approvel-create.component.scss']
})
export class FeaApprovelCreateComponent {

    // displayedColumns: string[] = ['stage', 'noOfMandays'];
    br2: any;
    parentSide: boolean;
    br1: any;
  
    displayedColumns: string[] = ['account_name', 'br_number'];
    dataSource = ELEMENT_DATA;
    leadForm: FormGroup;
    jobType: any;
    candidateArray: any;
    interviewGetId:any;
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
    cityList:any;
    pinCodeList: any;
    pinCodeTrue: boolean = true;
    allDataOne: any;
    allDataTwo: any;
    allDataMan: any;
    unreg: boolean = false;
    gstreg: boolean = false;
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
    dataMain: { expense_category: any; customer_type: any; assigned_to: any; categories: any; site_audit: any; associated_company: any; segment: any; certificate_type: any; first_name: any; last_name: any; email: any; emplyoment_type: any; job_title: any; street_address: any; address2: any; city: any; state: any; country: any; postal_code: any; region: any; regional_bussiness_lead: any; global_managing_director: any; global_manager_sales: any; website_url: any; phone_number: any; mobile_number: any; dqs_contact_source: any; contact_owner: any; lead_created_date: string; standard_program_assement: any; remarks: any; 
      add_cert_copy: any; accredition_logo_details: any; lead_validate_stage: any; validated_by: any; lead_validated_date: string; lead_validate_remarks: any; lead_assgn_contact_owner: any; assigned_by: any; stage: any; lead_assgn_remark: any; industry_sector: any; employee_count: any; company_remarks: any; gst_applicable: any; gst_number: any; pan_number: any; tan_number: any; product_request: any; customer_sales_executive: any; opportunity_type: any; opportunity_ref: any; billing_site: any; no_of_mandays: any; ea_code: any; assessment_period: any; opp_verifier_name_level1: any; opp_verified_date_level1: string;
      opp_verified_remarks_level1: any; reject_remarks_a: any; reject_remarks_b: any; opp_verifier_name_level2: any; opp_verified_date_level2: string; opp_verified_remarks_level2: any; quotation_currency: number; slab_quote: any; logo_cost: any; quote_prepared: any; quote_prepared_date: string; status: string; company_logo_req:any; company_logo_cost:any; 
      agreed_slab_a: any;
      agreed_slab_b: any;
      agreed_logo_cost: any;
      agreed_accredition: any;
      agreed_discount: any;
      lead_created_by_name: any;
      fin_approval: any;
      sales_approval: any;
      audit_approval: any;
      outstanding_amount: any,
      tds_outstanding_amount: any,
      advance_payment_remarks: any,
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
  
    qoutationType:any;
    approvalSent: boolean = false;
    invoiceSent: boolean = false;
    finReq: boolean = false;
    saleReq: boolean = false;
    auditReq: boolean = false;
    logoCost: boolean = false;
    showTable: boolean = false;
    stageData: any[] = [];
    nonCertt: boolean = false;
    currencyList: any;
    now = new Date();
    year = this.now.getFullYear();
    month = this.now.getMonth();
    
    // day = this.now.getDay();
    date = this.now.getDate();
    maxDate = moment({ year: this.year + 100, month: this.month, date: this.date }).format('YYYY-MM-DD');
    minDate = moment({ year: this.year - 0, month: this.month, date: this.date }).format('YYYY-MM-DD');
    leadUpdate: any;
    submitted: boolean;
    segmentList: any;
    certificateList: any;
    regionSList: any;
    CategorySList: any;
    regionalbheadList: any;
    globalMsalesList: any;
    assesmentList: any;
    gstvalidation: boolean;
    nonCertTrue: boolean;
    constructor(
      private fb: FormBuilder, 
      private leadService: LeadService,
       private route: Router, 
       private configService: ConfigurationalmasterService,
       private recruitService: RecruitService, 
       private activeroute: ActivatedRoute,
       private toast: ToastrService,
       private _empRegistration: EmpRegistrationService
       ) {
      this.leadForm = this.fb.group({
        customer_type: new FormControl(null),
        site_audit: new FormControl(null),
        billing_site: new FormControl(null),
        associated_company: new FormControl(null,Validators.required),
        segment: new FormControl(null,Validators.required),
        certificate_type: new FormControl(null,Validators.required),
        first_name: new FormControl(null,Validators.required),
        categories: new FormControl(null,Validators.required),
        last_name: new FormControl(null,Validators.required),
        email: new FormControl(null,[Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]),
        non_cert_type: new  FormControl(null),
        emplyoment_type: new FormControl(null,Validators.required),
        job_title: new FormControl(null,Validators.required),
        street_address: new FormControl(null,Validators.required),
        address2: new FormControl(null,Validators.required),
        city: new FormControl(null,Validators.required),
        state: new FormControl(null,Validators.required),
        country: new FormControl(null,Validators.required),
        postal_code: new FormControl(null,Validators.required),
        region: new FormControl(null,Validators.required),
        regional_bussiness_lead: new FormControl(null,Validators.required),
        global_managing_director: new FormControl(null,Validators.required),
        global_manager_sales: new FormControl(null,Validators.required),
        website_url: new FormControl(null),
        lead_created_by_name: new FormControl(null),
        phone_number: new FormControl(null),
        urd_number: new FormControl(null),
        mobile_number: new FormControl(null,[ Validators.required,   Validators.maxLength(10),
          Validators.pattern('^[0-9]*$'),
          Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$')]),
        dqs_contact_source: new FormControl(null,Validators.required),
        contact_owner: new FormControl(null,Validators.required),
        lead_created_date: new FormControl(null,Validators.required),
        standard_program_assement: new FormControl(null,Validators.required),
        remarks: new FormControl(null),
        lead_validate_stage: new FormControl(null,Validators.required),
        validated_by: new FormControl(null,Validators.required),
        lead_validated_date: new FormControl(null,Validators.required),
        lead_validate_remarks: new FormControl(null,Validators.required),
        lead_assgn_contact_owner: new FormControl(null,Validators.required),
        assigned_by: new FormControl(null,Validators.required),
        assigned_date: new FormControl(null,Validators.required),
        stage: new FormControl(null,Validators.required),
        lead_assgn_remark: new FormControl(null,Validators.required),
        industry_sector: new FormControl(null,Validators.required),
        customer_category: new FormControl(null,Validators.required),
        employee_count: new FormControl(null,Validators.required),
        company_remarks: new FormControl(null,Validators.required),
        customer_sales_executive: new FormControl(null,Validators.required),
        assigned_to: new FormControl(null,Validators.required),
        opportunity_type: new FormControl(null,Validators.required),
        opportunity_ref: new FormControl(null,Validators.required),
        product_request: new FormControl(null,Validators.required),
        no_of_mandays: new FormControl(null),
        ea_code: new FormControl(null,Validators.required),
        assessment_period: new FormControl(null,Validators.required),
        gst_applicable: new FormControl(null,Validators.required),
        gst_number: new FormControl(null,Validators.required),
        pan_number: new FormControl(null,Validators.required),
        tan_number: new FormControl(null,Validators.required),
        file: new FormControl(null,Validators.required),
        contact_review_form: new FormControl(null,Validators.required),
        gst_file: new FormControl(null,Validators.required),
        basic_form: new FormControl(null,Validators.required),
        company_logo: new FormControl(null,Validators.required),
        other_file: new FormControl(null),
        accredition_logo_details: new FormControl(null,Validators.required),
        add_cert_copy: new FormControl(null,Validators.required),
        document_remark: new FormControl(null,Validators.required),
        opp_verifier_name_level1: new FormControl(null,Validators.required),
        opp_verified_date_level1: new FormControl(null,Validators.required),
        opp_verified_remarks_level1: new FormControl(null,Validators.required),
        opp_verifier_name_level2: new FormControl(null,Validators.required),
        opp_verified_date_level2: new FormControl(null,Validators.required),
        opp_verified_remarks_level2: new FormControl(null,Validators.required),
        quotation_currency: new FormControl(null,Validators.required),
        slab_quote: new FormControl(null,Validators.required),
        logo_cost: new FormControl(null,Validators.required),
        quote_prepared: new FormControl(null,Validators.required),
        quote_prepared_date: new FormControl(null,Validators.required),
        agreed_slab_a: new FormControl(null,Validators.required),
        agreed_slab_b: new FormControl(null,Validators.required),
        agreed_logo_cost: new FormControl(null,Validators.required),
        agreed_accredition: new FormControl(null,Validators.required),
        agreed_discount: new FormControl(null,Validators.required),
        reject_remarks_a: new FormControl(null),
        reject_remarks_b: new FormControl(null),
        expense_category: new FormControl(null,Validators.required),
        company_logo_req: new FormControl(null,Validators.required),
        company_logo_cost: new FormControl(null,Validators.required),
        fin_approval: new FormControl(null,Validators.required),
        sales_approval: new FormControl(null,Validators.required),
        audit_approval: new FormControl(null,Validators.required),
        outstanding_amount: new FormControl(null),
        tds_outstanding_amount: new FormControl(null),
        advance_payment_remarks: new FormControl(null),
      })
    }
  
    ngOnInit() {
      this.getAchievementList();
      
      this.getCurrency();
      this.getAllSegment();
      this.getCountry();
      this.getAchievementListt();
      this.regionalBusiness();
      this.globalManagerales();
      this.activeroute.queryParams.subscribe((params:any) => {
        this.id = params;
        this.lead_id = this.id.lead_id;
        this.leadUpdate = this.id.type;
        this.qoutationType = params.type
        
        
        this.leadService.getByIdLead(this.lead_id).subscribe((res:any) => {
          this.singleLeadData = res.data;
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
          } else if (this.singleLeadData.status === "Perform Invoice Sent") {
            this.invoiceSent = true;
          }
          if(this.singleLeadData?.export === "Export Wise"){
            this.gstvalidation = false;
          }
          if (this.singleLeadData?.certificate_type_name === "Non-Cert") {
            this.nonCertTrue = false;
            
          } else {
            this.nonCertTrue = true;
            
          }
          this.nonCertFunc();
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
        this.getStage(this.br1);
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
    showPriceTable() {
      this.showTable = !this.showTable;
    }
    nonCertFunc() {
      if(this.singleLeadData?.certificate_type == "Non Cert") {
        this.nonCertt = true
      }
    }
    printDiv(divName: string) {
      let printContents = document.getElementById('printableArea')?.innerHTML;
      document.body.innerHTML = printContents ? printContents : "";
      window.print();
      window.location.reload();
    }
  
  //   toPdf() {
  //     const dashboard = document.getElementById('dashboard');
  
  //     const dashboardHeight = dashboard!.clientHeight;
  //     const dashboardWidth = dashboard!.clientWidth;
  //     const options = { background: 'white', width: dashboardWidth, height: dashboardHeight };
  
  //     domtoimage.toPng(dashboard!, options).then((imgData) => {
  //          const doc = new jsPDF(dashboardWidth > dashboardHeight ? 'l' : 'p', 'mm', [dashboardWidth, dashboardHeight]);
  //          const imgProps = doc.getImageProperties(imgData);
  //          const pdfWidth = doc.internal.pageSize.getWidth();
  //          const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
  
  //          doc.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
  //          window.open(URL.createObjectURL(doc.output("blob")));
  //     });
  // }
  
  getCurrency() {
    this.configService.getQuotationcurrency().subscribe((res: any) => {
      this.currencyList = res.data;
      
    });
  }
  getAllSegment() {
    this.configService.getAllSegment().subscribe((res: any) => {
      this.segmentList = res.data;
      
    });
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
  
    
    candidateClick(e:any){
      
      this.candidateId = e;
      this.recruitService.interViewGetIdBy(e).subscribe((res:any)=>{
        this.interviewGetId=res.data;
        
        this.patchFormvalue();
      })
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
      let  br3 = []
      this.br2 = e.br_number;
      let br4 = br3.push(this.br2);
      
      
      
      
      
      this.getStage1(this.br2);
        if (e.lead_genration_id === this.singleLeadData.lead_genration_id) {
          this.parentSide = event.target.checked;
          
        }
      }
  
    patchFormvalue() { 
      this.checkUnreg();
      if(this.singleLeadData?.segment != 'null || undefined'){
        this.leadService.getCertificateByID(this.singleLeadData?.segment).subscribe((res:any) => {
          this.certificateList = res.data.new_certificate_types;
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
     
  
      if (this.singleLeadData?.country != 'undefined || null') {
        this.leadService.getStateByID(this.singleLeadData?.country).subscribe((res:any) => {
          
          this.stateList = res.data;
        });
      }
      if (this.singleLeadData?.state != 'undefined || null') {
        this.leadService.getCityByID(this.singleLeadData?.state).subscribe((res:any) => {
          
          this.cityList = res.data;
        });
      }
      if (this.singleLeadData?.city != 'undefined || null') {
        this.leadService.getPinCodeNew(this.singleLeadData?.city).subscribe((res:any) => {
          this.pinCodeList = res.data;
          
          
        });
      }
      if (this.singleLeadData?.certificate_type != 'undefined || null') {
        this.leadService.getAssesmentByID(this.singleLeadData?.certificate_type).subscribe((res:any) => {
       
       this.assesmentList = res.data[0].newitemlist;;
       
      });
      }
      this.leadForm.patchValue({
        customer_type:this.singleLeadData?.customer_type,
        site_audit: this.singleLeadData?.multiple_site_audit,
        associated_company: this.singleLeadData?.associated_company,
        segment:this.singleLeadData?.segment,
        br_number: this.singleLeadData?.br_number,
        assignedManager:this.singleLeadData?.assigned_hiring_manager,
        certificate_type:this.singleLeadData?.certificate_type,
        first_name:this.singleLeadData?.first_name,
        last_name:this.singleLeadData?.last_name,
        email: this.singleLeadData?.email,
        non_cert_type: this.singleLeadData?.non_cert_type,
        emplyoment_type: this.singleLeadData?.emplyoment_type,
        street_address: this.singleLeadData?.street_address,
        job_title: this.singleLeadData?.job_title,
        address2: this.singleLeadData?.address2,
        city:  this.singleLeadData?.city,
        state:  this.singleLeadData?.state,
        country:  this.singleLeadData?.country,
        postal_code:this.singleLeadData?.postal_code,
        region: this.singleLeadData?.region,
        accredition_logo_details: this.singleLeadData?.accredition_logo_details,
        add_cert_copy: this.singleLeadData?.add_cert_copy,
        regional_bussiness_lead:this.singleLeadData?.regional_bussiness_lead,
        global_managing_director:this.singleLeadData?.global_managing_director,
        global_manager_sales:this.singleLeadData?.global_manager_sales,
        website_url:this.singleLeadData?.website_url,
        phone_number:this.singleLeadData?.phone_number,
        mobile_number: this.singleLeadData?.mobile_number,
        lead_created_by_name: this.singleLeadData?.lead_created_by_name,
        dqs_contact_source: this.singleLeadData?.dqs_contact_source,
        contact_owner: this.singleLeadData?.contact_owner,
        lead_created_date: this.singleLeadData?.lead_created_date,
        standard_program_assement:  this.singleLeadData?.standard_program_assement,
        assigned_to: this.singleLeadData?.assigned_to,
        remarks:  this.singleLeadData?.remarks,
        categories:  this.singleLeadData?.categories,
        lead_validated_date: this.singleLeadData?.lead_validated_date,
        validated_by: this.singleLeadData?.validated_by,
        lead_validate_remarks: this.singleLeadData?.lead_validate_remarks,
        industry_sector:  this.singleLeadData?.industry_sector,
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
        assessment_period: this.singleLeadData?.assessment_period,
        ea_code: this.singleLeadData.ea_code,
        urd_number: this.singleLeadData?.urd_number,
        billing_site: this.singleLeadData.billing_site,
        opp_verifier_name_level1:  this.singleLeadData?.opp_verifier_name_level1,
        opp_verified_date_level1:  this.singleLeadData?.opp_verified_date_level1,
        opp_verified_remarks_level1:  this.singleLeadData?.opp_verified_remarks_level1,
        opp_verifier_name_level2:  this.singleLeadData?.opp_verifier_name_level2,
        opp_verified_date_level2:  this.singleLeadData?.opp_verified_date_level2,
        opp_verified_remarks_level2:  this.singleLeadData?.opp_verified_remarks_level2,
        quotation_currency: this.singleLeadData?.quotation_currency,
        expense_category: this.singleLeadData?.expense_category,
        company_logo_req: this.singleLeadData?.company_logo_req,
        company_logo_cost: this.singleLeadData?.company_logo_cost,
        slab_quote: "18000.00",
        logo_cost: this.singleLeadData?.logo_cost,
        quote_prepared: this.mainEmployeeData?.first_name,
        quote_prepared_date: this.myDate,
      })
  
      if(this.singleLeadData?.company_logo_req){
        this.logoCost = true;
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
    }
  
    finApproveNew() {
      this.finReq = false;
    }
  
    saleApprove() {
      this.saleReq = true;
    }
  
    saleApproveNew() {
      this.saleReq = false;
    }
  
    auditApprove() {
      this.auditReq = true;
    }
  
    auditApproveNew() {
      this.auditReq = false;
    }
  
  
    viewDocBasic() {
      window.open(this.singleLeadData.basic_form, '_blank');
    }
  
    getCountryID(e: any) {
      
      this.leadService.getStateByID(e.value).subscribe((res:any) => {
        
        this.stateList = res.data;
      });
    }
    getCountry() {
      this.configService.getCountry().subscribe((res: any) => {
        this.countryList = res.data;
        
      });
    }
    getStateID(e: any) {
      
      this.leadService.getCityByID(e.value).subscribe((res:any) => {
        
        this.cityList = res.data;
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
    
    submitForm() {
      // this.submitted = false;
      // if (this.leadForm.invalid) {
      //   this.toast.error(
      //     'Required fields should not be empty.',
      //     'Error Occurred!'
      //   );
      //   return;
      // }
      // this.route.navigate(['master/lead/lead-opportunity/fea-approvel/fea-approvel-list']);
      let val = this.leadForm.value;
      
      
      this.dataMain = {
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
        postal_code: val.postal_code,
        region: val.region,
        regional_bussiness_lead: val.regional_bussiness_lead,
        global_managing_director: val.global_managing_director,
        global_manager_sales: val.global_manager_sales,
        website_url: val.website_url,
        phone_number: val.phone_number,
        mobile_number: val.mobile_number,
        lead_created_by_name: val.lead_created_by_name,
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
        outstanding_amount: val.outstanding_amount,
        tds_outstanding_amount: val.tds_outstanding_amount,
        advance_payment_remarks: val.advance_payment_remarks,
        status: "Sent FEA Approval"
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
        this.leadService.editLeadDoc(this.lead_id, data).subscribe((res:any) => {
          
        });
      }
  
      this.leadService.editLead(this.lead_id, this.dataMain).subscribe((res:any) => {
        
        this.toast.success("FEA Approval Successfully..")
        this.route.navigate(['master/lead/quotation/fea-approvel'],
          { queryParams: { lead_id: this.lead_id } }
        );
      },
      (err: any) => {
        this.toast.error("Something Went To Wrong");
        } )
      
      
    }
    updateForm(){
      this.submitted = false;
      if (this.leadForm.invalid) {
        
        this.toast.error('Required fields should not be empty.', 'Error Occurred!');
        return;
      }
      const data = this.leadForm.value;
      
      this.leadService.editLead(this.lead_id, data).subscribe((res:any) => {
        
        
        this.toast.success("Updated Assignment Successfully..")
        this.route.navigate(['master/lead/quotation/quotation-list']);
      })
  
    }
  cancel(){
    window.location.reload()
  }
  }
