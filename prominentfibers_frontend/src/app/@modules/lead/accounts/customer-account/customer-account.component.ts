import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { el } from 'date-fns/locale';
import { ToastrService } from 'ngx-toastr';
import { ConfigurationalmasterService } from 'src/app/@shared/services/configurationalmaster.service';
import { EmpRegistrationService } from 'src/app/@shared/services/emp-registration.service';
import { LeadService } from 'src/app/@shared/services/lead.service';
import { RecruitService } from 'src/app/@shared/services/recruitment.service';
import Swal from 'sweetalert2';

export interface PeriodicElement {
  br_number: string;
  account_name: string;
  contact_name: string;
  city: string;
  region: string;
  contact_owner: string;
  account_edit: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { account_name: "Test", br_number: "BR000001", contact_name: "Test Name", city: 'H', region: "Asia", contact_owner: "Self", account_edit: "true" },
  { account_name: "Test 1", br_number: "BR000001", contact_name: "Test Name 1", city: 'He', region: "Asia", contact_owner: "Self", account_edit: "true" },
  { account_name: "Test 2", br_number: "BR000001", contact_name: "Test Name 2", city: 'Li', region: "Asia", contact_owner: "Self", account_edit: "true" }
];

@Component({
  selector: 'app-customer-account',
  templateUrl: './customer-account.component.html',
  styleUrls: ['./customer-account.component.scss']
})
export class CustomerAccountComponent {
  displayedColumns: string[] = ['account_name', 'br_number', 'contact_name', 'city', 'region','phone_code', 'contact_owner', 'action'];
  dataSource = ELEMENT_DATA;
  contactForm: FormGroup;
  jobType: any;
  candidateArray: any;
  interviewGetId: any;
  candidateId: any;
  id: any;
  panelOpenState = false;
  panelOpenStateContact: boolean = false;
  interview_id: any;
  clicked: boolean = false;
  cutomerType: boolean = false;
  sitAudit: boolean = false;
  addContact: boolean = false;
  addChileContact: boolean = false;
  editButtonChild: boolean = false;
  lead_id: any;
  singleLeadData: any;
  myFiles: any;
  multipleSite: boolean = false;
  fileList: any;
  childData: any;
  editButton: boolean = false;
  standardList: any;
  childBlock: boolean = false;
  multipleContactList: any;
  childSingleData: any;
  childId: any;
  newContactData: string;
  newSetPrimaryFunc: boolean = false;
  getAllDepartment: any;
  br_list: any = [];
  getBR: any;
  selectedBR: any;
  getBR_Data: any;
  isData: any;
  GetByIdData: any;
  child_id: any;
  br: any;
  primary: any;
  allContactSourceData:any;
  contactSourceName:any;
  status: any;
  updateData: any;
  customerDetailsForm: FormGroup;
  segmentList: any;
  industryList: any;
  openCutome: boolean = false;
  addressForm: FormGroup;
  stateList: any;
  countryList: any;
  cityList: any;
  openAdress: boolean = false;
  leadSourceForm: FormGroup;
  contact_list: any;
  openLeadSource: boolean;
  updateDataAdres: any;
  updateDataLead: any;
  certificateList: any;
  countryVar: any;
  countryVar2: any;
  stateVar2: any;
  stateVar: any;
  cityVar2: any;
  cityVar: any;

