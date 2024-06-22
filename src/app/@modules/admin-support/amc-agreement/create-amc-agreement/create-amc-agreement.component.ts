import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators, FormArray } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { GridApi, GridReadyEvent } from 'ag-grid-community';
import { ToastrService } from 'ngx-toastr';
import { AdminSupportService } from 'src/app/@shared/services/admin-support.service';
import { ConfigurationalmasterService } from 'src/app/@shared/services/configurationalmaster.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-amc-agreement',
  templateUrl: './create-amc-agreement.component.html',
  styleUrls: ['./create-amc-agreement.component.scss']
})
export class CreateAmcAgreementComponent {
  rowClass: any;
  private gridApi!: GridApi<any>;
  create_amc_Form:FormGroup;
  inward_id: any;
  id: any;
  public dis=[
    {id:1, name:'Pest Control'}
  ]
  public status=[
    {id:1, name:'Open'},
    {id:2, name:'Closed'},        
    {id:3, name:'Rejected'},
    {id:4, name:'In Progress'},
    {id:5, name:'Termination'},
    {id:6, name:'Request for Review'},
    {id:7, name:'Approved'},
    {id:8, name:'Reviewed'}
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
  single_amc: any;
  amc_des: any;
  emp_id: any;


  constructor(
   private route: Router,
   private fb :FormBuilder,
   private toast: ToastrService,
   private activeroute: ActivatedRoute,
   private adminService: AdminSupportService,
   private _configurationalmasterService: ConfigurationalmasterService,
   ) {
   this.rowClass = 'rowClass';

   this.create_amc_Form = this.fb.group({
    name_of_agreement: new FormControl('AMC',[Validators.required]),
    request_initiated_date :  new FormControl(null,[Validators.required]),
    description_of_amc:  new FormControl(null,[Validators.required]),
    agreement_from_date: new FormControl(null,[Validators.required]),
    agreement_to_date:  new FormControl(null,[Validators.required]),
    no_of_years:  new FormControl(null,[Validators.required]),
    increment_yearly:  new FormControl(null,[Validators.required]),
    amount:  new FormControl(null,[Validators.required]),
    tax:  new FormControl(0,[Validators.required]),
    total_amount:  new FormControl(null,[Validators.required]),
    first_party:  new FormControl(null,[Validators.required]),
    second_party:  new FormControl(null,[Validators.required]),
    third_party:  new FormControl(null,[Validators.required]),
    fourth_party:  new FormControl(null,[Validators.required]),

    first_reminder:  new FormControl(null,[Validators.required]),
    second_reminder:  new FormControl(null,[Validators.required]),
    third_reminder:  new FormControl(null,[Validators.required]),
    upload_agreement: new FormArray([
      new FormGroup({
        upload_agreement_copy: new FormControl(null),
        file_name: new FormControl(null),
      })
    ]),
    ams_status:  new FormControl(null,[Validators.required]),
    termination_date:  new FormControl(null),
    terminate_copy_upload:  new FormControl(null),
    notice_period: new FormControl(null,[Validators.required]),
    Customer_Status: new FormControl(null,[Validators.required]),
    Remarks: new FormControl(null),
   })

 }


 ngOnInit(): void {
  this.activeroute.queryParams.subscribe((params: any) => {
    this.id = params;
    this.id =  params.id; 
  });

  let loginUser: any = localStorage.getItem('signInUser');
  this.emp_id = JSON.parse(loginUser).employee_id;

  this.adminService.get_ById_AMC_Agreement(this.id).subscribe((res:any)=>{
    this.single_amc = res.data;
    this.create_amc_Form.patchValue({
      name_of_agreement: this.single_amc.name_of_agreement,
      request_initiated_date :  this.single_amc.request_initiated_date,
      description_of_amc:  this.single_amc.description_of_amc,
      agreement_from_date: this.single_amc.agreement_from_date,
      agreement_to_date:  this.single_amc.agreement_to_date,
      no_of_years:  this.single_amc.no_of_years,
      increment_yearly:  this.single_amc.increment_yearly,
      amount:  this.single_amc.amount,
      tax:  this.single_amc.tax,
      total_amount:  this.single_amc.total_amount,
      first_reminder:  this.single_amc.first_reminder,
      second_reminder:  this.single_amc.second_reminder,
      third_reminder:  this.single_amc.third_reminder,
      ams_status:  this.single_amc.ams_status,
      termination_date: this.single_amc.termination_date,
      terminate_copy_upload:  this.single_amc.terminate_copy_upload,
      notice_period:  this.single_amc.notice_period,
      first_party:  this.single_amc.first_party,
      second_party:  this.single_amc.second_party,
      third_party: this.single_amc.third_party, 
      fourth_party:  this.single_amc.fourth_party,
      Customer_Status:  this.single_amc.Customer_Status,
      Remarks:  this.single_amc.Remarks,
    })
  })

  this._configurationalmasterService.getAllAmcDes().subscribe((res:any)=>{
    this.amc_des = res.data;
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
    formData.append('name_of_agreement', val.name_of_agreement);
    formData.append('request_initiated_date', val.request_initiated_date);
  
    formData.append('description_of_amc',  val.description_of_amc);
    formData.append('agreement_from_date', val.agreement_from_date);
    formData.append('agreement_to_date', val.agreement_to_date);
    formData.append('no_of_years', val.no_of_years);
    formData.append('increment_yearly', val.increment_yearly); 
    formData.append('amount', val.amount); 
    formData.append('tax', val.tax);  

    formData.append('total_amount',  val.total_amount);
    formData.append('first_reminder',  val.first_reminder);
    formData.append('second_reminder', val.second_reminder);

    formData.append('third_reminder', val.third_reminder);

    formData.append('first_party',  val.first_party);
    formData.append('second_party', val.second_party);

    formData.append('third_party', val.third_party);
    formData.append('fourth_party', val.fourth_party);
    formData.append('Customer_Status', val.Customer_Status);
    formData.append('Remarks', val.Remarks);
    formData.append('notice_period', val.notice_period);



    formData.append('ams_status',  val.ams_status);
    formData.append('termination_date',  val.termination_date);
    formData.append('terminate_copy_upload',  this.imageTermToUpload);
    this.adminService.creatAmc(this.emp_id,formData).subscribe((res:any)=>{
      if(res.code ==200){
         this.toast.success(res.message)
         this.res_id = res.data.amc_agreement_id;
      }
    },(err:any)=>{
      this.toast.warning(err.error.message);
      
    })
  }

  updateAmc(){
    let val =this.create_amc_Form.value;
    console.log('val',val);
    var formData: any = new FormData();
    formData.append('name_of_agreement', val.name_of_agreement);
    formData.append('request_initiated_date', val.request_initiated_date);
  
    formData.append('description_of_amc',  val.description_of_amc);
    formData.append('agreement_from_date', val.agreement_from_date);
    formData.append('agreement_to_date', val.agreement_to_date);
    formData.append('no_of_years', val.no_of_years);
    formData.append('increment_yearly', val.increment_yearly); 
    formData.append('amount', val.amount); 
    formData.append('tax', val.tax);  

    formData.append('total_amount',  val.total_amount);
    formData.append('first_reminder',  val.first_reminder);
    formData.append('second_reminder', val.second_reminder);

    formData.append('third_reminder', val.third_reminder);

    formData.append('first_party',  val.first_party);
    formData.append('second_party', val.second_party);

    formData.append('third_party', val.third_party);
    formData.append('fourth_party', val.fourth_party);
    formData.append('Customer_Status', val.Customer_Status);
    formData.append('Remarks', val.Remarks);
    formData.append('notice_period', val.notice_period);

    formData.append('ams_status',  val.ams_status);
    formData.append('termination_date',  val.termination_date);
    formData.append('terminate_copy_upload',  this.imageTermToUpload);
    this.adminService.edit_amcupdate(this.id, formData).subscribe((res:any)=>{
      if(res.code ==200){
         this.toast.success(res.message)
      }
    })
  }

  uploadOtherDoc(i: any, control: any) {
    this.curentIndex = i;
    if(!this.res_id && !this.id){
      this.toast.error("Please create AMC first")
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
      const data: any = {
        file_name: control.value.file_name,
        upload_agreement_copy:file.filePath,
      };
      let filePath:File = file.filePath;
      const formData: any = new FormData();
      formData.append('file_name', control.value.file_name );
      formData.append('upload_agreement_copy', filePath ,filePath.name);

      this.adminService.update(this.res_id || this.id, formData).subscribe((res:any)=>{
        console.log("response",res)
        if(res.code ==200){
          this.toast.success(res.message)
        }
      })
    }
  };

  createSucces(){
    if(!this.res_id && !this.id){
      this.toast.error('Please create AMC first');
      return
    }
    this.toast.success('Amc Created Successfully');
    this.route.navigate(['/master/admin-support/amc-agreement/amc-agreement-list'])
  }

  changeStatus(e:any){
    if(e.value == 'Termination'){
      this.t_date = true;
    }else{
      this.t_date = false;
    }
  }

  fileData:any=[];
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

totalAmount(){
  let val = this.CF_1.amount.value/100*this.CF_1.tax.value;
  let totalAmount =  this.CF_1.amount.value + val;
  this.CF_1.total_amount.setValue(totalAmount);
}

}
