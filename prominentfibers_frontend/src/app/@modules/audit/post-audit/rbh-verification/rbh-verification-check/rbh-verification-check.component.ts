import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators, FormArray } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ConfigurationalmasterService } from 'src/app/@shared/services/configurationalmaster.service';
import { LeadService } from 'src/app/@shared/services/lead.service';

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
  selector: 'app-rbh-verification-check',
  templateUrl: './rbh-verification-check.component.html',
  styleUrls: ['./rbh-verification-check.component.scss']
})
export class RbhVerificationCheckComponent {
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
    rejectData: any;
    techreviewData: any;
    check: any;
    check_status: any;
    savedata: boolean = false;
    LastAuditAccountData:any;
    currentAuditAccountData:any;
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
        remarks: new FormControl(null),
        status: new FormControl(null, Validators.required),
        // CGCMNeeded: new FormControl(null,Validators.required),
        tableRows: new FormArray([
          new FormGroup({
            auditor_name: new FormControl(),
            auditorType: new FormControl(),
            eaCode: new FormControl()
          })
        ]),
      })
    }
  
  
    ngOnInit() {
      this.activeted.queryParams.subscribe((res: any) => {
        this.audit_postId = res.audit_id
        this.leadUpdate = res.type;
        this.leadService.getByIdLead(this.audit_postId).subscribe((res:any) => {
          this.singleLeadData = res.data;
          console.log('this.singleLeadData?.certificate_type_name', this.singleLeadData?.certificate_type_name)
          if(this.singleLeadData?.billing_site === true){
            this.getStage1(this.singleLeadData?.br_number)
          }
        })
  
        this.getById_audit();
      })
  
      this.getCountry();
      this.getState();
      this.getCity();
      this.getStage(this.br1);
      this.getTechreview();
      this.getPreviousAcountDetails();
      this.getCurrentAcountDetails()
    }
  
    getTechreview() {
      this.configService.getAlltechreview().subscribe((res: any) => {
        this.techreviewData = res.data;
      })
    }
  
    rejectData1(e: any) {
      this.rejectData = e;
    }
    //  rejectpage(){
    //    this.route.navigate(['master/audit/post-audit/under-l1-review'])
    //  }
  
    getCountryID(e: any) {
  
      this.leadService.getStateByID(e.value).subscribe((res: any) => {
  
        this.stateList = res.data;
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
  
    getById_audit() {
      this.leadService.getByIdLead(this.audit_postId).subscribe((res: any) => {
        this.auditGetByData = res.data;
  
        this.leadService.getByIdLeadId(this.audit_postId).subscribe((res: any) => {
          let x = res.data.map((a: any) => {
            return { ...a, checked: false };
          });
          this.singleLeadData1 = x;
          this.singleLeadData1.unshift(
            {br_number:this.singleLeadData?.br_number, associated_company: this.singleLeadData?.associated_company,city_name:this.singleLeadData.city_name,state_name:this.singleLeadData.state_name},
           )  
        });

        this.post_audit_patchData(this.auditGetByData);
  
        this.traingNameData = this.auditGetByData.trainee_auditor_name;
  
  
        let data: any = [];
        data.push({
          auditor_name: this.traingNameData,
          auditorType: "Co-Auditor",
          eaCode: res.data.ea_code,
        })
        this.CF_1.tableRows = this.patchData(data);
  
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
        this.leadService.getStateByID(this.auditGetByData?.country).subscribe((res: any) => {
  
          this.stateList = res.data;
        });
      }
      if (this.auditGetByData?.state != 'undefined || null') {
        this.leadService.getCityByID(this.auditGetByData?.state).subscribe((res: any) => {
  
          this.cityList = res.data;
        });
      }
      if (this.auditGetByData?.city != 'undefined || null') {
        this.leadService.getPinCodeNew(this.auditGetByData?.city).subscribe((res: any) => {
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
        status: auditGetByData?.status,
        accredition_logo_details: auditGetByData?.accredition_logo_details,
        add_cert_copy: auditGetByData?.add_cert_copy,
        billing_site: auditGetByData?.billing_site,
        auditorType: "Co-Auditor",
        // auditor_name:auditGetByData.auditor_name,
        auditorType2: "Lead Auditor",
        auditorName2: auditGetByData?.auditorName2,
        eaCode: auditGetByData?.ea_code,
        eaCode2: auditGetByData?.ea_code,
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
    submitForm(auditor_status: string) {
      // if (this.postAuditForm.invalid) {
  
      //   this.toast.error('Required fields should not be empty.', 'Error Occurred!');
      //   return;
      // }
      let val = this.postAuditForm.value;
      const auditData = this.techreviewData.filter((parent: any) => parent.code_status);
      console.log(auditData, "adddddddddd");
      console.log(val, "gdgdgfgfgg")
  
      let data: any = {
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
        // status: 'Send for Review',
        status: 'L1 Reviewed',
        auditor_status: auditor_status
      };
      if (this.rejectData) {
        data.reject = this.rejectData;
      }
      this.leadService.editLead(this.audit_postId, data).subscribe((res: any) => {
  
        this.toast.success("Lead Successfully..")
        this.route.navigate(
          ['master/audit/post-audit/manage-dates'],
          { queryParams: { lead_id: this.audit_postId } }
        );
      })
    }
    updateForm() {
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
      };
  
      this.leadService.editLead(this.audit_postId, data).subscribe((res: any) => {
  
  
        this.toast.success("Updated Assignment Successfully..")
        this.route.navigate(['master/audit/pre-audit/task-order']);
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
      let br3 = []
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
      this.leadService.editLead(this.lead_id, data).subscribe((res: any) => {
  
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
  
    getPreviousAcountDetails(){
      this.leadService.getPreviousAcountDetails(this.audit_postId).subscribe(res =>{
        console.log(res,"previous");
        if(res && res.data){
          this.LastAuditAccountData = res.data;
        }
        
      })
    }
  
    getCurrentAcountDetails(){
      this.leadService.getCurrentAcountDetails(this.audit_postId).subscribe(res =>{
        console.log(res,'current');
        if(res && res.data){
          this.currentAuditAccountData = res.data;
        }
      })
    }

    getCurrentRoute():string{
      return this.activeted.snapshot.url.map(s => s.path).join('/')
  }
}
