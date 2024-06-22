import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LeadService } from 'src/app/@shared/services/lead.service';
import * as moment from 'moment';
import { RecruitService } from 'src/app/@shared/services/recruitment.service';
import { ConfigurationalmasterService } from 'src/app/@shared/services/configurationalmaster.service';

@Component({
  selector: 'app-request-form',
  templateUrl: './request-form.component.html',
  styleUrls: ['./request-form.component.scss'],
})
export class RequestFormComponent implements OnInit {
  leadForm: FormGroup;
  jobType: any;
  candidateArray: any;
  interviewGetId: any;
  candidateId: any;
  id: any;
  categoryList: any;
  interview_id: any;
  clicked: boolean = false;
  cutomerType: boolean = false;
  sitAudit: boolean = false;
  lead_id: any;
  singleLeadData: any;
  val: any;
  public searchResult: any;
  mainId: string | null;
  mainEmployeeData: any;
  allAchievement: any;
  submitted: boolean;
  otherLang: boolean;
  Lang: boolean = false;
  ref_no: boolean;
  part_of_sampling_procedure: boolean;
  assement: boolean;
  value: any;
  inputPay: any;
  Otherinvoice: any;
  allData: any;
  singleData: any;
  languageData: any;
  countryVar2: any;
  countryVar: any;
  lead_data: any;
  ber_No: any;
  brVar: any;
  brVar2: any;
  brVarAfter: any;
  constructor(
    private fb: FormBuilder,
    private recruitService: RecruitService,
    private toast: ToastrService,
    private http: HttpClient,
    public leadService: LeadService,
    private route: Router,
    private activeroute: ActivatedRoute,
    private _configurationalMasterService: ConfigurationalmasterService
  ) {
    this.leadForm = this.fb.group({
      expiry_date_of_certi: new FormControl(null),
      parent_ref: new FormControl(null),
      due_date: new FormControl(null),
      manifacturing_site: new FormControl(null),
      type_of_site: new FormControl(null),
      status: new FormControl('Request Received'),
      current_certi: new FormControl(null),
      planned_dates: new FormControl(null),
      name_legal_status: new FormControl(null, [Validators.required]),
      ref_no_s: new FormControl(null),
      ref_no: new FormControl(null),
      standard_s: new FormControl(null),
      scope: new FormControl(null),
      accreditation: new FormControl(null),
      dqs_contact_person: new FormControl(null, [Validators.required]),
      phone1: new FormControl(null, [Validators.required]),
      email1: new FormControl(null, [
        Validators.required,
        Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
      ]),
      type_assessment: new FormControl(null),
      otherassement: new FormControl(null),

      phone: new FormControl(null),
      Frequency_audit_cycle: new FormControl(null),
      remote_location: new FormControl(null),
      email: new FormControl(null, [
        Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
      ]),
      part_sampling_procedure: new FormControl(null),
      procedure_date: new FormControl(null),

      Corporate_Scheme_Name: new FormControl(null),
      corporate_scheme: new FormControl(null),
      Corporate_scheme_ref_no: new FormControl(null),
      corporate__name: new FormControl(null),
      corporate_email: new FormControl(null),
      corporate_phone: new FormControl(null),

      design_function: new FormControl(null),
      detailed_calculation: new FormControl(null),
      audit_language: new FormControl(null),
      no_audit_days: new FormControl(null),
      certi_req: new FormControl(null),
      local_contact_person: new FormControl(null),
      site_s_list_add: new FormControl(null, [Validators.required]),
      headcounts: new FormControl(null),
      local_contact_person_phone: new FormControl(null),
      local_contact_person_email: new FormControl(null),
      sampling_last_audit_date: new FormControl(null),

      name_id_of_auditor_1: new FormControl(null),
      name_id_of_auditor_2: new FormControl(null),
      name_id_of_auditor_3: new FormControl(null),

      rqst_for: new FormControl(null),
      fyi_only: new FormControl(null),

      fluent_lang_skill_req: new FormControl(null),
      fluent_other_lag: new FormControl(null),

      Languages: new FormControl(null),
      other_lag: new FormControl(null),

      business_sector: new FormControl(null),
      EAC: new FormControl(null),
      IAF: new FormControl(null),
      SIC: new FormControl(null),
      Others: new FormControl(null),

      Format: new FormControl(null),

      Scheduling_with_customer: new FormControl(null),
      Tasks_to_be_done_by_leading_Office: new FormControl(null),
      Tasks_to_be_done_by_answering_Office: new FormControl(null),

      Upload_documents_via_Corp_DB: new FormControl(null),
      Upload_Tasks_to_be_done_by_leading_Office: new FormControl(null),
      Upload_Tasks_to_be_done_by_answering_Office: new FormControl(null),

      Control_of_Technical_review: new FormControl(null),
      Control_Tasks_to_be_done_by_leading_Office: new FormControl(null),
      Control_Tasks_to_be_done_by_answering_Office: new FormControl(null),

      Sending_of_report_to_customer: new FormControl(null),
      Sending_Tasks_to_be_done_by_leading_Office: new FormControl(null),
      Sending_Tasks_to_be_done_by_answering_Office: new FormControl(null),

      Issuance_of_certificate_and_sending_to_customer: new FormControl(null),
      Issuance_Tasks_to_be_done_by_leading_Office: new FormControl(null),
      Issuance_Tasks_to_be_done_by_answering_Office: new FormControl(null),

      Upload_of_documents_into_MyDQS: new FormControl(null),
      Upload_of_documents_into_MyDQS_1st: new FormControl(null),
      Upload_of_documents_into_MyDQS_2snd: new FormControl(null),

      Customer_invoicing: new FormControl(null),
      Customer_invoicing_leading_Office: new FormControl(null),
      Customer_invoicingy_answering_Office: new FormControl(null),

      DQS_Customer_evaluation: new FormControl(null),
      DQS_Customer_leading_Office: new FormControl(null),
      DQS_Customer_answering_Office: new FormControl(null),

      send_report_or_findings_to: new FormControl(null),
      send_report_name: new FormControl(null),
      send_report_email: new FormControl(null),

      Special_agreements_regarding_invoicing_to_customer: new FormControl(null),
      Bills_and_receipts_shall_be_send_with_invoice: new FormControl(null),
      Travel_fee_travel_flat_rates: new FormControl(null),
      Special_price_for_travel_expenses: new FormControl(null),
      Other_invoice_address: new FormControl(null),
      Payment_terms: new FormControl(null),
      See_special_information_attached: new FormControl(null),
      See_special_information_in_GAM_team_room: new FormControl(null),

      Explanation_further_comments: new FormControl(null),
      Intercompany_Pricing_Model: new FormControl(null),

      Daily_rate: new FormControl(null),
      Daily_rate_customer: new FormControl(null),
      Daily_rate_pay: new FormControl(null),

      Report_fee_recertification: new FormControl(null),
      Report_fee_recertification_customer: new FormControl(null),
      Report_fee_recertification_pay: new FormControl(null),

      Report_fee_surveillance_audit: new FormControl(null),
      Report_fee_audit_customer: new FormControl(null),
      Report_fee_audit_payable: new FormControl(null),

      Travel_time: new FormControl(null),
      Travel_time_rate_currency_customer: new FormControl(null),
      Travel_time_Thereof_fee_payable: new FormControl(null),

      Others_rate_currency_customer: new FormControl(null),
      Others_Thereof_fee_payable: new FormControl(null),

      Currency: new FormControl(null),
      rate_currency_customer: new FormControl(null),
      Thereof_fee_payable: new FormControl(null),

      Exp_Comment_about_the_fee: new FormControl(null),
      name: new FormControl(null),
      email_id: new FormControl(null),
      request_rasied_by: new FormControl(null),
      website_url_new_3: new FormControl(null),
      inter_company_br_number: new FormControl(null),
    });
  }

