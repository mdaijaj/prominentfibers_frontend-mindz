import { Component } from '@angular/core';
import { ActionsComponent } from '../../travel-request/actions/actions.component';
import { EmpMasterService } from 'src/app/@shared/services/emp-master.service';
import { ActivatedRoute, Router } from '@angular/router';
import { EmpRegistrationService } from 'src/app/@shared/services/emp-registration.service';
import { RecruitService } from 'src/app/@shared/services/recruitment.service';
import { ItticketingService } from 'src/app/@shared/services/itticketing.service';
import { HeadService } from 'src/app/@shared/services/head.service';
import { LeadService } from 'src/app/@shared/services/lead.service';
import { MatDialog } from '@angular/material/dialog';
import { GridApi, GridReadyEvent } from 'ag-grid-community';
import * as moment from 'moment';

import { MyExpenseEditDialogComponent } from '../../my-expenses/my-expense-edit-dialog/my-expense-edit-dialog.component';
@Component({
  selector: 'app-posted-list',
  templateUrl: './posted-list.component.html',
  styleUrls: ['./posted-list.component.scss']
})
export class PostedListComponent {
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
  menuAccessData: any;
  employId: string | null;
  userId: any;
  assignById: any;
  constructor(private emp_master:EmpMasterService, private activeroute: ActivatedRoute,
    private empService : EmpRegistrationService, public route: Router,
    private recruitService: RecruitService,private head:HeadService,
    private _itteketService: ItticketingService,
    private leadService: LeadService,
    public dialog: MatDialog) {
      this.rowClass = 'rowClass'
     }

  ngOnInit(): void {
   
   this.head.clicked.subscribe(data=>{
    this.clicked = data;
  })
  this.activeroute.queryParams.subscribe(params => {
    this.id = params;
    
    this.lead_id = this.id.lead_id;
  });
  this.getListExpense();
  }
  // getListExpense(){
  //   this._itteketService.getExpensePosted().subscribe((res:any)=>{
  //     
  //     this.rowData=res.result;
  //     
      
  //   })
  // }
  getListExpense(){
      this._itteketService.getExpenseProcessing().subscribe((res:any)=>{
        
        // this.rowData=res.result.reverse();
        console.log(res,'ressssss');
        const rowArray = [];
        for (let a = 0; a < res.result.length; a++) {
          const currentItem = res.result[a];
          if (currentItem?.expense_type === "Non-Billable" && currentItem?.status === "Processing") {
            // Exclude this item
          } else {
            // Include all other items
            rowArray.push(currentItem);
          }
        }
        
        console.log(rowArray, 'rowArray');
        this.rowData = rowArray.reverse();
        
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
      headerName: 'S.No',
      field: 'myexpense_id',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: "grid-cell-centered",
      flex:1
    },
    {
      headerName: 'Expense Name',
      field: 'expense_name',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: "grid-cell-centered",
      flex:1
    },
    {
      headerName: 'Expense Report No',
      field: 'expense_report_no',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: "grid-cell-centered",
      flex:1
    },
    {
      headerName: 'Expense Type',
      field: 'expense_type',    
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: "grid-cell-centered",
      flex:1
    },
    {
      headerName: 'Task Order',
      field: 'task_order',    
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: "grid-cell-centered",
      flex:1
    },
    {
      headerName: 'Create Date',
      field: 'createdAt',
      valueFormatter: function(params: any) {
        return moment(params.value).format('DD/MM/YYYY');
      },
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: "grid-cell-centered",
      flex:1
    },
    {
      headerName: 'Expense Description',
      field: 'expense_desc',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: "grid-cell-centered",
      flex:1
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
      cellStyle: function (params: any) {
        if (params.value.toLowerCase() == 'Posted'.toLowerCase()) {
            return { color: '#7B3F00' };
          }
        },
    },
    {
      headerName: 'Action',
      field: 'myexpense_id',
      cellRenderer: ActionsComponent,
      cellRendererParams: {
        className: 'mat-blue',
        hideRequestButton: true,
        hideDetailsButton: false,
        hideDownloadIcon: false,
        showCustomIcon: false, // Hide attachment icon
      },
      cellClass: "grid-cell-centered",
      flex:1
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
    console.log(e,'eeeee paid');
    
    const dialogRef = this.dialog.open(MyExpenseEditDialogComponent,{width:'500px',data:{myexpense_id_copy:e.data.myexpense_id}});
      dialogRef.afterClosed().subscribe(result => {
        
      })
  }

}
