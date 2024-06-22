import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { FormGroup, FormBuilder, FormControl, Validators, FormArray } from '@angular/forms';
import { warehouseListService } from 'src/app/@shared/services/warehouse/warehouse-list.service';
import { ToastrService } from 'ngx-toastr';
import { PartiallyAllocatedActionComponent } from './partially-allocated-action/partially-allocated-action.component';

@Component({
  selector: 'app-partially-allocated',
  templateUrl: './partially-allocated.component.html',
  styleUrls: ['./partially-allocated.component.scss']
})
export class PartiallyAllocatedComponent {
  rowClass: string;
  constructor(
    private router: Router,
    private fb :FormBuilder,
  ) {
    this.rowClass = 'rowClass';
  }

  ngOnInit() {
  }

  redirect1(){
    console.log("this function called")
    this.router.navigate(["master/warehouse-management/sales-order/sales-order-list"]);
  }

  redirect2(){
    this.router.navigate(["master/warehouse-management/sales-order/do-list"]);
  }


  
  public rowData = [
    {sales_order_no: 7, sales_order_by: 'Block1', sales_order_date: 2, product_code: '' }
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
      headerName: 'Sales Order No',
      field: 'sales_order_no',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: 'grid-cell-centered',
      flex: 1,
    },
    {
      headerName: 'Sales Order By',
      field: 'sales_order_by',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: 'grid-cell-centered',
      flex: 1,
    },
    {
      headerName: 'Sales Order Date',
      field: 'sales_order_date',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: 'grid-cell-centered',
      flex: 1,
    },
    {
      headerName: 'Product Code',
      field: 'product_code',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: 'grid-cell-centered',
      flex: 1,
    },
    {
      headerName: 'Product Code',
      field: 'total_no_of_racks',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: 'grid-cell-centered',
      flex: 1,
      cellRenderer: PartiallyAllocatedActionComponent,
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


