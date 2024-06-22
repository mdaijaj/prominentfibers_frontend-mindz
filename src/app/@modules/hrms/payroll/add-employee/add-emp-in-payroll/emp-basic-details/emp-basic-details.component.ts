import { Component, NgZone } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { EmpRegistrationService } from 'src/app/@shared/services/emp-registration.service';
import { HeadService } from 'src/app/@shared/services/head.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-emp-basic-details',
  templateUrl: './emp-basic-details.component.html',
  styleUrls: ['./emp-basic-details.component.scss']
})
export class EmpBasicDetailsComponent {
  propertyManager: any;
  basicForm: FormGroup;
  file: any;
  employeBYId: any;
  id: any;
  getData: any;
  employeReport: any;
  submitted = true;
  imagePath: any;
  imageToUpload: any;
  basicData: any;
  dataEmployee: any;
  data: any = '';
  regionData: any;
  gradeData: any;
  imageDefult: any = '../../../../../../assets/icons/icon_DQS/user.png';
  abc: any;
  update: any;
  employeId: any;
  title: any;
  reportingManager: any;
  lastName: any;
  title2: any;
  reportData: any = [];
  cellValue: any;
  reposting: any;
  loading: boolean = false;
  empId: any;
  allRoleMaster: any[];

  // dropdowns
  employmentlist: any;
  getAllBandtype: any;
  getAllBrand: any;
  getAllDepartment: any;
  getAllDesignation: any;
  gradelist: any;
  officeLocationall: any;
  regionlist: any;
  physicalLocation: any;

  reqiredValidator: any = Validators.required;
  mainId: any;
  formVal: any;
  data1: any;

  countryList: any;
  stateList: any;
  cityList: any;
  reporting_manager_list: any;
  reporting_manager_id: any;
  reporting_manager_name: any;

  toggleEditMode:boolean = false;
  loginUser: any;

  constructor(
    private head: HeadService,
    // private locatin: Location,
    private fb: FormBuilder,
    private _empRegistration: EmpRegistrationService,
    private toast: ToastrService,
    private route: Router,
    private activeroute: ActivatedRoute,
    private ngZone:NgZone,
  ) {
    this.dataEmployee;
    this.basicForm = this.fb.group({
      title: new FormControl(null, Validators.required),
      employee_official_email: new FormControl(null, Validators.required),
      employee_code: new FormControl(null),
      first_name: new FormControl(null, [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(30),
        Validators.pattern('[a-zA-Z]+'),
      ]),
      middle_name: new FormControl(null),
      last_name: new FormControl(null, [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(30),
        Validators.pattern('[a-zA-Z]+'),
      ]),
      gender: new FormControl(null, Validators.required),
      emplyoment_type: new FormControl(null, Validators.required),
      segment_suv: new FormControl(null, Validators.required),
      designation: new FormControl(null),
      date_of_birth: new FormControl(null, [Validators.required]),
      date_of_joining: new FormControl(null),
      country: new FormControl(null, [Validators.required]),
      state: new FormControl(null, [Validators.required]),
      city: new FormControl(null, [Validators.required]),
      region: new FormControl(null),
      department: new FormControl(null),
      reporting_manager_id: new FormControl(null),
      reporting_manager: new FormControl(null),
      reporting_office_location: new FormControl(null),
      working_physical_location: new FormControl(null),
      band: new FormControl(null),
      grade: new FormControl(null),
      mobile_number: new FormControl(null, [Validators.pattern(/^[0-9]{10}$/)]),
      personal_email: new FormControl(null),
      // probation: new FormControl(null),
      status: new FormControl(null),
      employee_photo: new FormControl(null),
      user_role: new FormControl(null, Validators.required),
    });
  }
  employee_id: any;
  currentRouter = this.route.url;
  ngOnInit(): void {
    this.mainId = localStorage.getItem('EmpMainId');
    let lg: any = localStorage.getItem('signInUser')
    this.loginUser = JSON.parse(lg);
    this.activeroute.queryParams.subscribe((params: any) => {
      this.id = params;
      this.employeId = this.id.employee_id;
      if (params.employee_id) {
        this.getByIdUse(Number(this.employeId));
      } else {
        // this.route.navigate(['/hrms/employee-master/employ'])
      }
    });
    this._empRegistration.setEmpTitle('BASIC-DETAILS');
    this.getEmployeData();
    this.getRegionData();
    this.getGradeData();
    this.getAllRoleMaster();

    // dropdown 
    this.gradelist_dropDown();
    this.getAllDepartment_dropDown();
    this.getAllDesignation_dropDown();
    this.regionlist_dropDown();
    // this.getAllBrand_dropDown();
    this.employmentlist_dropDown();
    this.getAllBandtype_dropDown();
    this.officeLocationall_dropDown();
    this.physicalLocation_dropDown();
    this.getAllCountry();
    //-------------------------------------------------------//
    // if (this.employeId) {
    //   this.basicForm.controls['employee_photo'].removeValidators(this.reqiredValidator);
    // } else {
    //   this.basicForm.controls['employee_photo'].addValidators(this.reqiredValidator);
    // }

    if(this.toggleEditMode){
      this.basicForm.enable();
    }else{
      this.basicForm.disable();
    }
  }

