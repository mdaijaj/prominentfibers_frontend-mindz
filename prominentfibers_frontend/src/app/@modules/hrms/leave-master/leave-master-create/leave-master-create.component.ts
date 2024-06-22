import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatOption } from '@angular/material/core';
import { MatSelect } from '@angular/material/select';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HrServiceService } from 'src/app/@shared/services/hr-service.service';

@Component({
  selector: 'app-leave-master-create',
  templateUrl: './leave-master-create.component.html',
  styleUrls: ['./leave-master-create.component.scss']
})
export class LeaveMasterCreateComponent {
  @ViewChild('select') select: MatSelect;
  @ViewChild('roleSelect') roleSelect: MatSelect;
  @ViewChild('empSelect') empSelect: MatSelect;
  leaveMasterForm: FormGroup;
  optionalLabelTextChoices: string[] = ['Option 1', 'Option 2', 'Option 3'];
  hourse: any = ['0.5 Hours', '1 Hours', '2 Hours', '3 Hours', '4 Hours', '5 Hours', '6 Hours', '7 Hours', '8 Hours', '9 Hours', '10 Hours']
  timeList: any = ['12:00 AM', '12:15 AM', '12:30 AM', '12:45 AM', '1:00 AM', '1:15 AM', '1:30 AM', '1:45 AM', '2:00 AM', '2:15 AM', '2:30 AM', '2:45 AM', '3:00 AM', '3:15 AM', '3:30 AM', '3:45 AM', '4:00 AM', '4:15 AM', '4:30 AM', '4:45 AM', '5:00 AM', '5:15 AM', '5:30 AM', '5:45 AM', '6:00 AM', '6:15 AM', '6:30 AM', '6:45 AM', '7:00 AM', '7:15 AM', '7:30 AM', '7:45 AM', '8:00 AM', '8:15 AM', '8:30 AM', '8:45 AM', '9:00 AM', '9:15 AM', '9:30 AM', '9:45 AM', '10:00 AM', '10:15 AM', '10:30 AM', '10:45 AM', '11:00 AM', '11:15 AM', '11:30 AM', '11:45 AM', '12:00 PM', '12:15 PM', '12:30 PM', '12:30 PM', '12:45 PM', '1:00 PM', '1:15 PM', '1:30 PM', '1:30 PM', '1:45 PM', '2:00 PM', '2:15 PM', '2:30 PM', '2:45 PM', '3:00 PM', '3:15 PM', '3:30 PM', '3:45 PM', '4:00 PM', '4:15 PM', '4:30 PM', '4:45 PM', '5:00 PM', '5:15 PM', '5:30 PM', '5:45 PM', '6:00 PM', '6:15 PM', '6:30 PM', '6:30 PM', '6:45 PM', '7:00 PM', '7:15 PM', '7:30 PM', '7:45 PM', '8:00 PM', '8:15 PM', '8:30 PM', '8:45 PM', '9:00 PM', '9:15 PM', '9:30 PM', '9:45 PM', '10:00 PM', '10:15 PM', '10:30 PM', '10:45 PM', '11:00 PM', '11:15 PM', '11:30 PM', '11:45 PM']
  EntitlementForm: FormGroup;
  styles: boolean = false;
  prorate: boolean = false;
  reset: boolean = false;
  credit: boolean = false;
  openingBalanceState: boolean = false;
  maximumBalanceState: boolean = false;
  noOfDay: number;
  filteredOptions: any[] = [];
  Department = [

  ]
  id: any;
  leavePolicyId: any;
  singleLeaveData: any;
  EmpListData: any;
  nameSearch: any = '';
  roleData: any;
  depData: any;
  todate: any;
  accuralField: any;
  openingBalField: any;
  maximumBalField: any;
  prorateField: any;
  creditLeaveField: any;
  resetField: any;
  Gender: any;
  male: boolean;
  Both: boolean;
  Female: boolean;
  maritalSt: any;
  Single: boolean;
  Married: boolean;
  MaritalBoth: boolean;
  MaxLeaveAllowedCheck: any;
  LeaveSubmittedBeforeChek: boolean;
  duration: any;
  FullDay: boolean;
  HalfDay: boolean;
  QuarterDay: boolean;
  Hourly: boolean;
  companyDisable: any;

