import { Component, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { LmsServiceService } from 'src/app/@shared/services/lms-service.service';
import * as moment from 'moment';
import { Toast, ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { HrServiceService } from 'src/app/@shared/services/hr-service.service';
import Swal from 'sweetalert2';
import { AnyObject } from 'chart.js/dist/types/basic';
@Component({
  selector: 'app-advance-payment-create',
  templateUrl: './advance-payment-create.component.html',
  styleUrls: ['./advance-payment-create.component.scss']
})
export class AdvancePaymentCreateComponent {
  Login_user_id: any = localStorage.getItem('signInUser');
  loginUserId: any = JSON.parse(this.Login_user_id).employee_id
  loginUserName: any = JSON.parse(this.Login_user_id).first_name

  nameSearch: any = ''
  // **************************Ok code End************************************
  uploadDoc: any = [];
  fileList: any;
  getName: any;
  autherCode: any;
  fileAuth: any;
  dat: any;
  advancePaymentCreate: FormGroup;
  getName2: any;
  newName: any;
  val: any;
  categoriesData: any;
  regionData: any;
  userNamePatch: any = "Employee Name";
  custonDropdown = new FormControl();
  authorName = new FormControl();
  filteredOptions: Observable<Array<any>>;
  optionItems: Array<any>;
  fileExe: any;
  fileChose: any;
  imageToUpload: any;
  imagePath: any;
  pdfFile: any = "../../../../../../../assets/icons/pdfimg.png"
  docFile: any = "../../../../../../../assets/icons/docimg.png";
  pngFile: any = '/assets/icons/exc3.png';
  imagePath_2: any;
  LoginGetData: any;

  emp_id: any;
  FromDate: string;
  uploadThumbnail: any;
  inputs = document.getElementById('myMonthInput');
  installment_start_date: any;
  installment_month: any[];
  adv_amount: any;
  installmentAmount: any;
  installmentData: any;
  EpmolyeeId: any;
  adv_id: any;
  getAdv_byID: any;
  button_type: string="Submit";
  show: string='a';
  // data:any = [{name:'vinay',id:1},{name:'raju',id:2},{name:'ashu',id:3}];
  constructor(
    private _location: Location,
    private toast: ToastrService,
    private _lmsService: LmsServiceService,
    private router: Router,
    private hrService: HrServiceService,
    private activateRoute:ActivatedRoute

  ) {
    this.advancePaymentCreate = new FormGroup({
      authorName: new FormControl('', Validators.required),
      employee_code: new FormControl(''),
      advance_amount: new FormControl(''),
      category: new FormControl('', [Validators.required]),
      installment_duration: new FormControl('', [Validators.required]),
      created_by: new FormControl('', [Validators.required]),
      installment_start_date: new FormControl(''),
      description: new FormControl(''),
    });
    this.activateRoute.queryParams.subscribe((res:any)=>{
      this.adv_id=res.id
      if(this.adv_id){
        this.getById_AdvPayment(this.adv_id);
        this.button_type="Update"
      }
    })
  }
  getById_AdvPayment(adv_id:any){
    this.show='b'
    this.hrService.getById_AdvPayment(adv_id).subscribe((res:any)=>{
      this.installment_month=res.data?.installment_data
      this.getAdv_byID=res.data;
      console.log(this.getAdv_byID,"res hgh");
      this.getName=[];
      this.getName={
        fullName:this.getAdv_byID.employee_name,
      }
      console.log(this.getName,"get name");
      
      this.getName=this.getAdv_byID.employee_name
      // this.nameSearch=this.getAdv_byID.employee_name
      this.advancePaymentCreate.patchValue({
        authorName: this.getAdv_byID.employee_name,
        employee_code: this.getAdv_byID.employee_code,
        advance_amount: this.getAdv_byID.advance_amount,
        category: this.getAdv_byID.department,
        created_by: this.getAdv_byID.created_by,
        installment_data: this.installmentData,
        employee_id: this.EpmolyeeId,
        description: this.getAdv_byID.description,
        installment_start_date:this.getAdv_byID.installment_start_date

      })
    })
    setTimeout(() => {
      this.advancePaymentCreate.controls['installment_duration'].patchValue(this.getAdv_byID.installment_duration)
      
    }, 200);
  }

  fromDate(e: any) {
    this.FromDate = moment(e.value).format('YYYY-MM-DD');
  }
  ngOnInit() {
    this.getAuther();
    this.disableFields();
    // this.getCategories();
    this.getRegion();
    this.loginUserGetData();
  }


  loginUserGetData() {
    
    this.advancePaymentCreate.controls['created_by'].setValue(this.loginUserName);
  }
  get CFU_1(): any { return this.advancePaymentCreate.controls };
  onFileChange(event: any) {
    
  }
  onCreate() {
    console.log(this.advancePaymentCreate.status);
if(this.advancePaymentCreate.status=="INVALID"){
  this.toast.error("All fields are required")

}else{
  const arr: any = []
  for (let a = 0; a < this.installment_month.length; a++) {
    arr.push(
      { month: this.installment_month[a], installment: this.installmentAmount, status: "DUE PAYMENT" }
    )
  }
  this.installmentData = arr;
  let ins:any=[]
  for(let a=0;a<this.advancePaymentCreate.value.installment_duration.length;a++){
    ins[a]={month:'jan',installment:6000,installment_status:'DUE PAYMENT'}
  }
  const data: any = {
    employee_name: this.advancePaymentCreate.value.authorName,
    employee_code: this.advancePaymentCreate.value.employee_code,
    advance_amount: this.advancePaymentCreate.value.advance_amount,
    department: this.advancePaymentCreate.value.category,
    installment_duration: this.advancePaymentCreate.value.installment_duration,
    created_by: this.advancePaymentCreate.value.created_by,
    installment_start_date:this.advancePaymentCreate.value.installment_start_date,
    installment_data: (this.installmentData),
    employee_id: this.EpmolyeeId,
    description: this.advancePaymentCreate.value.description
  }
  console.log(data,"dddd");
  this.hrService.createAdvancePayment(data).subscribe((res: any) => { 
  },
  error => {
    this.toast.error("Somthing wents wrong..")
  },
  () => {
    this.router.navigate(['master/hrms/payroll/advance-payment'])
    this.toast.success("Successfully Created..")
  })
  const input = document.getElementById('ss');
}
  }
  cancel() {
  }
  back() {
  }
  Skip() {
  }
  getAuther() {
    this._lmsService.getAutherName().subscribe((res: any) => {
      this.getName = res?.data;   
    }
      , (err) => {
        this.toast.error("Somthing went wrong", "ERROR")
      })
  }
  get CF_1(): any { return this.advancePaymentCreate.controls };

  getByAutherCode(id: any) {
    this._lmsService.getByAuther(id).subscribe((res: any) => {
      this.autherCode = res.data[0];
      this.EpmolyeeId = res.data[0].employee_id   
      this.emp_id = Number(res.data[0].employee_id);
      this.advancePaymentCreate.patchValue({
        authorName: this.autherCode?.fullName,
        employee_code: this.autherCode?.employee_code,
        segment_suv: this.autherCode?.segment_suv,
        category: this.autherCode?.department,
      })
    })
  }
  disableFields() {
  }

  getRegion() {
    this._lmsService.getRegion().subscribe((res: any) => {
      this.regionData = res.data;
    })
  }
  onPanelClose() {
    this.authorName.setValue('');
  }


  advancePaymentDocument(e: any) {
    if (e.target.files && e.target.files[0]) {
      const data: FileList = e.target.files;
      this.uploadThumbnail = data.item(0) || null;
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imagePath = e.target.result;
      };
      reader.readAsDataURL(this.uploadThumbnail);
    }
  }

  seePreview(path: string, imagePath: any) {
    if (!this.imagePath) {
      if (path) {
        Swal.fire({
          imageUrl: path,
          imageHeight: 250,
          imageAlt: 'Profile Image',
          confirmButtonColor: "#8B817D",
          confirmButtonText: 'Ok',
        })
      }
    } else {
      Swal.fire({
        imageUrl: imagePath,
        imageHeight: 250,
        imageAlt: 'Profile Image',
        confirmButtonColor: "#8B817D",
        confirmButtonText: 'Ok',
      })
    }
  };
  dates(e: any) {

  }
  getNextThreeMonths(dateString: any, d: any) {
    // Create a new Date object using the provided date string
    const currentDate = new Date(dateString);
    // Initialize an array to store the result
    const result = [];
    // Loop three times to get the next three months
    for (let i = 0; i < d; i++) {
      // Get the next month by adding one to the current month
      const nextMonth = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth() + i,
        1
      );
      // Push the formatted month and year to the result array
      result.push(
        new Intl.DateTimeFormat('en-US', { month: 'long', year: 'numeric' }).format(
          nextMonth
        )
      );
    }
    return result;
  }
  kj() {
    this.installment_start_date = this.advancePaymentCreate.value.installment_start_date
    // this.advancePaymentCreate.value.installment_duration.reset();
  }

  MonthCount(e: any, d: AnyObject) {
    const inputDate = e;
    const nextThreeMonths = this.getNextThreeMonths(inputDate, d);
    this.installment_month = nextThreeMonths
  }
  MonthCount2(e: any) {
    var d = this.advancePaymentCreate.value.installment_duration
    this.MonthCount(this.installment_start_date, d)
    this.adv_amount = this.advancePaymentCreate.value.advance_amount
    this.installmentAmount = this.adv_amount / Number(this.advancePaymentCreate.value.installment_duration)
    const monthwiseInstallment: any = [];
    monthwiseInstallment.push({
      month_year: this.installment_month,
      installment_amount: this.installmentAmount
    })
  }
  advancePaymentAmount(e: any) {
     this.adv_amount = this.advancePaymentCreate.value.advance_amount
  }
}
