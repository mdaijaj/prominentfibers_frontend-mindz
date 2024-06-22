import { Component } from '@angular/core';
import {
  FormArray,
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
import { jsPDF } from 'jspdf';
import domtoimage from 'dom-to-image';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-create-upload',
  templateUrl: './create-upload.component.html',
  styleUrls: ['./create-upload.component.scss'],
})
export class UploadCreateComponent {
  leadForm: FormGroup;
  jobType: any;
  fileAuth: any;
  imageToUpload: any;
  notfoundData: boolean = false;
  foundDAta: boolean = false;
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
  errorMsg: string;
  fileDetails: any;
  createUpload: any;
  stateList: any;
  cityList: any;
  pinCodeList: any;
  pinCodeTrue: boolean = true;
  countryList: any;
  // imageToUpload: File | null;
  imagePath_2: any;
  imagePath: any;
  upladData: any;
  getByCertificateData: any;
  tableView: boolean = false;
  auditGetByData: any;
  traingNameData: any;
  now = new Date();
  year = this.now.getFullYear();
  month = this.now.getMonth();
  // day = this.now.getDay();
  date = this.now.getDate();
  verifyCertificate: boolean = false;
  notVerifyCertificate: boolean = false;
  maxDate = moment({ year: this.year + 100, month: this.month, date: this.date }).format('YYYY-MM-DD');
  minDate = moment({ year: this.year - 0, month: this.month, date: this.date }).format('YYYY-MM-DD');
  leadUpdate: any;
  standardList: any;
  certi_Status: any;
  approval_status: any;
  disabledBtn:boolean=false;
  approved:any;
  apprvedAll: boolean=false;
  apprvedAllReject: any;
    //for filter start
    variables: any = [];
    variable: any = [];
    public filteredList1 = this.variables.slice();
    filterData: any = [];
    checkData: any = []
    //for filter end
  constructor(
    private configService: ConfigurationalmasterService,
    private fb: FormBuilder,
    private _empRegistration: EmpRegistrationService,
    private leadService: LeadService,
    private toast: ToastrService,
    private route: Router,
    private recruitService: RecruitService,
    private activeroute: ActivatedRoute
  ) {
    this.leadForm = this.fb.group({
      customer_type: new FormControl(null),
      site_audit: new FormControl(null),
      associated_company: new FormControl(null),
      br_number: new FormControl(null),
      new_location_site: new FormControl(null),
      segment: new FormControl(null, Validators.required),
      categories: new FormControl(null, Validators.required),
      certificate_type: new FormControl(null, Validators.required),
      first_name: new FormControl(null, Validators.required),
      last_name: new FormControl(null, Validators.required),
      email: new FormControl(null, Validators.required),
      emplyoment_type: new FormControl(null, Validators.required),
      job_title: new FormControl(null, Validators.required),
      street_address: new FormControl(null, Validators.required),
      address2: new FormControl(null, Validators.required),
      lead_created_by_name: new FormControl(null, Validators.required),
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
      lead_validate_remarks: new FormControl(null, Validators.required),
      lead_assgn_contact_owner: new FormControl(null, Validators.required),
      assigned_by: new FormControl(null, Validators.required),
      assigned_date: new FormControl(null, Validators.required),
      stage: new FormControl(null, Validators.required),
      lead_assgn_remark: new FormControl(null, Validators.required),
      industry: new FormControl(null, Validators.required),
      customer_category: new FormControl(null, Validators.required),
      employee_count: new FormControl(null, Validators.required),
      company_remarks: new FormControl(null, Validators.required),
      gst_applicable: new FormControl(null),
      // auditorType: new FormControl(null),
      // auditor_name: new FormControl(null),
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
      remark: new FormControl(null),
      Status: new FormControl(null),
      CGCMNeeded: new FormControl(null),
      gst_number: new FormControl(null, [
        Validators.pattern(
          '([0-9]){2}([A-Z]){5}([0-9]){4}([A-Z]){1}([0-9]){1}([A-Z]){1}([0-9]){1}$'
        ),
      ]),
      pan_number: new FormControl(null, [
        Validators.pattern('([A-Z]){5}([0-9]){4}([A-Z]){1}$'),
      ]),
      tan_number: new FormControl(null, [
        Validators.pattern('([A-Z]){4}([0-9]){5}([A-Z]){1}$'),
      ]),
      assessment_period: new FormControl(null),
      ea_code: new FormControl(null),
      add_cert_copy: new FormControl(null),
      accredition_logo_details: new FormControl(null),
      select_customer: new FormControl(null),
      select_program: new FormControl(null),
      choose_logo: new FormControl(null),
      scope: new FormControl(null),
      upload_certificate: new FormControl(null),

      tableRows: new FormArray([
        new FormGroup({
          select_customer: new FormControl(null),
          select_program: new FormControl(null),
          choose_logo: new FormControl(null),
          upload_certificate: new FormControl(null),
          scope: new FormControl(null),
        }),
      ]),


      tableRows2: new FormArray([
        new FormGroup({
          auditor_name:new FormControl(),
          auditorType:new FormControl(),
          eaCode:new FormControl()
        })
      ]),
    });
  }

