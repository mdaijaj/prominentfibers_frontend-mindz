import { Component,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ICellRendererParams } from 'ag-grid-community';

@Component({
  selector: 'app-bonus-configure-action',
  templateUrl: './bonus-configure-action.component.html',
  styleUrls: ['./bonus-configure-action.component.scss']
})
export class BonusConfigureActionComponent implements OnInit{
  cellValue: any;
  constructor(private router:Router) {}
  ngOnInit(): void {
    
  }

  agInit(params: ICellRendererParams): void {
    this.cellValue = this.getValueToDisplay(params);
    
  }
  getValueToDisplay(params: ICellRendererParams) {
    
    return params.valueFormatted ? params.valueFormatted : params.data.bonus_id;
  }

  edit(e: any) {
    e.stopPropagation();
    this.router.navigate(['/master/hrms/payroll/bonus/bonus-configure-create'],
      { queryParams: { id: this.cellValue} })
  }
}
