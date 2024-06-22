import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { GridApi, GridReadyEvent } from 'ag-grid-community';
import { ToastrService } from 'ngx-toastr';
import { HrServiceService } from 'src/app/@shared/services/hr-service.service';
import { debounceTime, distinctUntilChanged, fromEvent, map } from 'rxjs';
import { Location } from '@angular/common';
@Component({
  selector: 'app-employee-configure',
  templateUrl: './employee-configure.component.html',
  styleUrls: ['./employee-configure.component.scss']
})
export class EmployeeConfigureComponent {
  @ViewChild('ctc') ctc: ElementRef;
  form: FormGroup;
  // data=[
  //   {name: 'vrajesh', quantity: '30'},
  //   {name: 'singh', quantity: '50'},
  //   {name: 'Raj', quantity: '54'},
  //   {name: 'sita', quantity: '9999'},
  //   {name: 'sami', quantity: '77'},
  //   {name: 'ruhi', quantity: '55'},
  //   {name: 'rajeev', quantity: '44'},

  // ]


  isDisabled = true;
  configForm:FormGroup;
  errorMsg: string;
  designations: any;
  companySelect: any;
  gradeData: any;
  groupData: any;
  depData: any;
  emp_id: any;
  id: any;
  configData: any;
  payrollData_emp: any;
  component: any;
  constructor(private route: Router, private fb: FormBuilder,
    private hrServies: HrServiceService,
    private toast: ToastrService, private activeroute: ActivatedRoute,private location: Location) {
    this.rowClass = 'rowClass'
    this.form = this.fb.group({
      items: this.fb.array([]) 
    });
    }

  
    get items(): FormArray {
      return this.form.get('items') as FormArray;
    }
    patchValue(data:any){
      for (let a=0;a<data.length;a++) {
        this.items.push(
          this.fb.group({
            compoentCode: data[a].compoentCode,
            amount: data[a].amount,
            component_type_id: data[a].componentTypeid,

          })
        );
    }
    }

    submit(){

    }
    getById(id:any){
      this.hrServies.payrollGetBYID(id).subscribe((res:any)=>{
        this.payrollData_emp=res.data[0].first_name
        this.component=res.data[0].componentCalculations
        console.log(res,"get data ud");
    this.patchValue(this.component);
    this.form.controls['items'].disable();
        console.log(this.payrollData_emp,"get data ud");
        console.log(this.component,"get data ud"); 
      })
    }
  ngOnInit() {

    this.hrServies.getGroup().subscribe((res: any) => {
      this.groupData = res.data;
      
      
    })
    this.getAllGrade();
    this.hrServies.getDepList().subscribe((res: any) => {
      this.depData = res.data;
    })

    this.activeroute.queryParams.subscribe((params: any) => {
      this.id = params;
      
      this.emp_id = params.employee_id;
    this.getById(this.emp_id);
      
    });

    this.hrServies.configGetById(this.emp_id).subscribe((res:any)=>{
      this.configData =res.data.componentpayrolls;
      
    })
    // for(let i=0; i< this.salaryFormula.length; i++){

    //   this.CF_1.configuration.push(
    //     new FormControl(this.salaryFormula[i].componentName, Validators.required)
    //       )

    // }

    // 
    

  }
  goBack() {
    this.location.back();
  }

  goBackHolidayList(path:any){
 this.route.navigate([path])
  }

  onSubmitForm() {
    console.log(this.form.value.items);
  
    const dd1={
      employee_id:Number(this.emp_id),
      componentData:this.form.value.items

    };
   let data={data:dd1}

console.log(data,"data check ");

    // const data=this.form.value.items

    this.hrServies.updatePayroll(this.emp_id,data).subscribe((res:any)=>{
     console.log(res);
     
      
    })
    
    // let val = this.  configForm.value;
    // 
    // const data = {
    
    // };
    // 
    // if(!this.configForm.invalid){
    //   this.toast.success('Employee Salary Save')
    //   this.configForm.reset()
    //   this.route.navigate(['master/hrms/payroll/payroll-master/employee-salary'])
    // }
    // else{
    //   this.toast.error('Field  is requerd')
    // }
}

onCancel(){
  this.configForm.reset();
  this.route.navigate(['/master/hrms/payroll/payroll-master/employee-salary'])

}

  fileInputChange(fileInput: File[] | any) {
    this.errorMsg = '';
    if (fileInput.target.files && fileInput.target.files[0]) {
      const file = fileInput.target.files[0];
      const reader = new FileReader();
      const fileSizeInMb = file.size / 1024 ** 2;
      if (fileSizeInMb > 30) {
        // this.errorMsg = 'File size should be less than 30MB';
        return;
      }
      reader.onload = (e: any) => {
        // this.fileDetails.filePath = reader.result;
      };
      reader.readAsDataURL(file);
      // this.fileDetails.file = file;
    } else {
      // this.fileDetails = { filePath: '', file: null };
    }
  }


  rowClass: any;
  private gridApi!: GridApi<any>;

  goToEmpList(path:any) {
    this.route.navigate([path]);
  }
  goToEmp(path:any){
    this.route.navigate([path]);

  }


  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;
    

  }

  onGroupChanges(ev:any){
    
    let data:any  = this.groupData.find((e:any) => e.addGroup_id === Number(ev))
    
    this.companySelect = data?.['Add Companies'].companyName;
    
   }
 
   onGroupChange(ev:any){
     
     
    let data:any  = this.groupData.find((e:any) => e.addGroup_id === Number(ev.value))
    
    this.companySelect = data?.['Add Companies'];
    
   }

   onDepChanges(ev:any){
    
    let data:any  = this.depData.find((e:any) => e.dept_id === Number(ev))
    
    this.companySelect = data?.designations.designation_name;
    
   }
 
   onDepChange(ev:any){
     
     
    let data:any  = this.depData.find((e:any) => e.dept_id === Number(ev.value))
    
    this.designations = data?.designations;
    
   }

   getAllGrade(){
    this.hrServies.getAllGrade().subscribe((res:any) =>{
      this.gradeData = res.data;
    })
   }

   triggerSomeEvent(item:any,index:any,event:any) {
    


    console.log(event);
    console.log(item);

    
    
    if(event.target.checked==true){
      const enabee=this.items.at(index)
      enabee.enable();
    }
    else{
      const enabee=this.items.at(index)
      enabee.disable();
    }

    // this.form.controls['items'].at(index).enable();
      //  this.isDisabled = !this.isDisabled;
      //  return;
   }

   gradeSelection(e:any){
    let grade_id =e.value;
    
    this.hrServies.configGetById(34).subscribe((res:any)=>{
      this.configData =res.data.componentpayrolls;
      
    })
   }
   dummayCheck(){
    this.route.navigate(['master/hrms/payroll/employee-salary/check_dummy'])
   }

}
