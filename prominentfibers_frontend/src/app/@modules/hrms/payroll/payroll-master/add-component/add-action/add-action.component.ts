import { Component,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ICellRendererParams } from 'ag-grid-community';
import { ToastrService } from 'ngx-toastr';
import { HrServiceService } from 'src/app/@shared/services/hr-service.service';

@Component({
  selector: 'app-add-action',
  templateUrl: './add-action.component.html',
  styleUrls: ['./add-action.component.scss']
})
export class AddActionComponent implements OnInit {
  cellValue: any;
  constructor(private route: Router, private hrServies: HrServiceService,
    private toast: ToastrService) {}
  ngOnInit(): void {
    
  }

  agInit(params: ICellRendererParams): void {
    this.cellValue = this.getValueToDisplay(params);
    
  }
  getValueToDisplay(params: ICellRendererParams) {
    
    return params.valueFormatted ? params.valueFormatted : params.data.component_id;
  }

  edit(e: any) {
    
    e.stopPropagation();
    this.route.navigate(['master/hrms/payroll/payroll-master/payroll-component/add-create'],
      { queryParams: { component_id: this.cellValue} })
    // this.hrServies.setAddTypeId(Number(this.cellValue))
    // edit(e: any) {
    //   e.stopPropagation();
    // }
  }
}
