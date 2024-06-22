import { Component, OnInit } from '@angular/core';
import { GridApi, GridReadyEvent } from 'ag-grid-community';
import 'ag-grid-enterprise';
import { EmpRegistrationService } from 'src/app/@shared/services/emp-registration.service';
// import { ActionComponent } from './action/action.component';
// import { EmpListDialogComponent } from './emp-list-dialog/emp-list-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { RbacMasterService } from 'src/app/@shared/services/rbac-master.service';
import { EmpListDialogComponent } from 'src/app/@modules/hrms/employee-master/employee/employee-list/emp-list-dialog/emp-list-dialog.component';
import { LeadService } from 'src/app/@shared/services/lead.service';
import { ActionAuditComponent } from '../action-audit/action-audit.component';

@Component({
  selector: 'app-add-auditor-list',
  templateUrl: './add-auditor-list.component.html',
  styleUrls: ['./add-auditor-list.component.scss']
})
export class AddAuditorListComponent {
  private gridApi!: GridApi<any>;
  rowData: any;
  userRole: any;
  customS_data: number;
  getAllData: any;
  sortType: boolean;
  assignAction:any;
  rowClass: any;
  constructor(
    private _empService: EmpRegistrationService,
    public dialog: MatDialog,
    private _rbackService:RbacMasterService,
    private _leadService:LeadService
  ) {
    this.rowClass = 'rowClass';
  }
  ngOnInit(): void {
    localStorage.setItem('employee_id:', 'undefined');
    this._leadService.getAllAuditManagementss().subscribe((res: any) => {
      // 
      this.rowData = res.data;
      console.log(this.rowData,'rowData');
      
      this.getAllData = res.data;
      // 
      const userId: any = []
      for (let i = 0; i < res.data.length; i++) {
        userId.push(res.data[i].user_role);
        this.userRole = userId;
      }
    });
  }

  ngAfterViewInit(): void {
    setTimeout(()=>{
      this.assignAction = this._rbackService.accessAssignAction();
    },0);
  };

  shortRole(type: any) {
    if (this.sortType) {
      this.sortType = false;
      const arrar = ["MD & CEO", "Sr VP", "VP", "AVP", "Sr.GM", "GM", "AGM",
        "Sr. Manager","Manager", "Asso. Manager", "Sr. Executive", "Executive", "Asso. Executive "]

      function customSort(a: any, b: any) {
        const indexA = arrar.indexOf(a.designation);
        const indexB = arrar.indexOf(b.designation);
        return indexA - indexB;
      }
      const sorted_components = this.getAllData.sort(customSort);
      console.log(sorted_components);
      this.rowData = [];
      this.gridApi.setRowData([]);
      this.gridApi.setRowData(sorted_components);
      this.rowData = sorted_components
    } else {
      this.sortType = true;
      const arrar = ["MD & CEO", "Sr VP", "VP", "AVP", "Sr.GM", "GM", "AGM",
      "Sr. Manager","Manager", "Asso. Manager", "Sr. Executive", "Executive", "Asso. Executive "]

      function customSort(a: any, b: any) {
        const indexA = arrar.indexOf(a.designation);
        const indexB = arrar.indexOf(b.designation);
        return indexB - indexA;
      }
      const sorted_components = this.getAllData.sort(customSort);
      console.log(sorted_components);
      this.rowData = [];
      this.gridApi.setRowData([]);
      this.gridApi.setRowData(sorted_components);
      this.rowData = sorted_components
    }
  }


  public columnDefs = [
    {
      headerName: 'Serial No.',
      valueGetter: 'node.rowIndex + 1',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: 'grid-cell-centered',
      flex: 1,
    },
    {
      headerName: 'Employee Code',
      field: 'employee_id',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: 'grid-cell-centered',
      flex: 1,
    },
    {
      headerName: 'Employee Name',
      field: 'first_name',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: 'grid-cell-centered',
      valueFormatter: 'JSON.parse(value)',
      flex: 1,
    },
    {
      headerName: 'Email ID',
      field: 'employee_official_email',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: 'grid-cell-centered',
      flex: 1,
    },
    {
      headerName: 'Mobile Number',
      field: 'mobile_number',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: 'grid-cell-centered',
      flex: 1,
    },
    {
      headerName: 'Emplyoment Type',
      field: 'emplyoment_type',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: 'grid-cell-centered',
      flex: 1,
      minWidth:120,
    },
    {
      headerName: 'Designation',
      field: 'designation',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: 'grid-cell-centered',
      flex: 1,
    },
    // {
    //   headerName: 'User Roll',
    //   field: 'user_role',
    //   sortable: true,
    //   resizable: true,
    //   wrapHeaderText: true,
    //   autoHeaderHeight: true,
    //   cellClass: 'grid-cell-centered',
    //   flex: 1,
    // },

    {
      headerName: 'Action',
      field: 'employee_id',
      flex: 1,
      minWidth:120,
      cellRenderer: ActionAuditComponent,
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

  onBtnExportDataAsExcel() {
    this.gridApi.exportDataAsExcel({
      processRowGroupCallback: rowGroupCallback,
    });
  }


  onBtPrint() {
    window.print();
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

  //   gridOptions = {
  //     // Add event handlers

  // }
  onCellClicked(e: any) {


    const dialogRef = this.dialog.open(EmpListDialogComponent, {
      width: '600px',
      data: { id: e.data.employee_id },
    });
    dialogRef.afterClosed().subscribe((result) => {

    });
  }
}

function myFunction() {
  alert('I am an alert box!');
}

function rowGroupCallback(params: any) {
  return params.node.key;
}

function setPrinterFriendly(api: any) {
  var eGridDiv = document.querySelector('#myGrid');

  api.setDomLayout('print');
}
function setNormal(api: any) {
  var eGridDiv = document.querySelector('#myGrid');

  api.setDomLayout(null);
}

