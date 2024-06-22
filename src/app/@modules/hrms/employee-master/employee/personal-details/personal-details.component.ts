import { Component } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { VirtualTimeScheduler } from 'rxjs';
import { Location } from '@angular/common';
import { EmpRegistrationService } from 'src/app/@shared/services/emp-registration.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-personal-details',
  templateUrl: './personal-details.component.html',
  styleUrls: ['./personal-details.component.scss'],
})

export class PersonalDetailsComponent {
  personalForm: FormGroup;
  personalFamilyForm: any;
  id: any;
  updateData: any;
  employeGetID: any;
  personalIdData: any;
  presentData: any;
  resultNew: any[] = [];
  familydata: any;
  resultTwo: any[] = [];
  remarks: any[] = [];
  relations: any[] = [];
  dateBirth: any[] = [];
  contactDet: any[] = [];
  famDetails: any[] = [];
  inboxData: any[] = [];
  inboxData1: any[] = [];
  resultPrivius: any;
  companyName: any[] = [];
  position: any[] = [];
  fromdate: any[] = [];
  todate: any[] = [];
  lastdrawnsalary: any[] = [];
  location: any[] = [];
  resonofleaving: any[] = [];
  employee_id: number[] = [];
  empId: any;
  addFamilyDisable: boolean = false;
  allFamilyData: any;
  allEmployeerData: any;
  deletedFamilyData: any = [];

  countryList:any;
  stateList:any;
  permanentStateData:any
  presentSteteData:any
  presentCityList:any;
  permanentCityList:any;
  pincodeList:any;
  employee_ids: any;
  onBoardingId: any;
  singleData: any;
  empSingleData: any;
  checkData: any;
  variables: any=[];
  variable: any=[];
  stateVar:any=[];
  stateVar2:any=[];
  cityVar:any=[];
  cityVar2:any=[];
  cityList: any;
  
  constructor(
    private fb: FormBuilder,
    private locatin: Location,
    private toastr: ToastrService,
    private employService: EmpRegistrationService,
    private activetedRoute: ActivatedRoute,
    private route: Router,
  ) {
    this.personalForm = this.fb.group({
      address: new FormControl(null, [Validators.required]),
      country: new FormControl(null, Validators.required),
      state: new FormControl(null, Validators.required),
      city: new FormControl(null, Validators.required),
      pincode: new FormControl(null, [ Validators.required,
        Validators.pattern(/^[0-9]{3,9}$/)]),
    //  permanent details 
    permanent_address: new FormControl(null, Validators.required),
    permanent_country: new FormControl(null, Validators.required),
    permanent_state: new FormControl(null, Validators.required),
    permanent_city: new FormControl(null, Validators.required),
    permanent_pincode: new FormControl(null,  [Validators.required,
      Validators.pattern(/^[0-9]{3,9}$/)]),
      //personal detail
      alternate_mobile: new FormControl(null, Validators.pattern(/^[0-9]{10}$/)),
      blood_group: new FormControl(null,[Validators.required]),
      maritial_status: new FormControl(null,[Validators.required]),
      spouse_name: new FormControl(null),
      pan_number: new FormControl(null, [Validators.required, Validators.pattern('([A-Z]){5}([0-9]){4}([A-Z]){1}$'),]),
      adhar_number: new FormControl(null,[ Validators.required, Validators.pattern(/^[0-9]*$/),Validators.maxLength(12)]),

      //family Details
      tableRows: new FormArray([
        new FormGroup({
          family_member_name: new FormControl(null, ),
          date_of_birth: new FormControl(null, ),
          relation: new FormControl(null, ),
          contact_number: new FormControl(
            null,
            Validators.pattern(/^[0-9]{10}$/)
          ),
          remark: new FormControl(null, ),
        }),
      ]),

      // PRIVIUS EMPOYER DETAILS
      employerRows: new FormArray([
        new FormGroup({
          company_name: new FormControl(null,),
          position: new FormControl(null, ),
          from_date: new FormControl(null, ),
          to_date: new FormControl(null,),
          last_drawn_salary: new FormControl(null, [Validators.min(0)]),
          reson_of_leaving: new FormControl(null, ),
          location: new FormControl(null, ),
        }),
      ]),
    });

    
    
  }

