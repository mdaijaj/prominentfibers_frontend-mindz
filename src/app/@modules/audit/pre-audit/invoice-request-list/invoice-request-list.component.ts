import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { GridApi, GridReadyEvent } from 'ag-grid-community';
import * as moment from 'moment';
import { AppListDialogComponent } from 'src/app/@shared/app-list-dialog/app-list-dialog.component';
import { EmpMasterService } from 'src/app/@shared/services/emp-master.service';
import { EmpRegistrationService } from 'src/app/@shared/services/emp-registration.service';
import { HeadService } from 'src/app/@shared/services/head.service';
import { LeadService } from 'src/app/@shared/services/lead.service';
import { RecruitService } from 'src/app/@shared/services/recruitment.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ActionComponent } from '../auditor-master/action/action.component';

@Component({
  selector: 'app-invoice-request-list',
  templateUrl: './invoice-request-list.component.html',
  styleUrls: ['./invoice-request-list.component.scss']
})
export class InvoiceRequestListComponent  {
  private gridApi!: GridApi<any>;
  rowData: any;
  rowData2: any;
  rowData1: any;
  personalIdData: any;
  propertyManager: any
  text: any;
  firstLastName: any;
  rowClass: any;
  clicked: boolean = false;
  hidden: boolean=false;
  constructor(private emp_master: EmpMasterService,
    private router: Router,
    private route:ActivatedRoute,
    private empService: EmpRegistrationService,
    private recruitService: RecruitService, private head: HeadService,
    private leadService: LeadService,
    public dialog: MatDialog) {
    this.rowClass = 'rowClass'
  }

  ngOnInit(): void {
    this.head.clicked.subscribe(data => {
      this.clicked = data;
    })
    this.leadService.getInvoiceListCopy().subscribe((res: any) => {
      this.rowData = res.data
      
    })

    
  }

  public columnDefs = [
    {
      headerName: 'Invoice No.',
      field: 'invoice_inline_id',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: "grid-cell-centered",
     
      maxWidth: 350,
    },
    {
      headerName: 'Item Description',
      field: 'item_description',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
     
      maxWidth: 350,
      cellClass: "grid-cell-centered",
    },
    {
      headerName: 'BR Number',
      field: 'Br_Number',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
   
      maxWidth: 350,
      cellClass: "grid-cell-centered",
    },
    {
      headerName: 'Unit',
      field: 'unit',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
    
      maxWidth: 350,
      cellClass: "grid-cell-centered",
    },
    {
      headerName: 'Invoice Amout',
      field: 'Net_amount',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
    
      maxWidth: 350,
      cellClass: "grid-cell-centered",
    },
    
    // {
    //   headerName: 'Invoice Amount',
    //   field: 'creditDays',
    //   sortable: true,
    //   resizable: true,
    //   wrapHeaderText: true,
    //   autoHeaderHeight: true,
    //   cellClass: "grid-cell-centered",
    // },

    // {
    //   headerName: 'Action',
    //   field: 'lead_genration_id',
    //   cellRenderer: ActionComponent,
    //   cellRendererParams: {
    //     className: 'mat-blue',
    //     hideRequestButton: true,
    //     hideDetailsButton: false,
    //     hideDownloadIcon: false,
    //     showCustomIcon: false, // Hide attachment icon
    //   },
    //   cellClass: "grid-cell-centered"
    // }

    // {
    //   headerName: 'Status',
    //   field: 'status',
    //   sortable: true,
    //   resizable: true,
    //   wrapHeaderText: true,
    //   autoHeaderHeight: true,
    //   cellClass: "grid-cell-centered",
    //   flex:1,
    //   minWidth:150,
    //   cellStyle:{ color: 'blue' }

    // },

  ];

  dateFormatter(createdAt: any) {
    return moment(createdAt).format('DD/MM/YYYY');
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
  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;
    

  }
  onCellClicked(e: any) {
    
    const dialogRef = this.dialog.open(AppListDialogComponent, { width: '500px', data: { lead_id: e.data.lead_genration_id } });
    dialogRef.afterClosed().subscribe(result => {
      
    })
  }
  suspention() {

    this.router.navigate(['master/lead/existing-customer/suspection/suspention']);

  }
  toggleBadgeVisibility() {
    this.hidden = !this.hidden;
  }

  getCurrentRoute():string{
    return this.route.snapshot.url.map(s => s.path).join('/')
}


}
