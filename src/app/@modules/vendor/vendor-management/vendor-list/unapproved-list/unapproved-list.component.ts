import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { GridApi, GridReadyEvent } from 'ag-grid-community';
import { VendorManagementService } from 'src/app/@shared/services/vendor-management.service';
import { ActionComponent } from './action/action.component';
import { ActiveStatusComponent } from './active-status/active-status.component';
import { VendorDilogComponent } from './vendor-dilog/vendor-dilog.component';

@Component({
  selector: 'app-unapproved-list',
  templateUrl: './unapproved-list.component.html',
  styleUrls: ['./unapproved-list.component.scss']
})
export class UnapprovedListComponent {
  rowClass: any;
  private gridApi!: GridApi<any>;

  constructor(
   private route: Router,
   public dialog: MatDialog,
   private vendorService: VendorManagementService

   ) {
   this.rowClass = 'rowClass'
 }

 ngOnInit(): void {
  this.getUnAppVendor();
 }
 
  public rowData:any;
  public columnDefs = [
    {
      headerName: 'Sr No.',
      field: 'vendor_management_id',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: "grid-cell-centered",
      flex:1,
      minWidth:150,
    },
    // {
    //   headerName: 'Vendor Code',
    //   field: 'vendor_code',
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
      headerName: 'Vendor Name ',
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
      headerName: 'Location ',
      field: 'address',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: "grid-cell-centered",
      valueFormatter: 'JSON.parse(value)',
      flex:1,
      minWidth:150,
    },
    // {
    //   headerName: 'Type of Vendor',
    //   field: 'type_of_vendor',
    //   sortable: true,
    //   resizable: true,
    //   wrapHeaderText: true,
    //   autoHeaderHeight: true,
    //   cellClass: "grid-cell-centered",
    //   valueFormatter: 'JSON.parse(value)',
    //   flex:1,
    //   minWidth:150,
    // },
    // {
    //   headerName: 'Active',
    //   field: 'vendor_management_id',
    //   sortable: true,
    //   resizable: true,
    //   wrapHeaderText: true,
    //   autoHeaderHeight: true,
    //   cellClass: "grid-cell-centered",
    //   valueFormatter: 'JSON.parse(value)',
    //   flex:1,
    //   minWidth:150,
    //   cellRenderer: ActiveStatusComponent,
    // },
    // {
    //   headerName: 'Sub Type',
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
      headerName: 'Actions',
      field: 'vendor_management_id', sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      flex:1,
      minWidth:150,
      cellRenderer: ActionComponent,
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

  goToAddCreate(path:any) {
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

  addVendor(path:any){
    this.route.navigate([path]);
  }

  getUnAppVendor(){
    this.vendorService.getUnAppVendor().subscribe((res:any)=>{
     this.rowData =res.data;
     
    })
  }

  onCellClicked(e: any) {
    
    const dialogRef = this.dialog.open(VendorDilogComponent, { width: '450px', data: { id: e.data.vendor_management_id} });
    dialogRef.afterClosed().subscribe(result => {
      
    })
  }
}