  ngOnInit(): void {
    let lg: any = localStorage.getItem('signInUser');
    let loginUser = JSON.parse(lg);
    
    this.employee_ids = loginUser.employee_id;

 
    this.activetedRoute.queryParams.subscribe((params: any) => {
      
      if (params) {
        this.employeGetID = params.employee_id;
        
      }else{
        let outerAndInnerEmpId= localStorage.getItem('outerAndInnerEmpId')
        
        this.employeGetID = outerAndInnerEmpId
      }
      this.id = params;
      this.employeGetID = params.employee_id;
      
      
      if (params.employee_id || this.employeGetID) {
        
        this.getSingleFamilyDetails(this.employeGetID);
        this.getSinglePreEmployeer(this.employeGetID);
        this.personalByid(this.employeGetID);
        this.getSinglePrasentDetails(this.employeGetID);
        this.addFamilyDisable = true;
      } else {
        
        // this.route.navigate(['/hrms/employee-master/employ'])
      }
    });
    this.employService.setEmpTitle('PERSONAL DETAILS');
    this.getAllCountry();
    this.getById();
    this.employService.empGetById(this.employeGetID).subscribe((res:any)=>{
      console.log(res);
      
      this.empSingleData = res?.data;
      
      
      let data: any = [];
      
      this.persnalDataPatch(this.empSingleData, this.presentData);
      for (let i = 0; i <= this.empSingleData?.family_details.length -1; i++) {
        data.push({
          family_member_name: this.empSingleData?.family_details[i]?.family_member_name,
          date_of_birth: this.empSingleData?.family_details[i]?.date_of_birth,
          relation: this.empSingleData?.family_details[i]?.relation,
          contact_number: Number(this.empSingleData?.family_details[i]?.contact_number),
          remark: this.empSingleData?.family_details[i]?.remark,
          // family_id: this.empSingleData?.family_details[i].family_id,
        });
      }
      let datas: any = [];
          for (let i = 0; i <= this.empSingleData?.previous_employee_details?.length - 1; i++) {
            datas.push({
              company_name: this.empSingleData?.previous_employee_details[i]?.company_name,
              position: this.empSingleData?.previous_employee_details[i]?.position,
              from_date: this.empSingleData?.previous_employee_details[i]?.from_date,
              to_date: this.empSingleData?.previous_employee_details[i]?.to_date,
              last_drawn_salary:this.empSingleData?.previous_employee_details[i]?.last_drawn_salary,
              location: this.empSingleData?.previous_employee_details[i]?.location,
              reson_of_leaving: this.empSingleData?.previous_employee_details[i]?.reson_of_leaving,
            });
          }
          this.CF_1.employerRows = this.patchPreEmployerData(datas);
          this.CF_1.tableRows = this.patchFamilyData(data);
          console.log( this.CF_1.employerRows);
          
    })
 
   
  };

  get CF_1(): any {
    return this.personalForm.controls;
  };

  personalByid(id: any) {
    this.employService.getByUserId(id).subscribe((res: any) => {
      this.personalIdData = res?.data;
      
      console.log(res.data);
      
      
      this.persnalDataPatch(this.personalIdData, this.presentData);
    });
  }

  getSinglePrasentDetails(id: any) {
    this.employService.getSinglePrasentDetails(id).subscribe((res: any) => {
      this.presentData = res.data;
      
      this.persnalDataPatch(this.personalIdData, this.presentData);
    });
  }


  onKeyPress(event: KeyboardEvent) {
    const regex = /[0-9]/;
    const inputChar = String.fromCharCode(event.charCode);

    if (!regex.test(inputChar)) {
      event.preventDefault();
    }
  }
  getSingleFamilyDetails(id: any) {
    this.employService.getSingleFamilyDetails(id).subscribe(
      (res: any) => {
        
        
        
        this.allFamilyData = res?.data;


        let data: any = [];
        if (res.data.length != 0) {
          for (let i = 0; i < res.data.length || this.empSingleData?.family_details.length; i++) {
              
              
            data.push({
              family_member_name: res.data[i]?.family_member_name,
              date_of_birth: res.data[i]?.date_of_birth,
              relation: res.data[i]?.relation,
              contact_number: Number(res.data[i]?.contact_number),
              remark: res.data[i]?.remark,
              family_id: res.data[i]?.family_id,
            });
            
            
          }
          
          
          this.CF_1.tableRows = this.patchFamilyData(data);
          
          
          
        }
      },
      (err) => {
        
      }
    );
  }

