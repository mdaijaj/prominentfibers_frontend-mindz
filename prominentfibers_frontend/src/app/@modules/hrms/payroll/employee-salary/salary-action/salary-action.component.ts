import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ICellRendererParams } from 'ag-grid-community';

import { ToastrService } from 'ngx-toastr';
import { HrServiceService } from 'src/app/@shared/services/hr-service.service';

@Component({
  selector: 'app-salary-action',
  templateUrl: './salary-action.component.html',
  styleUrls: ['./salary-action.component.scss']
})
export class SalaryActionComponent {
  cellValue: any;
  constructor(private route: Router, private hrServies: HrServiceService,
    private toast: ToastrService) {}
  ngOnInit(): void {
    
  }

  agInit(params: ICellRendererParams): void {
    this.cellValue = this.getValueToDisplay(params);
    
  }
  getValueToDisplay(params: ICellRendererParams) {
    
    return params.valueFormatted ? params.valueFormatted : params.data.employee_id;
  }

  goToEmpConfig(e: any) {
    
      
      e.stopPropagation();
    this.route.navigate(['/master/hrms/payroll/employee-salary/employee-configure'], { queryParams: { employee_id: this.cellValue} });
    
  }
  

}
