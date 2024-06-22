import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { GridApi, GridReadyEvent } from 'ag-grid-community';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { AdminSupportService } from 'src/app/@shared/services/admin-support.service';
import { ConfigurationalmasterService } from 'src/app/@shared/services/configurationalmaster.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-outward',
  templateUrl: './create-outward.component.html',
  styleUrls: ['./create-outward.component.scss']
})
export class CreateOutwardComponent {
  rowClass: any;
  private gridApi!: GridApi<any>;
  create_outward_Form:FormGroup;
  inward_id: any;
  id: any;
  public status=[
    {id:1, name:'Dispatched'},
    {id:2, name:'Delivered'},
    {id:3, name:'Returned'},
    {id:4, name:'Closed'},
    {id:5, name:'Rejected'}
  ]
  remaks: boolean= false;
  imageToUpload:any;
  imagePath: any;
  singleData:any;
  outwardData: any;
  empdata: any;
  user_id: any;
  empDetails: any;
  serviceData: any;
  containsData: any;


  constructor(
   private route: Router,
   private fb :FormBuilder,
   private toast: ToastrService,
   private activeroute: ActivatedRoute,
   private adminService: AdminSupportService,
   private _configurationalMasterService: ConfigurationalmasterService,

   ) {
   this.rowClass = 'rowClass';

   this.create_outward_Form = this.fb.group({
    emp_id:  new FormControl(null),
    from_whom: new FormControl(null,[Validators.required]),
    department: new FormControl(null,[Validators.required]),
    employee_mail_id: new FormControl(null,[Validators.required]),
    courier_outward_type:  new FormControl(null,[Validators.required]),
    received_date :  new FormControl(null,[Validators.required]),
    received_By :  new FormControl(null,[Validators.required]),
    courier_contain:  new FormControl(null,[Validators.required]),
    document_type:  new FormControl(null,[Validators.required]),
    courier_service_name:  new FormControl(null,[Validators.required]),
    consignment_number:  new FormControl(null,[Validators.required]),

    client_name_to_dispatch:  new FormControl(null,[Validators.required]),
    client_address_to_dispatch:  new FormControl(null,[Validators.required]),
    Receiver_contact_number:  new FormControl(null,[Validators.required]),

    dispatched_by:  new FormControl(null,[Validators.required]),
    dispatched_date:  new FormControl(null,[Validators.required]),
    date_of_delivery:   new FormControl(null),

    proof_of_delivery:  new FormControl(null),
    outward_status:  new FormControl(null,[Validators.required]),
    remarks:  new FormControl(null),
   })

 }

 ngOnInit(): void {
  this.activeroute.queryParams.subscribe((params: any) => {
    this.id = params;
    this.inward_id = params.id; 
  });

  let lg: any = localStorage.getItem('signInUser');
  let loginUser = JSON.parse(lg);
  console.log('loginUser', loginUser);
  this.user_id = loginUser.employee_id;

  this.adminService.single_outward(this.inward_id,this.user_id ).subscribe((res:any)=>{
    this.outwardData =res.data;
    if(this.outwardData.outward_status == 'Rejected'){
      this.remaks = true;
    }
    this.create_outward_Form.patchValue({
      from_whom: this.outwardData.from_whom,
      department:this.outwardData.department,
      employee_mail_id:this.outwardData.employee_mail_id,
      courier_outward_type:this.outwardData.courier_outward_type,
      received_date :  this.outwardData.received_date,
      received_By :  this.outwardData.received_By,
  
      client_name_to_dispatch:  this.outwardData.client_name_to_dispatch,
      client_address_to_dispatch:  this.outwardData.client_address_to_dispatch,
      Receiver_contact_number:  this.outwardData.Receiver_contact_number,
      courier_contain:  this.outwardData.courier_contain,
      document_type:this.outwardData?.document_type,
      courier_service_name:  this.outwardData.courier_service_name,
      consignment_number:  this.outwardData.consignment_number,
  
      dispatched_by:  this.outwardData.dispatched_by,
      dispatched_date:  this.outwardData.dispatched_date,
      date_of_delivery:  this.outwardData?.date_of_delivery,
      outward_status:  this.outwardData?.outward_status,
      remarks:  this.outwardData.remarks,
    })

    

  })

  

  this.adminService.getAllEmp().subscribe((res: any) => {
    this.empdata = res.data;
  });

  this._configurationalMasterService.getAllCourier().subscribe((res:any)=>{
    this.serviceData = res.data;
  }) 

  this._configurationalMasterService.getAllContains().subscribe((res:any)=>{
    this.containsData = res.data;
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

  createOutward(){

    if (this.create_outward_Form.invalid) {
      this.toast.error('Required fields should not be empty', 'Fields Error');
      return;
    }
   
    let val =this.create_outward_Form.value;

    this.adminService.create_outward(this.user_id,val).subscribe((res:any)=>{
      if(res.code ==200){
        this.route.navigate(["master/admin-support/courier-outward/courier-outward-list"]);
        this.toast.success(res.message)
      }
    },(err) => {
      this.toast.warning(err.error.message);
    })
  }

  changeStatus(e:any){
    if(e.value == 'Rejected'){
      this.remaks = true;
    }else{
      this.remaks = false;
    }
  }

  onChange(e: any) {
    
  
    if (e.target.files && e.target.files[0]) {
      const data: FileList = e.target.files;
      this.imageToUpload = data.item(0) || null;
  
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imagePath = e.target.result;
        
        
      };
       reader.readAsDataURL(this.imageToUpload);
    }
    
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

  edit_Courier_Outward(){
    let val =this.create_outward_Form.value;
    var formData: any = new FormData();
    formData.append('Courier_OutwardId', this.inward_id);
    formData.append('date_of_delivery', moment(val.date_of_delivery).format());
    formData.append('proof_of_delivery', this.imageToUpload);
    formData.append('remarks', val.remarks);
    formData.append('outward_status',  val.outward_status);
    this.adminService.edit_Courier_Outward(this.user_id,formData).subscribe((res:any)=>{
      if(res.code ==200){
        this.route.navigate(["master/admin-support/courier-outward/courier-outward-list"]);
        this.toast.success(res.message)
      }
    },(err) => {
      this.toast.warning(err.error.message);
    })
  }

  onChangeWhom(e:any){
    this.adminService.getByIdEmp(e.value).subscribe((res:any)=>{
      this.empDetails= res.data;
      console.log('empDetails',this.empDetails);
      this.create_outward_Form.patchValue({
        department:this.empDetails.department,
        emp_id:this.empDetails.employee_id,
        from_whom: this.empDetails.fullName,
        employee_mail_id:this.empDetails.employee_official_email,
      })
    })
  }
}
