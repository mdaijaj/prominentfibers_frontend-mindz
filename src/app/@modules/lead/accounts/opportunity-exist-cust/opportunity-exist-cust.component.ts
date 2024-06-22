import { Component, ViewChild } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatOption } from '@angular/material/core';
import { MatSelect } from '@angular/material/select';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { calendarFormat } from 'moment';
import { ToastrService } from 'ngx-toastr';
import { EmpRegistrationService } from 'src/app/@shared/services/emp-registration.service';
import { LeadService } from 'src/app/@shared/services/lead.service';
import { RecruitService } from 'src/app/@shared/services/recruitment.service';
import { ConfigurationalmasterService } from '../../../../@shared/services/configurationalmaster.service';
import Swal from 'sweetalert2';
import { AdminSupportService } from 'src/app/@shared/services/admin-support.service';
import { parseJSON } from 'date-fns';

@Component({
  selector: 'app-opportunity-exist-cust',
  templateUrl: './opportunity-exist-cust.component.html',
  styleUrls: ['./opportunity-exist-cust.component.scss']
})
export class OpportunityExistCustComponent {
@ViewChild('productselect') productselect: MatSelect;
  @ViewChild('billSite') billSite: MatSelect;

  leadForm: FormGroup;
  allSelectedProduct = false;
  allSelectedBill:boolean=false;
  nonFormFields: boolean = false;
  gstFormFields: boolean = false;
  logoFormFields: boolean = false;
  basicFormFields: boolean = false;
  otherFormFields: boolean = false;
  // otherFormFields:boolean=false;
  medical: boolean = false;
  jobType: any;
  candidateArray: any;
  interviewGetId: any;
  candidateId: any;
  standardList: any;
  errorMsg: string = '';
  id: any;
  interview_id: any;
  clicked: boolean = false;
  cutomerType: boolean = false;
  sitAudit: boolean = false;
  lead_id: any;
  singleLeadData: any;
  openDate: boolean = false;
  myFiles: any;
  fileList: any;
  val: any;
  public searchResult: any;
  mainId: string | null;
  mainEmployeeData: any;
  allAchievement: any;
  stateList: any[] = [];
  countryList: any[] = [];
  cityList: any;
  pinCodeList: any;
  pinCodeTrue: boolean = true;
  allDataOne: any;
  allDataTwo: any;
  allDataMan: any;
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
  fileListAll: any[] = [];
  categoryList: any;
  submitted: boolean;
  unreg: boolean = false;
  gstreg: boolean = false;
  nonCertt: boolean = false;
  childData: any;
  childBlock: boolean = false;
  now = new Date();
  year = this.now.getFullYear();
  month = this.now.getMonth();
  // day = this.now.getDay();
  date = this.now.getDate();
  maxDate = moment({
    year: this.year + 100,
    month: this.month,
    date: this.date,
  }).format('YYYY-MM-DD');
  minDate = moment({
    year: this.year - 0,
    month: this.month,
    date: this.date,
  }).format('YYYY-MM-DD');
  assignTo: any;
  opportunityById: any;
  msaTrue: boolean = false;
  certificateList: any;
  regionSList: any;
  CategorySList: any;
  regionalbheadList: any;
  globalMsalesList: any;
  assesmentList: any;
  segmentList: any;
  gstvalidation: boolean = false;
  seg_name: any;
  nonCertTrue: boolean = false;
  singleLeadData1: any;
  inputReadonly = true;
  ownerData: any;
  ownerName: any;
  assignData: any;
  asignName: any;
  contact_list: any;
  medvalue: boolean;
  imageToUpload: any;
  imagePath :any[]=[]
  singleData: any;
  curentIndex: any;
  fileData:any=[];
  variables: any=[];
  checkData: any=[];
  variable: any=[];
  billingData: any;
  billingDataCopy: any;
  variablesCopy: any;
  pushBillingAll: string;
  open_house_Data: any;
  showPR: boolean;
  hidePR: boolean;
  constructor(
    private fb: FormBuilder,
    private leadService: LeadService,
    private route: Router,
    private toast: ToastrService,
    private configService: ConfigurationalmasterService,
    private _empRegistration: EmpRegistrationService,
    private recruitService: RecruitService,
    private activeroute: ActivatedRoute,
    private adminService: AdminSupportService,
  ) {
    this.leadForm = this.fb.group({
      customer_type: [{ value: '', disabled: true }, Validators.required],
      site_audit: [{ value: '', disabled: true }, Validators.required],
      new_location_site: new FormControl(null),
      associated_company: new FormControl(null),
      br_number: new FormControl(null),
      lead_created_by_name: new FormControl(null),
      segment: new FormControl(null),
      certificate_type: new FormControl(null),
      first_name: new FormControl(null),
      last_name: new FormControl(null),
      urd_number: new FormControl(null),
      email: new FormControl(null, [
        Validators.required,
        Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
      ]),
      categories: new FormControl(null),
      emplyoment_type: new FormControl(null),
      job_title: new FormControl(null),
      street_address: new FormControl(null),
      address2: new FormControl(null),
      city: new FormControl(null),
      state: new FormControl(null),
      billing_site: new FormControl(null),
      bill_send_site: new FormControl(null),
      country: new FormControl(null),
      postal_code: new FormControl(null),
      region: new FormControl(null),
      regional_bussiness_lead: new FormControl(null),
      global_managing_director: new FormControl(null),
      global_manager_sales: new FormControl(null),
      website_url: new FormControl(null),
      phone_number: new FormControl(null),
      mobile_number: new FormControl(null,[ Validators.required,   Validators.maxLength(15)]),
      dqs_contact_source: new FormControl(null),
      contact_owner: new FormControl(null),
      lead_created_date: new FormControl(null),
      standard_program_assement: new FormControl(null),
      remarks: new FormControl(null, Validators.required),
      lead_validate_stage: new FormControl(null),
      validated_by: new FormControl(null),
      lead_validated_date: new FormControl(null),
      lead_validate_remarks: new FormControl(null, Validators.required),
      lead_assgn_contact_owner: new FormControl(null),
      assigned_by: new FormControl(null),
      assigned_date: new FormControl(null),
      stage: new FormControl(null),
      lead_assgn_remark: new FormControl(null),
      industry_sector: new FormControl(null),
      customer_category: new FormControl(null),
      employee_count: new FormControl(null),
      company_remarks: new FormControl(null),
      gst_applicable: new FormControl(null),
      gst_number: new FormControl(null),
      pan_number: new FormControl(null),
      tan_number: new FormControl(null),
      file: new FormControl(null),
      contact_review_form: new FormControl(null, Validators.required),
      gst_file: new FormControl(null, Validators.required),
      basic_form: new FormControl(null, Validators.required),
      company_logo: new FormControl(null, Validators.required),
      other_file: new FormControl(null),
      document_remark: new FormControl(null),
      customer_sales_executive: new FormControl(null, Validators.required),
      assigned_to: new FormControl(null, Validators.required),
      opportunity_type: new FormControl(null, Validators.required),
      product_request: new FormControl(null, Validators.required),
      non_cert_type: new FormControl(null),
      open_house_start_date: new FormControl(null),
      open_house_end_date: new FormControl(null),
      billing_site_copy: new FormControl(null),
      in_house_mandays: new FormControl(null),
      phone_code: new FormControl(null),
      mobile_code: new FormControl(),
      other_upload: new FormArray([
        new FormGroup({
          other_file: new FormControl(null),
        })
      ]),
    });
  }

