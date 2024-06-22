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
import { ActionComponent } from './action/action.component';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-suspection',
  templateUrl: './suspection.component.html',
  styleUrls: ['./suspection.component.scss']
})
export class SuspectionComponent {
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
  hidden = false;


  constructor(private emp_master: EmpMasterService,
    private router:Router,
    private toast:ToastrService,
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
    this.leadService.suspensionList().subscribe((res: any) => {
      this.rowData = res.result
      console.log(this.rowData,"rowData");
      for (let a = 0; a < this.rowData.length; a++) {
        this.rowData[a].product_request = this.rowData[a].LeadManagment.product_request

      } 
      
      let filterData=this.rowData.filter((res1:any)=>res1.stage!=="TRA")
      console.log(filterData,"filter Data");
      
           this.rowData = filterData;
           
         },
         (error)=>{
         this.toast.error("Somthing Wents Wrong.")
         })
  
  }
  toggleBadgeVisibility() {
    this.hidden = !this.hidden;
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
      headerName: 'Stage',
      field: 'stage',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: "grid-cell-centered",
      minWidth: 150,
    },
    // {
    //   headerName: 'Exceed Days',
    //   field: 'outdays_count',
    //   sortable: true,
    //   resizable: true,
    //   wrapHeaderText: true,
    //   autoHeaderHeight: true,
    //   cellClass: "grid-cell-centered",
    //   minWidth: 150,
    // },
    {
      headerName: 'Product Name',
      field: 'contact_owner',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: "grid-cell-centered",
      minWidth: 155,
    },

    // {
    //   headerName: 'State/Region',
    //   field: 'state',
    //   sortable: true,
    //   resizable: true,
    //   wrapHeaderText: true,
    //   autoHeaderHeight: true,
    //   cellClass: "grid-cell-centered",
    //   minWidth: 150,
    // },
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
    //   headerName: 'Notification Raised Date',
    //   field: 'createdAt',
    //   sortable: true,
    //   resizable: true,
    //   wrapHeaderText: true,
    //   autoHeaderHeight: true,
    //   cellClass: "grid-cell-centered",
    //   minWidth: 150,
    // },
    // {
    //   headerName: 'Status',
    //   field: 'reasonStatus',
    //   sortable: true,
    //   resizable: true,
    //   wrapHeaderText: true,
    //   autoHeaderHeight: true,
    //   cellClass: "grid-cell-centered",
    //   minWidth: 150,
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
    
    // const dialogRef = this.dialog.open(AppListDialogComponent, { width: '500px', data: { lead_id: e.data.lead_genration_id } });
    // dialogRef.afterClosed().subscribe(result => {
      
    // })
  }
  suspentionNotification(){
  
      this.router.navigate(['master/lead/existing-customer/suspection/suspention-list-notification']);
  
  
  }
}
