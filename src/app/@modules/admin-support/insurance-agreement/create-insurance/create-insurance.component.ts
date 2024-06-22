import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators, FormArray } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { GridApi, GridReadyEvent } from 'ag-grid-community';
import { ToastrService } from 'ngx-toastr';
import { AdminSupportService } from 'src/app/@shared/services/admin-support.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-insurance',
  templateUrl: './create-insurance.component.html',
  styleUrls: ['./create-insurance.component.scss']
})
export class CreateInsuranceComponent {
  rowClass: any;
  private gridApi!: GridApi<any>;
  create_amc_Form:FormGroup;
  inward_id: any;
  id: any;
  public status=[
    {id:1, name:'Open'},
    {id:2, name:'Closed'},
    {id:3, name:'Rejected'},
    {id:4, name:'In Progress'},
    {id:5, name:'Termination'},
  ]
  t_date: boolean= false;
  imageToUpload:any;
  imagePath: any;
  singleData:any;
  curentIndex: any;
  FilePaths: any = [];
  termimagePath: any;
  imageTermToUpload:any;
  res_id: any;
  fileData: any=[];
  single_data: any;


  constructor(
   private route: Router,
   private fb :FormBuilder,
   private toast: ToastrService,
   private activeroute: ActivatedRoute,
   private adminService: AdminSupportService
   ) {
   this.rowClass = 'rowClass';

   this.create_amc_Form = this.fb.group({
    name_of_the_Agreement: new FormControl(null,[Validators.required]),
    request_initiated_date :  new FormControl(null,[Validators.required]),
    vendor_name :  new FormControl(null,[Validators.required]),
    policy_holder_name:  new FormControl(null,[Validators.required]),
    insurance_company_name:  new FormControl(null,[Validators.required]),
    policy_name:  new FormControl(null,[Validators.required]),
    policy_number:  new FormControl(null,[Validators.required]),
    count_of_employees_covered: new FormControl(null,[Validators.required]),
    total_sum_assured:  new FormControl(null,[Validators.required]),
    third_party_assistant:  new FormControl(null,[Validators.required]),
    PTDA_individual:  new FormControl(null,[Validators.required]),
    ctc:  new FormControl(null,[Validators.required]),
    description_of_agreement:  new FormControl(null),
    policy_from_date: new FormControl(null,[Validators.required]),
    policy_to_date:  new FormControl(null,[Validators.required]),
    no_of_years:  new FormControl(null,[Validators.required]),
    increment_yearly:  new FormControl(null,[Validators.required]),
    policy_amount:  new FormControl(null,[Validators.required]),
    tax:  new FormControl(null,[Validators.required]),
    total_amount:  new FormControl(null,[Validators.required]),
    first_reminder:  new FormControl(null,[Validators.required]),
    second_reminder:  new FormControl(null,[Validators.required]),
    third_reminder:  new FormControl(null,[Validators.required]),
    upload_agreement: new FormArray([
      new FormGroup({
        upload_agreement_copy: new FormControl(null),
        file_name: new FormControl(null),
      })
    ]),
    policy_status:  new FormControl(null,[Validators.required]),
    termination_date:  new FormControl(null),
    terminate_copy_upload:  new FormControl(null,[Validators.required]),
   })

 }