  ngOnInit() {
    this.activeroute.queryParams.subscribe((params) => {
      this.id = params;
      this.lead_id = this.id.id;
      this.ptchFormData();
      this.disableAll();
    });
    this.getAchievementList();
    this.getAll();
  }

  ptchFormData(){
    this.leadService
    .getByIdInterCompany(this.lead_id)
    .subscribe((res: any) => {
      (this.singleData = res?.data),
        this.leadForm.patchValue({
          expiry_date_of_certi: this.singleData?.expiry_date_of_certi,
          parent_ref: this.singleData?.parent_ref,
          due_date: this.singleData?.due_date,
          manifacturing_site: this.singleData?.manifacturing_site,
          type_of_site: this.singleData?.type_of_site,
          planned_dates: this.singleData?.planned_dates,
          name_legal_status: this.singleData?.name_legal_status,
          ref_no_s: this.singleData?.ref_no_s,
          ref_no: this.singleData?.ref_no,
          site_s_list_add: this.singleData?.site_s_list_add,
          inter_company_br_number:this.singleData?.inter_company_br_number,
          headcounts: this.singleData?.headcounts,
          local_contact_person: this.singleData?.local_contact_person,
          local_contact_person_phone: this.singleData?.local_contact_person_phone,
          local_contact_person_email: this.singleData?.local_contact_person_email,
          standard_s: this.singleData?.standard_s,
          scope: this.singleData?.scope,
          accreditation: this.singleData?.accreditation,
          dqs_contact_person: this.singleData?.dqs_contact_person,
          phone1: this.singleData?.phone1,
          email1: this.singleData?.email1,
          certi_req: this.singleData?.certi_req,
          current_certi: this.singleData?.current_certi,
          name_id_of_auditor_1: this.singleData?.name_id_of_auditor ? this.singleData?.name_id_of_auditor[0]?.name_id_of_auditor_1 : '',
          name_id_of_auditor_2: this.singleData?.name_id_of_auditor? this.singleData?.name_id_of_auditor[1]?.name_id_of_auditor_2 : '',
          name_id_of_auditor_3: this.singleData?.name_id_of_auditor ? this.singleData?.name_id_of_auditor[2]?.name_id_of_auditor_3 : '',
          phone: this.singleData?.phone,
          remote_location: this.singleData?.remote_location,
          email: this.singleData?.email,
          part_sampling_procedure: this.singleData?.part_sampling_procedure,
          procedure_date: this.singleData?.procedure_date,

          corporate_scheme: this.singleData?.corporate_scheme,
          Corporate_scheme_ref_no: this.singleData?.Corporate_scheme_ref_no,
          corporate__name: this.singleData?.corporate__name,
          corporate_email: this.singleData?.corporate_email,
          corporate_phone: this.singleData?.corporate_phone,

          
          detailed_calculation: this.singleData?.detailed_calculation,
          audit_language: this.singleData?.audit_language,
          no_audit_days: this.singleData?.no_audit_days,
          sampling_last_audit_date: this.singleData?.sampling_last_audit_date,

          
          // name_id_of_auditor_2: this.singleData?.name_id_of_auditor_2,
          // name_id_of_auditor_3: this.singleData?.name_id_of_auditor_3,

          rqst_for: this.singleData?.rqst_for,
          fyi_only: this.singleData?.fyi_only,

          fluent_lang_skill_req: this.singleData?.fluent_lang_skill_req? this.singleData?.fluent_lang_skill_req[0]?.lang : '',
          fluent_other_lag: this.singleData?.fluent_other_lag,

          Languages: this.singleData?.Languages ? this.singleData?.Languages[0]?.lang : '',
          other_lag: this.singleData?.other_lag,

          business_sector: this.singleData?.business_sector,
          EAC: this.singleData?.business_sector? this.singleData?.business_sector[0]?.EAC:'',
          IAF: this.singleData?.business_sector? this.singleData?.business_sector[1]?.IAF : '',
          SIC: this.singleData?.business_sector? this.singleData?.business_sector[2]?.SIC :'',
          Others: this.singleData?.Others? this.singleData?.Others[0]?.Others_rate_currency_customer: '',

          Format: this.singleData?.Format,

          Scheduling_with_customer: this.singleData?.Scheduling_with_customer,
          Tasks_to_be_done_by_leading_Office:
            this.singleData?.Scheduling_with_customer[0]?.Tasks_to_be_done_by_leading_Office,
          Tasks_to_be_done_by_answering_Office:
            this.singleData?.Scheduling_with_customer[1]?.Tasks_to_be_done_by_answering_Office,

          Upload_documents_via_Corp_DB:
            this.singleData?.Upload_documents_via_Corp_DB,
          Upload_Tasks_to_be_done_by_leading_Office:
            this.singleData?.Upload_documents_via_Corp_DB[0]?.Upload_Tasks_to_be_done_by_leading_Office,
          Upload_Tasks_to_be_done_by_answering_Office:
            this.singleData?.Upload_documents_via_Corp_DB[1]?.Upload_Tasks_to_be_done_by_answering_Office,

          Control_of_Technical_review:
            this.singleData?.Control_of_Technical_review,
          Control_Tasks_to_be_done_by_leading_Office:
            this.singleData?.Control_of_Technical_review[0]?.Control_Tasks_to_be_done_by_leading_Office,
          Control_Tasks_to_be_done_by_answering_Office:
            this.singleData?.Control_of_Technical_review[1]?.Control_Tasks_to_be_done_by_answering_Office,

          Sending_of_report_to_customer:
            this.singleData?.Sending_of_report_to_customer,
          Sending_Tasks_to_be_done_by_leading_Office:
            this.singleData?.Sending_of_report_to_customer[0]?.Sending_Tasks_to_be_done_by_leading_Office,
          Sending_Tasks_to_be_done_by_answering_Office:
            this.singleData?.Sending_of_report_to_customer[1]?.Sending_Tasks_to_be_done_by_answering_Office,

          Issuance_of_certificate_and_sending_to_customer:
            this.singleData?.Issuance_of_certificate_and_sending_to_customer,
          Issuance_Tasks_to_be_done_by_leading_Office:this.singleData?.Issuance_of_certificate_and_sending_to_customer?
            this.singleData?.Issuance_of_certificate_and_sending_to_customer[0]?.Issuance_Tasks_to_be_done_by_leading_Office : '',
          Issuance_Tasks_to_be_done_by_answering_Office: this.singleData?.Issuance_of_certificate_and_sending_to_customer ?
            this.singleData?.Issuance_of_certificate_and_sending_to_customer[1]?.Issuance_Tasks_to_be_done_by_answering_Office :'',

          Upload_of_documents_into_MyDQS:
            this.singleData?.Upload_of_documents_into_MyDQS,
          Upload_of_documents_into_MyDQS_1st: this.singleData?.Upload_of_documents_into_MyDQS ?
            this.singleData?.Upload_of_documents_into_MyDQS[0]?.Upload_of_documents_into_MyDQS_1st : '',
          Upload_of_documents_into_MyDQS_2snd:  this.singleData?.Upload_of_documents_into_MyDQS ?
            this.singleData?.Upload_of_documents_into_MyDQS[1]?.Upload_of_documents_into_MyDQS_2snd : '',

          Customer_invoicing: this.singleData?.Customer_invoicing,
          Customer_invoicing_leading_Office: this.singleData?.Customer_invoicing ?
            this.singleData?.Customer_invoicing[0]?.Customer_invoicing_leading_Office : '',
          Customer_invoicingy_answering_Office: this.singleData?.Customer_invoicing?
            this.singleData?.Customer_invoicing[1]?.Customer_invoicingy_answering_Office:'',

          DQS_Customer_evaluation: this.singleData?.DQS_Customer_evaluation,
          DQS_Customer_leading_Office: this.singleData?.DQS_Customer_evaluation?
            this.singleData?.DQS_Customer_evaluation[0]?.DQS_Customer_leading_Office : '',
          DQS_Customer_answering_Office:this.singleData?.DQS_Customer_evaluation?
            this.singleData?.DQS_Customer_evaluation[1]?.DQS_Customer_answering_Office :'',

          send_report_or_findings_to: this.singleData?.send_report_or_findings_to,
          send_report_name: this.singleData?.send_report_or_findings_to ? this.singleData?.send_report_or_findings_to[0]?.send_report_name : '',
          send_report_email: this.singleData?.send_report_or_findings_to ? this.singleData?.send_report_or_findings_to[1]?.send_report_email : '',

          Bills_and_receipts_shall_be_send_with_invoice: this.singleData?.Special_agreements_regarding_invoicing_to_customer ?
            this.singleData?.Special_agreements_regarding_invoicing_to_customer[0]?.Bills_and_receipts_shall_be_send_with_invoice :'',
          Travel_fee_travel_flat_rates: this.singleData?.Special_agreements_regarding_invoicing_to_customer?
            this.singleData?.Special_agreements_regarding_invoicing_to_customer[1]?.Travel_fee_travel_flat_rates :'',
          Special_price_for_travel_expenses: this.singleData?.Special_agreements_regarding_invoicing_to_customer? 
            this.singleData?.Special_agreements_regarding_invoicing_to_customer[2]?.Special_price_for_travel_expenses :'',

            Other_invoice_address: this.singleData?.Special_agreements_regarding_invoicing_to_customer ? this.singleData?.Special_agreements_regarding_invoicing_to_customer[3]?.Other_invoice_address:'',
          Payment_terms: this.singleData?.Special_agreements_regarding_invoicing_to_customer ? this.singleData?.Special_agreements_regarding_invoicing_to_customer[4]?.Payment_terms :'',


            See_special_information_attached:this.singleData?.Special_agreements_regarding_invoicing_to_customer?
            this.singleData?.Special_agreements_regarding_invoicing_to_customer[5]?.See_special_information_attached : '',
          See_special_information_in_GAM_team_room: this.singleData?.Special_agreements_regarding_invoicing_to_customer ?
            this.singleData?.Special_agreements_regarding_invoicing_to_customer[6]?.See_special_information_in_GAM_team_room : '',
            Explanation_further_comments:
              this.singleData?.Explanation_further_comments,

          Intercompany_Pricing_Model: this.singleData?.Intercompany_Pricing_Model,

          Daily_rate: this.singleData?.Daily_rate,
          Daily_rate_customer: this.singleData?.Daily_rate ? this.singleData?.Daily_rate[0]?.Daily_rate_customer : '',
          Daily_rate_pay: this.singleData?.Daily_rate ? this.singleData?.Daily_rate[1]?.Daily_rate_pay :'',

          Report_fee_recertification: this.singleData?.Report_fee_recertification,
          Report_fee_recertification_customer: this.singleData?.Report_fee_recertification ?
            this.singleData?.Report_fee_recertification[0]?.Report_fee_recertification_customer :'',
          Report_fee_recertification_pay: this.singleData?.Report_fee_recertification?
            this.singleData?.Report_fee_recertification[1]?.Report_fee_recertification_pay:'',

          Report_fee_surveillance_audit:
            this.singleData?.Report_fee_surveillance_audit,
          Report_fee_audit_customer: this.singleData?.Report_fee_surveillance_audit ? this.singleData?.Report_fee_surveillance_audit[0].Report_fee_audit_customer :'',
          Report_fee_audit_payable: this.singleData?.Report_fee_surveillance_audit ? this.singleData?.Report_fee_surveillance_audit[1].Report_fee_audit_payable:'',

          Travel_time: this.singleData?.Travel_time,
          Travel_time_rate_currency_customer:this.singleData?.Travel_time?
            this.singleData?.Travel_time[0]?.Travel_time_rate_currency_customer :'',
          Travel_time_Thereof_fee_payable: this.singleData?.Travel_time?
            this.singleData?.Travel_time[1]?.Travel_time_Thereof_fee_payable :'',

          Others_rate_currency_customer: this.singleData?.Others?
            this.singleData?.Others[0]?.Others_rate_currency_customer : '',
          Others_Thereof_fee_payable: this.singleData?.Others? this.singleData?.Others[1]?.Others_Thereof_fee_payable :'',

          Currency: this.singleData?.Currency,
          rate_currency_customer: this.singleData?.Currency ? this.singleData?.Currency[0]?.rate_currency_customer :'',
          Thereof_fee_payable: this.singleData?.Currency ? this.singleData?.Currency[1]?.Thereof_fee_payable :'',

          Exp_Comment_about_the_fee: this.singleData?.Exp_Comment_about_the_fee,
          email_id:this.singleData?.email_id,
          name: this.singleData?.name,
          request_rasied_by: this.singleData?.request_rasied_by,
           type_assessment: this.singleData?.type_assessment,
           Corporate_Scheme_Name: this.singleData?.corporate_scheme? this.singleData?.corporate_scheme[0]?.Corporate_Scheme_Name :'',
           design_function: this.singleData?.design_function,

          Frequency_audit_cycle: this.singleData?.Frequency_audit_cycle,
          otherassement: this.singleData?.expiry_date_of_certi,
        });
    });
    this._configurationalMasterService.getAllLanguage().subscribe((res:any)=>{
          this.languageData = res.data;
        })


  }

