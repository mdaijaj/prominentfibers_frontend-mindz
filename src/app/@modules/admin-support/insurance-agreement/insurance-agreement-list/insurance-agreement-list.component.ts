import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { GridApi, GridReadyEvent } from 'ag-grid-community';
import { ToastrService } from 'ngx-toastr';
import { RentalDailogComponent } from '../../rental-agreement/rental-agreement-list/rental-dailog/rental-dailog.component';
import { InsuranceActionComponent } from './insurance-action/insurance-action.component';
import { AdminSupportService } from 'src/app/@shared/services/admin-support.service';
import { InsuranceDailogComponent } from './insurance-dailog/insurance-dailog.component';

@Component({
  selector: 'app-insurance-agreement-list',
  templateUrl: './insurance-agreement-list.component.html',
  styleUrls: ['./insurance-agreement-list.component.scss']
})
export class InsuranceAgreementListComponent {
  rowClass: any;
  private gridApi!: GridApi<any>;
  public rowData:any;
  public columnDefs = [
    {
      headerName: 'Sr No.',
      field: 'insurance_id',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: "grid-cell-centered",
      flex:1,
      minWidth:150,
    },
    {
      headerName: 'Name of the Agreement',
      field: 'name_of_the_Agreement',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: "grid-cell-centered",
      valueFormatter: 'JSON.parse(value)',
      flex:1,
      minWidth:150,
    },
    {
      headerName: 'Request Initiated Date',
      field: 'request_initiated_date',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: "grid-cell-centered",
      valueFormatter: 'JSON.parse(value)',
      flex:1,
      minWidth:150,
    },
    {
      headerName: 'Vendor Name',
      field: 'vendor_name',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: "grid-cell-centered",
      valueFormatter: 'JSON.parse(value)',
      flex:1,
      minWidth:150,
    },
    {
      headerName: 'Policy Holder Name',
      field: 'policy_holder_name',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: "grid-cell-centered",
      valueFormatter: 'JSON.parse(value)',
      flex:1,
      minWidth:150,
    },
    {
      headerName: 'Insurance Company Name',
      field: 'insurance_company_name',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: "grid-cell-centered",
      valueFormatter: 'JSON.parse(value)',
      flex:1,
      minWidth:150,
    },
    {
      headerName: 'Policy Name',
      field: 'policy_name',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: "grid-cell-centered",
      valueFormatter: 'JSON.parse(value)',
      flex:1,
      minWidth:150,
    },

    {
      headerName: 'Policy Number',
      field: 'policy_number',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: "grid-cell-centered",
      valueFormatter: 'JSON.parse(value)',
      flex:1,
      minWidth:150,
    },
    {
      headerName: 'Policy From Date',
      field: 'policy_from_date',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: "grid-cell-centered",
      valueFormatter: 'JSON.parse(value)',
      flex:1,
      minWidth:150,
    },
    {
      headerName: 'Policy To Date',
      field: 'policy_to_date',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: "grid-cell-centered",
      valueFormatter: 'JSON.parse(value)',
      flex:1,
      minWidth:150,
    },
    {
      headerName: 'Count of Employees Covered',
      field: 'count_of_employees_covered',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: "grid-cell-centered",
      valueFormatter: 'JSON.parse(value)',
      flex:1,
      minWidth:150,
    },
    {
      headerName: 'Total sum assured',
      field: 'total_sum_assured',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: "grid-cell-centered",
      valueFormatter: 'JSON.parse(value)',
      flex:1,
      minWidth:150,
    },
    {
      headerName: 'Individual Sum Assured',
      field: 'PTDA_individual',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: "grid-cell-centered",
      valueFormatter: 'JSON.parse(value)',
      flex:1,
      minWidth:150,
    },
    {
      headerName: 'Policy Amount',
      field: 'policy_amount',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: "grid-cell-centered",
      valueFormatter: 'JSON.parse(value)',
      flex:1,
      minWidth:150,
    },
    {
      headerName: 'Tax',
      field: 'tax',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: "grid-cell-centered",
      valueFormatter: 'JSON.parse(value)',
      flex:1,
      minWidth:150,
    },
    {
      headerName: 'Total Amount',
      field: 'total_amount',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: "grid-cell-centered",
      valueFormatter: 'JSON.parse(value)',
      flex:1,
      minWidth:150,
    },
    {
      headerName: 'Uploaded Agreement copy',
      field: 'upload_agreement_copy',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: "grid-cell-centered",
      valueFormatter: 'JSON.parse(value)',
      flex:1,
      minWidth:150,
      cellRenderer: (params: any) => {
        for (let data of params.data.Insurance_docs) {
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
    //   field: 'upload_agreement_copy',
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
      field: 'policy_status',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: "grid-cell-centered",
      valueFormatter: 'JSON.parse(value)',
      flex:1,
      minWidth:150,
    },
    {
      headerName: 'Status Updated date',
      field: 'updatedAt',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: "grid-cell-centered",
      valueFormatter: 'JSON.parse(value)',
      flex:1,
      minWidth:150,
    },
    {
      headerName: 'Actions',
      field: 'insurance_id', sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      flex:1,
      minWidth:150,
      cellRenderer: InsuranceActionComponent,
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


  constructor(
     private route: Router,
     private adminService: AdminSupportService,
     private toast: ToastrService,
     public dialog: MatDialog,

    ) {
    this.rowClass = 'rowClass'
  }

  ngOnInit(): void {
    this.getUnAppVendor();
  }



  addRental(path:any) {
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

   getUnAppVendor(){
     this.adminService.getAllins().subscribe((res:any)=>{
      this.rowData =res.data;
    })
  }

  onCellClicked(e: any) {
    
    const dialogRef = this.dialog.open(InsuranceDailogComponent, { width: '500px', data: { id: e.data.insurance_id} });
    dialogRef.afterClosed().subscribe(result => {
      
    })
  }
}