  public leaveList = [
    { name: "Earned Leaves (EL)" },
    { name: "Sick Leave (SL)" },
    { name: "Casual Leave (CL)" },
    { name: "Manternity Leave (ML)" }

  ]

  public leaveType = [
    { name: "Paid" },
    { name: "Unpaid" },
    { name: "Full Time" },
    { name: "Part Time" },

  ]

  public acLeaveType = [
    { value: "OneTime" },
    { value: "Monthly" },
    { value: "Yearly" },
    { value: "Yearly" },
    { value: "HalfYearly" },
    { value: "Triannually" },
    { value: "Quarterly" },
    { value: "Bimonthly" }
  ]

  public month = [
    { value: "January" },
    { value: "February" },
    { value: "March" },
    { value: "April" },
    { value: "May" },
    { value: "June" },
    { value: "July" },
    { value: "August" },
    { value: "September" },
    { value: "October" },
    { value: "November" },
    { value: "December" },
    { value: "PolicyMonth" },
    { value: "JoiningMonth" },
    { value: "BirthMonth" }
  ]

  public acleave = [
    { value: "1st" },
    { value: "2nd" },
    { value: "3rd" },
    { value: "4th" },
    { value: "5th" },
    { value: "6th" },
    { value: "7th" },
    { value: "8th" },
    { value: "9th" },
    { value: "10th" },
    { value: "11th" },
    { value: "12th" },
    { value: "13th" },
    { value: "14th" },
    { value: "15th" },
    { value: "16th" },
    { value: "17th" },
    { value: "18th" },
    { value: "19th" },
    { value: "20th" },
    { value: "21st" },
    { value: "22nd" },
    { value: "23rd" },
    { value: "24th" },
    { value: "25th" },
    { value: "26th" },
    { value: "27th" },
    { value: "28th" },
    { value: "29th" },
    { value: "30th" },
    { value: "31st" },
    { value: "PolicyDate" },
    { value: "LastDay" },
    { value: "Birthday" },
    { value: "JoiningDate" },
  ]
  clubVal: boolean = false;
  companyData: any;
  clubValYes: boolean;
  clubValNo: boolean;
  On_Date: any;

  AllLeaveTypes_list: any;
  loginUser: any;



  constructor(private route: Router, private fb: FormBuilder,
    private hrServies: HrServiceService, private toast: ToastrService,
    private activeroute: ActivatedRoute) {
    this.leaveMasterForm = this.fb.group({
      leaveName: new FormControl(null, [Validators.required]),
      leaveType: new FormControl(null, [Validators.required]),
      leaveCount: new FormControl(null),
      leaveUnit: new FormControl(null, [Validators.required]),
      description: new FormControl(null, [Validators.required]),
      fromDate: new FormControl(null, [Validators.required]),
      toDate: new FormControl(null),

      onDate: new FormControl(null),
      startTime: new FormControl(null),
      no_of_hours: new FormControl(null),

      leaveCountDays: new FormControl(''),
      resetLeave: new FormControl(null),
      creditLeave: new FormControl(null),
      prorate_leave: new FormControl(null),
      isClub: new FormControl(false),
      clubValue: new FormControl(''),
      openingBalance: new FormControl(null),
      maximumBalance: new FormControl(null),
      applicableGender: new FormControl(null),
      applicableMaritalStatus: new FormControl(''),
      emp_Name: new FormControl(''),
      role_Name: new FormControl(''),
      department1: new FormControl(''),
      isAcl: new FormControl(false),
      aclLeaveType: new FormControl(''),
      aclLeaveOn: new FormControl(''),
      aclLeaveMonth: new FormControl(''),


      // 

      isRstl: new FormControl(false),
      rstlLeaveType: new FormControl(''),
      rstlLeaveOn: new FormControl(''),
      rstlLeaveMonth: new FormControl(''),
      rstlCarryFwdValue: new FormControl(''),
      rstlCarryFwdUnit: new FormControl(''),
      rstlEncashmentValue: new FormControl(''),
      rstlEncashmentUnit: new FormControl(''),

      isCtrl: new FormControl(false),
      ctrlLeaveType: new FormControl(''),
      ctrlLeaveOn: new FormControl(''),
      ctrllLeaveMonth: new FormControl(''),

      isPrl: new FormControl(false),
      prlLeaveOn: new FormControl(''),
      prlLeaveMonth: new FormControl(''),

      isOpnBl: new FormControl(false),
      opnBlValue: new FormControl(''),

      isMxBl: new FormControl(false),
      mxBlValue: new FormControl(''),

      leavePolicyDepartments: new FormControl(''),
      leavePolicyRoles: new FormControl(''),
      leavePolicyEmployees: new FormControl(''),

      isCntLeaveBtwWk: new FormControl(false),
      cntLeaveBtwWk: new FormControl(''),

      isCntLeaveBtwHld: new FormControl(false),
      cntLeaveBtwHld: new FormControl(''),

      isLeaveExcide: new FormControl(false),
      DurationAllowed: new FormControl(''),
      MaxLeaveAllowed: new FormControl(''),
      LeaveSubmittedBefore: new FormControl(''),
      department_name: new FormControl(''),
      role_master_name: new FormControl(''),
      employee: new FormControl(''),
      companyName: new FormControl(''),
    })

  }