  disableAll(){
    if(this.lead_id){
      this.leadForm.controls['Scheduling_with_customer'].disable();
      this.leadForm.controls['Tasks_to_be_done_by_leading_Office'].disable();
      this.leadForm.controls['Tasks_to_be_done_by_answering_Office'].disable();
      this.leadForm.controls['Upload_documents_via_Corp_DB'].disable();
      this.leadForm.controls['Upload_Tasks_to_be_done_by_leading_Office'].disable();
      this.leadForm.controls['Upload_Tasks_to_be_done_by_answering_Office'].disable();
      this.leadForm.controls['Control_of_Technical_review'].disable();
      this.leadForm.controls['Control_Tasks_to_be_done_by_leading_Office'].disable();
      this.leadForm.controls['Control_Tasks_to_be_done_by_answering_Office'].disable();
      this.leadForm.controls['Sending_of_report_to_customer'].disable();
      this.leadForm.controls['Sending_Tasks_to_be_done_by_leading_Office'].disable();
      this.leadForm.controls['Sending_Tasks_to_be_done_by_answering_Office'].disable();

      this.leadForm.controls['Issuance_of_certificate_and_sending_to_customer'].disable();
      this.leadForm.controls['Sending_Tasks_to_be_done_by_answering_Office'].disable();
      this.leadForm.controls['Issuance_Tasks_to_be_done_by_leading_Office'].disable();
      this.leadForm.controls['Issuance_Tasks_to_be_done_by_answering_Office'].disable();
      this.leadForm.controls['Upload_of_documents_into_MyDQS'].disable();
      this.leadForm.controls['Upload_of_documents_into_MyDQS_1st'].disable();
      this.leadForm.controls['Upload_of_documents_into_MyDQS_2snd'].disable();
      this.leadForm.controls['Customer_invoicing'].disable();
      this.leadForm.controls['Customer_invoicing_leading_Office'].disable();
      this.leadForm.controls['Customer_invoicingy_answering_Office'].disable();
      this.leadForm.controls['DQS_Customer_evaluation'].disable();
      this.leadForm.controls['DQS_Customer_leading_Office'].disable();
      this.leadForm.controls['DQS_Customer_answering_Office'].disable();

      this.leadForm.controls['Bills_and_receipts_shall_be_send_with_invoice'].disable();
      this.leadForm.controls['Bills_and_receipts_shall_be_send_with_invoice'].disable();
      this.leadForm.controls['Travel_fee_travel_flat_rates'].disable();
      this.leadForm.controls['Special_price_for_travel_expenses'].disable();
      this.leadForm.controls['DQS_Customer_answering_Office'].disable();
      this.leadForm.controls['See_special_information_attached'].disable();
      this.leadForm.controls['See_special_information_in_GAM_team_room'].disable();
      this.leadForm.controls['site_s_list_add'].disable();
    }
  }

