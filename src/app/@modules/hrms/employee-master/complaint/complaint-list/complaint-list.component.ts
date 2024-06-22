import { Component, OnInit } from '@angular/core';
import {
  GridApi, GridReadyEvent
} from 'ag-grid-community';
import 'ag-grid-enterprise';
import { EmpRegistrationService } from 'src/app/@shared/services/emp-registration.service';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ActionComponent } from 'src/app/@shared/action/action.component';
import { RecruitService } from 'src/app/@shared/services/recruitment.service';
import { EmpMasterService } from 'src/app/@shared/services/emp-master.service';
import { ComplaintDialogComponent } from './complaint-dialog/complaint-dialog.component'; 
import { AppListDialogComponent } from 'src/app/@shared/app-list-dialog/app-list-dialog.component';
import { RbacMasterService } from 'src/app/@shared/services/rbac-master.service';

@Component({
  selector: 'app-complaint-list',
  templateUrl: './complaint-list.component.html',
  styleUrls: ['./complaint-list.component.scss'],
})
export class ComplaintListComponent {
  rowClass: any;
  private gridApi!: GridApi<any>;
  rowData: any;
  assignAction:any;
  
  constructor(
    public dialog: MatDialog,
    private route: Router,
    private recrutmentService: RecruitService,
    private emp_master:EmpMasterService,
    private _rbackService:RbacMasterService,
  ) {
    this.rowClass = 'rowClass';
  }
  ngOnInit(): void {
    this.recrutmentService.getListComplaint().subscribe((res) => {
      this.rowData = res.data;
      
    });
  }

  ngAfterViewInit(): void {
    setTimeout(()=>{
      this.assignAction = this._rbackService.accessAssignAction();
    },0);
  }

  public columnDefs = [
    {
      headerName: 'S.No',
      valueGetter: 'node.rowIndex + 1',

      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      flex:1,
      minWidth:150,
      cellClass: 'grid-cell-centered',
    },
    {
      headerName: 'Name',
      field: 'complaint_name',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      flex:1,
      minWidth:150,
      cellClass: 'grid-cell-centered',
    },
    {
      headerName: 'Complaint Date',
      field: 'complaint_date',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      flex:1,
      minWidth:150,
      cellClass: 'grid-cell-centered',
    },
    {
      headerName: 'Notes',
      field: 'notes',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      flex:1,
      minWidth:150,
      cellClass: 'grid-cell-centered',
    },
    {
      headerName: 'Acknowledgement',
      field: 'record_added_by',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      flex:1,
      minWidth:150,
      cellClass: 'grid-cell-centered',
    },
    {
      headerName: 'Action',
      field: 'employee_complaint_id',
      flex:1,
      minWidth:150,
      // cellRenderer:
      cellRenderer: ActionComponent,
      cellRendererParams: {
        className: 'mat-blue',
        hideRequestButton: true,
        hideDetailsButton: false,
        hideDownloadIcon: false,
        showCustomIcon: false, // Hide attachment icon
      },
      cellClass: 'grid-cell-centered',
    },
  ];
  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;
    
  }
  createComplaint() {
    this.route.navigate(['master/hrms/employee-master/complaint-create']);
  }
  onFilterTextBoxChanged() {
    this.gridApi.setQuickFilter(
      (document.getElementById('filter-text-box') as HTMLInputElement).value
    );
  }
  
  onPageSizeChanged() {
    var value = (document.getElementById('page-size') as HTMLInputElement)
      .value;
    this.gridApi.paginationSetPageSize(Number(value));
  }
  onCellClicked(e:any){
    
    const dialogRef = this.dialog.open(AppListDialogComponent,{width:'40%',data:{complaint_id:e.data.employee_complaint_id}});
      dialogRef.afterClosed().subscribe(result => {
        
      })
  }
}
