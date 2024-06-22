import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GridApi, GridReadyEvent } from 'ag-grid-community';
import { HrServiceService } from 'src/app/@shared/services/hr-service.service';
import { ActiveStatusComponent } from './active-status/active-status.component';
import { ActionComponent } from './action/action.component';
import { VendorManagementService } from 'src/app/@shared/services/vendor-management.service';
import { VendorDilogComponent } from './vendor-dilog/vendor-dilog.component';
import { MatDialog } from '@angular/material/dialog';
import { RbacMasterService } from 'src/app/@shared/services/rbac-master.service';

@Component({
  selector: 'app-unapproved-vendor-list',
  templateUrl: './unapproved-vendor-list.component.html',
  styleUrls: ['./unapproved-vendor-list.component.scss']
})
export class UnapprovedVendorListComponent implements OnInit, AfterViewInit{
  rowClass: any;
  private gridApi!: GridApi<any>;
  assignAction: any;

  constructor(
   private route: Router,
   public dialog: MatDialog,
   private vendorService: VendorManagementService,
   private _rbackService:RbacMasterService,

   ) {
   this.rowClass = 'rowClass'
 }

 ngOnInit(): void {
  this.getUnAppVendor();
 }

 ngAfterViewInit(): void {
  setTimeout(()=>{
    this.assignAction = this._rbackService.accessAssignAction();
  },0);
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
    {
      headerName: 'Vendor Code',
      field: 'vendor_code',
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
    {
      headerName: 'Type of Vendor',
      field: 'type_of_vendor',
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
      headerName: 'Active',
      field: 'vendor_management_id',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: "grid-cell-centered",
      valueFormatter: 'JSON.parse(value)',
      flex:1,
      minWidth:150,
      cellRenderer: ActiveStatusComponent,
    },
    {
      headerName: 'Sub Type',
      field: 'sub_type',
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
    if (this.assignAction.Read) {
      const dialogRef = this.dialog.open(VendorDilogComponent, { width: '400px', data: { id: e.data.vendor_management_id } });
      dialogRef.afterClosed().subscribe(result => {
      })
    }
  }
}
