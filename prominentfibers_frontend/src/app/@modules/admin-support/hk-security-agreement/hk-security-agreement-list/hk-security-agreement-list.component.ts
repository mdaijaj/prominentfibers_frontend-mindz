import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { GridApi, GridReadyEvent } from 'ag-grid-community';
import { ToastrService } from 'ngx-toastr';
import { VendorManagementService } from 'src/app/@shared/services/vendor-management.service';
import { RentalActionComponent } from '../../rental-agreement/rental-agreement-list/rental-action/rental-action.component';
import { RentalDailogComponent } from '../../rental-agreement/rental-agreement-list/rental-dailog/rental-dailog.component';
import { AdminSupportService } from 'src/app/@shared/services/admin-support.service';
import { HksActionComponent } from './hks-action/hks-action.component';
import { HksDailogComponent } from './hks-dailog/hks-dailog.component';

@Component({
  selector: 'app-hk-security-agreement-list',
  templateUrl: './hk-security-agreement-list.component.html',
  styleUrls: ['./hk-security-agreement-list.component.scss'],
})
export class HkSecurityAgreementListComponent {
  rowClass: any;
  private gridApi!: GridApi<any>;
  public rowData: any;
  public columnDefs = [
    {
      headerName: 'Sr No.',
      field: 'security_agreement_id',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: 'grid-cell-centered',
      flex: 1,
      minWidth: 150,
    },
    {
      headerName: 'Name of the Agreement',
      field: 'name_of_agreement',
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
      headerName: 'Request Initiated Date',
      field: 'request_initiated_date',
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
      headerName: 'Vendor Name',
      field: 'vendor_name',
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
      headerName: 'Company Name',
      field: 'company_name',
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
      headerName: 'Count of Employees',
      field: 'count_of_employees',
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
      headerName: 'Agreement From Date',
      field: 'agreement_from_date',
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
      headerName: 'Agreement To Date',
      field: 'agreement_to_date',
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
      headerName: 'Description of Agreement',
      field: 'description_of_agreement',
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
      headerName: 'Amount',
      field: 'amount',
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
      headerName: 'Tax',
      field: 'tax',
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
      headerName: 'Total Amount',
      field: 'total_amount',
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
      headerName: 'Uploaded Agreement copy',
      field: 'upload_agreement_copy',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: 'grid-cell-centered',
      valueFormatter: 'JSON.parse(value)',
      flex: 1,
      minWidth: 150,

      cellRenderer: (params: any) => {
        for (let data of params.data.house_Agreement_docs) {
          return `<a class="link" href=${data.upload_agreement_copy}>see doc</a>`;
        }
        let links = document.querySelectorAll('.link');
        for (let i = 0; i < links.length; i++) {
          links[i].addEventListener('click', (e) => {
            e.stopPropagation();
          });
        }
      },
      cellStyle: (params: any) => {
        if (params.value) {
          //mark police cells as red
          return { color: 'blue' };
        }
      },
    },
    // {
    //   headerName: 'Other Agreement Copy',
    //   field: 'sub_type',
    //   sortable: true,
    //   resizable: true,
    //   wrapHeaderText: true,
    //   autoHeaderHeight: true,
    //   cellClass: "grid-cell-centered",
    //   valueFormatter: 'JSON.parse(value)',
    //   flex:1,
    //   minWidth:150,
    // },
    {
      headerName: 'Status',
      field: 'hk_status',
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
      headerName: 'Status Updated date',
      field: 'updatedAt',
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
      field: 'security_agreement_id',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      flex: 1,
      minWidth: 150,
      cellRenderer: HksActionComponent,
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

  constructor(
    private route: Router,
    private adminService: AdminSupportService,
    private toast: ToastrService,
    public dialog: MatDialog
  ) {
    this.rowClass = 'rowClass';
  }

  ngOnInit(): void {
    this.getUnAppVendor();
  }

  addRental(path: any) {
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

  getUnAppVendor() {
    this.adminService.getAllHk().subscribe((res: any) => {
      this.rowData = res.data;
    });
  }

  onCellClicked(e: any) {
    const dialogRef = this.dialog.open(HksDailogComponent, {
      width: '500px',
      data: { id: e.data.security_agreement_id },
    });
    dialogRef.afterClosed().subscribe((result) => {});
  }
}
