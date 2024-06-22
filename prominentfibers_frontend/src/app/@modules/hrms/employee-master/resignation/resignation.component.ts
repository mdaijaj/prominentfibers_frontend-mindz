import { Component, OnInit } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { GridApi, GridReadyEvent } from 'ag-grid-community';
import 'ag-grid-enterprise';
import { EmpRegistrationService } from 'src/app/@shared/services/emp-registration.service';
import { MatDialog } from '@angular/material/dialog';
import { RecruitService } from '../../../../@shared/services/recruitment.service';
import { ActionComponent } from 'src/app/@shared/action/action.component';
import { AppListDialogComponent } from 'src/app/@shared/app-list-dialog/app-list-dialog.component';
import { ActionComponentResignation } from './action/action.component';
import { RbacMasterService } from 'src/app/@shared/services/rbac-master.service';
@Component({
  selector: 'app-resignation',
  templateUrl: './resignation.component.html',
  styleUrls: ['./resignation.component.scss'],
})
export class ResignationComponent implements OnInit {
  rowClass: any;
  private gridApi!: GridApi<any>;
  rowData: any;
  jobIdNew: any;
  public rowDatNew: string[] = [];
  assignAction:any;
  constructor(
    private _empService: EmpRegistrationService,
    public dialog: MatDialog,
    private recruitService: RecruitService,
    private _rbackService:RbacMasterService,
  ) {
    this.rowClass = 'rowClass';
  }
  ngOnInit(): void {
    localStorage.setItem('employee_id:', 'undefined');
    this.recruitService.getResignation().subscribe((res: any) => {
      this.rowData =  res.data;
      // for (let item of res.data) {
      //   if (item.status === 'ACTIVE') {
      //     
      //     this.rowDatNew.push(item);
      //   }
      // }
      // this.rowData = this.rowDatNew;
      // 
    });
  }

  
  ngAfterViewInit(): void {
    setTimeout(()=>{
      this.assignAction = this._rbackService.accessAssignAction();
    },0);
  }

  public columnDefs = [
    {
      headerName: 'S.NO',
      valueGetter: 'node.rowIndex + 1',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: 'grid-cell-centered',
      flex: 1,
      // minWidth: 150,
    },
    {
      headerName: 'Employee Name',
      field: 'employee_name',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: 'grid-cell-centered',
      flex: 1,
      // minWidth: 150,
    },
    {
      headerName: 'Department',
      field: 'department',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: 'grid-cell-centered',
      flex: 1,
      // minWidth: 150,
    },
    {
      headerName: 'Experience',
      field: 'years_of_service',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      flex: 1,
      // minWidth: 150,
    },
    {
      headerName: 'Location',
      field: 'job_location',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      flex: 1,
      // minWidth: 150,
    },
    {
      headerName: 'Status',
      field: 'status',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      flex: 1,
      // minWidth: 150,
    },
    {
      headerName: 'Action',
      field: 'employee_id',
      flex: 1,
      cellRenderer: ActionComponentResignation,
      cellRendererParams: {
        className: 'mat-blue',
        hideRequestButton: true,
        hideDetailsButton: false,
        hideDownloadIcon: false,
        showCustomIcon: false, // Hide attachment icon
      },
    },
  ];

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
  onCellClicked(e: any) {
    
    this.jobIdNew = e.data.employee_resignation_id;
    localStorage.setItem('jobId', this.jobIdNew);
    

    // this.router.navigate(['hrms/recruitment-module/job-description/job-description-list/action.component'], { queryParams: { job_id: this.jobIdNew } })
    const dialogRef = this.dialog.open(AppListDialogComponent, {
      width: '500px',
      data: { resign: this.jobIdNew },
    });
    dialogRef.afterClosed().subscribe((result: any) => {
      
    });
  }
  SubmitValue() {}
}
