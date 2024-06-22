import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { GridApi, GridReadyEvent } from 'ag-grid-community';
import { ToastrService } from 'ngx-toastr';
import { HrServiceService } from 'src/app/@shared/services/hr-service.service';
import { debounceTime, distinctUntilChanged, fromEvent, map } from 'rxjs';
@Component({
  selector: 'app-employee-configure',
  templateUrl: './employee-configure.component.html',
  styleUrls: ['./employee-configure.component.scss']
})
export class EmployeeConfigureComponent {
  @ViewChild('ctc') ctc: ElementRef;
  salaryFormula =[
    {
      componentName: "CTC",
      configrationV: "CTC"
    },
    {
      componentName: "basicSalary",
      configrationV: 40
    },
    {
      componentName: "HRA",
      configrationV: 50,
    },
    {
      componentName: "DA",
      configrationV: 20
    },
    {
      componentName: "PF",
      configrationV: 12
    }
  ]


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
    private toast: ToastrService, private activeroute: ActivatedRoute,) {
    this.rowClass = 'rowClass'
    this.configForm = this.fb.group({
      addGroup_name: new FormControl(null, [Validators.required]),
      companyName: new FormControl(null, [Validators.required]),
      designation_name: new FormControl(null, [Validators.required]),
      grade_name: new FormControl(null, [Validators.required]),
      department_name: new FormControl(null, [Validators.required]),
      EffectFrom: new FormControl(null, [Validators.required]),
      EffectTo: new FormControl(null, [Validators.required]),
      configuration: new FormArray([]),
    })
    }

    get CF_1(): any {
      return this.configForm.controls;
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


  goBackHolidayList(path:any){
 this.route.navigate([path])
  }

  onSubmitForm() {
    let val = this.configForm.value;
    
    const data = {
    
    };
    
    if(!this.configForm.invalid){
      this.toast.success('Employee Salary Save')
      this.configForm.reset()
      this.route.navigate(['master/hrms/payroll/payroll-master/employee-salary'])
    }
    else{
      this.toast.error('Field  is requerd')
    }
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

   triggerSomeEvent() {
       this.isDisabled = !this.isDisabled;
       return;
   }

   gradeSelection(e:any){
    let grade_id =e.value;
    
    this.hrServies.configGetById(34).subscribe((res:any)=>{
      this.configData =res.data.componentpayrolls;
      
    })
   }

}
