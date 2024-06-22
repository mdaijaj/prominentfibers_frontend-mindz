import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ICellRendererParams } from 'ag-grid-community';

@Component({
  selector: 'app-inward-action',
  templateUrl: './inward-action.component.html',
  styleUrls: ['./inward-action.component.scss']
})
export class InwardActionComponent {
  cellValue: any;
  status: any;
  constructor(private route: Router) {}
  ngOnInit(): void {
    
  }

  agInit(params: ICellRendererParams): void {
    this.cellValue = this.getValueToDisplay(params);
    
  }
  getValueToDisplay(params: ICellRendererParams) {
    this.status = params.data.inward_status;
    
    return params.valueFormatted ? params.valueFormatted : params.data.Courier_Inward_id;
  }

  edit(e:any){
    e.stopPropagation();
    this.route.navigate(['/master/admin-support/courier-inward/create-inward'],
      { queryParams: { id: this.cellValue}})
  }

  resend(e:any){
    e.stopPropagation();
    this.route.navigate(['/master/admin-support/courier-inward/courier-re-send'],
      { queryParams: { id: this.cellValue}})
  }
}
