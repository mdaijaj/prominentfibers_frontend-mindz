import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { GridApi, GridReadyEvent } from 'ag-grid-community';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { ConfigurationalmasterService } from 'src/app/@shared/services/configurationalmaster.service';
import { PurchaseRequestService } from 'src/app/@shared/services/purchase-request.service';
// import { CloseRfpActionComponent } from './close-rfp-action/close-rfp-action.component';
import { DataUpdateService } from 'src/app/@shared/services/data-update.service';
import { CloseRfpActionComponent } from '../../close-rfp/close-rfp-action/close-rfp-action.component';
@Component({
  selector: 'app-all-rfp-list',
  templateUrl: './all-rfp-list.component.html',
  styleUrls: ['./all-rfp-list.component.scss']
})
export class AllRfpListComponent {
  rowClass: any;
  private gridApi!: GridApi<any>;
  quickFilter: string;
  depData: any;
  rowDatas:any;
  constructor(
   private route: Router,
   private toast: ToastrService,
   private activeroute: ActivatedRoute,
   public dialog: MatDialog,
   private configService: ConfigurationalmasterService,
   private prService: PurchaseRequestService,
   private updateTableData:DataUpdateService
   ) {
   this.rowClass = 'rowClass';
 }

 ngOnInit(): void {
  this.configService.getDepartment().subscribe((res:any)=>{
    this.depData = res.data;
  })
  this.rowDatas=[
    
    {
        procurement_product_id: 8,
        procurement_id: 24,
        product_image: "https://dqsapi.elitetraveltech.in/item_master/product_image-1693202684234.jpg",
        item_name: "Mobile",
        item_code: 3453,
        unit: 1,
        priority: "MEDIUM",
        mvp: 23000,
        location: "aaa",
        state: "sss",
        city: "dsad",
        pin: 12121,
        delivery_address: "dsds",
        file: "https://dqsapi.elitetraveltech.in/item_master/file-1694495012179.jpg",
        remarks: null,
        name: "Arpit SP null",
        department: "Auditors",
        emp_id: null,
        approvel_status: "APPROVED",
        status: "ACTIVE",
        end_date: "2023-09-11",
        vendors: [
            10
        ],
        vendors_invited_count: 1,
        vendors_responded_count: null,
        invoice_n_o: null,
        invoice_date: null,
        invoice_remarks: null,
        invoice_file: null,
        grn_date: null,
        grn_item_n_o: null,
        grn_location: null,
        grn_file: null,
        asset_category_id: 3,
        rfp_status: "CLOSE RFP",
        po_status: null,
        statusVendor: null,
        createdAt: "2023-09-12T05:03:32.000Z",
        updatedAt: "2024-03-14T11:12:18.000Z"
    },
    
    {
      procurement_product_id: 7,
      procurement_id: 24,
      product_image: "https://dqsapi.elitetraveltech.in/item_master/product_image-1693202684234.jpg",
      item_name: "Mobile",
      item_code: 3453,
      unit: 1,
      priority: "MEDIUM",
      mvp: 23000,
      location: "aaa",
      state: "sss",
      city: "dsad",
      pin: 12121,
      delivery_address: "dsds",
      file: "https://dqsapi.elitetraveltech.in/item_master/file-1694495012179.jpg",
      remarks: null,
      name: "Arpit SP null",
      department: "Auditors",
      emp_id: null,
      approvel_status: "APPROVED",
      status: "ACTIVE",
      end_date: "2023-09-11",
      vendors: [
          10
      ],
      vendors_invited_count: 1,
      vendors_responded_count: null,
      invoice_n_o: null,
      invoice_date: null,
      invoice_remarks: null,
      invoice_file: null,
      grn_date: null,
      grn_item_n_o: null,
      grn_location: null,
      grn_file: null,
      asset_category_id: 3,
      rfp_status: "CLOSE RFP",
      po_status: null,
      statusVendor: null,
      createdAt: "2023-09-12T05:03:32.000Z",
      updatedAt: "2024-03-14T11:12:18.000Z"
  },
   
   
]
  this.setAllCloseRfpList();
  this.getAllCloseRfpList();
}

public rowData:any;

public columnDefs = [
  {
    headerName: 'Sr No.',
    field: 'procurement_product_id',
    sortable: true,
    resizable: true,
    wrapHeaderText: true,
    autoHeaderHeight: true,
    cellClass: "grid-cell-centered",
    flex:1,
    minWidth:150,
  },
  {
    headerName: 'PR NO',
    field: 'procurement_id',
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
    headerName: 'Department',
    field: 'department',
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
    headerName: 'Vendor Invied',
    field: 'vendors_invited_count',
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
    headerName: 'Vendor Responded',
    field: 'vendors_responded_count',
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
    headerName: 'End Date',
    field: 'end_date',
    sortable: true,
    resizable: true,
    wrapHeaderText: true,
    autoHeaderHeight: true,
    cellClass: "grid-cell-centered",
    flex:1,
    minWidth:150,
    valueFormatter:(params:any)=>{
      return ((params.value !== null) ? moment(new Date(params.value)).format('LL') : 'N/A')
    },
  },
  {
    headerName: 'Asset Category',
    field: 'item_name',
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
    headerName: 'Best Amount',
    field: 'mvp',
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
    headerName: 'Priority',
    field: 'priority',
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
    field: 'procurement_product_id', sortable: true,
    resizable: true,
    wrapHeaderText: true,
    autoHeaderHeight: true,
    flex:1,
    minWidth:150,
    cellRenderer: CloseRfpActionComponent,
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

  statusCellClicked(e:any){
    
    // const dialogRef = this.dialog.open(PrStatusDilogComponent, { width: '450px', data: { cellData: e.data} });
    // dialogRef.afterClosed().subscribe(result => {
    //   
    // })
  }

  getAllCloseRfpList(){
    this.updateTableData.getTabledata().subscribe((res:any)=>{
    this.rowData= res.data;
    console.log(this.rowData,">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>rowdata");
    
    })
  }
  setAllCloseRfpList(){
    this.prService.getAllCloseRfp().subscribe((res:any)=>{
      const rowData = res;
      this.updateTableData.setTableData(rowData)
      })
  }
}