  presentCountryChange(e: any) {
    this.presentCountryMethod(e?.value);
  }
  presentCountryMethod(id: any) {
    this.employService.getStateByCountry(id).subscribe(
      (res: any) => {
        if (res && res?.data) {
          this.presentSteteData = res?.data;
          console.log(this.presentSteteData);
          
          
        }
      }
    );
  }
  permanentCountryChange(e: any) {
    this.permanentCountrymethod(e?.value);
  }
  permanentCountrymethod(id: any) {
    if (id) {
      this.employService.getStateByCountry(id).subscribe(
        (res: any) => {
          if (res && res.data) {
            this.permanentStateData = res?.data;
          }
        }
      );
    }
  }
 
  permanentState(e: any) {
    this.permanentGetCityByState(e?.value);
  }
  permanentGetCityByState(id: any) {
    if (id) {
         this.employService.getCityByState(id).subscribe(
      (res: any) => {
        if (res && res.data) {
          this.permanentCityList = res.data;
        }
      }
    );
    }
 
  }
  
  presentStateChange(e:any){
    this.presentGetCityByState(e?.value);
  }
  presentGetCityByState(id: any) {
    console.log(id, 'id');
    
    this.employService.getCityByState(id).subscribe(
      (res: any) => {
        if (res && res?.data) {
          this.presentCityList = res?.data;
        console.log(this.presentCityList);
        
          
          
        }
      }
    );
  }
  
  // presentCityChange(e: any) {
  //   if (e) {
  //     this.getPinCodeByCity(e.value);
  //   }
  // }
  
  // permanentCityChange(e: any) {
  //   if (e) {
  //     this.getPinCodeByCity(e?.value);
  //   }
  // }
  
 
  


  getSinglePreEmployeer(id: any) {
    this.employService.getSinglePrevEmp(id).subscribe(
      (res: any) => {
        
        
        this.allEmployeerData = res.data;

        let data: any = [];
        if (res.data.length != 0) {
          for (let i = 0; i <= res.data.length - 1; i++) {
            data.push({
              company_name: res.data[i].company_name,
              position: res.data[i].position,
              from_date: res.data[i].from_date,
              to_date: res.data[i].to_date,
              last_drawn_salary: res.data[i].last_drawn_salary,
              location: res.data[i].location,
              reson_of_leaving: res.data[i].reson_of_leaving,
              prev_id: res.data[i].prev_id,
            });
          }
          this.CF_1.employerRows = this.patchPreEmployerData(data);
          
        }
      },
      (err) => {
        
      }
    );
  }


    
 
    
    

  

  patchFamilyData(e: any): FormArray {
    
    
    
    return new FormArray(
      e.map((x: any) => {
        const obj = new FormGroup({
          family_member_name: new FormControl(x?.family_member_name),
          date_of_birth: new FormControl(x?.date_of_birth),
          relation: new FormControl(x?.relation),
          contact_number: new FormControl(x?.contact_number),
          remark: new FormControl(x?.remark),
          family_id: new FormControl(x?.family_id)
        });
        return obj;
      })
    );
  
    }
    
     patchPreEmployerData(e: any): FormArray {
      return new FormArray(
        e.map((x: any) => {
          const obj = new FormGroup({});
          Object.keys(x).forEach((k) => {
          if(x?.last_drawn_salary){
            obj.addControl(k, new FormControl(x[k],));
          }else{
            obj.addControl(k, new FormControl(x[k]));
          }
        });
        return obj;
      })
    );
  }

