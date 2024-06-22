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
  selector: 'app-task-order',
  templateUrl: './task-order.component.html',
  styleUrls: ['./task-order.component.scss']
})
export class TaskOrderListComponent {
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
  invoice: any;
  Login_user_id: any = localStorage.getItem('signInUser');
  loginUserId: any = JSON.parse(this.Login_user_id).employee_id;
  loginUserName: any = JSON.parse(this.Login_user_id).first_name;
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
      this.rowData = res.data;
      if(this.rowData.code==404){
        this.rowData=res.data.code

      }
      console.log(this.rowData);
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
      flex: 1,
      minWidth: 150,
    },
    {
      headerName: 'Customer Type',
      field: 'lead_managment.customer_type',
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
      headerName: 'BR Number',
      field: 'lead_managment.br_number',
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
      field: 'lead_managment.associated_company',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: "grid-cell-centered",
      flex: 1,
      minWidth: 150,
    },
    {
      headerName: 'Associated Contact Person',
      field: 'lead_managment.first_name',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: "grid-cell-centered",
      flex: 1,
      minWidth: 155,
    },
    {
      headerName: 'DQS Contact Source',
      field: 'lead_managment.dqs_contact_source',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: "grid-cell-centered",
      flex: 1,
      minWidth: 150,
    },
    {
      headerName: 'Customer Sales Executive',
      field: 'lead_managment.customer_sales_executive',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: "grid-cell-centered",
      flex: 1,
      minWidth: 158,
    },
    {
      headerName: 'Opportunity Type',
      field: 'lead_managment.opportunity_type',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: "grid-cell-centered",
      flex: 1,
      minWidth: 150,
    },
    {
      headerName: 'Product Request',
      field: 'lead_managment.product_request',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: "grid-cell-centered",
      flex: 1,
      minWidth: 150,
    },
    {
      headerName: 'State/Region',
      field: 'lead_managment.state_name',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: "grid-cell-centered",
      flex: 1,
      minWidth: 150,
    },
    {
      headerName: 'Sales Person Name',
      field: 'lead_managment.contact_owner',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      flex: 1,
      minWidth: 150,
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
      field: 'lead_managment.status',
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
    // console.log(e,"check for test");
    const data={
      lead_genration_id: e.data.lead_genration_id,
      stage: e.data.stage,
      workOrdercomponentId: e.data.workOrdercomponentId,
      Employee_id:this.loginUserId
    }
    console.log(data,"checkkkkkkk");

     this.leadService.getTaskOrderDetails(data).subscribe((res: any) => {
      this.rowData1 = res.data;
      console.log(this.rowData1,"rowData");
    })
    
    const dialogRef = this.dialog.open(TaskOrderAppListDialogComponent, { width: '500px', data: { lead_id: e.data.lead_genration_id,data } });
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

