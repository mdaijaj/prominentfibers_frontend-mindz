import { Component, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, Subscriber } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { LmsServiceService } from 'src/app/@shared/services/lms-service.service';
import * as moment from 'moment';
import { Toast, ToastrService } from 'ngx-toastr';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { DMSService } from 'src/app/@shared/services/dms.service';
import { ThirdPartyDraggable } from '@fullcalendar/interaction';
import { log } from 'console';
import { HrServiceService } from 'src/app/@shared/services/hr-service.service';
import { MatDatepicker } from '@angular/material/datepicker';


@Component({
  selector: 'app-employee-bonus-create',
  templateUrl: './employee-bonus-create.component.html',
  styleUrls: ['./employee-bonus-create.component.scss'],


})
export class EmployeeBonusCreateComponent {
  @ViewChild('picker') datePickerElement = MatDatepicker;
  date = new FormControl(moment());
  setFileSize: any;
  imagePath: any;
  setText: any = "no choose file";
  selectedFile: any = null;
  fileFormat: any
  getCategory: any
  getRegion: any
  getBranch: any
  getMultiUser: any
  getName: any
  createSchedule: any
  filterUsers: Observable<string[]>;
  multiUsers: string[] = [];
  newArray: any[] = [];
  isChecked: boolean;
  public cellValue: any;
  trainingFormData: any;
  upload_material: any;
  multiUserName: any
  dropdownList: any = [];
  selectedItems: any = [];
  dropdownSettings: IDropdownSettings;
  id: any;
  Re_id: any;
  getbyIDdata: any;
  file: File;
  button_value: string = "Save";
  patch_value: any;
  key: any;
  disable: boolean;
  Co_id: any;
  fileView: any;
  public valueDate = new Date();
  current_Date: string;
  CSVfileView: any;
  Login_user_id: any = localStorage.getItem('EmpMainId');
  LoginGetData: any;
  loginEmployeeData: any;
  getAuthorData: any;
  getUserData: any;
  FromDate: any;
  toDate: any;
  trainingID: any;
  getUserAsPerCategorys: any;
  categoryValue: any;
  getAllUserByIDs: any;
  epmData: any = [];
  U_data: any[];
  bonus_id: any;
  getbyIDdataByBonus: any;
  isNameDisabled: boolean=true;
  constructor(private fb: FormBuilder,
    private activateRoute: ActivatedRoute,
    private toast: ToastrService,
    public dialog: MatDialog,
    private _lmsService: LmsServiceService,
    private router: Router,
    private _location: Location,
    private hrServies: HrServiceService,
    private location: Location

  ) {
    this.training_schedule_function();
    this.activateRoute.queryParams.subscribe(
      (res: any) => {
        this.bonus_id = res.id
      

        for (this.key in res) {

        }

      })

    this.getSingledata();
    if (this.key == "reschedule_id") {
      this.Reschedule_disable_patch_value();
    }

  }
  MultipleUserValue(e: any) {

  }
  getSingledata() {

    if (this.bonus_id) {
      this.button_value = "Update"
      this.hrServies.getBonusByID(this.bonus_id).subscribe((res1: any) => {

        this.getbyIDdata = res1?.data;
        this.getbyIDdataByBonus = res1?.data;
        let UserID: any = [];

        for (let a = 0; a < this.getbyIDdataByBonus.add_multiplr_user.length; a++) {
          UserID.push(this.getbyIDdataByBonus.add_multiplr_user[a].employee_id)
        }


        this.multipleUserByCategoryPatch(this.getbyIDdata.user_category);
        let empId: any = [];
        // for (let item of this.getbyIDdata.add_user) {
        //   empId.push({ employee_id: item.employee_id })
        // }
        // for (let user of empId) {
        //   UserID.push(user.employee_id)
        // }
        // 
        // 
        // 
        this.patch_value = this.createSchedule.patchValue({
          department: this.getbyIDdataByBonus.department,
          BonusType: this.getbyIDdataByBonus.BonusType,
          bonus_amount: this.getbyIDdataByBonus.bonus_amount,
          bonus_date: this.getbyIDdataByBonus.bonus_date,
          description: this.getbyIDdataByBonus.description,
          add_multiplr_user: UserID,
        })

      })
    }

    this.getCategoryPatchTime();

  }

  Reschedule_disable_patch_value() {
    this.disable = true
    this.createSchedule.controls['category'].disable();
    this.createSchedule.controls['course_name'].disable();
    this.createSchedule.controls['mode'].disable();
    this.createSchedule.controls['branch_name'].disable();
    this.createSchedule.controls['region'].disable();
    this.createSchedule.controls['venue'].disable();
    this.createSchedule.controls['add_user'].disable();
    this.createSchedule.controls['upload_material'].disable();
  }

  training_schedule_function() {
    this.createSchedule = this.fb.group({
      department: new FormControl(null, [Validators.required]),
      bonus_date: new FormControl(null, [Validators.required]),
      bonus_amount: new FormControl(null, [Validators.required]),
      BonusType: new FormControl(null, [Validators.required]),
      description: new FormControl(null, [Validators.required]),
      add_multiplr_user: new FormControl(null, [Validators.maxLength(10)]),
    });
    // this.createSchedule.get(add_multiplr_user).disable();
    
  }
  get f() {
    return this.createSchedule.controls;
  }

