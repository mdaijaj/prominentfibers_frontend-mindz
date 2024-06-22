import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import * as moment from 'moment';
import { LeadService } from 'src/app/@shared/services/lead.service';
import { ConfigurationalmasterService } from 'src/app/@shared/services/configurationalmaster.service';

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
  selector: 'app-techreview-audit-verfication',
  templateUrl: './techreview-audit-verfication.component.html',
  styleUrls: ['./techreview-audit-verfication.component.scss']
})
export class TechreviewAuditVerficationComponent {
 // displayedColumns: string[] = ['stage', 'noOfMandays'];
 br2: any;
 parentSide: boolean;
 br1: any;
 postAuditForm: FormGroup;
 dataSource = ELEMENT_DATA;
 displayedColumns: string[] = ['account_name', 'br_number'];
 audit_postId: any;
 auditGetByData: any;
 lead_id: any;
 countryList: any;
 stateList: any;
 cityList: any;
 errorMsg: string = '';
 fileDetails: { filePath: string | any; file: any } = {
   filePath: '',
   file: null,
 };

 fileDetailsThree: { filePath: string | any; file: any } = {
   filePath: '',
   file: null,
 };

 // gst fils
 fileDetailsOne: { filePath: string | any; file: any } = {
   filePath: '',
   file: null,
 };

 // company logo
 fileDetailsTwo: { filePath: string | any; file: any } = {
   filePath: '',
   file: null,
 };

 // file other
 fileDetailsFour: { filePath: string | any; file: any } = {
   filePath: '',
   file: null,
 };

 fileDetailsAgree: { filePath: string | any; file: any } = {
   filePath: '',
   file: null,
 };

 // feaDoc
 fileDetailsFeaDoc: { filePath: string | any; file: any } = {
   filePath: '',
   file: null,
 };

 // otherMondaychange
 fileDetailsOtherManday: { filePath: string | any; file: any } = {
   filePath: '',
   file: null,
 };

 purchaseOrder: { filePath: string | any; file: any } = {
   filePath: '',
   file: null,
 };
 stageData: any;
 FromDate: string;
 toDate: string;
 traingNameData: any;
 pinCodeList: any;
 pinCodeTrue: boolean = true;
 leadUpdate: any;
 techreviewaudit_id: any;
 rejectData:any;
 techreviewData: any;
 check: any;
 check_status: any;
 savedata:boolean = false;
 auditorStatus:any;
  singleLeadData: any;
  singleLeadData1: any;
  childSide: boolean;
  child_br_number: any;
 constructor(private fb: FormBuilder,
   private route: Router,
   private configService: ConfigurationalmasterService,
   private toast: ToastrService, private activeted: ActivatedRoute, private leadService: LeadService) {
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
     billing_site: new FormControl(null),

     // Auditor Eligible SIC Code Details
     auditorType: new FormControl(null),
     auditor_name: new FormControl(null),
     eaCode: new FormControl(null),
     auditorType2: new FormControl(null),
     auditor_name2: new FormControl(null),
     eaCode2: new FormControl(null),
     // auditorType3: new FormControl(null),
     // auditorName3: new FormControl(null),
     // eaCode3: new FormControl(null),
     contact_review_form: new FormControl(null),
     contact_review_form2: new FormControl(null),
     contact_review_form3: new FormControl(null),
     contact_review_form4: new FormControl(null),
     contact_review_form5: new FormControl(null),
     contact_review_form6: new FormControl(null),
     contact_review_form7: new FormControl(null),
     contact_review_form8: new FormControl(null),
     contact_review_form9: new FormControl(null),
     auditor_remarks:new FormControl(null),
     review_date:new FormControl(null),
     remarks: new FormControl(null),
     status: new FormControl(null,Validators.required),
     // CGCMNeeded: new FormControl(null,Validators.required),
     tableRows: new FormArray([
       new FormGroup({
         auditor_name:new FormControl(),
         auditorType:new FormControl(),
         eaCode:new FormControl()
       })
     ]),
     technical_completenessCheck: this.fb.array([])

   })
 }


 ngOnInit() {
  this.addSubForm('1st Technical Review  (under consideration of CC result)');
  // Need to show 2nd and Final   Technical  form based on condition 
  
  // this.addSubForm('2nd Technical Review  (under consideration of CC result)');
  // this.addSubForm('Final Technical Review  (under consideration of CC result)');
   
   this.activeted.queryParams.subscribe((res: any) => {
     console.log('res',res);
     
     this.audit_postId = res.techreviewaudit_id
     this.leadUpdate = res.type; 
     this.auditorStatus = res.auditor_status
     this.leadService.getByIdLead(this.audit_postId).subscribe((res: any) => {
      this.singleLeadData = res.data;

      })
     this.getById_audit();
   })

   this.getCountry();
   this.getStage(this.br1);
   this.getTechreview();
 }

 get technical_completenessCheck(): FormArray {
  return this.postAuditForm.get('technical_completenessCheck') as FormArray;
}

