import { AfterViewInit, Component, OnInit } from '@angular/core';
import {
  GridApi,
  GridReadyEvent
} from 'ag-grid-community';
import 'ag-grid-enterprise';
import { Router } from '@angular/router';
import { HrServiceService } from 'src/app/@shared/services/hr-service.service';
import {ActionInLeaveApplyComponent} from './action/action.component';
import { ApplyLeavePopupComponent } from './apply-leave-popup/apply-leave-popup.component';
import { MatDialog } from '@angular/material/dialog';
import { RbacMasterService } from 'src/app/@shared/services/rbac-master.service';
@Component({
  selector: 'app-leave-apply-list',
  templateUrl: './leave-apply-list.component.html',
  styleUrls: ['./leave-apply-list.component.scss']
})
export class LeaveApplyListComponent implements OnInit, AfterViewInit {
  rowClass: any;
  private gridApi!: GridApi<any>;
  rowData:any;
  assignAction:any;
  constructor(private route: Router,private _hrService: HrServiceService,public dialog: MatDialog, private _rbackService:RbacMasterService,) {
    this.rowClass = 'rowClass'
  }
  ngOnInit(): void {
    let lg: any = localStorage.getItem('signInUser')
    let loginUser = JSON.parse(lg);
    this.getAll_leaveApply(loginUser.employee_id)
  }

  ngAfterViewInit(): void {
    setTimeout(()=>{
      this.assignAction = this._rbackService.accessAssignAction();
    },0);
  };
  
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
    },
    {
      headerName: 'Applier Name',
      field: 'applier_name',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: "grid-cell-centered",
      flex:1,
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
    },

    {
      headerName: 'Reporting Manager',
      field: 'manager_name',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: "grid-cell-centered",
      flex:1,
      minWidth:150,
    },
    {
      headerName: 'Leave Days',
      field: 'leave_count',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: "grid-cell-centered",
      flex:1,
    },
   
    {
      headerName: 'Leave Start',
      field: 'start_date', 
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: "grid-cell-centered",
      flex:1,
    },
    {
      headerName: 'Leave End',
      field: 'end_date', 
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: "grid-cell-centered",
      flex:1,
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
        if (params.value.toLowerCase() == 'APPROVED'.toLowerCase()) {
          return { color: 'green' };
        } else if(params.value.toLowerCase() == 'REJECTED'.toLowerCase()){
          return { color: 'red' };
        }else{
          return { color: 'orange' };
        }
      },
    },

    {
      headerName: 'Action',
      field: 'leave_apply_id',
      flex: 1,
      cellRenderer: ActionInLeaveApplyComponent,
      cellRendererParams: {
        className: 'mat-blue',
        hideRequestButton: true,
        hideDetailsButton: false,
        hideDownloadIcon: false,
        showCustomIcon: false, // Hide attachment icon
      },
      cellClass: "grid-cell-centered"
    }
  ];

  goToHolidayCreate(path:any) {
    this.route.navigate([path]);
  };

  onFilterTextBoxChanged() {
    this.gridApi.setQuickFilter(
      (document.getElementById('filter-text-box') as HTMLInputElement).value
    );
  }

  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;
    
  };

  getAll_leaveApply(id:any){
    this._hrService.getAll_leaveApply(id).subscribe(
      (res)=>{
        
        this.rowData = res.data;
      },(err)=>{
        
      }
    )
  };

  onCellClicked(e: any) {
    
    const dialogRef = this.dialog.open(ApplyLeavePopupComponent, { width: '400px', data:e.data});
    dialogRef.afterClosed().subscribe(result => {
      
    })
  }
}
