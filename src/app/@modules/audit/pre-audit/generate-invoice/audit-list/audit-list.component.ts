import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { GridApi, GridReadyEvent } from 'ag-grid-community';
import * as moment from 'moment';
import { EmpMasterService } from 'src/app/@shared/services/emp-master.service';
import { HeadService } from 'src/app/@shared/services/head.service';
import { LeadService } from 'src/app/@shared/services/lead.service';
import { GeneratInvoiceActionComponent } from '../generat-invoice-action/generat-invoice-action.component';
import { RecruitService } from 'src/app/@shared/services/recruitment.service';
import { EmpRegistrationService } from 'src/app/@shared/services/emp-registration.service';




@Component({
  selector: 'app-audit-list',
  templateUrl: './audit-list.component.html',
  styleUrls: ['./audit-list.component.scss']
})

export class AuditListComponent {
  private gridApi!: GridApi<any>;
  rowData:any;
  rowData2:any;
  rowData1:any;
  personalIdData:any;
  propertyManager:any
  text:any;
  firstLastName:any;
  rowClass: any;
  clicked: boolean = false;
  constructor(private emp_master:EmpMasterService,
    private empService : EmpRegistrationService,
    private recruitService: RecruitService,private head:HeadService,
    private leadService: LeadService,
    public dialog: MatDialog) {
      this.rowClass = 'rowClass'
     }

  ngOnInit(): void {
   
   this.head.clicked.subscribe(data=>{
    this.clicked = data;
  })
  this.leadService.getVerifiedDqsData().subscribe((res:any)=>{
  this.rowData=res.result;
  
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
      flex:1,
      minWidth:150,
    },
    {
      headerName: 'BR Number',
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
      headerName: 'Work Order No.',
      field: 'workOrder_no',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: "grid-cell-centered",
      flex:1,
      minWidth:150,
    },
    {
      headerName: 'Associated Company',
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
      headerName: 'Associated Contact Person',
      field: 'first_name',    
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: "grid-cell-centered",
      flex:1,
      minWidth:155,
    },
    {
      headerName: 'Product Name',
      field: '',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: "grid-cell-centered",
      flex:1,
      minWidth:150,
    },
    {
      headerName: 'Start Date',
      field: 'training_start_date',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: "grid-cell-centered",
      flex:1,
      minWidth:150,
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
      headerName: 'Status',
      field: 'status',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: "grid-cell-centered",
      flex:1,
      minWidth:150,
    },
    
    {
      headerName: 'Status',
      field: 'status',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellRenderer: GeneratInvoiceActionComponent,
      cellClass: "grid-cell-centered",
      flex:1,
      minWidth:150,
      cellStyle:{ color: 'blue' }
      
    },
    
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
 }
