import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { warehouseListService } from 'src/app/@shared/services/warehouse/warehouse-list.service';
import { ColumnApi, GridApi, GridReadyEvent, ICellRendererParams } from 'ag-grid-community';
import { WarehouseStatusComponent } from '../warehouse-action/warehouse-status/warehouse-status.component';
import { WarehouseActionComponent } from '../warehouse-action/warehouse-action.component';

@Component({
  selector: 'app-warehouselist',
  templateUrl: './warehouseList.component.html',
  styleUrls: ['./warehouseList.component.css']
})
export class warehouseListComponent implements OnInit {
  rowClass: any;
  rowData: any;
  // private gridApi!: GridApi<any>;
  // private gridColumnApi: ColumnApi;
  
  constructor(
    private router: Router,
    private $warehouseList: warehouseListService,
  ) {
    this.rowClass = 'rowClass';
  }

  ngOnInit() {
    this.getWarehouse()
  }

  addRedirect() {
    this.router.navigate(["master/warehouse-management/addhouse"]);
  }

  getWarehouse() {
    try {
      this.$warehouseList.getAllWarehouse().subscribe((response: any) => {
        if (response) {
          this.rowData = response.data;
        }
      }, err => {
        console.log(err);
      })
    } catch (error) {
      console.log(error);
    }
  }

  // onGridReady(params: GridReadyEvent) {
  //   this.gridApi = params.api;
  //   // this.gridColumnApi = params.columnApi;
  // }

  public columnDefs2 = [
    {
      headerName: 'S No.',
      valueGetter: 'node.rowIndex + 1',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: 'grid-cell-centered ',
      flex: 1,
    },
    {
      headerName: 'Name',
      field: 'name',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: 'grid-cell-centered',
      flex: 1,
    },
    {
      headerName: 'Plant',
      field: 'plant_name',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: 'grid-cell-centered',
      flex: 1,
    },
    {
      headerName: 'Status',
      field: 'status',
      flex: 1,
      minWidth: 150,
      cellRenderer: WarehouseStatusComponent,
      cellRendererParams: {
        className: 'mat-blue',
        hideRequestButton: true,
        hideDetailsButton: false,
        hideDownloadIcon: false,
        showCustomIcon: false, // Hide attachment icon
      },
    },
    {
      headerName: 'Action',
      field: 'not decided',
      flex: 1,
      minWidth: 150,
      cellRenderer: WarehouseActionComponent,
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