  get f() {
    return this.leadForm.controls;
  }

  fetchSeries(value: String) {
    if (value === '') {
      return (this.searchResult = []);
    }
    this.searchResult = this.allAchievement.filter(function (series: any) {
      return series?.first_name.toLowerCase().startsWith(value);
    });
  }

  getAchievementList() {
    this.recruitService.getAllAchivement().subscribe(
      (res: any) => {
        
        this.allAchievement = res.data;
        this.countryVar = this.allAchievement.map((res: any) => res.first_name);
      this.countryVar2 = this.allAchievement;
      },
      (err: any) => {
        
      }
    );

    this.leadService.getLead().subscribe((res: any) => {
      
      this.allData = res.result;
    });
  }

  brfilter(e:any){
    console.log(e,'thisdfsdafs')

    const aa = e
    let filteredVariables = this.brVar2.filter((item: any) => aa.includes(item.br_number));
    this.ber_No = filteredVariables,
    console.log(this.ber_No,'this')

  }

  countryfilter(e:any){
    console.log(e,'lkhhjlkh');
    
    const aa = e
    let filteredVariable = this.countryVar2.filter((item: any) => aa.includes(item.first_name));
    this.allAchievement = filteredVariable
    console.log(this.allAchievement,'this.countryList')
  }

  candidateClick(e: any) {
    this.candidateId = e;
    // this.recruitService.interViewGetIdBy(e).subscribe((res:any)=>{
    //   this.interviewGetId=res.data;
    //
    //   this.patchFormvalue();
    // })
  }

