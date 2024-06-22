import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { GridApi, GridReadyEvent } from 'ag-grid-community';
import { ToastrService } from 'ngx-toastr';
import { HrServiceService } from 'src/app/@shared/services/hr-service.service';
import { VendorManagementService } from 'src/app/@shared/services/vendor-management.service';
import { UploadDocument } from '../upload-document/upload-document';
import Swal from 'sweetalert2';
import * as moment from 'moment';
import { RejectRemarkComponent } from '../reject-remark/reject-remark.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.scss']
})
export class DocumentsComponent {
  rowClass: any;
  private gridApi!: GridApi<any>;
  docForm:FormGroup;
  file: File;id: number;
  vendor_id: any;
  editDocData: any;
  imageToUpload: any;
  imagePath: any;
  vendorName: any;
  status: any;

  constructor(
   private route: Router,
   private vendorService: VendorManagementService,
   private fb:FormBuilder,
   private toast: ToastrService,
   private activeroute: ActivatedRoute,
   public dialog: MatDialog,
   ) {
   this.rowClass = 'rowClass';

   this.docForm = this.fb.group({
    //  vendor_management_id: new FormControl(null),
     document_type: new FormControl(null, [Validators.required]),
     document_name: new FormControl(null, [Validators.required]),
     upload_document: new FormControl(null),
     expiry_date: new FormControl(null, [Validators.required]),
     remarks: new FormControl(null, [Validators.required]),
   })
   this.getAllDocs();
 }

 ngOnInit(): void {
   this.activeroute.queryParams.subscribe((params: any) => {
     this.id = params;
     this.vendor_id = params.vandor_id || params.id;
     this.status= params.status;
     if(this.status){
      this.docForm.controls['document_type'].disable();
      this.docForm.controls['upload_document'].disable();
      this.docForm.controls['expiry_date'].disable();
      this.docForm.controls['remarks'].disable();
     }
   });

   this.vendorService.getVendorById(this.vendor_id).subscribe((res:any)=>{
     this.editDocData= res.data; 
   this.docForm.patchValue({
     document_type: this.editDocData?.document_type,
     expiry_date: this.editDocData?.expiry_date,
     remarks: this.editDocData?.remarks,   
     document_name:this.editDocData?.document_name  
    //  upload_document: this.editDocData?.upload_document,
     
   })
  })

   this.getAllDocs();
   this.getAllVendorName();
 }

  public rowData:any;
  public columnDefs = [
    {
      headerName: 'DOCUMENT TYPE',
      field: 'document_type',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: "grid-cell-centered",
      flex:1,
      minWidth:150,
    },
    {
      headerName: 'DOCUMENT NAME',
      field: 'document_name',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: "grid-cell-centered",
      flex:1,
      minWidth:150,
    },
    {
      headerName: 'UPLOAD DOCUMENT',
      field: 'upload_document',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: "grid-cell-centered",
      valueFormatter: 'JSON.parse(value)',
      flex:1,
      minWidth:150,
      cellRenderer: (params:any) => {
        return `<a href=${params.data.upload_document} target="_blank">See Doc</a>`
      
  },
      
    },
    {
      headerName: 'EXPIRY DATE',
      field: 'expiry_date',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: "grid-cell-centered",
      //valueFormatter: 'JSON.parse(value)',
      flex:1,
      minWidth:150,
      valueFormatter:(params:any)=>{
        return moment(new Date(params.value)).format('LL')
      },
    },
    {
      headerName: 'REMARKS',
      field: 'remarks',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: "grid-cell-centered",
      valueFormatter: 'JSON.parse(value)',
      flex:1,
      minWidth:150,
    },
    
  ];
  bankData: any;

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

  addDoc(path:any){
     this.route.navigate([path]);
  }

