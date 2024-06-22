import { Component } from '@angular/core';
import {
  GridApi,
  GridReadyEvent
} from 'ag-grid-community';
import 'ag-grid-enterprise';
import { Router } from '@angular/router';
import { SalaryActionComponent } from './salary-action/salary-action.component';
import { HrServiceService } from 'src/app/@shared/services/hr-service.service';
import Swal from 'sweetalert2';
import { HttpClient } from '@angular/common/http';
import { ThemeService } from 'ng2-charts';
import { FormBuilder, FormControl } from '@angular/forms';


@Component({
  selector: 'app-employee-salary',
  templateUrl: './employee-salary.component.html',
  styleUrls: ['./employee-salary.component.scss']
})
export class EmployeeSalaryComponent {
  

    data= [
      {
          "employee_id": 1,
          "first_name": "Rajesh",
          "last_name": "Elite",
          "tatal_ctc": "1000000",
          "fixed_ctc": "1500000",
          "variable_ctc": "5 lakh",
          "componentCalculations": [
              {
                  "status": "ACTIVE",
                  "salary_structure_id": 661,
                  "emp_id": 1,
                  "amount": 600000,
                  "componentTypeid": 2,
                  "compoentCode": "DQS1",
                  "updatedAt": "2023-07-27T06:24:26.654Z",
                  "createdAt": "2023-07-27T06:24:26.654Z"
              },
              {
                  "status": "ACTIVE",
                  "salary_structure_id": 662,
                  "emp_id": 1,
                  "amount": 3000,
                  "componentTypeid": 3,
                  "compoentCode": "DQS2",
                  "updatedAt": "2023-07-27T06:24:26.761Z",
                  "createdAt": "2023-07-27T06:24:26.761Z"
              },
              {
                  "status": "ACTIVE",
                  "salary_structure_id": 663,
                  "emp_id": 1,
                  "amount": 2200,
                  "componentTypeid": 4,
                  "compoentCode": "DQS3",
                  "updatedAt": "2023-07-27T06:24:26.838Z",
                  "createdAt": "2023-07-27T06:24:26.838Z"
              },
              {
                  "status": "ACTIVE",
                  "salary_structure_id": 664,
                  "emp_id": 1,
                  "amount": 603000,
                  "componentTypeid": 5,
                  "compoentCode": "DQS4",
                  "updatedAt": "2023-07-27T06:24:26.985Z",
                  "createdAt": "2023-07-27T06:24:26.985Z"
              },
              {
                  "status": "ACTIVE",
                  "salary_structure_id": 665,
                  "emp_id": 1,
                  "amount": 600000,
                  "componentTypeid": 6,
                  "compoentCode": "DQS5",
                  "updatedAt": "2023-07-27T06:24:27.101Z",
                  "createdAt": "2023-07-27T06:24:27.101Z"
              },
              {
                  "status": "ACTIVE",
                  "salary_structure_id": 666,
                  "emp_id": 1,
                  "amount": 1805200,
                  "componentTypeid": 7,
                  "compoentCode": "DQS6",
                  "updatedAt": "2023-07-27T06:24:27.341Z",
                  "createdAt": "2023-07-27T06:24:27.341Z"
              },
              {
                  "status": "ACTIVE",
                  "salary_structure_id": 667,
                  "emp_id": 1,
                  "amount": 72000,
                  "componentTypeid": 8,
                  "compoentCode": "DQS7",
                  "updatedAt": "2023-07-27T06:24:27.446Z",
                  "createdAt": "2023-07-27T06:24:27.446Z"
              },
              {
                  "status": "ACTIVE",
                  "salary_structure_id": 668,
                  "emp_id": 1,
                  "amount": 24000,
                  "componentTypeid": 9,
                  "compoentCode": "DQS8",
                  "updatedAt": "2023-07-27T06:24:27.545Z",
                  "createdAt": "2023-07-27T06:24:27.545Z"
              },
              {
                  "status": "ACTIVE",
                  "salary_structure_id": 669,
                  "emp_id": 1,
                  "amount": 800,
                  "componentTypeid": 10,
                  "compoentCode": "DQS9",
                  "updatedAt": "2023-07-27T06:24:27.620Z",
                  "createdAt": "2023-07-27T06:24:27.620Z"
              },
              {
                  "status": "ACTIVE",
                  "salary_structure_id": 670,
                  "emp_id": 1,
                  "amount": 1902000,
                  "componentTypeid": 11,
                  "compoentCode": "DQS10",
                  "updatedAt": "2023-07-27T06:24:27.823Z",
                  "createdAt": "2023-07-27T06:24:27.823Z"
              }
          ]
      },
      {
          "employee_id": 2,
          "first_name": "MD",
          "last_name": "Singh",
          "tatal_ctc": "1100000",
          "fixed_ctc": "600000",
          "variable_ctc": null,
          "componentCalculations": [
              {
                  "status": "ACTIVE",
                  "salary_structure_id": 671,
                  "emp_id": 2,
                  "amount": 600000,
                  "componentTypeid": 2,
                  "compoentCode": "DQS1",
                  "updatedAt": "2023-07-27T06:24:27.895Z",
                  "createdAt": "2023-07-27T06:24:27.895Z"
              },
              {
                  "status": "ACTIVE",
                  "salary_structure_id": 672,
                  "emp_id": 2,
                  "amount": 3000,
                  "componentTypeid": 3,
                  "compoentCode": "DQS2",
                  "updatedAt": "2023-07-27T06:24:27.968Z",
                  "createdAt": "2023-07-27T06:24:27.968Z"
              },
              {
                  "status": "ACTIVE",
                  "salary_structure_id": 673,
                  "emp_id": 2,
                  "amount": 2200,
                  "componentTypeid": 4,
                  "compoentCode": "DQS3",
                  "updatedAt": "2023-07-27T06:24:28.043Z",
                  "createdAt": "2023-07-27T06:24:28.043Z"
              },
              {
                  "status": "ACTIVE",
                  "salary_structure_id": 674,
                  "emp_id": 2,
                  "amount": 603000,
                  "componentTypeid": 5,
                  "compoentCode": "DQS4",
                  "updatedAt": "2023-07-27T06:24:28.116Z",
                  "createdAt": "2023-07-27T06:24:28.116Z"
              },
              {
                  "status": "ACTIVE",
                  "salary_structure_id": 675,
                  "emp_id": 2,
                  "amount": 600000,
                  "componentTypeid": 6,
                  "compoentCode": "DQS5",
                  "updatedAt": "2023-07-27T06:24:28.190Z",
                  "createdAt": "2023-07-27T06:24:28.190Z"
              },
              {
                  "status": "ACTIVE",
                  "salary_structure_id": 676,
                  "emp_id": 2,
                  "amount": 1805200,
                  "componentTypeid": 7,
                  "compoentCode": "DQS6",
                  "updatedAt": "2023-07-27T06:24:28.265Z",
                  "createdAt": "2023-07-27T06:24:28.265Z"
              },
              {
                  "status": "ACTIVE",
                  "salary_structure_id": 677,
                  "emp_id": 2,
                  "amount": 72000,
                  "componentTypeid": 8,
                  "compoentCode": "DQS7",
                  "updatedAt": "2023-07-27T06:24:28.339Z",
                  "createdAt": "2023-07-27T06:24:28.339Z"
              },
              {
                  "status": "ACTIVE",
                  "salary_structure_id": 678,
                  "emp_id": 2,
                  "amount": 24000,
                  "componentTypeid": 9,
                  "compoentCode": "DQS8",
                  "updatedAt": "2023-07-27T06:24:28.413Z",
                  "createdAt": "2023-07-27T06:24:28.413Z"
              },
              {
                  "status": "ACTIVE",
                  "salary_structure_id": 679,
                  "emp_id": 2,
                  "amount": 800,
                  "componentTypeid": 10,
                  "compoentCode": "DQS9",
                  "updatedAt": "2023-07-27T06:24:28.489Z",
                  "createdAt": "2023-07-27T06:24:28.489Z"
              },
              {
                  "status": "ACTIVE",
                  "salary_structure_id": 680,
                  "emp_id": 2,
                  "amount": 1902000,
                  "componentTypeid": 11,
                  "compoentCode": "DQS10",
                  "updatedAt": "2023-07-27T06:24:28.562Z",
                  "createdAt": "2023-07-27T06:24:28.562Z"
              }
          ]
      }
    ]
    check=  [
      {headerName: 'Epmloyee Id.',field: 'employee_id', sortable: true, resizable: true, wrapHeaderText: true, autoHeaderHeight: true, cellClass: "grid-cell-centered", flex: 1, minWidth: 150,},
      {headerName: 'Employee Name', field: 'first_name', sortable: true,resizable: true,wrapHeaderText: true,autoHeaderHeight: true, cellClass: "grid-cell-centered", flex: 1,  minWidth: 150,},
      {headerName: 'Basic Salary', field: 'Basic Salary',sortable: true,resizable: true,wrapHeaderText: true,autoHeaderHeight: true,cellClass: "grid-cell-centered", flex: 1,minWidth: 150,},
      {headerName: 'HRA',field: 'HRA', sortable: true,resizable: true,wrapHeaderText: true,autoHeaderHeight: true,cellClass: "grid-cell-centered",flex: 1, minWidth: 150,},
      {headerName: 'Leave Travel',field: 'Leave Travel',sortable: true,resizable: true,wrapHeaderText: true,autoHeaderHeight: true,cellClass: "grid-cell-centered",flex: 1,minWidth: 150,},
      {headerName: 'Pf',field: 'Pf',sortable: true,resizable: true,wrapHeaderText: true,autoHeaderHeight: true,cellClass: "grid-cell-centered",flex: 1,minWidth: 150,},
      {headerName: 'Gratuity',field: 'Gratuity',sortable: true, resizable: true,wrapHeaderText: true,autoHeaderHeight: true,cellClass: "grid-cell-centered",flex: 1,minWidth: 150,},
      {headerName: 'Insurance',field: 'Insurance',sortable: true,resizable: true,wrapHeaderText: true,autoHeaderHeight: true,cellClass: "grid-cell-centered",flex: 1,minWidth: 150,},
      {headerName: 'Other Allowance',field: 'Other Allowance',sortable: true,resizable: true,wrapHeaderText: true,autoHeaderHeight: true,cellClass: "grid-cell-centered",flex: 1,minWidth: 150,},
      {headerName: 'Gross Earning',field: 'Gross Earning',sortable: true,resizable: true,wrapHeaderText: true,autoHeaderHeight: true,cellClass: "grid-cell-centered",flex: 1,minWidth: 150,},
      {headerName: 'Net Payable',field: 'Net Payable',sortable: true,resizable: true,wrapHeaderText: true,autoHeaderHeight: true,cellClass: "grid-cell-centered",flex: 1,minWidth: 150,},
      {headerName: 'Actions',field: 'employee_id', sortable: true,resizable: true,wrapHeaderText: true,autoHeaderHeight: true,flex: 1,minWidth: 150,
      cellRenderer: SalaryActionComponent,
      cellRendererParams: {className: 'mat-blue',hideRequestButton: true,hideDetailsButton: false,hideDownloadIcon: false,showCustomIcon: false,},cellClass: "grid-cell-centered",},
    ];
  
  
  
