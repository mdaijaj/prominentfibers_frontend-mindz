import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { GridApi, GridReadyEvent } from 'ag-grid-community';
import { EmpRegistrationService } from 'src/app/@shared/services/emp-registration.service';
import { EmpListDialogComponent } from '../../../employee-master/employee/employee-list/emp-list-dialog/emp-list-dialog.component';
import { ActionComponent } from './action/action.component';
import { Location } from '@angular/common';
@Component({
  selector: 'app-emp-list',
  templateUrl: './emp-list.component.html',
  styleUrls: ['./emp-list.component.scss']
})
export class EmpListComponent {
  rowClass: any;
  private gridApi!: GridApi<any>;
  rowData: any;

  constructor(private _empService: EmpRegistrationService, public dialog: MatDialog,private location: Location) {
    this.rowClass = 'rowClass'
  }
  ngOnInit(): void {
    localStorage.setItem("employee_id:", "undefined");
    this._empService.grtEmployeeList().subscribe((res: any) => {
      this.rowData = res.data;
      
    })

  }
  goBack() {
    this.location.back();
  }
  public columnDefs = [
    {
      headerName: 'Serial No.',
      valueGetter: "node.rowIndex + 1",
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: "grid-cell-centered",
      flex:1,
    },
    {
      headerName: 'Employee Code',
      field: 'employee_id', 
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: "grid-cell-centered",
      flex:1,
    },
    {
      headerName: 'Employee Name',
      field: 'first_name',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: "grid-cell-centered",
      valueFormatter: 'JSON.parse(value)',
      flex:1,
    },
    {
      headerName: 'Email ID',
      field: 'employee_official_email', sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: "grid-cell-centered",
      flex:1,
    },
    {
      headerName: 'Mobile Number',
      field: 'mobile_number', sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: "grid-cell-centered",
      flex:1,
    },
    {
      headerName: 'Emplyoment Type',
      field: 'emplyoment_type', sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: "grid-cell-centered",
      flex:1,
    },
    {
      headerName: 'User Roll',
      field: 'user_role', sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: "grid-cell-centered",
      flex:1,
    },

    {
      headerName: 'Action',
      field: 'employee_id',
      flex:1,
      cellRenderer: ActionComponent,
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

  onBtnExportDataAsExcel() {
    this.gridApi.exportDataAsExcel({
      processRowGroupCallback: rowGroupCallback,
    });
  }

  onBtPrint() {
   window.print()
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
    
    
    const dialogRef = this.dialog.open(EmpListDialogComponent, { width: '600px', data: { id: e.data.employee_id } });
    dialogRef.afterClosed().subscribe(result => {
      
    })
  }
}

function myFunction() {
  alert("I am an alert box!");
}

function rowGroupCallback(params:any) {
  return params.node.key;
}

function setPrinterFriendly(api:any) {
  var eGridDiv = document.querySelector('#myGrid');
 
  api.setDomLayout('print');
}
function setNormal(api:any) {
  var eGridDiv = document.querySelector('#myGrid');
 
  api.setDomLayout(null);
}
