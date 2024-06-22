import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HeadService } from '../../@shared/services/head.service';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../auth-material/auth.service';
import * as moment from 'moment';
import * as CryptoJS from 'crypto-js';

interface Attendance {
  employee_id: string,
  punching_date: string,
  punching_time: string,
  punching_status: "IN"
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  // submitted: boolean = false;
  loginForm: any;
  isLogIn: boolean = false;
  loginData: any;
  loading: boolean = false;
  errorMessage: any;
  wrong: any;
  empMainId: any;
  showLoader: boolean = false;
  isSubmited: boolean = false;

  constructor(
    private fb: FormBuilder,
    private head: HeadService,
    private _authService: AuthService,
    private route: Router,
    private toast: ToastrService

  ) {
    this.loginForm = this.fb.group({
      employee_official_email: [null, [Validators.required, Validators.email, Validators.minLength(3)]],
      password: [null, [Validators.required, Validators.minLength(6), Validators.maxLength(20)]],
    });
  }
  ngOnInit(): void { }

  get login() { return this.loginForm.controls };

  loginFormSubmit() {
    if (this.loginForm.invalid) {
      this.toast.error('Enter an Valid Email/Password', 'Something Went Wrong')
      return;
    }
    this.isSubmited = true;
    this.showLoader = true;
     let obj = this.loginForm.value;
    const encryptedEmail = CryptoJS.AES.encrypt(obj?.employee_official_email, 'email').toString();
    const encryptedPassword = CryptoJS.AES.encrypt(obj?.password, 'password').toString();
    let req = {
      encryptedEmail: encryptedEmail,
      encryptedPassword: encryptedPassword,
    }
    this._authService.signIn(req).subscribe(
      (res) => {
        this.showLoader = false;

        this.empMainId = res.employee_id;
        // check module exist or not
        if ((res.role_menu_access_data && res.role_menu_access_data?.length === 0) || (!res.role_menu_access_data || !res.employee_id)) {
          return;
        };

        this.toast.success('Welcome to EM Production Pro INDIA', 'Login Successful');
        localStorage.setItem("EmpMainId", this.empMainId)
        this.route.navigate(['master/hrms/employee-master/dashboard']);
        this.head.loginIn.next(true);
        localStorage.setItem('token', 'true');
        this.head.nav.next(false);
        this.head.clicked.next(false);
        this.getAllAccess_Modules(res.employee_id);
        this.handleEmployee_Attendance(res.employee_id)
      },
      (err) => {
        this.showLoader = false;
        if (err.status === 404) {

          this.toast.error("You have entered an invalid credentials");
        }
        else {
          this.toast.error('Invalid User & Password!', 'Error Message');
        }
      })
  }

  getAllAccess_Modules(id: any) {
    this._authService.getAllAccess_Modules(id).subscribe(
      (res: any) => {

      }
    )
  }

  handleEmployee_Attendance(empId: any) {
    let date = new Date();
    let outDate = moment(date).format("YYYY-MM-DD");
    let outTime = moment(date).format('HH:mm');
    let body: Attendance = {
      employee_id: empId,
      punching_date: outDate,
      punching_time: outTime,
      punching_status: "IN"
    };

    this._authService.employeeAttendance(body).subscribe(
      (res) => {

      }, (err) => {

      }
    )
  }
}
