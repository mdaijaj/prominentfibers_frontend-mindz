import { JsonPipe, Location } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatOption } from '@angular/material/core';
import { MatSelect } from '@angular/material/select';
import { ActivatedRoute, Router } from '@angular/router';
import { log } from 'console';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { ConfigurationalmasterService } from 'src/app/@shared/services/configurationalmaster.service';
import { EmpMasterService } from 'src/app/@shared/services/emp-master.service';
import { EmpRegistrationService } from 'src/app/@shared/services/emp-registration.service';
import { HeadService } from 'src/app/@shared/services/head.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-basic-details',
  templateUrl: './basic-details.component.html',
  styleUrls: ['./basic-details.component.scss'],
})
export class BasicDetailsComponent {
  @ViewChild('productselect') productselect: MatSelect;
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
  variables: any = [];
  variable: any = [];
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
  segmentList: any;
  regionSList: any;
  emp_type: any;
  checkData: any;
  allSelectedProduct: any;
  show_region: boolean;
  phoneCode: any;
  newPhoneCode: string;
  onBoardingId: any;
  employee_ids: any;
  singleData: any;
  stateVar: any = [];
  stateVar2: any = [];
  cityVar: any = [];
  cityVar2: any = [];
  reporting: any = [];
  reporting2: any = [];
  loginUser: any;
  plantList: any;
  constructor(
    private head: HeadService,
    private locatin: Location,
    private fb: FormBuilder,
    private _empRegistration: EmpRegistrationService,
    private toast: ToastrService,
    private route: Router,
    private activeroute: ActivatedRoute,
    private _configurationalMasterService: ConfigurationalmasterService,
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
      emplyoment_type: new FormControl(null,),
      segment_suv: new FormControl(null,),
      designation: new FormControl(null),
      date_of_birth: new FormControl(null, [Validators.required]),
      date_of_joining: new FormControl(null, [Validators.required]),
      country: new FormControl(null,),
      state: new FormControl(null,),
      city: new FormControl(null,),
      region: new FormControl(null),
      department: new FormControl(null),
      reporting_manager_id: new FormControl(null, [Validators.required]),
      reporting_manager: new FormControl(null,),
      reporting_plant_location: new FormControl(null),
      working_physical_location: new FormControl(null),
      band: new FormControl(null),
      grade: new FormControl(null),
      mobile_code: new FormControl(null),
      mobile_number: new FormControl(null, [Validators.required, Validators.pattern(/^[0-9]{10}$/)]),
      personal_email: new FormControl(null),
      // probation: new FormControl(null),
      status: new FormControl(null),
      employee_photo: new FormControl(null),
      branch_id: new FormControl(null),
      user_role: new FormControl(null,),
    });
  }
  employee_id: any;
  currentRouter = this.route.url;
  conditionToDisable: boolean = true;
  ngOnInit(): void {
    this.mainId = localStorage.getItem('EmpMainId');
    let lg: any = localStorage.getItem('signInUser');
    let loginUser = JSON.parse(lg);
    this.loginUser = JSON.parse(lg);
    this.employee_ids = loginUser.employee_id;

    this.getAllSegment();
    this.getAllCountry()
    this.activeroute.queryParams.subscribe((params: any) => {
      console.log(params, "fasdfasdfasdfasd");
      //  let outerAndInnerEmpId= localStorage.getItem('outerAndInnerEmpId')

      // if (!outerAndInnerEmpId) {
      //   localStorage.setItem('outerAndInnerEmpId', params.employee_id)

      // }
      this.id = params;
      this.onBoardingId = params.onBoardingId;
      this.employeId = this.id.employee_id;
      if (this.id.employee_id) {
        this.getByIdUse(Number(this.employeId));
      }

    });
    //  let outerAndInnerEmpId= localStorage.getItem('outerAndInnerEmpId')
    //  console.log(outerAndInnerEmpId);

    // if (this.id.employee_id) {
    //  // this.employeId = outerAndInnerEmpId
    //   this.getByIdUse(Number(this.employeId));

    // } else {

    //   // this.route.navigate(['/hrms/employee-master/employ'])

    // }
    this._empRegistration.setEmpTitle('BASIC-DETAILS');
    this.getEmployeData();
    // this.getRegionData();
    // this.getGradeData();
    this.getAllRoleMaster();

    // dropdown
    this.gradelist_dropDown();
    this.getAllDepartment_dropDown();
    this.getAllDesignation_dropDown();
    this.regionlist_dropDown();
    // this.getAllBrand_dropDown();
    this.employmentlist_dropDown();
    this.getAllPlantMaster();
    // this.getAllBandtype_dropDown();
    // this.officeLocationall_dropDown();
    // this.physicalLocation_dropDown();
    // this.getAllCountry();
    // this.getById();
    //-------------------------------------------------------//
    // if (this.employeId) {
    //   this.basicForm.controls['employee_photo'].removeValidators(this.reqiredValidator);
    // } else {
    //   this.basicForm.controls['employee_photo'].addValidators(this.reqiredValidator);
    // }
    this.getBranchList();
  }

  getByIdUse(id: any) {
    this._empRegistration.getByUserId(id).subscribe((res: any) => {
      this.getData = res.data;
      this.reposting = res.data?.reporting_manager;
      this.basicFormPatch(this.getData, this.propertyManager);
    });
  }

  // getById() {
  //   this._empRegistration.getById(this.onBoardingId, this.employee_ids).subscribe((res: any) => {
  //     this.singleData = res.data;
  //     if (this.onBoardingId) {
  //       this.basicFormPatch(res.data, '')
  //       this.basicForm.controls['state'].patchValue(Number(this.singleData?.current_addres[0]?.state))
  //       this.basicForm.controls['city'].patchValue(Number(this.singleData?.current_addres[0]?.city))
  //     }

  //   })
  // }

  basicFormPatch(getData: any, propertyManager: any) {
    console.log(getData?.country, 'gg');

    this.getStateByCountry(Number(getData?.country));
    this.getCityByState((Number(getData?.state)));
    this.segmentList.filter((item: any) => {
      if (item?.segment_name == getData?.segment_suv) {
        this.segment_id = item?.segment_id
      }
    })
    console.log(this.segment_id);

    this._empRegistration.getRegionByID(this.segment_id).subscribe((res: any) => {
      this.regionSList = res.data.new_regions;
      // console.log(this.regionlist)
    });
    console.log(this.countryList);

    for (let item of this.countryList) {
      if (item.countryss_id == getData.country) {
        this.phoneCode = item?.phone_code;
        console.log(this.phoneCode);


      }
    }

    this.newPhoneCode = "+" + this.phoneCode;
    const code = this.newPhoneCode.toString();


    console.log(this.newPhoneCode);

    setTimeout(() => {
      this.basicForm.patchValue({
        title: getData?.title || getData?.prefix,
        employee_official_email: getData?.employee_official_email || getData.personal_email,
        employee_code: getData?.employee_code,
        first_name: this.getData?.first_name || getData?.First_name,
        middle_name: getData?.middle_name || getData?.Middle_name,
        last_name: getData?.last_name || getData?.Last_name,
        gender: getData?.gender || getData?.Gender,
        emplyoment_type: getData?.emplyoment_type,
        segment_suv: getData?.segment_suv,
        designation: getData?.designation,
        date_of_birth: getData?.date_of_birth || moment(getData?.DOB).format(),
        date_of_joining: getData?.date_of_joining || moment(getData.DOJ).format(),
        country: Number(getData?.country || getData?.current_addres[0]?.country),
        region: this.getData?.region,
        department: getData?.department,
        reporting_manager_id: getData?.reporting_manager_id,
        reporting_manager: getData?.reporting_manager,
        reporting_plant_location: getData?.reporting_plant_location,
        working_physical_location: getData?.working_physical_location,
        band: getData?.band,
        grade: getData?.grade,
        mobile_number: getData?.mobile_number || getData.Mobile_number,
        personal_email: getData?.personal_email || getData.personal_email,
        probation: getData?.probation,
        status: getData?.status,
        probation_status: getData?.probation_status,
        abc: getData?.abc,
        mobile_code: this.newPhoneCode,
        // employee_photo: getData?.employee_photo,
        user_role: getData?.role_master_id,
        branch_id: getData?.branch_id,
      });
    }, 50);

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
  fileError: boolean = false;
  validateFile(event: any) {
    const file = event.target.files[0];
    if (file) {
      const fileName = file.name;
      const extension = fileName.split('.').pop()?.toLowerCase();
      if (extension !== 'jpg' && extension !== 'jpeg' && extension !== 'png') {
        // Show error message or handle invalid file type here
        this.fileError = true;
        // Reset the file input to clear the invalid selection
        event.target.value = '';
      } else {
        // Proceed with handling the selected file
        this.fileError = false;
        this.onChange(event);
      }
    }
  }
  genrateBoolean: boolean = false
  enableEmployeeCode: boolean = false;
  typeChange(e: any) {
    // this.basicForm.controls['employee_code'].enable()

    this.emp_type = e.value;
    console.log(this.emp_type);

    // this.getAutoGenerateById(this.emp_type)
    if (this.emp_type) {
      let emoployeeBodyData = {
        "status": this.emp_type ? !this.genrateBoolean : this.genrateBoolean,
        "emplyoment_type": this.emp_type
      }


      this._empRegistration.getAutoGenerateById(emoployeeBodyData).subscribe((res: any) => {

        this.enableEmployeeCode = true;

        // Patch the value to the form control
        this.basicForm.patchValue({
          employee_code: res?.data // Replace 'YourValueHere' with the value you want to patch
        });

        // Disable the form control again
        // this.basicForm.get('employee_code')?.disable();

        //  this.basicForm.controls['employee_code'].disable()

      });
    }
    // if (e.value == 'Part Time') {
    // //  delete this.basicForm.value.date_of_joining;
    //   this.formVal = this.basicForm.value;
    //    this.basicForm.controls['designation'].removeValidators(this.reqiredValidator);
    //    this.basicForm.patchValue({
    //     user_role: "User"
    //   })
    // }else if (e.value == 'Part time Auditors'){
    //   // delete this.basicForm.value.date_of_joining;
    //   this.formVal = this.basicForm.value;
    //    this.basicForm.controls['designation'].removeValidators(this.reqiredValidator);
    //    this.basicForm.patchValue({
    //     user_role: "Auditor"
    //   })
    // }else {
    //   this.basicForm.patchValue({
    //     user_role: null // or '' for an empty string
    // })
    // }
  }
  getAllSegment() {
    this._configurationalMasterService.getAllSegment().subscribe((res: any) => {
      this.segmentList = res.data;
    });
  }

  onSubmitForm() {

    Object.keys(this.basicForm.controls).forEach(field => {
      const control = this.basicForm.get(field);
        if (control?.invalid) {
        console.log('Invalid field:', field);
        // You can also gather more information about the invalid control if needed
        // For example:
        console.log('Validation errors:', control?.errors);
      }
    });

    if (this.enableEmployeeCode) {
      // Enable the employee_code field before submitting
      this.basicForm.get('employee_code')?.enable();
    }
    console.log(this.basicForm.value, 'form');

    this.submitted = false;

    if (this.basicForm.invalid) {
      this.toast.error('Required fields should not be empty', 'Fields Error');

      return;
    }
    this.submitted = true;

    let val: any = this.basicForm.value;
    let roleName: any = this.allRoleMaster.find((e: any) => e.role_master_id === val.user_role);
    console.log(roleName);
    console.log(val);

    if (this.emp_type == 'Part Time' || this.getData?.emplyoment_type == 'Part Time') {
      this.data1 = {
        title: val.title,
        personal_email: val.personal_email,
        employee_code: val.employee_code,

        first_name: val.first_name,
        // employee_photo: val.employee_photo,
        middle_name: val.middle_name || null,
        last_name: val.last_name,
        gender: val.gender,
        emplyoment_type: val.emplyoment_type,
        segment_suv: "MSA",
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
        reporting_plant_location: val.reporting_plant_location,
        working_physical_location: val.working_physical_location,
        band: val.band,
        grade: val.grade,
        mobile_number: val.mobile_number,
        employee_official_email: val.employee_official_email,
        mobile_code: val.mobile_code,
        status: val.status || 'ACTIVE',
        role_master_id: val.user_role,
        user_role: roleName.role_master_name,
        branch_id: val?.branch_id
      };
    }
    else if (this.emp_type == 'Full Time' || this.getData?.emplyoment_type == 'Full Time') {
      this.data1 = {
        title: val.title,
        personal_email: val.personal_email,
        employee_code: val.employee_code,
        first_name: val.first_name,
        // employee_photo: val.employee_photo,
        middle_name: val.middle_name || null,
        last_name: val.last_name,
        gender: val.gender,
        emplyoment_type: val.emplyoment_type,
        segment_suv: "MSA",
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
        reporting_plant_location: val.reporting_plant_location,
        working_physical_location: val.working_physical_location,
        band: val.band,
        grade: val.grade,
        mobile_number: val.mobile_number,
        employee_official_email: val.employee_official_email,
        // probation: val.probation || 'ACTIVE',
        mobile_code: val.mobile_code,

        status: val.status || 'ACTIVE',
        role_master_id: val.user_role,
        user_role: roleName.role_master_name,
        branch_id: val?.branch_id
      };
    }

    this.loading = true;
    if (!this.employeId) {
      let genrateCodeStatus = {
        status: false
      }
      this._empRegistration.basicSignUp(this.data1, this.imageToUpload).subscribe(
        (res: any) => {
          this.loading = false;

          this.basicData = res;
          this.employee_id = res.employee_id;

          this.head.EmpReg.next(this.basicData.employee_id);
          localStorage.setItem('MyEmpId', this.basicData.employee_id);
          this.toast.success('Basic Details Created successfully..');


          this.route.navigate(
            ['master/hrms/employee-master/employ/employee-create/personal-details'],
            { queryParams: { employee_id: this.employee_id } }
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
      this.data.branch_id = val?.branch_id
      this._empRegistration.updateEmploy(this.employeId, this.data1, this.imageToUpload).subscribe(
        (res: any) => {
          // this.update=res
          this.loading = false;
          this.toast.success('Basic Details Updated successfully..');
          this.route.navigate(
            ['master/hrms/employee-master/employ/employee-create/personal-details'],
            { queryParams: { employee_id: this.employeId } }
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


      this.reporting = this.dataEmployee.map((res: any) => res.title + res.first_name + res.last_name);


      this.reporting2 = this.dataEmployee;
    });
  }

  reportClick(id: any) {
    this._empRegistration.grtEmployeeList().subscribe((res: any) => {

      this.dataEmployee = res.data;
      this.reporting_manager_list = res.data;


      this.reporting = this.dataEmployee.map((res: any) => res.title + res.first_name + res.last_name);


      this.reporting2 = this.dataEmployee;
    });
  }

  getAutoGenerateById(data: any) {

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
      console.log(this.allRoleMaster, 'asdfasjkdhasjkhdjk');


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
  
  getAllPlantMaster() {
    this._configurationalMasterService.getPlantMasterList().subscribe((res: any) => {
      this.plantList = res.data;
    });
  }

  // getAllBrand_dropDown() {
  //   this._empRegistration.getAllBrand_dropDown().subscribe(
  //     (res) => {
  //
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
        this.variables = this.countryList.map((res: any) => res.countryss_name)
        this.checkData = this.countryList
        this.variable = this.countryList

      })
  };

  getStateByCountry(id: any) {
    console.log(id, 'dddddddddddddd');

    this._empRegistration.getStateByCountry(id).subscribe(
      (res: any) => {
        this.stateList = res.data;
        this.stateVar = this.stateList.map((res: any) => res.states_name);
        this.stateVar2 = this.stateList;

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
        this.cityVar = this.cityList.map((res: any) => res.city_name);
        this.cityVar2 = this.cityList;
        if (this.getData) {
          this.basicForm.controls['city'].patchValue(Number(this.getData?.city))
        }
      }
    )
  };
  segment_id: any;
  getRegion(e: any) {
    const segment_value = e.value;
    this.segmentList.filter((item: any) => {
      if (item?.segment_name == segment_value) {
        this.segment_id = item?.segment_id
      }
    })
    this._empRegistration.getRegionByID(this.segment_id).subscribe((res: any) => {
      this.regionSList = res.data.new_regions;
      console.log(this.regionlist)
    });
  }
  countryChange(e: any) {

    this.getStateByCountry(e.value);
  };

  stateChange(e: any) {

    this.getCityByState(e.value);
  }

  back() {
    this.locatin.back();
  };

  reportingManagerChange(e: any) {


    let fitlerMn = this.reporting_manager_list.find((a: any) => Number(a.employee_id) === Number(e.value))

    this.reporting_manager_id = fitlerMn.employee_id
    this.reporting_manager_name = `${fitlerMn.title} ${fitlerMn.first_name} ${fitlerMn.last_name}`


  }
  optionEaCode(event: any) {
    console.log(event, 'Log');

    for (let item of this.countryList) {
      if (item.countryss_id == event?.value) {
        this.phoneCode = item?.phone_code;

      }
    }

    this.newPhoneCode = "+" + this.phoneCode;
    const code = this.newPhoneCode.toString();

    this.basicForm.patchValue({
      mobile_code: this.newPhoneCode
    })
    let newStatus = true;
    this.productselect.options.forEach((item: MatOption) => {
      if (!item.selected) {
        newStatus = false;
      }
    });
    this.allSelectedProduct = newStatus;

    this.getStateByCountry(event.value);
  }

  toggleAllCodeSelect() {
    if (this.allSelectedProduct) {
      this.productselect.options.forEach((item: MatOption) => item.select());
    } else {
      this.productselect.options.forEach((item: MatOption) => item.deselect());
    }
  }
  productFilter(e: any) {

    const aa = e
    let filteredVariable = this.variable.filter((item: any) => aa.includes(item.countryss_name));
    this.checkData = filteredVariable
  }


  stateFilter(e: any) {
    const aa = e
    let filteredVariable = this.stateVar2.filter((item: any) => aa.includes(item.states_name));
    this.stateList = filteredVariable
  }
  cityFilter(e: any) {
    const aa = e
    let filteredVariable = this.cityVar2.filter((item: any) => aa.includes(item.city_name));
    this.cityList = filteredVariable
  }

  reportingManagerSearch(e: any) {
    const aa = e


    let filteredVariable = this.reporting2.filter((item: any) => aa.includes(item.title + item.first_name + item.last_name));


    this.reporting_manager_list = filteredVariable
  }

  // Get all branch start
  branchList: any = [];
  getBranchList() {
    this._configurationalMasterService.getListBranchSetup().subscribe((res: any) => {
      this.branchList = res.data;
    })
  }


}

