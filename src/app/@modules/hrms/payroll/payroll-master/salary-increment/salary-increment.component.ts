import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { HrServiceService } from 'src/app/@shared/services/hr-service.service';

@Component({
  selector: 'app-salary-increment',
  templateUrl: './salary-increment.component.html',
  styleUrls: ['./salary-increment.component.scss']
})
export class SalaryIncrementComponent {
  configData:any
  EmpListData: any;
  depData: any;
  companySelect: any;
  groupData: any;
  gradeData: any;
  designations: any;
  id: any;
  salaryDataById: any;
  salaryIncreForm:FormGroup
  myObject: any;
  constructor(
    private route: Router,
    private hrServies: HrServiceService,
    private fb: FormBuilder,public dialog: MatDialog,
    private activeroute: ActivatedRoute,
  ) {
    this.getEmpList();

    this.salaryIncreForm = this.fb.group({
      first_name: new FormControl(null, [Validators.required]),
      designation: new FormControl(null, [Validators.required]),
      department: new FormControl(null, [Validators.required]),
      increment_type: new FormControl(null, [Validators.required]),
      increment_Value: new FormControl(null, [Validators.required]),
    });
  }

  ngOnInit() {
    this.getEmpList();
    this.hrServies.getDepList().subscribe((res: any) => {
      this.depData = res.data;
    })
    this.getAllGrade();

    this.activeroute.queryParams.subscribe((params: any) => {
      this.id = params;
      this.id = params.id;
      
    });

    this.hrServies.getSalaryIncrementById(this.id).subscribe((res:any)=>{
      this.salaryDataById =res.result;
    })

    this.hrServies.getGroup().subscribe((res: any) => {
      this.groupData = res.data;
      
      this.myObject = this.hrServies.myObject;
    })
    

  }

  getAllGrade(){
    this.hrServies.getAllGrade().subscribe((res:any) =>{
      this.gradeData = res.data;
    })
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

  getEmpList() {
    this.hrServies.getAllEmp().subscribe((res: any) => {
      this.EmpListData = res.data;
      
    });
  }
}
