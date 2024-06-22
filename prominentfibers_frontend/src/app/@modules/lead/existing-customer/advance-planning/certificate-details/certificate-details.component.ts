import { Component, OnInit,Inject } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ConfigurationalmasterService } from 'src/app/@shared/services/configurationalmaster.service';
import { ToastrService } from 'ngx-toastr';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
@Component({
  selector: 'app-certificate-details',
  templateUrl: './certificate-details.component.html',
  styleUrls: ['./certificate-details.component.scss']
})
export class CertificateDetailsComponent implements OnInit{
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
constructor(private fb: FormBuilder,
  private config_service:ConfigurationalmasterService,
  private toast: ToastrService,){
  this.form = this.fb.group({
    // offerCTC: new FormControl('',Validators.required), 
    // joiningDate: new FormControl('',Validators.required), 
    // joiningDate1: new FormControl('',Validators.required), 
    // joiningDate2: new FormControl('',Validators.required), 
    // reportingTime: new FormControl(''), 
    // offerValidTill: new FormControl('',Validators.required),
    
    certificateID: new FormControl('',Validators.required), 
    businessRelationId: new FormControl('',Validators.required),
    standardID: new FormControl('',Validators.required),
    otherStandardId: new FormControl('',Validators.required),
    certificateValidDate: new FormControl('',Validators.required),
    RAtraDUEdate: new FormControl('',Validators.required),
    industryCodeId: new FormControl('',Validators.required),
    sortName: new FormControl('',Validators.required),
    dateOfFirstIssue: new FormControl('',Validators.required),
    mainCertificateId: new FormControl('',Validators.required),
    ownerBusinessRelationId: new FormControl('',Validators.required),
    publishingEnabled: new FormControl(''),
    IsExcerpt: new FormControl(''),
    IsMainCertificate: new FormControl(''),
    statusId: new FormControl(''),
    pdfDownload: new FormControl(''),
    IATFnumber: new FormControl('',Validators.required),
    unitId: new FormControl('',Validators.required),
    AccreditationId: new FormControl('',Validators.required),
    RegistrationId: new FormControl('',Validators.required), 
    dataVerified: new FormControl(''),
  });
}

ngOnInit(): void {
  
}

productSave(){
  

  if (this.form.invalid) {
    this.toast.error('Enter Required Field', 'Something Went Wrong')
    return;
  }
  let val = this.form.value;
}

}
