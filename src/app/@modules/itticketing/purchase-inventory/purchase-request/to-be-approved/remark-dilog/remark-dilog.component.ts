import { Component, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { PurchaseRequestService } from 'src/app/@shared/services/purchase-request.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-remark-dilog',
  templateUrl: './remark-dilog.component.html',
  styleUrls: ['./remark-dilog.component.scss']
})
export class RemarkDilogComponent {
  cell_id: any;
  getData: any=[];
  remarksForm: FormGroup;
  constructor(public dialog: MatDialogRef<RemarkDilogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private prService: PurchaseRequestService, private toast: ToastrService,private route: Router,private fb: FormBuilder ) {
    this.cell_id = this.data.cellData.procurement_product_id;
    

    this.remarksForm= this.fb.group({
      remarks: new FormControl(null, [Validators.required]),
    })
  }

  ngOnInit(): void{
  
  }

  updatePrRemarkApprove(e: any){  
    let val =this.remarksForm.value;
    e.stopPropagation();
    Swal.fire({
      title: 'Do You Want to Approve This Pr ?',
      icon: 'warning',
      showCancelButton: true,
      cancelButtonColor: "#f44336",
      confirmButtonColor: "#3f51b5",
      confirmButtonText: 'Yes',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.isConfirmed) {
        const data = {
          approvel_status: "APPROVED",
          remarks : val.remarks,
        };
        
        this.prService.updatePrStatus(this.cell_id,data).subscribe((res: any) => {
          this.getData = res.data;
          if(res.code ==200){
            this.toast.success(res.message)
            this.route.navigate([
              'master/itticket/purchase-inventory/purchase-request/all-pr-list',
            ]);     
          }
          
        })
      }
    });
  }

  updatePrRemarkReject(e: any){  
    let val =this.remarksForm.value;
    e.stopPropagation();
    Swal.fire({
      title: 'Do You Want to Reject This Pr ?',
      icon: 'warning',
      showCancelButton: true,
      cancelButtonColor: "#f44336",
      confirmButtonColor: "#3f51b5",
      confirmButtonText: 'Yes',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.isConfirmed) {
        const data = {
          approvel_status: "REJECTED",
          remarks : val.remarks,
        };
        
        this.prService.updatePrStatus(this.cell_id,data).subscribe((res: any) => {
          this.getData = res.data;
          if(res.code ==200){
            this.toast.success(res.message)
            this.route.navigate([
              'master/itticket/purchase-inventory/purchase-request/all-pr-list',
            ]);     
          }
          
        })
      }
    });
  }
}
