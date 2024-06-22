import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { GridApi, GridReadyEvent,CellValueChangedEvent, } from 'ag-grid-community';
import * as moment from 'moment';
import { calendarFormat } from 'moment';
import { ToastrService } from 'ngx-toastr';
import { EmpRegistrationService } from 'src/app/@shared/services/emp-registration.service';
import { LeadService } from 'src/app/@shared/services/lead.service';
import { RecruitService } from 'src/app/@shared/services/recruitment.service';
import {  ICellRendererParams } from 'ag-grid-community';

import { ConfigurationalmasterService } from '../../../../@shared/services/configurationalmaster.service';
declare var require: any;
const FileSaver = require('file-saver');

@Component({
  selector: 'app-open-house-reg-create',
  templateUrl: './open-house-reg-create.component.html',
  styleUrls: ['./open-house-reg-create.component.scss']
})
export class OpenHouseRegCreateComponent {
  [x: string]: any;
  leadForm: FormGroup;
  private gridApi!: GridApi<any>;
  count: any = 0;
  public cellValue: any;

  jobType: any;
  candidateArray: any;
  interviewGetId: any;
  candidateId: any;
  errorMsg: string = '';
  id: any;
  interview_id: any;
  clicked: boolean = false;
  cutomerType: boolean = false;
  sitAudit: boolean = false;
  lead_id: any;
  singleLeadData: any;
  hideEmp: boolean = false;
  openDate: boolean = false;
  myFiles: any;
  fileList: any;
  val: any;
  public searchResult: any;
  mainId: string | null;
  mainEmployeeData: any;
  allAchievement: any;
  contact_list: any;
  addormData:any;
  stateList: any[] = [];
  countryList: any[] = [];
  cityList: any;
  pinCodeList: any;
  assesmentList: any;
  pinCodeTrue: boolean = false;
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
  fileListAll: any[] = [];
  categoryList: any;
  submitted: boolean;
  nonCertt: boolean = false;
  rowClass: any;
  standardList: any;
  addParticipantId: number;
  rowData: any;
  dataParticipant: {
    lead_genration_id: any; participant_name: any; email_id: any;
    contact_number: any; program_cost: any; discount_percentage: any; final_fee_after_discount: any; gst_percentage: any; total_cost_after_taxes: any; advance_fee_collected: any; advance_percentage: any; payment_details: any; promise_to_pay_date: any;
  };
  segmentList: any;
  certificateList: any;
  regionSList: any;
  CategorySList: any;
  regionalbheadList: any;
  globalMsalesList: any;
   constructor(
    private fb: FormBuilder,
    private leadService: LeadService,
    private route: Router,
    private toast: ToastrService,
    private configService: ConfigurationalmasterService,
    private _empRegistration: EmpRegistrationService,
    private recruitService: RecruitService,
    private activeroute: ActivatedRoute,
    private _configurationalMasterService: ConfigurationalmasterService,
  ) {
    this.rowClass = 'rowClass'
    this.leadForm = this.fb.group({
      customer_type: new FormControl(null),
      site_audit: new FormControl(null),
      br_number: new FormControl(null),
      associated_company: new FormControl(null),
      new_location_site: new FormControl(null),
      lead_created_by_name: new FormControl(null),
      segment: new FormControl(null),
      certificate_type: new FormControl(null),
      first_name: new FormControl(null),
      last_name: new FormControl(null),
      email: new FormControl(null,[Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]),
      categories: new FormControl(null),
      emplyoment_type: new FormControl(null),
      job_title: new FormControl(null),
      street_address: new FormControl(null),
      address2: new FormControl(null),
      city: new FormControl(null),
      state: new FormControl(null),
      billing_site: new FormControl(null),
      country: new FormControl(null),
      postal_code: new FormControl(null),
      region: new FormControl(null),
      regional_bussiness_lead: new FormControl(null),
      global_managing_director: new FormControl(null),
      global_manager_sales: new FormControl(null),
      website_url: new FormControl(null),
      phone_number: new FormControl(null),
      mobile_number: new FormControl(null,[ Validators.required,   Validators.maxLength(15)]),
      dqs_contact_source: new FormControl(null),
      contact_owner: new FormControl(null),
      lead_created_date: new FormControl(null),
      standard_program_assement: new FormControl(null),
      remarks: new FormControl(null),
      lead_validate_stage: new FormControl(null),
      validated_by: new FormControl(null),
      lead_validated_date: new FormControl(null),
      lead_validate_remarks: new FormControl(null),
      lead_assgn_contact_owner: new FormControl(null),
      assigned_by: new FormControl(null),
      assigned_date: new FormControl(null),
      stage: new FormControl(null),
      lead_assgn_remark: new FormControl(null),
      industry_sector: new FormControl(null),
      customer_category: new FormControl(null),
      employee_count: new FormControl(null),
      company_remarks: new FormControl(null),
      gst_applicable: new FormControl(null),
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
      product_request: new FormControl(null),
      non_cert_type: new FormControl(null),
      open_house_start_date: new FormControl(null),
      open_house_end_date: new FormControl(null),
      participant_name:new FormControl(null),
      email_id:new FormControl(null,[Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]),
      contact_number:new FormControl(null),
       program_cost:new FormControl(null),
       disccount:new FormControl(null),
      final_fee_after:new FormControl(null),
      gst:new FormControl(null),
      total_cost:new FormControl(null),
      advance_fee_collected:new FormControl(null),
      advane:new FormControl(null),
      payment_details:new FormControl(null),
       promis_to_pay_date:new FormControl(null),
       phone_code: new FormControl(),
       mobile_code: new FormControl()
    });
  }

