import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { GridApi, GridReadyEvent } from 'ag-grid-community';
import { ToastrService } from 'ngx-toastr';
import { ConfigurationalmasterService } from 'src/app/@shared/services/configurationalmaster.service';
import { LeadService } from 'src/app/@shared/services/lead.service';
import { RejectedAuditActionComponent } from './rejected-audit-action/rejected-audit-action.component';

@Component({
  selector: 'app-rejected-audit-report',
  templateUrl: './rejected-audit-report.component.html',
  styleUrls: ['./rejected-audit-report.component.scss']
})
export class RejectedAuditReportComponent {
    rowClass: any;
    private gridApi!: GridApi<any>;
    quickFilter: string;
    depData: any;
  
    constructor(
      private route: Router,
      private toast: ToastrService,
      private activeroute: ActivatedRoute,
      public dialog: MatDialog,
      private configService: ConfigurationalmasterService,
      private leadService:LeadService,
    ) {
      this.rowClass = 'rowClass';
    }
  
    ngOnInit(): void {
      this.configService.getDepartment().subscribe((res: any) => {
        this.depData = res.data;
      })
      this.getAllIssuedPOData();
    }
  
    public rowData: any;
  
    public columnDefs = [
      {
        headerName: 'S.No',
        field: 'lead_genration_id',
        sortable: true,
        resizable: true,
        wrapHeaderText: true,
        autoHeaderHeight: true,
        cellClass: "grid-cell-centered",
        flex:1,
        minWidth:150,
      },
      {
        headerName: 'BR Number ',
        field: 'br_number',
        sortable: true,
        resizable: true,
        wrapHeaderText: true,
        autoHeaderHeight: true,
        cellClass: "grid-cell-centered",
        flex:1,
        minWidth:150,
      },
      {
        headerName: 'Associated Comapany ',
        field: 'associated_company',
        sortable: true,
        resizable: true,
        wrapHeaderText: true,
        autoHeaderHeight: true,
        cellClass: "grid-cell-centered",
        flex:1,
        minWidth:150,
      },
      {
        headerName: 'Product Name',
        field: 'product_request',
        sortable: true,
        resizable: true,
        wrapHeaderText: true,
        autoHeaderHeight: true,
        cellClass: "grid-cell-centered",
        flex:1,
        minWidth:150,
      },
      // {
      //   headerName: 'Stage',
      //   field: 'stage',    
      //   sortable: true,
      //   resizable: true,
      //   wrapHeaderText: true,
      //   autoHeaderHeight: true,
      //   cellClass: "grid-cell-centered",
      //   flex:1,
      //   minWidth:150,
      // },
      {
        headerName: 'Start Date',
        field: 'training_start_date',    
        sortable: true,
        resizable: true,
        wrapHeaderText: true,
        autoHeaderHeight: true,
        cellClass: "grid-cell-centered",
        flex:1,
        minWidth:155,
      },
      {
        headerName: 'End Date',
        field: 'training_end_date',
        sortable: true,
        resizable: true,
        wrapHeaderText: true,
        autoHeaderHeight: true,
        cellClass: "grid-cell-centered",
        flex:1,
        minWidth:150,
      },
      {
        headerName: 'status',
        field: 'status',
        sortable: true,
        resizable: true,
        wrapHeaderText: true,
        autoHeaderHeight: true,
        cellClass: "grid-cell-centered",
        flex:1,
        minWidth:150,
        cellStyle:{ color: 'purple' }
      },
      {
        headerName: 'Audit status',
        field: 'auditor_status',
        sortable: true,
        resizable: true,
        wrapHeaderText: true,
        autoHeaderHeight: true,
        cellClass: "grid-cell-centered",
        flex:1,
        minWidth:150,
        cellStyle:{ color: 'purple' }
      },
      {
        headerName: 'Action',
        field: 'lead_genration_id',
        flex:1,
        minWidth:260,
        cellRenderer: RejectedAuditActionComponent,
        cellRendererParams: {
          className: 'mat-blue',
          hideRequestButton: true,
          hideDetailsButton: false,
          hideDownloadIcon: false,
          showCustomIcon: false, // Hide attachment icon
        },
        cellClass: "grid-cell-centered"
      }
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
  
    statusCellClicked(e: any) {
      
      // const dialogRef = this.dialog.open(PrStatusDilogComponent, { width: '450px', data: { cellData: e.data} });
      // dialogRef.afterClosed().subscribe(result => {
      //   
      // })
    }
  
    getAllIssuedPOData() {
      this.leadService.getAllRejectedReport().subscribe((res: any) => {
        this.rowData = res.result;
      })
    }

}