  getByIdUse(id: any) {
    this._empRegistration.getByUserId(id).subscribe((res: any) => {
      this.getData = res.data;
      this.reposting = res.data?.reporting_manager;
      this.basicFormPatch(this.getData, this.propertyManager);
    });
  }

  basicFormPatch(getData: any, propertyManager: any) {
    this.getStateByCountry(Number(getData?.country));
    this.getCityByState((Number(getData?.state)));

    this.basicForm.patchValue({
      title: getData?.title,
      employee_official_email: getData?.employee_official_email,
      employee_code: getData?.employee_code,
      first_name: getData?.first_name,
      middle_name: getData?.middle_name,
      last_name: getData?.last_name,
      gender: getData?.gender,
      emplyoment_type: getData?.emplyoment_type,
      segment_suv: getData?.segment_suv,
      designation: getData?.designation,
      date_of_birth: getData?.date_of_birth,
      date_of_joining: getData?.date_of_joining,
      country: Number(getData?.country),
      region: getData?.region,
      department: getData?.department,
      reporting_manager_id: getData?.reporting_manager_id,
      reporting_manager: getData?.reporting_manager,
      reporting_office_location: getData?.reporting_office_location,
      working_physical_location: getData?.working_physical_location,
      band: getData?.band,
      grade: getData?.grade,
      mobile_number: getData?.mobile_number,
      personal_email: getData?.personal_email,
      probation: getData?.probation,
      status: getData?.status,
      probation_status: getData?.probation_status,
      abc: getData?.abc,
      // employee_photo: getData?.employee_photo,
      user_role: getData?.role_master_id,
    });

  }

  get f() {
    return this.basicForm.controls;
  }
  now = new Date();
  year = this.now.getFullYear();
  month = this.now.getMonth();
  date = this.now.getDate();
  // min = moment({ year: this.year +18, month: this.month, date: this.date }).format('YYYY-MM-DD');
  max = moment({ year: this.year - 18, month: this.month, date: this.date }).format('YYYY-MM-DD');


