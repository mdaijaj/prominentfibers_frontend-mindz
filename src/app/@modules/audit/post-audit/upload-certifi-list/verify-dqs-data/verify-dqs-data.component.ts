import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { ConfigurationalmasterService } from 'src/app/@shared/services/configurationalmaster.service';
import { LeadService } from 'src/app/@shared/services/lead.service';
import { UploadVerifyCsvPopupComponent } from '../upload-csv-popup/upload-verify-csv-popup.component';

@Component({
  selector: 'app-verify-dqs-data',
  templateUrl: './verify-dqs-data.component.html',
  styleUrls: ['./verify-dqs-data.component.scss'],
})
export class VerifyDqsDataComponent {
  postAuditForm: any;
  lead_id: any;
  id: any;
  singleLeadData: any;
  auditGetByData: any;
  traingNameData: any;
  now = new Date();
  year = this.now.getFullYear();
  month = this.now.getMonth();
  // day = this.now.getDay();
  date = this.now.getDate();
  maxDate = moment({ year: this.year + 100, month: this.month, date: this.date }).format('YYYY-MM-DD');
  minDate = moment({ year: this.year - 0, month: this.month, date: this.date }).format('YYYY-MM-DD');
  cityList: any;
  pinCodeList: any;
  stateList: any;
  pinCodeTrue: boolean = true;
  countryList: any;
  leadUpdate: any;
  cellValue: any;
  constructor(
    private fb: FormBuilder,
    private toast: ToastrService,
    private route: Router,
    private configService: ConfigurationalmasterService,
    private activeted: ActivatedRoute,
    private leadService: LeadService,
    private activeroute: ActivatedRoute,
    public dialog: MatDialog
  ) {
    this.postAuditForm = this.fb.group({
      associated_company: new FormControl(null),
      first_name: new FormControl(null),
      br_number: new FormControl(null),
      street_address: new FormControl(null),
      address2: new FormControl(null),
      city: new FormControl(null),
      state: new FormControl(null),
      country: new FormControl(null),
      postal_code: new FormControl(null),
      product_request: new FormControl(null),
      opportunity_type: new FormControl(null),
      assessment_period: new FormControl(null),
      ea_code: new FormControl(null),
      accredition_logo_details: new FormControl(null),
      add_cert_copy: new FormControl(null),
      auditorType: new FormControl(null),
      auditor_name: new FormControl(null),
      eaCode: new FormControl(null),
      auditorType2: new FormControl(null),
      auditor_name2: new FormControl(null),
      eaCode2: new FormControl(null),
      certificate_id: new FormControl(null),
      business_relation_id: new FormControl(null),
      standard_id: new FormControl(null),
      other_standard_id: new FormControl(null),
      industry_code_id: new FormControl(null),
      date_of_issue: new FormControl(null),
      valid_until: new FormControl(null),
      sort_name: new FormControl(null),
      date_of_first_issue: new FormControl(null),
      main_certificate_id: new FormControl(null),
      owner_business_relation_id: new FormControl(null),
      publishing_enable: new FormControl(null),
      is_excerpt: new FormControl(null),
      is_main_certificate: new FormControl(null),
      status_id: new FormControl(null),
      pdf_download: new FormControl(null),
      iaif_number: new FormControl(null),
      unit_id: new FormControl(null),
      accredition_id: new FormControl(null),
      registration_id: new FormControl(null),
      date_varified: new FormControl(null),
      tableRows: new FormArray([
        new FormGroup({
          auditor_name:new FormControl(),
          auditorType:new FormControl(),
          eaCode:new FormControl()
        })
      ]),
    });
  }

