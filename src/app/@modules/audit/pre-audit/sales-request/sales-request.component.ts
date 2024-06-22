import { Component, ViewChild } from '@angular/core';
import {FormBuilder, FormControl,FormGroup, Validators,} from '@angular/forms';
import { MatOption } from '@angular/material/core';
import { MatSelect } from '@angular/material/select';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { EmpRegistrationService } from 'src/app/@shared/services/emp-registration.service';
import { LeadService } from 'src/app/@shared/services/lead.service';
import { RecruitService } from 'src/app/@shared/services/recruitment.service';
import { ConfigurationalmasterService } from '../../../../@shared/services/configurationalmaster.service';
import { SalesRequestService } from 'src/app/@shared/services/salesrequest/sales-request.service';
import { MatDialog } from '@angular/material/dialog';
import { Location } from '@angular/common'
import { AuditorEvaluationService } from 'src/app/@shared/services/auditor-evaluation/auditor-evaluation.service';
@Component({
  selector: 'app-sales-request',
  templateUrl: './sales-request.component.html',
  styleUrls: ['./sales-request.component.scss']
})
export class SalesRequestComponent {
  checked = false;
  indeterminate = false;
  labelPosition: 'child' | 'parent' = 'parent';
  disabled = false;
  @ViewChild('productselect') productselect: MatSelect;
  leadAuditorNames: string;
  items = ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5'];
  expandedIndex = 0;
  leadForm: FormGroup;
  allSelectedProduct = false;
  nonFormFields: boolean = false;
  gstFormFields: boolean = false;
  logoFormFields: boolean = false;
  basicFormFields: boolean = false;
  otherFormFields: boolean = false;
  // otherFormFields:boolean=false;
  panelOpenState = false;

  medical: boolean = false;
  jobType: any;
  candidateArray: any;
  interviewGetId: any;
  candidateId: any;
  standardList: any;
  errorMsg: string = '';
  id: any;
  interview_id: any;
  clicked: boolean = false;
  cutomerType: boolean = false;
  sitAudit: boolean = false;
  lead_id: any;
  singleLeadData: any;
  openDate: boolean = false;
  myFiles: any;
  fileList: any;
  val: any;
  public searchResult: any;
  mainId: string | null;
  mainEmployeeData: any;
  allAchievement: any;
  stateList: any[] = [];
  countryList: any[] = [];
  auditorDATA: any;
  cityList: any;
  pinCodeList: any;
  pinCodeTrue: boolean = true;
  allDataOne: any;
  allDataTwo: any;
  allDataMan: any;
  newProductData: any[] = [];
  categoryList: any;
  submitted: boolean;
  unreg: boolean = false;
  gstreg: boolean = false;
  nonCertt: boolean = false;
  childData: any;
  childBlock: boolean = false;
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
  assignTo: any;
  opportunityById: any;
  msaTrue: boolean = false;
  certificateList: any;
  regionSList: any;
  CategorySList: any;
  regionalbheadList: any;
  globalMsalesList: any;
  assesmentList: any;
  segmentList: any;
  gstvalidation: boolean = false;
  seg_name: any;
  nonCertTrue: boolean = false;
  singleLeadData1: any;
  inputReadonly = true;
  ownerData: any;
  ownerName: any;
  assignData: any;
  asignName: any;
  contact_list: any;
  salseRequest: any;
  auditorData: any;
  auditorName: any;
  selectedAuditor: any;
  currentDate = new Date();
  Lead_id: any;
  Br_list: any;
  Br_Data: any;
  parentValue: any;
  newLocation_id: any;
  BR: any;
  parentData: any;
  eacodeData: any;
  statndardData: any;
  getNamesAuditor: any;
  type: string;
  BookedAuditorList: any;
  saleRequestData: any;
  RequestAuditorList: any;
  segment_id: any;
  br_number: any;
  BRNumber: any;
  accri_list: any;
  productName: any;
  accridationName: any;
  EACodeName: any;
  auditorList: any;
  salesRequestformArray: FormData[] = [];
  bothView:boolean= false;
  onlyParentOrChildView:boolean = false;
  radioSelected:any;
  buttonDisable:boolean = false;