  // patchFormvalue() {
  //   this.leadForm.patchValue({
  //     customer_type: this.singleLeadData?.customer_type,
  //     site_audit: this.singleLeadData?.multiple_site_audit,
  //     associated_company: this.singleLeadData?.associated_company,
  //     segment: this.singleLeadData?.segment,
  //     br_number: this.singleLeadData?.br_number,
  //     assignedManager: this.singleLeadData?.assigned_hiring_manager,
  //     certificate_type: this.singleLeadData?.certificate_type,
  //     first_name: this.singleLeadData?.first_name,
  //     last_name: this.singleLeadData?.last_name,
  //     categories: this.singleLeadData?.categories,
  //     email: this.singleLeadData?.email,
  //     emplyoment_type: this.singleLeadData?.emplyoment_type,
  //     street_address: this.singleLeadData?.street_address,
  //     job_title: this.singleLeadData?.job_title,
  //     address2: this.singleLeadData?.address2,
  //     city: this.singleLeadData?.city,
  //     state: this.singleLeadData?.state_name,
  //     country: this.singleLeadData?.country_name,
  //     postal_code: this.singleLeadData?.postal_code,
  //     region: this.singleLeadData?.region,
  //     regional_bussiness_lead: this.singleLeadData?.regional_bussiness_lead,
  //     global_managing_director: this.singleLeadData?.global_managing_director,
  //     global_manager_sales: this.singleLeadData?.global_manager_sales,
  //     website_url: this.singleLeadData?.website_url,
  //     phone_number: this.singleLeadData?.phone_number,
  //     mobile_number: this.singleLeadData?.mobile_number,
  //     dqs_contact_source: this.singleLeadData?.dqs_contact_source,
  //     contact_owner:
  //       this.mainEmployeeData?.first_name || this.singleLeadData?.contact_owner,
  //     lead_created_date: this.singleLeadData?.lead_created_date,
  //     standard_program_assement: this.singleLeadData?.standard_program_assement,
  //     remarks: this.singleLeadData?.remarks,
  //     lead_validated_date: this.singleLeadData?.lead_validated_date,
  //     lead_validate_remarks: this.singleLeadData?.lead_validate_remarks,
  //     industry: this.singleLeadData?.industry,
  //     lead_created_by_name:
  //       this.mainEmployeeData?.first_name ||
  //       this.singleLeadData?.lead_created_by_name,
  //     validated_by:
  //       this.mainEmployeeData?.first_name || this.singleLeadData?.validated_by,
  //     customer_category: this.singleLeadData?.customer_category,
  //     employee_count: this.singleLeadData?.employee_count,
  //     company_remarks: this.singleLeadData?.company_remarks,
  //     gst_applicable: this.singleLeadData?.gst_applicable,
  //     gst_number: this.singleLeadData?.gst_number,
  //     pan_number: this.singleLeadData?.pan_number,
  //     tan_number: this.singleLeadData?.tan_number,
  //   });