  ngOnInit() {
    this.activeroute.queryParams.subscribe((params) => {
      this.id = params;
      this.lead_id = this.id.lead_id;
      this.leadUpdate = this.id.type;  
      this.getById_audit()
    });
    this.getAchievementList();
    this.getStandardProgram();
    this.patchFormvalue();
    this.getCategory();
    this.getCountry();
    this.mainId = localStorage.getItem('EmpMainId');
    
    if (this.mainId != undefined) {
      this._empRegistration.getByUserId(this.mainId).subscribe((res) => {
        this.mainEmployeeData = res.data;
        
        this.getAchievementList();
        this.patchFormvalue();
      });
    }
    this.getByUpladCertificate();
  
    if(this.approval_status == 'APPROVED'){
      this.verifyCertificate = true;
      
    }
    else
    {
      this.verifyCertificate = false;
    }
  }

  getStandardProgram() {
    this.configService.listAsses().subscribe((res: any) => {
      this.standardList = res.data;
      console.log('sadsa',this.standardList)
      this.variables = this.standardList.map((res: any) => res.product_master_name)
      this.checkData = this.standardList
      this.variable = this.standardList
      
    });
  }

  getCountry() {
    this.configService.getCountry().subscribe((res: any) => {
      this.countryList = res.data;
      
    });
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
    this.leadService.getByIdLead(this.lead_id).subscribe((res: any) => {
      this.singleLeadData = res.data;
      

      this.patchFormvalue();

      this.traingNameData=this.singleLeadData.trainee_auditor_name;
      
      
      let data: any = [];
      if ( this.traingNameData?.length != 0) {
        for (let i = 0; i <= this.traingNameData?.length - 1; i++) {
    
          data.push({
            auditor_name: this.traingNameData[i],
            auditorType:"Co-Auditor",
            eaCode:res.data.ea_code,
           })
        }
        this.CF_1.tableRows2 = this.patchData(data);
      }
    })
  }
  



