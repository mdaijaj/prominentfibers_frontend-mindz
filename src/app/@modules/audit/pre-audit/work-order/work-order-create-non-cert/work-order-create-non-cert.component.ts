import { Component, ElementRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatOption } from '@angular/material/core';
import { MatSelect } from '@angular/material/select';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import Swal from 'sweetalert2';
import { EmpRegistrationService } from 'src/app/@shared/services/emp-registration.service';
import { LeadService } from 'src/app/@shared/services/lead.service';
import { RecruitService } from 'src/app/@shared/services/recruitment.service';
import { ConfigurationalmasterService } from '../../../../../@shared/services/configurationalmaster.service';

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
  selector: 'app-work-order-create-non-cert',
  templateUrl: './work-order-create-non-cert.component.html',
  styleUrls: ['./work-order-create-non-cert.component.scss']
})


export class WorkOrderCreateNonCertComponent {
  // displayedColumns: string[] = ['stage', 'noOfMandays'];
  br2: any;
  daysSelected: any[] = [];
  daysSelectedTwo: any[] = [];
  daysSelectedThree: any[] = [];
  daysSelectedFour: any[] = [];
  daysSelectedFive: any[] = [];
  daysSelectedSix: any[] = [];
  parentSide: boolean;
  br1: any;
  training_start_date = new FormControl();
  endDate = new FormControl();
  @ViewChild('coauditor') coauditor: MatSelect;
  displayedColumns: string[] = ['account_name', 'br_number'];
  dataSource = ELEMENT_DATA;
  leadForm: FormGroup;
  jobType: any;
  auditorName:any;
  allCoAuditor = false;
  auditorDATA: any;
  candidateArray: any;
  interviewGetId:any;
  candidateId: any;
  id: any;
  stageData: any;
  interview_id: any;
  clicked: boolean = false;
  cutomerType: boolean = false;
  sitAudit: boolean = false;
  lead_id: any;
  gstvalidation: boolean=false;
  singleLeadData: any;
  myFiles: any;
  fileList: any;
  allAchievement: any;
  errorMsg: string = '';
  auditOpen:boolean=false;
  viewCalenderData:any[] = [];
  event: any;
 
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
  dataMain: {br_number:any, expense_category: any; customer_type: any; assigned_to: any; categories: any; site_audit: any; associated_company: any; segment: any; certificate_type: any; first_name: any; last_name: any; email: any; emplyoment_type: any; job_title: any; street_address: any; address2: any; city: any; state: any; country: any; postal_code: any; region: any; regional_bussiness_lead: any; global_managing_director: any; global_manager_sales: any; website_url: any; phone_number: any; mobile_number: any; dqs_contact_source: any; contact_owner: any; lead_created_date: string; standard_program_assement: any; remarks: any; 
    add_cert_copy: any; accredition_logo_details: any; lead_validate_stage: any; validated_by: any; lead_validated_date: string; lead_validate_remarks: any; lead_assgn_contact_owner: any; assigned_by: any; stage: any; lead_assgn_remark: any; industry_sector: any; employee_count: any; company_remarks: any; gst_applicable: any; gst_number: any; pan_number: any; tan_number: any; product_request: any; customer_sales_executive: any; opportunity_type: any; opportunity_ref: any; billing_site: any; no_of_mandays: any; ea_code: any; assessment_period: any; opp_verifier_name_level1: any; opp_verified_date_level1: string;
    opp_verified_remarks_level1: any; reject_remarks_a: any; reject_remarks_b: any; opp_verifier_name_level2: any; opp_verified_date_level2: string; opp_verified_remarks_level2: any; quotation_currency: number; slab_quote: any; logo_cost: any; quote_prepared: any; quote_prepared_date: string; status: string; company_logo_req:any; company_logo_cost:any; 
    agreed_slab_a: any;
    agreed_slab_b: any;
    agreed_logo_cost: any;
    agreed_accredition: any;
    agreed_discount: any;
    fin_approval: any;
    sales_approval: any;
    audit_approval: any;
    training_start_date: any;
    training_end_date: any;
    planning_status: any;
    training_confirm_date: any;
    training_material: any;
    locked_status: any;
    training_remarks: any;
    approval_by: any;
    site_selected: any;
    auditor_name: any;
    trainee_auditor_name: any;
    co_auditor_name: any;
    technical_expert: any;
    training_candidate_name: any;
    training_witness: any;
    travel_type: any;
    task_order_category: any;
    lead_auditor_cal: any;
    co_auditor_cal: any;
    trainee_auditor_cal: any;
    tech_ex_cal: any;
    candidate_name_cal: any;
    witness_cal: any;
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
  unreg: boolean = false;
  gstreg: boolean = false;
  auditorBlock: boolean = false;
  auditorData: any[] = [];
  now = new Date();

  year = this.now.getFullYear();
  month = this.now.getMonth();
  // day = this.now.getDay();
  date = this.now.getDate();
  maxDate = moment({ year: this.year + 100, month: this.month, date: this.date }).format('YYYY-MM-DD');
  minDate = moment({ year: this.year - 0, month: this.month, date: this.date }).format('YYYY-MM-DD');
  aduitId: any;
  currencyList: any;
  coName: any[] = [];
  minDateToFinish = new Subject<string>();
  minDate2: Date;
  leadUpdate: any;
  submitted: boolean;
  myArray: any;
  coAuditorData: any[] = [];
  newProductData: any[] = [];
  nonCertTrue: boolean;
  leadAuditorNames: string;
  leadAuditorNamestwo: string;
  leadAuditorNamesThree: string;
  leadAuditorNamesFour: any;
  leadAuditorNamesFive: any;
  leadAuditorNamesSix: any;
  br: any;
  showaccredetion: boolean;
  showsiclogo: boolean;
  imageToUpload: any;
  fileData:any=[];
  imagePath :any[]=[];
  singleData: any;
  curentIndex: any;
  // minDate:any;
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
      urd_number: new FormControl(null),
      associated_company: new FormControl(null,Validators.required),
      segment: new FormControl(null,Validators.required),
      certificate_type: new FormControl(null,Validators.required),
      first_name: new FormControl(null,Validators.required),
      categories: new FormControl(null,Validators.required),
      last_name: new FormControl(null,Validators.required),
      email: new FormControl(null,Validators.required),
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
      phone_number: new FormControl(null),
      mobile_number: new FormControl(null,Validators.required),
      dqs_contact_source: new FormControl(null,Validators.required),
      contact_owner: new FormControl(null,Validators.required),
      lead_created_date: new FormControl(null,Validators.required),
      standard_program_assement: new FormControl(null,Validators.required),
      remarks: new FormControl(null),
      lead_validate_stage: new FormControl(null,Validators.required),
      validated_by: new FormControl(null,Validators.required),
      lead_validated_date: new FormControl(null,Validators.required),
      lead_validate_remarks: new FormControl(null),
      lead_assgn_contact_owner: new FormControl(null,Validators.required),
      assigned_by: new FormControl(null,Validators.required),
      assigned_date: new FormControl(null,Validators.required),
      stage: new FormControl(null,Validators.required),
      lead_assgn_remark: new FormControl(null,Validators.required),
      industry_sector: new FormControl(null,Validators.required),
      customer_category: new FormControl(null,Validators.required),
      employee_count: new FormControl(null,Validators.required),
      company_remarks: new FormControl(null),
      customer_sales_executive: new FormControl(null,Validators.required),
      assigned_to: new FormControl(null,Validators.required),
      opportunity_type: new FormControl(null,Validators.required),
      opportunity_ref: new FormControl(null,Validators.required),
      product_request: new FormControl(null,Validators.required),
      no_of_mandays: new FormControl(null,Validators.required),
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
      other_file: new FormControl(null,Validators.required),   
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
      training_start_date: new FormControl(null,Validators.required),
      training_end_date: new FormControl(null,Validators.required),
      planning_status: new FormControl(null,Validators.required),
      training_confirm_date: new FormControl(null,Validators.required),
      locked_status: new FormControl(null,Validators.required),
      training_remarks: new FormControl(null),
      approval_by: new FormControl(null,Validators.required),
      site_selected: new FormControl(null,Validators.required),
      auditor_name: new FormControl(null),
      trainee_auditor_name: new FormControl(null),
      co_auditor_name: new FormControl(null),
      technical_expert: new FormControl(null),
      training_candidate_name: new FormControl(null),
      training_witness: new FormControl(null),
      travel_type: new FormControl(null,Validators.required),
      task_order_category: new FormControl(null,Validators.required),
      lead_auditor_cal: new FormControl(null),
      co_auditor_cal: new FormControl(null),
      trainee_auditor_cal: new FormControl(null),
      tech_ex_cal: new FormControl(null),
      candidate_name_cal: new FormControl(null),
      witness_cal: new FormControl(null),
      training_name: new FormControl(null),
      training_Sub: new FormControl(null),
      training_no_days: new FormControl(null),
      training_venue: new FormControl(null),
      trainer_name: new FormControl(null),
      training_std: new FormControl(null),

      other_upload: new FormArray([
        new FormGroup({
          other_file: new FormControl(null),
          file_name: new FormControl(null),
        })
      ]),
      training_material: new FormArray([
        new FormGroup({
          name: new FormControl(null),
          qty: new FormControl(null),
        })
      ]),
    })    
   
    this.minDateToFinish.subscribe((r:any) => {
      this.minDate2 = new Date(r);
    })
  }

  ngOnInit() {
    
    this.getAchievementList();
    this.getCurrency();
    this.activeroute.queryParams.subscribe((params:any) => {
      this.id = params;
      this.br=params.br_no
      this.lead_id = this.id.lead_id;
      this.leadUpdate = this.id.type; 
      this.qoutationType = params.type
      
      this.leadService.getByIdLead(this.lead_id).subscribe((res:any) => {
        this.singleLeadData = res.data;
        if((this.singleLeadData?.segment_name === 'MSA')&&(this.singleLeadData?.certificate_type_name === 'Non-Cert')){
          this.showaccredetion= true;        
        }
        console.log('this.singleLeadData?.certificate_type_name', this.singleLeadData?.certificate_type_name)
        if(this.singleLeadData?.certificate_type_name == 'Non-Cert'){
          this.showsiclogo = true;
          console.log('show value', this.showsiclogo)
        }
        if(this.singleLeadData?.billing_site === true){
          this.parentSide = true;
          this.getStage1(this.singleLeadData?.br_number)
        }
        
        if (this.singleLeadData.status === "Blocked Auditor") {
          this.auditorBlock = true;
        } 

        if(this.singleLeadData?.export === "Export Wise"){
          this.gstvalidation = false;
        }
         if (this.singleLeadData?.certificate_type_name === "Non-Cert") {
          this.nonCertTrue = false;
          
        } else {
          this.nonCertTrue = true;
          
        }
        this.patchFormvalue();
        this.getCategory();
        this.getAuditor();
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
    this.getByViewData();
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
  seePreview(path: string, imagePath: any) {
    if (!this.imagePath) {
      if (path) {
        Swal.fire({
          imageUrl: path,
          imageHeight: 250,
          imageAlt: 'Uploaded Document',
          confirmButtonColor: "#8B817D",
          confirmButtonText: 'Ok',
        })
      }
    } else {
      Swal.fire({
        imageUrl: imagePath,
        imageHeight: 250,
        imageAlt: 'Profile Image',
        confirmButtonColor: "#8B817D",
        confirmButtonText: 'Ok',
      })
    }
  }
  gstDealer() {
    this.gstreg = true;
    this.unreg = false;
  }
  get CF_1(): any {
    return this.leadForm.controls;
  }
  get CF_2(): any {
    return this.leadForm.controls;
  }
  onChange(e: any,i:any ,) {
    if (e.target.files && e.target.files[0]) {
      const data: FileList = e.target.files;
      this.imageToUpload = data.item(0) || null;
      this.fileData.push({index:i, filePath:this.imageToUpload})
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imagePath[i] = e.target.result;


      };
      reader.readAsDataURL(this.imageToUpload);
    }


  }
  getAuditor() {
    
    
    for ( let data of this.singleLeadData?.product_request) {
      this.newProductData.push(data)
    }
    this.configService.getAuditor().subscribe((res:any) => {
      
      for (let item of res.data) {
        
        for ( let data of this.newProductData) {
        

          if (data === item.auditor_standard) {
            this.auditorData.push(item)
          }
        }
      }
      
    })
  }

  getCategory() {
    this.configService.listCategory().subscribe((res: any) => {
      this.categoryList = res.data;
      
    })
  }

  print() {
    window.print();
  }

  getCurrency() {
    this.configService.getQuotationcurrency().subscribe((res: any) => {
      this.currencyList = res.data;
      
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


  patchFormvalue() { 
    this.checkUnreg();
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
      city:  this.singleLeadData?.city,
      state:  this.singleLeadData?.state,
      country:  this.singleLeadData?.country,
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
      industry_sector:  this.singleLeadData?.industry_sector,
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
      urd_number: this.singleLeadData?.urd_number,
      billing_site: this.singleLeadData?.billing_site,
      company_logo_cost: this.singleLeadData?.company_logo_cost,
      opp_verifier_name_level1:  this.singleLeadData?.opp_verifier_name_level1,
      opp_verified_date_level1:  this.singleLeadData?.opp_verified_date_level1,
      opp_verified_remarks_level1:  this.singleLeadData?.opp_verified_remarks_level1,
      opp_verifier_name_level2:  this.singleLeadData?.opp_verifier_name_level2,
      opp_verified_date_level2:  this.singleLeadData?.opp_verified_date_level2,
      opp_verified_remarks_level2:  this.singleLeadData?.opp_verified_remarks_level2,
      quotation_currency: this.singleLeadData?.quotation_currency,
      assessment_period:this.singleLeadData?.assessment_period,
      accredition_logo_details:this.singleLeadData?.accredition_logo_details,
      company_logo_req:this.singleLeadData?.company_logo_req,
      add_cert_copy:this.singleLeadData?.add_cert_copy,
      expense_category:this.singleLeadData?.expense_category,
      agreed_slab_a:this.singleLeadData?.agreed_slab_a,
      slab_quote: this.singleLeadData?.slab_quote,
      logo_cost: this.singleLeadData?.logo_cost,
      quote_prepared: this.mainEmployeeData?.first_name,
      quote_prepared_date: this.myDate,
      training_confirm_date: this.myDate,



    })
    if(this.singleLeadData?.company_logo_cost){
      this.logoRequired=true;
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
    this.logoRequired = false;
  }

  logoReqNew() {
    this.logoRequired = true;
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
  
  submitForm() {
    
    
  
    // if (!this.leadForm.invalid) {
    //     this.toast.error('Required fields should not be empty.', 'Error Occurred!');
    //   return;
    // }
   
    this.submitted = true;
    let val = this.leadForm.value;
    console.log('val', val)
        this.dataMain = {
        br_number:this.br,
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
          dqs_contact_source: val.dqs_contact_source,
          contact_owner: val.contact_owner,
          lead_created_date: moment(val.lead_created_date).format('YYYY-MM-DD'),
          standard_program_assement: val.standard_program_assement,
          remarks: val.remarks,
          lead_validate_stage: val.lead_validate_stage,
          validated_by: val.validated_by,
          lead_validated_date: this.singleLeadData?.lead_validated_date || "2023-03-16",
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
          product_request: val.product_request,
          customer_sales_executive: val.customer_sales_executive,
          opportunity_type: val.opportunity_type,
          opportunity_ref: val.opportunity_ref,
          billing_site: val.billing_site,
          no_of_mandays: val.no_of_mandays,
          ea_code: val.ea_code,
          assigned_to: val.assigned_to,
          reject_remarks_a: val.reject_remarks_a || " ",
          reject_remarks_b: val.reject_remarks_b || " ",
          assessment_period: val.assessment_period,
          accredition_logo_details: val.accredition_logo_details,
          add_cert_copy: val.add_cert_copy,
          categories: val.categories,
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
          training_start_date: moment(new Date()).format('YYYY-MM-DD'),
          training_end_date:  moment(new Date()).format('YYYY-MM-DD'),
          planning_status: val.planning_status,
          training_confirm_date: moment(val.training_confirm_date).format('YYYY-MM-DD') || ' ',
          locked_status: val.locked_status,
          training_remarks: val.training_remarks,
          approval_by: val.approval_by,
          site_selected: val.site_selected,
          auditor_name: val.auditor_name,
          trainee_auditor_name:  val.trainee_auditor_name,
          co_auditor_name: val.co_auditor_name,
          technical_expert: val.technical_expert,
          training_candidate_name: val.training_candidate_name,
          training_witness: val.training_witness,
          travel_type: val.travel_type, 
          task_order_category: val.task_order_category,
          lead_auditor_cal: this.daysSelected || ' ',
          co_auditor_cal: this.daysSelectedTwo || ' ',
          trainee_auditor_cal: this.daysSelectedThree || ' ',
          tech_ex_cal: this.daysSelectedFour || ' ',
          candidate_name_cal:this.daysSelectedFive || ' ',
          witness_cal: this.daysSelectedSix || ' ',
          training_material: val.training_material,
          status: "Training Material",    
      
        }
  
  
    const data = {
      contact_review_form: this.fileDetails.file,
      gst_file: this.fileDetailsOne.file,
      basic_form: this.fileDetailsTwo.file,
      company_logo: this.fileDetailsThree.file,
      other_file: this.fileDetailsFour.file,
      document_remark: val.document_remark,
    }

    
    console.log('data', data)
    if (data.contact_review_form) {
      this.leadService.editLeadDoc(this.lead_id, data).subscribe((res:any) => {        
      });
    }
     if(this.singleLeadData?.certificate_type_name=="Non-Cert"){
      console.log('this.dataMain non cert', this.dataMain)

      this.leadService.editLead(this.lead_id, this.dataMain).subscribe((res:any) => {      
        this.toast.success("Training Material Blocked Successfully..")
        this.route.navigate(['master/audit/pre-audit/training-material'],
          { queryParams: { lead_id: this.lead_id } }
        );
      })
    }   
  }
  addrow(){
    <FormArray>this.CF_1.other_upload.push(
      new FormGroup({
        other_file: new FormControl(null),
        file_name: new FormControl(null),
      })
    );
  }
  addqtyrow(){
    <FormArray>this.CF_2.training_material.push(
      new FormGroup({
        name: new FormControl(null),
        qty: new FormControl(null),
      })
    );
  }
  updateForm(){
    // this.submitted = false;
    // if (this.leadForm.invalid) {
      
    //   this.toast.error('Required fields should not be empty.', 'Error Occurred!');
    //   return;
    // }
    const data = this.leadForm.value;
    
    this.leadService.editLead(this.lead_id, data).subscribe((res:any) => {
      
      
      this.toast.success("Updated Assignment Successfully..")
      this.route.navigate(['master/audit/pre-audit/work-order']);
    })

  }
  rejectBtn() {
    const data = {
      status: "Rejected"
    }
    this.leadService.editLead(this.lead_id, data).subscribe((res:any) => {
      
      this.toast.success(res.message);
      this.route.navigate(['master/lead/lead-account'],
        { queryParams: { lead_id: this.lead_id } }
      );
    })
  }
  uploadQty(i: any, control: any) {
    this.curentIndex = i;
    if(!this.lead_id ){
      this.toast.error("Please create first")
    }
    if (control.value.name === null) {
      this.toast.error('Name should not be blank');
      return;
    };

    if (control.value.qty === null) {
      this.toast.error('if you want to update', 'Select Qty');
      return;
    }; 
  };

  deleteQty(i: any, control: any,){
    if (this.CF_1.training_material.length > 1) {

        this.CF_1.training_material.removeAt(i);
    } else {
      this.toast.error("Can't Deleted", "must be one");
    }
  }

  uploadOtherDoc(i: any, control: any) {
    console.log('file name-->', control)
    this.curentIndex = i;
    if(!this.lead_id ){
      this.toast.error("Please create first")
    }
    if (control.value.other_file === null) {
      this.toast.error('Fields should not be blank');
      return;
    };

    if (control.value.other_file === null) {
      this.toast.error('if you want to update', 'Select file');
      return;
    };

    let file: any = this.fileData.find((e: any) => e.index === i);
    console.log('file',file);

    if (file) {
      const data: any = {
        other_file:file.filePath,
        file_name: control.value.file_name,
      };
      let filePath:File = file.filePath;
      const formData: any = new FormData();
      formData.append('other_file', filePath ,filePath.name);
      formData.append('file_name', data.file_name);

      this.leadService.uploadOtherDoc(this.lead_id, formData).subscribe((res:any)=>{
        console.log("response",res)
        if(res.code ==200){
          this.toast.success(res.message)
        }
      })
    }
  };
  deleteRow(i: any, control: any,){
    if (this.CF_1.other_upload.length > 1) {

        this.CF_1.other_upload.removeAt(i);
    } else {
      this.toast.error("Can't Deleted", "must be one");
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
  auditClick(){
    this.auditOpen=!this.auditOpen;
let data=this.leadForm.value;


let viewData={
  lead_genration_id: Number(this.lead_id),
  audit_start_date: moment(data.training_start_date).format('YYYY-MM-DD'),
  audit_end_date:moment(data.training_end_date).format('YYYY-MM-DD'),
  lead_auditor_name:data.auditor_name,
  co_auditor_name:data.trainee_auditor_name,
  site_location: this.singleLeadData?.city_name
}


    this.leadService.createViewCalender(viewData).subscribe((res:any)=>{
      
      let idAudit=res.data;
      this.aduitId=idAudit.auditorId;
      
      this.getByViewData();
    })
  }

  getByViewData(){
    this.leadService.getByViewCalender(this.aduitId).subscribe((res:any)=>{
      this.viewCalenderData=res.data;
      
      for (let item of this.viewCalenderData) {
        this.coName.push(item.co_auditor_name)
      }
      
      
      // this.auditorName=this.viewCalenderData?.lead_auditor_name;
    })
  }
  toggleAllCoAudiSelect() {
    if (this.allCoAuditor) {
      this.coauditor.options.forEach((item: MatOption) => item.select());
    } else {
      this.coauditor.options.forEach((item: MatOption) => item.deselect());
    }
  }
  optionClickCoAuditor() {
    let newStatus = true;
    this.coauditor.options.forEach((item: MatOption) => {
      if (!item.selected) {
        newStatus = false;
      }
    });
    this.allCoAuditor = newStatus;
    
  }
  filterAuditor(e:any) {
    
    this.coAuditorData = [];
    for (let item of this.auditorData) {
      if (e.audit_qualification_id === item?.audit_qualification_id) {
        
      }
      else {
        this.coAuditorData.push(item);
      }
    }
    
  }
  dateChange(e:any) {
    this.minDateToFinish.next(e.value.toString());
  }

  isSelectedOne:any = (event: any) => {
    const date =
      event.getFullYear() +
      "-" +
      ("00" + (event.getMonth() + 1)).slice(-2) +
      "-" +
      ("00" + event.getDate()).slice(-2);
    return this.daysSelected.find(x => x == date) ? "selected" : null;
  };
  select_one(event: any, calendar: any) {
    const date =
      event.getFullYear() +
      "-" +
      ("00" + (event.getMonth() + 1)).slice(-2) +
      "-" +
      ("00" + event.getDate()).slice(-2);
    const index = this.daysSelected.findIndex(x => x == date);
    if (index < 0) this.daysSelected.push(date);
    else this.daysSelected.splice(index, 1);
    this.leadAuditorNames = this.daysSelected.toString()
    
    
    calendar.updateTodaysDate();
  }

  isSelectedTwo:any = (event: any) => {
    const date =
      event.getFullYear() +
      "-" +
      ("00" + (event.getMonth() + 1)).slice(-2) +
      "-" +
      ("00" + event.getDate()).slice(-2);
    return this.daysSelectedTwo.find(x => x == date) ? "selected" : null;
  };
  select_two(event: any, calendar: any) {
    const date =
      event.getFullYear() +
      "-" +
      ("00" + (event.getMonth() + 1)).slice(-2) +
      "-" +
      ("00" + event.getDate()).slice(-2);
    const index = this.daysSelectedTwo.findIndex(x => x == date);
    if (index < 0) this.daysSelectedTwo.push(date);
    else this.daysSelectedTwo.splice(index, 1);
    this.leadAuditorNamestwo = this.daysSelectedTwo.toString()
    
    
    calendar.updateTodaysDate();
  }
  isSelectedThree:any = (event: any) => {
    const date =
      event.getFullYear() +
      "-" +
      ("00" + (event.getMonth() + 1)).slice(-2) +
      "-" +
      ("00" + event.getDate()).slice(-2);
    return this.daysSelectedThree.find(x => x == date) ? "selected" : null;
  };
  select_three(event: any, calendar: any) {
    const date =
      event.getFullYear() +
      "-" +
      ("00" + (event.getMonth() + 1)).slice(-2) +
      "-" +
      ("00" + event.getDate()).slice(-2);
    const index = this.daysSelectedThree.findIndex(x => x == date);
    if (index < 0) this.daysSelectedThree.push(date);
    else this.daysSelectedThree.splice(index, 1);
    this.leadAuditorNamesThree = this.daysSelectedThree.toString()
    
    
    calendar.updateTodaysDate();
  }

  isSelectedFour:any = (event: any) => {
    const date =
      event.getFullYear() +
      "-" +
      ("00" + (event.getMonth() + 1)).slice(-2) +
      "-" +
      ("00" + event.getDate()).slice(-2);
    return this.daysSelectedFour.find(x => x == date) ? "selected" : null;
  };
  
  select_four(event: any, calendar: any) {
    const date =
      event.getFullYear() +
      "-" +
      ("00" + (event.getMonth() + 1)).slice(-2) +
      "-" +
      ("00" + event.getDate()).slice(-2);
    const index = this.daysSelectedFour.findIndex(x => x == date);
    if (index < 0) this.daysSelectedFour.push(date);
    else this.daysSelectedFour.splice(index, 1);
    this.leadAuditorNamesFour = this.daysSelectedFour.toString()
    
    
    calendar.updateTodaysDate();
  }

  
  isSelectedFive:any = (event: any) => {
    const date =
      event.getFullYear() +
      "-" +
      ("00" + (event.getMonth() + 1)).slice(-2) +
      "-" +
      ("00" + event.getDate()).slice(-2);
    return this.daysSelectedFive.find(x => x == date) ? "selected" : null;
  };
  select_five(event: any, calendar: any) {
    const date =
      event.getFullYear() +
      "-" +
      ("00" + (event.getMonth() + 1)).slice(-2) +
      "-" +
      ("00" + event.getDate()).slice(-2);
    const index = this.daysSelectedFive.findIndex(x => x == date);
    if (index < 0) this.daysSelectedFive.push(date);
    else this.daysSelectedFive.splice(index, 1);
    this.leadAuditorNamesFive = this.daysSelectedFive.toString()
    
    
    calendar.updateTodaysDate();
  }

  isSelectedSix:any = (event: any) => {
    const date =
      event.getFullYear() +
      "-" +
      ("00" + (event.getMonth() + 1)).slice(-2) +
      "-" +
      ("00" + event.getDate()).slice(-2);
    return this.daysSelectedSix.find(x => x == date) ? "selected" : null;
  };
  select_six(event: any, calendar: any) {
    const date =
      event.getFullYear() +
      "-" +
      ("00" + (event.getMonth() + 1)).slice(-2) +
      "-" +
      ("00" + event.getDate()).slice(-2);
    const index = this.daysSelectedSix.findIndex(x => x == date);
    if (index < 0) this.daysSelectedSix.push(date);
    else this.daysSelectedSix.splice(index, 1);
    this.leadAuditorNamesSix = this.daysSelectedSix.toString()
    
    
    calendar.updateTodaysDate();
  }
}