  //   this._configurationalMasterService.getAllLanguage().subscribe((res:any)=>{
  //     this.languageData = res.data;
  //   })
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

  customerTypeNew() {
    this.cutomerType = false;
  }

  submitForm() {
    if (this.leadForm.invalid) {
      this.toast.error(
        'Required fields should not be empty.',
        'Error Occurred!'
      );
      return;
    }
   
    let val: any = this.leadForm.value;
    let data = {
      email1: val.email1,
      expiry_date_of_certi: moment(val.expiry_date_of_certi).format(
        'YYYY-MM-DD'
      ),
      parent_ref: val.parent_ref,
      due_date: moment(val.due_date).format('YYYY-MM-DD'),
      manifacturing_site: val.manifacturing_site,
      type_of_site: val.type_of_site,
      current_certi: val.current_certi,
      planned_dates: moment(val.planned_dates).format('YYYY-MM-DD'),
      name_legal_status: val.name_legal_status,
      ref_no_s: val.ref_no_s,
      standard_s: val.standard_s,
      scope: val.scope,
      accreditation: val.accreditation,
      dqs_contact_person: val.dqs_contact_person,
      type_assessment: val.type_assessment,
      otherassement: val.otherassement,
      phone1: Number(val.phone1),
      Frequency_audit_cycle: val.Frequency_audit_cycle,
      remote_location: val.remote_location,
      fyi_only: val.fyi_only,

      part_sampling_procedure: [
        {
          part_sampling_procedure: val.part_sampling_procedure,
          procedure_date: val.procedure_date,
        },
      ],

      design_function: val.design_function,
      detailed_calculation: val.detailed_calculation,
      audit_language: val.audit_language,
      no_audit_days: val.no_audit_days,
      certi_req: val.certi_req,
      local_contact_person: val.local_contact_person,
      local_contact_person_phone: val.local_contact_person_phone,
      local_contact_person_email: val.local_contact_person_email,
      site_s_list_add: val.site_s_list_add,
      headcounts: val.headcounts,
      status: 'Request Received',

      corporate_scheme: [
        {
          Corporate_Scheme_Name: val.Corporate_Scheme_Name,
          ref_no: val.ref_no,
        },
        { corporate__name: val.corporate__name },
        { corporate_email: val.corporate_email },
        { corporate_phone: val.corporate_phone },
      ],

      name_id_of_auditor: [
        { name_id_of_auditor_1: val.name_id_of_auditor_1 },
        { name_id_of_auditor_2: val.name_id_of_auditor_2 },
        { name_id_of_auditor_3: val.name_id_of_auditor_3 },
      ],

      rqst_for: val.rqst_for,

      business_sector: [
        { EAC: val.EAC },
        { IAF: val.IAF },
        { SIC: val.SIC },
        { Others: val.Others },
      ],

      fluent_lang_skill_req: [
        { lang: val.fluent_lang_skill_req, value: val.fluent_other_lag },
      ],

      Languages: [{ lang: val.Languages, value: val.other_lag }],

      Format: val.Format,

      Scheduling_with_customer: [
        {
          Tasks_to_be_done_by_leading_Office:
            val.Tasks_to_be_done_by_leading_Office,
        },
        {
          Tasks_to_be_done_by_answering_Office:
            val.Tasks_to_be_done_by_answering_Office,
        },
      ],

      Upload_documents_via_Corp_DB: [
        {
          Upload_Tasks_to_be_done_by_leading_Office:
            val.Upload_Tasks_to_be_done_by_leading_Office,
        },
        {
          Upload_Tasks_to_be_done_by_answering_Office:
            val.Upload_Tasks_to_be_done_by_answering_Office,
        },
      ],

      Control_of_Technical_review: [
        {
          Control_Tasks_to_be_done_by_leading_Office:
            val.Control_Tasks_to_be_done_by_leading_Office,
        },
        {
          Control_Tasks_to_be_done_by_answering_Office:
            val.Control_Tasks_to_be_done_by_answering_Office,
        },
      ],

      Sending_of_report_to_customer: [
        {
          Sending_Tasks_to_be_done_by_leading_Office:
            val.Sending_Tasks_to_be_done_by_leading_Office,
        },
        {
          Sending_Tasks_to_be_done_by_answering_Office:
            val.Sending_Tasks_to_be_done_by_answering_Office,
        },
      ],

      Issuance_of_certificate_and_sending_to_customer: [
        {
          Issuance_Tasks_to_be_done_by_leading_Office:
            val.Issuance_Tasks_to_be_done_by_leading_Office,
        },
        {
          Issuance_Tasks_to_be_done_by_answering_Office:
            val.Issuance_Tasks_to_be_done_by_answering_Office,
        },
      ],

      Upload_of_documents_into_MyDQS: [
        {
          Upload_of_documents_into_MyDQS_1st:
            val.Upload_of_documents_into_MyDQS_1st,
        },
        {
          Upload_of_documents_into_MyDQS_2snd:
            val.Upload_of_documents_into_MyDQS_2snd,
        },
      ],

      Customer_invoicing: [
        {
          Customer_invoicing_leading_Office:
            val.Customer_invoicing_leading_Office,
        },
        {
          Customer_invoicingy_answering_Office:
            val.Customer_invoicingy_answering_Office,
        },
      ],

      DQS_Customer_evaluation: [
        { DQS_Customer_leading_Office: val.DQS_Customer_leading_Office },
        { DQS_Customer_answering_Office: val.DQS_Customer_answering_Office },
      ],

      send_report_or_findings_to: [
        { send_report_name: val.send_report_name },
        { send_report_email: val.send_report_email },
      ],

      Special_agreements_regarding_invoicing_to_customer: [
        {
          Bills_and_receipts_shall_be_send_with_invoice:
            val.Bills_and_receipts_shall_be_send_with_invoice,
        },
        { Travel_fee_travel_flat_rates: val.Travel_fee_travel_flat_rates },
        {
          Special_price_for_travel_expenses:
            val.Special_price_for_travel_expenses,
        },
        { Other_invoice_address: val.Other_invoice_address },
        { Payment_terms: val.Payment_terms },
        {
          See_special_information_attached:
            val.See_special_information_attached,
        },
        {
          See_special_information_in_GAM_team_room:
            val.See_special_information_in_GAM_team_room,
        },
      ],

      Explanation_further_comments: val.Explanation_further_comments,
      Intercompany_Pricing_Model: val.Intercompany_Pricing_Model,

      Daily_rate: [
        { Daily_rate_customer: val.Daily_rate_customer },
        { Daily_rate_pay: val.Daily_rate_pay },
      ],

      Report_fee_recertification: [
        {
          Report_fee_recertification_customer:
            val.Report_fee_recertification_customer,
        },
        { Report_fee_recertification_pay: val.Report_fee_recertification_pay },
      ],

      Report_fee_surveillance_audit: [
        { Report_fee_audit_customer: val.Report_fee_audit_customer },
        { Report_fee_audit_payable: val.Report_fee_audit_payable },
      ],

      Travel_time: [
        {
          Travel_time_rate_currency_customer:
            val.Travel_time_rate_currency_customer,
        },
        {
          Travel_time_Thereof_fee_payable: val.Travel_time_Thereof_fee_payable,
        },
      ],

      Others: [
        { Others_rate_currency_customer: val.Others_rate_currency_customer },
        { Others_Thereof_fee_payable: val.Others_Thereof_fee_payable },
      ],

      Currency: [
        { rate_currency_customer: val.rate_currency_customer },
        { Thereof_fee_payable: val.Thereof_fee_payable },
      ],
      Exp_Comment_about_the_fee: val.Exp_Comment_about_the_fee,
      inter_company_br_number:val.inter_company_br_number,
    };

    console.log('data test', data);
    if(this.lead_id){
      this.leadService.updateInterCompany(this.lead_id).subscribe((res: any) => {
        if (res) {
          this.toast.success(res.message);
          this.route.navigate(['receive-response']
          );
        }
      });
    }else{
      this.leadService.addRequest(data).subscribe((res: any) => {
        if (res) {
          this.toast.success(res.message);
          this.route.navigate([window.location.origin], {
            queryParams: { lead_id: this.lead_id },
          });
        }
      });
    }
  }

