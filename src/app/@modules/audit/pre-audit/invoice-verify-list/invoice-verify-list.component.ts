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
import { Router } from '@angular/router';
import { ActionComponent } from '../auditor-master/action/action.component';

@Component({
  selector: 'app-invoice-verify-list',
  templateUrl: './invoice-verify-list.component.html',
  styleUrls: ['./invoice-verify-list.component.scss']
})
export class InvoiceVerifyListComponent {
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
    this.leadService.get_invoice_request_list().subscribe((res: any) => {
      this.rowData = res.data
      
    })
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
      field: 'associatedCompany',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: "grid-cell-centered",
      minWidth: 150,
    },
    {
      headerName: 'Credit Days',
      field: 'creditDays',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: "grid-cell-centered",
      minWidth: 150,
    },
    {
      headerName: 'Email Id',
      field: 'email',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: "grid-cell-centered",
      minWidth: 150,
    },
    {
      headerName: 'GST Number',
      field: 'GSTNumber',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: "grid-cell-centered",
      minWidth: 155,
    },

    {
      headerName: 'State',
      field: 'state',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: "grid-cell-centered",
      minWidth: 150,
    },
    // {
    //   headerName: 'Email',
    //   field: 'email',
    //   sortable: true,
    //   resizable: true,
    //   wrapHeaderText: true,
    //   autoHeaderHeight: true,
    //   cellClass: "grid-cell-centered",
    //   flex:1,
    //   minWidth:150,
    // },


    {
      headerName: 'Audit Start Date',
      field: 'audit_start_date',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: "grid-cell-centered",
      minWidth: 150,
    },
    {
      headerName: 'Audit End Date',
      field: 'audit_end_date',
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
      cellRenderer: ActionComponent,
      cellRendererParams: {
        className: 'mat-blue',
        hideRequestButton: true,
        hideDetailsButton: false,
        hideDownloadIcon: false,
        showCustomIcon: false, // Hide attachment icon
      },
      cellClass: "grid-cell-centered"
    }

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

}