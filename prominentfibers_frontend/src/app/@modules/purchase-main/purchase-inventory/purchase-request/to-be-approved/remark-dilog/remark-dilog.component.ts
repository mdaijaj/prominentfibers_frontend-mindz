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
  idEmp: string | null;
  alldataPr: any;
  constructor(public dialog: MatDialogRef<RemarkDilogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private prService: PurchaseRequestService, private toast: ToastrService,private route: Router,private fb: FormBuilder ) {
    this.cell_id = this.data.cellData.procurement_id;
    console.log(data,'dataaaa');
    this.alldataPr=data.cellData;

    this.remarksForm= this.fb.group({
      remarks: new FormControl(null, [Validators.required]),
    })
  }

  ngOnInit(): void{
    this.idEmp=localStorage.getItem('EmpMainId')
  
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
          Approvel_status : "APPROVED",
          progressStatus:"CLOSE",
          employee_id:this.idEmp,
          final_quantity : "800",
          final_MVP : "80000",
          // "approvel_status" : "APPROVED"
        };
        
        this.prService.updatePrStatus(this.cell_id,this.alldataPr).subscribe((res: any) => {
          this.getData = res.data;
          if(res.code ==200){
            this.toast.success(res.message);
            this.route.navigate([
              'master/purchase-main/purchase-request/approved-pr',
            ]);     
          }
          
        })
      }
    });
  }

  updatePrRemarkReject(e: any){  
    let val =this.remarksForm.value;
if (this.alldataPr?.approvel_status === "APPROVED") {
  this.alldataPr.approvel_status = "REJECTED";
  this.alldataPr.Approvel_status = "REJECTED";

}

console.log(this.alldataPr, 'this.alldataPr new')
    
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
        
        this.prService.updatePrStatus(this.cell_id,this.alldataPr).subscribe((res: any) => {
          this.getData = res.data;
          if(res.code ==200){
            this.toast.success(res.message)
            this.route.navigate([
              'master/purchase-main/purchase-request/rejected-pr',
            ]);     
          }
          
        })
      }
    });
  }
}