  fluentLang(e: any) {
    if (e.value == 'Other') {
      this.otherLang = true;
    }
    if (e.value == 'English') {
      this.leadForm.controls['fluent_other_lag'].reset();
      this.otherLang = false;
    }
  }

  Languages(e: any) {
    if (e.value == 'Other') {
      this.Lang = true;
    }
    if (e.value == 'English') {
      this.leadForm.controls['other_lag'].reset();
      this.Lang = false;
    }
  }

  corporateScheme(e: any) {
    if (e.value == 'Yes') {
      this.ref_no = true;
    }
    if (e.value == 'No') {
      this.ref_no = false;
      this.leadForm.controls['ref_no'].reset();
    }
  }

  Procedure(e: any) {
    if (e.value == 'Yes') {
      this.part_of_sampling_procedure = true;
    } else {
      this.part_of_sampling_procedure = false;
    }
  }

  OtherAsses(e: any) {
    this.value = e.value;
    let getVal = this.value.find((e: any) => e == 'Other Assessment');

    if (getVal) {
      this.assement = true;
    } else {
      this.assement = false;
    }
  }

  selectPayment(e: any) {
    this.inputPay = e.checked;
  }

  selectOtherinvoice(e: any) {
    this.Otherinvoice = e.checked;
  }

  getAll(){
    this.leadService.getAllBrNo().subscribe((res:any)=>{
      this.ber_No =res.data
      
      
      console.log();
      
      this.brVar = this.ber_No.filter((res:any)=>res.br_number!==null).map((res: any) => 
      res?.br_number
      );
      console.log(this.brVar,"chkkkkkcking dataa");
      
      this.brVar2 = this.ber_No;
      this.brVarAfter = this.ber_No;

    })
  }
  focusout(){
    this.ber_No = this.brVarAfter
  }