  onSubmitPersonal() {
  
    let val = this.personalForm.value;
    


    
    
    if(this.personalForm.invalid){
      this.toastr.error('Please Fill All Requierd Fields')
      return
     }

    const data = {
      address: val.address,
      country: val.country,
      state: val.state,
      city: val.city,
      pincode: Number(val.pincode), 
      permanent_address: val.permanent_address,
      permanent_country: val.permanent_country,
      permanent_state: val.permanent_state,
      permanent_city: val.permanent_city,
      permanent_pincode: Number(this.pincodeEditWhileDisabled ? val.pincode :val.permanent_pincode ),   
      address_check_value: this.pincodeEditWhileDisabled,  
    };
    let id = this.employeGetID || this.empId; 
   


    this.employService.updateSinglePrasentDetails(id, data).subscribe(  
      (res: any) => {
        
        this.toastr.success('Updated Successfully');
      },
      (err) => {
        this.toastr.error(
          'Something went wrong, please try agian..!',
          'Error Massage'
        );
      }
    ); 

    let personal_data = {
      alternate_mobile:val.alternate_mobile,
      adhar_number:val.adhar_number,
      blood_group: val.blood_group,
      maritial_status: val.maritial_status,
      spouse_name:val.spouse_name,
      pan_number:val.pan_number  
  }

    this.employService.updateEmploypersonal_2(id, personal_data).subscribe(  
      (res: any) => {
        this.updateData = res.data[0];
        
      },
      (err) => {
        this.toastr.error(
          'Something went wrong, please try agian..!',
          'Error Massage'
        );
      }
    );


    // ! create and update all form array

    // form array 1

    if (val.tableRows.length > 0) {
      
      const tableRows = this.personalForm.get('tableRows') as FormArray;

      // Get the value of the employerRows FormArray
      const tableRowsRowsValue = tableRows.value;
      let familyData = tableRowsRowsValue.map((row: any) => ({ ...row, employee_id: Number(this.employeGetID) }));
      
      
      if (this.allFamilyData && this.allFamilyData.length === 0) {
          this.employService.familyCreate(familyData).subscribe(
              (resultNew: any) => {
                  this.toastr.success('Created Successfully..');
              },
              (err) => {
                  this.toastr.error('Something went wrong, please try again!', 'Error Message');
              }
          );
      } else {
          this.employService.updateSingleFamilyDetails(Number(this.employeGetID), familyData).subscribe(
              (res: any) => {
                  this.toastr.success('Updated Successfully..');
              },
              (err) => {
                  this.toastr.error('Something went wrong, please try again!', 'Error Message');
              }
          );
      }
  }

  // Update or create employer details if applicable
  if (val.employerRows.length > 0) {
    
    const employerRows = this.personalForm.get('employerRows') as FormArray;

// Get the value of the employerRows FormArray
const employerRowsValue = employerRows.value;

      let employerData = employerRowsValue.map((row: any) => ({ ...row, employee_id: Number(this.employeGetID) }));
      if (this.allEmployeerData && this.allEmployeerData.length === 0) {
          this.employService.createPrevEmp(employerData).subscribe(
              (res: any) => {
                  this.toastr.success('Created Successfully..');
              },
              (err) => {
                  this.toastr.error('Something went wrong, please try again!', 'Error Message');
              }
          );
      } else {
          this.employService.updateSinglePrevEmp(Number(this.employeGetID), employerData).subscribe(
              (res: any) => {
                  this.toastr.success('Updated Successfully..');
              },
              (err) => {
                  this.toastr.error('Something went wrong, please try again!', 'Error Message');
              }
          );
      }
  }
    // ! form array opration end

    // this.toastr.success("Personal Details submitted successfully..")
    this.route.navigate(
      ['master/hrms/employee-master/employ/employee-create/salary-details'],
      { queryParams: { employee_id: this.employeGetID } }
    );
  }

  addRow() {
    const tableRows = this.personalForm.get('tableRows') as FormArray;
    if (tableRows.value && tableRows?.value.length > 0) {
      let canAddNewRow = true;

      for (const obj of tableRows?.value) {
          if (!obj.family_member_name ) {
              canAddNewRow = false;
              break;
          }
      }
      if (canAddNewRow) {
          // Logic to add a new row
          
           const tableRows = this.personalForm.get('tableRows') as FormArray;
          this.CF_1.tableRows.push(
            new FormGroup({
              family_member_name: new FormControl(null, ),
              date_of_birth: new FormControl(null, ),
              relation: new FormControl(null, ),
              contact_number: new FormControl(null),
              remark: new FormControl(null, ),
            })
          )
    
    
          // ... Add new row logic here
      } else {
          // Show error because some existing rows have empty document files
          this.toastr.error('Please add Family Details first');
          // Display an error message for the user
      }
  } else {
    
  }

  }

  addRowEmploy() {

    const employerRows = this.personalForm.get('employerRows') as FormArray;
    console.log(employerRows, 'asdhas');
    
    
    if (employerRows.value && employerRows?.value.length > 0) {
      let canAddNewRow = true;

      for (const obj of employerRows?.value) {
          if (!obj.company_name ) {
              canAddNewRow = false;
              break;
          }
      }
      if (canAddNewRow) {
          // Logic to add a new row
          
           const employerRows = this.personalForm.get('employerRows') as FormArray;
          this.CF_1.employerRows.push(
            new FormGroup({
              company_name: new FormControl(null, ),
              position: new FormControl(null,),
              from_date: new FormControl(null, ),
              to_date: new FormControl(null, ),
              last_drawn_salary: new FormControl(null, [Validators.min(0)]),
              reson_of_leaving: new FormControl(null, ),
              location: new FormControl(null, ),
            })
          )
    
    
          // ... Add new row logic here
      } else {
          // Show error because some existing rows have empty document files
          this.toastr.error('Please Previous employer details first');
          // Display an error message for the user
      }
  } else {
    
  }

  }

