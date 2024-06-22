import { Component, Inject } from '@angular/core';
import { OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { GridApi } from 'ag-grid-community';
import { HrServiceService } from 'src/app/@shared/services/hr-service.service';
import { AddTypeActionComponent } from '../add-type-action/add-type-action.component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-add-type-dilog',
  templateUrl: './add-type-dilog.component.html',
  styleUrls: ['./add-type-dilog.component.scss']
})
export class AddTypeDilogComponent implements OnInit {
  componentType_id: any;
  singleAddTypeData: any;
  localTime: any;

  selectedMonth = 'Jan'
  providentFund: boolean = false;
  allFamilyData: any;
  pfForm: FormGroup;
  rowClass: any;
  private gridApi!: GridApi<any>;
  pf_id: any;
  id: any;
  singlePfData: any;
  groupData: any;
  companyData: any;
  companySelect: any;
  formulaList: any;
  condtionList: any = "Please Make Formula";
  val: any = '';
  conditions: any;
  indexVal: any;
  group: any;
  formula: any;
  condIndex: any;
  condVal: any = '';
  stateData: any;
  frontCompData: any;
  backCompData: any;
  rowData: any;
  modify: any;
  rowData2: ({ component_code: number; component_name: number; } | { component_code: string; component_name: string; })[];
  component_id: any;
  componentName: any;
  data_com: { data_com: ({ component_type_id: number; component_name: string; component_code: string; record_add_By: string; employee_id: null; formula: string; Formula_status: string; component_status: string; createdAt: string; updatedAt: string; } | { component_type_id: number; component_name: string; component_code: string; record_add_By: string; employee_id: null; formula: null; Formula_status: string; component_status: string; createdAt: string; updatedAt: string; })[]; };
  emp: { data_emp: ({ first_name: string; last_name: string; tatal_ctc: string; fixed_ctc: string; variable_ctc: string; } | { first_name: string; last_name: string; tatal_ctc: null; fixed_ctc: null; variable_ctc: null; } | { first_name: string; last_name: string; tatal_ctc: string; fixed_ctc: string; variable_ctc: null; } | { first_name: string; last_name: null; tatal_ctc: null; fixed_ctc: null; variable_ctc: null; })[]; };
  showFormula: any = "Please enter formula";
  constructor(private hrServies: HrServiceService,
    private route: Router,
    private toast: ToastrService,
    public dialog: MatDialogRef<AddTypeActionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.component_id = data.id;
  }
  ngOnInit(): void {
    this.getAddType();
  }
  get CF_1(): any {
    return this.pfForm.controls;
  }
  getCondiValue(i: any) {
    this.condIndex = i;
    this.condVal = '';
  }
  getCondiPopValue(condIndex: any) {
    console.log(this.num);
    let formula = this.num.split(',')
    let d = this.num.slice(1,2)
    if(d === ','){
      formula[1] = `${formula[0]}${formula[1]}`
      formula.splice(0,1)
    }

    let ff = {
      formulaName: this.num,
      formula
    };
    const data = {
      formula: ff.formula,
      formula_status: 'Formula Added',
    }
    console.log(data,"data222");

    this.hrServies.addFormula(Number(this.component_id), data).subscribe((res: any) => {
    })
    this.toast.success("Successfully", "Formula Added")
    this.reloadCurrentRoute();
  }
  clearFormulaAll(condIndex: any) {
    let formula = this.CF_1.createPfesiChieldDetails.controls[condIndex].controls.formula;
    formula.patchValue('');
    this.val = '';
  }
  newAdded: any = []
  newNumber: any = []
  blankArray: any = []
  nu: any;
  num: any = '';
  count = 0;
  getCondtion(condition: any, code: any, datas: any) {

    if (this.num === '') {
      this.num = this.num + datas
    } else {
      if (typeof datas === 'number') {
        this.count++
        if (this.num.slice(-1) !== ',') {
          if (this.count === 1) {
            this.num = this.num + ','
          }
        }
        this.num = this.num + datas
      } else {
        this.num = this.num + ',' + datas
        this.count = 0
      }
    }
    console.log(this.num);
    this.showFormula = this.num.replaceAll(',', '');
  
  }
  reloadCurrentRoute() {
    let currentUrl = this.route.url;
    this.route.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.route.navigate([currentUrl]);
    });
  }
  clearCondAll(condIndex: any) {
    let condition = this.CF_1.createPfesiChieldDetails.controls[condIndex].controls.condition;
    condition.patchValue('');
    this.condVal = '';
  }
  getAddType() {
    let staticComp:any=[
      { component_code: 'tatal_ctc', component_name: "Total CTC" },
      { component_code: 'fixed_ctc', component_name: "Fixed CTC" },
      { component_code: 'variable_ctc', component_name: "Variable CTC" },
    ]
    const numberArray = [

      { component_code: 1, component_name: 1 },
      { component_code: 2, component_name: 2 },
      { component_code: 3, component_name: 3 },
      { component_code: 4, component_name: 4 },
      { component_code: 5, component_name: 5 },
      { component_code: 6, component_name: 6 },
      { component_code: 7, component_name: 7 },
      { component_code: 8, component_name: 8 },
      { component_code: 9, component_name: 9 },
      { component_code: 0, component_name: 0 },
      { component_code: '-', component_name: `-` },
      { component_code: '+', component_name: '+' },
      { component_code: '=', component_name: '=' },
      { component_code: '*', component_name: '*' },
      { component_code: '.', component_name: '.' },
      { component_code: '/', component_name: '/' },
      { component_code: `/,100`, component_name: '%' },
      { component_code: '(', component_name: '(' },
      { component_code: ')', component_name: ')' },
      { component_code: '<', component_name: '<' },
      { component_code: '>', component_name: '>' },
    ];
    this.rowData2 = numberArray
    this.hrServies.getAddTypeList().subscribe((res: any) => {
      this.rowData = res.data;
      this.rowData.push(...staticComp)
      this.modify = [...this.rowData, ...numberArray]
    });
  }
  clear(){
    this.num=''
    this.showFormula=''
  }
}
