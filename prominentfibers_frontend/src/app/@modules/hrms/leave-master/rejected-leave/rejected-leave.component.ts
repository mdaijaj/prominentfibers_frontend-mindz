import { Component } from '@angular/core';
import {
  GridApi,
  GridReadyEvent
} from 'ag-grid-community';
import 'ag-grid-enterprise';
import { Router } from '@angular/router';
import { HrServiceService } from 'src/app/@shared/services/hr-service.service';

@Component({
  selector: 'app-rejected-leave',
  templateUrl: './rejected-leave.component.html',
  styleUrls: ['./rejected-leave.component.scss']
})
export class RejectedLeaveComponent {
  rowClass: any;
  private gridApi!: GridApi<any>;
  public rowData:any;
  
    constructor(private route: Router, private _hrService:HrServiceService) {
      this.rowClass = 'rowClass'
    };

    ngOnInit(): void {
      let lg: any = localStorage.getItem('signInUser')
      let loginUser = JSON.parse(lg);
      this.getAll_RjectedLeaveBy_Manager(loginUser.employee_id);
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
        if (params.value.toLowerCase() == 'REJECTED'.toLowerCase()) {
          return { color: 'red' };
        };
      },
    },
  ];


  goToHolidayCreate(path:any) {
    this.route.navigate([path]);
  }


  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;
    

  }

  getAll_RjectedLeaveBy_Manager(id:any){
    this._hrService.getAll_RjectedLeaveBy_Manager(id).subscribe(
      (res)=>{
        
        this.rowData = res.data;
      },(err)=>{
        
      }
    )
  }

}
