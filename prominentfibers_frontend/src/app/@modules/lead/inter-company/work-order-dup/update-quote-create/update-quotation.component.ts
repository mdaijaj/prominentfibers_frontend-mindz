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
import { MatOption } from '@angular/material/core';
import { MatSelect } from '@angular/material/select';

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
  selector: 'app-update-quotation',
  templateUrl: './update-quotation.component.html',
  styleUrls: ['./update-quotation.component.scss']
})
export class UpdateQuotationComponent {
  @ViewChild('productselect') productselect: MatSelect;
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
  stageData: any[] = [];
  showTable: boolean= false;
  allDataOne: any;
  allDataTwo: any;
  allDataMan: any;
  industryList: any;
  countryList: any;
  cityList: any;
  stateList: any;
  pinCodeList: any;
  br1: any;
  certificateList: any;
  regionSList: any;
  CategorySList: any;
  regionalbheadList: any;
  globalMsalesList: any;
  assesmentList: any;
  segmentList: any;
  allSelectedProduct: any;
  standardList: any;

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
      associated_company: new FormControl(null),
      segment: new FormControl(null),
      certificate_type: new FormControl(null),
      br_number1: new FormControl(null),
      br_number: new FormControl(null),
      first_name: new FormControl(null),
      last_name: new FormControl(null),
      email: new FormControl(null),
      job_title: new FormControl(null),
      street_address: new FormControl(null),
      address2: new FormControl(null),
      country: new FormControl(null),
      state: new FormControl(null),
      city: new FormControl(null),
      postal_code: new FormControl(null),
      region: new FormControl(null),
      regional_bussiness_lead: new FormControl(null),
      global_managing_director: new FormControl(null),
      global_manager_sales: new FormControl(null),
      website_url: new FormControl(null),
      phone_number: new FormControl(null),
      mobile_number: new FormControl(null),
      industry_sector: new FormControl(null),
      customer_category: new FormControl(null),
      employee_count: new FormControl(null),
      customer_sales_executive: new FormControl(null),
      assigned_to: new FormControl(null),
      opportunity_type: new FormControl(null),
      opportunity_ref: new FormControl(null),
      product_request: new FormControl(null),
      gst_applicable: new FormControl(null),
      gst_number: new FormControl(null),
      billing_site: new FormControl(null),
      agreed_percentage: new FormControl(null),
      mutual_agreed_percentage: new FormControl(null),
      percentage_remarks: new FormControl(null),
      noOfMandays: new FormControl(null),
      stage: new FormControl(null),
      contact_review_form:new FormControl(null),
    })
  }

  ngOnInit() {
    this.getAchievementList();
    this.getStage(this.br1);
    this.getStandardProgram();
    this.getRegionList();
    this.regionalBusiness();
    this.globalManagerales();
    this.getAllIndustry();
    this.getCountry();
    this.getAllSegment();
    this.activeroute.queryParams.subscribe((params:any) => {
      this.id = params;
      this.lead_id = this.id.lead_id;
      
      this.qoutationType = params.type
      
      this.leadService.getByIdLead(this.lead_id).subscribe((res:any) => {
        this.singleLeadData = res.data;
        this.getStandardProgram();

        this.br1 = this.singleLeadData.br_number;
        if (this.singleLeadData.status === "Quotation") {
          this.quotePrepared = true;
        } else if (this.singleLeadData.status === "Quotation Sent") {
          this.quoteSent = true;
        } else if (this.singleLeadData.status === "Sent S&M Approval") {
          this.approvalSent = true;
        } else if (this.singleLeadData.status === "Perform Invoice Sent") {
          this.invoiceSent = true;
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
  }
  getCountry() {
    this.configService.getCountry().subscribe((res: any) => {
      this.countryList = res.data;
      
    });
  }
  getCountryID(e: any) {
    
    this.leadService.getStateByID(e.value).subscribe((res:any) => {
      
      this.stateList = res.data;
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
      
    });
  }
  getAllIndustry() {
    this.configService.listIndustry().subscribe((res: any) => {
      this.industryList = res.data;
      
    });
  }
  globalManagerales() {
    this.leadService.getGlobalSalesM().subscribe((res: any) => {
      
      this.allDataMan = res.data;
    });
  }

  regionalBusiness() {
    this.leadService.getListBusiness().subscribe((res: any) => {
      
      this.allDataTwo = res.data;
    });
  }
  showPriceTable() {
    this.showTable = !this.showTable;
  }

  toPdf() {
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
  getRegionList() {
    this.leadService.regionListGet().subscribe((res: any) => {
      
      this.allDataOne = res.data;
    });
  }


  patchFormvalue() { 
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
     
     this.assesmentList = res.data[0].newitemlist;
     
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
      emplyoment_type: this.singleLeadData?.emplyoment_type,
      street_address: this.singleLeadData?.street_address,
      job_title: this.singleLeadData?.job_title,
      address2: this.singleLeadData?.address2,
      city: Number(this.singleLeadData?.city),
      state: Number(this.singleLeadData?.state),
      country: Number(this.singleLeadData?.country),
      postal_code:this.singleLeadData?.postal_code,
      region: this.singleLeadData?.region,
      regional_bussiness_lead:this.singleLeadData?.regional_bussiness_lead,
      global_managing_director:this.singleLeadData?.global_managing_director,
      global_manager_sales:this.singleLeadData?.global_manager_sales,
      website_url:this.singleLeadData?.website_url,
      phone_number:this.singleLeadData?.phone_number,
      mobile_number: this.singleLeadData?.mobile_number,
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
      industry_sector: this.singleLeadData?.industry_sector,
      customer_category: this.singleLeadData?.customer_category,
      employee_count: this.singleLeadData?.employee_count,
      company_remarks: this.singleLeadData?.company_remarks,
      gst_applicable: this.singleLeadData?.gst_applicable,
      gst_number: this.singleLeadData?.gst_number,
      pan_number: this.singleLeadData?.pan_number,
      tan_number: this.singleLeadData?.tan_number,
      document_remark: this.singleLeadData?.document_remark,
      product_request: this.singleLeadData?.product_request,
      customer_sales_executive: this.singleLeadData?.customer_sales_executive,
      opportunity_type: this.singleLeadData?.opportunity_type,
      opportunity_ref: this.singleLeadData?.OpportunityRef_no,
      no_of_mandays: this.singleLeadData?.no_of_mandays,
      ea_code: this.singleLeadData?.ea_code,
      billing_site: this.singleLeadData?.billing_site,
      assessment_period: this.singleLeadData?.assessment_period,
      opp_verifier_name_level1:  this.singleLeadData?.opp_verifier_name_level1,
      opp_verified_remarks_level1:  this.singleLeadData?.opp_verified_remarks_level1,
      opp_verifier_name_level2:  this.singleLeadData?.opp_verifier_name_level2,
      opp_verified_remarks_level2:  this.singleLeadData?.opp_verified_remarks_level2,
      quotation_currency: this.singleLeadData?.quotation_currency,
      expense_category: this.singleLeadData?.expense_category,
      company_logo_req: this.singleLeadData?.company_logo_req,
      company_logo_cost: this.singleLeadData?.company_logo_cost,
      accredition_logo_details: this.singleLeadData?.accredition_logo_details,
      add_cert_copy: this.singleLeadData?.add_cert_copy,
      slab_quote: this.singleLeadData?.slab_quote,
      logo_cost: this.singleLeadData?.logo_cost,
      quote_prepared: this.mainEmployeeData?.first_name,
      quote_prepared_date: this.myDate,
    })
  }
  getStage(br1: any) {
    this.leadService.getStage(this.lead_id).subscribe((res: any) => {
      
      this.stageData = res.data;
    })
  }

  reject() {
    this.rejectRemarks = true;
  }
  getAllSegment() {
    this.configService.getAllSegment().subscribe((res: any) => {
      this.segmentList = res.data;
      
    });
  }
  accept() {
    this.rejectRemarks = false;
  }
  getStandardProgram() {
    // this.configService.listAsses().subscribe((res: any) => {
    //   this.standardList = res.data;
    //   console.log('test', this.standardList);
      
      this.configService.getProducts(this.singleLeadData?.certificate_type).subscribe((res:any)=>{
        this.standardList=res.data
      
    });
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


  submitQAForm() {
   let val = this.leadForm.value;
    const dataNew = {
        customer_type: val.customer_type,
        site_audit: val.site_audit,
        associated_company: val.associated_company,
        segment: val.segment,
        certificate_type: val.certificate_type,
        br_number1: val.br_number1,
        br_number: val.br_number,
        first_name: val.first_name,
        last_name: val.last_name,
        email: val.email,
        job_title: val.job_title,
        street_address: val.street_address,
        address2: val.address2,
        country: val.country,
        state: val.state,
        city: val.city,
        postal_code: val.postal_code,
        region: val.region,
        regional_bussiness_lead: val.regional_bussiness_lead,
        global_managing_director: val.global_managing_director,
        global_manager_sales: val.global_manager_sales,
        website_url: val.website_url,
        phone_number: val.phone_number,
        mobile_number: val.mobile_number,
        industry_sector: val.industry_sector,
        customer_category: val.customer_category,
        employee_count: val.employee_count,
        customer_sales_executive: val.customer_sales_executive,
        assigned_to: val.assigned_to,
        opportunity_type: val.opportunity_type  ||'Certification - New Audit (RA)',
        opportunity_ref: val.opportunity_ref,
        product_request: val.product_request,
        gst_applicable: val.gst_applicable,
        gst_number: val.gst_number,
        billing_site: val.billing_site,
        agreed_percentage: val.agreed_percentage,
        mutual_agreed_percentage: val.mutual_agreed_percentage,
        percentage_remarks: val.percentage_remarks,
        inter_company_status:"yes",
        status: "Work Order Created"
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
    let stage_data = {
      stage: val.stage || "S1",
      noOfMandays: Number(val.noOfMandays) || 1,
      lead_genration_id: Number(this.lead_id),
      br_number: this.br1 || 50251234,
    }
    

    this.leadService.editLead(this.lead_id, dataNew).subscribe((res:any) => {
      
      this.leadService.createStage(stage_data).subscribe((res: any) => {
        
        this.multiWorkOrder();
        this.toast.success("Stage Added Successfully..");
        if(res.code===200){
          this.getStage(this.br1);
          this.toast.success("Stage Added Successfully..");
        }
        if(res.code===405){
          this.toast.error(res.message);
        }
  
      })
      this.toast.success("Work Order Successfully..")
      this.route.navigate(['master/audit/pre-audit/work-order'],
        { queryParams: { lead_id: this.lead_id } }
      );
    })
  }

  toggleAllCodeSelect() {
    if (this.allSelectedProduct) {
      
      this.productselect.options.forEach((item: MatOption) => item.select());
    } else {
      this.productselect.options.forEach((item: MatOption) => item.deselect());
    }
  }
  optionEaCode() {
    let newStatus = true;
    this.productselect.options.forEach((item: MatOption) => {
      if (!item.selected) {
        newStatus = false;
      }
    });
    this.allSelectedProduct = newStatus;
  }

  multiWorkOrder() {
    let val = this.leadForm.value;
    
    const data = {
      lead_genration_id: this.singleLeadData?.lead_genration_id,
      br_number: this.singleLeadData?.br_number || 50251234,
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
      ea_code: this.singleLeadData?.ea_code ,
      assessment_period: this.singleLeadData?.assessment_period ||'Annual',
      accredition_logo_details: this.singleLeadData?.accredition_logo_details || 'test',
      add_cert_copy: this.singleLeadData?.add_cert_copy,
      opp_verifier_name_level1: this.singleLeadData?.opp_verifier_name_level1,
      opp_verified_date_level1: this.singleLeadData?.opp_verified_date_level1,
      opp_verified_remarks_level1: this.singleLeadData?.opp_verified_remarks_level1,
      opp_verifier_name_level2: this.singleLeadData?.opp_verifier_name_level2,
      opp_verified_date_level2: this.singleLeadData?.opp_verified_date_level2,
      opp_verified_remarks_level2: this.singleLeadData?.opp_verified_remarks_level2,
      quotation_currency: this.singleLeadData?.quotation_currency ||1 ,
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
}