  constructor(
    private auditorEvaluation:AuditorEvaluationService,
    private _location: Location,
    private _configurationalMasterService: ConfigurationalmasterService,
    public dialog: MatDialog,
    private salesRequest_: SalesRequestService,
    private fb: FormBuilder,
    private leadService: LeadService,
    private route: Router,
    private toast: ToastrService,
    private configService: ConfigurationalmasterService,
    private _empRegistration: EmpRegistrationService,
    private recruitService: RecruitService,
    private activeroute: ActivatedRoute
  ) {
    this.activeroute.queryParams.subscribe((res: any) => {
      this.Lead_id = res.lead_id,
        this.BRNumber = res.br
    })
    this.leadForm = this.fb.group({
      customer_type: [{ value: '', disabled: true }, Validators.required],
      site_audit: [{ value: '', disabled: true }, Validators.required],
      new_location_site: new FormControl(null),
      associated_company: new FormControl(null),
      br_number: new FormControl(null),
      lead_created_by_name: new FormControl(null),
      segment: new FormControl(null),
      certificate_type: new FormControl(null),
      first_name: new FormControl(null),
      last_name: new FormControl(null),
      urd_number: new FormControl(null),
      email: new FormControl(null, [
        Validators.required,
        Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
      ]),
      categories: new FormControl(null),
      emplyoment_type: new FormControl(null),
      job_title: new FormControl(null),
      street_address: new FormControl(null),
      address2: new FormControl(null),
      city: new FormControl(null),
      state: new FormControl(null),
      billing_site: new FormControl(null),
      bill_send_site: new FormControl(null),
      country: new FormControl(null),
      postal_code: new FormControl(null),
      region: new FormControl(null),
      regional_bussiness_lead: new FormControl(null),
      global_managing_director: new FormControl(null),
      global_manager_sales: new FormControl(null),
      website_url: new FormControl(null),
      phone_number: new FormControl(null),
      mobile_number: new FormControl(null, [
        Validators.required,
        Validators.maxLength(10),
        Validators.pattern('^[0-9]*$'),
        Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$'),
      ]),
      dqs_contact_source: new FormControl(null),
      contact_owner: new FormControl(null),
      lead_created_date: new FormControl(null),
      standard_program_assement: new FormControl(null),
      remarks: new FormControl(null, Validators.required),
      lead_validate_stage: new FormControl(null),
      validated_by: new FormControl(null),
      lead_validated_date: new FormControl(null),
      lead_validate_remarks: new FormControl(null, Validators.required),
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
      contact_review_form: new FormControl(null, Validators.required),
      gst_file: new FormControl(null, Validators.required),
      basic_form: new FormControl(null, Validators.required),
      company_logo: new FormControl(null, Validators.required),
      other_file: new FormControl(null),
      document_remark: new FormControl(null),
      customer_sales_executive: new FormControl(null, Validators.required),
      assigned_to: new FormControl(null, Validators.required),
      opportunity_type: new FormControl(null, Validators.required),
      product_request: new FormControl(null, Validators.required),
      non_cert_type: new FormControl(null),
      open_house_start_date: new FormControl(null),
      open_house_end_date: new FormControl(null),
      phone_code: new FormControl(),
      mobile_code: new FormControl()
    });
    this.salseRequest = this.fb.group({
      specific_auditor: new FormControl(null, Validators.required),
      program: new FormControl(), 
      eaCode: new FormControl(),
      Accridation_log: new FormControl(),
    })
    this.salesRequestformArray.push(new FormData());
  }

