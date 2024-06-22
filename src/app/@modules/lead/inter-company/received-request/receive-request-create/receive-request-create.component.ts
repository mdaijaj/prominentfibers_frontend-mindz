import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { calendarFormat } from 'moment';
import { ToastrService } from 'ngx-toastr';
import { EmpRegistrationService } from 'src/app/@shared/services/emp-registration.service';
import { LeadService } from 'src/app/@shared/services/lead.service';
import { RecruitService } from 'src/app/@shared/services/recruitment.service';
import { ConfigurationalmasterService } from '../../../../../@shared/services/configurationalmaster.service';

@Component({
  selector: 'app-receive-request-create',
  templateUrl: './receive-request-create.component.html',
  styleUrls: ['./receive-request-create.component.scss'],
})
export class ReceiveRequestCreateComponent {
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
  countryList: any;
  countryName: any;
  stateList: any;
  stateName: any;
  Frequency_audit_cycle: string;
  otherLang: boolean;
  Lang: boolean;
  Otherinvoice: any;
  inputPay: any;
  allData: any;
  ref_no: boolean;
  singleData: any;
  languageData: any;
  ber_No: any;
  lead_data: any;
  countryVar: any;
  countryVar2: any;
  empList: any;
  brVarAfter: any;
  brVar2: any;
  brVar: any;
  loginUser: any;
  constructor(
    // private configService: ConfigurationalmasterService,
    private fb: FormBuilder, private _empRegistration: EmpRegistrationService,
    private leadService: LeadService, private toast: ToastrService,
    private route: Router, private recruitService: RecruitService, private activeroute: ActivatedRoute,
    private _configurationalMasterService: ConfigurationalmasterService,) {
    this.leadForm = this.fb.group({
      expiry_date_of_certi: new FormControl(null),
      parent_ref: new FormControl(null,[Validators.required]),
      due_date: new FormControl(null),
      manifacturing_site: new FormControl(null),
      status: new FormControl(null),
      current_certi: new FormControl(null),
      planned_dates: new FormControl(null),
      name_legal_status: new FormControl(null,[Validators.required]),
      ref_no_s: new FormControl(null,[Validators.required]),
      ref_no: new FormControl(null),
      inter_company_br_number: new FormControl(null),
      Corporate_scheme_ref_no: new FormControl(null),
      standard_s: new FormControl(null),
      scope: new FormControl(null),
      accreditation: new FormControl(null),
      dqs_contact_person: new FormControl(null,[Validators.required]),
      type_assessment: new FormControl(null),
      phone: new FormControl(null,[Validators.required]),
      Frequency_audit_cycle: new FormControl(null),
      remote_location: new FormControl(null),
      email: new FormControl(null, [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]),
      part_sampling_procedure: new FormControl(null),
      corporate_scheme: new FormControl(null),
      design_function: new FormControl(null),
      detailed_calculation: new FormControl(null),
      corporate__name: new FormControl(null),
      corporate_email: new FormControl(null),
      corporate_phone: new FormControl(null),
      audit_language: new FormControl(null),
      no_audit_days: new FormControl(null),
      certi_req: new FormControl(null),
      local_contact_person: new FormControl(null, [Validators.required]),
      site_s_list_add: new FormControl(null),
      headcounts: new FormControl(null),
      local_contact_person_phone: new FormControl(null, [Validators.required]),
      local_contact_person_email: new FormControl(null, [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]),
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
      Upload_Tasks_to_be_done_by_leading_Office: new FormControl(null), Upload_Tasks_to_be_done_by_answering_Office: new FormControl(null),
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
      Corporate_Scheme_Name: new FormControl(null),
    })
  }

  ngOnInit() {
    let lg: any = localStorage.getItem('signInUser')
    this.loginUser = JSON.parse(lg);
    console.log('test',this.loginUser);
    
    this.getAchievementList();
    this._configurationalMasterService.getAllLanguage().subscribe((res:any)=>{
      this.singleData = res.data;
      
      console.log('data', window.location.origin)
    })

    this._configurationalMasterService.getAllLanguage().subscribe((res:any)=>{
      this.languageData = res.data;
    })
    this.getAll();
    this.leadForm.patchValue({
      request_rasied_by: this.loginUser.first_name
    })
  }

  get f() {
    return this.leadForm.controls;
  }

