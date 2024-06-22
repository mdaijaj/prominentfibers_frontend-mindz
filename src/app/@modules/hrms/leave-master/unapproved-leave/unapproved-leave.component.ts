import { Component } from '@angular/core';
import {
  GridApi,
  GridReadyEvent
} from 'ag-grid-community';
import 'ag-grid-enterprise';
import { Router } from '@angular/router';
import { ActionForUnaprovedLeaveComponent } from './action/action.component';
import { HrServiceService } from 'src/app/@shared/services/hr-service.service';
import { MatDialog } from '@angular/material/dialog';
import { LeaveDetailsPopupComponent } from './leave-details-popup/leave-details-popup.component';

@Component({
  selector: 'app-unapproved-leave',
  templateUrl: './unapproved-leave.component.html',
  styleUrls: ['./unapproved-leave.component.scss']
})
export class UnapprovedLeaveComponent {
  rowClass: any;
  private gridApi!: GridApi<any>;
   rowData:any; 

    constructor(private route: Router, private _hrService:HrServiceService, public dialog: MatDialog,) {
      this.rowClass = 'rowClass'
    }

    ngOnInit(): void {
      let lg: any = localStorage.getItem('signInUser')
      let loginUser = JSON.parse(lg);
      this.getAll_AppliedLeaveBy_Manager(loginUser.employee_id);
      
    }

  public columnDefs = [
    {
      headerName: 'Sr No.',
      valueGetter: "node.rowIndex + 1",
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: "grid-cell-centered",
      flex:1,
      minWidth:150,
    },
    {
      headerName: 'Employee Name',
      field: 'applier_name',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: "grid-cell-centered",
      flex:1,
      minWidth:150,
    },
    {
      headerName: 'Leave Type',
      field: 'leave_type',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: "grid-cell-centered",
      flex:1,
      minWidth:150,
    },
    {
      headerName: 'From Date',
      field: 'start_date',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: "grid-cell-centered",
      flex:1,
      minWidth:150,
    },
   
    {
      headerName: 'To Date',
      field: 'end_date',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: "grid-cell-centered",
      flex:1,
      minWidth:150,
    },
    {
      headerName: 'Total Leave Days',
      field: 'leave_count', sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: "grid-cell-centered",
      flex:1,
      minWidth:150,
    },
    {
      headerName: 'Leave Status',
      field: 'leave_apply_status',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: "grid-cell-centered",
      flex:1,
      minWidth:150,
      cellStyle: function (params: any) {
        if (params.value.toLowerCase() == 'UNAPPROVED'.toLowerCase()) {
          return { color: 'orange' };
        };
      },
    },
    // {
    //   headerName: 'Action',
    //   field: 'leave_apply_id',
    //   flex: 1,
    //   minWidth: 150,
    //   cellRenderer: ActionForUnaprovedLeaveComponent,
    //   cellRendererParams: {
    //     className: 'mat-blue',
    //     hideRequestButton: true,
    //     hideDetailsButton: false,
    //     hideDownloadIcon: false,
    //     showCustomIcon: false, // Hide attachment icon
    //   },
    //   cellClass: "grid-cell-centered"
    // }
  ];

  goToHolidayCreate(path:any) {
    this.route.navigate([path]);
  }


  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;
    

  }
  reloadCurrentRoute() {
    let currentUrl = this.route.url;
    this.route.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.route.navigate([currentUrl]);
    });
  }
  getAll_AppliedLeaveBy_Manager(id:any){
    this._hrService.getAll_AppliedLeaveBy_Manager(id).subscribe(
      (res)=>{
        
        this.rowData = res.data;
      },(err)=>{
        
      }
    )
  }


  onCellClicked(e: any) {
    
    const dialogRef = this.dialog.open(LeaveDetailsPopupComponent, { width: '400px', data:e.data});
    dialogRef.afterClosed().subscribe(result => {
      
      if(result === 'done'){
        this.reloadCurrentRoute();
      }
    })
  }
}