  ngOnInit() {
    this.activeroute.queryParams.subscribe((params) => {
      this.id = params;
      this.lead_id = this.id.lead_id;
      this.salesRequest(this.lead_id)
      this.leadService.getByIdChildLead(this.lead_id).subscribe((res: any) => {
        this.childData = res.data;
        if (this.childData.length === 0) {
          this.childBlock = true;
        }
      });

      this.leadService.getByIdLead(this.lead_id).subscribe((res: any) => {
        this.singleLeadData = res.data;
        this.br_number = res.data.br_number

        this.patchFormvalue5(res.data.segment)
        this.segment_id = res.data.segment
        this.patchFormvalue()
        if (this.singleLeadData?.export === 'Export Wise') {
          this.gstvalidation = false;
        }
        if (this.singleLeadData?.certificate_type_name === 'Non-Cert') {
          this.nonCertTrue = false;
        } else {
          this.nonCertTrue = true;
        }
        this.nonCertFunc();
        this.patchFormvalue();   
        this.getSalesRequestDataByLead()
      });
      this.leadService.getByIdLeadId(this.lead_id).subscribe((res: any) => {
        let x = res.data.map((a: any) => {
          return { ...a, checked: false };
        });
        this.singleLeadData1 = x;
      });
    });
    this.getAchievementList();
    this.getAllSegment();
    this.patchFormvalue();
    this.getCategory();
    this.getCountry();
    this.getAchievementListt();
    this.regionalBusiness();
    this.globalManagerales();
    this.get_cp_contact();
    this.getAuditor();
    this.getEacode();
    this.getallspa();
    this.mainId = localStorage.getItem('EmpMainId');
    if (this.mainId == undefined) {
      this._empRegistration.getByUserId(this.mainId).subscribe((res) => {
        this.mainEmployeeData = res.data;
        this.getAchievementList();
        this.patchFormvalue();
      });
    }
    this.getStandardProgram();
    this.getAccrediationlogo()
    this.assignFormPatch();
    this.getBRList(this.Lead_id)
    this.getParentData(this.Lead_id);
  }
  getAuditorList(product:any,accridation:any,eaCode:any){
    if(product.length==0){
      this.auditorList=null
    }
    else if(accridation==null){
      this.auditorList=null
    }
    else if(eaCode.length==0){
      this.auditorList=null

    }
    const data={
      standard_audit:product,
      sector_audit:eaCode,
      accredition_audit:accridation,
    }
    this.auditorEvaluation.getAll_auditorMapping(data).subscribe((res:any)=>{
      this.auditorList=res.data
      console.log(this.auditorList,"auditor list");
    },
    (err:any)=>{
      this.salseRequest.get('specific_auditor').reset();
      console.log("reset");
      
      this.toast.error("Auditor Not found")
    })
  }
  getAccrediationlogo() {
    this._configurationalMasterService.getAccrediationlogo().subscribe((res: any) => {

      // this.accri_list = res.data;
      const filter_Accri = res.data.filter((res: any) => [
        res.status = "ACTIVE"
      ])
      this.accri_list = filter_Accri


    },
      (err: any) => {
        this.toast.error("Accridation Details not found")
      })
  }
  patchFormvalue5(id: any) {
    console.log(id, "jkjkjkjkj");

    if (this.singleLeadData?.segment != 'null || undefined') {
      this.leadService
        .getCertificateByID(id)
        .subscribe((res: any) => {
          this.certificateList = res.data.new_certificate_types;
        });
      this.leadService
        .getRegionByID(id)
        .subscribe((res: any) => {
          this.regionSList = res.data.new_regions;
        });
      this.leadService
        .getCategoryBySegID(id)
        .subscribe((res: any) => {
          this.CategorySList = res.data.new_category_masters;

        });
    }
  }
  getBRList(id: any) {
    this.salesRequest_.getData_byBR(id).subscribe((res: any) => {
      console.log(res, "br dddd");
      // this.salesRequest_.getBR_byID()
      this.Br_list = res.data[0]?.newLocations
      console.log(this.Br_list, "br List");
      this.newLocation_id = res.data[0]?.newLocations.new_location_id
      console.log(this.Br_list[0]?.newLocations, "br list");
    })
  }
  getData_br(e: any) {

    this.BR = e.value
    this.salesRequest_.getBR_byID(e.value).subscribe((res: any) => {
      this.Br_Data = res.data
      console.log(this.Br_Data, "br Data");
      this.salseRequest.patchValue({
        client_name: this.Br_Data[0].first_name,
        br_number: this.BR,
        City: this.Br_Data[0].city_name,
        state: this.Br_Data[0].state_name,
        country: this.Br_Data[0].country,

      })
    }),
      [this.newLocation_id] = this.Br_list.filter((res: any) => res.br_number == this.BR).map((res: any) => res.new_location_id)
    console.log(this.newLocation_id, "new locatin");

    // this.patchValueFun(this.Br_Data);

  }
  goBack() {
    this._location.back();
    // this.route.navigate(['back']);
  }
  getParentData(id: any) {

    this.salseRequest.get('request_audit_date').setValue(this.currentDate);
    this.salesRequest_.getParentData(id).subscribe((res: any) => {
      this.parentData = res.data
      console.log(this.parentData, "parentData");
      this.salseRequest.patchValue({
        City: this.parentData[0].city_name,
        client_name: `${this.parentData[0].first_name} ${this.parentData[0].last_name}`,
        country: this.parentData[0].country_name,
        state: this.parentData[0].state_name,
        br_number: this.parentData[0].br_number,

      })
    })
  }

