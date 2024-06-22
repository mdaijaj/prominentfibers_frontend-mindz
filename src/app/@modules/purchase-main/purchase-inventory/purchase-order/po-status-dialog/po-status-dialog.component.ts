import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { PurchaseRequestService } from 'src/app/@shared/services/purchase-request.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-po-status-dialog',
  templateUrl: './po-status-dialog.component.html',
  styleUrls: ['./po-status-dialog.component.scss']
})
export class PoStatusDialogComponent {
  cellData: any;
  getData: any = [];
  serviceType: string;
  getdataCopy: any;
  notCreatedFlow: boolean = false;
  constructor(public dialog: MatDialogRef<PoStatusDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private prService: PurchaseRequestService, private toast: ToastrService, private route: Router,) {
    this.cellData = this.data.cellData;
    console.log(this.cellData, "data for status po");
    
  }

  ngOnInit(): void {
    // this.getAllApproverList();
    this.approveLeavel();
  }

  // getAllApproverList() {
  //   let data = {
  //     department: this.cellData?.department,
  //     PR_category: this.cellData?.PR_category == "Service PR" ? "service" : "item"
  //   }
  //   this.prService.getAllApproverList(data).subscribe((res: any) => {
  //     this.getData = res.data[0].workFlowmaps;

  //   })
  // }

  approveLeavel() {
    if (this.cellData?.po_category_type == "Service PO") {
      this.serviceType = "Service PO"
    } else if (this.cellData?.po_category_type == "Item PO") {
      this.serviceType = "Item PO"
    }

    let data = {
      department: this.cellData?.department_name,
      workflow_type: this.serviceType,
      employee_id: this.cellData?.employee_id
    }
    console.log(this.cellData?.id, 'data');

    this.prService.getByApprovelPoLevel(this.cellData?.id).subscribe((res: any) => {
      console.log(res, 'resssss');
      this.getdataCopy = res.data
    },
      ((err: any) => {
        console.log(err, 'errr');

        if (err.status == 400) {
          this.notCreatedFlow = true;
        }
      })
    )
  }

  reloadCurrentRoute() {
    let currentUrl = this.route.url;
    this.route.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.route.navigate([currentUrl]);
    });
  }

  updatePoStatus(e: any) {


    e.stopPropagation();
    Swal.fire({
      title: 'Do You Want to Approve This PO ?',
      icon: 'warning',
      showCancelButton: true,
      cancelButtonColor: "#f44336",
      confirmButtonColor: "#3f51b5",
      confirmButtonText: 'Yes',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.isConfirmed) {
        const data = {
          approvel_status: "APPROVED"
        };
        let id = this.cellData?.id;
        this.prService.updatePoStatus(id, data).subscribe((res: any) => {
          this.getData = res.data;
          if (res.code == 200) {
            this.toast.success('Approved PO Successfully')
            this.reloadCurrentRoute();

          }

        })
      }
    });
  }

  // updatePrStatusLv2(e: any) {


  //   e.stopPropagation();
  //   Swal.fire({
  //     title: 'Do You Want to Approve This Pr ?',
  //     icon: 'warning',
  //     showCancelButton: true,
  //     cancelButtonColor: "#f44336",
  //     confirmButtonColor: "#3f51b5",
  //     confirmButtonText: 'Yes',
  //     cancelButtonText: 'No'
  //   }).then((result) => {
  //     if (result.isConfirmed) {
  //       const data = {
  //         approvel_status: "APPROVED"
  //       };
  //       let id = this.cellData?.procurement_product_id;
  //       this.prService.updatePrStatus(id, data).subscribe((res: any) => {
  //         this.getData = res.data;
  //         if (res.code == 200) {
  //           this.toast.success('Approved PR Successfully')
  //           this.reloadCurrentRoute();

  //         }

  //       })
  //     }
  //   });
  // }
}
