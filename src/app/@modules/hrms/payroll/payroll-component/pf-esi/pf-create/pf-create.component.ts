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
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-pf-create',
  templateUrl: './pf-create.component.html',
  styleUrls: ['./pf-create.component.scss']
})
export class PfCreateComponent {
  // selectedEmp:any;
  selectedMonth = 'Jan'
  providentFund:boolean= false;
  allFamilyData: any;
  pfForm: FormGroup;
  rowClass: any;
  private gridApi!: GridApi<any>;
  pf_id: any;
  id: any;
  singlePfData: any;
  groupData: any;
  companyData:any;
  companySelect: any;
  formulaList:any;
  condtionList:any;
  val:any = '';
  conditions:any;
  indexVal:any;
  
  pfChildMonth =[
    {value:"Jan"},
    {value:"Feb"},
    {value:"Mar"},
    {value:"Apr"},
    {value:"May"},
    {value:"Jun"},
    {value:"Jul"},
    {value:"Aug"},
    {value:"Sep"},
    {value:"Oct"},
    {value:"Nov"},
    {value:"Dec"}

  ]

  group: any;
  formula: any;
  condIndex:any;
  condVal: any ='';
  stateData: any;
  frontCompData: any;
  backCompData: any;



  constructor(private route: Router, private fb: FormBuilder,
    private hrServies: HrServiceService,
    private toast: ToastrService, private activeroute: ActivatedRoute,
    public dialog: MatDialog) {
    this.rowClass = 'rowClass';

    this.pfForm = this.fb.group({
      addGroup_name: new FormControl(null, [Validators.required]),
      companyName: new FormControl(null, [Validators.required]),
      component_type: new FormControl(null, [Validators.required]),
      frontComponent: new FormControl(null, [Validators.required]),
      backComponent: new FormControl(null, [Validators.required]),
      description: new FormControl(null, [Validators.required]),
      createPfesiChieldDetails: new FormArray([
        new FormGroup({
          empType: new FormControl(null, [Validators.required]),
          condition: new FormControl(null, [Validators.required]),
          formula: new FormControl(null, [Validators.required]),
          startDate: new FormControl(null, [Validators.required]),
          endDate: new FormControl(null, [Validators.required]),
          state: new FormControl(null, [Validators.required]),
          month: new FormControl(null, [Validators.required]),
          amount: new FormControl(null, [Validators.required]),
        }),
      ]),
    })
  }

