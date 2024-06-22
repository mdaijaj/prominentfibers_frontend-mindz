import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ICellRendererParams } from 'ag-grid-community';
import { ToastrService } from 'ngx-toastr';
import { HrServiceService } from 'src/app/@shared/services/hr-service.service';
import { RbacMasterService } from 'src/app/@shared/services/rbac-master.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-action',
  templateUrl: './action.component.html',
  styleUrls: ['./action.component.scss']
})
export class ActionForUnaprovedLeaveComponent {
  public cellValue: any;
  assignAction:any;
  constructor(
    private route: Router,
    private toast: ToastrService,
    private _hrService: HrServiceService,
    private _rbackService:RbacMasterService,
  ) {

  }
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
  }

  getValueToDisplay(params: ICellRendererParams) {
    
    return params.data.leave_apply_id;
  }

  refresh(params: ICellRendererParams): boolean {
    // set value into cell again
    
    this.cellValue = this.getValueToDisplay(params);
    return true;
  }
  
  approve(e: any) {
    e.stopPropagation();
    
    // this.route.navigate(
    //   ['master/hrms/leave-master/leave-apply-create'],
    //   { queryParams: { id: this.cellValue} }
    // );

    Swal.fire({
      title: 'Are you sure to Approve this applied Leave?',
      text: "You won't be able to revert this!",
      icon: 'question',
      showCancelButton: true,
      cancelButtonColor: "#f44336",
      confirmButtonColor: "#3f51b5",
      confirmButtonText: 'Yes',
      cancelButtonText: 'Not Now'
    }).then((result) => {
      if (result.isConfirmed) {
        const data = {
          leave_apply_status:'APPROVED'
        }
        this._hrService.appliedLeaveStatus_update(this.cellValue,data).subscribe(
          (res)=>{
            
            this.reloadCurrentRoute();
            this.toast.success('Applied leave Aprove successfully');
          },(err)=>{
            
            this.toast.error('Somthing went wrong please try again','Error Message');
          }
        )
      };
    });
  }

  reject(e:any){
    e.stopPropagation();
    Swal.fire({
      title: 'Are you sure to Reject this applied Leave?',
      text: "You won't be able to revert this!",
      icon: 'question',
      showCancelButton: true,
      cancelButtonColor: "#f44336",
      confirmButtonColor: "#3f51b5",
      confirmButtonText: 'Yes',
      cancelButtonText: 'Not Now'
    }).then((result) => {
      if (result.isConfirmed) {
        const data = {
          leave_apply_status:'REJECTED'
        }
        this._hrService.appliedLeaveStatus_update(this.cellValue,data).subscribe(
          (res)=>{
            
            this.reloadCurrentRoute();
            this.toast.success('Applied leave Reject successfully');
          },(err)=>{
            
            this.toast.error('Somthing went wrong please try again','Error Message');
          }
        )
      };
    });
  }
}