  ngOnInit() {
    this.activeroute.queryParams.subscribe((params) => {
      this.id = params;
      this.lead_id = this.id.lead_id;
      
      this.leadService.getByIdLead(this.lead_id).subscribe((res: any) => {
        this.singleLeadData = res.data;
        console.log('singlelead data---', this.singleLeadData)
        if(this.singleLeadData?.certificate_type_name == "Non-Cert"){
          this.hideEmp = true;
          }
        
        this.nonCertFunc();
        this.patchFormvalue();
      });
    });

    this.getAllSegment();
    this.get_cp_contact();
    this.getCountry();   
    this.getAchievementList();
    this.getCategory();
    this.getCountry();
    this.getAchievementListt();
    this.regionalBusiness();
    this.globalManagerales();
    this.mainId = localStorage.getItem('EmpMainId');
    
    if (this.mainId == undefined) {
      this._empRegistration.getByUserId(this.mainId).subscribe((res) => {
        this.mainEmployeeData = res.data;
        
        this.getAchievementList();
        this.patchFormvalue();
      });
    }
    this.getStandardProgram();
    this.getByAddParticipants();

  }
  getStandardProgram() {
    this._configurationalMasterService.listAsses().subscribe((res: any) => {
      this.standardList = res.data;
      
    });
  }

  openHouse() {
    this.openDate = true;
  }
  closeHouse() {
    this.openDate = false;
  }

  nonCertFunc() {
    if(this.singleLeadData?.certificate_type == "Non Cert") {
      this.nonCertt = true
    }
  }

