import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { EmpRegistrationService } from 'src/app/@shared/services/emp-registration.service';
import { Location } from '@angular/common';
@Component({
  selector: 'app-salary-breakup',
  templateUrl: './salary-breakup.component.html',
  styleUrls: ['./salary-breakup.component.scss']
})
export class SalaryBreakupComponent implements OnInit {
  employeeForm: FormGroup;
  employeeId: any;
  employeeName: any;
  department: any;
  designation: any;
  reportingManager: any;
  constructor(private fb: FormBuilder,
    private _empoloyeeService: EmpRegistrationService,
    private route: Router,
    private toastr: ToastrService,
    private _activeRoute: ActivatedRoute,private location: Location) {
    this.employeeForm = this.fb.group({
      basic: ['', Validators.required],
      hra: ['', Validators.required],
      foodCoupons: ['', Validators.required],
      otherAllowance: ['', Validators.required],
      leaveTravelAllowance: ['', Validators.required],
      grossEarnings: ['', Validators.required],
      pf: ['', Validators.required],
      gratuity: ['', Validators.required]
    });
  }
  ngOnInit(): void {
    this._activeRoute.queryParams.subscribe((params: any) => {
      console.log(params);

      if (params.employee_id) {
        this.getSalaryData(params.employee_id)
        this.getEmpData(params.employee_id)
      } else {
        this.toastr.error('Someting is wrong Error')
      }
    })
  }
  goBack() {
    this.location.back();
  }
  getSalaryData(id: any) {
    this._empoloyeeService.getSalaryData(id).subscribe((res => {
      console.log(res);

    }))
  }
  getEmpData(id: any) {
    this._empoloyeeService.getemployeeData(id).subscribe((res: any) => {
      console.log(res,"res for Employee");
      this.employeeId = res.data.employee_id
      this.employeeName = res.data.employee_name
      this.reportingManager = res.data.reporting_manager
      this.department = res.data.department
      this.designation = res.data.designation
    })
  }
  onSubmit() {
    if (this.employeeForm.valid) {
      // Process form data
      console.log(this.employeeForm.value);
    }
  }
}