  onChange(e: any) {

    if (e.target.files && e.target.files[0]) {
      const data: FileList = e.target.files;
      this.imageToUpload = data.item(0) || null;

      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imagePath = e.target.result;
      };
      reader.readAsDataURL(this.imageToUpload);
    }
  }
  typeChange(e: any) {
    if (e.value == 'Part Time') {
      delete this.basicForm.value.date_of_joining;
      this.formVal = this.basicForm.value;
      // let valid = this.basicForm.controls['designation'].validator;
      // if(valid){
      this.basicForm.controls['designation'].removeValidators(this.reqiredValidator);
      // };

      this.basicForm.patchValue({
        user_role: "User"
      })
    }
    if (e.value == 'Full Time') {
    }

  }
  onSubmitForm() {
    this.submitted = false;

    if (this.basicForm.invalid) {
      this.toast.error('Required fields should not be empty', 'Fields Error');
      return;
    }
    this.submitted = true;
    let val = this.basicForm.value;
    let roleName: any = this.allRoleMaster.find((e: any) => e.role_master_id === val.user_role);

    if (val.date_of_joining == null) {
      this.data1 = {
        title: val.title,
        personal_email: val.personal_email,
        employee_code: val.employee_code,
        first_name: val.first_name,
        // employee_photo: val.employee_photo,
        middle_name: val.middle_name,
        last_name: val.last_name,
        gender: val.gender,
        emplyoment_type: val.emplyoment_type,
        segment_suv: val.segment_suv,
        designation: val.designation,
        date_of_birth: moment(val.date_of_birth).format('YYYY-MM-DD'),
        date_of_joining: '',
        country: String(val.country),
        state: String(val.state),
        city: String(val.city),
        region: val.region,
        department: val.department,
        reporting_manager_id: this.reporting_manager_id,
        reporting_manager: this.reporting_manager_name,
        reporting_office_location: val.reporting_office_location,
        working_physical_location: val.working_physical_location,
        band: val.band,
        grade: val.grade,
        mobile_number: val.mobile_number,
        employee_official_email: val.employee_official_email,
        // probation: val.probation || 'ACTIVE',
        status: val.status || 'ACTIVE',
        role_master_id: val.user_role,
        user_role: roleName.role_master_name,
      };
    }
    else {
      this.data1 = {
        title: val.title,
        personal_email: val.personal_email,
        employee_code: val.employee_code,
        first_name: val.first_name,
        // employee_photo: val.employee_photo,
        middle_name: val.middle_name,
        last_name: val.last_name,
        gender: val.gender,
        emplyoment_type: val.emplyoment_type,
        segment_suv: val.segment_suv,
        designation: val.designation,
        date_of_birth: moment(val.date_of_birth).format('YYYY-MM-DD'),
        date_of_joining: moment(val.date_of_joining).format('YYYY-MM-DD'),
        country: String(val.country),
        state: String(val.state),
        city: String(val.city),
        region: val.region,
        department: val.department,
        reporting_manager_id: val.reporting_manager_id,
        reporting_manager: this.reporting_manager_name,
        reporting_office_location: val.reporting_office_location,
        working_physical_location: val.working_physical_location,
        band: val.band,
        grade: val.grade,
        mobile_number: val.mobile_number,
        employee_official_email: val.employee_official_email,
        // probation: val.probation || 'ACTIVE',
        status: val.status || 'ACTIVE',
        role_master_id: val.user_role,
        user_role: roleName.role_master_name,
      };
    }


    this.loading = true;
    if (!this.employeId) {
      this._empRegistration.basicSignUp(this.data1, this.imageToUpload).subscribe(
        (res: any) => {
          this.loading = false;

          this.basicData = res;
          this.employee_id = res.employee_id;
          this.head.EmpReg.next(this.basicData.employee_id);
          localStorage.setItem('MyEmpId', this.basicData.employee_id);
          this.toast.success('Basic Details Created successfully..');
          this.route.navigate(
            ['master/hrms/payroll/add-employee/add-emp/emp-salary-detail'],{queryParams:{ employee_id: this.employeId }}
          );
          const latlang = { id: this.employee_id };
        },
        (err) => {
          this.loading = false;
          if (err.status === 400) {
            // this.errorMessage = err.error.message
            // alert(err.error.message)
            this.toast.error('Failed! Email is already in use!');
          } else if (err.status == 500) {
            this.toast.error('bad request ');
          } else if (err.status == 404) {
            this.toast.error(
              'Somthing went wrong.. Please try agin',
              'Error Massage'
            );
          } else {
            this.toast.error('Login failed');
          }
        }
      );
    } else {
      this.data = this.basicForm.value;
      this.data.basicData = this.employeId;
      this._empRegistration.updateEmploy(this.employeId, this.data1, this.imageToUpload).subscribe(
        (res: any) => {
          // this.update=res
          this.loading = false;
          this.toast.success('Basic Details Updated successfully..');
          this.route.navigate(
            ['master/hrms/payroll/add-employee/add-emp/emp-salary-detail'],{queryParams:{ employee_id: this.employeId }}
          );
        },
        (err) => {
          this.loading = false;
          this.toast.error('Something went wrong please try again', 'Error');
        }
      );
    }
  }

  getEmployeData() {
    this._empRegistration.grtEmployeeList().subscribe((res: any) => {
      this.dataEmployee = res.data;
      this.reporting_manager_list = res.data;
      // this.propertyManager = Array.from(
      //   this.dataEmployee,
      //   (a: any) => `${a.title} ${a.first_name} ${a.last_name}`
      // );


      // let formateData = Array.from(
      //   this.dataEmployee,
      //   (a: any) => {
      //    return {employe:a.employee_id, fullname:`${a.title} ${a.first_name} ${a.last_name}`}
      //   }
      // );


    });
  }

  reportClick(id: any) {
  }

  getRegionData() {
    this._empRegistration.getRegionList().subscribe((res: any) => {
      this.regionData = res;
    });
  }

  getGradeData() {
    this._empRegistration.getGradeList().subscribe((res: any) => {
      this.gradeData = res.data;
    });
  }

  getAllRoleMaster() {
    this._empRegistration.getAllRoleMaster(this.loginUser.role).subscribe((res: any) => {
      this.allRoleMaster = res.data;
    });
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

  employmentlist_dropDown() {
    this._empRegistration.employmentlist_dropDown().subscribe(
      (res) => {
        this.employmentlist = res.data;
      }
    );
  };

  getAllBandtype_dropDown() {
    this._empRegistration.getAllBandtype_dropDown().subscribe(
      (res) => {
        this.getAllBandtype = res.data;
      }
    );
  };

  // getAllBrand_dropDown() {
  //   this._empRegistration.getAllBrand_dropDown().subscribe(
  //     (res) => {
  //       this.getAllBandtype = res.data;
  //     }
  //   );
  // };

  getAllDepartment_dropDown() {
    this._empRegistration.getAllDepartment_dropDown().subscribe(
      (res) => {
        this.getAllDepartment = res.data;
      }
    );
  };

  getAllDesignation_dropDown() {
    this._empRegistration.getAllDesignation_dropDown().subscribe(
      (res) => {
        this.getAllDesignation = res.data;
      }
    );
  };

  gradelist_dropDown() {
    this._empRegistration.gradelist_dropDown().subscribe(
      (res) => {
        this.gradelist = res.data;
      }
    );
  };

  officeLocationall_dropDown() {
    this._empRegistration.officeLocationall_dropDown().subscribe(
      (res) => {
        this.officeLocationall = res.data;
      }
    );
  };

  physicalLocation_dropDown() {
    this._empRegistration.physicalLocationall_dropDown().subscribe(
      (res) => {
        this.physicalLocation = res.userDetails;
      }
    );
  };

  regionlist_dropDown() {
    this._empRegistration.regionlist_dropDown().subscribe(
      (res) => {
        this.regionlist = res.data;
      }
    );
  };

  getAllCountry() {
    this._empRegistration.getAllcountry().subscribe(
      (res: any) => {
        this.countryList = res.data;
      })
  };

  getStateByCountry(id: any) {
    this._empRegistration.getStateByCountry(id).subscribe(
      (res: any) => {
        this.stateList = res.data;
        if (this.getData) {
          this.basicForm.controls['state'].patchValue(Number(this.getData?.state))
        }
      }
    )
  };

  getCityByState(id: any) {
    this._empRegistration.getCityByState(id).subscribe(
      (res: any) => {
        this.cityList = res.data;
        if (this.getData) {
          this.basicForm.controls['city'].patchValue(Number(this.getData?.city))
        }
      }
    )
  };

  countryChange(e: any) {
    this.getStateByCountry(e.value);
  };

  stateChange(e: any) {
    this.getCityByState(e.value);
  }

  skip() {
    // this.locatin.back();
    this.route.navigate(
      ['master/hrms/payroll/add-employee/add-emp/emp-salary-detail'],{queryParams:{ employee_id: this.employeId }}
    );
  };

  reportingManagerChange(e: any) {
    let fitlerMn = this.reporting_manager_list.find((a: any) => Number(a.employee_id) === Number(e.value))
    this.reporting_manager_id = fitlerMn.employee_id
    this.reporting_manager_name = `${fitlerMn.title} ${fitlerMn.first_name} ${fitlerMn.last_name}`
  }


  changeEditMode(e:any){
    this.toggleEditMode = e.target.checked;
    if(this.toggleEditMode){
      this.basicForm.enable();
    }else{
      this.basicForm.disable();
    }
  }
}