  fetchSeries(value: String) {
    if (value === '') {
      return (this.searchResult = []);
    }
    this.searchResult = this.allAchievement.filter(function (series: any) {

      return series.first_name.toLowerCase().startsWith(value);
    });
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






  corporateScheme(e:any){
    
    if(e.value== 'Yes'){
      this.ref_no =true;
    }
    if(e.value== 'No'){
      this.ref_no =false;
      this.leadForm.controls['ref_no'].reset()
    }
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
  fluentLang(e: any) {

    if (e.value == 'Other') {
      this.otherLang = true;
    }
    if (e.value == 'English') {
      this.leadForm.controls['fluent_other_lag'].reset()
      this.otherLang = false;
    }
  }
  Languages(e: any) {

    if (e.value == 'Other') {
      this.Lang = true;
    }
    if (e.value == 'English') {
      this.leadForm.controls['other_lag'].reset()
      this.Lang = false;
    }
  }
  selectOtherinvoice(e: any) {
    this.Otherinvoice = e.checked;
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
    const aa = e
    let filteredVariable = this.countryVar2.filter((item: any) => aa.includes(item.first_name));
    this.allAchievement = filteredVariable
    console.log(this.allAchievement,'this.countryList')
  }



  selectPayment(e: any) {
    this.inputPay = e.checked;
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
      email1: val.email,
      expiry_date_of_certi: moment(val.expiry_date_of_certi).format('YYYY-MM-DD'),
      parent_ref: val.parent_ref,
      due_date: moment(val.due_date).format('YYYY-MM-DD'),
      manifacturing_site: val.manifacturing_site,
      current_certi: val.current_certi,
      planned_dates: moment(val.planned_dates).format('YYYY-MM-DD'),
      name_legal_status: val.name_legal_status,
      ref_no_s: val.ref_no_s,
      inter_company_br_number:val.inter_company_br_number,
      standard_s: val.standard_s,
      scope: val.scope,
      accreditation: val.accreditation,
      dqs_contact_person: val.dqs_contact_person,
      type_assessment: val.type_assessment,
      phone1: Number(val.phone),
      Frequency_audit_cycle: val.Frequency_audit_cycle,
      remote_location: val.remote_location,
      part_sampling_procedure: val.part_sampling_procedure,
      corporate_scheme:[
        {Corporate_Scheme_Name:val.Corporate_Scheme_Name, ref_no:val.ref_no},
        {corporate__name: val.corporate__name},
        {corporate_email: val.corporate_email},
        {corporate_phone: val.corporate_phone}

      ],
      design_function: val.design_function,
      detailed_calculation: val.detailed_calculation,
      audit_language: val.audit_language,
      no_audit_days: val.no_audit_days,
      certi_req: val.certi_req,
      local_contact_person: val.local_contact_person,
      local_contact_person_phone: val.local_contact_person_phone,
      local_contact_person_email: val.local_contact_person_email,
      sampling_last_audit_date: val.sampling_last_audit_date,
      site_s_list_add: val.site_s_list_add,
      headcounts: val.headcounts,
      status: "Request Raised",

      type_of_site:val.type_of_site,
      otherassement: val.otherassement,
      fyi_only:val.fyi_only,
      name_id_of_auditor:[
        {name_id_of_auditor_1:val.name_id_of_auditor_1},
        {name_id_of_auditor_2:val.name_id_of_auditor_2},
        {name_id_of_auditor_3:val.name_id_of_auditor_3},


      ],

      rqst_for:val.rqst_for,


      business_sector:[
        {EAC:val.EAC},
        {IAF:val.IAF},
        {SIC:val.SIC},
        {Others:val.Others},

      ],

      fluent_lang_skill_req:[
        {lang: val.fluent_lang_skill_req, value: val.fluent_other_lag},
      ],

      Languages:[
      {lang: val.Languages, value: val.other_lag},
    ],

      Format:val.Format,

      Scheduling_with_customer:[
        {Tasks_to_be_done_by_leading_Office:val.Tasks_to_be_done_by_leading_Office},
        {Tasks_to_be_done_by_answering_Office:val.Tasks_to_be_done_by_answering_Office},
      ],

      Upload_documents_via_Corp_DB:[
        {Upload_Tasks_to_be_done_by_leading_Office:val.Upload_Tasks_to_be_done_by_leading_Office},
        {Upload_Tasks_to_be_done_by_answering_Office:val.Upload_Tasks_to_be_done_by_answering_Office},
      ],

      Control_of_Technical_review:[
        {Control_Tasks_to_be_done_by_leading_Office:val.Control_Tasks_to_be_done_by_leading_Office},
        {Control_Tasks_to_be_done_by_answering_Office:val.Control_Tasks_to_be_done_by_answering_Office},
      ],

      Sending_of_report_to_customer:[
        { Sending_Tasks_to_be_done_by_leading_Office:val.Sending_Tasks_to_be_done_by_leading_Office},
        {Sending_Tasks_to_be_done_by_answering_Office:val.Sending_Tasks_to_be_done_by_answering_Office},
      ],

      Issuance_of_certificate_and_sending_to_customer:[
        { Issuance_Tasks_to_be_done_by_leading_Office:val.Issuance_Tasks_to_be_done_by_leading_Office},
        {Issuance_Tasks_to_be_done_by_answering_Office:val.Issuance_Tasks_to_be_done_by_answering_Office},
      ],

      Upload_of_documents_into_MyDQS:[
        { Upload_of_documents_into_MyDQS_1st:val.Upload_of_documents_into_MyDQS_1st},
        {Upload_of_documents_into_MyDQS_2snd:val.Upload_of_documents_into_MyDQS_2snd},
      ],

      Customer_invoicing:[
        {Customer_invoicing_leading_Office:val.Customer_invoicing_leading_Office},
        {Customer_invoicingy_answering_Office:val.Customer_invoicingy_answering_Office},
      ],

      DQS_Customer_evaluation:[
        {DQS_Customer_leading_Office:val.DQS_Customer_leading_Office},
        {DQS_Customer_answering_Office:val.DQS_Customer_answering_Office },
      ],


      send_report_or_findings_to:[
        {send_report_name:val.send_report_name},
        {send_report_email:val.send_report_email},
      ],

      Special_agreements_regarding_invoicing_to_customer: [
      {Bills_and_receipts_shall_be_send_with_invoice: val.Bills_and_receipts_shall_be_send_with_invoice},
      {Travel_fee_travel_flat_rates: val.Travel_fee_travel_flat_rates},
      {Special_price_for_travel_expenses:val.Special_price_for_travel_expenses},
      {Other_invoice_address:val.Other_invoice_address},
      {Payment_terms:val.Payment_terms},
      {See_special_information_attached:val.See_special_information_attached},
      {See_special_information_in_GAM_team_room:val.See_special_information_in_GAM_team_room},
      ],

      Explanation_further_comments:val.Explanation_further_comments,
      Intercompany_Pricing_Model:val.Intercompany_Pricing_Model,

      Daily_rate:[
        { Daily_rate_customer: val.Daily_rate_customer},
        { Daily_rate_pay: val.Daily_rate_pay},
      ],

      Report_fee_recertification: [
        { Report_fee_recertification_customer: val.Report_fee_recertification_customer},
        { Report_fee_recertification_pay: val.Report_fee_recertification_pay},
      ],


      Report_fee_surveillance_audit: [
        { Report_fee_audit_customer: val.Report_fee_audit_customer},
        { Report_fee_audit_payable: val.Report_fee_audit_payable},
      ],

      Travel_time:[
        { Travel_time_rate_currency_customer: val.Travel_time_rate_currency_customer},
        { Travel_time_Thereof_fee_payable: val.Travel_time_Thereof_fee_payable},
      ],

      Others:[
        { Others_rate_currency_customer: val.  Others_rate_currency_customer},
        { Others_Thereof_fee_payable: val.Others_Thereof_fee_payable},
      ],

      Currency:[
        { rate_currency_customer: val.rate_currency_customer},
        { Thereof_fee_payable: val.Thereof_fee_payable},
      ],
      Exp_Comment_about_the_fee:val.Exp_Comment_about_the_fee,
      inter_company_status: 'yes',
      email_id:val.email_id,
      name: val.name,
      request_rasied_by:val.request_rasied_by,
      website_url_new_3: window.location.origin+'/request-form',
    }
    this.leadService.addRequest(data).subscribe((res: any) => {
      this.route.navigate(['master/lead/inter-company/rise-request']);
      this.toast.success(res.message);
    },(err)=>{
      this.toast.error(err.error.message);
    })
  }

}
