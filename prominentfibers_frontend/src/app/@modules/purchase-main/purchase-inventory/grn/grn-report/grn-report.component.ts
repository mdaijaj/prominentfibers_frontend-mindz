import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { GridApi, GridReadyEvent } from 'ag-grid-community';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { ConfigurationalmasterService } from 'src/app/@shared/services/configurationalmaster.service';
import { PurchaseRequestService } from 'src/app/@shared/services/purchase-request.service';
import { GrnReportActionComponent } from '../grn-report-action/grn-report-action.component';
import { GrnServiceService } from '../grnService/grn-service.service';

@Component({
  selector: 'app-grn-report',
  templateUrl: './grn-report.component.html',
  styleUrls: ['./grn-report.component.scss']
})
export class GrnReportComponent implements OnInit {
    rowClass: any;
    private gridApi!: GridApi<any>;
    quickFilter: string;
    depData: any;
  
    constructor(
      private route: Router,
      private toast: ToastrService,
      private activeroute: ActivatedRoute,
      public dialog: MatDialog,
      private GrnService:GrnServiceService,
      private _active:ActivatedRoute
      
    ) {
      this.rowClass = 'rowClass';
    }


ngOnInit(): void {
  this.getAllPoList();
   this._active.queryParams.subscribe((res:any)=>{
    if(res.status=='Complete'){
      this.CompletedList=true;
      this.POList=false;
    }
    else if(res.status=='Partial'){
      this.PartialList=true
      this.POList=false;
    }
   })
}

// this is for Polist column
    public columnDefsPoList = [
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
        headerName: 'Vendor Name',
        field: 'po_supplier_vendor_name',
        sortable: true,
        resizable: true,
        wrapHeaderText: true,
        autoHeaderHeight: true,
        cellClass: "grid-cell-centered",
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
        cellRenderer: GrnReportActionComponent,
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
  
// this is for patial column  
  
public columnDefsPartialList = [
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
    headerName: 'Vendor Name',
    field: 'po_supplier_vendor_name',
    sortable: true,
    resizable: true,
    wrapHeaderText: true,
    autoHeaderHeight: true,
    cellClass: "grid-cell-centered",
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
    cellRenderer: GrnReportActionComponent,
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

// this is for completedList

public columnDefsCompletedList = [
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
    headerName: 'Vendor Name',
    field: 'po_supplier_vendor_name',
    sortable: true,
    resizable: true,
    wrapHeaderText: true,
    autoHeaderHeight: true,
    cellClass: "grid-cell-centered",
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
    cellRenderer: GrnReportActionComponent,
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
  
    
  
     
    POList:boolean=true;
    PartialList:boolean=false;
    CompletedList:boolean=false;
  changeTabs(tabs:any){
  if(tabs=='POList'){
    this.POList=true;
    this.PartialList=false;
    this.CompletedList=false;
  }
  else if(tabs=='Partial'){
    this.POList=false;
    this.PartialList=true;
    this.CompletedList=false;
  }
  else if(tabs=='Completed'){
    this.POList=false;
    this.PartialList=false;
    this.CompletedList=true;
  }

    }
partialListData:any;
completedListData:any;
PoListData:any[]=[];
sortedPoData:any;
    getAllPoList(){
      this.GrnService.getAllPoList().subscribe((response:any)=>{
         this.PoListData=response.data;
         this.sortedPoData=this.PoListData.filter((res:any)=>{
          return res.grn_masters.length==0;
         })
        this.partialListData=  this.PoListData.filter((res:any)=>{
           return res.grn_masters[0]?.grnStatus==='PARTIAL'
        })
        this.completedListData=   this.PoListData.filter((res:any)=>{
            return res.grn_masters[0]?.grnStatus==='COMPLETE'
        })
       
      })
     
    }

    onFilterByVendorName(event:any) {
      console.log(event,'event');
      
      // if (event == null || undefined){
      //   this.PoListData  = this.PoListData;
      // }else{
      //   this.PoListData  = this.PoListData.filter((res:any) => res.po_supplier_vendor_name == event.value);
      // } 
    }
    onFilterByPOTypeName(event:any) {
      // if (event == null || undefined){
      //   this.PoListData  = this.PoListData;
      // }else{
      //   this.PoListData  = this.PoListData.filter((res:any) => res.po_type== event.value);
      // } 
    }
}
