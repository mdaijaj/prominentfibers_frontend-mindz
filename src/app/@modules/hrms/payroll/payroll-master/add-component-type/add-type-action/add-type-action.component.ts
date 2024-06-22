import { Component,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ICellRendererParams } from 'ag-grid-community';
import { ToastrService } from 'ngx-toastr';
import { HrServiceService } from 'src/app/@shared/services/hr-service.service';

@Component({
  selector: 'app-add-type-action',
  templateUrl: './add-type-action.component.html',
  styleUrls: ['./add-type-action.component.scss']
})
export class AddTypeActionComponent implements OnInit {
  cellValue: any;
  constructor(private route: Router, private hrServies: HrServiceService,
    private toast: ToastrService) {}
  ngOnInit(): void {
    
  }

  agInit(params: ICellRendererParams): void {
    this.cellValue = this.getValueToDisplay(params);
    
  }
  getValueToDisplay(params: ICellRendererParams) {
    
    return params.valueFormatted ? params.valueFormatted : params.data.componentType_id;
  }
  
  edit(e: any) {
    e.stopPropagation();
    this.route.navigate(['master/hrms/payroll/payroll-master/payroll-component/add-type-create'],
      { queryParams: { componentType_id: this.cellValue} })
    // this.hrServies.setAddTypeId(Number(this.cellValue))
    // edit(e: any) {
    //   e.stopPropagation();
    // }
  }
  
}