  ngOnInit() {
  this.createSchedule.get('add_multiplr_user')?.disable();
  this.getData();
    this.getCategoryDropDown();
    this.getBranchDropDown();
    this.getRegionDropDown();
    this.getUserListDropDown();
    this.getAuthorListDropDown();



    this.dropdownSettings = {
      singleSelection: false,

      selectAllText: undefined,
      unSelectAllText: undefined,
      itemsShowLimit: 3,
      allowSearchFilter: true,
      enableCheckAll: false,
      tooltipField: 'item_tooltip',
    };

    // setTimeout(() => {
    //   this.datePickerElement['_datepickerInput']._dateFormats = {
    //     parse: {
    //       dateInput: 'LL',
    //     },
    //     display: {
    //       dateInput: 'MMMM YYYY',
    //       monthYearLabel: 'MMMM YYYY',
    //     },
    //   };
    // }, 1000)
    // this.isNameDisabled = true;
   

  }
  goBack() {
    this.location.back();
  }
  getAllUserByID() {
    this._lmsService.GetByUserId(this.id)
      .subscribe((res) => {
        this.getAllUserByIDs = res.data


      })
  }
  getData(): void {
    let tmp: any = [];
    this._lmsService.multiUserList().subscribe((data: any) => {


      // this.http.get<any>('https://jsonplaceholder.typicode.com/users').subscribe((data:any) => {
      for (let i = 0; i < data.data.length; i++) {
        tmp.push(data.data[i].fullName);
      }
      this.dropdownList = tmp;
    });
  }
  reloadCurrentRoute() {
    let currentUrl = this.router.url;
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([currentUrl]);
    });
  }



  getCategoryDropDown() {
    this._lmsService.categoryList().subscribe((res: any) => {
      this.getCategory = res.data

    })
  }

  getBranchDropDown() {
    this._lmsService.branchList().subscribe((res: any) => {
      this.getBranch = res.data

    })
  }

  getRegionDropDown() {
    this._lmsService.regionList().subscribe((res: any) => {
      this.getRegion = res.data


    })
  }
  getAuthorListDropDown() {
    this._lmsService.scheduleTrainingAuthorList().subscribe((res: any) => {
      this.getAuthorData = res.data


    })
  }
  getUserListDropDown() {
    this._lmsService.scheduleTrainingUserList().subscribe((res: any) => {
      this.getUserData = res?.data

      for (var i = 0; i < this.getUserData.length; i++) {
        this.newArray.push(this.getUserData[i].employee_user_name)
      }
    })

  }

  onFileChange(event: any) {

    let fileData: FileList = event.target.files;
    this.upload_material = fileData.item(0);

  }
  multipleUser(e: any) {
    this.epmData = e.value

    // this.epmData.push({
    //   employee_id:filterData.employee_id,
    //     First_Name:filterData.fullName
    // });


  }

  submit(val: any) {


    if (this.bonus_id) {
      let allData = []

      for (let id of val.value.add_multiplr_user) {
        for (let data of this.getUserAsPerCategorys) {
          if (data.employee_id === id) {
            allData.push(data)
          }
        }
      }
      this.U_data = allData


      const data = {
        add_multiplr_user: this.U_data,
        bonus_amount: val.value.bonus_amount,
        bonus_date: val.value.bonus_date,
        BonusType: val.value.BonusType,
        department: val.value.department,
        description: val.value.description,
      }
      this.hrServies.updateBonus(this.bonus_id, data).subscribe((res: any) => {


      },
        error => {
          // Handle error
          this.toast.error("somthing wents wrong")
        },
        () => {
          // Handle completion
          // alert('Subscription completed');
          this.router.navigate(['master/hrms/payroll/bonus'])

        }

      )
    }
    else {
      let allData = []

      for (let id of this.epmData) {
        for (let data of this.getUserAsPerCategorys) {
          if (data.employee_id === id) {
            allData.push(data)
          }
        }
      }
      this.U_data = allData


      const data = {
        add_multiplr_user: this.U_data,
        bonus_amount: val.value.bonus_amount,
        bonus_date: val.value.bonus_date,
        BonusType: val.value.BonusType,
        department: val.value.department,
        description: val.value.description,
      }
      this.hrServies.createBonus(data).subscribe((res: any) => {

      },
        error => {
          // Handle error
          this.toast.error("somthing wents wrong")
        },
        () => {
          this.router.navigate(['master/hrms/payroll/bonus'])
          this.toast.success("Bonus Create successfully..")
        })
    }
  }




  back() {
    this._location.back();
  }

  fromDate(e: any) {
    this.FromDate = moment(e.value).format('YYYY-MM-DD');
  }
  ToDate(e: any) {
    this.toDate = moment(e.value).format('YYYY/MM/DD');

  }

  getCategoryPatchTime() {
    this.getAllUserByCategory();
  }
  getCategoryFun(e: any) {
    this.createSchedule.get('add_multiplr_user')?.enable();


    if (e.value == 'selectAll') {
      this.getAllUserByCategory()

    }
    else {

      this.categoryValue = e.value
      this.getUserAsPerCategory();
    }
  }

  multipleUserByCategoryPatch(e: any) {
    // this._lmsService.getUserByCategory(e).subscribe((res:any)=>{
    //   this.getUserAsPerCategorys=res.data
    //   
    // })
  }

  getUserAsPerCategory() {
    this._lmsService.getUserByCategory(this.categoryValue).subscribe((res: any) => {
      this.getUserAsPerCategorys = res.data
      let user_data: any = [];
      for (let a = 0; a < this.getUserAsPerCategorys.length; a++) {
        this.getUserAsPerCategorys[a].employee_id = this.getUserAsPerCategorys[a].employee_id
        this.getUserAsPerCategorys[a].fullName = this.getUserAsPerCategorys[a].first_name


      }

    })
  }
  getAllUserByCategory() {
    this._lmsService.getAllUserByCategory().subscribe((res: any) => {
      this.getUserAsPerCategorys = res.data

    })
  }

  kj() {


    //   

    //   this.installment_start_date=this.advancePaymentCreate.value.installmentStartDate
    //  this.advancePaymentCreate.value.installment_duration.reset();

  }
}
