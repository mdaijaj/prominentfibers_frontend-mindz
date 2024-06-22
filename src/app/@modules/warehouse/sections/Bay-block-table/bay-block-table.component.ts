import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { warehouseListService } from 'src/app/@shared/services/warehouse/warehouse-list.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-bay-block-table',
  templateUrl: './bay-block-table.component.html',
  styleUrls: ['./bay-block-table.component.scss']
})
export class BayBlockTableComponent {
  rowClass: string;

  constructor( 
    private router: Router,
    private $warehouseList: warehouseListService,
    private toast: ToastrService,
  ) {
    this.rowClass = 'rowClass';
  }

  ngOnInit() {  
    this.getBayManagementList();
  }

  manageWarehouse(){
    localStorage.removeItem("bayId")
    localStorage.removeItem("selectedBlockWarehouse")
    localStorage.removeItem("selectedBlockCount")
    localStorage.removeItem("bayCount")
    localStorage.removeItem("selectedBlockPlant")
    localStorage.removeItem("selectedBlock")
    this.router.navigate(["master/warehouse-management/block-portal"]);
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
      headerName: 'Warehouse Name',
      field: 'name',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: 'grid-cell-centered',
      flex: 1,
    },
    {
      headerName: 'Plant Name',
      field: 'plant_name',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: 'grid-cell-centered',
      flex: 1,
    },
    {
      headerName: 'Total No Of Block',
      field: 'total_no_of_block_names',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: 'grid-cell-centered',
      flex: 1,
    },
    {
      headerName: 'Total No Of Bay',
      field: 'total_no_of_bays',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: 'grid-cell-centered',
      flex: 1,
    },
    {
      headerName: 'Total No Of Rack',
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

  getBayManagementList(){
    try {
      this.$warehouseList.getBayManagementList().subscribe((response: any) => {
        if (response) {
          this.rowData = response.data;
        }
      }, (err: any) => {
        console.log(err);
      })
    } catch (error) {
      console.log(error);
    }
  }

}


