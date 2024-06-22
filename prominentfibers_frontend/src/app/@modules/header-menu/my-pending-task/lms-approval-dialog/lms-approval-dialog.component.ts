import { Component, Inject } from '@angular/core';
import { FormControl, Validators, FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { LmsServiceService } from 'src/app/@shared/services/lms-service.service';
import { LmsUserManagementService } from 'src/app/@shared/services/lms-user-management.service';
import { NotificationServiceService } from 'src/app/@shared/services/notification/notification-service.service';

@Component({
  selector: 'app-lms-approval-dialog',
  templateUrl: './lms-approval-dialog.component.html',
  styleUrls: ['./lms-approval-dialog.component.scss']
})
export class LmsApprovalDialogComponent {
  Login_user_id: any = localStorage.getItem('signInUser');
  loginUserId: any = JSON.parse(this.Login_user_id).employee_id
  loginUserName: any = JSON.parse(this.Login_user_id).first_name
  mail: any = JSON.parse(this.Login_user_id).employee_official_email
  approval_form: any;
  FromDate: string;
  toDate: string;
  employee_id: any;
  author_course_id: any;
  traning_id: any;
  Emp_id_noti: any;
  Emp_name_noti: any;
  Emp_mail_noti: any;
  Emp_roleID_noti: any;
  Emp_role_noti: any;
  author_course_name: any;
  course_name: any;

  constructor(
    private fb: FormBuilder,
    private route: Router,
    private toster: ToastrService,
    private _lmsNotification: NotificationServiceService,
    private _lmsUserManagementService: LmsUserManagementService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    console.log(data, "data");
    this.employee_id = data.data.registered_user.employee_id
    this.author_course_id = data.data.author_course_id
    this.course_name = data.data.course_name
    this.traning_id = data.data.traning_id
    this.approval_fun();
    this.getEmployee_information(data.data.registered_user.employee_id)
  }
  getEmployee_information(id: any) {
    this._lmsNotification.get_EmployeeDetails(id).subscribe((res: any) => {
      console.log(res, "information emp");
      this.Emp_id_noti = id
      this.Emp_name_noti = res.data.first_name
      this.Emp_mail_noti = res.data.employee_official_email
      this.Emp_role_noti = res.data.user_role
      this.Emp_roleID_noti = res.data.role_master_id
    })
  }
  approval_fun() {
    this.approval_form = this.fb.group({
      start_date: new FormControl(null, [Validators.required]),
      end_date: new FormControl(null, [Validators.required]),
    });
  }
  reloadCurrentRoute() {
    let currentUrl = this.route.url;
    this.route.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.route.navigate([currentUrl]);
    });
  }


  submit(e: any) {
    const data = {
      employee_id: this.employee_id,
      author_course_id: this.author_course_id,
      start_date: moment(e.start_date).format('YYYY-MM-DD'),
      end_date: moment(e.end_date).format('YYYY-MM-DD'),
      course_request_status: 'APPROVED',
      // traning_id:this.traning_id,
    }
    this._lmsUserManagementService.sendCourseRequest(this.traning_id, data).subscribe(
      (res) => {
        this.toster.success('Request approve successfully')
        this.reloadCurrentRoute();
        this.create_notification();
      },
      (err) => {
        // this.loading = false;
        this.toster.error('Something went wrong please try again', 'Error Message');
      })
  }
  create_notification() {
    let data =
      [
        {
          employee_id: this.Emp_id_noti,
          emp_name: this.Emp_name_noti,
          employee_official_email: this.Emp_mail_noti,
          role: this.Emp_role_noti,
          type:"LMS",
          role_id: this.Emp_roleID_noti,
          remark: `Your course ${this.course_name} has been approved.`,
          subject: "Regarding for your responsibility",
          textData: `
    Dear ${this.Emp_name_noti}, <br>
      It is informed to you that your requested course ${this.course_name} has been Approved by ${this.loginUserName}. Now you can start.
          <br>   Regards,
          <br>Author <br>
          ${this.loginUserName}
    `,
        }
      ]
    this._lmsNotification.create_notification(data).subscribe((responsive: any) => {
      console.log(responsive);
      // this.toast.success("noti")
    },
      (error) => {
        this.toster.error("somthing wents wrong")
      }
    )
  }
  now = new Date();
  year = this.now.getFullYear();
  month = this.now.getMonth();
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