  ngOnInit() {
    this.activeroute.queryParams.subscribe((params) => {
      this.id = params;
      this.lead_id = this.id.lead_id;

      this.leadService.getByIdChildLead(this.lead_id).subscribe((res: any) => {
        this.childData = res.data;
        if (this.childData.length === 0) {
          this.childBlock = true;

        }
      });
      this.leadService.getByIdLead(this.lead_id).subscribe((res: any) => {
        this.singleLeadData = res.data;
        this.configService.getProducts(res.data.certificate_type).subscribe((res:any)=>{
          this.assesmentList=res.data
          this.variables = this.assesmentList.map((res: any) => res.product_master_name)
          this.checkData = this.assesmentList
          this.variable = this.assesmentList
          console.log(this.assesmentList,"assesmentList");
          
        },(err:any)=>{
          this.toast.warning("no data found")
        })
    
        console.log(this.singleLeadData);

        if (this.singleLeadData?.export === 'Export Wise') {
          this.gstvalidation = false;
        }
        if (this.singleLeadData?.certificate_type_name === 'Non-Cert') {
          this.nonCertTrue = false;

        } else {
          this.nonCertTrue = true;

        }
        if(this.singleLeadData?.segment_name === 'MED'){
          this.medvalue = true;
        }
        this.nonCertFunc();
        this.patchFormvalue();
      });

      this.leadService.getByIdLeadId(this.lead_id).subscribe((res: any) => {
        //
        let x = res.data.map((a: any) => {
          return { ...a, checked: false };
        });
        this.singleLeadData1 = x;

        console.log(this.singleLeadData1,'xxxxxxxxxxx')
        this.billingData=x;
        console.log( this.billingData,' this.billingData');
        
   const billArray:any=[]
        for(let a=0; a<= this.billingData.length-1; a++){
           if(this.billingData[a]?.lead_genration_id===this.singleLeadData?.lead_genration_id){
            billArray.push(this.billingData[a]);
           
            }
           
        }
        billArray.push(this.singleLeadData)
        console.log( billArray,' this.billingData after');
        
this.billingDataCopy=billArray;



this.variablesCopy = this.billingDataCopy.map((res: any) => res.br_number);
console.log(this.variablesCopy,'this.variablesCopy');

      });
    });
    this.getAchievementList();
    this.getAllSegment();
    this.patchFormvalue();
    this.getCategory();
    this.getCountry();
    this.getAchievementListt();
    this.regionalBusiness();
    this.globalManagerales();
    this.get_cp_contact();
    this.mainId = localStorage.getItem('EmpMainId');

    if (this.mainId == undefined) {
      this._empRegistration.getByUserId(this.mainId).subscribe((res) => {
        this.mainEmployeeData = res.data;

        this.getAchievementList();
        this.patchFormvalue();
      });
    }
    this.getStandardProgram();
  }

