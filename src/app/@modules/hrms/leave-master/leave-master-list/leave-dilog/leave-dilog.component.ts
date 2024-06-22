import { Component } from '@angular/core';
import { Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import * as moment from 'moment';
import { HrServiceService } from 'src/app/@shared/services/hr-service.service';

@Component({
  selector: 'app-leave-dilog',
  templateUrl: './leave-dilog.component.html',
  styleUrls: ['./leave-dilog.component.scss']
})
export class LeaveDilogComponent {
  leavePolicyId: any;
  singleLeaveData: any;
  localTime:any;
  fromDate: any;
  toDate: any;
  constructor(public dialog: MatDialogRef<LeaveDilogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private hrService: HrServiceService) {
    this.leavePolicyId = this.data.id;
    
  }

  ngOnInit(): void {

     if (this.leavePolicyId) {
      this.hrService.leaveGetById(this.leavePolicyId).subscribe((res: any) => {
        this.singleLeaveData = res.data;
       this.fromDate = moment(new Date(this.singleLeaveData.fromDate)).format('LL')
       this.toDate = moment(new Date(this.singleLeaveData.toDate)).format('LL')
      })
    } else {
      
    }

  }
}
