import { Component } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { GridApi, GridReadyEvent } from 'ag-grid-community';
import * as moment from 'moment';
import { AppListDialogComponent } from 'src/app/@shared/app-list-dialog/app-list-dialog.component';
import { ConfigurationalmasterService } from 'src/app/@shared/services/configurationalmaster.service';
import { EmpMasterService } from 'src/app/@shared/services/emp-master.service';
import { EmpRegistrationService } from 'src/app/@shared/services/emp-registration.service';
import { HeadService } from 'src/app/@shared/services/head.service';
import { LeadService } from 'src/app/@shared/services/lead.service';
import { RecruitService } from 'src/app/@shared/services/recruitment.service';
import { UploadCsvPopupComponent } from 'src/app/@modules/itticketing/configurationalmaster/auditor-master/upload-csv-popup/upload-csv-popup.component';
import { ActionComponent } from './action/action.component';
import { SalesRequestService } from 'src/app/@shared/services/salesrequest/sales-request.service';

@Component({
  selector: 'app-sales-request',
  templateUrl: './sales-request.component.html',
  styleUrls: ['./sales-request.component.scss']
})
export class SalesRequestComponent{
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
  id: any;
  lead_id: any;
  cellValue: any;
  braedCrumbs:any
  constructor(private emp_master:EmpMasterService, private activeroute: ActivatedRoute,
    private empService : EmpRegistrationService, public route: Router,
    private recruitService: RecruitService,private head:HeadService,
    private leadService: LeadService,
    private configService: ConfigurationalmasterService,
    private salesRequest_:SalesRequestService,
    public dialog: MatDialog) {
      this.rowClass = 'rowClass'
      
    if(this.route.url.includes('block-auditor')){
      this.braedCrumbs = 'block-auditor'
    }else if (this.route.url.includes('auditor-evalvator')){
      this.braedCrumbs = 'auditor-evalvator'
    }
     }

  ngOnInit(): void {
   
   this.head.clicked.subscribe(data=>{
    this.clicked = data;
  })
  this.activeroute.queryParams.subscribe(params => {
    this.id = params;
    
    this.lead_id = this.id.lead_id;
  });
  this.salesRequest_.getAllData().subscribe((res:any) => {
    this.rowData = res.data;
    console.log(this.rowData[0].sales_request.status,"kjkjkj");
    
  })  
    
  }

  openCreate() {
    this.route.navigate(
      ['master/lead/lead-management/assign-lead/assign-lead'],
      { queryParams: { lead_id: this.lead_id } }
    );
  }

  public columnDefs = [
    {
      headerName: 'Lead ID.',
      field: 'lead_data.lead_genration_id',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: "grid-cell-centered",
      flex:1,
      minWidth:150,
    },
    {
      headerName: 'Slaes Request Stage',
      field: 'saleRequest_stage',
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
      field: 'lead_data.associated_company',
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
      field: 'lead_data.br_number',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: "grid-cell-centered",
      flex:1,
      minWidth:155,
    },
    {
      headerName: 'Client Name',
      field: 'lead_data',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: "grid-cell-centered",
      flex:1,
      minWidth:155,
      valueGetter: function (params:any) {
        return params.data.lead_data.first_name + ' ' + params.data.lead_data.last_name;
      },
    },
    {
      headerName: 'DQS Contact Source',
      field: 'lead_data.dqs_contact_source',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: "grid-cell-centered",
      flex:1,
      minWidth:150,
    },
    {
      headerName: 'Lead Created Date',
      field: 'lead_data.lead_created_date',
      // valueFormatter: this.dateFormatter,
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      flex:1,
      minWidth:150,
    },
    {
      headerName: 'Country',
      field: 'lead_data.country_name',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: "grid-cell-centered",
      flex:1,
      minWidth:150,
    },
    {
      headerName: 'State',
      field: 'lead_data.state_name',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: "grid-cell-centered",
      flex:1,
      minWidth:150,
    },
    {
      headerName: 'City',
      field: 'lead_data.city_name',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: "grid-cell-centered",
      flex:1,
      minWidth:150,
    },
    // {
    //   headerName: 'Regional Business Head',
    //   field: 'regional_bussiness_lead_name',
    //   sortable: true,
    //   resizable: true,
    //   wrapHeaderText: true,
    //   autoHeaderHeight: true,
    //   cellClass: "grid-cell-centered",
    //   flex:1,
    //   minWidth:155,
    // },
    {
      headerName: 'Sales Person Name',
      field: 'lead_data.lead_assgn_contact_owner',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: "grid-cell-centered",
      flex:1,
      minWidth:150,
    },
    // {
    //   headerName: 'Status',
    //   field: 'status.sales_request.status',
    //   sortable: true,
    //   resizable: true,
    //   wrapHeaderText: true,
    //   autoHeaderHeight: true,
    //   cellClass: "grid-cell-centered",
    //   flex:1,
    //   minWidth:150,
    // },
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
    //   cellStyle: function (params: any) {
    //     if (params.value.toLowerCase() == 'Open'.toLowerCase()) {
    //       return { color: 'green' };
    //     }else if (params.value.toLowerCase() == 'Validated'.toLowerCase()) {
    //       return { color: 'red' };
    //     }else if (params.value.toLowerCase() == 'Assigned'.toLowerCase()) {
    //       return { color: 'blue' };
    //     } else {
    //       return { color: 'orange' };
    //     }
    //   },
    // },
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


  ];

  openDialog() {
    const dialogRef
    = this.dialog.open(UploadCsvPopupComponent, {
      width: '30%',
      // maxWidth: '100vw',
      // maxHeight: '60vh',
      // height: '60%',
      // panelClass: 'full-screen-modal',
      data: { id: this.cellValue }
    });
    }

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
  onCellClicked(e:any){
    
    const dialogRef = this.dialog.open(AppListDialogComponent,{width:'500px',data:{verifyId:e.data.candidtaes_v_Id}});
      dialogRef.afterClosed().subscribe(result => {
        
      })
  }
}