  deleteTableRows(i: number, d: any) {
    
    
    if (
      this.allFamilyData &&
      this.allFamilyData.length != 0 &&
      this.CF_1.tableRows.length > 1
    ) {

      Swal.fire({
        title: 'Are you sure?',
        text: "You want be delete !",
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#be0000',
        cancelButtonColor: '#8B817D',
        confirmButtonText: 'Delete'
      }).then((result) => {
        if (result.isConfirmed) {
          this.employService.deleteSingleFamily(d.value.family_id).subscribe(
            (res) => {
              
              this.toastr.success('Deleted successfully');
              if (this.CF_1.tableRows.length > 1) {
                <FormArray>this.CF_1.tableRows.removeAt(i);
              } else {
                this.toastr.error("Can't Deleted", 'must be one');
              }
            },
            (err) => {
              this.toastr.error('Something went wrong please try agian');
              
            }
          );
        };
      })

    } else if (
      this.allFamilyData &&
      this.allFamilyData.length === 0 &&
      this.CF_1.tableRows.length > 1
    ) {
      <FormArray>this.CF_1.tableRows.removeAt(i);
    } else {
      this.toastr.error("Can't Deleted", 'must be one');
    }
  }
   pincodeEditWhileDisabled = false;
  showPermanent(event: any){


    if (event?.checked) {
      // Set permanent address fields
      
      this.pincodeEditWhileDisabled = true;
      this.personalForm.controls['permanent_address'].setValue(this.personalForm.value?.address);
      this.personalForm.controls['permanent_country'].setValue(this.personalForm.value?.country);
      this.personalForm.controls['permanent_state'].setValue(this.personalForm.value?.state);
      this.personalForm.controls['permanent_city'].setValue(this.personalForm.value?.city);
      this.personalForm.controls['permanent_pincode'].setValue(this.personalForm.value?.pincode);
      this.permanentGetCityByState(this.personalForm.value?.state)
      this.permanentCountrymethod(this.personalForm.value?.country)
      this.personalForm.controls['permanent_pincode'].disable();
    } else {
      // Clear permanent address fields
      this.personalForm.controls['permanent_address'].setValue(undefined);
      this.personalForm.controls['permanent_country'].setValue(undefined);
      this.personalForm.controls['permanent_state'].setValue(undefined);
      this.personalForm.controls['permanent_city'].setValue(undefined);
      this.personalForm.controls['permanent_pincode'].setValue(undefined);
      
      this.personalForm.controls['permanent_pincode'].enable();
      this.resetFlags(); // For example, resetting the flag for pincode changes
    }
    console.log(this.personalForm.value);
  

      
      // Reset flag or perform any other actions specific to this functionality
  
  }
  resetFlags() {
    this.pincodeEditWhileDisabled = false; // Resetting the flag for pincode changes
    // Reset other flags if needed
}
  deleteEmployerRow(i: number, d: any) {
    

    if (
      this.allEmployeerData &&
      this.allEmployeerData.length != 0 &&
      this.CF_1.employerRows.length > 1
    ) {
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#be0000',
        cancelButtonColor: '#8B817D',
        confirmButtonText: 'Delete'
      }).then((result) => {
        if (result.isConfirmed) {
          this.employService.deleteSinglePrevEmp(d.value.prev_id).subscribe(
            (res) => {
              
              this.toastr.success('Deleted successfully');
              if (this.CF_1.employerRows.length > 1) {
                <FormArray>this.CF_1.employerRows.removeAt(i);
              } else {
                this.toastr.error("Can't Deleted", 'must be one');
              }
            },
            (err) => {
              this.toastr.error('Something went wrong please try agian');
              
            }
          );
        };
      })

    } else if (
      this.allEmployeerData &&
      this.allEmployeerData.length === 0 &&
      this.CF_1.employerRows.length > 1
    ) {
      <FormArray>this.CF_1.employerRows.removeAt(i);
    } else {
      this.toastr.error("Can't Deleted", 'must be one');
    }
  }

  getById(){
    this.employService.getById(this.onBoardingId, this.employee_ids).subscribe((res:any)=>{
       this.singleData =res.data;
       let current = this.singleData?.current_addres;
       this.persnalDataPatch(this.empSingleData, this.singleData)
      //  for(let i=0; i< current?.length; i++){
      //   this.personalForm.controls['pincode'].patchValue(current[i]?.pincode);
      //  }
    })
  }

  getAllCountry() {
    this.employService.getAllcountry().subscribe(
      (res: any) => {
        this.countryList = res.data;
        this.variables = this.countryList.map((res: any) => res.countryss_name)
        this.checkData = this.countryList
        this.variable = this.countryList
      })
  };

  // getStateByCountry(id: any) {
  //   console.log(id, 'ddd');
    
  //   this.employService.getStateByCountry(id).subscribe(
  //     (res: any) => {
  //       this.permanentStateData = res.data;
        
   
  //     }
  //   )
  // };





  getPinCodeByCity(id: any) {
    this.employService.getPincodeByCity(id).subscribe(
      (res: any) => {
        this.pincodeList = res.data;
        this.cityVar = this.cityList.map((res: any) => res.city_name);
        this.cityVar2 = this.cityList;
        
        // if(this.presentData){
        //   this.personalForm.controls['pincode'].patchValue(this.presentData.pincode || this.empSingleData?.current_pin_code);
        //   this.personalForm.controls['permanent_pincode'].patchValue(this.presentData.permanent_pincode || this.empSingleData?.parmanent_pin_code,);
        // }
      }
    )
  };



  Skip() {
    this.route.navigate(
      ['master/hrms/employee-master/employ/employee-create/salary-details'],
      { queryParams: { employee_id: this.employeGetID } }
    );
  }
