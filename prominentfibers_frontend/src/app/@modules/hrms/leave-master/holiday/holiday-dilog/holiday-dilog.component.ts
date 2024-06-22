import { Component } from '@angular/core';
import { Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import * as moment from 'moment';
import { HrServiceService } from 'src/app/@shared/services/hr-service.service';

@Component({
  selector: 'app-holiday-dilog',
  templateUrl: './holiday-dilog.component.html',
  styleUrls: ['./holiday-dilog.component.scss']
})
export class HolidayDilogComponent {
  holiday_id: any;
  singleHolidayData: any;
  localTime:any;
  fromDate: any;
  toDate: any;
  constructor(public dialog: MatDialogRef<HolidayDilogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private hrService: HrServiceService) {
    this.holiday_id = this.data.id;
    
  }

  ngOnInit(): void {

     if (this.holiday_id) {
      this.hrService.holidayGetById(this.holiday_id).subscribe((res: any) => {
        this.singleHolidayData = res.data;
       this.fromDate = moment(new Date(this.singleHolidayData.holiday_from)).format('LL')
       this.toDate = moment(new Date(this.singleHolidayData.holiday_to)).format('LL')
      })
    } else {
      
    }

  }
}
