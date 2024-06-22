import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { GridApi, GridReadyEvent } from 'ag-grid-community';
import { ToastrService } from 'ngx-toastr';
import { HrServiceService } from 'src/app/@shared/services/hr-service.service';
import { Location } from '@angular/common';
@Component({
  selector: 'app-salary-process-list',
  templateUrl: './salary-process-list.component.html',
  styleUrls: ['./salary-process-list.component.scss']
})
export class SalaryProcessListComponent {
  rowClass: any;
  private gridApi!: GridApi<any>;
  public rowData:any;
  public columnDefs = [
    {
      headerName: 'ID',
      field: 'employee_id',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: "grid-cell-centered",
      flex:1,
      minWidth:150,
    },
    {
      headerName: 'Code',
      field: 'employee_code',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: "grid-cell-centered",
      valueFormatter: 'JSON.parse(value)',
      flex:1,
      minWidth:150,
    },
    {
      headerName: 'Employee',
      field: 'first_name',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: "grid-cell-centered",
      valueFormatter: 'JSON.parse(value)',
      flex:1,
      minWidth:150,
    },
    {
      headerName: 'Department',
      field: 'department',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: "grid-cell-centered",
      valueFormatter: 'JSON.parse(value)',
      flex:1,
      minWidth:150,
    },
    // {
    //   headerName: 'Period',
    //   field: 'name',
    //   sortable: true,
    //   resizable: true,
    //   wrapHeaderText: true,
    //   autoHeaderHeight: true,
    //   cellClass: "grid-cell-centered",
    //   valueFormatter: 'JSON.parse(value)',
    //   flex:1,
    //   minWidth:150,
    // },
    // {
    //   headerName: 'Deduction',
    //   field: 'name',
    //   sortable: true,
    //   resizable: true,
    //   wrapHeaderText: true,
    //   autoHeaderHeight: true,
    //   cellClass: "grid-cell-centered",
    //   valueFormatter: 'JSON.parse(value)',
    //   flex:1,
    //   minWidth:150,
    // },
    // {
    //   headerName: 'NetPay',
    //   field: 'name',
    //   sortable: true,
    //   resizable: true,
    //   wrapHeaderText: true,
    //   autoHeaderHeight: true,
    //   cellClass: "grid-cell-centered",
    //   valueFormatter: 'JSON.parse(value)',
    //   flex:1,
    //   minWidth:150,
    // },
    // {
    //   headerName: 'TaxAmount',
    //   field: 'name',
    //   sortable: true,
    //   resizable: true,
    //   wrapHeaderText: true,
    //   autoHeaderHeight: true,
    //   cellClass: "grid-cell-centered",
    //   valueFormatter: 'JSON.parse(value)',
    //   flex:1,
    //   minWidth:150,
    // },
    // {
    //   headerName: 'TaxAmount',
    //   field: 'name',
    //   sortable: true,
    //   resizable: true,
    //   wrapHeaderText: true,
    //   autoHeaderHeight: true,
    //   cellClass: "grid-cell-centered",
    //   valueFormatter: 'JSON.parse(value)',
    //   flex:1,
    //   minWidth:150,
    // },
    // {
    //   headerName: 'Payabledays',
    //   field: 'name',
    //   sortable: true,
    //   resizable: true,
    //   wrapHeaderText: true,
    //   autoHeaderHeight: true,
    //   cellClass: "grid-cell-centered",
    //   valueFormatter: 'JSON.parse(value)',
    //   flex:1,
    //   minWidth:150,
    // },
    // {
    //   headerName: 'ProcessDate',
    //   field: 'name',
    //   sortable: true,
    //   resizable: true,
    //   wrapHeaderText: true,
    //   autoHeaderHeight: true,
    //   cellClass: "grid-cell-centered",
    //   valueFormatter: 'JSON.parse(value)',
    //   flex:1,
    //   minWidth:150,
    // },
    // {
    //   headerName: 'UnpaidLeaves',
    //   field: 'name',
    //   sortable: true,
    //   resizable: true,
    //   wrapHeaderText: true,
    //   autoHeaderHeight: true,
    //   cellClass: "grid-cell-centered",
    //   valueFormatter: 'JSON.parse(value)',
    //   flex:1,
    //   minWidth:150,
    // },
    
  ];
  depData: any;



  constructor(private route: Router,private hrServies: HrServiceService,
    private toast: ToastrService,public dialog: MatDialog,private location: Location) {
    this.rowClass = 'rowClass'
  }

  ngOnInit(): void {
    this.getAllsalaryList();

    this.hrServies.getDepList().subscribe((res: any) => {
      this.depData = res.data;
    })
  }
  goBack() {
    this.location.back();
  }
  goToAddCreate(path:any) {
    this.route.navigate([path]);
  }


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

  onFilterDepChanged(e:any) {
    this.gridApi.setQuickFilter(
     e.value
    );
  }

  getAllsalaryList (){
    this.hrServies.getAllsalaryList().subscribe((res: any) => {
      this.rowData = res.data;
    })
  }
}
