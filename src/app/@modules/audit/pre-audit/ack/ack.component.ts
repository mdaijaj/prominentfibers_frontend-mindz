import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { GridApi, GridReadyEvent } from 'ag-grid-community';
import * as moment from 'moment';
import { ActionComponent } from 'src/app/@modules/lead/action/action.component';
import { AppListDialogComponent } from 'src/app/@shared/app-list-dialog/app-list-dialog.component';
import { EmpMasterService } from 'src/app/@shared/services/emp-master.service';
import { EmpRegistrationService } from 'src/app/@shared/services/emp-registration.service';
import { HeadService } from 'src/app/@shared/services/head.service';
import { LeadService } from 'src/app/@shared/services/lead.service';
import { RecruitService } from 'src/app/@shared/services/recruitment.service';
import { TaskOrderAppListDialogComponent } from 'src/app/@shared/task-order-app-list-dialog/task-order-app-list-dialog.component';
import { TaskOrderPdfComponent } from 'src/app/task-order-pdf/task-order-pdf.component';

@Component({
  selector: 'app-ack',
  templateUrl: './ack.component.html',
  styleUrls: ['./ack.component.scss']
})
export class AckComponent {
  private gridApi!: GridApi<any>;
  rowData: any;
  Login_user_id: any = localStorage.getItem('signInUser');
  loginUserId: any = JSON.parse(this.Login_user_id).employee_id;
  loginUserName: any = JSON.parse(this.Login_user_id).first_name;
  rowData2: any;
  rowData1: any;
  personalIdData: any;
  propertyManager: any
  text: any;
  firstLastName: any;
  rowClass: any;
  clicked: boolean = false;
  invoice: any;
  datasss: { total: number; acept: number; reject: number; pending: number; Lead_id: number; BR_Number: number; Company: string; SalesPerson: string; Status: string; ProductRequest: string; }[];
  constructor(private emp_master: EmpMasterService,
    private empService: EmpRegistrationService,
    private recruitService: RecruitService,
    private head: HeadService,
    private leadService: LeadService,
    private route: Router,
    public dialog: MatDialog,
    private activatedRoute: ActivatedRoute) {
    this.rowClass = 'rowClass'
  }

  ngOnInit(): void {
    this.dummy()
    console.log(this.route.url);
    const pathSegments = this.route.url.split('/');
    const lastSegment = pathSegments[pathSegments.length - 1];
    console.log(lastSegment);
    if (lastSegment == "task-orders") {
      this.invoice ='yes'
      console.log(this.invoice)
    }

    this.head.clicked.subscribe(data => {
      this.clicked = data;
    })
    this.leadService.getTaskOrderNew(this.loginUserId).subscribe((res: any) => {
      // this.rowData = res.data;
      if(this.rowData.code==404){
        this.rowData=res.data.code

      }
      console.log(this.rowData);
    })

  }

  dummy(){
    this.rowData=[
      {stage:'S1',total:10,acept:7,reject:2,pending:1,Lead_id:801,BR_Number:50254619,Company:"HCL Pvt",SalesPerson:"Vrajesh",Status:"Task Order",ProductRequest:"ISO 9001,ISO 45001"},
      {stage:'CA1',total:20,acept:20,reject:0,pending:0,Lead_id:802,BR_Number:50254621,Company:"TCS Pvt",SalesPerson:"RAm",Status:"Task Order",ProductRequest:"ISO 9001,ISO 45001"},
      {stage:'S2',total:14,acept:7,reject:0,pending:7,Lead_id:995,BR_Number:50254622,Company:"Wipro Pvt",SalesPerson:"Kavveer",Status:"Task Order",ProductRequest:"ISO 9001,ISO 45001"},
      {stage:'CA2',total:17,acept:10,reject:3,pending:4,Lead_id:457,BR_Number:50254645,Company:"DQS Pvt",SalesPerson:"Shyam",Status:"Task Order",ProductRequest:"ISO 9001,ISO 45001"},
      {stage:'TRA',total:4,acept:4,reject:0,pending:0,Lead_id:789,BR_Number:50254648,Company:"Wlite Mindz Pvt",SalesPerson:"Rohan",Status:"Task Order",ProductRequest:"ISO 9001,ISO 45001"},
      {stage:'S1',total:10,acept:3,reject:0,pending:7,Lead_id:456,BR_Number:50254687,Company:"Raimond Pvt",SalesPerson:"Lucky",Status:"Task Order",ProductRequest:"ISO 9001,ISO 45001"},
    ]
  }