  rowClass: any;
  private gridApi!: GridApi<any>;
  public rowData = [
    {
      employee: 'employee',
      action: true,

    },

  ];
  public columnDefs = this.check
  

  datas: any[];
  myForm: any;



  constructor(private route: Router, private hrServies: HrServiceService,
    private http: HttpClient,private fb: FormBuilder,) {
    this.rowClass = 'rowClass'
    this.myForm= this.fb.group({
      bonus_date:new FormControl(null)
    })
  }

  ngOnInit() {
    this.ghetAllEmployee()
  }

  goToHolidayCreate(path: any) {
    this.route.navigate([path]);
  }


  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;


  }

  back() {
    window.history.back();
  };

  ghetAllEmployee() {
    this.hrServies.payrollAllEmp().subscribe((res:any)=>{
      this.datas=res.data
      console.log(this.datas);
      let arr: any = [];
      for(let emp of this.datas){
        let comps = emp.componentCalculations;
        let re:any = {}
        for(let comp of comps){ 
          console.log(comp,"comp");  
            re.first_name = emp.firstName,
            re.employee_id = emp.employee_id,
            // re.first_name = emp.EmployeeName,
            // re.first_name = emp.EmployeeName,
            // re.first_name = emp.EmployeeName,
            // re.employee_id = emp.employee_id,
            re[comp.componentCode] = Math.round(comp.amount)
          }
          arr.push(re)
        }
      this.rowData = arr
      console.log(arr, "arr payroll");
    })
    // this.http.get<any[]>('http://localhost:3000/data').subscribe((data) => {
      // const data=this.data
      // this.datas = data;
 
    // });

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
  verified_salary() {
    // e.stopPropagation();
    // if () {
    Swal.fire({
      title: 'Are you sure to Save this Salary Sheet?',
      icon: 'warning',
      showCancelButton: true,
      cancelButtonColor: "#f44336",
      confirmButtonColor: "#3f51b5",
      confirmButtonText: 'Yes',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.isConfirmed) {
        // const data = {
        //   course_request_status: 'NOT REQUEST',
        //   author_course_id: this.empId,
        //   employee_id: course.registered_user.employee_id 
        // };

        // this._lmsUserManagementService.sendCourseRequest(course.traning_id, data).subscribe(
        //   (res) => {
        //     
        //     this.toster.success('Request Rejected successfully')
        //     this.reloadCurrentRoute();
        //   }, (err) => {
        //     this.toster.error('Something went wrong please try again', 'Error Message');
        //   })
      }
      // else {
      //   

      // }
    });
    // }

  }
  filterDate(){
    let val=this.myForm.value;
    console.log(val,'valll');
    
  }
}