  fetchSeries(value: String) {
    if (value === '') {
      return (this.searchResult = []);
    }
    this.searchResult = this.allAchievement.filter(function (series: any) {
      
      return series.first_name.toLowerCase().startsWith(value);
    });
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
      },
      (err) => {
        
      }
    );
  }
  get_cp_contact(){
    this.leadService.get_contact().subscribe(
      (res:any)=>{
        this.contact_list = res.data;

      },(err)=>{

      }
    )
  };
  candidateClick(e: any) {
    
    this.candidateId = e;
    this.recruitService.interViewGetIdBy(e).subscribe((res: any) => {
      this.interviewGetId = res.data;
      
      this.patchFormvalue();
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
       this.patchCountryCode(this.singleLeadData?.country)
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
      customer_type: this.singleLeadData?.customer_type,
      site_audit: this.singleLeadData?.multiple_site_audit,
      associated_company: this.singleLeadData?.associated_company,
      segment:this.singleLeadData?.segment,
      br_number: this.singleLeadData?.br_number,
      assignedManager: this.singleLeadData?.assigned_hiring_manager,
      certificate_type: this.singleLeadData?.certificate_type,
      first_name: this.singleLeadData?.first_name,
      last_name: this.singleLeadData?.last_name,
      email: this.singleLeadData?.email,
      contact_owner:
        this.mainEmployeeData?.first_name || this.singleLeadData?.contact_owner,
      lead_created_by_name:this.singleLeadData?.lead_created_by_name,
      
      validated_by:
        this.mainEmployeeData?.first_name || this.singleLeadData?.validated_by,
      emplyoment_type: this.singleLeadData?.emplyoment_type,
      street_address: this.singleLeadData?.street_address,
      job_title: this.singleLeadData?.job_title,
      address2: this.singleLeadData?.address2,
      non_cert_type: this.singleLeadData?.non_cert_type,
      city: this.singleLeadData?.city,
      categories: this.singleLeadData?.categories,
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
      dqs_contact_source: Number(this.singleLeadData?.dqs_contact_source),
      lead_created_date: this.singleLeadData?.lead_created_date,
      standard_program_assement: this.singleLeadData?.standard_program_assement,
      remarks: this.singleLeadData?.remarks,
      lead_validated_date: this.singleLeadData?.lead_validated_date,
      lead_validate_remarks: this.singleLeadData?.lead_validate_remarks,
      industry_sector: this.singleLeadData?.industry_sector,
      company_remarks: this.singleLeadData?.company_remarks,
      gst_number: this.singleLeadData?.gst_number,
      pan_number: this.singleLeadData?.pan_number,
      tan_number: this.singleLeadData?.tan_number,
      customer_category: this.singleLeadData?.customer_category,
      employee_count: this.singleLeadData?.employee_count,
      customer_sales_executive: this.singleLeadData?.customer_sales_executive,
      assigned_to: this.singleLeadData?.assigned_to,
      opportunity_type: this.singleLeadData?.opportunity_type,
      gst_applicable: this.singleLeadData?.gst_applicable,
      product_request: this.singleLeadData?.product_request,
      document_remark:this.singleLeadData?.document_remark
    });
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
  getCategory() {
    this.configService.listCategory().subscribe((res: any) => {
      this.categoryList = res.data;
      
    });
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

  getCountryID(e: any) {
    
    this.leadService.getStateByID(e.value).subscribe((res:any) => {
      
      this.stateList = res.data;
    });
    this.patchCountryCode(e.value);
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
  globalManagerales() {
    this.leadService.getGlobalSalesM().subscribe((res: any) => {
      
      this.allDataMan = res.data;
    });
  }

  submitForm() {
    this.submitted = false;
    

    // if (this.leadForm.invalid) {
    //   this.toast.error(
    //     'Required fields should not be empty.',
    //     'Error Occurred!'
    //   );
    //   return;
    // }
    let val = this.leadForm.value;
    

    this.submitted = true;
    const dataMain = {
      customer_type: val.customer_type,
      multiple_site_audit: val.site_audit || ' ',
      associated_company: val.associated_company,
      billing_site: val.billing_site,
      segment: val.segment,
      certificate_type: val.certificate_type,
      first_name: val.first_name,
      lead_created_by_name: val.lead_created_by_name || ' ',
      last_name: val.last_name,
      non_cert_type: val.non_cert_type,
      email: val.email,
      emplyoment_type: val.emplyoment_type,
      job_title: val.job_title,
      street_address: val.street_address,
      address2: val.address2,
      city: val.city,
      categories: val.categories,
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
      lead_validated_date: moment(val.lead_validated_date).format('YYYY-MM-DD'),
      lead_validate_remarks: val.lead_validate_remarks,
      lead_assgn_contact_owner: val.lead_assgn_contact_owner,
      assigned_by: val.assigned_by,
      // assigned_date: moment(val.assigned_date).format('YYYY-MM-DD'),
      stage: val.stage,
      assigned_to: val.assigned_to,
      product_request: val.product_request,
      customer_sales_executive: val.customer_sales_executive,
      opportunity_type: val.opportunity_type,
      lead_assgn_remark: val.lead_assgn_remark,
      customer_category: val.customer_category,
      industry_sector: val.industry_sector,
      employee_count: val.employee_count,
      company_remarks: val.company_remarks,
      gst_applicable: val.gst_applicable,
      gst_number: val.gst_number,
      pan_number: val.pan_number,
      tan_number: val.tan_number,
      open_house_start_date: this.singleLeadData.open_house_start_date,
      open_house_end_date: this.singleLeadData.open_house_end_date,
      // contact_review_form:val.contact_review_form,
      // gst_file:val.gst_file,
      // basic_form:val.basic_form,
      // company_logo:val.company_logo,
      // other_file: val.other_file,
      // document_remark: val.document_remark,
      status: 'Opportunity',
    };

    console.log('dataMain', dataMain)
    
   
    this.leadService.editLead(this.lead_id, dataMain).subscribe((res: any) => {
      
      this.addOpenHouse();
      // this.toast.success(' Updated Successfully..');
      // this.route.navigate(['master/lead/lead-account/open-house-list'], {
      //   queryParams: { lead_id: this.lead_id },
      // });
    });

    const data = {
      contact_review_form: this.fileDetails.file,
      gst_file: this.fileDetailsOne.file,
      basic_form: this.fileDetailsTwo.file,
      company_logo: this.fileDetailsThree.file,
      other_file: this.fileDetailsFour.file,
      document_remark: val.document_remark,
    }
    
if(data.contact_review_form){
  this.leadService.editLeadDoc(this.lead_id, data).subscribe((res: any) => {
    
    this.toast.success(' Updated Successfully..');
    this.route.navigate(['master/lead/lead-account/open-house-list'], {
      queryParams: { lead_id: this.lead_id },
    });
  });
}
 
  }

  regionalBusiness() {
    this.leadService.getListBusiness().subscribe((res: any) => {
      
      this.allDataTwo = res.data;
    });
  }

  addOpenHouse() {
    let val = this.leadForm.value;
    
    const data = {
      lead_genration_id: Number(this.lead_id),
      program_title: val.non_cert_type,
      program_name: val.product_request,
      open_house_start_date:this.singleLeadData.open_house_start_date,
      open_house_end_date: this.singleLeadData.open_house_end_date,
      no_of_days: val.no_of_days,
      venue: val.venue,
      program_organizer: val.associated_company,
      br_number: val.br_number,
      program_cost: val.program_cost,
      program_location: val.state_name,
      created_by: val.lead_created_by_name,
      created_date: moment(val.created_date).format('YYYY-MM-DD'),
      lead_source: val.dqs_contact_source,
      status:"Open"
    }
    this.leadService.createOpenHouse(data).subscribe((res:any) => {
      
      // this.route.navigate(["master/lead/lead-management/assign-lead"]),
      this.toast.success("Open House Training Created Successfully..");
      this.route.navigate(['master/lead/lead-account/open-house-list'], {
        queryParams: { lead_id: this.lead_id },
      });
    })
  }

 
  // add participant table

  public columnDefs = [

    {
      headerName: 'S no',
      // valueGetter: "node.rowIndex + 1",
      field:"add_participant_id",
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: "grid-cell-centered",
      flex:1,
      minWidth:150,
      editable:true,
    },
    {
      headerName: 'Participant Name',
      field: 'participant_name',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: "grid-cell-centered",
      flex:1,
      minWidth:150,
      editable:true,
    },
    {
      headerName: 'Email ID',
      field: 'email_id',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: "grid-cell-centered",
      flex:1,
      minWidth:150,
      editable:true,
    },
    {
      headerName: 'Contact Number',
      field: 'contact_number',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: "grid-cell-centered",
      flex:1,
      minWidth:150,
      editable:true,
    },
    {
      headerName: 'Program Cost',
      field: 'program_cost',    
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: "grid-cell-centered",
      flex:1,
      minWidth:155,
      editable:true,
    },
    {
      headerName: 'Disccount %',
      field: 'discount_percentage',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: "grid-cell-centered",
      flex:1,
      minWidth:150,
      editable:true,
    },
    {
      headerName: 'final fee After Discount',
      field: 'final_fee_after_discount',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: "grid-cell-centered",
      flex:1,
      minWidth:150,
      editable:true,
    },
    {
      headerName: 'GST 18%',
      field: 'gst_percentage',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: "grid-cell-centered",
      flex:1,
      minWidth:150,
      editable:true,
    },
    {
      headerName: 'Total Cost (after Taxes)',
      field: 'total_cost_after_taxes',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: "grid-cell-centered",
      flex:1,
      minWidth:150,
      editable:true,
    },  {
      headerName: 'Advance fee collected',
      field: 'advance_fee_collected',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: "grid-cell-centered",
      flex:1,
      minWidth:150,
      editable:true,
    },  {
      headerName: 'Advance %',
      field: 'advance_percentage',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: "grid-cell-centered",
      flex:1,
      minWidth:150,
      editable:true,
    },  {
      headerName: 'Payment Details',
      field: 'payment_details',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: "grid-cell-centered",
      flex:1,
      minWidth:150,
      editable:true,
    },  
    {
      headerName: 'Promis to pay Date',
      field: 'promise_to_pay_date',
      // cellRenderer: OpenHouseRegCreateComponent,
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: "grid-cell-centered",
      cellRenderer: 'agGroupCellRenderer',
      flex:1,
      minWidth:150,
      editable:true,
    }
    
  ];
//   rowData:any=[
//     {participant_name:'aaa',
//     email_id:'ww',
//     contact_number:'wwww',
//     program_cost:'uu',
//     disccount:'ggggg',
//     final_fee_after:'iii',
//     gst:'eee',
//     total_cost:'wwww',
//     advance_fee_collected:'wwwww',
//     advane:'ddddd',
//     payment_details:'ffffffffffff',
//  promis_to_pay_date:'fff'},

//  {participant_name:'aaa',
//     email_id:'ww',
//     contact_number:'wwww',
//     program_cost:'uu',
//     disccount:'ggggg',
//     final_fee_after:'iii',
//     gst:'eee',
//     total_cost:'wwww',
//     advance_fee_collected:'wwwww',
//     advane:'ddddd',
//     payment_details:'ffffffffffff',
//  promis_to_pay_date:'fff'}
        
//   ]


  onCellClicked(e:any){
    
    this.route.navigate(['master/lead/lead-account/customer-account'],
        { queryParams: { lead_id:e.data.add_participant_id } }
      ); 
  }
 

  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;
    

    
    
 }

addparticipantSubmit(){
  this.addormData=this.leadForm.value;
  

  this.dataParticipant={
    lead_genration_id:this.lead_id,
    participant_name: this.addormData.participant_name,
    email_id: this.addormData.email_id,
    // countryss_name: this.addormData.countryss_name,
    contact_number: this.addormData.contact_number,
    program_cost: this.addormData.program_cost,
    discount_percentage: this.addormData.disccount,
    final_fee_after_discount: this.addormData.final_fee_after,
    gst_percentage: this.addormData.gst,
    total_cost_after_taxes: this.addormData.total_cost,
    advance_fee_collected: this.addormData.advance_fee_collected,
    advance_percentage: this.addormData.advane,
    payment_details: this.addormData.payment_details,
    promise_to_pay_date:moment(this.addormData.promis_to_pay_date).format('YYYY-MM-DD')
  }

  
  
  this.leadService.createAddParticipants(this.dataParticipant).subscribe((res:any)=>{
    
    this.toast.success('Add praticipant Created Successfully');
    this.clearInput()
    this.getByAddParticipants();
    
  })

  
}
clearInput() {
  // Clear the input field
  this.leadForm.get('participant_name')?.reset();
  this.leadForm.get('email_id')?.reset();
  this.leadForm.get('contact_number')?.reset();
  this.leadForm.get('program_cost')?.reset();
  this.leadForm.get('disccount')?.reset();
  this.leadForm.get('final_fee_after')?.reset();
  this.leadForm.get('gst')?.reset();
  this.leadForm.get('total_cost')?.reset();
  this.leadForm.get('advance_fee_collected')?.reset();
  this.leadForm.get('advane')?.reset();
  this.leadForm.get('payment_details')?.reset();
  this.leadForm.get('advane')?.reset();
  this.leadForm.get('promis_to_pay_date')?.reset();
}
getByAddParticipants(){
  this.leadService.getByAddParticipant(this.lead_id, this.addParticipantId).subscribe((res:any)=>{
    this.rowData=res.data;
    
    
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
}
  


  