addSubForm(heading: string) {
  const technical_completenessCheck = this.fb.group({
    heading:[heading],
    approvedReport: ['', Validators.required],
    clarificationRequired: new FormControl(null,[ Validators.required]),
    rejected: new FormControl(null,[Validators.required]),
    clarificationDecision: new FormControl(null, [Validators.required]),
    reviewRequired: new FormControl(null, [Validators.required]),
    comments: new FormControl(null, [Validators.required]),
    standards: new FormControl(null, [Validators.required]),
    reviewer: new FormControl(null, [Validators.required]),
    date: new FormControl(null, [Validators.required]),
  });

  this.technical_completenessCheck.push(technical_completenessCheck);
}

 getTechreview() {
  this.configService.getAlltechreview().subscribe((res: any) => {
    this.techreviewData = res.data;
    if(res && res.data){
      if(this.techreviewData != undefined && this.auditGetByData != undefined){
        this.setCompletenessCheckData();
        this.saveButtonDisable()
      }
    }
  })
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

 rejectData1(e:any){
   this.rejectData = e; 
 }
//  rejectpage(){
//    this.route.navigate(['master/audit/post-audit/under-l1-review'])
//  }

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

 getById_audit() {
   this.leadService.getByIdLead(this.audit_postId).subscribe((res: any) => {
     this.auditGetByData = res.data;  
     this.leadService.getByIdLeadId(this.audit_postId).subscribe((res: any) => {
      let x = res.data.map((a: any) => {
        return { ...a, checked: false };
      });
      this.singleLeadData1 = x;
      console.log('single lead data 111--->', this.singleLeadData1)
      this.singleLeadData1.unshift(
        {br_number:this.singleLeadData?.br_number, associated_company: this.singleLeadData?.associated_company,city_name:this.singleLeadData.city_name,state_name:this.singleLeadData.state_name},
    
      )  
    });  

     this.post_audit_patchData(this.auditGetByData);

     this.traingNameData=this.auditGetByData.trainee_auditor_name;
     
     
     let data: any = [];
     data.push({
       auditor_name: this.traingNameData,
       auditorType:"Co-Auditor",
       eaCode:res.data.ea_code,
      })
      this.CF_1.tableRows = this.patchData(data);
       
      console.log('test', this.auditGetByData);
      
  
   
      if(this.auditGetByData?.technical_completenessCheck && this.auditGetByData?.technical_completenessCheck[0]?.heading == "1st Technical Review  (under consideration of CC result)"){
          this.addSubForm('2nd Technical Review  (under consideration of CC result)');
    } 
    if(this.auditGetByData?.technical_completenessCheck[1]?.heading == "2nd Completeness Check"){
          this.addSubForm('Final Technical Review  (under consideration of CC result)');
    }
 
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
 post_audit_patchData(auditGetByData: any) {
   
   if (this.auditGetByData?.country != 'undefined || null') {
     this.leadService.getStateByID(this.auditGetByData?.country).subscribe((res:any) => {
       
       this.stateList = res.data;
     });
   }
   if (this.auditGetByData?.state != 'undefined || null') {
     this.leadService.getCityByID(this.auditGetByData?.state).subscribe((res:any) => {
       
       this.cityList = res.data;
     });
   }
   if (this.auditGetByData?.city != 'undefined || null') {
     this.leadService.getPinCodeNew(this.auditGetByData?.city).subscribe((res:any) => {
       this.pinCodeList = res.data;
       
       // if (this.pinCodeList.length === 0) {
       //   this.pinCodeTrue = true;
       // } else {
       //   this.pinCodeTrue = false;
       // }
     });
   }
   this.postAuditForm.patchValue({
     associated_company: auditGetByData?.associated_company,
     first_name: auditGetByData?.first_name,
     br_number: auditGetByData?.br_number,
     street_address: auditGetByData?.street_address,
     address2: auditGetByData?.address2,
     city: auditGetByData?.city,
     state: auditGetByData?.state,
     country: auditGetByData?.country,
     postal_code: auditGetByData?.postal_code,
     product_request: auditGetByData?.product_request,
     opportunity_type: auditGetByData?.opportunity_type,
     assessment_period: auditGetByData?.assessment_period,
     ea_code: auditGetByData?.ea_code,
     agreed_logo_cost: auditGetByData?.agreed_logo_cost,
     auditor_name: auditGetByData?.auditor_name,
     auditor_name2: auditGetByData?.auditor_name,
     remarks: auditGetByData?.remarks,
     status:auditGetByData?.status,
     accredition_logo_details: auditGetByData?.accredition_logo_details,
     add_cert_copy: auditGetByData?.add_cert_copy,
     billing_site: auditGetByData?.billing_site,
     auditorType:"Co-Auditor",
     // auditor_name:auditGetByData.auditor_name,
     auditorType2:"Lead Auditor",
     auditorName2:auditGetByData?.auditorName2,
     eaCode:auditGetByData?.ea_code,
     eaCode2:auditGetByData?.ea_code,
     technical_completenessCheck:auditGetByData?.technical_completenessCheck

     // auditorType3:auditGetByData?.auditorType3,
     // auditorName3:auditGetByData?.auditorName3,
     // eaCode3:auditGetByData?.eaCode3,
     // auditorType3:auditGetByData.auditorType3,
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

 // gst file
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

 // company logo

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

 // otherr
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

 // agreement change

 agreementChange(fileInput: File[] | any) {
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
       this.fileDetailsAgree.filePath = reader.result;
     };
     reader.readAsDataURL(file);
     this.fileDetailsAgree.file = file;
   } else {
     this.fileDetailsAgree = { filePath: '', file: null };
   }
 }

 // feaDoc

 feaDocChange(fileInput: File[] | any) {
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
       this.fileDetailsFeaDoc.filePath = reader.result;
     };
     reader.readAsDataURL(file);
     this.fileDetailsFeaDoc.file = file;
   } else {
     this.fileDetailsFeaDoc = { filePath: '', file: null };
   }
 }

 // other monday change
 otherMandayChange(fileInput: File[] | any) {
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
       this.fileDetailsOtherManday.filePath = reader.result;
     };
     reader.readAsDataURL(file);
     this.fileDetailsOtherManday.file = file;
   } else {
     this.fileDetailsOtherManday = { filePath: '', file: null };
   }
 }

 //  purchaseorderchange
 purchaseOrderChange(fileInput: File[] | any) {
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
       this.purchaseOrder.filePath = reader.result;
     };
     reader.readAsDataURL(file);
     this.purchaseOrder.file = file;
   } else {
     this.purchaseOrder = { filePath: '', file: null };
   }
 }

 viewDocReview() {
   window.open(this.auditGetByData.contact_review_form, '_blank');
 }

 viewDocBasic() {
   window.open(this.auditGetByData.basic_form, '_blank');
 }

 //gst file
 viewDocGST() {
   window.open(this.auditGetByData.gst_file, '_blank');
 }

 //company logo
 viewDocLogo() {
   window.open(this.auditGetByData.company_logo, '_blank');
 }

 // other
 viewDocOther() {
   window.open(this.auditGetByData.other_file, '_blank');
 }
 submitForm(auditor_status:string) {
   // if (this.postAuditForm.invalid) {

   //   this.toast.error('Required fields should not be empty.', 'Error Occurred!');
   //   return;
   // }
   let val = this.postAuditForm.value;
   let auditData :any;
   let mainStatus:string;
    if(auditor_status === 'REJECTED'){
      mainStatus='Technical Review Rejected';
       auditData = this.techreviewData.filter((parent:any) => parent.code_status);
    }else{
      mainStatus='Send for Review';
      auditData =  this.techreviewData.filter((parent:any) => parent.done || parent.not_applied);;
    }

    if(auditor_status === 'APPROVED'){
      if(auditData.length < this.techreviewData.length){
        this.toast.error('Please Evaluate all criteria and details');
        return;
      }
    }
   console.log(auditData,"adddddddddd");
   console.log(val,"gdgdgfgfgg")

   let data:any = {
     customer_type: val.customer_type,
     associated_company: val.associated_company,
     segment: this.auditGetByData?.segment || null,
     certificate_type: this.auditGetByData?.certificate_type || null,
     first_name: val.first_name || ' ',
     ea_code: val.ea_code,
     address2: val.address2 || ' ',
     city: val.city || ' ',
     state: val.state || ' ',
     country: val.country || ' ',
     postal_code: val.postal_code || ' ',
     region: this.auditGetByData?.region || null,
     assessment_period: val.assessment_period || ' ',
     accredition_logo_details: val.accredition_logo_details,
     add_cert_copy: val.add_cert_copy,
     billing_site: val.billing_site,
     auditor_name: val.auditor_name,
     remarks: val.remarks || ' ',
     stage: val.stage || ' ',
     auditorType: val.auditorType,
     eaCode: val.eaCode,
     auditorType2: val.auditorType2,
     auditor_name2: val.auditor_name2,
     eaCode2: val.eaCode2,
     // auditorType3: val.auditorType3,
     // auditorName3: val.auditorName3,
     // eaCode3: val.eaCode3,
     contact_review_form: val.contact_review_form,
     contact_review_form2: val.contact_review_form2,
     contact_review_form3: val.contact_review_form3,
     contact_review_form4: val.contact_review_form4,
     contact_review_form5: val.contact_review_form5,
     contact_review_form6: val.contact_review_form6,
     contact_review_form7: val.contact_review_form7,
     contact_review_form8: val.contact_review_form8,
     contact_review_form9: val.contact_review_form9,
     CGCMNeeded: val.CGCMNeeded,
     status: mainStatus,
    //  status: val.status,
    auditData:auditData,
    technical_completenessCheck:val.technical_completenessCheck,
    auditor_status:auditor_status,
    billing_site_copy:this.singleLeadData.billing_site_copy,
   };
   if(this.rejectData){
    data.reject=this.rejectData;
 }
   this.leadService.editLead(this.audit_postId, data).subscribe((res: any) => {
     this.toast.success("Lead Successfully..");
     if(data.auditor_status == 'REJECTED' ){
      this.route.navigate(['master/audit/audit-management/rejected-audit-report']);
    }else{
     this.route.navigate(['master/audit/post-audit/l1-review'],
       { queryParams: { lead_id: this.audit_postId } }
     );
    }
   })
 }
 updateForm(){
   // this.submitted = false;
   // if (this.postAuditForm.invalid) {
     
   //   this.toast.error('Required fields should not be empty.', 'Error Occurred!');
   //   return;
   // }
   let val = this.postAuditForm.value;
   const data = {
     customer_type: val.customer_type,
     associated_company: val.associated_company,
     segment: val.segment || null,
     certificate_type: val.certificate_type || null,
     first_name: val.first_name || ' ',
     ea_code: val.ea_code,
     address2: val.address2 || ' ',
     city: val.city || ' ',
     state: val.state || ' ',
     country: val.country || ' ',
     postal_code: val.postal_code || ' ',
     region: val.region || null,
     assessment_period: val.assessment_period || ' ',
     accredition_logo_details: val.accredition_logo_details,
     add_cert_copy: val.add_cert_copy,
     billing_site: val.billing_site,
     auditor_name: val.auditor_name,
     remarks: val.remarks || ' ',
     stage: val.stage || ' ',
     auditorType: val.auditorType,
     eaCode: val.eaCode,
     auditorType2: val.auditorType2,
     auditor_name2: val.auditor_name2,
     eaCode2: val.eaCode2,
     // auditorType3: val.auditorType3,
     // auditorName3: val.auditorName3,
     // eaCode3: val.eaCode3,
     contact_review_form: val.contact_review_form,
     contact_review_form2: val.contact_review_form2,
     contact_review_form3: val.contact_review_form3,
     contact_review_form4: val.contact_review_form4,
     contact_review_form5: val.contact_review_form5,
     contact_review_form6: val.contact_review_form6,
     contact_review_form7: val.contact_review_form7,
     contact_review_form8: val.contact_review_form8,
     contact_review_form9: val.contact_review_form9,
     CGCMNeeded: val.CGCMNeeded,
    billing_site_copy:this.singleLeadData.billing_site_copy,

   };
   
   this.leadService.editLead(this.audit_postId, data).subscribe((res:any) => {
     
     
     this.toast.success("Updated Assignment Successfully..")
     this.route.navigate(['master/audit/pre-audit/task-order']);
   })

 }
 getCountry() {
   this.configService.getCountry().subscribe((res: any) => {
     this.countryList = res.data;
     
   });
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
     if (e.lead_genration_id === this.auditGetByData?.lead_genration_id) {
       this.parentSide = event.target.checked;
       
     }
   }
 reject() {
   const data = {
     status: "Rejected"
   }
   this.leadService.editLead(this.lead_id, data).subscribe((res:any) => {
     
     this.toast.success(res.message);
     this.route.navigate(['master/audit/pre-audit/task-order'],
       { queryParams: { lead_id: this.lead_id } }
     );
   })
 }
 get getFormControls() {
   const control = this.postAuditForm.get('tableRows') as FormArray;
   return control;
 };

 onParentMenuChecked(parentData:any){
  parentData.code_status = !parentData.code_status;
  if(parentData.code_status == true){
    parentData.done = false;
    parentData.not_applied = false;
    if (parentData.sub_menu) {
      parentData.sub_menu.forEach((subMenu:any) => subMenu.checked = parentData.code_status);
    }
  }
  this.saveButtonDisable()
}
onOkChecked(parentData:any){
  parentData.done = !parentData.done;
  if (parentData.done == true) {
      parentData.code_status = false;
      parentData.not_applied = false;
      parentData.sub_menu.forEach((subMenu:any) => subMenu.checked = false);
  }
}
onNotAppliedChecked(parentData:any){
  parentData.not_applied = !parentData.not_applied;
  if (parentData.not_applied == true) {
      parentData.code_status = false;
      parentData.done = false;
      parentData.sub_menu.forEach((subMenu:any) => subMenu.checked = false);
  }
}
onSubMenuChecked(parentData:any,childData:any){
  childData.checked = !childData.checked;
  if (parentData.sub_menu) {
    parentData.code_status = parentData.sub_menu.some((subMenu:any) => subMenu.checked);
  }
  if (!parentData.sub_menu) {
    parentData.sub_menu.forEach((subMenu:any) => subMenu.checked = false);
  }
  this.saveButtonDisable()
}

