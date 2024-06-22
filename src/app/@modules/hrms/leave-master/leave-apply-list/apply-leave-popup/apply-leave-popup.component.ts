import { Component, Inject } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { HrServiceService } from 'src/app/@shared/services/hr-service.service';
import { LeaveDetailsPopupComponent } from '../../unapproved-leave/leave-details-popup/leave-details-popup.component';

@Component({
  selector: 'app-apply-leave-popup',
  templateUrl: './apply-leave-popup.component.html',
  styleUrls: ['./apply-leave-popup.component.scss']
})
export class ApplyLeavePopupComponent {
  leaveDetails: any;
  isReject: boolean = false;
  actionVal: any;
  rejectReason: FormControl = new FormControl(null);

  constructor(
    public dialog: MatDialogRef<LeaveDetailsPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private toaster: ToastrService,
    private _hrService: HrServiceService
  ) {
    
    this.leaveDetails = data;
  }

  fontColor(){
    let status = this.leaveDetails.leave_apply_status;
    if(status === "APPROVED"){
      return 'color: green';
    }else if(status === "REJECTED"){
      return 'color: red';
    }else{
      return 'color: orange';
    }
  }
}
