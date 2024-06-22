import { Component } from '@angular/core';
import {
  GridApi,
  GridReadyEvent
} from 'ag-grid-community';
import 'ag-grid-enterprise';
import { Router } from '@angular/router';
import { LeaveAdjutmentActionComponent } from './action/action.component';
@Component({
  selector: 'app-leave-adjustment',
  templateUrl: './leave-adjustment.component.html',
  styleUrls: ['./leave-adjustment.component.scss']
})
export class LeaveAdjustmentComponent {
  rowClass: any;
  private gridApi!: GridApi<any>;
  public rowData =[
    {
      employee_name: 'SUPER ADMIN (111)',
      actions:'true',
      
    },

  ];
  public columnDefs = [
    {
      headerName: 'Employee Name',
      field: 'employee_name',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: "grid-cell-centered",
      flex:1,
      minWidth:150,
    },
    {
      headerName: 'Actions',
      field: 'actions', sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      flex:1,
      minWidth:150,
      cellRenderer: LeaveAdjutmentActionComponent,
      cellRendererParams: {
        className: 'mat-blue',
        hideRequestButton: true,
        hideDetailsButton: false,
        hideDownloadIcon: false,
        showCustomIcon: false, 
      },
      cellClass: "grid-cell-centered",
     
    },
    
  ];



  constructor(private route: Router) {
    this.rowClass = 'rowClass'
  }

  goToHolidayCreate(path:any) {
    this.route.navigate([path]);
  }


  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;
    

  }

}
