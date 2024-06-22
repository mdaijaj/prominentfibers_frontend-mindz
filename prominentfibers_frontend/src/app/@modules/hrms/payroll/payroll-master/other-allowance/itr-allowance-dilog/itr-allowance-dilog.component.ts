import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ICellRendererParams } from 'ag-grid-community';
import { ToastrService } from 'ngx-toastr';
import { HrServiceService } from 'src/app/@shared/services/hr-service.service';

@Component({
  selector: 'app-itr-allowance-dilog',
  templateUrl: './itr-allowance-dilog.component.html',
  styleUrls: ['./itr-allowance-dilog.component.scss']
})
export class ItrAllowanceDilogComponent {
  cellValue: any;
  itr_id: any;
  getItrData: any;
  constructor(private route: Router, private hrServies: HrServiceService,
    private toast: ToastrService, public dialog: MatDialogRef<ItrAllowanceDilogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      this.itr_id = this.data.id;
      
    }
    
  ngOnInit(): void {
    this.hrServies.getitrAllow(this.itr_id).subscribe((res:any)=>{
      this.getItrData = res.data;
    })
  }

  agInit(params: ICellRendererParams): void {
    this.cellValue = this.getValueToDisplay(params);
    
  }
  getValueToDisplay(params: ICellRendererParams) {
    
    return params.valueFormatted ? params.valueFormatted : params.data.id;
  }

  // goToEmpConfig(e: any) {
  //     
  //     e.stopPropagation();
  //   this.route.navigate(['/master/hrms/payroll/payroll-master/employee-configure'], { queryParams: { employee_id: this.cellValue} });
  //   
  // }
}