  onCancel(path:any){
    this.route.navigate([path])
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
        confirmButtonColor: "#063178",
        confirmButtonText: 'Ok',
      })
    }
  } else {
    Swal.fire({
      imageUrl: imagePath,
      imageHeight: 250,
      imageAlt: 'Profile Image',
      confirmButtonColor: "#063178",
      confirmButtonText: 'Ok',
    })
  }
};

 updateDocument(){
  if (this.docForm.invalid) {
    this.toast.error('Required fields should not be empty', 'Fields Error');
    
    return;
  }
  var formData: any = new FormData();
  formData.append('document_type', this.docForm.value.document_type);
  formData.append('document_name', this.docForm.value.document_name);
  formData.append('expiry_date', this.docForm.value.expiry_date);
  formData.append('remarks', this.docForm.value.remarks);
  formData.append('upload_document',  this.imageToUpload);
  formData.append('document_status',  'verify');
  this.vendorService.updateDocument(this.vendor_id,formData).subscribe((res:any)=>{
    this.bankData = res.data;
    if(res){
      this.toast.success(res.message);
      this.route.navigate(['master/vendor/vendor-list/unapproved-list'])
    }
  })
}

reloadCurrentRoute() {
  let currentUrl = this.route.url;
  this.route.navigateByUrl('/', { skipLocationChange: true }).then(() => {
    this.route.navigate([currentUrl]);
  });
}

addDocs(){
  if (this.docForm.invalid) {
    this.toast.error('Required fields should not be empty', 'Fields Error');
    
    return;
  }
  var formData: any = new FormData();
  // formData.append('vendor_management_id', this.docForm.value.vendor_management_id);
  formData.append('document_type', this.docForm.value.document_type);
  formData.append('document_name', this.docForm.value.document_name);
  formData.append('upload_document',  this.imageToUpload);
  formData.append('expiry_date', this.docForm.value.expiry_date);
  formData.append('remarks', this.docForm.value.remarks);
  this.vendorService.addDocument(formData).subscribe((res:any)=>{
    this.bankData = res.data;
    if (res.code == 200) {
      this.toast.success(res.message);
      this.reloadCurrentRoute();
    }
  }, (err) => {

    if (err.status === 400) {
      
      this.toast.error(err.error.message);
    }

    if (err.status === 405) {
      
      this.toast.error(err.error.message);
    }
    else if (err.status == 500) {
      this.toast.error(err.error.message)
    }
    else {
      this.toast.error('Something Went Wrong!!')
    }
  })
}

getAllDocs(){
  this.vendorService.getAllDocs().subscribe((res:any)=>{
   this.rowData = res.data;
  })
}

getAllVendorName(){
  this.vendorService.getAllVendorName().subscribe((res:any)=>{
    this.vendorName = res.data;
  })
}

rejectVendor(e:any){
  
  const dialogRef = this.dialog.open(RejectRemarkComponent, { width: '400px', data:  this.vendor_id});
  dialogRef.afterClosed().subscribe(result => {
    
  })

}

onReject(){
  Swal.fire({
    title: 'Are you sure want to Reject?',
    // text: 'You will not be able to recover this file!',
    icon: 'warning',
    showCancelButton: true,
    cancelButtonColor: '#063178',
    confirmButtonColor: '#f44336',
    confirmButtonText: 'Yes',
    cancelButtonText: 'NO',
  }).then((result) => {
    if (result.value) {
      let data = {
        vendor_status : "REJECTED",
      }
      this.vendorService.updateStatus(this.vendor_id, data).subscribe((res:any)=>{
        console.log("success",res.data)
        if(res.code ==200){
          this.toast.success('Account Rejected Successfully');
          this.route.navigate(['/master/vendor/vendor-management/vendor-list/rejected-list'])
        }
      })
    } else if (result.dismiss === Swal.DismissReason.cancel) {
    }
  });
}


accountApproval(){
  let data = {
    vendor_status : "ACCOUNT APPROVED",
  }
  this.vendorService.updateStatus(this.vendor_id, data).subscribe((res:any)=>{
    console.log("success",res.data)
    if(res.code ==200){
      this.toast.success('Account Approved Successfully');
      this.route.navigate(['/master/vendor/vendor-management/vendor-list/approved-list'])
    }
  })
}

}
