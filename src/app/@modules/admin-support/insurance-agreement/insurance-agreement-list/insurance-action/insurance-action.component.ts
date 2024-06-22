import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ICellRendererParams } from 'ag-grid-community';

@Component({
  selector: 'app-insurance-action',
  templateUrl: './insurance-action.component.html',
  styleUrls: ['./insurance-action.component.scss']
})
export class InsuranceActionComponent {
  cellValue: any;
  constructor(private route: Router) {}
  ngOnInit(): void {
    
  }

  agInit(params: ICellRendererParams): void {
    this.cellValue = this.getValueToDisplay(params);
    
  }
  getValueToDisplay(params: ICellRendererParams) {
    
    return params.valueFormatted ? params.valueFormatted : params.data.insurance_id;
  }

  edit(e:any){
    e.stopPropagation();
    this.route.navigate(['/master/admin-support/insurance-agreement/create-insurance-agreement'],
      { queryParams: { id: this.cellValue}})
  }
}