  addDataToForm(salesRequestState: string) {
    this.salesRequestformArray = []
    this.salesRequest_.getParentData(this.Lead_id).subscribe((res: any) => {
      this.parentData = res.data;
      const newData: FormData = {
        request_audit_date: new Date(),
        site: 'onSite',
        br_number:this.parentData[0].br_number,
        City: this.parentData[0].city_name,
        client_name: `${this.parentData[0].first_name} ${this.parentData[0].last_name}`,
        Country: this.parentData[0].country_name,
        State: this.parentData[0].state_name,
        man_days: 0,
        service: '',
        remarksSale: '',
        expected_date:null,
        new_location_id:null,
        sales_program:null,
        sales_EACode:null,
        sales_request_state:salesRequestState,
        stage_for_sales_request: [],
        expected_date_s2:null,
        man_days_S2:null,
      };
      this.salesRequestformArray.push(newData);
    })
  
  }
  

  assignFormPatch() {
    this.salseRequest.patchValue({
      request_audit_date: this.currentDate

    })
  }
  getAuditor() {
    this.configService.getAuditor().subscribe((res: any) => {
      console.log(res.data, "res test");
      this.auditorName = res.data
      console.log(this.auditorName);
    })
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
  medicalFlow(e: any) {
    const segment_id = e.value;
 
    this.leadService.getCertificateByID(segment_id).subscribe((res: any) => {


      this.certificateList = res.data.new_certificate_types;
    });

    this.leadService.getRegionByID(segment_id).subscribe((res: any) => {
      this.regionSList = res.data.new_regions;
    });

    this.leadService.getCategoryBySegID(segment_id).subscribe((res: any) => {
      this.CategorySList = res.data.new_category_masters;
    });

    if (e.value === 'MED') {
      this.medical = true;
    } else {
      this.medical = false;
    }
  }

  certificateChange(event: any) {
    const certi_id = event.value;


    let certificate_value1;
    this.certificateList.forEach((item: any) => {

      if (certi_id === item.certificate_type_id) {
        certificate_value1 = item.certificate_type_name;
      }
    });


    if (certificate_value1 === 'Non-Cert') {
      this.leadForm.patchValue({
        site_audit: 'No',
      });
    } else {
      this.leadForm.patchValue({
        site_audit: 'Yes',
      });
    }

    this.leadService.getAssesmentByID(certi_id).subscribe((res: any) => {

      this.assesmentList = res.data[0].newitemlist;

    });

    if (event.value === 'Non Cert') {
      this.sitAudit = true;
    } else {
      this.medical = false;
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
  formFieldsRequired() {
    let val = this.leadForm.value;


    if (val.contact_review_form === null) {
      this.nonFormFields = true;
      // alert("Please update the field...")
    } else {
      this.nonFormFields = false;
    }

    if (val.gst_file === null) {
      this.gstFormFields = true;
      // alert("Please update the field...")
    } else {
      this.gstFormFields = false;
    }

    if (val.company_logo === null) {
      this.logoFormFields = true;
      // alert("Please update the field...")
    } else {
      this.logoFormFields = false;
    }

    if (val.basic_form === null) {
      this.basicFormFields = true;
    } else {
      this.basicFormFields = false;
    }
    if (val.other_file === null) {
      this.otherFormFields = true;
    } else {
      this.otherFormFields = false;
    }
  }
  openHouse() {
    this.openDate = true;
  }
  closeHouse() {
    this.openDate = false;
  }

  nonCertFunc() {
    if (this.singleLeadData?.certificate_type == 'Non Cert') {
      this.nonCertt = true;
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

  getAchievementList() {
    this.recruitService.getAllAchivement().subscribe(
      (res: any) => {

        this.allAchievement = res.data;
      },
      (err) => {

      }
    );
  }

  candidateClick(e: any) {

    this.candidateId = e;
    this.recruitService.interViewGetIdBy(e).subscribe((res: any) => {
      this.interviewGetId = res.data;

      this.patchFormvalue();
    });
  }



  patchFormvalue() {
    console.log(this.segment_id, "seg id");


    this.checkUnreg();
    if (this.singleLeadData?.segment_name === 'MED') {
      this.msaTrue = true;
    }
    if (this.singleLeadData?.segment_name === 'MSA') {
      this.msaTrue = false;
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
          this.patchCountryCode(this.singleLeadData?.country);
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
    if (this.singleLeadData?.certificate_type != 'undefined || null') {
      this.leadService
        .getAssesmentByID(this.singleLeadData?.certificate_type)
        .subscribe((res: any) => {

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
      contact_owner: this.singleLeadData?.contact_owner,
      lead_created_by_name: this.singleLeadData?.lead_created_by_name,
      validated_by: this.singleLeadData?.validated_by,
      emplyoment_type: this.singleLeadData?.emplyoment_type,
      street_address: this.singleLeadData?.street_address,
      job_title: this.singleLeadData?.job_title,
      address2: this.singleLeadData?.address2,
      non_cert_type: this.singleLeadData?.non_cert_type,
      city: this.singleLeadData?.city,
      categories: this.singleLeadData?.categories,
      urd_number: this.singleLeadData?.urd_number,
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
      lead_assgn_contact_owner: this.singleLeadData?.lead_assgn_contact_owner,
      assigned_by: this.singleLeadData?.assigned_by,
      assigned_date: this.singleLeadData?.assigned_date,
      stage: this.singleLeadData?.stage,
      lead_assgn_remark: this.singleLeadData?.lead_assgn_remark,
      phone_code: this.singleLeadData?.userrespectiveleads[0]?.phone_code,

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
  get_cp_contact() {
    this.leadService.get_contact().subscribe(
      (res: any) => {
        this.contact_list = res.data;

      }, (err) => {

      }
    )
  };
  customerTypeNew() {
    this.cutomerType = false;
  }
  getCategory() {
    this.configService.listCategory().subscribe((res: any) => {
      this.categoryList = res.data;

    });
  }

  getAllSegment() {
    this.configService.getAllSegment().subscribe((res: any) => {
      this.segmentList = res.data;

    });
  }

  getCountryID(e: any) {

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
    this.mainId = localStorage.getItem('EmpMainId');
    console.log(this.salesRequestformArray);

    const additionalData = {
      "lead_genration_id": this.Lead_id,
      "specific_auditor": this.selectedAuditor,
      "program": this.salseRequest.value.program,
      "eaCode": this.salseRequest.value.eaCode,
      "status": "sales_request",
      "Accridation_log": this.salseRequest.value.Accridation_log,
      "employee_id":this.mainId
    };
    
    const newData = this.salesRequestformArray.map((item) => ({ ...item, ...additionalData }));
    console.log(newData);

    this.salesRequest_.createSalesRequest(newData).subscribe((res: any) => {
      this.goBack();
      const data = {
        lead_genration_id: this.Lead_id,
        br_number: this.br_number,
        new_location_id: this.newLocation_id,
        Sales_Request: true
      }
      this.leadService.create_Status(data).subscribe((res: any) => {

      })
      this.toast.success("Sales Request Successfully")
    });
  }
  cancel() {
    window.location.reload();
  }
  getStandardProgram() {
    this.configService.listAsses().subscribe((res: any) => {

      this.standardList = res.data;

    });
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
  assigneOppotunityto(e: any) {
    //change by vrajesh

    this.opportunityById = e.value.employee_id;
    this.assignTo = e.value.first_name;
  }

  public toggleInputReadonly() {
    this.inputReadonly = !this.inputReadonly;
  }

  wnerClick(e: any) {
  }
  AuditorList(){
  }

  assignClick(e: any) {

    this.assignData = e.employee_id;
    this.asignName = e.first_name;

  }
  salesChange() {
    this.salseRequest.patchValue({
      specific_auditor: this.selectedAuditor
    })
    console.log(this.salseRequest);

  }
  EA_code(e:any){
    this.EACodeName=e.value
  }
  allAuditor(e: any) {
    console.log(e, "eeeee");
    this.accridationName=e.value
    const filterAuditor = this.auditorName.filter((res: any) => e.value.includes(res.audit_qualification_id))
      .map((item: any) => ({ id: item.audit_qualification_id, name: item.auditor_first_name }));
    console.log(filterAuditor, "au");
    this.selectedAuditor = filterAuditor

  }


  siteCheckFun(e: any) {
    this.parentValue = e.value;
    this.bothView = false;
    this.onlyParentOrChildView = true;
    if (this.parentValue == "parent") {
      this.salseRequest.reset()
      this.type = 'parent'
      this.getParentData(this.lead_id)
    }
    else {
      this.salseRequest.reset()
      this.type = 'parent'
      this.salseRequest.get('request_audit_date').setValue(this.currentDate);
    }
  }

  salesRequestChange(e:any){
    this.salesRequestformArray = []
    if(e.value == 'both'){
      this.onlyParentOrChildView = false;
      this.bothView = true;
      this.addDataToForm('both');
      this.addDataToFormByBrNumbers('both');
    }else if (e.value == 'parent'){
      this.onlyParentOrChildView = true;
      this.bothView = false;
      this.addDataToForm('parent');
    }else{
      this.onlyParentOrChildView = false;
      this.bothView = true;
      this.addDataToFormByBrNumbers('child')
    }
  }

  getEacode() {
    this._configurationalMasterService.getEacode().subscribe((res: any) => {
      this.eacodeData = res.data;
      console.log(this.eacodeData, 'this.eacodeData');


    })
  }
  getallspa() {
    this._configurationalMasterService.allProductList().subscribe((params: any) => {
      this.statndardData = params.data;
      console.log(this.statndardData, 'this.statndardData');

    });
  }
  addrow(){
    this.getAuditorList(this.productName,this.accridationName,this.EACodeName)

  }
  programFun(e: any) {
    console.log(e, "eeee");
    this.productName=e.value
    let data = {
      auditor_standard: e.value
    }
    this._configurationalMasterService.getAuditorName(data).subscribe((res: any) => {
      this.getNamesAuditor = res.data

    })
    // this.auditorsNames
  }

  salesRequest(id: any) {
    this.salesRequest_.auditorList_idwise(id).subscribe((res: any) => {
      this.RequestAuditorList = res.data;
      console.log(this.RequestAuditorList, 'auditor List');
    })
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

  addDataToFormByBrNumbers(salesRequestState: string) {
    console.log(this.Br_list,"BR List");
    
    this.Br_list.forEach((brData:any) => {
      this.salesRequest_.getBR_byID(brData.br_number).subscribe((res: any) => {
        this.Br_Data = res.data
        const formData: FormData = {
          site:'onSite',
          request_audit_date: this.currentDate,
          client_name: this.Br_Data[0].first_name,
          br_number: brData.br_number,
          City: this.Br_Data[0].city_name,
          State: this.Br_Data[0].state_name,
          Country: this.Br_Data[0].country_name,
          man_days: 0,
          service: '',
          remarksSale: '',
          expected_date:null,
          sales_program:null,
          sales_EACode:null,
          new_location_id:brData.new_location_id,
          sales_request_state:salesRequestState,
          stage_for_sales_request:[],
          expected_date_s2:null,
          man_days_S2:null,
        }
        this.salesRequestformArray.push(formData);
        console.log(this.salesRequestformArray,'salesRequestformArray');
        
      });
    });
  }

  getSalesRequestDataByLead() {
    this.mainId = localStorage.getItem('EmpMainId');
    const data = {
      lead_generation_id: this.lead_id,
      employee_id: this.mainId
    };
    this.salesRequest_.getSalesRequestData(data).subscribe(res => {
      if (res && res.data && res.data.length > 0) {
        this.toast.warning('Seals request already created for this')
        this.buttonDisable = true;
        this.salesRequestformArray = res.data;
        const firstData = res.data[0];
        this.radioSelected = firstData.sales_request_state;
        this.bothView = this.radioSelected === 'both';
        this.onlyParentOrChildView = !this.bothView;
        this.getAuditorList(firstData.program, firstData.Accridation_log, firstData.eaCode);
        this.salseRequest.patchValue({
          specific_auditor: firstData.specific_auditor.id,
          program: firstData.program,
          eaCode: firstData.eaCode,
          Accridation_log: firstData.Accridation_log,
        });
      } else {
        this.radioSelected = 'parent';
        this.addDataToForm('parent');
        this.onlyParentOrChildView = true;
      }
    }); 
  }

  sendNotification(){
    let data = {
      lead_generation_id: this.lead_id,
    }
    this.salesRequest_.sendNotificationForSalesRequest(data).subscribe(res =>{
      if(res){
        this.toast.success('Notification resend to planning team sucessfully.')
      }
    })
  }

}

export class FormData {
  br_number:number;
  request_audit_date: any;
  site: string;
  client_name: string;
  Country: string;
  State: string;
  City: string;
  expected_date: any;
  man_days: number;
  service: string;
  remarksSale: string;
  new_location_id:any;
  sales_request_state:any;
  sales_EACode:any;
  sales_program:any;
  stage_for_sales_request: string[] = [];;
  expected_date_s2:any
  man_days_S2:any
}