  ngOnInit() {
    this.activeroute.queryParams.subscribe((params: any) => {
      this.id = params;
      
      this.leavePolicyId = params.leavePolicyId;
      
    });

    let lg: any = localStorage.getItem('signInUser')
    this.loginUser = JSON.parse(lg);

    this.getAllLeaveTypes();
    if (this.leavePolicyId) {
      this.getEmpList();
      this.getRoleList();
      this.getDepList()
      this.companyDisable = this.leavePolicyId ? true : false;
      this.leaveMasterForm.value.isCtrl ? this.styles = true : false;
      this.hrServies.leaveGetById(this.leavePolicyId).subscribe((res: any) => {
        this.singleLeaveData = res.data;
        this.On_Date = this.singleLeaveData.leaveUnit
        this.accuralField = this.singleLeaveData?.accrualLeave[0]?.isAcl;
        this.resetField = this.singleLeaveData?.resetLeave[0]?.isRstl;
        this.creditLeaveField = this.singleLeaveData?.creditLeave[0]?.isCtrl;
        this.prorateField = this.singleLeaveData?.prorateLeave[0]?.isPrl;
        this.openingBalField = this.singleLeaveData?.openingBalance[0]?.isOpnBl;
        this.maximumBalField = this.singleLeaveData?.maximumBalance[0]?.isMxBl;
        this.Gender = this.singleLeaveData.applicableGender,
          this.male = this.Gender == 'male' ? true : false;
        this.Female = this.Gender == 'Female' ? true : false;
        this.Both = this.Gender == 'Both' ? true : false;
        this.maritalSt = this.singleLeaveData.applicableMaritalStatus,
          this.Single = this.maritalSt == 'Single' ? true : false;
        this.Married = this.maritalSt == 'Married' ? true : false;
        this.MaritalBoth = this.maritalSt == 'Both' ? true : false;
        this.MaxLeaveAllowedCheck = this.singleLeaveData?.MaxLeaveAllowed ? true : false,
          this.LeaveSubmittedBeforeChek = this.singleLeaveData?.LeaveSubmittedBefore ? true : false,
          this.duration = this.singleLeaveData.DurationAllowed,
          this.FullDay = this.duration == 'Full Day' ? true : false;
        this.HalfDay = this.duration == 'Half Day' ? true : false;
        this.QuarterDay = this.duration == 'Quarter Day' ? true : false;
        this.Hourly = this.duration == 'Hourly' ? true : false;
        // let clubdata = this.singleLeaveData.club
        // this.clubVal = clubdata[0].clubValue == '' ? false : true,
          // this.clubValYes = clubdata[0].clubValue == 'yes' ? true : false,
          // this.clubValNo = clubdata[0].clubValue == 'no' ? true : false,

          
        this.leaveMasterForm.patchValue({
          leaveName: this.singleLeaveData.leave_id,
          zone_name: this.singleLeaveData.zone_name,
          leaveUnit: this.singleLeaveData.leaveUnit,
          leaveType: this.singleLeaveData.leaveType,
          leaveCountDays: this.singleLeaveData.leaveCount,
          fromDate: this.singleLeaveData.fromDate,
          toDate: this.singleLeaveData.toDate,
          onDate: this.singleLeaveData.on_date,
          startTime: this.singleLeaveData.start_time,
          no_of_hours: this.singleLeaveData.number_of_hours,

          description: this.singleLeaveData.description,
          isAcl: this.singleLeaveData?.accrualLeave[0]?.isAcl,
          aclLeaveType: this.singleLeaveData?.accrualLeave[1]?.aclLeaveType,
          aclLeaveOn: this.singleLeaveData?.accrualLeave[2]?.aclLeaveOn,
          aclLeaveMonth: this.singleLeaveData?.accrualLeave[3]?.aclLeaveMonth,

          isRstl: this.singleLeaveData?.resetLeave[0]?.isRstl,
          rstlLeaveType: this.singleLeaveData?.resetLeave[1]?.rstlLeaveType,
          rstlLeaveOn: this.singleLeaveData?.resetLeave[2]?.rstlLeaveOn,
          rstlLeaveMonth: this.singleLeaveData?.resetLeave[3]?.rstlLeaveMonth,
          rstlCarryFwdValue: this.singleLeaveData?.resetLeave[4]?.rstlCarryFwdValue,
          rstlCarryFwdUnit: this.singleLeaveData?.resetLeave[5]?.rstlCarryFwdUnit,
          rstlEncashmentValue: this.singleLeaveData?.resetLeave[6]?.rstlEncashmentValue,
          rstlEncashmentUnit: this.singleLeaveData?.resetLeave[7]?.rstlEncashmentUnit,

          isCtrl: this.singleLeaveData?.creditLeave[0]?.isCtrl,
          ctrlLeaveType: this.singleLeaveData?.creditLeave[1]?.ctrlLeaveType,
          ctrlLeaveOn: this.singleLeaveData?.creditLeave[2]?.ctrlLeaveOn,
          ctrllLeaveMonth: this.singleLeaveData?.creditLeave[3]?.ctrllLeaveMonth,

          isPrl: this.singleLeaveData?.prorateLeave[0]?.isPrl,
          prlLeaveOn: this.singleLeaveData?.prorateLeave[1]?.prlLeaveOn,
          prlLeaveMonth: this.singleLeaveData?.prorateLeave[2]?.prlLeaveMonth,

          isOpnBl: this.singleLeaveData?.openingBalance[0]?.isOpnBl,
          opnBlValue: this.singleLeaveData?.openingBalance[1]?.opnBlValue,

          isMxBl: this.singleLeaveData?.maximumBalance[0]?.isMxBl,
          mxBlValue: this.singleLeaveData?.maximumBalance[1]?.mxBlValue,

          applicableGender: this.singleLeaveData.applicableGender,
          applicableMaritalStatus: this.singleLeaveData.applicableMaritalStatus,
          leavePolicyDepartments: [this.singleLeaveData.leavePolicyDepartments],
          leavePolicyRoles: [this.singleLeaveData.leavePolicyRoles],
          leavePolicyEmployees: [this.singleLeaveData.leavePolicyEmployees],

          isCntLeaveBtwWk: this.singleLeaveData?.countAsLeaveBtWeekend[0]?.isCntLeaveBtwWk,
          cntLeaveBtwWk: this.singleLeaveData?.countAsLeaveBtWeekend[1]?.cntLeaveBtwWk,

          isCntLeaveBtwHld: this.singleLeaveData?.countAsLeaveBtHoliday[0]?.isCntLeaveBtwHld,
          cntLeaveBtwHld: this.singleLeaveData?.countAsLeaveBtHoliday[1]?.cntLeaveBtwHld,

          isLeaveExcide: this.singleLeaveData?.isLeaveExcide,
          DurationAllowed: this.singleLeaveData?.DurationAllowed,
          MaxLeaveAllowed: this.singleLeaveData?.MaxLeaveAllowed,
          LeaveSubmittedBefore: this.singleLeaveData?.LeaveSubmittedBefore,
          department_name: this.singleLeaveData?.department_name,
          role_master_name: this.singleLeaveData?.role_master_name,
          employee: this.singleLeaveData?.employee,
          companyName: this.singleLeaveData?.companyName,
        });
      })
    } else {
      
    }
    this.getEmpList();
    this.getRoleList();
    this.getDepList()
    // this.getAllCompany();
  }

