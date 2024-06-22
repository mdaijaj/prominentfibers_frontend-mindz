import { Component } from '@angular/core';
import {  FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { LmsServiceService } from 'src/app/@shared/services/lms-service.service';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { Location } from '@angular/common';


import { HrServiceService } from 'src/app/@shared/services/hr-service.service';
import Swal from 'sweetalert2';
import { AnyObject } from 'chart.js/dist/types/basic';
import { DepartmentBudgetService } from 'src/app/@shared/services/department-budget.service';


@Component({
  selector: 'app-create-budget',
  templateUrl: './create-budget.component.html',
  styleUrls: ['./create-budget.component.scss']
})
export class CreateBudgetComponent {
  Login_user_id: any = localStorage.getItem('signInUser');
  loginUserId: any = JSON.parse(this.Login_user_id).employee_id
  loginUserName: any = JSON.parse(this.Login_user_id).first_name
  nameSearch: any = ''
  // **************************Ok code End************************************
  department_budget_form: FormGroup;
  emp_id: any;
  button_type="Fixed Budget";
  FromDate: string;
  uploadThumbnail: any;
  inputs = document.getElementById('myMonthInput');
  to_date: any;
  installment_month: any[];
  adv_amount: any;
  installmentAmount: any;
  installmentData: any;
  EpmolyeeId: any;
  adv_id: any;
  dep_id: any;
  getById_budget: any;
  dep_name: any;
  constructor(
   
    private toast: ToastrService,
   private department_budget:DepartmentBudgetService,
    private router: Router,

    private activateRoute:ActivatedRoute
  ) {
    this.department_budget_form = new FormGroup({
      budget_approved_by: new FormControl('', [Validators.required]),
      budget_approved_empId: new FormControl('', [Validators.required]),
      //
      department_name: new FormControl('', [Validators.required]),
      budget_amount: new FormControl(''),
      from_date: new FormControl('', [Validators.required]),
      to_date: new FormControl(''),
    });
    this.activateRoute.queryParams.subscribe((res:any)=>{
      this.dep_name=res.dept_name,
      this.dep_id=res.dept_id,
      this.getByID(this.dep_name);
    })
  }


  fromDate(e: any) {
    this.FromDate = moment(e.value).format('YYYY-MM-DD');
  }
  ngOnInit() {
  
  }

  getByID(dept_name:any){
    const data={
      dept_name:dept_name
    }
    this.department_budget.getByIdDepartments(data).subscribe((res:any)=>{
      console.log(res,"get by id");
      this.getById_budget=res.data
      this.department_budget_form.patchValue({
        department_name:this.getById_budget.department_name,
        budget_amount:this.getById_budget.budget_amount,
        from_date:this.getById_budget.from_date,
        to_date:this.getById_budget.to_date

       })
    })
  }
 

  get CFU_1(): any { return this.department_budget_form.controls };
  onFileChange(event: any) { 
  }
  onCreate() {
    this.department_budget_form.controls['budget_approved_by'].patchValue(this.loginUserName)
    this.department_budget_form.controls['budget_approved_empId'].patchValue(this.loginUserId)

    console.log(this.department_budget_form.value);
    const data=this.department_budget_form.value
        this.department_budget.editDepartment_budget(this.dep_id,data).subscribe((res: any) => {
      
    },
    error => {
      this.toast.error("Somthing wents wrong..")
    },
    () => {
      this.toast.success("Successfully Created..")
      this.router.navigate(['master/itticket/purchase-inventory/department-budget'])
    })
    // console.log(this.department_budget_form);
    // const arr: any = []
    // for (let a = 0; a < this.installment_month.length; a++) {
    //   arr.push(
    //     { month: this.installment_month[a], installment: this.installmentAmount, status: "DUE PAYMENT" }
    //   )
    // }
    // this.installmentData = arr;
    // let ins:any=[]
    // for(let a=0;a<this.department_budget_form.value.installment_duration.length;a++){
    //   ins[a]={month:'jan',installment:6000,installment_status:'DUE PAYMENT'}
    // }
    // const data: any = {
    //   employee_name: this.department_budget_form.value.authorName,
    //   employee_code: this.department_budget_form.value.employee_code,
    //   budget_amount: this.department_budget_form.value.budget_amount,
    //   department: this.department_budget_form.value.category,
    //   installment_duration: this.department_budget_form.value.installment_duration,
    //   created_by: this.department_budget_form.value.created_by,
    //   to_date:this.department_budget_form.value.to_date,
    //   from_date: (this.installmentData),
    //   employee_id: this.EpmolyeeId,
    //   description: this.department_budget_form.value.description
    // }
    // console.log(data,"dddd");
    // this.hrService.createAdvancePayment(data).subscribe((res: any) => {
      
    // },
    // error => {
    //   this.toast.error("Somthing wents wrong..")
    // },
    // () => {
    //   this.toast.success("Successfully Created..")

    // })

  }

  // seePreview(path: string, imagePath: any) {
  //   if (!this.imagePath) {
  //     if (path) {
  //       Swal.fire({
  //         imageUrl: path,
  //         imageHeight: 250,
  //         imageAlt: 'Profile Image',
  //         confirmButtonColor: "#8B817D",
  //         confirmButtonText: 'Ok',
  //       })
  //     }
  //   } else {
  //     Swal.fire({
  //       imageUrl: imagePath,
  //       imageHeight: 250,
  //       imageAlt: 'Profile Image',
  //       confirmButtonColor: "#8B817D",
  //       confirmButtonText: 'Ok',
  //     })
  //   }
  // };

  getNextThreeMonths(dateString: any, d: any) {
    const currentDate = new Date(dateString);

    const result = [];

    for (let i = 0; i < d; i++) {
      const nextMonth = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth() + i,
        1
      );

      result.push(
        new Intl.DateTimeFormat('en-US', { month: 'long', year: 'numeric' }).format(
          nextMonth
        )
      );
    }

    return result;
  }
  kj() {
    

    this.to_date = this.department_budget_form.value.to_date

  }

  MonthCount(e: any, d: AnyObject) {
    const inputDate = e;
    const nextThreeMonths = this.getNextThreeMonths(inputDate, d);
    
    this.installment_month = nextThreeMonths
  }
  MonthCount2(e: any) {
    
    var d = this.department_budget_form.value.installment_duration
    this.MonthCount(this.to_date, d)
    this.adv_amount = this.department_budget_form.value.budget_amount
    
    this.installmentAmount = this.adv_amount / Number(this.department_budget_form.value.installment_duration)
    
    const monthwiseInstallment: any = [];
    monthwiseInstallment.push({
      month_year: this.installment_month,
      installment_amount: this.installmentAmount
    })
    


  }
  budget_amount(e: any) {

    
    this.adv_amount = this.department_budget_form.value.budget_amount

  }
  Skip(){

  }
}
