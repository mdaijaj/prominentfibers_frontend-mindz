import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { GridApi, GridReadyEvent } from 'ag-grid-community';
import { ToastrService } from 'ngx-toastr';
import { VendorManagementService } from 'src/app/@shared/services/vendor-management.service';
import { OutwardActionComponent } from './outward-action/outward-action.component';
import { OutwardDailogComponent } from './outward-dailog/outward-dailog.component';
import { AdminSupportService } from 'src/app/@shared/services/admin-support.service';
import * as moment from 'moment';

@Component({
  selector: 'app-courier-outward-list',
  templateUrl: './courier-outward-list.component.html',
  styleUrls: ['./courier-outward-list.component.scss'],
})
export class CourierOutwardListComponent {
  rowClass: any;
  private gridApi!: GridApi<any>;
  public rowData: any;
  public columnDefs = [
    {
      headerName: 'Sr No.',
      field: 'courier_Outward_id',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: 'grid-cell-centered',
      flex: 1,
      minWidth: 150,
    },
    {
      headerName: 'From Whom',
      field: 'from_whom',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: 'grid-cell-centered',
      valueFormatter: 'JSON.parse(value)',
      flex: 1,
      minWidth: 150,
    },
    {
      headerName: 'Received By',
      field: 'received_By',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: 'grid-cell-centered',
      valueFormatter: 'JSON.parse(value)',
      flex: 1,
      minWidth: 150,
    },
    {
      headerName: 'Received Date ',
      field: 'received_date',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: 'grid-cell-centered',
      valueFormatter: 'JSON.parse(value)',
      flex: 1,
      minWidth: 150,
    },
    {
      headerName: 'Name of the Client to Dispatch',
      field: 'client_name_to_dispatch',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: 'grid-cell-centered',
      valueFormatter: 'JSON.parse(value)',
      flex: 1,
      minWidth: 150,
    },
    {
      headerName: 'Address of the Client to Dispatch',
      field: 'client_address_to_dispatch',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: 'grid-cell-centered',
      valueFormatter: 'JSON.parse(value)',
      flex: 1,
      minWidth: 150,
    },
    {
      headerName: 'Courier Contain',
      field: 'courier_contain',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: 'grid-cell-centered',
      valueFormatter: 'JSON.parse(value)',
      flex: 1,
      minWidth: 150,
    },
    {
      headerName: 'Receiver Contact Number',
      field: 'Receiver_contact_number',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: 'grid-cell-centered',
      valueFormatter: 'JSON.parse(value)',
      flex: 1,
      minWidth: 150,
    },
    {
      headerName: 'Courier Service Name',
      field: 'courier_service_name',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: 'grid-cell-centered',
      valueFormatter: 'JSON.parse(value)',
      flex: 1,
      minWidth: 150,
    },
    {
      headerName: 'Consignment Number',
      field: 'consignment_number',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: 'grid-cell-centered',
      valueFormatter: 'JSON.parse(value)',
      flex: 1,
      minWidth: 150,
    },
    {
      headerName: 'Dispatched By',
      field: 'dispatched_by',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: 'grid-cell-centered',
      valueFormatter: 'JSON.parse(value)',
      flex: 1,
      minWidth: 150,
    },
    {
      headerName: 'Date of Dispatch',
      field: 'dispatched_date',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: 'grid-cell-centered',
      valueFormatter: 'JSON.parse(value)',
      flex: 1,
      minWidth: 150,
      cellRenderer: (params: any) => {
        return moment(params.data.dispatched_date).format('DD-MM-YYYY');
      },
    },
    {
      headerName: 'Date of Delivery',
      field: 'date_of_delivery',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: 'grid-cell-centered',
      valueFormatter: 'JSON.parse(value)',
      flex: 1,
      minWidth: 150,
      cellRenderer: (params: any) => {
        return moment(params.data.date_of_delivery).format('DD-MM-YYYY');
      },
    },
    {
      headerName: 'Proof of Delivery',
      field: 'proof_of_delivery',
      columnNos:"5",
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: 'grid-cell-centered',
      valueFormatter: 'JSON.parse(value)',
      flex: 1,
      minWidth: 150,
      cellRenderer: (params: any) => {
        if(params.data?.proof_of_delivery){
          return `<a style="color: #00ff44;" href=${params.data?.proof_of_delivery} target='_blank'>See Doc</a>`;
        }
      },
    },
    {
      headerName: 'Status',
      field: 'outward_status',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: 'grid-cell-centered',
      valueFormatter: 'JSON.parse(value)',
      flex: 1,
      minWidth: 150,
    },
    {
      headerName: 'Actions',
      field: 'courier_Outward_id',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      flex: 1,
      minWidth: 150,
      cellRenderer: OutwardActionComponent,
      cellRendererParams: {
        className: 'mat-blue',
        hideRequestButton: true,
        hideDetailsButton: false,
        hideDownloadIcon: false,
        showCustomIcon: false,
      },
      cellClass: 'grid-cell-centered',
    },
  ];
  user_id: any;
  userRole: any;

  constructor(
    private route: Router,
    private vendorService: VendorManagementService,
    private toast: ToastrService,
    public dialog: MatDialog,
    private adminService: AdminSupportService
  ) {
    this.rowClass = 'rowClass';
  }

  ngOnInit(): void {
    this.getAllOutward();
  }

  addOutward(path: any) {
    this.route.navigate([path]);
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

  getAllOutward() {
    let lg: any = localStorage.getItem('signInUser');
    let loginUser = JSON.parse(lg);
    console.log('loginUser', loginUser);
    this.userRole= loginUser.role;
    this.user_id = loginUser.employee_id;
    if(this.userRole == 'Administration'){
      this.adminService.getAllOutward(this.user_id).subscribe(
        (res: any) => {
          this.rowData = res.data.reverse();
        },
        (err) => {
          this.toast.warning(err.error.message);
        }
      );
    }else{
      this.adminService.getUserOutward(this.user_id).subscribe((res:any)=>{
        this.rowData = res.data.reverse();
      },
      (err) => {
        this.toast.warning(err.error.message);
      })
    }
  }

  onCellClicked(e: any) {
    if(e.colDef?.headerName != "Proof of Delivery"){
      const dialogRef = this.dialog.open(OutwardDailogComponent, {
        width: '500px',
        data: { id: e.data.courier_Outward_id },
      });
    }

  }
}