saveButtonDisable(){
  const auditData = this.techreviewData.filter((parent:any) => parent.code_status);
  if(auditData.length > 0){
    this.savedata = true
  }else{
    this.savedata = false
  }
}

checkBox(e: any,i:any) {
  this.check = e.source.value;
  this.check_status = e.checked;
}


setCompletenessCheckData(){
  this.techreviewData.forEach((cData:any,index:number) => {
    this.auditGetByData.auditData.forEach((cData2:any) =>{
      if(cData.TL1_code ==cData2.TL1_code){
        this.techreviewData[index] = cData2
      }
    })
  })
}

back(){
  window.history.back();
}

reviewSave(){
  if (this.postAuditForm.value.auditor_remarks == null) {
    this.toast.error('Auditor Remark should not be empty.');
    return;
  }
    if (this.postAuditForm.value.review_date == null) {
      this.toast.error('Reviewd date should not be empty.');
      return;
    }
    let val = this.postAuditForm.value;
    let data:any = {
      customer_type: val.customer_type,
      associated_company: val.associated_company,
      segment: this.auditGetByData?.segment || null,
      certificate_type: this.auditGetByData?.certificate_type || null,
      first_name: val.first_name || ' ',
      ea_code: val.ea_code,
      address2: val.address2 || ' ',
      city: val.city || ' ',
      state: val.state || ' ',
      country: val.country || ' ',
      postal_code: val.postal_code || ' ',
      region: this.auditGetByData?.region || null,
      assessment_period: val.assessment_period || ' ',
      accredition_logo_details: val.accredition_logo_details,
      add_cert_copy: val.add_cert_copy,
      billing_site: val.billing_site,
      auditor_name: val.auditor_name,
      remarks: val.remarks || ' ',
      stage: val.stage || ' ',
      auditorType: val.auditorType,
      eaCode: val.eaCode,
      auditorType2: val.auditorType2,
      auditor_name2: val.auditor_name2,
      eaCode2: val.eaCode2,
      contact_review_form: val.contact_review_form,
      contact_review_form2: val.contact_review_form2,
      contact_review_form3: val.contact_review_form3,
      contact_review_form4: val.contact_review_form4,
      contact_review_form5: val.contact_review_form5,
      contact_review_form6: val.contact_review_form6,
      contact_review_form7: val.contact_review_form7,
      contact_review_form8: val.contact_review_form8,
      contact_review_form9: val.contact_review_form9,
      CGCMNeeded: val.CGCMNeeded,
      status: 'Technical Review',
      auditData:this.auditGetByData.auditData,
      technical_completenessCheck:val.technical_completenessCheck,
      auditor_status:'REVIEWED',
      auditor_remarks:val.auditor_remarks,
      review_date: moment(val.review_date).format('YYYY-MM-DD'),
    };

    this.leadService.editLead(this.audit_postId, data).subscribe((res: any) => {
      this.toast.success('Lead Successfully..');
        this.route.navigate(['master/audit/post-audit/techreview'], {
          queryParams: { lead_id: this.audit_postId },
        });
    });
}
getCurrentRoute():string{
  return this.activeted.snapshot.url.map(s => s.path).join('/')
}
}