  get f(): any {
    return this.leadForm.controls;
  }
  get getFormControls() {
    const control = this.leadForm.get('tableRows') as FormArray;
    return control;
  }
  getByUpladCertificate() {
    this.leadService
      .getByUpladCertificate(this.lead_id)
      .subscribe((res: any) => {
        this.getByCertificateData = res.data;
       console.log(this.getByCertificateData,'this.getByCertificateData');
       
        if (this.getByCertificateData.length === 0) {
          this.tableView = true;
        }

         this.approved=[]
        for(let i=0 ; i<res.data.length; i++){
// console.log(i,'apprvoed status');
       this.approved.push(res.data[i].approvel_status);
       console.log(this.approved,'appr');
    }
    console.log(this.approved,'this.approved');
    
    for (let item of this.approved) {
      console.log(item,'item');
      if (item === "APPROVED" && "REJECTED") {
        this.apprvedAll=true
      }else if(item===null){
        this.apprvedAll=false;
      }
    }
    console.log(this.apprvedAll);
    
    // this.apprvedAll=this.approved.every((value:any)=>value=="APPROVED"&&"REJECTED")
    // console.log(this.apprvedAll,'apprvedAll');
    // this.apprvedAllReject=this.approved.every((value:any)=>value=="REJECTED")
    // console.log(this.apprvedAllReject,'this.apprvedAllReject');

        // let data: any = [];
        // if (res.data.length != 0) {
        //   for (let i = 0; i <= res.data.length - 1; i++) {

        //    data.push({
        //     select_customer: res.data[i].select_customer,
        //     select_program: res.data[i].select_program,
        //     valid_until: res.data[i].valid_until,
        //     choose_logo: res.data[i].choose_logo,
        //     scope: res.data[i].scope,

        //     })
        //   }
        //   this.CF_1.tableRows = this.patchData(data);
        //   
        // }
      });
  }
  addRow3() {
    // this.f.tableRows.push(
    //   new FormGroup({
    //     select_customer: new FormControl(null),
    //     select_program: new FormControl(null),
    //     choose_logo: new FormControl(null),
    //     upload_certificate: new FormControl(null),
    //     scope: new FormControl(null),
    //   })
    // );
console.log(this.apprvedAll,'this.apprvedAll');


for(let i=0; i<= this.getByCertificateData.length;i++){
  console.log(this.getByCertificateData,'this.getByCertificateData');
  
if(this.getByCertificateData.length >0){
  if(this.apprvedAll===false){
    this.toast.warning("Please Upload Certificate Approved")
     return
    }
}

}

this.upladData = this.leadForm.value;
    // let data={
    //   select_customer:val.select_customer,
    //   select_program:val.select_program,
    //   choose_logo:val.choose_logo,
    //   scope:val.scope,
    //   valid_until:val.valid_until,
    //   upload_certificate:this.fileDetails,

    // }
    
    // if (this.upladData.invalid) {
    //   this.toast.error('All fileds Required');
    //   return;
    // }

    const formData = new FormData();
    let file: File = this.fileAuth;
    
    
    // for(var i=0;i<this.fileAuth.length;i++){
    //   let file: File = this.fileAuth[i];
    formData.append('upload_certificate', file);
    // }
    
    formData.append('select_customer', this.upladData.select_customer);
    formData.append('select_program', this.upladData.select_program);
    formData.append('choose_logo', this.upladData.choose_logo);
    formData.append('scope', this.upladData.scope);
    // formData.append("valid_until", this.upladData.valid_until);

    formData.append('lead_genration_id', this.lead_id);
    

    this.leadService.createUploadile(formData).subscribe(
      (res: any) => {
        this.createUpload = res;
        this.toast.success('Upload Certificates Data Updated');
        // this.reloadWindow();
        // this.notfoundDAta=true;
        //  window.location.reload();
        this.tableView = false;
       this.disabledBtn=true;
       this.cleanInput();
        // this.route.navigate(['master/lead/post-audit/upload-docs/create-upload'])
        
        this.getByUpladCertificate();
      },
      (error: any) => {
        this.toast.error('Something Went To Wrong');
      }
    );
  }

  cleanInput() {
    this.leadForm.get('select_customer')?.reset(),
      this.leadForm.get('select_program')?.reset(),
      this.leadForm.get('choose_logo')?.reset()
      this.leadForm.get('scope')?.reset(),
    this.leadForm.get('file')?.reset()
   }

 Verify_Certificate(e: any, data:any) {
    
    const certificate_id = data.UploadCertificate_id;
    const status = "APPROVED"
    const dataCerti = {
      UploadCertificate_id: data.UploadCertificate_id,
      approvel_status:status,
      certificate_count: data.certificate_count,
      certificate_version: data.certificate_version,
      choose_logo: data.choose_logo,
      lead_genration_id: data.lead_genration_id,
      scope: data.scope,
      select_customer: data.select_customer,
      select_program: data.select_program,
      status: data.status,
      upload_certificate: data.upload_certificate,
      valid_until: data.valid_until
    }
    // const data = data.status
    
     Swal.fire({
      title: 'Are you sure to verify this Crtificate',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      cancelButtonColor: "#f44336",
      confirmButtonColor: "#3f51b5",
      confirmButtonText: 'Yes',
      cancelButtonText: 'Not Now'
    }).then((result) => {
      if (result.isConfirmed) {
        this.leadService.updateCertificate(certificate_id, dataCerti).subscribe((res: any) => {
          
          
          this.approval_status = res.data.approvel_status
          this.disabledBtn=false;
          this.reloadWindow();
          if(this.approval_status == 'APPROVED'){
            this.verifyCertificate = true;
            
          }
          else
          {
            this.verifyCertificate = false;
          }
           this.toast.success('Certificate Status Updated Successfully..');
        });  
       
      }
    });
  };

