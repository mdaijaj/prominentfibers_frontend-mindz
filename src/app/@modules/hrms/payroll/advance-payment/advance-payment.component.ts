import { Component } from '@angular/core';
import {
  GridApi,
  GridReadyEvent
} from 'ag-grid-community';
import 'ag-grid-enterprise';
import { ActivatedRoute, Router } from '@angular/router';
import { HrServiceService } from 'src/app/@shared/services/hr-service.service';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ThemeService } from 'ng2-charts';
import { EmployeeBonusActionComponent } from '../bonus/employee-bonus/employee-bonus-action/employee-bonus-action.component';
import { EmpBonusDilogComponent } from '../bonus/employee-bonus/emp-bonus-dilog/emp-bonus-dilog.component';
import { ActionComponent } from './action/action.component';
import { DialogComponent } from './dialog/dialog.component';
@Component({
  selector: 'app-advance-payment',
  templateUrl: './advance-payment.component.html',
  styleUrls: ['./advance-payment.component.scss']
})
export class AdvancePaymentComponent {
  rowClass: any;
  private gridApi!: GridApi<any>;
  public rowData:any;
  public columnDefs = [
    {
      headerName: 'Sr No.',
      field: 'advance_payment_id',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: "grid-cell-centered",
      flex:1,
      minWidth:150,
    },
    {
      headerName: 'Employee Name',
      field: 'employee_name',
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
      headerName: 'Employee Code',
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
      headerName: 'Advance Payment Amount',
      field: 'advance_amount',
       sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: "grid-cell-centered",
      flex:1,
      minWidth:150,
    },
    {
      headerName: 'Installment Month',
      field: 'monthName',
       sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: "grid-cell-centered",
      flex:1,
      minWidth:150,
    },

    // {
    //   headerName: 'Installment Amount',
    //   field: 'bonus_amount', sortable: true,
    //   resizable: true,
    //   wrapHeaderText: true,
    //   autoHeaderHeight: true,
    //   cellClass: "grid-cell-centered",
    //   flex:1,
    //   minWidth:150,
    // },
 
    {
      headerName: 'Actions',
      field: 'employee_bonus_id', sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      flex:1,
      minWidth:150,
      cellRenderer: ActionComponent,
      cellRendererParams: {
        className: 'mat-blue',
        hideRequestButton: true,
        hideDetailsButton: false,
        hideDownloadIcon: false,
        showCustomIcon: false, 
      },
      cellClass: "grid-cell-centered",
     
    },
    
  ];



  constructor(private route: Router, private fb: FormBuilder,
    private hrServies: HrServiceService, private toast: ToastrService,
    private activeroute: ActivatedRoute,public dialog: MatDialog) {
    this.rowClass = 'rowClass'
  }

  ngOnInit(){
    this.getAllEmpAdvPayment()
  }

  goToEmpBonusCreate(path:any) {
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

  onCellClicked(e: any) {
    const dialogRef = this.dialog.open(DialogComponent, { width: '400px', data: { id: e.data.advance_payment_id } });
    dialogRef.afterClosed().subscribe(result => {
      
    })
  }

  getAllEmpAdvPayment(){
    let modifiedName:any=[]
    this.hrServies.getAllEmpAdvPayment().subscribe((res:any)=>{
      this.rowData= res.data;
      var modifyData = this.rowData.map((item: any) => item.installment_data?.map((tem:any)=>tem.month).join(', '));
      console.log(modifyData,"fullś");
      for (let a = 0; a < this.rowData.length; a++) {
        this.rowData[a].monthName = modifyData[a]
      }
      console.log(this.rowData, 'rowData');
    })
  }
}