// Function to handle changes for present address
handlePresentAddressChanges(data: any) {
  this.presentCountryMethod(data?.country);
  // this.presentStateChange(data?.state);
  this.presentGetCityByState(data?.state);
}

// Function to handle changes for permanent address
handlePermanentAddressChanges(data: any) {
  console.log(data, 'data1');
  if (data?.parmanent_address) {
    this.permanentCountrymethod(data?.parmanent_address[0].p_country);
    this.permanentGetCityByState(data?.parmanent_address[0].p_state);
  }else{
    this.permanentCountrymethod(data?.permanent_country);
    this.permanentGetCityByState(data?.permanent_state);
  }
  
  // this.permanentState(data?.permanent_state);
}
isAddressChecked(): boolean {
  if (this.empSingleData?.address_check_value === "1" || this.presentData?.address_check_value === "1") {
    return true
  }else{
 return false
  }

}
  persnalDataPatch(personalIdData: any, presentData: any) {
    console.log(presentData, personalIdData,'presentData');
    
    
  this.handlePresentAddressChanges(personalIdData);
  this.handlePermanentAddressChanges(personalIdData || presentData[0] || personalIdData.parmanent_address[0]);

    // Patching data for present address
    this.personalForm.patchValue({
      address: personalIdData?.address || this.empSingleData?.current_addres,
      country: personalIdData?.country || this.empSingleData?.currentcountry,
      state: +personalIdData?.state,
      city: +personalIdData?.city,
      pincode: personalIdData?.pincode || this.empSingleData?.current_pin_code,
      alternate_mobile: personalIdData?.alternate_mobile,
      blood_group: personalIdData?.blood_group,
      maritial_status: personalIdData?.maritial_status,
      spouse_name: personalIdData?.spouse_name,
      pan_number: personalIdData?.pan_number,
      adhar_number: personalIdData?.adhar_number,
    });
  
    // Patching data for permanent address
    this.personalForm.patchValue({
      permanent_address: personalIdData?.parmanent_address[0]?.permanent_address || personalIdData?.permanent_address || this.empSingleData?.parmanent_addres || presentData?.[0].permanent_address ,
      permanent_country:  personalIdData?.parmanent_address[0]?.p_country || personalIdData?.permanent_country || this.empSingleData?.parmanentcountry ||  presentData?.[0].permanent_country,
      permanent_state: personalIdData?.parmanent_address[0]?.p_state || +personalIdData?.parmanent_states ||  presentData?.[0].permanent_state,
      permanent_city: personalIdData?.parmanent_address[0]?.p_city || personalIdData?.permanent_city || presentData?.[0].permanent_city,
      permanent_pincode: personalIdData?.parmanent_address[0]?.p_pin_code || personalIdData?.p_pin_code   || this.empSingleData?.permanent_pincode || presentData?.[0].permanent_pincode,
    });
  }
}
