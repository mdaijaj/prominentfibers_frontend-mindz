import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { GridApi, GridReadyEvent } from 'ag-grid-community';
import * as moment from 'moment';
import { EmpRegistrationService } from 'src/app/@shared/services/emp-registration.service';
import { LmsServiceService } from 'src/app/@shared/services/lms-service.service';
import { ActionComponent } from './action/action.component';
import { DepartmentBudgetService } from 'src/app/@shared/services/department-budget.service';
import { ToastrService } from 'ngx-toastr';
import { TrainingViewComponent } from 'src/app/@modules/purchase-main/purchase-inventory/department-budget/training-view/training-view.component';
@Component({
  selector: 'app-department-budget',
  templateUrl: './department-budget.component.html',
  styleUrls: ['./department-budget.component.scss']
})
export class DepartmentBudgetComponent {
  data= [
    {
        "dept_id": 1,
        "department_name": "it networks2",
        "job_code": null,
        "from_date": "31/01/2022",
        "to_date": "1/12/2022",
        "budget_amount": "50000",
        "status": "ACTIVE",
        "createdAt": "2023-06-03T08:46:03.000Z",
        "updatedAt": "2023-08-02T08:54:02.000Z"
    },
    {
        "dept_id": 2,
        "department_name": "Competence Management",
        "job_code": null,
        "from_date": null,
        "to_date": null,
        "budget_amount": null,
        "status": "ACTIVE",
        "createdAt": "2023-06-03T08:46:34.000Z",
        "updatedAt": "2023-06-17T10:57:03.000Z"
    },
    {
        "dept_id": 3,
        "department_name": "Sales & Business Management",
        "job_code": null,
        "from_date": null,
        "to_date": null,
        "budget_amount": null,
        "status": "ACTIVE",
        "createdAt": "2023-06-03T08:46:57.000Z",
        "updatedAt": "2023-07-06T10:20:56.000Z"
    },
    {
        "dept_id": 4,
        "department_name": "A&CS (Accreditation & Certification Service)",
        "job_code": null,
        "from_date": null,
        "to_date": null,
        "budget_amount": null,
        "status": "ACTIVE",
        "createdAt": "2023-06-03T08:47:27.000Z",
        "updatedAt": "2023-06-17T10:57:32.000Z"
    },
  ]
  rowClass: any;
  private gridApi!: GridApi<any>;
  rowData: any;
  getData: any
  getFormData: any
  public cellValue: any;
  printsend: boolean;
  Login_user_id: any = localStorage.getItem('EmpMainId');


  constructor(private _empService: EmpRegistrationService,
    public dialog: MatDialog,
    private route: Router,
    private toast:ToastrService,
    private department_budget:DepartmentBudgetService,
  ) {
    this.rowClass = 'rowClass'

  }
  ngOnInit(): void {
    localStorage.setItem("employee_id:", "undefined");
    this.getAll()
  }

  getAll() {
      // this.rowData = this.data;

    this.department_budget.getDepartment_budget().subscribe((res: any) => {
      let modifyData=res.data
      for(let a=0;a<res.data.length;a++){
        if(res.data[a].budget_approved_by==null){
          res.data[a].budget_approved_by="-"
        }
        if(res.data[a].to_date==null){
          res.data[a].to_date="-"
        }
        if(res.data[a].from_date==null){
          res.data[a].from_date="-"
        }
        if(res.data[a].budget_amount==null){
          res.data[a].budget_amount="-"
        }

      }
      this.rowData = res.data;

      console.log(this.rowData,"row data"); 
    },
    (error) => {
      this.toast.error("Somthing wents wrong");
      
    })
  }


  public columnDefs = [
    {
      headerName: 'Sr. No',
      field: 'dept_id',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: "grid-cell-centered",
      flex: 1,
      minWidth: 150
    },


    {
      headerName: 'Department',
      field: 'department_name',
      sortable: true,
      columnNo: "1",
      minWidth: 150,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: "grid-cell-centered",
      flex: 1
      // cellRenderer: this.customCellRendererFunc   
    },
 
    {
      headerName: 'Session From',
      field: 'from_date', sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: "grid-cell-centered",
      // cellRenderer: this.customCellRendererFunc   
    },

    
    {
      headerName: 'Session To',
      field: 'to_date',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: "grid-cell-centered",
      flex: 1,
      minWidth: 150
    },
    {
      headerName: 'Budget Amount',
      field: 'budget_amount',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: "grid-cell-centered",
      flex: 1,
      minWidth: 150
    },
    {
      headerName: 'Budget Approved by',
      field: 'budget_approved_by',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: "grid-cell-centered",
      flex: 1,
      minWidth: 150
    },
    {
      headerName: 'Action Button',
   
      field: 'create_user_status',
      flex: 1,
      
      cellRenderer: ActionComponent,
      cellRendererParams: {
        className: 'mat-blue',
        hideRequestButton: true,
        hideDetailsButton: false,
        hideDownloadIcon: false,
        showCustomIcon: false, // Hide attachment icon
        clicked: function (field: any) {
          alert(`${field} was clicked`);

        },

      },
      cellClass: "grid-cell-centered"
    }
  ];
  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;
    
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
  onCellClicked(e: any) {
    
    const dialogRef = this.dialog.open(TrainingViewComponent, { width: '500px', data: { id: e.data.traning_id } });
    dialogRef.afterClosed().subscribe(result => {
      
    })
  }
  print() {
    this.printsend = true;
    setTimeout(() => {
      this.printsend = false;

    }, -999999999);



  }

}

