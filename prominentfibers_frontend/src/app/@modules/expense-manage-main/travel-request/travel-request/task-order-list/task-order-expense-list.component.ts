import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { GridApi, GridReadyEvent } from 'ag-grid-community';
import * as moment from 'moment';
import { AppListDialogComponent } from 'src/app/@shared/app-list-dialog/app-list-dialog.component';
import { EmpMasterService } from 'src/app/@shared/services/emp-master.service';
import { EmpRegistrationService } from 'src/app/@shared/services/emp-registration.service';
import { HeadService } from 'src/app/@shared/services/head.service';
import { LeadService } from 'src/app/@shared/services/lead.service';
import { RecruitService } from 'src/app/@shared/services/recruitment.service';
import { ActionsComponent } from '../actions/actions.component';
import { ItticketingService } from 'src/app/@shared/services/itticketing.service';
import { MyExpenseEditDialogComponent } from '../../../expense-management/my-expenses/my-expense-edit-dialog/my-expense-edit-dialog.component';
@Component({
  selector: 'app-task-order-expense-list',
  templateUrl: './task-order-expense-list.component.html',
  styleUrls: ['./task-order-expense-list.component.scss']
})
export class TaskOrderExpenseListComponent {
  private gridApi!: GridApi<any>;
  rowData:any;
  Login_user_id: any = localStorage.getItem('signInUser');
  loginUserId: any = JSON.parse(this.Login_user_id).employee_id;
  loginUserName: any = JSON.parse(this.Login_user_id).first_name;
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
  travelNonBillable: boolean = false;
  constructor(private emp_master:EmpMasterService, private activeroute: ActivatedRoute,
    private empService : EmpRegistrationService, public route: Router,
    private recruitService: RecruitService,private head:HeadService,
    private _itteketService: ItticketingService,
    private leadService: LeadService,
    private router:ActivatedRoute,
    public dialog: MatDialog) {
      this.rowClass = 'rowClass'
     }

  ngOnInit(): void {
  
   this.head.clicked.subscribe(data=>{
    this.clicked = data;
  })
  this.activeroute.queryParams.subscribe(params => {
    this.id = params;
    this.lead_id = this.id.expense_create;
    
    if (this.lead_id === "expense-create" ) {
      
    } else if (this.lead_id === "travel-create" ) {
      
      this.travelNonBillable = true;
    }
  });
// this.empId=localStorage.getItem('EmpMainId');

  this.getListExpense();
  }
  getListExpense(){
    // this._itteketService.getTaskOrder().subscribe((res:any) => {
    //   this.rowData=res.result;
      
    // })

    this.leadService.getTaskOrderNew(this.loginUserId).subscribe((res:any) => {

      console.log(this.rowData);
      const rowArray=[];
  for(let i=0;i<=res.data.length;i++){
rowArray.push(res.data[i]?.lead_managment)

  }
  console.log(rowArray,'rowArray');
  this.rowData = rowArray;
  
    })
  }

  openCreate() {
    this.route.navigate(['master/expense-main/expense-managment/travel-request/my-expenses/create-expense']);
  }

  openCreateTravel() {
    this.route.navigate(['master/expense-main/travel-request/travel-request/create-request']);
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
      // minWidth:150,
    },
    {
      headerName: 'Task Order No',
      field: 'TaskOrder_No',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: "grid-cell-centered",
      flex: 1,
    },
    {
      headerName: 'Task Order Category',
      field: 'task_order_category',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: "grid-cell-centered",
      flex: 1,
    },
    {
      headerName: 'Associated Company',
      field: 'associated_company',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: "grid-cell-centered",
      flex: 1,
    },
    {
      headerName: 'BR Number',
      field: 'br_number',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: "grid-cell-centered",
      flex: 1,
    },
    
    {
      headerName: 'Street Address',
      field: 'street_address',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: "grid-cell-centered",
      flex: 1,
    },
    {
      headerName: 'Additional Address',
      field: 'address2',    
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: "grid-cell-centered",
      flex: 1,
    },
    // {
    //   headerName: 'Audit Start Date',
    //   field: 'training_start_date',
    //   sortable: true,
    //   resizable: true,
    //   wrapHeaderText: true,
    //   autoHeaderHeight: true,
    //   cellClass: "grid-cell-centered"
    // },
    // {
    //   headerName: 'Audit End Date',
    //   field: 'training_end_date',
    //   sortable: true,
    //   resizable: true,
    //   wrapHeaderText: true,
    //   autoHeaderHeight: true,
    //   cellClass: "grid-cell-centered"
    // },
    {
      headerName: 'Action',
      field: 'lead_genration_id',
      cellRenderer: ActionsComponent,
      cellRendererParams: {
        className: 'mat-blue',
        hideRequestButton: true,
        hideDetailsButton: false,
        hideDownloadIcon: false,
        showCustomIcon: false, // Hide attachment icon
      },
      cellClass: "grid-cell-centered",
      flex: 1,
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
    
    const dialogRef = this.dialog.open(MyExpenseEditDialogComponent,{width:'40%',data:{lead_id:e.data.lead_genration_id}});
      dialogRef.afterClosed().subscribe(result => {
        
      })
  }
//   getByMenuAccess(){
//     let empId=localStorage.getItem('MyEmpId');
// 

//     this.leadService.getbyRoleAssign(empId).subscribe((res:any)=>{
//       this.menuAccessData=res;
//       
      
//     })
//   }
}
