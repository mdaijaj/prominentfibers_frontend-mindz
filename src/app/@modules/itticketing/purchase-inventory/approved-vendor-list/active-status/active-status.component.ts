import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ICellRendererParams } from 'ag-grid-community';

@Component({
  selector: 'app-active-status',
  templateUrl: './active-status.component.html',
  styleUrls: ['./active-status.component.scss']
})
export class ActiveApprovedStatusComponent {
  cellValue: any;
  constructor(private route: Router) {}
  ngOnInit(): void {
    
  }

  agInit(params: ICellRendererParams): void {
    this.cellValue = this.getValueToDisplay(params);
    
  }
  getValueToDisplay(params: ICellRendererParams) {
    
    return params.valueFormatted ? params.valueFormatted : params.data.component_id;
  }

}
