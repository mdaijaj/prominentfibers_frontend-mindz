import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { GridApi, GridReadyEvent } from 'ag-grid-community';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { ConfigurationalmasterService } from 'src/app/@shared/services/configurationalmaster.service';
import { PurchaseRequestService } from 'src/app/@shared/services/purchase-request.service';
import { PuchaseOrderActionComponent } from '../../puchase-order-action/puchase-order-action.component';
import { PoStatusDialogComponent } from '../../po-status-dialog/po-status-dialog.component';
import { RbacMasterService } from 'src/app/@shared/services/rbac-master.service';

@Component({
  selector: 'app-raise-po',
  templateUrl: './raise-po.component.html',
  styleUrls: ['./raise-po.component.scss']
})
export class RaisePoComponent {
  rowClass: any;
  private gridApi!: GridApi<any>;
  quickFilter: string;
  depData: any;
  assignAction: any;

  constructor(
    private route: Router,
    private toast: ToastrService,
    private activeroute: ActivatedRoute,
    public dialog: MatDialog,
    private configService: ConfigurationalmasterService,
    private prService: PurchaseRequestService,
    private _rbackService: RbacMasterService,
  ) {
    this.rowClass = 'rowClass';
  }

  ngOnInit(): void {
    // this.configService.getDepartment().subscribe((res: any) => {
    //   this.depData = res.data;
    // })
    this.assignAction = this._rbackService.accessAssignAction();
    var empData: any = localStorage.getItem('signInUser');
    const singleEmpData = JSON.parse(empData);
    console.log(singleEmpData, "data employee");
    let data = {
      emp_id: singleEmpData.employee_id,
      loggedUserRole: singleEmpData.role,
    }
    this.getAllapprovedCost(data);
  }

  public rowData: any;

  public columnDefs = [
    {
      headerName: 'Sr No.',
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
      headerName: 'PO NO',
      field: 'po_number',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: "grid-cell-centered",
      valueFormatter: 'JSON.parse(value)',
      flex: 1,
      minWidth: 150,
    },
    {
      headerName: 'Department',
      field: 'department_name',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: "grid-cell-centered",
      valueFormatter: 'JSON.parse(value)',
      flex: 1,
      minWidth: 150,
    },
    {
      headerName: 'PO Date',
      field: 'po_date',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: "grid-cell-centered",
      flex: 1,
      minWidth: 150,
      valueFormatter: (params: any) => {
        return moment(new Date(params.value)).format('LL')
      },
    },
    {
      headerName: 'PO Category',
      field: 'po_category_type',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: "grid-cell-centered",
      valueFormatter: 'JSON.parse(value)',
      flex: 1,
      minWidth: 150,
    },
    {
      headerName: 'PO Type',
      field: 'po_type',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: "grid-cell-centered",
      valueFormatter: 'JSON.parse(value)',
      flex: 1,
      minWidth: 150,
    },
    {
      headerName: 'Approvel Status',
      field: 'approvel_status',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: "grid-cell-centered",
      valueFormatter: 'JSON.parse(value)',
      flex: 1,
      minWidth: 150,
    },
    {
      headerName: 'Actions',
      field: 'procurement_product_id', sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      flex: 1,
      minWidth: 150,
      cellRenderer: PuchaseOrderActionComponent,
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

  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;

  }

  navigateToPO() {
    this.route.navigate(['master/purchase-main/purchase-order/billing-branch-list'])
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

  onFilterOptionBoxChanged() {
    this.gridApi.setQuickFilter(this.quickFilter);
  }


  reloadCurrentRoute() {
    let currentUrl = this.route.url;
    this.route.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.route.navigate([currentUrl]);
    });
  }

  statusCellClicked(e: any) {
    if (this.assignAction.Write) {
      const dialogRef = this.dialog.open(PoStatusDialogComponent, { width: '450px', data: { cellData: e.data } });
      dialogRef.afterClosed().subscribe(result => {
      })
    }
  }

  getAllapprovedCost(data: any) {
    this.prService.getAllPoList(data).subscribe((res: any) => {
      this.rowData = res.data;
    })
  }

}
