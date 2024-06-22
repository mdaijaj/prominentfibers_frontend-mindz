import { Component,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ICellRendererParams } from 'ag-grid-community';

@Component({
  selector: 'app-configration-action',
  templateUrl: './configration-action.component.html',
  styleUrls: ['./configration-action.component.scss']
})
export class ConfigrationActionComponent implements OnInit {
  cellValue: any;
  constructor(private route:Router) {}
  ngOnInit(): void {
    
  }

  agInit(params: ICellRendererParams): void {
    this.cellValue = this.getValueToDisplay(params);
    
  }
  getValueToDisplay(params: ICellRendererParams) {
    
    return params.valueFormatted ? params.valueFormatted : params.data.configMasterId;
  }

  edit(e: any) {
    
    e.stopPropagation();
    this.route.navigate(['master/hrms/payroll/payroll-master/payroll-component/configure-create'],
      { queryParams: { conFigure_id: this.cellValue} })
    // this.hrServies.setAddTypeId(Number(this.cellValue))
    // edit(e: any) {
    //   e.stopPropagation();
    // }
  }
}