  NotVerify_Certificate(e: any, data:any) {
    
    const certificate_id = data.UploadCertificate_id;
    const status = "REJECTED"
    const dataCerti = {
      UploadCertificate_id: data.UploadCertificate_id,
      approvel_status:status,
      certificate_count: data.certificate_count,
      certificate_version: data.certificate_version,
      choose_logo: data.choose_logo,
      lead_genration_id: data.lead_genration_id,
      scope: data.scope,
      select_customer: data.select_customer,
      select_program: data.select_program,
      status: data.status,
      upload_certificate: data.upload_certificate,
      valid_until: data.valid_until
    }
      Swal.fire({
      title: 'Are you sure to not Approve this Certificate',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      cancelButtonColor: "#f44336",
      confirmButtonColor: "#3f51b5",
      confirmButtonText: 'Yes',
      cancelButtonText: 'Not Now'
    }).then((result) => {
      if (result.isConfirmed) {
        this.leadService.updateCertificate(certificate_id, dataCerti).subscribe((res: any) => {
          
          
          this.approval_status = res.data.approvel_status
          this.reloadWindow();
          if(this.approval_status == 'REJECTED'){
            this.notVerifyCertificate = true;
            
          }
          else
          {
            this.notVerifyCertificate = false;
          }
           this.toast.success('Certificate Status Updated Successfully..');
        });  
       
      }
    });
  };
  reloadWindow() {
    setTimeout(() => {
      window.location.reload();
    }, 800);
  }
  reloadCurrentRoute() {
    let currentUrl = this.route.url;
    this.route.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.route.navigate([currentUrl]);
    });
  }

  
  get CF_1(): any {
    return this.leadForm.controls;
  }
  patchData(e: any): FormArray {
    return new FormArray(
      e.map((x: any) => {
        const obj = new FormGroup({});
        Object.keys(x).forEach((k) => {
          obj.addControl(k, new FormControl(x[k]));
        });
        return obj;
      })
    );
  }
  fetchSeries(value: String) {
    if (value === '') {
      return (this.searchResult = []);
    }
    this.searchResult = this.allAchievement.filter(function (series: any) {
      
      return series.first_name.toLowerCase().startsWith(value);
    });
  }

  fileInputChange(event: any) {
    // this.errorMsg = '';
    // 
    // if (fileInput.target.files && fileInput.target.files[0]) {
    //   const file = fileInput.target.files[0];
    //   
    //   const reader = new FileReader();
    //   const fileSizeInMb = file.size / 1024 ** 2;
    //   if (fileSizeInMb > 30) {
    //     this.errorMsg = 'File size should be less than 30MB';
    //     return;
    //   }
    //   reader.onload = (e: any) => {
    //     this.fileDetails.filePath = reader.result;
    //   };
    //   reader.readAsDataURL(file);
    //   this.fileDetails.file = file;
    // } else {
    //   this.fileDetails = { filePath: '', file: null };
    // }

    // this.fileChose=event.target.files[0].name.split('.');
    // this.fileExe = this.fileChose[this.fileChose.length - 1].toUpperCase();
    // 
    // this.fileAuth = event.target.files[0];
    // 
    // let fileExten = this.fileAuth.name.split('.');
    // this.fileExe = fileExten[fileExten.length - 1].toUpperCase();

    // 
    if ((this.fileAuth = event.target.files[0])) {
      const data: FileList = event.target.files;
      this.imageToUpload = data.item(0);

      let file = this.imageToUpload.name.split('.');
      let fileExe = file[file.length - 1].toUpperCase();
      const reader = new FileReader();
      reader.onload = (e: any) => {
        
        this.imagePath_2 = e.target.result;
      };
      reader.readAsDataURL(this.imageToUpload);
      

      // this.imagePath = this.pdfFile;
      // 
    }
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

  getCategory() {
    this.configService.listCategory().subscribe((res: any) => {
      this.categoryList = res.data;
      
    });
  }

  candidateClick(e: any) {
    
    this.candidateId = e;
    this.recruitService.interViewGetIdBy(e).subscribe((res: any) => {
      this.interviewGetId = res.data;
      
      this.patchFormvalue();
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
      categories: this.singleLeadData?.categories,
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
      dqs_contact_source: this.singleLeadData?.dqs_contact_source,
      contact_owner:
        this.mainEmployeeData?.first_name || this.singleLeadData?.contact_owner,
      lead_created_date: this.singleLeadData?.lead_created_date,
      standard_program_assement: this.singleLeadData?.standard_program_assement,
      remarks: this.singleLeadData?.remarks,
      lead_validated_date: this.singleLeadData?.lead_validated_date,
      lead_validate_remarks: this.singleLeadData?.lead_validate_remarks,
      industry: this.singleLeadData?.industry,
      lead_created_by_name:
        this.mainEmployeeData?.first_name ||
        this.singleLeadData?.lead_created_by_name,
      validated_by:
        this.mainEmployeeData?.first_name || this.singleLeadData?.validated_by,
      customer_category: this.singleLeadData?.customer_category,
      employee_count: this.singleLeadData?.employee_count,
      company_remarks: this.singleLeadData?.company_remarks,
      gst_applicable: this.singleLeadData?.gst_applicable,
      gst_number: this.singleLeadData?.gst_number,
      pan_number: this.singleLeadData?.pan_number,
      tan_number: this.singleLeadData?.tan_number,
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

  customerTypeNew() {
    this.cutomerType = false;
  }

  submitForm() {
    
    // this.submitted = false;

    // if (this.leadForm.invalid) {
    //   this.toast.error('Required fields should not be empty', 'Fields Empty');
    //   return;
    // }
    let val = this.leadForm.value;
    

    const data = {
      customer_type: val.customer_type,
      multiple_site_audit: val.site_audit || ' ',
      associated_company: val.associated_company,
      segment: val.segment,
      certificate_type: val.certificate_type,
      first_name: val.first_name,
      last_name: val.last_name,
      email: val.email,
      emplyoment_type: val.emplyoment_type,
      lead_created_by_name: val.lead_created_by_name || ' ',
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
      lead_validated_date: moment(val.lead_validated_date).format('YYYY-MM-DD'),
      lead_validate_remarks: val.lead_validate_remarks,
      lead_assgn_contact_owner: val.lead_assgn_contact_owner,
      assigned_by: val.assigned_by,
      // assigned_date: moment(val.assigned_date).format('YYYY-MM-DD'),
      stage: val.stage,
      lead_assgn_remark: val.lead_assgn_remark,
      customer_category: val.customer_category,
      industry_sector: val.industry,
      employee_count: val.employee_count,
      company_remarks: val.company_remarks,
      gst_applicable: val.gst_applicable,

      assessment_period: val.assessment_period,
      ea_code: val.ea_code,
      add_cert_copy: val.add_cert_copy,
      select_customer: val.select_customer,
      select_program: val.select_program,
      choose_logo: val.choose_logo,
      scope: val.scope,
      upload_certificate: val.upload_certificate,
      status: 'Document Uploaded',
    };
    this.leadService.editLead(this.lead_id, data).subscribe((res: any) => {
      
      this.route.navigate(['master/audit/post-audit/upload-docs-list'], {
        queryParams: { lead_id: this.lead_id },
      });
      this.toast.success('Lead Updated Successfully..');
    });
  }
  updateForm(){
    // this.submitted = false;
    // if (this.leadForm.invalid) {
      
    //   this.toast.error('Required fields should not be empty.', 'Error Occurred!');
    //   return;
    // }
    const data = this.leadForm.value;
    
    this.leadService.editLead(this.lead_id, data).subscribe((res:any) => {
      
      
      this.toast.success("Updated Assignment Successfully..")
      this.route.navigate(['master/audit/post-audit/upload-docs']);
    })

  }

  pdfGenerate() {
    const dashboard = document.getElementById('dashboard');

    const dashboardHeight = dashboard!.clientHeight;
    const dashboardWidth = dashboard!.clientWidth;
    const options = {
      background: 'white',
      width: dashboardWidth,
      height: dashboardHeight,
    };

    domtoimage.toPng(dashboard!, options).then((imgData) => {
      const doc = new jsPDF(
        dashboardWidth > dashboardHeight ? 'l' : 'p',
        'mm',
        [dashboardWidth, dashboardHeight]
      );
      const imgProps = doc.getImageProperties(imgData);
      const pdfWidth = doc.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

      doc.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      window.open(URL.createObjectURL(doc.output('blob')));
    });
  }

  get getFormControls2() {
    const control = this.leadForm.get('tableRows2') as FormArray;
    return control;
  };

  getCurrentRoute():string{
    return this.activeroute.snapshot.url.map(s => s.path).join('/')
}
fun1(e: any) {
  const aa = e
  let filteredVariable = this.variable.filter((item: any) => aa.includes(item.product_master_name));
  this.checkData = filteredVariable
  console.log(this.checkData, "checkkkk")
}
}
