import { Component, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DMSService } from 'src/app/@shared/services/dms.service';
import { DateAdapter } from '@angular/material/core';
import { LmsServiceService } from 'src/app/@shared/services/lms-service.service';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';

interface calendarEvent {
  id: string,
  title: string,
  date: Date,
  color: string,
  duration: string
}

@Component({
  selector: 'app-attend-popup',
  templateUrl: './attend-popup.component.html',
  styleUrls: ['./attend-popup.component.scss']
})


export class AttendPopupComponent {
    screenOnOffList:any;
  
  myFilter = (d: Date | null): boolean => {
    const day = (d || new Date()).getDay();
    // Prevent Saturday and Sunday from being selected.
    return day !== 0;
  };

  constructor(
    public dialogRef: MatDialogRef<AttendPopupComponent>,
    private fb: FormBuilder,
    private route:Router,
    private dateAdapter: DateAdapter<Date>,
    private _lmsService: LmsServiceService,
    private toaster:ToastrService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _dmsService: DMSService,
    ) {

    this.dateAdapter.setLocale('en-GB'); //dd/MM/yyyy
    this.screenOnOffList = data
    
  }

  closeDialog() {
    this.dialogRef.close(); // <- Close the mat dialog
  }

  ngOnInit(): void {

  }

}