  constructor(private fb: FormBuilder,
    private configService: ConfigurationalmasterService,
    private _empRegistration: EmpRegistrationService, private toast: ToastrService, private leadService: LeadService, private route: Router, private recruitService: RecruitService, private activeroute: ActivatedRoute) {
      const urlRegex = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/;

    this.contactForm = this.fb.group({
      contact_name: new FormControl(null, [Validators.required]),
      contact_number: new FormControl(null, [Validators.required, Validators.maxLength(10),
      Validators.pattern('^[0-9]*$'),
      Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$')]),
      contact_email: new FormControl(null, [Validators.required,
      Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]),
      contact_department: new FormControl(null, Validators.required),
      contact_primary: new FormControl(),
      contact_set_primary: new FormControl(null),
      br_number: new FormControl(null),
    }),
    
      this.customerDetailsForm = this.fb.group({
        associated_company: new FormControl(),
        segment: new FormControl(),
        certificate_type: new FormControl(),
        employee_count: new FormControl(),
        website_url: new FormControl('', [Validators.pattern(urlRegex)]),
        br_number: new FormControl(),
        phone_number: new FormControl(''),
        industry_sector: new FormControl(),
        customer_category: new FormControl(),
        phone_code: new FormControl(null ,[Validators.maxLength(6),  Validators.pattern('^[0-9]{0,6}$'), 
        this.noNegativeValues()]),
      }),
      this.addressForm = this.fb.group({
        street_address: new FormControl(),
        address2: new FormControl(),
        region: new FormControl(),
        postal_code: new FormControl(),
        city: new FormControl(),
        state: new FormControl(),
        country: new FormControl(),

      }),
      this.leadSourceForm = this.fb.group({
        dqs_contact_source: new FormControl(),
        city: new FormControl(),
        lead_created_by_name: new FormControl(),
        lead_created_date: new FormControl()
      })
  }

  ngOnInit() {
    this.getAllContactSource();

    this.activeroute.queryParams.subscribe(params => {
      this.id = params;
      this.lead_id = this.id.lead_id;
      this.status = this.id.status;
      this.getContactTable();
      this.getContactNew();
      this.getAllDepartment_dropDown();
      this.getChildSiteData();
    });
    this.br_get(this.lead_id);
    this.getAllSegment();
    this.getAllIndustry();
   
    this.get_cp_contact();
    this.getCountry();
  }

  getChildSiteData(){
    this.leadService.getByIdChildLead(this.lead_id).subscribe((res: any) => {
      this.childData = res.data;
      console.log('test',this.childData);
      
      if (this.childData.length === 0) {
        this.childBlock = true;

      }
    })
  }

  noNegativeValues(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      if (control.value && control.value < 0) {
        return { 'negativeValue': true };
      }
      return null;
    }
  }
  br_get(id: any) {
    //   let data= [
    //     {
    //         br_number: 50257627,
    //         type: "Parent"
    //     },
    //     {
    //         br_number: 50303086,
    //         type: "child"
    //     },
    //     {
    //         br_number: 50306823,
    //         type: "child"
    //     },
    //     {
    //         br_number: 50304322,
    //         type: "child"
    //     }
    // ]
    // this.getBR=data

    this.leadService.getByID_BR(id).subscribe((res: any) => {
      this.getBR = res.data
      console.log(this.getBR, "br list");

    })
  }
  getDetails(data: any) {
    this.addContact = false
    console.log(data, "");
    this.leadService.getLeadDataby_BR(data.br_number).subscribe((res: any) => {
      // const newData = [res.result[0][0], ...res.result.slice(1)];
      // this.getBR_Data=newData;
      this.getBR_Data = res.result;
      console.log(this.getBR_Data, "getBR_Data");
      this.isData = res.result.length
    })
    // this.contactListAsPerBR_No


  }

  onEmailInput(event: any) {
    const inputElement = event.target as HTMLInputElement;
    const lowercaseValue = inputElement.value.toLowerCase();
    this.contactForm.controls?.['contact_email'].setValue(lowercaseValue);
  }


  getContactTable() {
    this.leadService.getByIdLead(this.lead_id).subscribe((res: any) => {
      if(res && res.data){
        this.singleLeadData = res.data;
        this.getStandardProgram();
        this.getAllDepartment_dropDown() 
        this.patchFormvalue();
        this.getStandardProgram();
      }
    });
  }
  getContactNew() {
    this.leadService.getMultipleContact(this.lead_id).subscribe((res: any) => {

      this.multipleContactList = res.result;
      console.log(this.multipleContactList);

      if (this.multipleContactList?.contact_set_primary === "primary") {
        this.newSetPrimaryFunc = true;
      } else {
        this.newSetPrimaryFunc = false;
      }
      console.log(this.newSetPrimaryFunc);

      // this.patchFormvalue();
    });
  }

  // editLeadNew() {
  //   this.route.navigate(['master/lead/lead-account/create-account'],
  //       { queryParams: { lead_id: this.lead_id } }
  //     );
  // }
  getAllDepartment_dropDown() {
    this._empRegistration.getAllDepartment_dropDown().subscribe(
      (res) => {

        this.getAllDepartment = res.data;
      }
    );
  };
  edit_child(e: any) {
    console.log(e);
    this.route.navigate(['master/lead/lead-account/create-child'],
        { queryParams: { lead_id: e, type: "editLead" } }
    );
  }
  contactPanel(e: any) {


  }

  back() {
    this.route.navigate(['master/lead/lead-account/account-list']);
  }
  addOpportunity() {
    this.route.navigate(['master/lead/lead-account/convert-opportunity'],
        { queryParams: { lead_id:this.lead_id, status: this.status } }
      );
  }

  addBtn(data: any) {

    console.log(data, "data");
    this.selectedBR = data.br_number

    this.addContact = !this.addContact;
    this.editButton = false;
    this.clearInput();
    // if(this.isData==0){
    //   this.isData=1
    //   console.log(this.isData);
    // }
  }

  addSite() {
    this.route.navigate(['master/lead/lead-account/create-child'],
      { queryParams: { lead_id: this.lead_id, role: 'add-site' } }
    );
    this.route.navigate(['master/lead/lead-account/create-child'],
      { queryParams: { lead_id: this.lead_id, type: 'child-site' } }

    )
  }
  editLead() {
    this.route.navigate(['master/lead/lead-account/create-account'],
      { queryParams: { lead_id: this.lead_id } }
    );
  }

  addContactBtn() {
    let val = this.contactForm.value;
    console.log('test',val);

    if (this.contactForm.invalid) {
      this.toast.error(
        'Required fields should not be empty.',
        'Error Occurred!'
      );
      return;
    }
    if (val.contact_set_primary === true) {
      this.newContactData = "primary"
    } else {
      this.newContactData = " "
    }
    let data = {
      lead_genration_id: Number(this.lead_id),
      contact_name: val.contact_name,
      contact_number: val.contact_number,
      contact_email: val.contact_email,
      contact_department: val.contact_department,
      contact_set_primary: this.newContactData,
      contact_primary: val.contact_primary,
      br_number: this.selectedBR,
    }
    this.leadService.createMultipleContact(data).subscribe((res: any) => {
      this.toast.success("Contact Added Successfully..");
      this.getContactNew();
      this.addContact = false;
      this.leadService.getLeadDataby_BR(data.br_number).subscribe((res: any) => {
        // const newData = [res.result[0][0], ...res.result.slice(1)];
        //     this.getBR_Data=newData;
        this.getBR_Data = res.result;
        this.isData = res.result.length
      })
    },(err)=>{
      this.toast.error(err.error.message)
    })
  }

  candidateClick(e: any) {

    this.candidateId = e;
    this.recruitService.interViewGetIdBy(e).subscribe((res: any) => {
      this.interviewGetId = res.data;

      this.patchFormvalue();
    })
  }

  onFileChange(event: any) {


    this.fileList = event.target.files;

  }

  cancelBtn(){
    this.addContact = false;
    this.editButton = false;
  }

  editBtn(e: any) {
    console.log(e, "edit");
    this.child_id = e.childSite_id
    this.br = e.br_number
    this.addContact = true;
    this.editButton = true;
    // this.patchContactValue(e.childSite_id);
    // this.leadService.getChildLead(e.childSite_id).subscribe((res:any)=>{
    //   this.GetByIdData=res.data
    //   console.log(this.GetByIdData);

    // })
    this.contactForm.patchValue({
      contact_name: e.contact_name,
      contact_number: e.contact_number,
      contact_email: e.contact_email,
      contact_department: e.contact_department,
      contact_primary: e.contact_primary,
      contact_set_primary: e.contact_set_primary
    })
  }

  deleteBtnP(data: any) {
    console.log('data', data);
    
  if(data.contact_set_primary){
    this.toast.warning('Can`t Delete this ...!')
    return
  }
    // e.stopPropagation();
    Swal.fire({
      title: 'Are you sure to delete this Contact Detail ?',
      text: "You won't be able to revert this!",
      icon: 'question',
      showCancelButton: true,
      cancelButtonColor: "#f44336",
      confirmButtonColor: "#3f51b5",
      confirmButtonText: 'Yes',
      cancelButtonText: 'Not Yet'
    }).then((result: any) => {
      if (result.isConfirmed) {

        this.childId = data.childSite_id;
        this.leadService.deleteChildLead(this.childId).subscribe((res: any) => {
          this.toast.success(
            'Contact has been successfully deleted.'
          );
          this.addContact = false
          this.getContactNew();
          this.leadService.getLeadDataby_BR(data.br_number).subscribe((res: any) => {
            // const newData = [res.result[0][0], ...res.result.slice(1)];
            // this.getBR_Data=newData;
            this.getBR_Data = res.result;
            this.isData = res.result.length

          })
        })
      };
    });



    //

  }
  editBtnP(childSite_id: any, data: any) {
    this.childId = childSite_id;
    this.childSingleData = data;
    this.addChileContact = !this.addChileContact;
    this.editButtonChild = true;

  }


  patchContactValue(child_id: any) {

    // this.getBy_child_id.subscribe
    this.contactForm.patchValue({
      contact_name: this.singleLeadData.first_name,
      contact_number: this.singleLeadData.mobile_number,
      contact_email: this.singleLeadData.email,
      contact_department: this.singleLeadData.job_title
    })
  }

  clearInput() {
    // Clear the input field
    this.contactForm.get('contact_name')?.reset();
    this.contactForm.get('contact_number')?.reset();
    this.contactForm.get('contact_email')?.reset();
    this.contactForm.get('contact_department')?.reset();
  }

  patchFormvalue() {
    if (this.singleLeadData.dqs_contact_source != null || undefined) {
      this.contactSourceName = this.patchContactSource(this.singleLeadData.dqs_contact_source);
      console.log(this.contactSourceName, "kkkkkkkkkkkkkkkkkkkkkkkkkkkkk");

    }

    if (this.singleLeadData.multiple_site_audit === "No") {
      this.multipleSite = false;
    } else {
      this.multipleSite = true;
    }
    this.contactForm.patchValue({
      customer_type: this.singleLeadData.customer_type,
      site_audit: this.singleLeadData.multiple_site_audit,
      associated_company: this.singleLeadData.associated_company,
      segment: this.singleLeadData.segment,
      br_number: this.singleLeadData.br_number,
      assignedManager: this.singleLeadData.assigned_hiring_manager,
      certificate_type: this.singleLeadData.certificate_type,
      first_name: this.singleLeadData.first_name,
      last_name: this.singleLeadData.last_name,
      email: this.singleLeadData.email,
      emplyoment_type: this.singleLeadData.emplyoment_type,
      street_address: this.singleLeadData.street_address,
      job_title: this.singleLeadData.job_title,
      address2: this.singleLeadData.address2,
      city: this.singleLeadData.city,
      state: this.singleLeadData.state,
      country: this.singleLeadData.country,
      postal_code: this.singleLeadData.postal_code,
      region: this.singleLeadData.region,
      regional_bussiness_lead: this.singleLeadData.regional_bussiness_lead,
      global_managing_director: this.singleLeadData?.global_managing_director,
      global_manager_sales: this.singleLeadData?.global_manager_sales,
      website_url: this.singleLeadData?.website_url,
      phone_number: this.singleLeadData?.phone_number,
      mobile_number: this.singleLeadData?.mobile_number,
      dqs_contact_source: this.singleLeadData?.dqs_contact_source,
      contact_owner: this.singleLeadData?.contact_owner,
      lead_created_date: this.singleLeadData?.lead_created_date,
      standard_program_assement: this.singleLeadData?.standard_program_assement,
      remarks: this.singleLeadData.remarks,
      lead_validated_date: this.singleLeadData?.lead_validated_date,
      validated_by: this.singleLeadData?.validated_by,
      lead_validate_remarks: this.singleLeadData?.lead_validate_remarks,
      industry: this.singleLeadData?.industry,
      customer_category: this.singleLeadData?.customer_category,
      employee_count: this.singleLeadData.employee_count,
      company_remarks: this.singleLeadData?.company_remarks,
      gst_applicable: this.singleLeadData?.gst_applicable,
      gst_number: this.singleLeadData?.gst_number,
      pan_number: this.singleLeadData?.pan_number,
      tan_number: this.singleLeadData?.tan_number,
      segment_name: this.singleLeadData?.segment_name,
      certificate_type_name: this.singleLeadData?.certificate_type_name,

    })
  }

  getStandardProgram() {
    this.configService.getProducts(this.singleLeadData.certificate_type).subscribe((res: any) => {
      this.standardList = res.data;
      console.log(this.standardList);

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
    let val = this.contactForm.value;
    // console.log(res,"kjkjkj");
    console.log(this.br, "kjkjkj");
    if (this.contactForm.invalid) {
      this.toast.error(
        'Required fields should not be empty.',
        'Error Occurred!'
      );
      return;
    }
    let data = {
      contact_name: val.contact_name,
      contact_number: val.contact_number,
      contact_email: val.contact_email,
      contact_department: val.contact_department,
      contact_set_primary: this.primary,
      contact_primary: val.contact_primary,

    }
    this.leadService.editChildLead(this.child_id, data).subscribe((res: any) => {
      this.toast.success(res.message)
      this.leadService.getLeadDataby_BR(this.br).subscribe((res: any) => {
        this.getBR_Data = res.result;
        this.addContact = false;
        console.log(this.getBR_Data, "br check");
      },(err:any)=>{
        this.toast.error(err.error.message);
      })
    },(err:any)=>{
      this.toast.error(err.error.message);
    })
    this.addContact = false

  }
  submitFormChild() {
    let val = this.contactForm.value;

    if (this.contactForm.invalid) {
      this.toast.error(
        'Required fields should not be empty.',
        'Error Occurred!'
      );
      return;
    }

    let data = {
      contact_name: val.contact_name,
      contact_number: val.contact_number,
      contact_email: val.contact_email,
      contact_department: val.contact_department,
      contact_set_primary: this.primary,
      contact_primary: val.contact_primary
    }


    this.leadService.editChildLead(this.childId, data).subscribe((res: any) => {
      this.getContactNew();
      this.addChileContact = false;
    })

  }

  addContacts() {


  }
  setAsPrimary(e: any) {
    console.log(e.target.checked, "set as primary");
    if (e.target.checked == true) {
      this.primary = "primary"

    }
    else {
      this.primary = null
    }

  }

  getAllContactSource() {
    this.leadService.get_contact().subscribe((res: any) => {
      if (res && res.data) {
        this.allContactSourceData = res.data
      }
    })
  }

  patchContactSource(id: any) {
    if (this.allContactSourceData.length > 0) {
      for (const element of this.allContactSourceData) {
        if (element.contact_source_id == id) {
          return element.contact_source_name;
        }
      }
    }
    return null;

  }



  onKeyPress(event: KeyboardEvent) {
    // Check if the pressed key is a number (0-9)
    if (/[0-9]/.test(event.key)) {
      event.preventDefault(); // Prevent the keypress event
    }
  }

  editCompany() {
    this.leadService.getByIdLead(this.lead_id).subscribe((res: any) => {
      this.updateData = res.data;
      this.openCutome = true
      this.patchCustomerData();
    });
  }
  patchCustomerData() {
    this.customerDetailsForm.patchValue({
      associated_company: this.updateData?.associated_company,
      segment: this.updateData?.segment,
      certificate_type: this.updateData?.certificate_type_name,
      employee_count: this.updateData?.employee_count,
      website_url: this.updateData?.website_url,
      br_number: this.updateData?.br_number,
      phone_number: this.updateData?.phone_number,
      industry_sector: this.updateData?.industry_sector,
      customer_category: this.updateData?.customer_category,
      phone_code: this.singleLeadData?.userrespectiveleads[0]?.phone_code
    })
  }

  countryfilter(e:any){
    const aa = e
    let filteredVariable = this.countryVar2.filter((item: any) => aa.includes(item.countryss_name));
    this.countryList = filteredVariable
  }
  

  updateCustomer() {
    console.log('hii');
    
    const val = this.customerDetailsForm.value;

    let data={
      associated_company:val.associated_company,
      segment:val.segment,
      certificate_type: this.singleLeadData?.certificate_type,
      employee_count:val.employee_count,
      website_url:val.website_url,
      br_number:val.br_number,
      phone_number:val.phone_number,
      industry_sector:val.industry_sector,
      customer_category :val.customer_category,
      phone_code: val.phone_code
    }
    this.leadService.editLead(this.lead_id, data).subscribe((res: any) => {

      this.getContactTable()
      this.openCutome = false
      this.toast.success("Account Updated Successfully..")
      // this.route.navigate(['master/lead/lead-management/generate-lead']);
    })
  }

  cancel(){
    this.openCutome = false
  }

  getAllSegment() {
    this.configService.getAllSegment().subscribe((res: any) => {
      this.segmentList = res.data;

    });
  }
  segmentSelectChange(e: any) {
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

  }
  getAllIndustry() {
    this.configService.listIndustry().subscribe((res: any) => {
      this.industryList = res.data;

    });
  }
  getBuisnessHead(e: any) {

  }

  getCountryID(e: any) {

    this.leadService.getStateByID(e.value).subscribe((res: any) => {

      this.stateList = res.data;
      this.stateVar = this.stateList.map((res: any) => res.states_name);
      this.stateVar2 = this.stateList; 
    });
    this.addressForm.get('city')?.reset()

  }

  getCountry() {
    this.configService.getCountry().subscribe((res: any) => {
      this.countryList = res.data;
      this.countryVar = this.countryList.map((res: any) => res.countryss_name);
      this.countryVar2 = this.countryList;
    });
  }

  stateFilter(e:any){
    const aa = e
    let filteredVariable = this.stateVar2.filter((item: any) => aa.includes(item.states_name));
    this.stateList = filteredVariable
  }

  getStateID(e: any) {
    this.leadService.getCityByID(e.value).subscribe((res: any) => {
    this.cityList = res.data;
    this.cityVar = this.cityList.map((res: any) => res.city_name);
    this.cityVar2 = this.cityList;
    console.log(this.cityList);
    });
  }

  cityFilter(e:any){
    const aa = e
    let filteredVariable = this.cityVar2.filter((item: any) => aa.includes(item.city_name));
    this.cityList = filteredVariable
  }



  editAdress() {
    this.leadService.getByIdLead(this.lead_id).subscribe((res: any) => {
      this.updateDataAdres = res.data;
      console.log(this.updateDataAdres,'updateDataAdres');
      console.log(this.updateDataAdres?.state,'this.updateDataAdres?.state');
      console.log(this.updateDataAdres?.city,'this.updateDataAdres?.city');
      
      this.openAdress = true;

      this.patchAdreessData();
    });

  }
  patchAdreessData() {
    this.addressForm.patchValue({
      country: this.updateDataAdres?.country,
      state: this.updateDataAdres?.state,

      street_address: this.updateDataAdres?.street_address,
      address2: this.updateDataAdres?.address2,
      region: this.updateDataAdres?.region_name,
      postal_code: this.updateDataAdres?.postal_code,
      city: this.updateDataAdres?.city,
    })
   
      this.leadService.getStateByID(this.updateDataAdres?.country).subscribe((res: any) => {
        this.stateList = res.data;
        // this.patchCountryCode(this.updateDataAdres?.country)
      });
    

      this.leadService.getCityByID(this.updateDataAdres?.state).subscribe((res: any) => {

        this.cityList = res.data;
      });
    
  }

  cancelAdress(){
    this.openAdress = false;
  }

  updateAdress() {
    const val = this.addressForm.value;
  let data={
       street_address:val.street_address,
       address2:val.address2,
       region:this.singleLeadData.region,
       postal_code:val.postal_code,
       city:val.city,
       state:val.state,
       country:val.country,
}

    this.leadService.editLead(this.lead_id, data).subscribe((res: any) => {
      this.getContactTable()
      this.openAdress = false;
      this.toast.success("Account Updated Successfully..")
      // this.route.navigate(['master/lead/lead-management/generate-lead']);
    })

  }

  get_cp_contact() {
    this.leadService.get_contact().subscribe(
      (res: any) => {
        this.contact_list = res.data;

      }, (err) => {

      }
    )
  };

  editLeadSource() {
      this.leadService.getByIdLead(this.lead_id).subscribe((res: any) => {
      this.updateDataLead = res.data;
      this.openLeadSource = !this.openLeadSource;
      this.patchLeadSourceData();
    });
  }
  patchLeadSourceData() {
    this.leadSourceForm.patchValue({
      dqs_contact_source: Number(this.updateDataLead?.dqs_contact_source),
      city: this.updateDataLead?.city_name,
      lead_created_by_name: this.updateDataLead?.lead_created_by_name,
      lead_created_date: this.updateDataLead?.lead_created_date
    })
  }

  canselLead(){
    this.openLeadSource = !this.openLeadSource;
  }

  updateLeadSource() {
    const val = this.leadSourceForm.value;
    let data={
      dqs_contact_source:val.dqs_contact_source,
      city:this.singleLeadData.city,
      lead_created_by_name:val.lead_created_by_name,
      lead_created_date:val.lead_created_date,
    }
    this.leadService.editLead(this.lead_id, data).subscribe((res: any) => {
     this.getContactTable()
     this.openLeadSource = !this.openLeadSource;
     this.toast.success("Account Updated Successfully..")
      // this.route.navigate(['master/lead/lead-management/generate-lead']);
    })
  }
}
