import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import * as moment from 'moment';
import { HrServiceService } from 'src/app/@shared/services/hr-service.service';
import { ToastrService } from 'ngx-toastr';

function noLeadingSpaces(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: boolean } | null => {
    if (control.value && control.value.trimLeft() !== control.value) {
      // Return an error object to indicate validation failure
      return { leadingSpaces: true };
    }
    // Return null if validation passes
    return null;
  };
}
import { Location } from '@angular/common';
@Component({
  selector: 'app-holiday-create',
  templateUrl: './holiday-create.component.html',
  styleUrls: ['./holiday-create.component.scss']
})
export class HolidayCreateComponent {
  holidayForm: FormGroup;
  holiday_id: any;
  singleHolidayData: any;
  id: any;
  noOfDay: any;
  todate: any;
  loginUser: any;
  resionList:any = [
    {id:1,resion:'EAST'},
    {id:2,resion:'WEST'},
    {id:3,resion:'NORTH'},
    {id:4,resion:'SOUTH'},
    {id:5,resion:'ALL'},
];
  constructor(private route: Router, private fb: FormBuilder, private hrServies: HrServiceService,
    private toast: ToastrService, private activeroute: ActivatedRoute,private location: Location) {

    this.holidayForm = this.fb.group({
      holiday_name: new FormControl(null, [Validators.required,noLeadingSpaces(),Validators.pattern(/^[A-Za-z0-9\s]*$/)]),
      holiday_type: new FormControl(null, [Validators.required]),
      // repeat_yearly: new FormControl(null, [Validators.required]),
      holiday_from: new FormControl(null, [Validators.required]),
      holiday_to: new FormControl(null, [Validators.required]),
      resion: new FormControl(null, [Validators.required]),
      leaveCountDays: new FormControl(null),
      restricted_holiday: new FormControl(false),
    })
  };
  
  ngOnInit() {
    let lg: any = localStorage.getItem('signInUser')
    this.loginUser = JSON.parse(lg);
    
    this.activeroute.queryParams.subscribe((params: any) => {
      this.id = params;
      
      this.holiday_id = params.holiday_id;
      
    });
    
    if (this.holiday_id) {
      this.hrServies.holidayGetById(this.holiday_id).subscribe((res: any) => {
        this.singleHolidayData = res.data;
        
        this.holidayForm.patchValue({
          holiday_name: this.singleHolidayData.holiday_name,
          holiday_type: this.singleHolidayData.holiday_type,
          holiday_from: this.singleHolidayData.holiday_from,
          holiday_to: this.singleHolidayData.holiday_to,
          leaveCountDays: this.singleHolidayData.total_leave,
          restricted_holiday: this.singleHolidayData.restricted_holiday,
          resion: this.singleHolidayData.resion,
        });
      })
    } else {
      
    }

  }
  goBack() {
    this.location.back();
  }
  goBackHolidayList(path: any) {
    this.route.navigate([path])
  }

  onSubmitForm() {
    let val = this.holidayForm.value;
    
    

    if (this.holidayForm.invalid) {
      this.toast.error("Required fields should not be empty", "Fields Error")
      return;
    }
    const data = {
      employee_id: this.loginUser.employee_id,
      holiday_name: val.holiday_name,
      holiday_type: val.holiday_type,
      // repeat_yearly:val.repeat_yearly,
      holiday_from: moment(val.holiday_from).format('YYYY-MM-DD'),
      holiday_to: moment(val.holiday_to).format('YYYY-MM-DD'),
      restricted_holiday: val.restricted_holiday,
      resion: val.resion,
    };
    this.hrServies.holidayCreate(data).subscribe((res: any) => {
      if (res.code == 200) {
        this.toast.success(res.message);
        this.route.navigate(['/master/hrms/leave-master/holiday-list']);
      }

    }, (err) => {

      if (err.status === 400) {
        
        this.toast.error(err.error.message);
      }
      else if (err.status == 500) {
        this.toast.error('bad request ')
      }
      else {
        this.toast.error('Something Went Wrong!!')
      }
    });
  }

  onCancel() {
    this.holidayForm.reset();
    this.route.navigate(['/master/hrms/leave-master/holiday-list'])
  }

  onUpdateForm() {
    let val = this.holidayForm.value;
    const data = {
      employee_id: this.loginUser.employee_id,
      holiday_name: val.holiday_name,
      holiday_type: val.holiday_type,
      holiday_from: moment(val.holiday_from).format('YYYY-MM-DD'),
      holiday_to: moment(val.holiday_to).format('YYYY-MM-DD'),
      restricted_holiday: val.restricted_holiday,
      resion: val.resion,
    };
    
    this.hrServies.updateHoliday(this.holiday_id, data).subscribe(
      (res: any) => {
        
        this.toast.success(res.message);
        this.route.navigate(['/master/hrms/leave-master/holiday-list']);
      },
      (err) => {
        if (err.status == 400) {
          this.toast.error('Something went Wrong');
        } else {
          this.toast.error('Error in submission!');
        }
      }
    );
  }

  calculateDiff() {
    this.todate = this.holidayForm.value.holiday_to;
    if (this.holidayForm.value.holiday_from && this.holidayForm.value.holiday_to) {
      let currentDate = new Date(this.holidayForm.value.holiday_from);
      let dateSent = new Date(this.holidayForm.value.holiday_to);
      this.noOfDay = (Date.UTC(dateSent.getFullYear(), dateSent.getMonth(), dateSent.getDate()) -
        Date.UTC(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate())) / 86400000;
      
      this.holidayForm.controls['leaveCountDays'].patchValue(this.noOfDay+1)
    }
  }
  now = new Date();
  year = this.now.getFullYear();
  month = this.now.getMonth();
  FromDate: string;
  toDate: string;
  // day = this.now.getDay();
  date = this.now.getDate();
  maxDate = moment({ year: this.year + 100, month: this.month, date: this.date }).format('YYYY-MM-DD');
  minDate = moment({
    year: this.year - 0,
    month: this.month,
    date: this.date,
  }).format('YYYY-MM-DD');
  fromDate(e: any) {
    this.FromDate = moment(e.value).format('YYYY-MM-DD');
  }
  ToDate(e: any) {
    this.toDate = moment(e.value).format('YYYY/MM/DD');
    
  }

}
