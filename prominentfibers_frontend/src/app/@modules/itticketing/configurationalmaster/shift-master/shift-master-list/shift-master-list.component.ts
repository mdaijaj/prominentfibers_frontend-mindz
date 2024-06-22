import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GridApi, GridReadyEvent } from 'ag-grid-community';
import 'ag-grid-enterprise';
import { MatDialog } from '@angular/material/dialog';
// import { ActionComponent } from '../action/action.component';
import { ConfigurationalmasterService } from 'src/app/@shared/services/configurationalmaster.service';
import Swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';
import { ShiftMasterActionComponent } from '../shift-master-action/shift-master-action.component';
import { ShiftMasterStatusComponent } from '../shift-master-action/shift-master-status/shift-master-status.component';
import { RbacMasterService } from 'src/app/@shared/services/rbac-master.service';

@Component({
  selector: 'app-shift-master-list',
  templateUrl: './shift-master-list.component.html',
  styleUrls: ['./shift-master-list.component.scss']
})
export class ShiftMasterListComponent {
  rowClass: any;
  private gridApi!: GridApi<any>;
  rowData: any;
  public gridOptions: any = { rowSelection: 'multiple', };
  isDeleteButtonVisible: boolean = false;
  selectedRows: any[] = [];
  queryParamss: any;
  id: any;
  collegeids: any;
  collegeIdCopy: any;
  loginUser: any;
  assignAction: any;
  formattedShiftTime: string = '';


  constructor(
    public dialog: MatDialog,
    private _configurationalMasterService: ConfigurationalmasterService,
    private _rbackService: RbacMasterService,
    private toast: ToastrService,
    private route: Router,
    private activeroute: ActivatedRoute
  ) {
    this.rowClass = 'rowClass';
  }
  ngOnInit(): void {
    this.getAllShiftMaster();
    this.activeroute.queryParams.subscribe((params) => {
      this.id = params;
      this.collegeids = this.id.id;
    });
    // this._configurationalMasterService.messageSubject.subscribe((id: any) => {
      //   this.collegeIdCopy = id;
      // });
      let a: any = localStorage.getItem('signInUser');
      this.loginUser = JSON.parse(a);
      this.assignAction = this._rbackService.accessAssignAction();
  }

  getAllShiftMaster() {
    this._configurationalMasterService.getShiftList().subscribe((res: any) => {
      this.rowData = res.data;

      this.rowData.forEach((shift: any) => {
        shift.formattedShiftTime = this.formatShiftTime(shift.shift_from_time, shift.shift_to_time);
      });
      console.log(this.rowData, "data data data");

    });
  }

  formatShiftTime(fromTime: string, toTime: string): string {
    const formattedFromTime = this.formatTime(fromTime);
    const formattedToTime = this.formatTime(toTime);
    return `${formattedFromTime} to ${formattedToTime}`;
  }

  formatTime(time: string): string {
    const [hours, minutes] = time.split(':');
    const formattedHours = parseInt(hours, 10) % 12 || 12;
    const period = parseInt(hours, 10) >= 12 ? 'pm' : 'am';
    return `${formattedHours}:${minutes} ${period}`;
  }

  public columnDefs = [
    {
      headerName: 'S.No.',
      valueGetter: "node.rowIndex + 1",
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: "grid-cell-centered",
      flex: 1,
      minWidth: 150,
    },
    {
      headerName: 'Shift Name',
      field: 'shift_name',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: 'grid-cell-centered',
      flex: 1,
      minWidth: 150,
    },
    {
      headerName: 'Shift Time',
      field: 'formattedShiftTime',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: 'grid-cell-centered',
      flex: 1,
      minWidth: 150,
    },
    {
      headerName: 'Status',
      field: 'status',
      cellRenderer: ShiftMasterStatusComponent,
      cellRendererParams: {
        className: 'mat-blue',
        hideRequestButton: true,
        hideDetailsButton: false,
        hideDownloadIcon: false,
        showCustomIcon: false,
        someProperty: 'value',
      },
      cellClass: "grid-cell-centered",
    },
    {
      headerName: 'Action',
      field: 'id',
      flex: 1,
      minWidth: 150,
      cellRenderer: ShiftMasterActionComponent,
      cellRendererParams: {
        className: 'mat-blue',
        hideRequestButton: true,
        hideDetailsButton: false,
        hideDownloadIcon: false,
        showCustomIcon: false, // Hide attachment icon
      },
    },
  ];

  onSelectionChanged(event: any) {
    this.selectedRows = event.api.getSelectedRows();
    console.log(this.selectedRows, "showing the data");

    this.isDeleteButtonVisible = this.selectedRows.length > 0;
  }

  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;
    this.gridApi.addEventListener('selectionChanged', this.onSelectionChanged.bind(this));

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


  // openDialog() {
  //   const dialogRef = this.dialog.open(ShiftMasterCreateComponent, {
  //     // data: { id: this.queryParamss },

  //     width: '30%',
  //   });

  //   dialogRef.afterClosed().subscribe((result) => { });
  // }
}