  ngOnInit() {
    this.getBackComp();
    this.getFrontComp();
    this.getBackComp();
    this.activeroute.queryParams.subscribe((params: any) => {
      this.id = params;
      this.pf_id = params.pfesi_id;
      
    });
    if (this.pf_id) {
      this.hrServies.getPfById(this.pf_id).subscribe((res: any) => {
        this.singlePfData = res.data;
        
        let childdata = this.singlePfData.createPfesiChieldDetails;
        
        this.pfForm.patchValue({
          addGroup_name: this.singlePfData.addGroup_name,
          companyName: this.singlePfData.companyName,
          frontComponent: this.singlePfData.frontComponent,
          backComponent: this.singlePfData.backComponent,
          description: this.singlePfData.description,
        });

        for(let i= 0; i < childdata.length; i++){
          if(i !=0){
            this.addRow();
          }
          
          this.CF_1.createPfesiChieldDetails.controls[i].controls.condition.patchValue(childdata[i].condition);
          this.CF_1.createPfesiChieldDetails.controls[i].controls.month.patchValue(childdata[i].month);
          this.CF_1.createPfesiChieldDetails.controls[i].controls.state.patchValue(childdata[i].state);
          this.CF_1.createPfesiChieldDetails.controls[i].controls.amount.patchValue(childdata[i].amount);
          this.CF_1.createPfesiChieldDetails.controls[i].controls.empType.patchValue(childdata[i].empType);
          this.CF_1.createPfesiChieldDetails.controls[i].controls.endDate.patchValue(childdata[i].endDate);
          this.CF_1.createPfesiChieldDetails.controls[i].controls.formula.patchValue(childdata[i].formula);
          this.CF_1.createPfesiChieldDetails.controls[i].controls.startDate.patchValue(childdata[i].startDate);
        }
      })
      
        // this.onGroupChanges(this.singlePfData.SelectGroup)

    } else {
      
    }

      this.hrServies.getGroup().subscribe((res: any) => {
        this.groupData = res.data;
        
        
      })

      this.hrServies.getState().subscribe((res:any) =>{
        this.stateData = res.data;
      })     
  }

  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;
    

  }

  onCancel(path:any) {
  this.route.navigate([path])
  }
  get CF_1(): any {
    return this.pfForm.controls;
  }

  onSubmit() {
    const data =this.pfForm.value;
    // if (this.pfForm.invalid) {
    //   this.toast.error("Required fields should not be empty", "Fields Error")
    //   
    //    return;
    //  }
    this.hrServies.addPfCreate(data).subscribe((res: any) => {
      
      if (res.code == 200) {
        this.toast.success(res.message);
        this.route.navigate(['master/hrms/payroll/payroll-master/payroll-component/pf-list']);
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

  addRow() {
    // if (this.allFamilyData && this.allFamilyData.length != 0) {
    //   // this.toastr.warning('You are not able to add new Family Details');
    // } else if (this.allFamilyData && this.allFamilyData.length === 0) {
       if (this.pfForm.value.frontComponent) {
      <FormArray>this.CF_1.createPfesiChieldDetails.push(
        new FormGroup({
          empType: new FormControl(null, [Validators.required]),
          condition: new FormControl(null, [Validators.required]),
          formula: new FormControl(null, [Validators.required]),
          startDate: new FormControl(null, [Validators.required]),
          endDate: new FormControl(null, [Validators.required]),
          state: new FormControl(null, [Validators.required]),
          month: new FormControl(null, [Validators.required]),
          amount: new FormControl(null, [Validators.required]),
        })
       );
       this.val = ''
      }
      if (!this.pfForm.value.frontComponent) {
      this.toast.error('Component Type is Required');
      }
  }

  frontComponentChange(e:any){
    
    if(e.value=="LWF" || e.value=="PT"){
      this.providentFund= true;
    }
    else {
      this.providentFund= false;
    }

  }

  deleteTableRows(i: number, d: any) {
    
    if(this.CF_1.createPfesiChieldDetails.length > 1){
      <FormArray>this.CF_1.createPfesiChieldDetails.removeAt(i);
    }
    if(this.CF_1.createPfesiChieldDetails.length == 1){
      this.toast.error('One Field is mendatory');
    }
             
  }

  onUpdateForm() {
    const data =this.pfForm.value;
    this.hrServies.updatePf(this.pf_id, data).subscribe(
      (res: any) => {
        
        this.toast.success('PF Data Updated Successfully..');
        this.route.navigate(['master/hrms/payroll/payroll-master/payroll-component/pf-list']);
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
  onGroupChanges(ev:any){
   
   let data:any  = this.groupData.find((e:any) => e.addGroup_id === Number(ev))
   
   this.companySelect = data?.['Add Companies'].companyName;
   
  }

  onGroupChange(ev:any){
    
    
   let data:any  = this.groupData.find((e:any) => e.addGroup_id === Number(ev.value))
   
   this.companySelect = data?.['Add Companies'];
   
  }

  getValue(i: any){
    
    this.indexVal = i;  
    this.val='';
    
  }

  getPopValue(index:any){
    
    let controlArray = this.CF_1.createPfesiChieldDetails.controls[index].controls.formula;
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
    
    let condtion = this.CF_1.createPfesiChieldDetails.controls[condIndex].controls.condition;
    condtion.patchValue(this.condtionList);
  }

  clearFormulaAll(condIndex:any){
    let formula = this.CF_1.createPfesiChieldDetails.controls[condIndex].controls.formula;
    formula.patchValue('');
    this.val='';
  }
 
  getCondtion(condition:any){
    this.condVal += condition;
    let cond = JSON.stringify(this.condVal)
    let data = JSON.parse(cond);
    this.condtionList = data;
    
  }  

  clearCondAll(condIndex:any){
    let condition = this.CF_1.createPfesiChieldDetails.controls[condIndex].controls.condition;
    condition.patchValue('');
    this.condVal='';
  }

  empType(e:any,i:any){
    
    
    this.CF_1.createPfesiChieldDetails.controls[i].controls.empType.patchValue(e.value);
  } 
  
  getFrontComp(){
    this.hrServies.getFrontComp().subscribe((res:any)=>{
      this.frontCompData = res.data;
    })
  }
  getBackComp(){
    this.hrServies.getBackComp().subscribe((res:any)=>{
      this.backCompData = res.data;
    })
  }


}

