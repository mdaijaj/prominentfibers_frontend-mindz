import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ICellRendererParams } from 'ag-grid-community';

@Component({
  selector: 'app-hks-action',
  templateUrl: './hks-action.component.html',
  styleUrls: ['./hks-action.component.scss']
})
export class HksActionComponent {
  cellValue: any;
  constructor(private route: Router) {}
  ngOnInit(): void {
    
  }

  agInit(params: ICellRendererParams): void {
    this.cellValue = this.getValueToDisplay(params);
    
  }
  getValueToDisplay(params: ICellRendererParams) {
    
    return params.valueFormatted ? params.valueFormatted : params.data.security_agreement_id;
  }

  edit(e:any){
    e.stopPropagation();
    this.route.navigate(['/master/admin-support/house-keeping-sicurity-agreement/create-house-keeping-security-agreement'],
      { queryParams: { id: this.cellValue}})
  }
}