  seePreview(path: string, imagePath: any) {
    if (!this.imagePath) {
      if (path) {
        Swal.fire({
          imageUrl: path,
          imageHeight: 250,
          imageAlt: 'Uploaded Document',
          confirmButtonColor: "#8B817D",
          confirmButtonText: 'Ok',
        })
      }
    } else {
      Swal.fire({
        imageUrl: imagePath,
        imageHeight: 250,
        imageAlt: 'Profile Image',
        confirmButtonColor: "#8B817D",
        confirmButtonText: 'Ok',
      })
    }
  }

  checkUnreg() {

    if (this.singleLeadData?.gst_applicable === 'Unregistered Dealer') {
      this.unreg = true;
      this.gstreg = false;
    } else {
      this.gstreg = true;
      this.unreg = false;
    }
  }
  medicalFlow(e: any) {
    const segment_id = e.value;
    // let id
    // const segment_id = this.segmentList.forEach((item: any) => {
    //   if(segment_name === item.segment_name)
    //   {
    //     id = item.segment_id
    //   }
    // });

    this.leadService.getCertificateByID(segment_id).subscribe((res: any) => {


      this.certificateList = res.data.new_certificate_types;
    });

    this.leadService.getRegionByID(segment_id).subscribe((res: any) => {
      this.regionSList = res.data.new_regions;
    });

    this.leadService.getCategoryBySegID(segment_id).subscribe((res: any) => {
      this.CategorySList = res.data.new_category_masters;
    });

    if (e.value === 'MED') {
      this.medical = true;
    } else {
      this.medical = false;
    }
  }


  get CF_1(): any {
    return this.leadForm.controls;
  }
  // msaLead() {

  // }
  // medLead() {

  // }

  // msaLead(e: any){
  //   if(e.value==='MSA'){
  //     this.msaTrue = false;
  //   }
  //   else
  //   {
  //     this.msaTrue = true;
  //   }
  // }
  addrow(){
    <FormArray>this.CF_1.other_upload.push(
      new FormGroup({
        other_file: new FormControl(null),
      })
    );
  }

  deleteRow(i: any, control: any,){
    if (this.CF_1.other_upload.length > 1) {

        this.CF_1.other_upload.removeAt(i);
    } else {
      this.toast.error("Can't Deleted", "must be one");
    }
  }