  getDataWithBr(e:any){
    this.leadService.leadData_br_number(e.value).subscribe((res:any)=>{
      this.lead_data =res.data;
      this.leadForm.patchValue({
        headcounts: this.lead_data.employee_count,
        local_contact_person_email: this.lead_data.email,
        local_contact_person_phone: this.lead_data.phone_number,
        standard_s: this.lead_data.product_request,
        accreditation: this.lead_data.accredition_logo_details,
        email: this.lead_data.email,
        phone: this.lead_data.mobile_number,
        dqs_contact_person:this.lead_data.associated_company,
        rqst_for:this.lead_data.auditorType,
        manifacturing_site:this.lead_data.multiple_site_audit,
        remote_location:this.lead_data.multiple_site_audit,
        part_sampling_procedure:this.lead_data.multiple_site_audit,
        Corporate_Scheme_Name:this.lead_data.multiple_site_audit,
        design_function:this.lead_data.multiple_site_audit,
        certi_req:this.lead_data.multiple_site_audit,
        current_certi:this.lead_data.multiple_site_audit,
        local_contact_person:this.lead_data.contact_owner,
        EAC:this.lead_data.industry_sector,
        scope:this.lead_data?.userrespectiveleads? this.lead_data?.userrespectiveleads[0]?.scope : '',
      })

    })
  }
}
