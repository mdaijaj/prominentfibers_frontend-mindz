import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { FormGroup, FormBuilder, FormControl, Validators, FormArray } from '@angular/forms';
import { warehouseListService } from 'src/app/@shared/services/warehouse/warehouse-list.service';
import { ToastrService } from 'ngx-toastr';
import { DispatchListActionComponent } from './dispatch-list-action/dispatch-list-action.component';

@Component({
  selector: 'app-dispatch-list',
  templateUrl: './dispatch-list.component.html',
  styleUrls: ['./dispatch-list.component.scss']
})
export class DispatchListComponent {
  rowClass: string;
  matBtnColor : any;
  constructor(
    private router: Router,
    private fb :FormBuilder,
  ) {
    this.rowClass = 'rowClass';
  }

  ngOnInit() {
  }

  redirect2(){
    this.router.navigate(["master/warehouse-management/dispatched-product/dispatched-product"]);
  }

  getDispatchFormSetup(data: any) {
    if (data == 1) this.matBtnColor = false;
    else this.matBtnColor = true;
  }

  public rowData = [
    {do_no: 7, sales_order_no: 23, do_date: 2, company_name: 'abc' }
  ]

  public columnDefs = [
    {
      headerName: 'S No.',
      valueGetter: 'node.rowIndex + 1',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: 'grid-cell-centered',
      flex: 1,
    },
    {
      headerName: 'DO No',
      field: 'sales_order_no',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: 'grid-cell-centered',
      flex: 1,
    },
    {
      headerName: 'Sales Order No',
      field: 'sales_order_by',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: 'grid-cell-centered',
      flex: 1,
    },
    {
      headerName: 'DO Date',
      field: 'sales_order_date',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: 'grid-cell-centered',
      flex: 1,
    },
    {
      headerName: 'Company Name',
      field: 'product_code',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: 'grid-cell-centered',
      flex: 1,
    },
    {
      headerName: 'Action',
      field: 'undecided',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: 'grid-cell-centered',
      flex: 1,
      cellRenderer: DispatchListActionComponent,
      cellRendererParams: {
        className: 'mat-blue',
        hideRequestButton: true,
        hideDetailsButton: false,
        hideDownloadIcon: false,
        showCustomIcon: false, // Hide attachment icon
      },
    }
  ];
}


