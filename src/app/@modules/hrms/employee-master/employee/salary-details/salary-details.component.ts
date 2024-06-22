import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { EmpRegistrationService } from 'src/app/@shared/services/emp-registration.service';
import { Location } from '@angular/common';
import { HeadService } from 'src/app/@shared/services/head.service';


@Component({
  selector: 'app-salary-details',
  templateUrl: './salary-details.component.html',
  styleUrls: ['./salary-details.component.scss']
})
export class SalaryDetailsComponent implements OnInit {
  salaryForm: any;
  id: any;
  salaryData: any;
  salaryGetData: any;
  // employee_id: any = 2
  empId: any;

  salaryId: any;
  constructor(
    private fb: FormBuilder,
    private _empoloyeeService: EmpRegistrationService,
    private head: HeadService,
    private route: Router,
    private toastr: ToastrService,
    private _activeRoute: ActivatedRoute,
    private locatin: Location,
  ) {
    this.salaryForm = this.fb.group({
      tatal_ctc: new FormControl(null, [Validators.required]),
      fixed_ctc: new FormControl(null,[Validators.required]),
      variable_ctc: new FormControl(null, [Validators.required])
      })
      // ,[Validators.required,Validators.pattern(/^[0-9]*$/), Validators.maxLength(10)]
  }
  ngOnInit(): void {
    this._activeRoute.queryParams.subscribe((params: any) => {
      this.id = params;
      
      this.salaryId = this.id.employee_id;
      if (params.employee_id) {
        this.salaryGetBy(params.employee_id)
        
      } else {
        
      }
    })
    this._empoloyeeService.setEmpTitle('SALARY DETAILS')
    

  }
get SL():any {return this.salaryForm.controls}
  salaryGetBy(id: any) {
    this._empoloyeeService.getByUserId(id).subscribe((res: any) => {
      this.salaryGetData = res.data;
      
      this.salaryPatch(this.salaryGetData)
    })
  }

  salaryPatch(salaryGetData: any) {
    this.salaryForm.patchValue({
      fixed_ctc: salaryGetData?.fixed_ctc,
      tatal_ctc: salaryGetData?.tatal_ctc,
      variable_ctc: salaryGetData?.variable_ctc
    })
  }

  onSubmitForm() {
    

    let val = this.salaryForm.value;
    console.log(val);
    if (this.salaryForm.invalid) {
      this.toastr.error("Required fields should not be empty",)
      return;
    }

    this._empoloyeeService.UpdateSalary(this.salaryId, val).subscribe((data: any) => {
      this.salaryData = data;
      
      this.route.navigate(['master/hrms/employee-master/employ/employee-create/payment-details'], { queryParams: {employee_id:this.salaryId} });
      this.toastr.success("Salary Details Submitted successfully..")
    },(err=>{
      this.toastr.error("Someting went wron please try again","Error Message");
    }))
  }
  Skip() {
    this.route.navigate(['master/hrms/employee-master/employ/employee-create/payment-details'], { queryParams: {employee_id:this.salaryId} });
  }
}
