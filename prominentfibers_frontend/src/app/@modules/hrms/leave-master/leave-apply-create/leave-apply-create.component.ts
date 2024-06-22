import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import {
  GridApi,
  GridReadyEvent
} from 'ag-grid-community';
import 'ag-grid-enterprise';
import { HrServiceService } from 'src/app/@shared/services/hr-service.service';
import { ToastrService } from 'ngx-toastr';
import * as moment from 'moment';

@Component({
  selector: 'app-leave-apply-create',
  templateUrl: './leave-apply-create.component.html',
  styleUrls: ['./leave-apply-create.component.scss']
})
export class LeaveApplyCreateComponent implements OnInit {
  leaveApply_Form: FormGroup;
  errorMsg: string;
  todate: any;
  noOfDay: any;
  leaveCode_dr: any;
  manager_list: any;
  leave_details: any;
  loginUser: any;
  fileDetails: any = { filePath: '', file: null };
  leave_ID: any;
  singleLeave: any;
  leaveDoc_file: any;
  AllLeaveTypes_list: any;
  monthWise_leave: boolean = false;
  managerName:any;
  

  constructor(private route: Router, private fb: FormBuilder, private activeroute: ActivatedRoute, private _hrService: HrServiceService, private toster: ToastrService) {
    this.rowClass = 'rowClass'
    this.leaveApply_Form = this.fb.group({
      leaveType: new FormControl(null, [Validators.required]),
      totalDays: new FormControl(null),

      totalTaken_leave: new FormControl(null),
      remaining_leave: new FormControl(null),
      extra_leave: new FormControl(null),

      leave_month: new FormControl(null),
      taken_total_leave_month: new FormControl(null),
      remaining_leave_month: new FormControl(null),
      extra_leave_month: new FormControl(null),

      start_date: new FormControl(null, [Validators.required]),
      end_date: new FormControl(null, [Validators.required]),
      leaveDay_count: new FormControl(null, [Validators.required]),
      reason: new FormControl(null, [Validators.required]),
      manager_name: new FormControl(null, [Validators.required]),
    })
  }

  ngOnInit(): void {
    this.activeroute.queryParams.subscribe((params: any) => {
      
      this.leave_ID = Number(params.id);
    });

    let lg: any = localStorage.getItem('signInUser')
    this.loginUser = JSON.parse(lg);
    this.get_Manager_Name(this.loginUser.employee_id)

    this.leaveCode_dropdown();
    this.get_All_Manager();
    this.getAllLeaveTypes();

    if (this.leave_ID) {
      this.getSingle_leaveApply(this.leave_ID)
    }
  }

  goBackHolidayList(path: any) {
    this.route.navigate([path])
  }

  onSubmitForm() {
    if (this.leaveApply_Form.invalid) {
      this.toster.error('required fields should not be blank', 'Fields Error');
      return;
    };

    let val: any = this.leaveApply_Form.value;
    let manager: any = this.manager_list?.find((a: any) => a.employee_id === val.manager_name);
    let selectedLeave = this.AllLeaveTypes_list?.find((e: any) => e.leave_id === val?.leaveType || this.singleLeave?.leave_id);

    let data: any = {
      employee_id: this.loginUser.employee_id,
      applier_name: this.loginUser.first_name,
      leave_id: selectedLeave.leave_id,
      leave_type: selectedLeave.leave_type,
      total_days: val.totalDays,

      taken_total_leave: val.totalTaken_leave,
      // remaining_leave: val.remaining_leave,
      // extra_leave: val.extra_leave,

      start_date: val.start_date,
      end_date: val.end_date,
      leave_count: val.leaveDay_count,
      reason: val.reason,
      manager_name: val.manager_name,
      manager_id: this.managerName.reporting_manager_id,
    };

    if (this.leave_details.remaining_leave < val.leaveDay_count) {
      data.extra_leave = Number(val.leaveDay_count) - Number(this.leave_details.remaining_leave);
      data.remaining_leave = 0;
      this.toster.warning(`You have applied ${Number(val.leaveDay_count) - Number(this.leave_details.remaining_leave)} days extra leave, this leave is Unpaid`, 'Unpaid Leave');
    } else {
      data.extra_leave = 0;
      data.remaining_leave = Number(this.leave_details.remaining_leave) - Number(val.leaveDay_count);
    }

    if (this.fileDetails.file) {
      data.leave_doc = this.fileDetails.file
    };

    if (!this.leave_ID) {
      this.leaveApply_create(data);
    } else {
      this.leaveApply_update(this.leave_ID, data);
    };

    
  }