  ngOnInit():void{
    this.activeroute.queryParams.subscribe(params => {
      this.id = params;
      this.lead_id = this.id.lead_id;
      this.leadUpdate = this.id.type;  
      this.getById_audit()
      // this.leadService.getByIdLead(this.lead_id).subscribe((res: any) => {
      //   this.singleLeadData = res.data;
      //   
      //  this.patchFormvalue()
      // })
    });
    this.getCountry();
  }
  getById_audit() {
    this.leadService.getByIdLead(this.lead_id).subscribe((res: any) => {
      this.singleLeadData = res.data;
      

      this.patchFormvalue();

      this.traingNameData=this.singleLeadData.trainee_auditor_name;
      
      let data: any = [];
      // if ( this.traingNameData.length != 0) {
      //   for (let i = 0; i <= this.traingNameData.length - 1; i++) {
    
          data.push({
            auditor_name: this.traingNameData,
            auditorType:"Co-Auditor",
            eaCode:res.data.ea_code,
           })
        // }
        this.CF_1.tableRows = this.patchData(data);
      // }
    })
  }
  get CF_1(): any { return this.postAuditForm.controls };

  patchData(e: any): FormArray {
    return new FormArray(
      e.map((x: any) => {
        const obj = new FormGroup({});
        Object.keys(x).forEach(k => {
          obj.addControl(k, new FormControl(x[k]));
        });
        return obj;
      })
    );
  }
  getCountry() {
    this.configService.getCountry().subscribe((res: any) => {
      this.countryList = res.data;
      
    });
  }
  submitForm() {
    // if (this.postAuditForm.invalid) {
    //   this.toast.error(
    //     'Required fields should not be empty.',
    //     'Error Occurred!'
    //   );
    //   return;
    // }
    let val = this.postAuditForm.value;
    

    const data = {
      associated_company: val.associated_company,
      first_name: val.first_name,
      br_number: val.br_number,
      street_address: val.street_address,
      address2: val.address2,
      city: val.city,
      state: val.state,
      country: val.country,
      postal_code: val.postal_code,
      product_request: val.product_request,
      opportunity_type: val.opportunity_type,
      assessment_period: val.assessment_period,
      ea_code: val.ea_code,
      accredition_logo_details: val.accredition_logo_details,
      add_cert_copy: val.add_cert_copy,
      auditorType: val.auditorType,
      auditor_name: val.auditor_name,
      eaCode: val.eaCode,
      auditorType2: val.auditorType2,
      auditorName2: val.auditorName2,
      eaCode2: val.eaCode2,
      auditorType3: val.auditorType3,
      auditorName3: val.auditorName3,
      eaCode3: val.eaCode3,
      certificate_id: val.certificate_id,
      business_relation_id: val.business_relation_id,
      standard_id: val.standard_id,
      other_standard_id: val.other_standard_id,
      industry_code_id: val.industry_code_id,
      date_of_issue: val.date_of_issue,
      valid_until: val.valid_until,
      sort_name: val.sort_name,
      date_of_first_issue: val.date_of_first_issue,
      main_certificate_id: val.main_certificate_id,
      owner_business_relation_id: val.owner_business_relation_id,
      publishing_enable: val.publishing_enable,
      is_excerpt: val.is_excerpt,
      is_main_certificate: val.is_main_certificate,
      status_id: val.status_id,
      pdf_download: val.pdf_download,
      iaif_number: val.iaif_number,
      unit_id: val.unit_id,
      accredition_id: val.accredition_id,
      registration_id: val.registration_id,
      date_varified: val.date_varified,
      status: 'Verified DQS Data',
      certificate_status: 'Active',

    };
    this.leadService.editLead( this.lead_id, data).subscribe((res: any) => {
      
      // this.route.navigate(["master/lead/lead-management/assign-lead"]),
      this.toast.success("Lead Successfully..");
      // alert("successfully verified dqs")
      this.route.navigate(
        ['master/audit/post-audit/verified-dqs-data'],
        { queryParams: { lead_id:this.lead_id } }
      );
    })
  }
  updateForm(){
    // this.submitted = false;
    // if (this.postAuditForm.invalid) {
      
    //   this.toast.error('Required fields should not be empty.', 'Error Occurred!');
    //   return;
    // }
    const data = this.postAuditForm.value;
    
    this.leadService.editLead(this.lead_id, data).subscribe((res:any) => {
      
      
      this.toast.success("Updated Assignment Successfully..")
      this.route.navigate(['master/audit/post-audit/upload-docs-list']);
    })

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
      
      if (this.pinCodeList.length === 0) {
        this.pinCodeTrue = true;
      } else {
        this.pinCodeTrue = false;
      }
    });
  }

  patchFormvalue() {
    
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
        
        // if (this.pinCodeList.length === 0) {
        //   this.pinCodeTrue = true;
        // } else {
        //   this.pinCodeTrue = false;
        // }
      });
    }
    this.postAuditForm.patchValue({
     
      associated_company: this.singleLeadData?.associated_company,
      segment: this.singleLeadData?.segment,
      br_number: this.singleLeadData?.br_number,
      first_name: this.singleLeadData?.first_name,
      street_address: this.singleLeadData?.street_address,
      address2: this.singleLeadData?.address2,
      city: this.singleLeadData?.city,
      state: this.singleLeadData?.state,
      country: this.singleLeadData?.country,
      postal_code: this.singleLeadData?.postal_code,
      region: this.singleLeadData?.region,
      assessment_period: this.singleLeadData?.assessment_period,
      ea_code: this.singleLeadData?.ea_code,
      add_cert_copy: this.singleLeadData?.add_cert_copy,
      accredition_logo_details: this.singleLeadData?.accredition_logo_details,
      auditorName: this.singleLeadData?.auditorName,
      // auditorName2: auditGetByData.auditorName2,
      // auditorName3: auditGetByData.auditorName3,
      CGCMNeeded: this.singleLeadData?.CGCMNeeded,
      // eaCode:auditGetByData.eacode ,
      // eaCode2: auditGetByData.eaCode2,
      // eaCode3: auditGetByData.eaCode3
      auditor_name2: this.singleLeadData?.auditor_name,
      auditorType:"Co-Auditor",
      // auditor_name:auditGetByData.auditor_name,
      auditorType2:"Lead Auditor",
      auditorName2:this.singleLeadData?.auditorName2,
      eaCode:this.singleLeadData?.ea_code,
      eaCode2:this.singleLeadData?.ea_code,
      opportunity_type:this.singleLeadData?.opportunity_type,
      product_request:this.singleLeadData?.product_request,
      certificate_id:this.singleLeadData?.main_certificate_id,
     business_relation_id:this.singleLeadData?.owner_business_relation_id,
     standard_id:this.singleLeadData?.standard_id,
     other_standard_id:this.singleLeadData?.other_standard_id,
     industry_code_id:this.singleLeadData?.industry_code_id,
    date_of_issue:this.singleLeadData?.date_of_issue,
    valid_until:this.singleLeadData?.valid_until,
    sort_name:this.singleLeadData?.sort_name,
    date_of_first_issue:this.singleLeadData?.date_of_first_issue,
    main_certificate_id:this.singleLeadData?.main_certificate_id,
    owner_business_relation_id:this.singleLeadData?.owner_business_relation_id,
    publishing_enable:this.singleLeadData?.publishing_enable,
   is_excerpt:this.singleLeadData?.is_excerpt,
   is_main_certificate:this.singleLeadData?.is_main_certificate,
   status_id:this.singleLeadData?.status_id,
  pdf_download:this.singleLeadData?.pdf_download,
  iaif_number:this.singleLeadData?.iaif_number,
  unit_id:this.singleLeadData?.unit_id,
  accredition_id:this.singleLeadData?.accredition_id,
  registration_id:this.singleLeadData?.registration_id,
           
date_varified:this.singleLeadData?.date_varified
    })
  }
  reject() {
    const data = {
      status: "Rejected"
    }
    this.leadService.editLead(this.lead_id, data).subscribe((res:any) => {
      
      this.toast.success(res.message);
      this.route.navigate(['master/audit/post-audit/upload-docs-list'],
        { queryParams: { lead_id: this.lead_id } }
      );
    })
  }
  get getFormControls() {
    const control = this.postAuditForm.get('tableRows') as FormArray;
    return control;
  };
  openDialog() {
    const dialogRef = this.dialog.open(UploadVerifyCsvPopupComponent, {
      width: '30%',
      // maxWidth: '100vw',
      // maxHeight: '60vh',
      // height: '60%',
      // panelClass: 'full-screen-modal',
      data: { id: this.cellValue },
    });
  }

  getCurrentRoute():string{
    return this.activeroute.snapshot.url.map(s => s.path).join('/')
}
}