  certificateChange(event: any) {
    const certi_id = event.value;
    this.configService.getProducts(certi_id).subscribe((res:any)=>{
      this.assesmentList=res.data
      this.variables = this.assesmentList.map((res: any) => res.product_master_name)
      this.checkData = this.assesmentList
      this.variable = this.assesmentList
    },(err:any)=>{
      this.toast.warning("no data found")
    })


    let certificate_value1;
    this.certificateList.forEach((item: any) => {

      if (certi_id === item.certificate_type_id) {
        certificate_value1 = item.certificate_type_name;
      }
    });


    if (certificate_value1 === 'Non-Cert') {
      this.leadForm.patchValue({
        site_audit: 'No',
      });
    } else {
      this.leadForm.patchValue({
        site_audit: 'Yes',
      });
    }

    // this.leadService.getAssesmentByID(certi_id).subscribe((res: any) => {

    //   this.assesmentList = res.data[0].newitemlist;
  

    // });

    if (event.value === 'Non Cert') {
      this.sitAudit = true;
    } else {
      this.medical = false;
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
  formFieldsRequired() {
    let val = this.leadForm.value;


    if (val.contact_review_form === null) {
      this.nonFormFields = true;
      // alert("Please update the field...")
    } else {
      this.nonFormFields = false;
    }

    if (val.gst_file === null) {
      this.gstFormFields = true;
      // alert("Please update the field...")
    } else {
      this.gstFormFields = false;
    }

    if (val.company_logo === null) {
      this.logoFormFields = true;
      // alert("Please update the field...")
    } else {
      this.logoFormFields = false;
    }

    if (val.basic_form === null) {
      this.basicFormFields = true;
    } else {
      this.basicFormFields = false;
    }
    if (val.other_file === null) {
      this.otherFormFields = true;
    } else {
      this.otherFormFields = false;
    }
  }

  openHouse() {
    this.openDate = true;
    console.log('open house selection')
    this.leadService.getOpenHouseData(this.singleLeadData?.br_number).subscribe((res: any) => {
    console.log('res of open hoouse patch data ***********', res?.data[0])
    this.open_house_Data = res?.data[0]
    this.showPR = true;
    this.hidePR = true;
    this.leadForm.patchValue({
      open_house_start_date: this.open_house_Data?.open_house_start_date,
      open_house_end_date: this.open_house_Data?.open_house_end_date,
      in_house_mandays: this.open_house_Data?.no_of_days ,
      product_request: this.open_house_Data?.program_name[0],
    })
    console.log('product_request value*', this.leadForm.value.product_request)
    });
    

  }
  closeHouse() {
    this.openDate = false;
    this.showPR = false;
    this.hidePR = false;

  }

  nonCertFunc() {
    console.log(this.singleLeadData?.certificate_type_name);

    if (this.singleLeadData?.certificate_type_name == 'Non-Cert') {
      this.nonCertt = true;
      this.openDate = true;
    }
    else {
      this.openDate = true;
      this.openDate = false;
    }
  }

  fetchSeries(value: String) {
    if (value === '') {
      return (this.searchResult = []);
    }
    this.searchResult = this.allAchievement.filter(function (series: any) {

      return series.first_name.toLowerCase().startsWith(value);
    });
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

  candidateClick(e: any) {

    this.candidateId = e;
    this.recruitService.interViewGetIdBy(e).subscribe((res: any) => {
      this.interviewGetId = res.data;

      this.patchFormvalue();
    });
  }

  fileInputChange(fileInput: File[] | any) {
    this.errorMsg = '';
    this.nonFormFields = false;

    if (fileInput.target.files && fileInput.target.files[0]) {
      const file = fileInput.target.files[0];

      const reader = new FileReader();
      const fileSizeInMb = file.size / 1024 ** 2;
      console.log(fileSizeInMb);
      
      if (fileSizeInMb > 30) {
        this.errorMsg = 'File size should be less than 30MB';
        console.log();
        
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

    this.gstFormFields = false;
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

    this.logoFormFields = false;
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

    this.basicFormFields = false;
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

    this.otherFormFields = false;
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

  patchFormvalue() {
    console.log('singlelead',this.singleLeadData)

    this.checkUnreg();
    if (this.singleLeadData?.segment_name === 'MED') {
      this.msaTrue = true;
    }
    if (this.singleLeadData?.segment_name === 'MSA') {
      this.msaTrue = false;
    }
    if (this.singleLeadData?.segment != 'null || undefined') {
      this.leadService
        .getCertificateByID(this.singleLeadData?.segment)
        .subscribe((res: any) => {
          this.certificateList = res.data.new_certificate_types;
        });
      this.leadService
        .getRegionByID(this.singleLeadData?.segment)
        .subscribe((res: any) => {
          this.regionSList = res.data.new_regions;
        });
      this.leadService
        .getCategoryBySegID(this.singleLeadData?.segment)
        .subscribe((res: any) => {
          this.CategorySList = res.data.new_category_masters;

        });
    }

    if (this.singleLeadData?.region != 'null || undefined') {
      this.leadService
        .getRBuisnessHead(this.singleLeadData?.region)
        .subscribe((res: any) => {
          this.regionalbheadList = res.data;

        });
      this.leadService
        .getGlobalManagerSales(this.singleLeadData?.region)
        .subscribe((res: any) => {
          this.globalMsalesList = res.data;

        });
    }

    if (this.singleLeadData?.country != 'undefined || null') {
      this.leadService
        .getStateByID(this.singleLeadData?.country)
        .subscribe((res: any) => {
          this.patchCountryCode(this.singleLeadData?.country)
          this.stateList = res.data;
        });
    }
    if (this.singleLeadData?.state != 'undefined || null') {
      this.leadService
        .getCityByID(this.singleLeadData?.state)
        .subscribe((res: any) => {

          this.cityList = res.data;
        });
    }
    if (this.singleLeadData?.city != 'undefined || null') {
      this.leadService
        .getPinCodeNew(this.singleLeadData?.city)
        .subscribe((res: any) => {
          this.pinCodeList = res.data;


        });
    }
    // if (this.singleLeadData?.certificate_type != 'undefined || null') {
    //   this.leadService
    //     .getAssesmentByID(this.singleLeadData?.certificate_type)
    //     .subscribe((res: any) => {

    //       // this.assesmentList = res.data[0].newitemlist;
    //       console.log(this.assesmentList,"assesmentList");
      
   

    //     });
    // }
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
      contact_owner: this.singleLeadData?.contact_owner,
      lead_created_by_name: this.singleLeadData?.lead_created_by_name,
      validated_by: this.singleLeadData?.validated_by,
      emplyoment_type: this.singleLeadData?.emplyoment_type,
      street_address: this.singleLeadData?.street_address,
      job_title: this.singleLeadData?.job_title,
      address2: this.singleLeadData?.address2,
      non_cert_type: this.singleLeadData?.non_cert_type,
      city: this.singleLeadData?.city,
      categories: this.singleLeadData?.categories,
      urd_number: this.singleLeadData?.urd_number,
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
      dqs_contact_source: this.singleLeadData?.dqs_Contact_id,
      lead_created_date: this.singleLeadData?.lead_created_date,
      standard_program_assement: this.singleLeadData?.standard_program_assement,
      remarks: this.singleLeadData?.remarks,
      lead_validated_date: this.singleLeadData?.lead_validated_date,
      lead_validate_remarks: this.singleLeadData?.lead_validate_remarks,
      industry_sector: this.singleLeadData?.industry_sector,
      company_remarks: this.singleLeadData?.company_remarks,
      gst_number: this.singleLeadData?.gst_number,
      pan_number: this.singleLeadData?.pan_number,
      tan_number: this.singleLeadData?.tan_number,
      customer_category: this.singleLeadData?.customer_category,
      employee_count: this.singleLeadData?.employee_count,
      customer_sales_executive: this.singleLeadData?.customer_sales_executive,
      assigned_to: this.singleLeadData?.assigned_to,
      opportunity_type: this.singleLeadData?.opportunity_type,
      gst_applicable: this.singleLeadData?.gst_applicable,
      product_request: this.singleLeadData?.product_request,
      lead_assgn_contact_owner: Number(this.singleLeadData?.lead_assgn_contact_owner),
        assigned_by: this.singleLeadData?.assigned_by,
        assigned_date: this.singleLeadData?.assigned_date,
        stage: this.singleLeadData?.stage,
        lead_assgn_remark: this.singleLeadData?.lead_assgn_remark,
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
  get_cp_contact(){
    this.leadService.get_contact().subscribe(
      (res:any)=>{
        this.contact_list = res.data;

      },(err)=>{

      }
    )
  };
  customerTypeNew() {
    this.cutomerType = false;
  }
  getCategory() {
    this.configService.listCategory().subscribe((res: any) => {
      this.categoryList = res.data;

    });
  }

  getAllSegment() {
    this.configService.getAllSegment().subscribe((res: any) => {
      this.segmentList = res.data;

    });
  }

  getCountryID(e: any) {

    this.leadService.getStateByID(e.value).subscribe((res: any) => {

      this.stateList = res.data;
    });
  }

  getCountry() {
    this.configService.getCountry().subscribe((res: any) => {
      this.countryList = res.data;

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

  getAchievementListt() {
    this.leadService.regionListGet().subscribe((res: any) => {

      this.allDataOne = res.data;
    });
  }

  regionalBusiness() {
    this.leadService.getListBusiness().subscribe((res: any) => {

      this.allDataTwo = res.data;
    });
  }

  globalManagerales() {
    this.leadService.getGlobalSalesM().subscribe((res: any) => {

      this.allDataMan = res.data;
    });
  }

  submitForm() {
    this.submitted = false;


    if (this.leadForm.invalid) {
      this.formFieldsRequired();
      this.toast.error(
        'Required fields should not be empty or invalid.',
        'Error Occurred!'
      );
      return;
    }
   
      if (this.leadForm.value.contact_review_form == null) {
        this.toast.error('Contact Review Form should not be empty.');
      }
      if (this.leadForm.value.contact_review_form == null) {
        this.toast.error('Contact Review Form should not be empty.');
      }
      if (this.leadForm.value.basic_form == null) {
        this.toast.error('Basic Form should not be empty.');
      }
      if (this.leadForm.value.gst_file == null) {
        this.toast.error('GST file should not be empty.');
      }
  
    let val = this.leadForm.value;


    this.submitted = true;
    const dataMain = {
      customer_type: this.singleLeadData?.customer_type,
      multiple_site_audit: this.singleLeadData?.multiple_site_audit || ' ',
      associated_company: this.singleLeadData?.associated_company,
      billing_site: val.billing_site,
      billing_site_copy:val.billing_site_copy,
      bill_send_site: true,
      segment: val.segment,
      certificate_type: val.certificate_type,
      first_name: val.first_name,
      lead_created_by_name: val.lead_created_by_name || ' ',
      last_name: val.last_name,
      non_cert_type: val.non_cert_type,
      email: val.email,
      emplyoment_type: val.emplyoment_type,
      job_title: val.job_title,
      street_address: val.street_address,
      address2: val.address2,
      city: val.city,
      categories: val.categories,
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
      assigned_to: val.assigned_to,
      opportunityById: this.opportunityById, //change by vrajesh
      product_request: val.product_request,
      customer_sales_executive: val.customer_sales_executive,
      opportunity_type: val.opportunity_type,
      lead_assgn_remark: val.lead_assgn_remark,
      customer_category: val.customer_category,
      industry_sector: val.industry_sector,
      employee_count: val.employee_count,
      company_remarks: val.company_remarks,
      gst_applicable: val.gst_applicable,
      gst_number: val.gst_number,
      pan_number: val.pan_number,
      tan_number: val.tan_number,
      open_house_start_date: '2023-01-01',
      open_house_end_date: '2023-01-01',
      in_house_mandays: val.in_house_mandays,
      // lead_created_by_name:val.lead_created_by_name,
      status: 'Opportunity',
    };
    const data = {
      contact_review_form: this.fileDetails.file,
      gst_file: this.fileDetailsOne.file,
      basic_form: this.fileDetailsTwo.file,
      company_logo: this.fileDetailsThree.file,
      document_remark: val.document_remark,
      status: 'Opportunity',
    };

     console.log('dataMain *********', dataMain)


    this.leadService.editLead(this.lead_id, dataMain).subscribe((res: any) => {

    });
    this.leadService.editLeadDoc(this.lead_id, data).subscribe((res: any) => {

      this.toast.success('Account Converted to Opportunity Successfully..');
      this.route.navigate(['master/lead/lead-opportunity/opportunity-list'], {
        queryParams: {
          lead_id: [this.lead_id],
          opportunityById: [this.opportunityById],
        },
      });
    });
  }
  cancel() {
    window.location.reload();
  }
  getStandardProgram() {
    this.configService.listAsses().subscribe((res: any) => {

      this.standardList = res.data;

    });
  }

  toggleAllCodeSelect() {
    if (this.allSelectedProduct) {
      this.productselect.options.forEach((item: MatOption) => item.select());
    } else {
      this.productselect.options.forEach((item: MatOption) => item.deselect());
    }
  }
  toggleAllCodeSelect2(){
    if (this.allSelectedBill) {
      this.billSite.options.forEach((item: MatOption) => item.select());
    } else {
      this.billSite.options.forEach((item: MatOption) => item.deselect());
    }
  }
  optionEaCode() {
    let newStatus = true;
    this.productselect.options.forEach((item: MatOption) => {
      if (!item.selected) {
        newStatus = false;
      }
    });
    this.allSelectedProduct = newStatus;
  }
  optionEaCodeCopy(e: any){
    console.log(e);
    
    let newStatusCopy = true;
    this.billSite.options.forEach((item: MatOption) => {
      if (!item.selected) {
        newStatusCopy = false;
      }
    });
    this.allSelectedBill = newStatusCopy;
  }
  assigneOppotunityto(e: any) {
    //change by vrajesh

    this.opportunityById = e.value.employee_id;
    this.assignTo = e.value.first_name;
  }

  public toggleInputReadonly() {
    this.inputReadonly = !this.inputReadonly;
  }

  wnerClick(e: any) {

    this.ownerData = e.employee_id;

    this.ownerName = e.first_name;

  }

  assignClick(e: any) {

    this.assignData = e.employee_id;
    this.asignName = e.first_name;

  }

  onChange(e: any,i:any ,) {
    if (e.target.files && e.target.files[0]) {
      const data: FileList = e.target.files;
      this.imageToUpload = data.item(0) || null;
      this.fileData.push({index:i, filePath:this.imageToUpload})
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imagePath[i] = e.target.result;


      };
      reader.readAsDataURL(this.imageToUpload);
    }


  }

  seeDocuments(file:any,control:any){
    //
    if(!control.controls.other_file.value){
      window.open(file, '_blank');
      // "toolbar=yes,scrollbars=yes,resizable=yes,top=500,left=500,width=400,height=400"
    }else{
      this.toast.warning('Selected file not uploaded');
    };
  };


  uploadOtherDoc(i: any, control: any) {
    this.curentIndex = i;
    if(!this.lead_id ){
      this.toast.error("Please create first")
    }
    if (control.value.other_file === null) {
      this.toast.error('Fields should not be blank');
      return;
    };

    if (control.value.other_file === null) {
      this.toast.error('if you want to update', 'Select file');
      return;
    };

    let file: any = this.fileData.find((e: any) => e.index === i);
    console.log('file',file);

    if (file) {
      const data: any = {
        other_file:file.filePath,
      };
      let filePath:File = file.filePath;
      const formData: any = new FormData();
      formData.append('other_file', filePath ,filePath.name);

      this.leadService.uploadOtherDoc(this.lead_id, formData).subscribe((res:any)=>{
        console.log("response",res)
        if(res.code ==200){
          this.toast.success(res.message)
        }
      })
    }
  };
  getCurrentRoute():string{
    return this.activeroute.snapshot.url.map(s => s.path).join('/')
}
productFilter(e: any) {
  const aa = e
  let filteredVariable = this.variable.filter((item: any) => aa.includes(item.product_master_name));
  this.checkData = filteredVariable
  console.log(this.checkData, "checkkkk")

}

billFilter(e:any){
  console.log(e,'eeee billing');
  
}

patchCountryCode(id:any){
  this.countryList.forEach((res:any) =>{
    if(res.countryss_id == id){
        let code = "+" + res.phone_code;
        this.leadForm.patchValue({
          // phone_code: code,
          mobile_code: code
        })
    }
  })
}

onKeyPress(event: KeyboardEvent) {
  // Check if the pressed key is a number (0-9)
  if (/[0-9]/.test(event.key)) {
    event.preventDefault(); // Prevent the keypress event
  }
}
}


