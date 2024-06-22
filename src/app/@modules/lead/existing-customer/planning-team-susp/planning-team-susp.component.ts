import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { GridApi, GridReadyEvent } from 'ag-grid-community';
import * as moment from 'moment';
import { AppListDialogComponent } from 'src/app/@shared/app-list-dialog/app-list-dialog.component';
import { HeadService } from 'src/app/@shared/services/head.service';
import { LeadService } from 'src/app/@shared/services/lead.service';
import { Router } from '@angular/router';
import { ActionsComponent } from './actions/actions.component';
@Component({
  selector: 'app-planning-team-susp',
  templateUrl: './planning-team-susp.component.html',
  styleUrls: ['./planning-team-susp.component.scss']
})
export class PlanningTeamSuspComponent 
{
  private gridApi!: GridApi<any>;
  rowData:any;
  rowClass: any;
  clicked: boolean = false;
  constructor(private head:HeadService,
    private leadService: LeadService,
    private router: Router,
    public dialog: MatDialog) {
    this.rowClass = 'rowClass'
  }

  ngOnInit(): void {
    this.leadService.getVerifiedDqsDataSus().subscribe((res:any)=>{
      // let modifyData=(res.result).filter((modi:any)=>modi.remaining_count==0 && modi.outdays_count==null || modi.outdays_count=="" || modi.outdays_count=="0");
      this.rowData=res.result
    
  });
  
  }

  public columnDefs = [
    {
      headerName: 'S.No',
      field: 'lead_genration_id',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: "grid-cell-centered",
      minWidth: 150,
    },
    {
      headerName: 'BR Number',
      field: 'br_number',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: "grid-cell-centered",
      minWidth: 150,
    },
    {
      headerName: 'Company Name',
      field: 'associated_company',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: "grid-cell-centered",
      minWidth: 150,
    },
    {
      headerName: 'Product Name',
      field: 'product_request',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: "grid-cell-centered",
      minWidth: 155,
    },

    {
      headerName: 'Stage',
      field: 'stage',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: "grid-cell-centered",
      minWidth: 150,
    },
    
    {
      headerName: 'Audit Start Date',
      field: 'training_start_date',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: "grid-cell-centered",
      minWidth: 150,
    },
    {
      headerName: 'Audit End Date',
      field: 'training_end_date',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: "grid-cell-centered",
      minWidth:150,
    },
    {
      headerName: 'Remaining Count',
      field: 'remaining_count',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: "grid-cell-centered",
      minWidth: 150,
    },
    {
      headerName: 'Action',
      field: 'lead_genration_id',
      minWidth: 150,
      cellRenderer: ActionsComponent,
      cellRendererParams: {
        className: 'mat-blue',
        hideRequestButton: true,
        hideDetailsButton: false,
        hideDownloadIcon: false,
        showCustomIcon: false, 
      },
      cellClass: "grid-cell-centered"
    }
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

  navigate(){
    this.router.navigate(['master/lead/existing-customer/advance-planning/notify_planing_to_postAudit']);

  }//
}
