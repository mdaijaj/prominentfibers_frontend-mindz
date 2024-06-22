import { Component, Inject } from '@angular/core';
import {  MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ICellRendererParams } from 'ag-grid-community';
import { ToastrService } from 'ngx-toastr';
import { HrServiceService } from 'src/app/@shared/services/hr-service.service';

@Component({
  selector: 'app-itr-dilog',
  templateUrl: './itr-dilog.component.html',
  styleUrls: ['./itr-dilog.component.scss']
})
export class ItrDilogComponent {
  cellValue: any;
  itr_id: any;
  getItrData: any;
  constructor(private route: Router, private hrServies: HrServiceService,
    private toast: ToastrService,public dialog: MatDialogRef<ItrDilogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      this.itr_id = this.data.id;
      
    }
  ngOnInit(): void {
    if(this.itr_id){

      this.hrServies.getitrDeduc(this.itr_id).subscribe((res:any) =>{
        this.getItrData =res.data;
      })
    }
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
