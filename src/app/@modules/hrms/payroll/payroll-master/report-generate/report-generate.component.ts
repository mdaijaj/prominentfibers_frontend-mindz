import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HrServiceService } from 'src/app/@shared/services/hr-service.service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-report-generate',
  templateUrl: './report-generate.component.html',
  styleUrls: ['./report-generate.component.scss']
})
export class ReportGenerateComponent {
  rowClass: string;
  reportGenForm:FormGroup;
  EmpListData: any;
  
  public month =[
    {value:"January"},
    {value:"February"},
    {value:"March"},
    {value:"April"},
    {value:"May"},
    {value:"June"},
    {value:"July"},
    {value:"August"},  
    {value:"September"},
    {value:"October"},
    {value:"November"},
    {value:"December"},
  ];
  reportData: any;
  data: any;

  constructor(private route: Router,private hrServies: HrServiceService,
    private toast: ToastrService,public dialog: MatDialog,private fb: FormBuilder) {
    this.rowClass = 'rowClass';

    this.reportGenForm = this.fb.group({
      fiscal_year: new FormControl(null, [Validators.required]),
      pay_period: new FormControl(null, [Validators.required]),
      employee: new FormControl(null, [Validators.required]),
    })
  }

  ngOnInit(){
    this.hrServies.getAllEmp().subscribe((res: any) => {
      this.EmpListData = res.data;
      
    }); 
  }

  selectChange(e:any){
    this.hrServies.reportGenerate(e.value).subscribe((res:any)=> {
      this.reportData =res.result;
      this.toast.success(res.message, 'Success');
    })

  }

  onBtnExportDataAsExcel() {
    this.data = this.reportGenForm.value.employee
    if(!this.reportGenForm.invalid){

      let filename = 'AllTransactionReports.xlsx';
        let data =  this.reportData;
        let ws = XLSX.utils.json_to_sheet(data);
        var wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "People");
        XLSX.writeFile(wb, filename);
    }  
  }


}
