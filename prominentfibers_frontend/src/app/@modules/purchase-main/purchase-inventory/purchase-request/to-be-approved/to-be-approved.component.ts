import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { GridApi, GridReadyEvent } from 'ag-grid-community';
import { ToastrService } from 'ngx-toastr';
import { ToBeAppActionComponent } from './to-be-app-action/to-be-app-action.component';
import { ConfigurationalmasterService } from 'src/app/@shared/services/configurationalmaster.service';
import { PurchaseRequestService } from 'src/app/@shared/services/purchase-request.service';
import * as moment from 'moment';

@Component({
  selector: 'app-to-be-approved',
  templateUrl: './to-be-approved.component.html',
  styleUrls: ['./to-be-approved.component.scss']
})
export class ToBeApprovedComponent {
  rowClass: any;
  private gridApi!: GridApi<any>;
  quickFilter: string;
  depData: any;
  catData: any;

  constructor(
   private route: Router,
   private toast: ToastrService,
   private activeroute: ActivatedRoute,
   public dialog: MatDialog,
   private configService: ConfigurationalmasterService,
   private prService: PurchaseRequestService
   ) {
   this.rowClass = 'rowClass';
 }

 ngOnInit(): void {
  let idEmp=localStorage.getItem('EmpMainId')
  this.configService.getDepartment().subscribe((res:any)=>{
    this.depData = res.data;
  })
  this.getToBeAppPr(idEmp);
  // this.getAllCategory();
}

public rowData:any;

public columnDefs = [
  {
    headerName: 'Sr No.',
    valueGetter: "node.rowIndex + 1",
    sortable: true,
    resizable: true,
    wrapHeaderText: true,
    autoHeaderHeight: true,
    cellClass: "grid-cell-centered",
    flex:1,
    minWidth:150,
  },
  {
    headerName: 'PR Code',
    field: 'PR_code',
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
    headerName: 'PR Category',
    field: 'PR_category',
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
    headerName: 'Create Date',
    field: 'createdAt',
    sortable: true,
    resizable: true,
    wrapHeaderText: true,
    autoHeaderHeight: true,
    cellClass: "grid-cell-centered",
    flex:1,
    minWidth:150,
    valueFormatter:(params:any)=>{
      return moment(new Date(params.value)).format('LL')
    },
  },
  {
    headerName: 'Status',
    field: 'approvel_status',
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
    field: 'procurement_id', sortable: true,
    resizable: true,
    wrapHeaderText: true,
    autoHeaderHeight: true,
    flex:1,
    minWidth:150,
    cellRenderer: ToBeAppActionComponent,
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

  getToBeAppPr(idEmp:any){
    this.prService.getToBeAppPr(idEmp).subscribe((res:any)=>{
    this.rowData = res.data;
    })

    // this.prService.getAllPrList().subscribe((res:any)=>{
    //   this.rowData= res.data;
    //   // this.filteredData  = this.rowData;
    // })
  }

  // getAllCategory() {
  //   this.prService.getAllCategory().subscribe((res: any) => {
  //     this.catData = res.data;
      
  //   })
  // }
}
