import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { HrServiceService } from 'src/app/@shared/services/hr-service.service';
import { SalaryUploadDilogComponent } from './salary-upload-dilog/salary-upload-dilog.component';
import { GridApi } from 'ag-grid-community';
import * as XLSX from 'xlsx';


@Component({
  selector: 'app-process',
  templateUrl: './process.component.html',
  styleUrls: ['./process.component.scss']
})
export class ProcessComponent {
  paySlipForm: FormGroup;
  EmpListData: any;
  private gridApi!: GridApi<any>;

  public month = [
    { value: 'January' },
    { value: 'February' },
    { value: 'March' },
    { value: 'April' },
    { value: 'May' },
    { value: 'June' },
    { value: 'July' },
    { value: 'August' },
    { value: 'September' },
    { value: 'October' },
    { value: 'November' },
    { value: 'December' },
  ];
  depData: any;
  empData: any;
  data: any;
  constructor(
    private route: Router,
    private hrServies: HrServiceService,
    private fb: FormBuilder,public dialog: MatDialog
  ) {
    this.getEmpList();

    this.paySlipForm = this.fb.group({
      fiscal_year: new FormControl(null, [Validators.required]),
      pay_period: new FormControl(null, [Validators.required]),
      employee: new FormControl(null, [Validators.required]),
      dep: new FormControl(null, [Validators.required]),
    });
  }

  ngOnInit() {
    this.getEmpList();
    this.hrServies.getDepList().subscribe((res: any) => {
      this.depData = res.data;
    })
  }

  getEmpList() {
    this.hrServies.getAllEmp().subscribe((res: any) => {
      this.EmpListData = res.data;
      
    });
  }

  uploadSalary(e: any) {
    if(!this.paySlipForm.invalid){
    
    const dialogRef = this.dialog.open(SalaryUploadDilogComponent, { width: '400px', data:null});
    dialogRef.afterClosed().subscribe(result => {
      
    })
  }
  }

  selectDep(e:any){
    
    this.hrServies.getEmpByDepId(e.value).subscribe((res:any)=>{
      this.empData = res.result;
    })

  }
    
  onBtnExportDataAsExcel() {
    this.data = this.paySlipForm.value.employee
    let userList = [

      {
      
      "SNo": 1,
      "Name of persons employed": this.data,
      "Employee ID": "1",
      "Basic Salary": "50000",
      "Books and Periodicals": 500,
      "CTC": "1000000",
      "Diesel": "100",
      "Employee ESI": "1200",
      "Employee LWF": "1200",
      "Employee PF": "1200",
      "House Rent Allowance": "1200",
      "Income Tax": "1000",
      "Professional Tax": "200",
      "Total Salary": "55000",
      },
      
      ]
    if(!this.paySlipForm.invalid){

      let filename = 'AllTransactionReports.xlsx';
        let data = userList;
        let ws = XLSX.utils.json_to_sheet(data);
        var wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "People");
        XLSX.writeFile(wb, filename);
    }  
  }

}
