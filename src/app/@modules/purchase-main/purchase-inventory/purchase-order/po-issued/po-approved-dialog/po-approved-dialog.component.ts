import { Component, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { PurchaseRequestService } from 'src/app/@shared/services/purchase-request.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-po-approved-dialog',
  templateUrl: './po-approved-dialog.component.html',
  styleUrls: ['./po-approved-dialog.component.scss']
})
export class PoApprovedDialogComponent {
  cell_id: any;
  getData: any = [];
  remarksForm: FormGroup;
  idEmp: string | null;
  alldataPo: any;
  constructor(public dialog: MatDialogRef<PoApprovedDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private prService: PurchaseRequestService, private toast: ToastrService, private route: Router, private fb: FormBuilder) {
    this.cell_id = this.data.cellData.po_id;
    console.log(this.data, 'dataaaa');
    this.alldataPo = data.cellData;

    this.remarksForm = this.fb.group({
      remarks: new FormControl(null, [Validators.required]),
      Approvel_status: new FormControl(null, [Validators.required]),
    })
  }

  ngOnInit(): void {
    this.idEmp = localStorage.getItem('EmpMainId')

  }

  reloadCurrentRoute() {
    let currentUrl = this.route.url;
    this.route.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.route.navigate([currentUrl]);
    });
  }

  updatePoRemarkApprove(e: any) {
    let val = this.remarksForm.value;
    e.stopPropagation();
    Swal.fire({
      title: `Do You Want to ${val.Approvel_status} This PO ?`,
      icon: 'warning',
      showCancelButton: true,
      cancelButtonColor: "#f44336",
      confirmButtonColor: "#3f51b5",
      confirmButtonText: 'Yes',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.isConfirmed) {
        const data = {
          Approvel_status: val.Approvel_status,
          remarks: val.remarks,
          progressStatus: "CLOSE",
          emp_id: this.idEmp,
          // "approvel_status" : "APPROVED"
        };

        this.prService.updatePoStatus(this.cell_id, data).subscribe((res: any) => {
          this.getData = res.data;
          if (res.code == 200) {
            this.toast.success(res.message);
            if (val.Approvel_status == 'REJECTED') {
              this.route.navigate([
                'master/purchase-main/purchase-order/rejected-po',
              ]);
            } else if (val.Approvel_status == 'APPROVED') {
              this.route.navigate([
                'master/purchase-main/purchase-order/approved-po',
              ]);
            } else if (val.Approvel_status == 'PUSH BACK') {
              this.reloadCurrentRoute();
            }
          }
        })
      }
    });
  }
}
