import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators, FormArray } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { GridApi, GridReadyEvent } from 'ag-grid-community';
import { ToastrService } from 'ngx-toastr';
import { AdminSupportService } from 'src/app/@shared/services/admin-support.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-rental-agree',
  templateUrl: './create-rental-agree.component.html',
  styleUrls: ['./create-rental-agree.component.scss']
})
export class CreateRentalAgreeComponent {
  rowClass: any;
  private gridApi!: GridApi<any>;
  create_amc_Form:FormGroup;
  inward_id: any;
  id: any;
  public dis=[
    {id:1, name:'12 months agreement'}
  ]
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
  single_amc: any;


  constructor(
   private route: Router,
   private fb :FormBuilder,
   private toast: ToastrService,
   private activeroute: ActivatedRoute,
   private adminService: AdminSupportService
   ) {
   this.rowClass = 'rowClass';

   this.create_amc_Form = this.fb.group({
    name_of_the_Agreement: new FormControl('RENTAL',[Validators.required]),
    request_initiated_date :  new FormControl(null,[Validators.required]),
    vendor_name :  new FormControl(null,[Validators.required]),
    tenant_name:  new FormControl(null,[Validators.required]),
    location:  new FormControl(null,[Validators.required]),
    agreement_from_date: new FormControl(null,[Validators.required]),
    agreement_to_date:  new FormControl(null,[Validators.required]),
    no_of_years:  new FormControl(null,[Validators.required]),
    increment_yearly:  new FormControl(null,[Validators.required]),
    amount:  new FormControl(null,[Validators.required]),
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
    rental_status:  new FormControl(null,[Validators.required]),
    termination_date:  new FormControl(null),
    terminate_copy_upload:  new FormControl(null,[Validators.required]),
   })

 }


 ngOnInit(): void {
  this.activeroute.queryParams.subscribe((params: any) => {
    this.id = params;
    this.id =  params.id; 
  });

  this.adminService.get_ById_Rental_Agreement(this.id).subscribe((res:any)=>{
    this.single_amc = res.data;
    this.create_amc_Form.patchValue({
      name_of_the_Agreement: this.single_amc.name_of_the_Agreement,
      request_initiated_date :  this.single_amc.request_initiated_date,
      vendor_name :  this.single_amc.vendor_name,
      tenant_name:  this.single_amc.tenant_name,
      location:  this.single_amc.location,
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
      rental_status:  this.single_amc.rental_status,
      termination_date: this.single_amc.termination_date,
      terminate_copy_upload:  this.single_amc.terminate_copy_upload,
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

    formData.append('tenant_name',  val.tenant_name);
    formData.append('location',  val.location);
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
    formData.append('rental_status',  val.rental_status);
    if(val.termination_date){
      formData.append('termination_date',  val.termination_date);
    }
    formData.append('terminate_copy_upload',  this.imageTermToUpload);
    this.adminService.creatRental(formData).subscribe((res:any)=>{
      if(res.code ==200){
         this.toast.success(res.message)
         this.res_id = res.data.rental_aggrement_id;
      }
    })
  }

  updateAmc(){
    let val =this.create_amc_Form.value;
    console.log('val',val);
    var formData: any = new FormData();
    formData.append('name_of_the_Agreement', val.name_of_the_Agreement);
    formData.append('request_initiated_date', val.request_initiated_date);
    formData.append('vendor_name', val.vendor_name);

    formData.append('tenant_name',  val.tenant_name);
    formData.append('location',  val.location);
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
    formData.append('rental_status',  val.rental_status);
    if(val.termination_date){
      formData.append('termination_date',  val.termination_date);
    }

    formData.append('terminate_copy_upload',  this.imageTermToUpload);
    this.adminService.updateRental(this.id, formData).subscribe((res:any)=>{
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

      this.adminService.edit_Rental(this.res_id || this.id, formData).subscribe((res:any)=>{
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
    this.route.navigate(['/master/admin-support/rental-agreement/rental-agreement-list'])
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

}
