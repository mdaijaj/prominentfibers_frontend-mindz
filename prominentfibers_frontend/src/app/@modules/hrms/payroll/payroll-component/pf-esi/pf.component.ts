import { Component } from '@angular/core';
import {
  GridApi,
  GridReadyEvent
} from 'ag-grid-community';
import 'ag-grid-enterprise';
import { Router } from '@angular/router';
import { PfActionComponent } from './pf-action/pf-action.component';
import { HrServiceService } from 'src/app/@shared/services/hr-service.service';
import { ToastrService } from 'ngx-toastr';
import { PfDilogComponent } from './pf-dilog/pf-dilog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-pf',
  templateUrl: './pf.component.html',
  styleUrls: ['./pf.component.scss']
})
export class PfEsiComponent {
  rowClass: any;
  private gridApi!: GridApi<any>;
  public rowData :any;
  public columnDefs = [
    {
      headerName: 'Sr No.',
      field: 'pfesi_id',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: "grid-cell-centered",
      flex:1,
      minWidth:150,
    },
    {
      headerName: 'Group',
      field: 'addGroup_nameById',
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
      headerName: 'Company',
      field: 'companyName',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: "grid-cell-centered",
      valueFormatter: 'JSON.parse(value)',
      flex:1,
      minWidth:300,
    },
    {
      headerName: 'Component Type',
      field: 'backComponent',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: "grid-cell-centered",
      valueFormatter: 'JSON.parse(value)',
      flex:1,
      minWidth:300,
    },
    {
      headerName: 'Actions',
      field: 'pfesi_id', sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      flex:1,
      minWidth:150,
      cellRenderer: PfActionComponent,
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



  constructor(private route: Router,private hrServies: HrServiceService,
    private toast: ToastrService,public dialog: MatDialog) {
    this.rowClass = 'rowClass'
  }

  ngOnInit() {
    this.getAllPfList()
  }


  goToPFCreate(path:any) {
    this.route.navigate([path]);
  }


  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;
    

  }

  getAllPfList () {
    this.hrServies.getAllPfList().subscribe((res: any) => {
      this.rowData = res.data;
      
    });
  }

  onPageSizeChanged() {
    var value = (document.getElementById('page-size') as HTMLInputElement).value;
    this.gridApi.paginationSetPageSize(Number(value));
  }

  onFilterTextBoxChanged() {
    this.gridApi.setQuickFilter(
      (document.getElementById('filter-text-box') as HTMLInputElement).value
    );
  }

  onCellClicked(e: any) {
    
    const dialogRef = this.dialog.open(PfDilogComponent, { width: '400px', data: { id: e.data.pfesi_id } });
    dialogRef.afterClosed().subscribe(result => {
      
    })
  }

}