  onCancel() {
    this.leaveApply_Form.reset();
    this.route.navigate(['/master/hrms/leave-master/leave-apply-list'])
  }

  fileInputChange(fileInput: File[] | any) {
    this.errorMsg = '';
    if (fileInput.target.files && fileInput.target.files[0]) {
      const file = fileInput.target.files[0];
      const reader = new FileReader();
      const fileSizeInMb = file.size / 1024 ** 2;
      if (fileSizeInMb > 30) {
        this.errorMsg = 'File size should be less than 30MB';
        return;
      }
      reader.onload = (e: any) => {
        this.fileDetails.filePath = reader.result;
      };
      reader.readAsDataURL(file);
      this.fileDetails.file = file;
    } else {
      this.fileDetails = { filePath: '', file: null };
    }
    
  }


  rowClass: any;
  private gridApi!: GridApi<any>;

  goToHolidayCreate(path: any) {
    this.route.navigate([path]);
  }


  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;
    
  }

  changeOnLeaveCode(e: any) {
    
    // this.singleLeaveType_details(e.value),
    this.emp_Leave_Details(this.loginUser.employee_id, { leave_id: e.value });
    let leaveType = this.AllLeaveTypes_list.find((a: any) => a.leave_id === e.value);
    if(!leaveType.is_carry_forward){
      this.monthWise_leave = false;
    }
    
  };

  changeOnManager_name(e: any) {

  }

  leaveCode_dropdown() {
    this._hrService.leaveCode_dropdown().subscribe(
      (res) => {
        
        this.leaveCode_dr = res.data
      }, (err) => {
        
      }
    )
  };

  get_All_Manager() {
    this._hrService.get_All_Manager().subscribe(
      (res) => {
        
        this.manager_list = res.data
      }, (err) => {
        
      }
    )
  };

  // singleLeaveCode_details(id: any) {
  //   this._hrService.leaveCode_details(id).subscribe(
  //     (res) => {
  //       
  //       this.leave_details = res.data;
  //       this.patchedLeaveType_details(res.data)
  //     }, (err) => {
  //       
  //     }
  //   )
  // };

  emp_Leave_Details(id: any, data: any) {
    this._hrService.emp_Leave_Details(id, data).subscribe(
      (res) => {
        
        this.leave_details = res.data;
        this.patchedLeaveType_details(res.data)
      }, (err) => {
        
      }
    )
  };
  leaveApply_create(data: any) {
    this._hrService.leaveApply_create(data).subscribe(
      (res) => {
        
        this.route.navigate(['master/hrms/leave-master/leave-apply-list']);
        this.toster.success('Leave apply successfully');
      }, (err) => {
        
        this.toster.error('somthing went wrong please try again', 'Error Message');
      }
    )
  };

  leaveApply_update(id: any, data: any) {
    this._hrService.leaveApply_update(id, data).subscribe(
      (res) => {
        
        this.route.navigate(['master/hrms/leave-master/leave-apply-list']);
        this.toster.success('Applied leave updated successfully');
      }, (err) => {
        
        this.toster.error('somthing went wrong please try again', 'Error Message');
      }
    )
  };

  getSingle_leaveApply(id: any) {
    this._hrService.getSingle_leaveApply(id).subscribe(
      (res) => {
        
        this.singleLeave = res.data;
        this.patchedAll_LeaveApply(res.data);
        this.leaveApply_Form.controls['leaveType'].disable();
        let leaveType = this.AllLeaveTypes_list.find((a: any) => a.leave_id === res.data.leave_id);
        if (leaveType.is_carry_forward) {
          let data: any = {
            end_date: res.data.end_date,
            leaveType: res.data.leave_id
          };
          this.LeaveFor_month(this.loginUser.employee_id, data);
        };
      }, (err) => {
        
      }
    )
  }

  check_Leave_Details(id: any, data: any) {
    this._hrService.check_Leave_Details(id, data).subscribe(
      (res) => {
        
        this.monthWise_leave = true;
        this.patched_MonthLeave_details(res.data)
      }, (err) => {
        
      }
    )
  };

  singleLeaveType_details(id: any) {
    this._hrService.singleLeaveType_details(id).subscribe(
      (res) => {
        
        this.leave_details = res.data;
        this.patchedLeaveType_details(res.data)
      }, (err) => {
        
      }
    )
  };

  patchedLeaveType_details(data: any) {
    this.leaveApply_Form.patchValue({
      totalDays: data.number_of_leave,

      totalTaken_leave: data.taken_total_leave,
      remaining_leave: data.remaining_leave,
      extra_leave: data.extra_leave,
    });
  };

  patched_MonthLeave_details(data: any) {
    this.leaveApply_Form.patchValue({
      leave_month: data.leave_in_month,
      taken_total_leave_month: data.taken_total_leave,
      remaining_leave_month: data.remaining_leave,
      extra_leave_month: data.extra_leave,
    });
  };

  getAllLeaveTypes() {
    this._hrService.getAllLeaveTypes().subscribe(
      (res) => {
        
        this.AllLeaveTypes_list = res.data;
      }, (err) => {
        
      }
    )
  }
  get_Manager_Name(id:any) {
    this._hrService.get_Manager_Name(id).subscribe(
      (res) => {
        
        this.managerName = res.data;
        this.leaveApply_Form.controls['manager_name'].patchValue(res.data.reporting_manager)
      }, (err) => {
        
      }
    )
  }

  patchedAll_LeaveApply(data: any) {
    // this.singleLeaveType_details(data.leave_id);
    this.emp_Leave_Details(this.loginUser.employee_id, { leave_id: data.leave_id });

    this.leaveApply_Form.patchValue({
      leaveType: data.leave_id,
      start_date: data.start_date,
      end_date: data.end_date,
      leaveDay_count: data.leave_count,
      reason: data.reason,
      manager_name: data.manager_name,
    });
  };


  calculateDiff() {
    this.todate = this.leaveApply_Form.value.end_date;
    if (this.leaveApply_Form.value.start_date && this.leaveApply_Form.value.end_date) {
      let currentDate = new Date(this.leaveApply_Form.value.start_date);
      let dateSent = new Date(this.leaveApply_Form.value.end_date);
      this.noOfDay = (Date.UTC(dateSent.getFullYear(), dateSent.getMonth(), dateSent.getDate()) -
        Date.UTC(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate())) / 86400000;
      
      this.leaveApply_Form.controls['leaveDay_count'].patchValue(this.noOfDay + 1)
    }
    this.LeaveFor_month(this.loginUser.employee_id, this.leaveApply_Form.value)
  }

  LeaveFor_month(id: any, data: any) {
    let body = {
      // start_date:  moment(this.leaveApply_Form.value.start_date).format('YYYY-MM-DD'),
      end_date: moment(data.end_date).format('YYYY-MM-DD'),
      leave_id: data.leaveType
    }

    let leaveType = this.AllLeaveTypes_list.find((a: any) => a.leave_id === data.leaveType);
    
    if (leaveType.is_carry_forward) {
      this.check_Leave_Details(id, body);
    };
  }
  now = new Date();
  year = this.now.getFullYear();
  month = this.now.getMonth();
  FromDate: string;
  toDate: string;
  // day = this.now.getDay();
  date = this.now.getDate();
  maxDate = moment({ year: this.year + 100, month: this.month, date: this.date }).format('YYYY-MM-DD');
  minDate = moment({ year: this.year - 0, month: this.month, date: this.date }).format('YYYY-MM-DD');
  fromDate(e: any) {
    this.FromDate = moment(e.value).format('YYYY-MM-DD');
  }
  ToDate(e: any) {
    this.toDate = moment(e.value).format('YYYY/MM/DD');
    
  }
}

