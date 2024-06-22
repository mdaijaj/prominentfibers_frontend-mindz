import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ICellRendererParams } from 'ag-grid-community';
import { ToastrService } from 'ngx-toastr';
import { EmailSendeComponent } from 'src/app/@shared/components/email-sende/email-sende.component';
import { HrServiceService } from 'src/app/@shared/services/hr-service.service';
import { RbacMasterService } from 'src/app/@shared/services/rbac-master.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-action',
  templateUrl: './action.component.html',
  styleUrls: ['./action.component.scss'],
})
export class ActionInLeaveApplyComponent {
  public cellValue: any;
  assignAction: any;
  cellData: any;

  constructor(
    private route: Router,
    private toast: ToastrService,
    private _hrService: HrServiceService,
    private _rbackService: RbacMasterService
  ) {}
  ngOnInit(): void {
    this.assignAction = this._rbackService.accessAssignAction();
  }

  reloadCurrentRoute() {
    let currentUrl = this.route.url;
    this.route.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.route.navigate([currentUrl]);
    });
  }

  agInit(params: ICellRendererParams): void {
    this.cellValue = this.getValueToDisplay(params);
    this.cellData = this.getRowValue(params);
  }

  getValueToDisplay(params: ICellRendererParams) {
    return params.data.leave_apply_id;
  }

  refresh(params: ICellRendererParams): boolean {
    // set value into cell again

    this.cellValue = this.getValueToDisplay(params);
    this.cellData = this.getRowValue(params);
    return true;
  }

  getRowValue(params: ICellRendererParams) {
    console.log('params', params);
    return params.data;
  }

  edit(e: any) {
    e.stopPropagation();

    if (this.cellData.leave_apply_status === 'APPROVED') {
      this.toast.warning('Leave is approve');
      return;
    } else {
      this.route.navigate(['master/hrms/leave-master/leave-apply-create'], {
        queryParams: { id: this.cellValue },
      });
    }
  }

  delete(e: any) {
    e.stopPropagation();
    Swal.fire({
      title: 'Are you sure to delete this applied Leave?',
      text: "You won't be able to revert this!",
      icon: 'question',
      showCancelButton: true,
      cancelButtonColor: '#f44336',
      confirmButtonColor: '#3f51b5',
      confirmButtonText: 'Yes',
      cancelButtonText: 'Not Now',
    }).then((result) => {
      if (result.isConfirmed) {
        this._hrService.leaveApply_delete(this.cellValue).subscribe(
          (res) => {
            this.reloadCurrentRoute();
            this.toast.success('Applied leave deleted successfully');
          },
          (err) => {
            this.toast.error(
              'Somthing went wrong please try again',
              'Error Message'
            );
          }
        );
      }
    });
  }
}
