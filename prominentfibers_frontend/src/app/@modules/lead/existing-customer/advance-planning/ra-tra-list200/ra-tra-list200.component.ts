import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { GridApi, GridReadyEvent } from 'ag-grid-community';
import * as moment from 'moment';
import { AppListDialogComponent } from 'src/app/@shared/app-list-dialog/app-list-dialog.component';
import { HeadService } from 'src/app/@shared/services/head.service';
import { LeadService } from 'src/app/@shared/services/lead.service';
import { Router } from '@angular/router';
import { ActionComponent } from '../action/action.component';
import { log } from 'console';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
@Component({
  selector: 'app-ra-tra-list200',
  templateUrl: './ra-tra-list200.component.html',
  styleUrls: ['./ra-tra-list200.component.scss']
})
export class RATRALIST200Component {
  private gridApi!: GridApi<any>;
  rowData: any;
  rowClass: any;
  clicked: boolean = false;
  modiData: any;
  notificationData: any;
  Login_user_id: any = localStorage.getItem('signInUser');
  loginUserId: any = JSON.parse(this.Login_user_id).employee_id
  loginUserName: any = JSON.parse(this.Login_user_id).first_name
  DateForm: any;
  fromDate: any;
  toDate: any;
  filteredData: any;
  rowData12: any;

  constructor(private head: HeadService,
    private fb: FormBuilder,
    private leadService: LeadService,
    public dialog: MatDialog) {
    this.rowClass = 'rowClass';
    this.DateForm = this.fb.group({
      fromDate: new FormControl('', Validators.required),
      toDate: new FormControl('', Validators.required),
    });
  }
  date() {
    console.log(this.DateForm.value);

  }
  ngOnInit(): void {
    this.getFirstData()
    //getbystatus_lead_management
    console.log("Advance Planning");

    // setTimeout(() => {
    // console.log(this.modiData, "this.modiData");
    // console.log(this.notificationData, "notifyData");
    // const ConcatArrayData = (this.modiData).concat(this.notificationData);
    // this.rowData = ConcatArrayData
    // for (let a = 0; a < this.rowData.length; a++) {
    //   this.rowData[a].forCSP2 = "csp2"
    //   this.rowData = ConcatArrayData
    // }


    // }, 3000);
  }


  public columnDefs = [
    {
      headerName: 'Lead ID',
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
      field: 'ProductNames',
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
      minWidth: 150,
    },
    // {
    //   headerName: 'Remaining Count',
    //   field: 'remaining_count',
    //   sortable: true,
    //   resizable: true,
    //   wrapHeaderText: true,
    //   autoHeaderHeight: true,
    //   cellClass: "grid-cell-centered",
    //   minWidth: 150,
    // },
    {
      headerName: 'Notification by',
      field: 'hight_authority_comments',
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
        showCustomIcon: false,
      },
      cellClass: "grid-cell-centered"
    }

  ];

  getFirstData() {
    this.leadService.getVerifiedDqsData().subscribe((res: any) => {
      let data: any = []
      for (let a = 0; a < res.result.length; a++) {
        console.log(res.result[a].remaining_count, "r count");
        if (res.result[a].remaining_count <= 200 && res.result[a].remaining_count >= 181 && res.result[a].userId == 'loginUserId') {
          res.result[a].for_csp = "csp";
          res.result[a].hight_authority_comments = "Auto Generate";
        }
      }
      let modifyData = (res.result).filter((modi: any) => modi.remaining_count <= 200 && modi.remaining_count >= 181 || modi.RA_TRA_LIST == "UPDATED");
      this.modiData = modifyData//1st
      console.log("All RA TRA Data Getting", this.modiData);
      this.getSecondData();
    })
  }

  getSecondData() {
    this.leadService.getNotificationData(this.loginUserId).subscribe((res: any) => {
      for (let a = 0; a < res.result.length; a++) {
        res.result[a].state_name = res.result[a].LeadManagment.state_name
        res.result[a].associated_company = res.result[a].LeadManagment.associated_company
        res.result[a].product_request = res.result[a].LeadManagment.product_request
        res.result[a].for_csp = "csp";
      };
      let rowData1 = [...this.modiData, ...res.result]
      for (let a = 0; a < rowData1.length; a++) {
        rowData1[a].forCSP2 = "csp2"
        this.rowData = rowData1;
        console.log(this.rowData,"rowData"); 
        if(this.rowData[a].suspension_list!=="Suspense"){
          this.rowData12 = this.rowData
        }
      }
      var productName = this.rowData.map((item: any) => item.product_request);
      console.log(this.rowData, productName, "kjkjkjkj");
      for (let a = 0; a < this.rowData.length; a++) {
        this.rowData[a].ProductNames = productName[a]
      }
    })
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
  onCellClicked(e: any) {

    const dialogRef = this.dialog.open(AppListDialogComponent, { width: '500px', data: { lead_id: e.data.lead_genration_id } });
    dialogRef.afterClosed().subscribe(result => {

    })
  }
  date1(e: any) {
    const myDate = new Date(e.value);
    const timestamp = myDate.getTime();
    this.fromDate = timestamp
  }
  date2(e: any) {
    const myDate = new Date(e.value);
    const timestamp = myDate.getTime();
    this.toDate = timestamp
    setTimeout(() => {
      console.log(this.fromDate, ' fromDate');
      console.log(this.toDate, ' toDate');
      let filterData: any = []
      this.rowData12.map((data: any) => {
        let a: any = new Date(data.training_end_date);
        let onDate = a.getTime();
        if (this.fromDate <= onDate && this.toDate >= onDate) {
          filterData.push(data)
        }
      })
      this.rowData = filterData
      console.log(filterData);
    }, 500);
  }
}