  goBackLeaveMasterList(path: any) {
    this.route.navigate([path])
  }



  calculateDiff() {
    this.todate = this.leaveMasterForm.value.toDate;
    if (this.leaveMasterForm.value.fromDate && this.leaveMasterForm.value.toDate) {
      let currentDate = new Date(this.leaveMasterForm.value.fromDate);
      let dateSent = new Date(this.leaveMasterForm.value.toDate);
      this.noOfDay = (Date.UTC(dateSent.getFullYear(), dateSent.getMonth(), dateSent.getDate()) -
        Date.UTC(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate())) / 86400000;
      
      // this.leaveMasterForm.patchValue({ 
      //   leaveCount: this.todate ? this.noOfDay : null,
      // });
      this.leaveMasterForm.controls['leaveCountDays'].patchValue(this.noOfDay+1)
    }
    // this.leaveMasterForm.controls.leaveCountDays.setValue('45');


  }

  onCancel() {
    // this.holidayForm.reset();
    this.route.navigate(['/master/hrms/leave-master/leave-master-list'])
  }

  onSubmit() {
    let val = this.leaveMasterForm.value;
    let leaveName = this.AllLeaveTypes_list.find((e:any)=>e.leave_id === val.leaveName)
    const data = {
      employee_id: this.loginUser.employee_id,
      applier_name: this.loginUser.first_name,
      leave_id: this.leaveMasterForm.value.leaveName,
      leaveCode: leaveName.leave_type,
      leaveType: this.leaveMasterForm.value.leaveType,
      companyName: this.leaveMasterForm.value.companyName,
      leaveCount: Number(this.leaveMasterForm.value.leaveCountDays),
      leaveUnit: this.leaveMasterForm.value.leaveUnit,
      description: this.leaveMasterForm.value.description,
      fromDate: this.leaveMasterForm.value.fromDate,
      toDate: this.leaveMasterForm.value.toDate,
      on_date: this.leaveMasterForm.value.onDate,
      start_time: this.leaveMasterForm.value.startTime,
      number_of_hours: this.leaveMasterForm.value.no_of_hours,

      accrualLeave: [
        {
          isAcl: this.leaveMasterForm.value.isAcl
        },
        {
          aclLeaveType: this.leaveMasterForm.value.aclLeaveType,
        },
        {
          aclLeaveOn: this.leaveMasterForm.value.aclLeaveOn,
        },
        {
          aclLeaveMonth: this.leaveMasterForm.value.aclLeaveMonth,
        }
      ],
      resetLeave: [
        {
          isRstl: this.leaveMasterForm.value.isRstl,
        },
        {
          rstlLeaveType: this.leaveMasterForm.value.rstlLeaveType,
        },
        {
          rstlLeaveOn: this.leaveMasterForm.value.rstlLeaveOn,
        },
        {
          rstlLeaveMonth: this.leaveMasterForm.value.rstlLeaveMonth,
        },
        {
          rstlCarryFwdValue: this.leaveMasterForm.value.rstlCarryFwdValue,
        },
        {
          rstlCarryFwdUnit: this.leaveMasterForm.value.rstlCarryFwdUnit,
        },
        {
          rstlEncashmentValue: this.leaveMasterForm.value.rstlEncashmentValue,
        },
        {
          rstlEncashmentUnit: this.leaveMasterForm.value.rstlEncashmentUnit,
        }
      ],

      creditLeave: [
        {
          isCtrl: this.leaveMasterForm.value.isCtrl,
        },
        {
          ctrlLeaveType: this.leaveMasterForm.value.ctrlLeaveType,
        },
        {
          ctrlLeaveOn: this.leaveMasterForm.value.ctrlLeaveOn,
        },
        // {
        //   ctrllLeaveMonth: this.leaveMasterForm.value.ctrllLeaveMonth,
        // }
      ],
      prorateLeave: [
        {
          isPrl: this.leaveMasterForm.value.isPrl,
        },
        {
          prlLeaveOn: this.leaveMasterForm.value.prlLeaveOn,
        },
        {
          prlLeaveMonth: this.leaveMasterForm.value.prlLeaveMonth,
        }
      ],

      // club: [
      //   {
      //     clubValue: this.leaveMasterForm.value.clubValue,
      //   }
      // ],

      openingBalance: [
        {
          isOpnBl: this.leaveMasterForm.value.isOpnBl,
        },
        {
          opnBlValue: this.leaveMasterForm.value.opnBlValue,
        }
      ],
      maximumBalance: [
        {
          isMxBl: this.leaveMasterForm.value.isMxBl,
        },
        {
          mxBlValue: this.leaveMasterForm.value.mxBlValue,
        }
      ],
      applicableGender: this.leaveMasterForm.value.applicableGender,
      applicableMaritalStatus: this.leaveMasterForm.value.applicableMaritalStatus,
      countAsLeaveBtWeekend: [
        {
          isCntLeaveBtwWk: this.leaveMasterForm.value.isCntLeaveBtwWk,
        },
        {
          cntLeaveBtwWk: this.leaveMasterForm.value.cntLeaveBtwWk,
        }
      ],

      department_name: this.leaveMasterForm.value.department_name,
      role_master_name: this.leaveMasterForm.value.role_master_name,
      employee: this.leaveMasterForm.value.employee,

      countAsLeaveBtHoliday: [
        {
          isCntLeaveBtwHld: this.leaveMasterForm.value.isCntLeaveBtwHld,
        },
        {
          cntLeaveBtwHld: this.leaveMasterForm.value.cntLeaveBtwHld,
        }
      ],
      isLeaveExcide: this.leaveMasterForm.value.isLeaveExcide,
      DurationAllowed: this.leaveMasterForm.value.DurationAllowed,
      MaxLeaveAllowed: this.leaveMasterForm.value.MaxLeaveAllowed,
      LeaveSubmittedBefore: this.leaveMasterForm.value.LeaveSubmittedBefore,
    }
    

    if (!this.leaveMasterForm.value) {
      this.toast.error("Required fields should not be empty", "Fields Error")
      
      return;
    }

    this.hrServies.leaveMasterCreate(data).subscribe((res: any) => {
      
      if (res.code == 200) {
        this.toast.success(res.message);
        this.route.navigate(['master/hrms/leave-master/leave-master-list']);
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

  accrualLeave() {
    if (this.leaveMasterForm.value.isAcl == true) {
      this.calculateDiff()
      this.styles = true;
    } else {
      this.styles = false;
    }
  }

  resetLeave() {
    if (this.leaveMasterForm.value.isRstl == true) {
      this.reset = true;
    } else {
      this.reset = false;
    }
  }

  creditLeave() {
    if (this.leaveMasterForm.value.isCtrl == true) {
      this.credit = true;
    } else {
      this.credit = false;
    }
  }

  prorateLeave() {
    if (this.leaveMasterForm.value.isPrl == true) {
      this.prorate = true;
    } else {
      this.prorate = false;
    }
  }

  clubLeave() {
    if (this.leaveMasterForm.value.isClub == true) {
      this.clubVal = true;
    } else {
      this.clubVal = false;
    }
  }

  maximumBalance() {
    if (this.leaveMasterForm.value.isMxBl == true) {
      this.maximumBalanceState = true;
    } else {
      this.maximumBalanceState = false;
    }
  }

  openingBalance() {
    if (this.leaveMasterForm.value.isOpnBl == true) {
      this.openingBalanceState = true;
    } else {
      this.openingBalanceState = false;
    }
  }
  //aplicable 

  allDepartmentSelected = false;
  allRoleSelected = false;
  allEmpSelected = false;

  toggleAllDepSelection() {
    if (this.allDepartmentSelected) {
      this.select.options.forEach((item: MatOption) => item.select());
    } else {
      this.select.options.forEach((item: MatOption) => item.deselect());
    }
  }
  depOptionClick() {
    let newStatus = true;
    this.select.options.forEach((item: MatOption) => {
      if (!item.selected) {
        newStatus = false;
      }
    });
    this.allDepartmentSelected = newStatus;
  }

  toggleAllRoleSelection() {
    if (this.allRoleSelected) {
      this.roleSelect.options.forEach((item: MatOption) => item.select());
    } else {
      this.roleSelect.options.forEach((item: MatOption) => item.deselect());
    }
  }
  roleOptionClick() {
    let newStatus = true;
    this.roleSelect.options.forEach((item: MatOption) => {
      if (!item.selected) {
        newStatus = false;
      }
    });
    this.allRoleSelected = newStatus;
  }

  toggleAllEmpSelection() {
    if (this.allEmpSelected) {
      this.empSelect.options.forEach((item: MatOption) => item.select());
    } else {
      this.empSelect.options.forEach((item: MatOption) => item.deselect());
    }
  }
  empOptionClick() {
    let newStatus = true;
    this.empSelect.options.forEach((item: MatOption) => {
      if (!item.selected) {
        newStatus = false;
      }
    });
    this.allEmpSelected = newStatus;
  }

  leaveUpdate() {
    let val = this.leaveMasterForm.value;
    let leaveName = this.AllLeaveTypes_list.find((e:any)=>e.leave_id === val.leaveName)
    const data = {
      employee_id: this.loginUser.employee_id,
      applier_name: this.loginUser.first_name,
      leave_id: this.leaveMasterForm.value.leaveName,
      leaveCode: leaveName.leave_type,
      leaveType: this.leaveMasterForm.value.leaveType,
      companyName: this.leaveMasterForm.value.companyName,
      leaveCount: Number(this.leaveMasterForm.value.leaveCountDays),
      leaveUnit: this.leaveMasterForm.value.leaveUnit,
      description: this.leaveMasterForm.value.description,
      fromDate: this.leaveMasterForm.value.fromDate,
      toDate: this.leaveMasterForm.value.toDate,
      on_date: this.leaveMasterForm.value.onDate,
      start_time: this.leaveMasterForm.value.startTime,
      number_of_hours: this.leaveMasterForm.value.no_of_hours,

      accrualLeave: [
        {
          isAcl: this.leaveMasterForm.value.isAcl
        },
        {
          aclLeaveType: this.leaveMasterForm.value.aclLeaveType,
        },
        {
          aclLeaveOn: this.leaveMasterForm.value.aclLeaveOn,
        },
        {
          aclLeaveMonth: this.leaveMasterForm.value.aclLeaveMonth,
        }
      ],
      resetLeave: [
        {
          isRstl: this.leaveMasterForm.value.isRstl,
        },
        {
          rstlLeaveType: this.leaveMasterForm.value.rstlLeaveType,
        },
        {
          rstlLeaveOn: this.leaveMasterForm.value.rstlLeaveOn,
        },
        {
          rstlLeaveMonth: this.leaveMasterForm.value.rstlLeaveMonth,
        },
        {
          rstlCarryFwdValue: this.leaveMasterForm.value.rstlCarryFwdValue,
        },
        {
          rstlCarryFwdUnit: this.leaveMasterForm.value.rstlCarryFwdUnit,
        },
        {
          rstlEncashmentValue: this.leaveMasterForm.value.rstlEncashmentValue,
        },
        {
          rstlEncashmentUnit: this.leaveMasterForm.value.rstlEncashmentUnit,
        }
      ],

      creditLeave: [
        {
          isCtrl: this.leaveMasterForm.value.isCtrl,
        },
        {
          ctrlLeaveType: this.leaveMasterForm.value.ctrlLeaveType,
        },
        {
          ctrlLeaveOn: this.leaveMasterForm.value.ctrlLeaveOn,
        },
        // {
        //   ctrllLeaveMonth: this.leaveMasterForm.value.ctrllLeaveMonth,
        // }
      ],
      prorateLeave: [
        {
          isPrl: this.leaveMasterForm.value.isPrl,
        },
        {
          prlLeaveOn: this.leaveMasterForm.value.prlLeaveOn,
        },
        {
          prlLeaveMonth: this.leaveMasterForm.value.prlLeaveMonth,
        }
      ],

      // club: [
      //   {
      //       clubValue: this.leaveMasterForm.value.clubValue,
      //   }
      // ],
      openingBalance: [
        {
          isOpnBl: this.leaveMasterForm.value.isOpnBl,
        },
        {
          opnBlValue: this.leaveMasterForm.value.opnBlValue,
        }
      ],
      maximumBalance: [
        {
          isMxBl: this.leaveMasterForm.value.isMxBl,
        },
        {
          mxBlValue: this.leaveMasterForm.value.mxBlValue,
        }
      ],
      applicableGender: this.leaveMasterForm.value.applicableGender,
      applicableMaritalStatus: this.leaveMasterForm.value.applicableMaritalStatus,
      countAsLeaveBtWeekend: [
        {
          isCntLeaveBtwWk: this.leaveMasterForm.value.isCntLeaveBtwWk,
        },
        {
          cntLeaveBtwWk: this.leaveMasterForm.value.cntLeaveBtwWk,
        }
      ],

      department_name: this.leaveMasterForm.value.department_name,
      role_master_name: this.leaveMasterForm.value.role_master_name,
      employee: this.leaveMasterForm.value.employee,

      countAsLeaveBtHoliday: [
        {
          isCntLeaveBtwHld: this.leaveMasterForm.value.isCntLeaveBtwHld,
        },
        {
          cntLeaveBtwHld: this.leaveMasterForm.value.cntLeaveBtwHld,
        }
      ],
      isLeaveExcide: this.leaveMasterForm.value.isLeaveExcide,
      DurationAllowed: this.leaveMasterForm.value.DurationAllowed,
      MaxLeaveAllowed: this.leaveMasterForm.value.MaxLeaveAllowed,
      LeaveSubmittedBefore: this.leaveMasterForm.value.LeaveSubmittedBefore,
    }
    this.hrServies.leaveUpdate(this.leavePolicyId, data).subscribe(
      (res: any) => {
        
        this.toast.success(res.message);
        this.route.navigate(['/master/hrms/leave-master/leave-master-list']);
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

  getEmpList() {
    this.hrServies.getAllEmp().subscribe((res: any) => {
      this.EmpListData = res.data;
      
    });

  }

  getRoleList() {
    this.hrServies.getRole().subscribe((res: any) => {
      this.roleData = res.data;
      
    });

  }

  getDepList() {
    this.hrServies.getDepList().subscribe((res: any) => {
      this.depData = res.data;
      
    });

  }

  // getAllCompany() {
  //   this.hrServies.getAllCompany().subscribe((res: any) => {
  //     this.companyData = res.data;
  //   })
  // }
  
  unit_selection(e: any) {
    
    this.On_Date = e.value
  }

  getAllLeaveTypes() {
    this.hrServies.getAllLeaveTypes().subscribe(
      (res) => {
        
        this.AllLeaveTypes_list = res.data;
      }, (err) => {
        
      }
    )
  }
}

