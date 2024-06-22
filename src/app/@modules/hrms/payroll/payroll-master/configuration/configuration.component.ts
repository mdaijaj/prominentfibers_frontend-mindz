import { Component } from '@angular/core';
import {
  GridApi,
  GridReadyEvent
} from 'ag-grid-community';
import 'ag-grid-enterprise';
import { Router } from '@angular/router';
import { ConfigrationActionComponent } from './configration-action/configration-action.component';
import { HrServiceService } from 'src/app/@shared/services/hr-service.service';
import { ViewConfigDilogComponent } from './view-config-dilog/view-config-dilog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-configuration',
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.scss']
})
export class ConfigurationComponent {
  rowClass: any;
  private gridApi!: GridApi<any>;
  configList: any;
  public rowData: any;
  public columnDefs = [
    {
      headerName: 'Sr No.',
      field: 'configMasterId',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: "grid-cell-centered",
      flex:1,
      minWidth:150,
    },
    {
      headerName: 'Designation',
      field: 'designation_id',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: "grid-cell-centered",
      flex:1,
      minWidth:150,
    },
    {
      headerName: 'Grade',
      field: 'grade_id',
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
      headerName: 'Department Name',
      field: 'dept_id',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: "grid-cell-centered",
      valueFormatter: 'JSON.parse(value)',
      flex:1,
      minWidth:200,
    },

    {
      headerName: 'Actions',
      field: 'configMasterId', sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      flex:1,
      minWidth:150,
      cellRenderer: ConfigrationActionComponent,
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

  constructor(private route: Router,private hrServies: HrServiceService,public dialog: MatDialog) {
    this.rowClass = 'rowClass'
  }

  ngOnInit(){
     this.getAllComfigList()
  }

  goToAddConfigure(path:any) {
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

  getAllComfigList(){
    this.hrServies.geatAllConfig().subscribe((res:any) => {
      this.rowData = res.data;
      
      
    })
  }

  onCellClicked(e: any) {
    
    const dialogRef = this.dialog.open(ViewConfigDilogComponent, { width: '400px', data: { id: e.data.configMasterId } });
    dialogRef.afterClosed().subscribe(result => {
      
    })
  }
}
