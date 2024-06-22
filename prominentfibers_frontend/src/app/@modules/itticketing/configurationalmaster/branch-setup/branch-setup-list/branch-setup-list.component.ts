import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { GridApi, GridReadyEvent } from 'ag-grid-community';
import { EmpMasterService } from 'src/app/@shared/services/emp-master.service';
// import { HelpDeskDialogComponent } from '../help-desk-dialog/help-desk-dialog.component';
import { BranchSetupActionComponent } from "../branch-setup-action/branch-setup-action.component";
import { AppListDialogComponent } from 'src/app/@shared/app-list-dialog/app-list-dialog.component';
import * as moment from 'moment';
import { RbacMasterService } from 'src/app/@shared/services/rbac-master.service';
import { BranchSetupStatusComponent } from '../branch-setup-action/branch-setup-status/branch-setup-status.component';
import { ConfigurationalmasterService } from 'src/app/@shared/services/configurationalmaster.service';


@Component({
  selector: 'app-branch-setup-list',
  templateUrl: './branch-setup-list.component.html',
  styleUrls: ['./branch-setup-list.component.scss']
})
export class BranchSetupListComponent {


  private gridApi!: GridApi<any>
  rowData: any;
  rowClass: any;
  assignAction: any;

  constructor(private empMaster: EmpMasterService,private _configurationalMasterService: ConfigurationalmasterService, private _rbackService: RbacMasterService,
    public dialog: MatDialog) {
    this.rowClass = 'rowClass';
  }
  ngOnInit(): void {
    this._configurationalMasterService.getListBranchSetup().subscribe((res: any) => {
      const aa = res.data
      const newArray = aa.map((item: any, index: any) => ({ ...item, index: index + 1 }));
      this.rowData = newArray
      console.log(this.rowData, "rowdata");
      this.assignAction = this._rbackService.accessAssignAction();
    })

  }
  
  public columnDefs = [

    {
      headerName: 'S.No',
      field: "index",
      // field: 'i',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: "grid-cell-centered",
      // valueGetter: 'node.rowIndex+1',
      flex: 1,
      minWidth: 150
    },
    {
      headerName: 'Branch Code',
      field: 'branch_code',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: "grid-cell-centered",
      flex: 1,
      minWidth: 150
    },
    {
      headerName: 'Branch Name',
      field: 'branch_name',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: "grid-cell-centered",
      flex: 1,
      minWidth: 150
    },
    // {
    //   headerName: 'Type',
    //   field: 'type_of_document',
    //   sortable: true,
    //   resizable: true,
    //   wrapHeaderText: true,
    //   autoHeaderHeight: true,
    //   cellClass: "grid-cell-centered",
    //   flex:1,
    //   minWidth:150  
    // },
    {
      headerName: 'Branch Email',
      field: 'branch_email',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: "grid-cell-centered",
      flex: 1,
      minWidth: 150
    },
    // {
    //   headerName: ' Date',
    //   field: 'createdAt',
    //   valueFormatter: function (params: any) {
    //     return moment.utc(params.value).format('DD/MM/YYYY');
    //   },
    //   sortable: true,
    //   resizable: true,
    //   wrapHeaderText: true,
    //   autoHeaderHeight: true,
    //   flex:1,
    //   minWidth:150  
    // },
    {
      headerName: 'Status',
      field: 'status',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      flex: 1,
      minWidth: 150,
      cellRenderer: BranchSetupStatusComponent,
      cellRendererParams: {
        className: 'mat-blue',
        hideRequestButton: true,
        hideDetailsButton: false,
        hideDownloadIcon: false,
        showCustomIcon: false, // Hide attachment icon
      },
    },

    {
      headerName: 'Action',
      field: 'id',
      flex: 1,
      minWidth: 150,
      cellRenderer: BranchSetupActionComponent,
      cellRendererParams: {
        className: 'mat-blue',
        hideRequestButton: true,
        hideDetailsButton: false,
        hideDownloadIcon: false,
        showCustomIcon: false, // Hide attachment icon
      },
    }
  ];


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
  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;


  }
  onCellClicked(e: any) {
    console.log(e, 'eeeeeee');

    const dialogRef = this.dialog.open(AppListDialogComponent, { width: '500px', data: { branchSetupViewId: e.data.id, index: e.data.index } });
    dialogRef.afterClosed().subscribe(result => {

    })
  }


}
