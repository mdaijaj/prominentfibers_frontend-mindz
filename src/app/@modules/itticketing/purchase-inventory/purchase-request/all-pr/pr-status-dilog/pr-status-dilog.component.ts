import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { PurchaseRequestService } from 'src/app/@shared/services/purchase-request.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-pr-status-dilog',
  templateUrl: './pr-status-dilog.component.html',
  styleUrls: ['./pr-status-dilog.component.scss']
})
export class PrStatusDilogComponent {
  cellData: any;
  getData: any = [];
  constructor(public dialog: MatDialogRef<PrStatusDilogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private prService: PurchaseRequestService, private toast: ToastrService, private route: Router,) {
    this.cellData = this.data;
  }

  ngOnInit(): void {
    this.getAllApproverList();
  }

  getByData(){
    
  }

  getAllApproverList() {
    let data = {
      department: this.cellData?.department,
      PR_category: this.cellData?.PR_category=="Service PR"?"service":"item"
    }
    this.prService.getAllApproverList(data).subscribe((res: any) => {
      this.getData = res.data[0].workFlowmaps;

    })
  }

  approve(e: any) {

  }

  reloadCurrentRoute() {
    let currentUrl = this.route.url;
    this.route.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.route.navigate([currentUrl]);
    });
  }

  updatePrStatus(e: any) {


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
          approvel_status: "APPROVED"
        };
        let id = this.cellData?.procurement_id;
        this.prService.updatePrStatus(id, data).subscribe((res: any) => {
          this.getData = res.data;
          if (res.code == 200) {
            this.toast.success('Approved PR Successfully')
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
