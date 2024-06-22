import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  GridApi,
  GridReadyEvent
} from 'ag-grid-community';
import 'ag-grid-enterprise';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,FormArray
} from '@angular/forms';
import { HrServiceService } from 'src/app/@shared/services/hr-service.service';
import { ToastrService } from 'ngx-toastr';
import { ConfigureDilogComponent } from './configure-dilog/configure-dilog.component';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-configuration-create',
  templateUrl: './configuration-create.component.html',
  styleUrls: ['./configuration-create.component.scss']
})
export class ConfigurationCreateComponent {
  selectedEmp = 'Employer';
  selectedMonth = 'Jan'
  selectedState = 'Delhi'
  providentFund:boolean= false;
  allFamilyData: any;
  configForm: FormGroup;
  rowClass: any;
  private gridApi!: GridApi<any>;
  rowItem: boolean= false;
  companySelect: any;
  groupData: any;
  depData: any;
  designations: any;
  gradeData: any;
  myObject: any;
  componentName: any=[];
  ConfigChild: any=[];
  id: any;
  config_id: any;
  ConfigDataById: any;
  formulaList:any;
  condtionList:any;
  val:any = '';
  conditions:any;
  indexVal:any;
  condIndex: any;
  condVal: string;
  constructor(private route: Router, 
    private fb: FormBuilder,
    private activeroute: ActivatedRoute,
    private hrServies: HrServiceService,
    private toast: ToastrService,public dialog: MatDialog) {
    this.rowClass = 'rowClass';

    this.configForm = this.fb.group({
      addGroup_name: new FormControl(null, [Validators.required]),
      companyName: new FormControl(null, [Validators.required]),
      designation_id: new FormControl(null, [Validators.required]),
      grade_id: new FormControl(null, [Validators.required]),
      dept_id: new FormControl(null, [Validators.required]),
      effect_From: new FormControl(null, [Validators.required]),
      effect_To: new FormControl(null, [Validators.required]),
      configuration: new FormArray([]),
    })
  }

  ngOnInit() {
    this.hrServies.getGroup().subscribe((res: any) => {
      this.groupData = res.data;
      
      this.myObject = this.hrServies.myObject;
    })
    
    this.getAllGrade();
    this.hrServies.getDepList().subscribe((res: any) => {
      this.depData = res.data;
    })

    this.activeroute.queryParams.subscribe((params: any) => {
      this.id = params;
      
      this.config_id = params.conFigure_id;
      
    });

    this.hrServies.configGetById(this.config_id).subscribe((res:any) =>{
      this.ConfigDataById = res.data;
      this.ConfigChild =  this.ConfigDataById.configuration
      this.configForm.patchValue({
        addGroup_name: this.ConfigDataById.addGroup_name,
        companyName: this.ConfigDataById.companyName,
        department_name: this.ConfigDataById.department_name,
        designation_id: this.ConfigDataById.designation_id,
        grade_name: this.ConfigDataById.grade_name,
        effect_From: this.ConfigDataById.effect_From,
        effect_To: this.ConfigDataById.effect_To,
      })
      for(let i= 0; i < this.ConfigChild.length; i++){
        this.CF_1.configuration.push(
          new FormGroup({
            componentName: new FormControl(this.ConfigChild[i].componentName),
            configurationF: new FormControl(this.ConfigChild[i].configurationF),
          })
         );
         this.rowItem =true;
      }
    })


    // this.rowItem =this.CF_1.payRollConfigChieldDetails.length > 0 ?false :true;
  }

  onGridReady(params: GridReadyEvent) {0.
    this.gridApi = params.api;
    

  }

  onCancel(path:any) {
  this.route.navigate([path])
  }
  get CF_1(): any {
    return this.configForm.controls;
  }

  onSubmit() {
     const data = this.configForm.value; 
     
     if(data){
       this.hrServies.createCongfigure(data).subscribe((res: any) => {
         
         if (res.code == 200) {
           this.toast.success(res.message);
           this.route.navigate(['master/hrms/payroll/payroll-master/payroll-component/configuration']);
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

  }


  addRow() {
      <FormArray>this.CF_1.configuration.push(
        new FormGroup({
          componentName: new FormControl(null),
          configurationF: new FormControl(null),
        })
       );
       this.rowItem =true
      

  }
  selectCompny(e:any){
    
    
    
  }

  frontComponentChange(e:any){
    
    if(e.value=="3" || e.value=="4"){
      this.providentFund= true;
    }
    else {
      this.providentFund= false;
    }

  }

  openAddRowModal(){
    const dialogRef = this.dialog.open(ConfigureDilogComponent, { width: '600px', data:this.ConfigChild});
    dialogRef.afterClosed().subscribe(result => {
      
       this.ConfigChild= result;    
      for(let i=0; i< result.length; i++){
        this.componentName.push(result[i].component);
        
        <FormArray>this.CF_1.configuration.push(
          new FormGroup({
            componentName: new FormControl(result[i].component), 
            configurationF: new FormControl(result[i].Type),
          })
         );
      }
      this.rowItem =result? true: false
     
    })
  }

  deleteTableRows(i: number, d: any) {
    
      <FormArray>this.CF_1.configuration.removeAt(i);
      this.rowItem = true;
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
    
    this.companySelect = data?.designations.designation_id;
    
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

   getValue(i: any){
    
    this.indexVal = i;  
    this.val='';
    
  }


   getPopValue(index:any){
    
    let controlArray = this.CF_1.configuration.controls[index].controls.configurationF;
    controlArray.patchValue(this.formulaList);
  }
 
  getFormula(formula:any){
    this.val += formula;
    let st = JSON.stringify(this.val)
    let jj = JSON.parse(st);
    this.formulaList = jj;
    
    // this.formulaList = ''
    
  }

  getCondiValue(i: any){
    
    this.condIndex = i;  
    this.condVal='';
    
  }

  getCondiPopValue(condIndex:any){
    
    let condtion = this.CF_1.configuration.controls[condIndex].controls.condition;
    condtion.patchValue(this.condtionList);
  }

  clearFormulaAll(condIndex:any){
    let formula = this.CF_1.configuration.controls[condIndex].controls.configurationF;
    formula.patchValue('');
    this.val='';
  }
 
 
 
}
