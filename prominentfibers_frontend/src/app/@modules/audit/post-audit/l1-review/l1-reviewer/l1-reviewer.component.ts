import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ConfigurationalmasterService } from 'src/app/@shared/services/configurationalmaster.service';
import { LeadService } from 'src/app/@shared/services/lead.service';
import { UploadReviewCsvComponent } from '../upload-review-csv/upload-review-csv.component';

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
  selector: 'app-l1-reviewer',
  templateUrl: './l1-reviewer.component.html',
  styleUrls: ['./l1-reviewer.component.scss']
})
export class L1ReviewerComponent {
  // displayedColumns: string[] = ['stage', 'noOfMandays'];
  br2: any;
  parentSide: boolean;
  br1: any;
  postAuditForm: any;
  dataSource = ELEMENT_DATA;
  displayedColumns: string[] = ['account_name', 'br_number'];
  customType: boolean = false;
  review_id: any;
  auditGetByData: any;
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
  traingNameData: any;
  pinCodeList: any;
  pinCodeTrue: boolean = true;
  leadUpdate: any;
  cellValue: any;
  nonCertTrue: boolean;
  singleLeadData: any;
  gstvalidation: boolean;
  singleLeadData1: any;
  childSide: boolean;
  child_br_number: any;

  constructor(private fb: FormBuilder,public dialog: MatDialog, private toast: ToastrService, private route: Router, private activeted: ActivatedRoute, private leadService: LeadService, private configService: ConfigurationalmasterService,) {
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
      billing_site :new FormControl(null),
      // Auditor Eligible SIC Code Details
      // auditorType: new FormControl(null),
      // auditorName: new FormControl(null),
      // eaCode: new FormControl(null),
      // auditorType2: new FormControl(null),
      // auditorName2: new FormControl(null),
      // eaCode2: new FormControl(null),
      // auditorType3: new FormControl(null),
      // auditorName3: new FormControl(null),
      // eaCode3: new FormControl(null),
      auditorType: new FormControl(null),
      auditor_name: new FormControl(null),
      eaCode: new FormControl(null),
      auditorType2: new FormControl(null),
      auditor_name2: new FormControl(null),
      eaCode2: new FormControl(null),
      contact_review_form: new FormControl(null),
      contact_review_form2: new FormControl(null),
      contact_review_form3: new FormControl(null),
      contact_review_form4: new FormControl(null),
      contact_review_form5: new FormControl(null),
      contact_review_form6: new FormControl(null),
      contact_review_form7: new FormControl(null),
      contact_review_form8: new FormControl(null),
      contact_review_form9: new FormControl(null),
      remarks: new FormControl(null),
      status: new FormControl(null),
      CGCMNeeded: new FormControl(null),
      opneActionPlans: new FormControl(null,Validators.required),
      certificationChangeRemark: new FormControl(null,Validators.required),
      yourAction: new FormControl(null,Validators.required),
      tecnicalReviewrLevel: new FormControl(null,Validators.required),
      tecnicalActionLevel2: new FormControl(null,Validators.required),
      commentTechnicalAuditor: new FormControl(null,Validators.required),
      commentTechnicalReviewr1: new FormControl(null,Validators.required),
      commentTechnicalReviewr2: new FormControl(null,Validators.required),
      verificationGroupComment: new FormControl(null,Validators.required),
      customer_type1: new FormControl(null,Validators.required),
      customer_type3: new FormControl(null,Validators.required),
      customer_type6: new FormControl(null,Validators.required),
      // auditor_name: new FormControl(null),
      tableRows: new FormArray([
        new FormGroup({
          auditor_name:new FormControl(),
          auditorType:new FormControl(),
          eaCode:new FormControl()
        })
      ]),

    })
  }
  ngOnInit() {
    this.activeted.queryParams.subscribe((res: any) => {
      this.review_id = res.audit_id
      console.log(this.review_id,'this.review_id');
      
      this.leadUpdate = res.type;
      console.log(this.leadUpdate,'this.leadUpdate');
      
      this.getById_audit();

      this.leadService.getByIdLead(this.review_id).subscribe((res:any) => {
        this.singleLeadData = res.data;
        console.log('this.singleLeadData?.certificate_type_name', this.singleLeadData?.certificate_type_name)
        if(this.singleLeadData?.billing_site === true){
          this.getStage1(this.singleLeadData?.br_number)
        }
      })
    });
    this.getCountry();
    this.getState();
    this.getCity();
    this. getStage(this.br1);
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

  getById_audit() {
    this.leadService.getByIdLead(this.review_id).subscribe((res: any) => {
      this.auditGetByData = res.data;
        this.leadService.getByIdLeadId(this.review_id).subscribe((res: any) => {
        let x = res.data.map((a: any) => {
          return { ...a, checked: false };
        });
        this.singleLeadData1 = x;
        this.singleLeadData1.unshift(
          {br_number:this.auditGetByData?.br_number, associated_company: this.auditGetByData?.associated_company,city_name:this.auditGetByData.city_name,state_name:this.auditGetByData.state_name},
         ) 
       });
      this.post_audit_patchData(this.auditGetByData);

      this.traingNameData=this.auditGetByData?.trainee_auditor_name;
      
      
      let data: any = [];
      // if ( this.traingNameData?.length != 0) {
        // for (let i = 0; i <= this.traingNameData.length - 1; i++) {
    
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

    console.log(auditGetByData,'auditGetByData');
    
    this.postAuditForm.patchValue({
      associated_company: auditGetByData.associated_company,
      first_name: auditGetByData.first_name,
      br_number: auditGetByData.br_number,
      street_address: auditGetByData.street_address,
      address2: auditGetByData.address2,
      city: auditGetByData.city,
      state: auditGetByData.state,
      country: auditGetByData.country,
      postal_code: auditGetByData.postal_code,
      product_request: auditGetByData.product_request,
      opportunity_type: auditGetByData.opportunity_type,
      assessment_period: auditGetByData.assessment_period,
      ea_code: auditGetByData.ea_code,
      agreed_logo_cost: auditGetByData.agreed_logo_cost,
      // auditor_name: auditGetByData.auditor_name,
      remarks: auditGetByData.remarks,
      status: auditGetByData.status,
      accredition_logo_details: auditGetByData.accredition_logo_details,
      add_cert_copy: auditGetByData.add_cert_copy,
      billing_site: auditGetByData.billing_site || true,
      // auditorType: auditGetByData.auditorType,
      // auditorType2: auditGetByData.auditorType2,
      // auditorType3: auditGetByData.auditorType3,
      auditorName: auditGetByData.auditorName,
      // auditorName2: auditGetByData.auditorName2,
      // auditorName3: auditGetByData.auditorName3,
      CGCMNeeded: auditGetByData.CGCMNeeded,
      // eaCode:auditGetByData.eacode ,
      // eaCode2: auditGetByData.eaCode2,
      // eaCode3: auditGetByData.eaCode3
      auditor_name2: auditGetByData?.auditor_name,

      auditorType:"Co-Auditor",
      auditor_name:auditGetByData?.auditor_name,
      auditorType2:"Lead Auditor",
      auditorName2:auditGetByData?.auditorName2,
      eaCode:auditGetByData?.ea_code,
      eaCode2:auditGetByData?.ea_code,
      customer_type1:"No",
      customer_type3:"No",
      customer_type6:"No",
      tecnicalReviewrLevel:auditGetByData.tecnicalReviewrLevel,
      tecnicalActionLevel2:auditGetByData.tecnicalActionLevel2,
      commentTechnicalAuditor:auditGetByData.commentTechnicalAuditor,
      commentTechnicalReviewr1:auditGetByData.commentTechnicalReviewr1,
      commentTechnicalReviewr2:auditGetByData.commentTechnicalReviewr2,

    })
  }

 
  checkCustomType() {
    this.customType = true;
  }
  checkCustomTypeNo() {
    this.customType = false;
  }

  // uploaded documents

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

  //FEA_DOC
  feaDocView(){
    window.open(this.auditGetByData.contact_review_form4, '_blank');

  }
//Others-Manday App
  otherManday(){

    window.open(this.auditGetByData.contact_review_form6, '_blank');
  }

  //Purchase_Order
  purchaseView(){
    window.open(this.auditGetByData.contact_review_form8, '_blank');
}

//agreement
agreementView(){
  window.open(this.auditGetByData.contact_review_form2, '_blank');

}

  submitForm() {
    if (this.postAuditForm.invalid) {
      this.toast.error('Required fields should not be empty.', 'Error Occurred!');
      return;
    }
    let val = this.postAuditForm.value;
    

    const data = {
      customer_type: val.customer_type,
      lead_genration_id: this.review_id,
      associated_company: val.associated_company,
      segment: this.auditGetByData?.segment || null,
      certificate_type:  this.auditGetByData?.certificate_type || null,
      first_name: val.first_name || ' ',
      ea_code: val.ea_code,
      address2: val.address2 || ' ',
      city: val.city || ' ',
      state: val.state || ' ',
      country: val.country || ' ',
      postal_code: val.postal_code || ' ',
      region:  this.auditGetByData?.region || null,
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
      auditorName2: val.auditorName2,
      eaCode2: val.eaCode2,
      // auditorType3: val.auditorType3,
      auditorName3: val.auditorName3,
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
      opneActionPlans: val.opneActionPlans,
      certificationChangeRemark: val.certificationChangeRemark,
      yourAction: val.yourAction,
      tecnicalReviewrLevel: val.tecnicalReviewrLevel,
      tecnicalActionLevel2: val.tecnicalActionLevel2,
      commentTechnicalAuditor: val.commentTechnicalAuditor,
      commentTechnicalReviewr1: val.commentTechnicalReviewr1,
      commentTechnicalReviewr2: val.commentTechnicalReviewr2,
      verificationGroupComment: val.verificationGroupComment,
      customer_type1: val.customer_type1,
      customer_type3: val.customer_type3,
      customer_type6: val.customer_type6,
      // status: 'L1 Reviewed',
      status: 'Payment Verification',

    };
    
    this.leadService.editLead(this.review_id, data).subscribe((res: any) => {
      
      this.toast.success("Lead Successfully..")
      this.route.navigate(
        ['master/audit/post-audit/payment_varification'],
        { queryParams: { lead_id: this.review_id } }
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
    
    this.leadService.editLead(this.review_id, data).subscribe((res:any) => {
      
      
      this.toast.success("Updated Assignment Successfully..")
      this.route.navigate(['master/audit/post-audit/l1-review']);
    })

  }
  getCountry() {
    this.configService.getCountry().subscribe((res: any) => {
      this.countryList = res.data;
      
    });
  }

  getState() {
    this.configService.getState().subscribe((res: any) => {
      this.stateList = res.data;
      
    });
  }

  getCity() {
    this.configService.getCity().subscribe((res: any) => {
      this.cityList = res.data;
      
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

  typeChange1(e: any, event: any) {
    let  br3 = []
    this.br2 = e.br_number;
    let br4 = br3.push(this.br2);
    
    
    
    
    
    // this.getStage1(this.br2);
      // if (e.lead_genration_id === this.auditGetByData.lead_genration_id) {
      //   this.parentSide = event.target.checked;
        
      // }
    }
  get getFormControls() {
    const control = this.postAuditForm.get('tableRows') as FormArray;
    return control;
  };

  openDialog() {
    const dialogRef = this.dialog.open(UploadReviewCsvComponent, {
      width: '30%',
      // maxWidth: '100vw',
      // maxHeight: '60vh',
      // height: '60%',
      // panelClass: 'full-screen-modal',
      data: { id: this.cellValue },
    });
  }

  getCurrentRoute():string{
    return this.activeted.snapshot.url.map(s => s.path).join('/')
}

}
