


import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatOption } from '@angular/material/core';
import { MatSelect } from '@angular/material/select';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { EmpRegistrationService } from 'src/app/@shared/services/emp-registration.service';
import { LeadService } from 'src/app/@shared/services/lead.service';
import { RecruitService } from 'src/app/@shared/services/recruitment.service';
import { ConfigurationalmasterService } from '../../../../../@shared/services/configurationalmaster.service';
import { NotificationServiceService } from 'src/app/@shared/services/notification/notification-service.service';
import { AuditorEvaluationService } from 'src/app/@shared/services/auditor-evaluation/auditor-evaluation.service';
import { MatDialog } from '@angular/material/dialog';
import { BookingDateComponent } from '../booking-date/booking-date.component';
import { MatCalendar } from '@angular/material/datepicker';
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
  selector: 'app-work-order-create',
  templateUrl: './work-order-create.component.html',
  styleUrls: ['./work-order-create.component.scss'],
  encapsulation: ViewEncapsulation.None,
  // standalone: true,
  // imports: [MatFormFieldModule, MatInputModule, MatNativeDateModule, MatDatepickerModule],
})
export class WorkOrderCreateComponent {
  @ViewChild('calendar') calendar: MatCalendar<any>;

  br2: any;
  daysSelected: any[] = [];
  daysSelectedTwo: any[] = [];
  daysSelectedThree: any[] = [];
  daysSelectedFour: any[] = [];
  daysSelectedFive: any[] = [];
  daysSelectedSix: any[] = [];
  parentSide: boolean;
  br1: any;
  endDate = new FormControl();
  @ViewChild('coauditor') coauditor: MatSelect;
  displayedColumns: string[] = ['account_name', 'br_number'];
  dataSource = ELEMENT_DATA;
  leadForm: FormGroup;
  jobType: any;
  auditorName: any;
  allCoAuditor = false;
  auditorDATA: any;
  candidateArray: any;
  interviewGetId: any;
  candidateId: any;
  id: any;
  stageData: any;
  interview_id: any;
  clicked: boolean = false;
  cutomerType: boolean = false;
  sitAudit: boolean = false;
  lead_id: any;
  gstvalidation: boolean = false;
  singleLeadData: any;
  myFiles: any;
  fileList: any;
  allAchievement: any;
  errorMsg: string = '';
  auditOpen: boolean = false;
  viewCalenderData: any[] = [];
  // event: any;
  //for filter start
  variables: any = [];
  variable: any = [];
  public filteredList1 = this.variables.slice();
  filterData: any = [];
  checkData: any = []
  //for filter end

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
    br_number: any, expense_category: any; customer_type: any; assigned_to: any; categories: any; site_audit: any; associated_company: any; segment: any; certificate_type: any; first_name: any; last_name: any; email: any; emplyoment_type: any; job_title: any; street_address: any; address2: any; city: any; state: any; country: any; postal_code: any; region: any; regional_bussiness_lead: any; global_managing_director: any; global_manager_sales: any; website_url: any; phone_number: any; mobile_number: any; dqs_contact_source: any; contact_owner: any; lead_created_date: string; standard_program_assement: any; remarks: any;
    add_cert_copy: any; accredition_logo_details: any; lead_validate_stage: any; validated_by: any; lead_validated_date: string; lead_validate_remarks: any; lead_assgn_contact_owner: any; assigned_by: any; stage: any; lead_assgn_remark: any; industry_sector: any; employee_count: any; company_remarks: any; gst_applicable: any; gst_number: any; pan_number: any; tan_number: any; product_request: any; customer_sales_executive: any; opportunity_type: any; opportunity_ref: any; billing_site: any; no_of_mandays: any; ea_code: any; assessment_period: any; opp_verifier_name_level1: any; opp_verified_date_level1: string;
    opp_verified_remarks_level1: any; reject_remarks_a: any; reject_remarks_b: any; opp_verifier_name_level2: any; opp_verified_date_level2: string; opp_verified_remarks_level2: any; quotation_currency: number; slab_quote: any; logo_cost: any; quote_prepared: any; quote_prepared_date: string; status: string; company_logo_req: any; company_logo_cost: any;
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
    locked_status: any;
    training_remarks: any;
    approval_by: any;
    site_selected: any;
    travel_type: any;
    task_order_category: any;
    billing_site_copy: any,
  };
  panelOpenState = false;
  panelOpenStateC = false;

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
  unreg: boolean = false;
  gstreg: boolean = false;
  auditorBlock: boolean = false;
  auditorData: any[] = [];
  now = new Date();

  year = this.now.getFullYear();
  month = this.now.getMonth();
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
  notification_data: any;
  auditorList: any;
  cf: any;
  leadAuditor_ids: any;
  trainee_id: any;
  candidate_id: any;
  technical_id: any;
  witness_id: any;
  ty: any[];
  leadAuditor_name: any;

  variables_: any;
  checkData_: any;
  variable_: any;
  singleLeadData1: any;
  childSide: boolean;
  child_br_number: any;
  billingData: any;
  billingDataCopy: any;
  co_auditor_ids: any;
  auditorlist: any;
  co_auditor_name: any;
  interCompanyStatus: any;
  trainee_auditor_ids: any = [];
  tech_auditor_ids: any;
  candi_auditor_ids: any;
  witn_auditor_ids: any;
  product_amounts: any;
  id_: any;
  br_: any;
  work_order_id: any;
  sendDataDialog: any = [];
  accri: any;
  prod: any;
  ea_code: any;
  prods: any;
  ea_codes: boolean;
  leadAuditor_valid: any;
  trainee_valid: any;
  candidate_valid: any;
  technical_valid: any;
  witness_valid: any;
  dialogData: any;
  auditorForm: any;
  auditorType: any;
  auditorTypess: any;
  index: any;
  comming: any[] = [];
  predate: any[];
  auditors: any;
  side: string = 'front';
  BrList: any = []
  SrNo: any;
  filterData_: any;
  filterLocation: any;
  stage: any;
  receivedMandays: any;
  WO_id: any;
  // side: string='front';
  constructor(
    public dialog: MatDialog,
    private _auditor: AuditorEvaluationService,
    private _notification: NotificationServiceService,
    private fb: FormBuilder,
    private leadService: LeadService,
    private route: Router,
    private configService: ConfigurationalmasterService,
    private recruitService: RecruitService,
    private activeroute: ActivatedRoute,
    private toast: ToastrService,
    private _empRegistration: EmpRegistrationService,
    private router: ActivatedRoute
  ) {
    this.activeroute.queryParams.subscribe((params: any) => {
      this.id_ = params.lead_id;
      this.br_ = params.br_no;
      this.SrNo = params.SrNo;
      this.stage = params.stage
      this.WO_id = params.WO_ID


    })
    this.auditorForm = this.fb.group({
      // purchase_date: new FormControl(null),
      // vendor_management_id: new FormControl(),
      // vendor_name: new FormControl(),
      auditorList: new FormArray([
        new FormGroup({
          auditorName: new FormControl(null),
          auditorNamess: new FormControl(null),
          auditorType: new FormControl(null),
          br_number: new FormControl(null),
          location: new FormControl("Mumbai"),
          bookingDate: new FormControl(null),
          // mandays: new FormControl(null),
        })
      ]),
    })

    this.leadForm = this.fb.group({
      customer_type: new FormControl(null),
      site_audit: new FormControl(null),
      billing_site: new FormControl(null),
      urd_number: new FormControl(null),
      associated_company: new FormControl(null, Validators.required),
      segment: new FormControl(null, Validators.required),
      certificate_type: new FormControl(null, Validators.required),
      first_name: new FormControl(null, Validators.required),
      categories: new FormControl(null, Validators.required),
      last_name: new FormControl(null, Validators.required),
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
      mobile_number: new FormControl(null, Validators.required),
      dqs_contact_source: new FormControl(null, Validators.required),
      contact_owner: new FormControl(null, Validators.required),
      lead_created_date: new FormControl(null, Validators.required),
      standard_program_assement: new FormControl(null, Validators.required),
      remarks: new FormControl(null),
      lead_validate_stage: new FormControl(null, Validators.required),
      validated_by: new FormControl(null, Validators.required),
      lead_validated_date: new FormControl(null, Validators.required),
      lead_validate_remarks: new FormControl(null),
      lead_assgn_contact_owner: new FormControl(null, Validators.required),
      assigned_by: new FormControl(null, Validators.required),
      assigned_date: new FormControl(null, Validators.required),
      stage: new FormControl(null, Validators.required),
      lead_assgn_remark: new FormControl(null, Validators.required),
      industry_sector: new FormControl(null, Validators.required),
      customer_category: new FormControl(null, Validators.required),
      employee_count: new FormControl(null, Validators.required),
      company_remarks: new FormControl(null),
      customer_sales_executive: new FormControl(null, Validators.required),
      assigned_to: new FormControl(null, Validators.required),
      opportunity_type: new FormControl(null, Validators.required),
      opportunity_ref: new FormControl(null, Validators.required),
      product_request: new FormControl(null, Validators.required),
      no_of_mandays: new FormControl(null, Validators.required),
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
      other_file: new FormControl(null, Validators.required),
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
      training_start_date: new FormControl(null, Validators.required),
      training_end_date: new FormControl(null, Validators.required),
      planning_status: new FormControl(null),
      training_confirm_date: new FormControl(null, Validators.required),
      locked_status: new FormControl(null),
      training_remarks: new FormControl(null),
      approval_by: new FormControl(null, Validators.required),
      site_selected: new FormControl(null, Validators.required),
      auditor_name: new FormControl(null),
      trainee_auditor_name: new FormControl(null),
      co_auditor_name: new FormControl(null),
      technical_expert: new FormControl(null),
      training_candidate_name: new FormControl(null),
      training_witness: new FormControl(null),
      travel_type: new FormControl(null, Validators.required),
      task_order_category: new FormControl(null, Validators.required),
      lead_auditor_cal: new FormControl(null),
      co_auditor_cal: new FormControl(null),
      trainee_auditor_cal: new FormControl(null),
      tech_ex_cal: new FormControl(null),
      candidate_name_cal: new FormControl(null),
      witness_cal: new FormControl(null),
      leadAuditor_id: new FormControl(null),
      co_auditor_id: new FormControl(null),
      trainee_id: new FormControl(null),
      technical_id: new FormControl(null),
      candidate_id: new FormControl(null),
      witness_id: new FormControl(null),
    })
    this.minDateToFinish.subscribe((r: any) => {
      this.minDate2 = new Date(r);
    })

  }
  ngOnInit() {
    this.auditorTypess = [
      { type: "Lead Auditor" },
      { type: "Co-Auditor" },
      { type: "Technical Auditor" },
      { type: "Trainee Auditor" },
      { type: "Candidate Auditor" },
      { type: "Witness Auditor" },
    ]

    // this.auditorlist = [
    //   { employee_id: 1, auditor_name: "Vrajesh" },
    //   { employee_id: 2, auditor_name: "Brij Narayan" },
    //   { employee_id: 3, auditor_name: "Sameer" },
    //   { employee_id: 4, auditor_name: "Rahul" },
    //   { employee_id: 5, auditor_name: "Jony" },
    //   { employee_id: 6, auditor_name: "Ram Lal" },
    // ]

    // this.BrList = [
    //   { id: 564, br_nos: 50258795, name: "S1", mandays: 6, location: "Mumbai" },
    //   { id: 564, br_nos: 50258795, name: "S2", mandays: 7, location: "Mumbai" },
    //   { id: 564, br_nos: 50258795, name: "CA1", mandays: 11, location: "Mumbai" },
    //   { id: 564, br_nos: 50258795, name: "CA2", mandays: 9, location: "Mumbai" },
    //   { id: 564, br_nos: 50258795, name: "TRA", mandays: 13, location: "Mumbai" },

    //   { id: 564, br_nos: 50258796, name: "S1", mandays: 12, location: "Dehli" },
    //   { id: 564, br_nos: 50258796, name: "S2", mandays: 14, location: "Dehli" },
    //   { id: 564, br_nos: 50258796, name: "CA1", mandays: 17, location: "Dehli" },
    //   // { id: 564,br_nos:50258796, name: "TRA" ,mandays:14,location:"Dehli"},

    //   { id: 564, br_nos: 50258797, name: "S1", mandays: 19, location: "Agra" },
    //   { id: 564, br_nos: 50258797, name: "S2", mandays: 14, location: "Agra" },
    //   { id: 564, br_nos: 50258797, name: "CA1", mandays: 13, location: "Agra" },
    //   { id: 564, br_nos: 50258797, name: "CA2", mandays: 9, location: "Agra" },
    // ]

    // const targetName = "S1";
    // const output = this.BrList.filter((item: any) => item.name === targetName);
    // console.log(output, "output");
    // this.filterData_ = output
    // console.log(this.filterData_, "output");



    this.getAchievementList();
    this.getCurrency();
    this.activeroute.queryParams.subscribe((params: any) => {
      this.id = params;
      this.br = params.br_no
      this.lead_id = this.id.lead_id;
      this.leadUpdate = this.id.type;
      this.qoutationType = params.type
      this.leadService.getByIdLead(this.lead_id).subscribe((res: any) => {
        this.singleLeadData = res.data;
        console.log(this.singleLeadData,"singleLeadData");
      this.patchFormvalue();
        if (this.singleLeadData.accredition_logo_details) {
          this.accri = true
        }
        if (this.singleLeadData.product_request.length >= 0) {
          this.prods = true
        }
        if (this.singleLeadData.ea_code.length >= 0) {
          this.ea_codes = true
        }
        console.log(this.accri, this.prods, this.ea_codes, "asdfh");

        console.log(this.singleLeadData.ea_code.length, "sin");

        this.work_order_id = res.data.workOrdercomponentId
        console.log(this.work_order_id, "wo id");

        const data =
        {
          standard_audit: this.singleLeadData.product_request,
          sector_audit: this.singleLeadData.ea_code,
          accredition_audit: this.singleLeadData.accredition_logo_details
        }
        console.log(data, "data");
        this._auditor.getAll_auditorMapping(data).subscribe((res: any) => {
          this.auditorlist = res.data
          console.log(this.auditorlist, "listss");
          this.auditorData = this.auditorlist
          this.variables = res.data.map((res: any) => res.auditor_name)
          console.log(this.variables, "varidable");
          console.log(this.variables, "varidable");
          this.variable = res.data
        })
        console.log('dataLead', this.singleLeadData);
        this.interCompanyStatus = this.singleLeadData.leadmanagement2s[0].inter_company_status;
        console.log('Lead', this.interCompanyStatus);
        if ((this.singleLeadData?.segment_name === 'MSA') && (this.singleLeadData?.certificate_type_name === 'Non-Cert')) {
          this.showaccredetion = true;
        }
        console.log('this.singleLeadData?.certificate_type_name', this.singleLeadData?.certificate_type_name)
        if (this.singleLeadData?.certificate_type_name == 'Non-Cert') {
          this.showsiclogo = true;
          console.log('show value', this.showsiclogo)
        }
        if (this.singleLeadData?.billing_site === true) {
          this.parentSide = true;
          this.getStage1(this.singleLeadData?.br_number)
        }

        if (this.singleLeadData.status === "Blocked Auditor") {
          this.auditorBlock = true;
        }

        if (this.singleLeadData?.export === "Export Wise") {
          this.gstvalidation = false;
        }
        if (this.singleLeadData?.certificate_type_name === "Non-Cert") {
          this.nonCertTrue = false;

        } else {
          this.nonCertTrue = true;

        }
        this.getCategory();
        this.getAuditor();
        this.product_amount(res.data.certificate_type, res.data.product_request)
        // this.patchFormvalue();

      })
    });
    this.mainId = localStorage.getItem("EmpMainId");

    if (this.mainId != undefined) {
      this._empRegistration.getByUserId(this.mainId).subscribe((res) => {
        this.mainEmployeeData = res.data;
        this.getAchievementList();
        // this.patchFormvalue();
      })
    }
    this.leadService.getByIdLeadId(this.lead_id).subscribe((res: any) => {
      let x = res.data.map((a: any) => {

        return { ...a, checked: false };
      });
      this.singleLeadData1 = x;
      console.log(this.singleLeadData1, 'singleLeadData1<<<<<<<<<<<<<<');

      this.singleLeadData1.unshift(
        {
          br_number: this.singleLeadData?.br_number,
          associated_company: this.singleLeadData?.associated_company,
          city_name: this.singleLeadData?.city_name,
          state_name: this.singleLeadData?.state_name
        },
      )

      this.billingData = x;
      console.log(this.billingData, ' this.billingData');

      const billArray: any = []
      for (let a = 0; a <= this.billingData.length - 1; a++) {
        if (this.billingData[a]?.lead_genration_id === this.singleLeadData?.lead_genration_id) {
          billArray.push(this.billingData[a]);

        }

      }
      billArray.push(this.singleLeadData)
      console.log(billArray, ' this.billingData after');
      this.billingDataCopy = billArray;
      console.log('billing', this.billingDataCopy);
    });
    this.getByViewData();
    this.predate = [
      "2023-10-03",
      "2023-10-04",
      "2023-10-06"
    ];
    //  this.isSelected(this.predate);
    this.getMandays();
  }
  getMandays() {
    console.log(this.stage);
    console.log(this.id_);
    const data = {
      lead_genration_id: this.id_,
      stage: this.stage
    }
    this._auditor.receivedMandays(data).subscribe((res: any) => {
      this.receivedMandays = res.data
      console.log(this.receivedMandays, "receivedMAndauys");

    })
  }
  get AU_1(): any {
    return this.auditorForm.controls;
  }
  deleteRow(i: any, control: any) {
    console.log(this.AU_1.auditorList, "controls");
    if (this.AU_1.auditorList.length > 1) {
      this.AU_1.auditorList.removeAt(i);
    } else {
      this.toast.error("Can't Deleted", "must be one");
    }
  }
  addrow() {
    <FormArray>this.AU_1.auditorList.push(
      new FormGroup({
        auditorName: new FormControl(null),
        auditorNamess: new FormControl(null),
        // mandays: new FormControl(null),
        bookingDate: new FormControl(null),
        auditorType: new FormControl(),
        br_number: new FormControl(null),
        location: new FormControl("Mumbai"),
        // asset_category: new FormControl(),
      })
    );
    this.daysSelected = []
    this.auditors = []

  }
  emptypelocation(e: any) {

  }
  emptypetype(e: any) {

  }
  emptype(e: any, control: any) {
    console.log(e, "eeeee");
    console.log(this.receivedMandays, "eeeee");
    // if (e.value) {
    //   for (let a = 0; a < this.receivedMandays.length; a++) {
    //     if (e.value == this.receivedMandays[a].mandays.br_number) {
    //       console.log(this.receivedMandays[a].mandays.city_name, "eeeee");
    //       control.controls.value.location=this.receivedMandays[a].mandays.city_name
    //       this.auditorForm.patchValue({
    //         location: this.receivedMandays[a].mandays.city_name
    //       });

    //     }

    //   }
    // }


    const modify = this.receivedMandays.filter((res: any) => {
      Number(res.mandays.br_number) == Number(e.value)
    })
    console.log(modify, "modify");

    console.log(control, "eeeee");
    this.filterLocation = this.BrList.filter((res: any) => res.br_nos == e.value).
      map((res1: any) => res1.location)
    control.value.location = this.filterLocation[0]
    console.log(e.value, "ee");
    console.log(this.filterLocation[0], "ee location");
    console.log(control, "control");
    const selectedDate = this.calendar.activeDate;
    console.log(selectedDate, "seletedDate");
    const date = 9
    // You can also call methods of the MatCalendar component:
    this.calendar.updateTodaysDate();
    console.log(selectedDate, "seletedDate");
  }
  event: any;
  isSelected: any = (event: any) => {
    const date =
      event.getFullYear() +
      "-" +
      ("00" + (event.getMonth() + 1)).slice(-2) +
      "-" +
      ("00" + event.getDate()).slice(-2);
    if (this.predate.includes(date)) {
      return "disabled"; // Disable the date 
    } else if (this.daysSelected.includes(date)) {
      return "selected"; // Disable the date 
    }
    else {
      return null;
    }
  };

  emp_id(control: any, index: any) {
    this.daysSelected = []
    this.predate = [
      "2023-10-03",
      "2023-10-04",
      "2023-10-06"
    ]
    this.index = index
  }
  getDatesForCurrentMonth() {
    const today = new Date();
    const currentMonth = today.getMonth();
    const currentYear = today.getFullYear();
    const firstDay = new Date(currentYear, currentMonth, 1);
    const lastDay = new Date(currentYear, currentMonth + 1, 0);
    const dates = [];
    for (let date = firstDay; date <= lastDay; date.setDate(date.getDate() + 1)) {
      dates.push(new Date(date));
    }

    return dates;
  }

  select(event: any, calendar: any, control: any, i: any) {
    console.log(event, calendar, control, i);
    const date =
      event.getFullYear() +
      "-" +
      ("00" + (event.getMonth() + 1)).slice(-2) +
      "-" +
      ("00" + event.getDate()).slice(-2);
    const index = this.daysSelected.findIndex(x => x == date);
    if (index < 0) this.daysSelected.push(date);
    else this.daysSelected.splice(index, 1);
    console.log();
    calendar.updateTodaysDate();
    console.log(this.index, "index");
    console.log(this.auditorForm.controls.auditorList, "index");
    this.auditorForm.controls.auditorList.at(i).get('bookingDate').patchValue(this.daysSelected);
  }


  product_amount(cer_id: any, product_name: any) {
    console.log(cer_id, "ok");
    console.log(product_name, "ok");
    const modify = {
      certificate_type: cer_id,
      product_request: product_name

    }
    this.leadService.get_productpricebycertificatetype(modify).subscribe((res: any) => {
      const totalAmount = res.data.map((item: any) => item.price).reduce((acc: any, price: any) => acc + price, 0);
      this.product_amounts = totalAmount
      console.log(totalAmount, "hjhjhj"); // This will output 43000
      this.leadForm.patchValue({
        slab_quote: this.product_amounts,
      })
    },
      (err: any) => {
        if (cer_id == null) {
          this.toast.error("Certificate Type not Define")
        }
        else if (product_name == null) {
          this.toast.error("Products not found")
        }
        else {
          this.toast.error("Somthing wents wrong")
        }
      })
  }

  getCurrentRoute(): string {
    return this.router.snapshot.url.map(s => s.path).join('/')
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

  getAuditor() {
    for (let data of this.singleLeadData?.product_request) {
      this.newProductData.push(data)
    }
    this.configService.getAuditor().subscribe((res: any) => {
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
        this.variables_ = this.allAchievement.map((res: any) => res.first_name)
        this.checkData_ = this.allAchievement
        this.variable_ = this.allAchievement
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
      // this.patchFormvalue();
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
    console.log(this.singleLeadData,"sin>>>>>>>>>>>>>>>>@");
    
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
      regional_bussiness_lead: this.singleLeadData?.regional_bussiness_lead,
      global_managing_director: this.singleLeadData?.global_managing_director,
      global_manager_sales: this.singleLeadData?.global_manager_sales,
      website_url: this.singleLeadData?.website_url,
      phone_number: this.singleLeadData?.phone_number,
      mobile_number: this.singleLeadData?.mobile_number,
      dqs_contact_source: Number(this.singleLeadData?.dqs_contact_source),
      contact_owner: this.singleLeadData?.contact_owner,
      lead_created_date: this.singleLeadData?.lead_created_date,
      standard_program_assement: this.singleLeadData?.standard_program_assement,
      assigned_to: this.singleLeadData?.assigned_to,
      remarks: this.singleLeadData?.remarks || 'test',
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
      product_request: this.singleLeadData?.product_request,
      customer_sales_executive: this.singleLeadData?.customer_sales_executive,
      opportunity_type: this.singleLeadData?.opportunity_type || 'Certification - Audit (TRA)',
      opportunity_ref: this.singleLeadData?.OpportunityRef_no,
      no_of_mandays: this.singleLeadData?.no_of_mandays,
      ea_code: this.singleLeadData?.ea_code || '123',
      urd_number: this.singleLeadData?.urd_number,
      billing_site: this.singleLeadData?.billing_site,
      company_logo_cost: this.singleLeadData?.company_logo_cost,
      opp_verifier_name_level1: this.singleLeadData?.opp_verifier_name_level1 || 'CSP',
      opp_verified_date_level1: this.singleLeadData?.opp_verified_date_level1 || this.myDate,
      opp_verified_remarks_level1: this.singleLeadData?.opp_verified_remarks_level1 || 'Test',
      opp_verifier_name_level2: this.singleLeadData?.opp_verifier_name_level2 || 'CSP',
      opp_verified_date_level2: this.singleLeadData?.opp_verified_date_level2 || this.myDate,
      opp_verified_remarks_level2: this.singleLeadData?.opp_verified_remarks_level2 || 'test',
      quotation_currency: this.singleLeadData?.quotation_currency || 1,
      assessment_period: this.singleLeadData?.assessment_period || 'Annual',
      accredition_logo_details: this.singleLeadData?.accredition_logo_details || 'test',
      company_logo_req: this.singleLeadData?.company_logo_req,
      add_cert_copy: this.singleLeadData?.add_cert_copy || 'yes',
      expense_category: this.singleLeadData?.expense_category || 'Billable',
      agreed_slab_a: this.singleLeadData?.agreed_slab_a,
      slab_quote: this.singleLeadData?.slab_quote,
      logo_cost: this.singleLeadData?.logo_cost,
      quote_prepared: this.mainEmployeeData?.first_name,
      quote_prepared_date: this.myDate,
      training_confirm_date: this.myDate,
    })
    if (this.singleLeadData?.company_logo_cost) {
      this.logoRequired = true;
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
  filterAuditor(e: any, data: any) {
    this.coAuditorData = [];
    for (let item of this.auditorData) {
      if (e.employee_id === item?.employee_id) {
      }
      else {
        this.coAuditorData.push(item);
      }
    }
    console.log(this.auditorList, "ee data");
    console.log(e, "ee data");
    console.log(data, "ee data<<<<<<<<<<<<<<<<<<");
    this.cf = this.leadForm.value
    console.log(this.auditorList, 'this.auditorList');

    if (data == 'Lead Auditor') {
      this.leadAuditor_ids = e.employee_id
      this.leadAuditor_name = e.auditor_name
      this.leadAuditor_valid = e.valid_until_audit

    }
    else if (data == 'Trainee Auditor') {
      this.trainee_id = e.employee_id
      this.trainee_valid = e.valid_until_audit

      // this.trainee_name = e.auditor_name
    }
    else if (data == 'Candidate Name') {
      this.candidate_id = e.employee_id
      this.candidate_valid = e.valid_until_audit

      // this.candidate_name = e.auditor_name
    }
    else if (data == 'Technical Expert') {
      this.technical_id = e.employee_id
      this.technical_valid = e.valid_until_audit

      // this.technical_name = e.auditor_name
    }
    else if (data == 'Witness') {
      this.witness_id = e.employee_id
      this.witness_valid = e.valid_until_audit

      // this.witness_name = e.auditor_name
    }
    this.coAuditorData = [];
    let filterData: any = []
    for (let item of this.auditorData) {
      if (e.employee_id === item?.employee_id) {
      }
      else if (this.leadForm.value.auditor_name !== null) {
        filterData = this.auditorData.filter((res: any) => res.employee_id !== this.leadForm.value.auditor_name)
        this.coAuditorData = filterData
      }
    }
  }
  submitForm() {
    console.log(this.leadAuditor_name, 'this.leadAuditor_name<<<<<<<<<');

    this.submitted = true;
    let val = this.leadForm.value;

    this.interCompanyStatus = this.singleLeadData.inter_company_status,
      console.log('this.singleLeadData.status', this.singleLeadData.inter_company_status)
    console.log('val', val);

    this.dataMain = {
      br_number: this.br,
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
      quotation_currency: Number(val.quotation_currency) || 1,
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
      training_start_date: moment(val?.training_start_date).format('YYYY-MM-DD'),
      training_end_date: val?.training_end_date ? moment(val?.training_end_date).format('YYYY-MM-DD') : '09-28-2023',
      planning_status: val.planning_status || "Test",
      training_confirm_date: moment(val.training_confirm_date).format('YYYY-MM-DD') || moment().format("DD-MM-YYYY"),
      locked_status: val.locked_status || "Test",
      training_remarks: val.training_remarks,
      approval_by: val.approval_by,
      site_selected: val.site_selected,

      travel_type: val.travel_type,
      task_order_category: val.task_order_category,
      billing_site_copy: this.singleLeadData.billing_site_copy,
      status: "Blocked Auditor",
    }
    console.log(this.dataMain, 'dataMain<<<<');


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
      this.leadService.editLeadDoc(this.lead_id, data).subscribe((res: any) => {
      });
    }

    console.log(this.dataMain, '<<< cert datamain');
    // console.log(auditorData, '<<< cert datamain auditorData');
    this.leadService.editLead(this.lead_id, this.dataMain).subscribe((res: any) => {
      console.log(res, 'res{{{{{{{{{ cert');
      this.leadService.bookedAuditor(this.dialogData).subscribe((res: any) => {
        console.log(res.data);
        this.toast.success("Auditor Blocked Successfully..")
        this.leadService.raisedOrder(this.auditors).subscribe((res:any)=>{
          this.toast.success("Raised Task Order Successfully...")
        },(err:any)=>{
          this.toast.error("Somthing wents wrong")
    
        })

      }, (err: any) => {
        this.toast.error("Auditors are not booked.")
      })
      // auditor book api start
      // console.log(amodi, "modi chk");

      this.route.navigate(['master/audit/pre-audit/blocked-auditor'],
        { queryParams: { lead_id: this.lead_id } }
      );
    }, (err: any) => {
      this.toast.error("somthing wents wrong")
    })

  }
  updateForm() {


    const data = this.leadForm.value;

    this.leadService.editLead(this.lead_id, data).subscribe((res: any) => {

      this.toast.success("Updated Assignment Successfully..")
      this.route.navigate(['master/audit/pre-audit/work-order']);
    })

  }
  rejectBtn() {
    const data = {
      status: "Rejected"
    }
    this.leadService.editLead(this.lead_id, data).subscribe((res: any) => {

      this.toast.success(res.message);
      this.route.navigate(['master/lead/lead-account'],
        { queryParams: { lead_id: this.lead_id } }
      );
    })
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

  auditClick() {
    this.auditOpen = !this.auditOpen;
    let data = this.leadForm.value;
    let viewData = {
      lead_genration_id: Number(this.lead_id),
      audit_start_date: moment(data.training_start_date).format('YYYY-MM-DD'),
      audit_end_date: moment(data.training_end_date).format('YYYY-MM-DD'),
      lead_auditor_name: data.auditor_name,
      co_auditor_name: data.trainee_auditor_name,
      site_location: this.singleLeadData?.city_name
    }

    this.leadService.createViewCalender(viewData).subscribe((res: any) => {

      let idAudit = res.data;
      this.aduitId = idAudit.auditorId;

      this.getByViewData();
    })
  }

  getByViewData() {
    this.leadService.getByViewCalender(this.aduitId).subscribe((res: any) => {
      this.viewCalenderData = res.data;

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

  dateChange(e: any) {
    this.minDateToFinish.next(e.value.toString());
  }

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

  userData_notification(e: any) {
    console.log(this.notification_data, "this.notification_data");

  }

  check() {
    this.side = 'back'
    let data = this.auditorForm.get('auditorList').value;
    console.log(data, "dataaaaaaaaa");
    console.log(this.auditorForm.value.auditorList, "dd");
    const data1 = {
    }
    const data_ = this.auditorForm.controls.auditorList.value
    console.log(data_, "data check");
    let output: any = [];
    data_.forEach((item: any) => {
      item.bookingDate.forEach((date: any) => {
        output.push({
          "lead_genration_id": this.id_,
          "stage": this.stage,
          "workOrdercomponentId": this.WO_id,
          "auditor_id": item.auditorName,
          "auditor_name": item.auditorNamess,
          "auditor_type": item.auditorType,
          "br_number": item.br_number,
          "location": item.location,
          "leadAuditor_bookedDate": date,
          "mandays": 1,
          "status": "ACTIVE"
        });
      });
    });
    // this.side='back'
    console.log(output, 'output');
    this.auditors = output
 

  }
  updateMandays(auditor: any, newMandays: any) {
    auditor.mandays = newMandays;

  }

  siteFun(data: any) {
    console.log(data, "data check");
  }
  funApp(e: any) {
    const aa = e
    let filteredVariable = this.variable_.filter((item: any) => aa.includes(item.first_name));
    this.checkData_ = filteredVariable
    console.log(this.checkData_, "checkkkk")
  }
  update(auditor: any) {
    this.side = 'front'
    console.log();
    console.log(auditor);
    // this.side='front'

  }

  auditorFun(e: any, i: any) {
    console.log(this.auditorlist);
    console.log(i, "iiiiiiiiiiii");
    console.log(e.value, "audit id");
    const selectedAuditor = this.auditorlist.filter((res: any) => Number(res.employee_id) == Number(e.value)).map((res1: any) => res1.auditor_name);
    console.log(selectedAuditor[0], "auditor Name");
    console.log(this.auditorForm.controls, "auditor Name");
    // this.auditorForm.controls.auditorList.controls[i].value.auditorNamess=selectedAuditor[0];
    this.auditorForm.controls.auditorList.at(i).get('auditorNamess').patchValue(selectedAuditor[0]);

  }
}