 ngOnInit(): void {
  this.activeroute.queryParams.subscribe((params: any) => {
    this.id = params.id; 
  });

  this.adminService.get_ById_ins(this.id).subscribe((res:any)=>{
    this.single_data = res.data;
    this.create_amc_Form.patchValue({
      name_of_the_Agreement: this.single_data.name_of_the_Agreement,
      request_initiated_date :  this.single_data.request_initiated_date,
      vendor_name :  this.single_data.vendor_name,
      policy_holder_name:  this.single_data.policy_holder_name,
      insurance_company_name:  this.single_data.insurance_company_name,
      policy_name:  this.single_data.policy_name,
      policy_number:  this.single_data.policy_number,
      count_of_employees_covered: this.single_data.count_of_employees_covered,
      total_sum_assured:  this.single_data.total_sum_assured,
      third_party_assistant:  this.single_data.third_party_assistant,
      PTDA_individual:  this.single_data.name_of_the_Agreement,
      ctc:  this.single_data.name_of_the_Agreement,
      description_of_agreement:  this.single_data.name_of_the_Agreement,
      policy_from_date: this.single_data.policy_from_date,
      policy_to_date:  this.single_data.policy_to_date,
      no_of_years:  this.single_data.no_of_years,
      increment_yearly: this.single_data.increment_yearly, 
      policy_amount:  this.single_data.policy_amount,
      tax:  this.single_data.tax,
      total_amount:  this.single_data.total_amount,
      first_reminder: this.single_data.first_reminder, 
      second_reminder:this.single_data.second_reminder,  
      third_reminder: this.single_data.third_reminder, 
      policy_status:this.single_data.policy_status,  
      termination_date:this.single_data.termination_date,
    })
  })
}



  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;
    
  }


  onPageSizeChanged() {
    var value = (document.getElementById('page-size') as HTMLInputElement)
      .value;
    this.gridApi.paginationSetPageSize(Number(value));
  }

  onFilterTextBoxChanged() {
    this.gridApi.setQuickFilter(
      (document.getElementById('filter-text-box') as HTMLInputElement).value
    );
  }

  reloadCurrentRoute() {
    let currentUrl = this.route.url;
    this.route.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.route.navigate([currentUrl]);
    });
  }

  createAmc(){
    if (this.create_amc_Form.invalid) {
      this.toast.error('Required fields should not be empty', 'Fields Error');
      return;
    }

    let val =this.create_amc_Form.value;
    console.log('val',val);
    var formData: any = new FormData();
    formData.append('name_of_the_Agreement', val.name_of_the_Agreement);
    formData.append('request_initiated_date', val.request_initiated_date);
    formData.append('vendor_name', val.vendor_name);
    formData.append('policy_holder_name', val.policy_holder_name);
    formData.append('insurance_company_name',  val.insurance_company_name);
    formData.append('policy_name',  val.policy_name);
    formData.append('policy_number',  val.policy_number);
    formData.append('policy_from_date',  val.policy_from_date);
    formData.append('policy_to_date',  val.policy_to_date);
    formData.append('count_of_employees_covered',  val.count_of_employees_covered);
    formData.append('total_sum_assured',  val.total_sum_assured);
    formData.append('PTDA_individual',  val.PTDA_individual);
    formData.append('ctc',  val.ctc);
    formData.append('third_party_assistant',  val.third_party_assistant);
    formData.append('description_of_agreement',  val.description_of_agreement);
    formData.append('agreement_from_date', val.agreement_from_date);
    formData.append('agreement_to_date', val.agreement_to_date);
    formData.append('no_of_years', val.no_of_years);
    formData.append('increment_yearly', val.increment_yearly); 
    formData.append('policy_amount', val.policy_amount); 
    formData.append('tax', val.tax);  

    formData.append('total_amount',  val.total_amount);
    formData.append('first_reminder',  val.first_reminder);
    formData.append('second_reminder', val.second_reminder);

    formData.append('third_reminder', val.third_reminder);
    formData.append('policy_status',  val.policy_status);
    formData.append('termination_date',  val.termination_date);
    formData.append('terminate_copy_upload',  this.imageTermToUpload);
    this.adminService.creat_in(formData).subscribe((res:any)=>{
      if(res.code ==200){
         this.toast.success(res.message)
         this.res_id = res.data.insurance_id;
         console.log('id',this.res_id);
         
      }
    })
  }

  upadeInsurance(){
    let val =this.create_amc_Form.value;
    console.log('val',val);
    var formData: any = new FormData();
    formData.append('name_of_the_Agreement', val.name_of_the_Agreement);
    formData.append('request_initiated_date', val.request_initiated_date);
    formData.append('vendor_name', val.vendor_name);
    formData.append('policy_holder_name', val.policy_holder_name);
    formData.append('insurance_company_name',  val.insurance_company_name);
    formData.append('policy_name',  val.policy_name);
    formData.append('policy_number',  val.policy_number);
    formData.append('policy_from_date',  val.policy_from_date);
    formData.append('policy_to_date',  val.policy_to_date);
    formData.append('count_of_employees_covered',  val.count_of_employees_covered);
    formData.append('total_sum_assured',  val.total_sum_assured);
    formData.append('PTDA_individual',  val.PTDA_individual);
    formData.append('ctc',  val.ctc);
    formData.append('third_party_assistant',  val.third_party_assistant);
    formData.append('description_of_agreement',  val.description_of_agreement);
    formData.append('agreement_from_date', val.agreement_from_date);
    formData.append('agreement_to_date', val.agreement_to_date);
    formData.append('no_of_years', val.no_of_years);
    formData.append('increment_yearly', val.increment_yearly); 
    formData.append('policy_amount', val.policy_amount); 
    formData.append('tax', val.tax);  

    formData.append('total_amount',  val.total_amount);
    formData.append('first_reminder',  val.first_reminder);
    formData.append('second_reminder', val.second_reminder);

    formData.append('third_reminder', val.third_reminder);
    formData.append('policy_status',  val.policy_status);
    formData.append('termination_date',  val.termination_date);
    formData.append('terminate_copy_upload',  this.imageTermToUpload);
    this.adminService.update_ins(this.id,formData).subscribe((res:any)=>{
      if(res.code ==200){
         this.toast.success(res.message)
         console.log('id',this.id); 
      }
    })
  }

  uploadOtherDoc(i: any, control: any) {
    this.curentIndex = i;
    if(!this.res_id && !this.id){
      this.toast.error("Please create Insurance first")
      return
    }
    if (control.value.file_name === null && control.value.upload_agreement_copy === null) {
      this.toast.error('Fields should not be blank');
      return;
    };

    if (control.value.upload_agreement_copy === null) {
      this.toast.error('if you want to update', 'Select file');
      return;
    };

    let file: any = this.fileData.find((e: any) => e.index === i);
    if (file) {
      let filePath:File = file.filePath;
      const formData: any = new FormData();
      formData.append('file_name', control.value.file_name );
      formData.append('upload_agreement_copy',filePath, filePath.name);
      this.adminService.edit_ins_doc(this.res_id || this.id, formData).subscribe((res:any)=>{
        console.log("response",res)
        if(res.code ==200){
          this.toast.success(res.message)
        }
      })
    }
    // 
  };


  changeStatus(e:any){
    if(e.value == 'Termination'){
      this.t_date = true;
    }else{
      this.t_date = false;
    }
  }

  onChange(e: any,i:any) {
    if (e.target.files && e.target.files[0]) {
      const data: FileList = e.target.files;
      this.imageToUpload = data.item(0) || null;
      this.fileData.push({index:i, filePath:this.imageToUpload})
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imagePath = e.target.result;
        
        
      };
       reader.readAsDataURL(this.imageToUpload);
    }
    console.log(this.fileData);
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

  onTermChange(e: any) {
    if (e.target.files && e.target.files[0]) {
      const data: FileList = e.target.files;
      this.imageTermToUpload = data.item(0) || null;
  
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.termimagePath = e.target.result;
        
        
      };
       reader.readAsDataURL(this.imageTermToUpload);
    }
    
  }

  
  seeTermPreview(path: string, imagePath: any) {
    if (!this.termimagePath) {
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

   get CF_1(): any {
  return this.create_amc_Form.controls;
}

addrow(){
  <FormArray>this.CF_1.upload_agreement.push(
    new FormGroup({
      upload_agreement_copy: new FormControl(null),
      file_name: new FormControl(null),
    })
  );
}

deleteRow(i: any, control: any,){
  if (this.CF_1.upload_agreement.length > 1) {
    
      this.CF_1.upload_agreement.removeAt(i);
  } else {
    this.toast.error("Can't Deleted", "must be one");
  }
}

createSucces(){
  if(!this.res_id && !this.id){
    this.toast.error('Please create Insurance first');
    return
  }
  this.toast.success('Insurance Save Successfully');
  this.route.navigate(['/master/admin-support/insurance-agreement/insurance-agreement-list'])
}
}
