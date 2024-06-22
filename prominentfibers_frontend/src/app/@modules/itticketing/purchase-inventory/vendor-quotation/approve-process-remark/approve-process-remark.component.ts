import { Component, Inject } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { PurchaseRequestService } from 'src/app/@shared/services/purchase-request.service';

@Component({
  selector: 'app-approve-process-remark',
  templateUrl: './approve-process-remark.component.html',
  styleUrls: ['./approve-process-remark.component.scss']
})
export class ApproveProcessRemarkComponent {
  remarkForm: FormGroup;
  quotation_id: any;
  modalHeading:string;
  constructor(
    private router:Router,
    private fb: FormBuilder,
    private toast: ToastrService,
    private prService: PurchaseRequestService,
    public dialog: MatDialogRef<ApproveProcessRemarkComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    this.remarkForm = this.fb.group({
      remarks: new FormControl(null, [Validators.required]),
    });

    if (this.data.status == "Approved") {
      this.modalHeading = 'Approval Remark'
    }else if(this.data.status == "Rejected"){
      this.modalHeading = 'Rejection Remark'
    }
  }

  ngOnInit(): void {

  }

  updateRemark() {
    
    if (this.remarkForm.invalid) {
      this.toast.error('Required fields should not be empty', 'Fields Error');
      
      return;
    }
    let val = this.remarkForm.value
    // let formData = new FormData();
    // formData.append("remarks", val.remarks);

    if (this.data.status == "Rejected") {
      let data = {
        approvel_vendor: "REJECTED",
        final_remarks:val.remarks
      }
      this.prService.quotationRejectById(this.data.id, data).subscribe((res:any) => {
        
        if(res.code == 200){
          this.router.navigateByUrl('master/itticket/purchase-inventory/vendor-quotation/rejected');
          this.toast.success('Qutation rejected successfully')
        }
      })
    }else if(this.data.status == "Approved"){
      let data = {
        approvel_vendor: "APPROVED COST",
        final_remarks:val.remarks,
        vendor_product_details_id:this.data.productId
      }
      this.prService.quotationRejectById(this.data.id, data).subscribe((res:any) => {
        
        if(res.code == 200){
          this.router.navigateByUrl('master/itticket/purchase-inventory/vendor-quotation/approved-cost');
          this.toast.success('Qutation approved successfully')
        }
      })
    }


  }
}
