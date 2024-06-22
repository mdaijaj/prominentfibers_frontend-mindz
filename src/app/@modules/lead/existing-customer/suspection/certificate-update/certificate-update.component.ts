import { Component, OnInit,Inject } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ConfigurationalmasterService } from 'src/app/@shared/services/configurationalmaster.service';
import { ToastrService } from 'ngx-toastr';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { LeadService } from 'src/app/@shared/services/lead.service';
import { Location } from '@angular/common';
@Component({
  selector: 'app-certificate-update',
  templateUrl: './certificate-update.component.html',
  styleUrls: ['./certificate-update.component.scss']
})
export class CertificateUpdateComponent {
  form:FormGroup;
  fff:any;
  imageToUpload:any;
  imageToUpload1:any;
  imagePath: any;
  imagePath1: any;
  data1:any;
  getData:any;
  // data:any;
  dddd:any ='';
  productDataId:any;
  notification: any="CSP";
  getLeadbyID: any;
  patch_value: any;
  lead_id: any;
  stage: any;
  cityName: any;
  stateName: any;
  totalMandays: any;
  stages: any;
  product_details: any;
  auditStartDate: void;
  auditEndDate: any;
  companyName: any;
  br: any;
 
constructor(private fb: FormBuilder,
  private config_service:ConfigurationalmasterService,
  private activateRoute: ActivatedRoute,
  private leadService: LeadService,
  private location: Location,
  private toast: ToastrService,){
    this.activateRoute.queryParams.subscribe((res:any)=>{
      this.notification=res.notification,
      this.lead_id=res.lead_generate_id,
      // 
      this.getByIdCertificate(this.lead_id)
      
    })

  this.form = this.fb.group({
    certificate_id: new FormControl('',Validators.required), 
    BR_id: new FormControl('',Validators.required), 
    Stander_id: new FormControl('',Validators.required), 
    other_id: new FormControl('',Validators.required), 
    Cer_valid_date: new FormControl(''), 
    RA_TRA_date: new FormControl(''), 
    // Notification_CIF: new FormControl(''), 
    industry_code: new FormControl('',Validators.required), 
    shortName: new FormControl('',Validators.required), 
    email_id: new FormControl('',Validators.required), 
    reason: new FormControl('',Validators.required), 
    comment: new FormControl('',Validators.required), 
    firstIssue: new FormControl('',Validators.required), 
    mainCentificateID: new FormControl('',Validators.required), 
    ownerRelationID: new FormControl('',Validators.required), 
    publishEnabled: new FormControl('',Validators.required), 
    isExcerpt: new FormControl('',Validators.required), 
    isMainCertificate: new FormControl('',Validators.required), 
    status: new FormControl('',Validators.required), 
    pdfDownload: new FormControl('',Validators.required), 
    IATF: new FormControl('',Validators.required), 
    unitID: new FormControl('',Validators.required), 
    AccreditationId: new FormControl('',Validators.required), 
    RegistrationId: new FormControl('',Validators.required), 
    dataVerified: new FormControl('',Validators.required), 



  });
}

ngOnInit(): void {
  console.log("dd");
}
goBack() {
  this.location.back();
}

getByIdCertificate(leadID:any){
  this.leadService.getByIdCertificate(leadID).subscribe((res:any)=>{
    this.getLeadbyID=res.data
    this.cityName=res.data.city
    this.stateName=res.data.state
    this.totalMandays=res.data.totalMandays ||"mandays"
    this.stages=res.data.stage || "stage"
    this.stages=res.data.stage || "stage"
    this.product_details=res.data.product_details
    this.auditStartDate=res.data.auditor_start_date
    this.auditEndDate=res.data.auditor_end_date
    this.companyName=res.data.associated_company
    this.br=res.data.br_number

    
    this.patch_value = this.form.patchValue({
      certificate_id: this.getLeadbyID.main_certificate_id,
      BR_id: this.getLeadbyID.br_number,
      Stander_id: this.getLeadbyID.standard_id,
      other_id: this.getLeadbyID.standard_program_assement,
      Cer_valid_date: this.getLeadbyID.valid_until,
      RA_TRA_date: this.getLeadbyID.training_end_date,
      Notification_CIF: this.getLeadbyID.iaif_number,
      industry_code: this.getLeadbyID.industry_code_id,
      shortName: this.getLeadbyID.sort_name,
      email_id: this.getLeadbyID.email,
      reason: this.getLeadbyID.reason1,
      firstIssue: this.getLeadbyID.date_of_first_issue,
      mainCentificateID: this.getLeadbyID.comments1,
      ownerRelationID: this.getLeadbyID.owner_business_relation_id,
      publishEnabled: this.getLeadbyID.publishing_enable,
      isMainCertificate: this.getLeadbyID.main_certificate_id,
      isExcerpt: this.getLeadbyID.is_excerpt,
      status: this.getLeadbyID.comments1,
      pdfDownload: this.getLeadbyID.pdf_download,
      IATF: this.getLeadbyID.iaif_number,
      AccreditationId: this.getLeadbyID.accredition_id,
      RegistrationId: this.getLeadbyID.registration_id,
      dataVerified: this.getLeadbyID.comments1, 
      unitID: this.getLeadbyID.unit_id, 
      comment: this.getLeadbyID.comments1, 
    })
  })
  
  
}

productSave(forms:any){
  
  const data={
    certificate_id:this.form.value.certificate_id,
    business_relation_id:this.form.value.BR_id,
    // email_id:this.form.value.email_id,
    standard_id:this.form.value.Stander_id,
    other_standard_id:this.form.value.other_id,
    valid_until:this.form.value.Cer_valid_date,
    // other_expence:this.form.value.RA_TRA_date,
    industry_code_id:this.form.value.industry_code,
    sort_name:this.form.value.shortName,
    date_of_first_issue:this.form.value.firstIssue,
    main_certificate_id:this.form.value.mainCentificateID,
    owner_business_relation_id:this.form.value.ownerRelationID,
    publishing_enable:this.form.value.publishEnabled,
    is_excerpt:this.form.value.isExcerpt,
    is_main_certificate:this.form.value.isMainCertificate,
    pdf_download:this.form.value.pdfDownload,
    iaif_number:this.form.value.IATF,
    accredition_id:this.form.value.AccreditationId,
    registration_id:this.form.value.RegistrationId,
    date_varified:this.form.value.dataVerified,
    certificate_status:this.form.value.status,
    
  }
  this.leadService.certificate_update(this.lead_id,data)
  .subscribe((res:any)=>{
    console.log(res,"certificate update");
    this.toast.success('Successfully Update')

    this.goBack();
  },
  (error)=>{
    this.toast.error('Something Went Wrong')
    
  })
  

  // if (this.form.invalid) {
  //   this.toast.error('Enter Required Field', 'Something Went Wrong')
  //   return;
  // }
  let val = this.form.value;
}

}


