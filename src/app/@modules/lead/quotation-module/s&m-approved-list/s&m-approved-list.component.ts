import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { GridApi, GridReadyEvent } from 'ag-grid-community';
import * as moment from 'moment';
import { AppListDialogComponent } from 'src/app/@shared/app-list-dialog/app-list-dialog.component';
import { EmpMasterService } from 'src/app/@shared/services/emp-master.service';
import { EmpRegistrationService } from 'src/app/@shared/services/emp-registration.service';
import { HeadService } from 'src/app/@shared/services/head.service';
import { LeadService } from 'src/app/@shared/services/lead.service';
import { RecruitService } from 'src/app/@shared/services/recruitment.service';
import { ActionComponent } from '../../action/action.component';

@Component({
  selector: 'app-s&m-approved',
  templateUrl: './s&m-approved-list.component.html',
  styleUrls: ['./s&m-approved-list.component.scss']
})
export class SMApprovedListComponent {
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
  mainId: any;
  constructor(private emp_master:EmpMasterService,
    private empService : EmpRegistrationService,
    private recruitService: RecruitService,private head:HeadService,
    private leadService: LeadService, private route: Router,
    public dialog: MatDialog) {
      this.rowClass = 'rowClass'
     }

  ngOnInit(): void {
    this.rowData='no Data'
   this.head.clicked.subscribe(data=>{
    this.clicked = data;
  })
  // this.leadService.getSMApproved().subscribe((res:any) => {
    
  //   this.rowData = res.result;
  // })  
let id:any=localStorage.getItem("signInUser");
var id2=JSON.parse(id)
console.log(id);
  this.mainId=id2.employee_id
  console.log(this.mainId,'this.mainId');
  
  this.leadService.getAllSmApprovedNew(this.mainId).subscribe((res:any) => {
    
    this.rowData = res.result;
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
      headerName: 'Customer Type',
      field: 'customer_type',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: "grid-cell-centered",
      flex:1,
      minWidth:150,
    },
    {
      headerName: 'Opportunity Ref No',
      field: 'OpportunityRef_no',
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
      headerName: 'DQS Contact Source',
      field: 'dqs_contact_source',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: "grid-cell-centered",
      flex:1,
      minWidth:150,
    },
    {
      headerName: 'Customer Sales Executive',
      field: 'customer_sales_executive',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: "grid-cell-centered",
      flex:1,
      minWidth:158,
    },
    {
      headerName: 'Opportunity Type',
      field: 'opportunity_type',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: "grid-cell-centered",
      flex:1,
      minWidth:150,
    },
    {
      headerName: 'Product Request',
      field: 'product_request',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: "grid-cell-centered",
      flex:1,
      minWidth:150,
    },
    {
      headerName: 'State/Region',
      field: 'state_name',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: "grid-cell-centered",
      flex:1,
      minWidth:150,
    },
    {
      headerName: 'Sales Person Name',
      field: 'contact_owner',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      flex:1,
      minWidth:150,
    },
    // {
    //   headerName: 'No. of Mandays',
    //   field: 'region',
    //   sortable: true,
    //   resizable: true,
    //   wrapHeaderText: true,
    //   autoHeaderHeight: true,
    //   cellClass: "grid-cell-centered",
    //   flex:1,
    //   minWidth:150,
    // },
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
      cellStyle: function (params: any) {
        if (params.value.toLowerCase() == 'Open'.toLowerCase()) {
          return { color: 'green' };
        }else if (params.value.toLowerCase() == 'Validated'.toLowerCase()) {
          return { color: 'red' };
        }else if (params.value.toLowerCase() == 'Assigned'.toLowerCase()) {
          return { color: 'blue' };
        }else if (params.value.toLowerCase() == 'Prospect'.toLowerCase()) {
          return { color: 'yellow' };
        }else if (params.value.toLowerCase() == 'Account'.toLowerCase()) {
          return { color: 'violet' };
        }else if (params.value.toLowerCase() == 'Opportunity'.toLowerCase()) {
          return { color: 'blue' };
        }else if (params.value.toLowerCase() == 'Pre L1'.toLowerCase()) {
          return { color: 'green' };
        }else if (params.value.toLowerCase() == 'Pre L2'.toLowerCase()) {
          return { color: 'red' };
        }else if (params.value.toLowerCase() == 'Quotation'.toLowerCase()) {
          return { color: 'blue' };
        } else {
          return { color: 'orange' };
        }
      },
    },
    {
      headerName: 'Action',
      field: 'lead_genration_id',
      flex:1,
      minWidth:260,
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
    
    const dialogRef = this.dialog.open(AppListDialogComponent,{width:'500px',data:{lead_id:e.data.lead_genration_id}});
      dialogRef.afterClosed().subscribe(result => {
        
      })
  }
}
