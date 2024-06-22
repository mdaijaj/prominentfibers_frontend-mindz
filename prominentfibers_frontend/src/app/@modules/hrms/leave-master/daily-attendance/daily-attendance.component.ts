import { Platform } from '@angular/cdk/platform';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { GridApi } from 'ag-grid-community';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { HrServiceService } from 'src/app/@shared/services/hr-service.service';

@Component({
  selector: 'app-daily-attendance',
  templateUrl: './daily-attendance.component.html',
  styleUrls: ['./daily-attendance.component.scss']
})
export class DailyAttendanceComponent implements OnInit {
  rowClass: any;
  private gridApi!: GridApi<any>;
  allLeaves: any;
  existAllLeaves: any;
  filterForm: FormGroup;
  monthYear: FormControl = new FormControl(null, [Validators.required])
  todate: any;
  noOfDay: any;

  constructor(private route: Router, private _hrService: HrServiceService, private toster: ToastrService, public dialog: MatDialog,) {
    this.rowClass = 'rowClass';

    this.filterForm = new FormGroup({
      start_date: new FormControl(null, [Validators.required]),
      end_date: new FormControl(null, [Validators.required])
    })

  }
  ngOnInit(): void {
    let lg: any = localStorage.getItem('signInUser')
    let loginUser = JSON.parse(lg);
    this.get_All_Employee_Attendance();
  }

  get_All_Employee_Attendance() {
    this._hrService.get_All_Employee_Attendance().subscribe(
      (res) => {
        
        this.allLeaves = res.data;
        this.existAllLeaves = res.data;
      }, (err) => {
        
      }
    )
  };

  calculateDiff() {
    this.todate = this.filterForm.value.end_date;
    if (this.filterForm.value.start_date && this.filterForm.value.end_date) {
      let currentDate = new Date(this.filterForm.value.start_date);
      let dateSent = new Date(this.filterForm.value.end_date);
      this.noOfDay = (Date.UTC(dateSent.getFullYear(), dateSent.getMonth(), dateSent.getDate()) -
        Date.UTC(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate())) / 86400000;
      
    }
  };


  searchAttendence() {
    if (this.filterForm.invalid) {
      this.toster.error('Select Date');
      return;
    };
    let filterLeaves: any = [];
    let from = moment(this.filterForm.value.start_date).format('YYYY-MM-DD');
    let to = moment(this.filterForm.value.end_date).format('YYYY-MM-DD');
    for (let i = 0; i < this.existAllLeaves.length; i++) {
      let startDate = this.existAllLeaves[i].start_date;
      let endDate = this.existAllLeaves[i].end_date;
      if (startDate === from && endDate === to) { 
        filterLeaves.push(this.existAllLeaves[i])
      }
    }
    this.allLeaves = filterLeaves;
    if(filterLeaves.length === 0){
      this.toster.warning('Data not found')
    }
  };

  reset() {
    if (this.filterForm.invalid) {
      this.toster.warning('Already refreshed');
      return;
    }
    this.filterForm.reset();
    this.allLeaves = this.existAllLeaves;
  }
  now = new Date();
  year = this.now.getFullYear();
  month = this.now.getMonth();
  FromDate: string;
  toDate: string;
  // day = this.now.getDay();
  date = this.now.getDate();
  maxDate = moment({ year: this.year + 100, month: this.month, date: this.date }).format('YYYY-MM-DD');
  minDate = moment({ year: this.year - 100, month: this.month, date: this.date }).format('YYYY-MM-DD');
  fromDate(e: any) {
    this.FromDate = moment(e.value).format('YYYY-MM-DD');
  }
  ToDate(e: any) {
    this.toDate = moment(e.value).format('YYYY/MM/DD');
    
  }
}
