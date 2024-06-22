import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ICellRendererParams } from 'ag-grid-community';

@Component({
  selector: 'app-amc-action',
  templateUrl: './amc-action.component.html',
  styleUrls: ['./amc-action.component.scss']
})
export class AmcActionComponent {
  cellValue: any;
  constructor(private route: Router) {}
  ngOnInit(): void {
    
  }

  agInit(params: ICellRendererParams): void {
    this.cellValue = this.getValueToDisplay(params);
    
  }
  getValueToDisplay(params: ICellRendererParams) {
    
    return params.valueFormatted ? params.valueFormatted : params.data.amc_agreement_id;
  }

  edit(e:any){
    e.stopPropagation();
    this.route.navigate(['/master/admin-support/amc-agreement/create-amc-agreement'],
      { queryParams: { id: this.cellValue}})
  }
}
