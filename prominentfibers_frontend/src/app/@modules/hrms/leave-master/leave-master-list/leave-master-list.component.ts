import { Component } from '@angular/core';
import {
  GridApi,
  GridReadyEvent
} from 'ag-grid-community';
import 'ag-grid-enterprise';
import { Router } from '@angular/router';
import { LeaveMasterActionComponent } from './leave-master-action/leave-master-action.component';
import { HrServiceService } from 'src/app/@shared/services/hr-service.service';
import { LeaveDilogComponent } from './leave-dilog/leave-dilog.component';
import { MatDialog } from '@angular/material/dialog';
import * as moment from 'moment';

@Component({
  selector: 'app-leave-master-list',
  templateUrl: './leave-master-list.component.html',
  styleUrls: ['./leave-master-list.component.scss']
})
export class LeaveMasterListComponent {
  
  date: any;
  rowClass: any;
  private gridApi!: GridApi<any>;
  public rowData :any;
  public leaveStatus:any;

  

  constructor(private route: Router, private hrServies: HrServiceService,
    public dialog: MatDialog) {
    this.rowClass = 'rowClass'
  }
  
  ngOnInit (){
    this.getAllLeave();
  }

  public columnDefs = [
    {
      headerName: 'Sr No.',
      field: 'leavePolicyId',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: "grid-cell-centered",
      flex:1,
      minWidth:150,
    },
    {
      headerName: 'Leave Code',
      field: 'leaveCode',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: "grid-cell-centered",
      valueFormatter: 'JSON.parse(value)',
      flex:1,
      minWidth:150,
    },
    {
      headerName: 'Leave Name',
      field: 'leave_type', sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: "grid-cell-centered",
      flex:1,
      minWidth:150,
    },
    {
      headerName: 'Leave Count',
      field: 'leaveCount', sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: "grid-cell-centered",
      flex:1,
      minWidth:150,
    },
    {
      headerName: 'Leave Valid From',
      field: 'fromDate', sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: "grid-cell-centered",
      flex:1,
      minWidth:180,
      valueFormatter:(params:any)=>{
        return moment(new Date(params.value)).format('LL')
      },
    },
    {
      headerName: 'Leave Valid To',
      field: 'toDate', sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: "grid-cell-centered",
      flex:1,
      minWidth:150,
      valueFormatter:(params:any)=>{
        return moment(new Date(params.value)).format('LL')
      },
    },
    {
      headerName: 'Leave Type',
      field: 'leaveType', sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: "grid-cell-centered",
      flex:1,
      minWidth:150,
    },
    // {
    //   headerName: 'Leave Status',
    //   field: 'leave_status', sortable: true,
    //   resizable: true,
    //   wrapHeaderText: true,
    //   autoHeaderHeight: true,
    //   cellClass: "grid-cell-centered",
    //   flex:1,
    //   minWidth:150,
    //   cellStyle: (params: any) => {
    //     if (params.value !== 'APPROVED') {
    //       return { color: 'red', fontSize: '16px' };
    //     }
    //     else{
    //       return { color: 'green', fontSize: '16px' };
    //     }
    //     return null;
    //   }
    // },
    {
      headerName: 'Actions',
      field: 'leaveMasterId', sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      flex:1,
      minWidth:150,
      cellRenderer: LeaveMasterActionComponent,
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


  goToHolidayCreate(path:any) {
    this.route.navigate([path]);
  }

  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;
    

  }

  onPageSizeChanged() {
    var value = (document.getElementById('page-size') as HTMLInputElement)
      .value;
    this.gridApi.paginationSetPageSize(Number(value));
  }

  onFilterTextBoxChanged() {
    this.gridApi.setQuickFilter(
      (document.getElementById('filter-text-box') as HTMLInputElement).value
    );
  }
  
  back() {
    window.history.back();
  };

  getAllLeave() {
    this.hrServies.getAllLeave().subscribe((res: any) => {
      this.rowData = res.data;
      this.rowData.map((e:any)=> this.leaveStatus = e.leaveStatus)
      
    }); 
  }

  onCellClicked(e: any) {
    
    const dialogRef = this.dialog.open(LeaveDilogComponent, { width: '400px', data: { id: e.data.leavePolicyId} });
    dialogRef.afterClosed().subscribe(result => {
      
    })
  }

}