  public columnDefs = [
    {
      headerName: 'Lead Id',
      field: 'Lead_id',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: "grid-cell-centered",
      flex: 1,
      minWidth: 150,
    },
    // {
    //   headerName: 'Customer Type',
    //   field: 'customer_type',
    //   sortable: true,
    //   resizable: true,
    //   wrapHeaderText: true,
    //   autoHeaderHeight: true,
    //   cellClass: "grid-cell-centered",
    //   flex: 1,
    //   minWidth: 150,
    // },
    // {
    //   headerName: 'Task Order',
    //   field: 'TaskOrderId',
    //   sortable: true,
    //   resizable: true,
    //   wrapHeaderText: true,
    //   autoHeaderHeight: true,
    //   cellClass: "grid-cell-centered",
    //   flex: 1,
    //   minWidth: 150,
    // },
    {
      headerName: 'BR Number',
      field: 'BR_Number',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: "grid-cell-centered",
      flex: 1,
      minWidth: 150,
    },
    {
      headerName: 'Associated Company',
      field: 'Company',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: "grid-cell-centered",
      flex: 1,
      minWidth: 150,
    },
    {
      headerName: 'Stage',
      field: 'stage',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: "grid-cell-centered",
      flex: 1,
      minWidth: 150,
    },
 
    {
      headerName: 'Total (Task Order)',
      field: 'total',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: "grid-cell-centered",
      flex: 1,
      minWidth: 155,
      cellStyle: function (params: any) {
        if (params.value || params.value==0) {
          return { color: 'blue' };
      }
      
    }
  },
    {
      headerName: 'Pending (Task Order)',
      field: 'pending',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: "grid-cell-centered",
      flex: 1,
      minWidth: 155,
      cellStyle: function (params: any) {
        if (params.value  || params.value==0) {
          return { color: 'orange' };
      }
      
     
    },
  },
    {
      headerName: 'Accept (Task Order)',
      field: 'acept',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: "grid-cell-centered",
      flex: 1,
      minWidth: 155,
      cellStyle: function (params: any) {
        if (params.value  || params.value==0) {
          return { color: 'green' };
      }
      
     
    },
    
    },
    {
      headerName: 'Reject (Task Order)',
      field: 'reject',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: "grid-cell-centered",
      flex: 1,
      minWidth: 155,
      cellStyle: function (params: any) {
        if (params.value  || params.value==0) {
          return { color: 'red' };
      }
      
     
    },
   
    },
    // {
    //   headerName: 'DQS Contact Source',
    //   field: 'dqs_contact_source',
    //   sortable: true,
    //   resizable: true,
    //   wrapHeaderText: true,
    //   autoHeaderHeight: true,
    //   cellClass: "grid-cell-centered",
    //   flex: 1,
    //   minWidth: 150,
    // },
    // {
    //   headerName: 'Customer Sales Executive',
    //   field: 'customer_sales_executive',
    //   sortable: true,
    //   resizable: true,
    //   wrapHeaderText: true,
    //   autoHeaderHeight: true,
    //   cellClass: "grid-cell-centered",
    //   flex: 1,
    //   minWidth: 158,
    // },
    // {
    //   headerName: 'Opportunity Type',
    //   field: 'opportunity_type',
    //   sortable: true,
    //   resizable: true,
    //   wrapHeaderText: true,
    //   autoHeaderHeight: true,
    //   cellClass: "grid-cell-centered",
    //   flex: 1,
    //   minWidth: 150,
    // },
    {
      headerName: 'Contact Person',
      field: 'SalesPerson',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: "grid-cell-centered",
      flex: 1,
      minWidth: 155,
    },
    {
      headerName: 'Product Request',
      field: 'ProductRequest',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: "grid-cell-centered",
      flex: 1,
      minWidth: 150,
    },
    // {
    //   headerName: 'State/Region',
    //   field: 'state_name',
    //   sortable: true,
    //   resizable: true,
    //   wrapHeaderText: true,
    //   autoHeaderHeight: true,
    //   cellClass: "grid-cell-centered",
    //   flex: 1,
    //   minWidth: 150,
    // },
    // {
    //   headerName: 'Sales Person Name',
    //   field: 'contact_owner',
    //   sortable: true,
    //   resizable: true,
    //   wrapHeaderText: true,
    //   autoHeaderHeight: true,
    //   flex: 1,
    //   minWidth: 150,
    // },
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
      field: 'Status',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: "grid-cell-centered",
      flex: 1,
      minWidth: 150,
      cellStyle: function (params: any) {
        if (params.value.toLowerCase() == 'Work Order Created'.toLowerCase()) {
          return { color: 'green' };
        } else if (params.value.toLowerCase() == 'Blocked Auditor'.toLowerCase()) {
          return { color: 'blue' };
        } else {
          return { color: 'orange' };
        }
      },
    },
    {
      headerName: 'Action',
      field: 'lead_genration_id',
      flex: 1,
      minWidth: 300,
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
  onCellClicked(e: any) {

    const dialogRef = this.dialog.open(TaskOrderAppListDialogComponent, { width: '500px', data: { lead_id: e.data.lead_genration_id } });
    dialogRef.afterClosed().subscribe(result => {

    })
  }

  getCurrentRoute(): string {
    return this.activatedRoute.snapshot.url.map(s => s.path).join('/')
  }

  dialogforTO(e:any){
  
    e.stopPropagation()
      // this.route.navigate(['master/lms/lms-home/mangement-user/my-courses'])
      const dialogRef = this.dialog.open(TaskOrderPdfComponent,{
        height: '100vh',
        panelClass: 'dialog-content'
      });
      dialogRef.afterClosed().subscribe(result => { 
        console.log(`Dialog result: ${result}`);
      });
  }
}

