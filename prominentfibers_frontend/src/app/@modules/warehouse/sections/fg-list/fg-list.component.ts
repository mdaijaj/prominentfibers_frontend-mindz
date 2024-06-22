import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { FormGroup, FormBuilder, FormControl, Validators, FormArray } from '@angular/forms';
import { warehouseListService } from 'src/app/@shared/services/warehouse/warehouse-list.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-fg-list',
  templateUrl: './fg-list.component.html',
  styleUrls: ['./fg-list.component.scss']
})
export class FGListComponent {
  rowClass: string;
  create_fglist_Form:FormGroup;
  selectedMode:any;
  constructor(
    private router: Router,
    private fb :FormBuilder,
    private $warehouseList: warehouseListService,
    private toast: ToastrService,
  ) {
    this.rowClass = 'rowClass';
    this.create_fglist_Form = this.fb.group({
      product_name: new FormControl(null),
      product_variant: new FormControl(null),
      warehouse_name: new FormControl(null),
     })
  }

  ngOnInit() {
  }

  redirect1() {
    // this.router.navigate(["master/warehouse-management/warehouse-list/warehouse-list"]);
  }

  redirect2() {
  
  }


  
  public rowData = []

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
      headerName: 'Product Name',
      field: 'name',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: 'grid-cell-centered',
      flex: 1,
    },
    {
      headerName: 'Product Variant',
      field: 'plant_name',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: 'grid-cell-centered',
      flex: 1,
    },
    {
      headerName: 'Warehouse Name',
      field: 'total_no_of_block_names',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: 'grid-cell-centered',
      flex: 1,
    },
    {
      headerName: 'Opening Stock',
      field: 'total_no_of_bays',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: 'grid-cell-centered',
      flex: 1,
    },
    {
      headerName: 'Thershold Stock',
      field: 'total_no_of_racks',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: 'grid-cell-centered',
      flex: 1,
    },
    {
      headerName: 'Action',
      field: 'not decided',
      flex: 1,
      minWidth: 150,
      cellRendererParams: {
        className: 'mat-blue',
        hideRequestButton: true,
        hideDetailsButton: false,
        hideDownloadIcon: false,
        showCustomIcon: false, // Hide attachment icon
      },
    },
  ];
}


