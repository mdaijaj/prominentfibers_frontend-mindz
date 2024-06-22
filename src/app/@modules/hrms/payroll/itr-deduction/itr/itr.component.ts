import { Component } from '@angular/core';
import { GridApi, GridReadyEvent } from 'ag-grid-community';
import { Router } from '@angular/router';
import { HrServiceService } from 'src/app/@shared/services/hr-service.service';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { ItrActionComponent } from '../itr-action/itr-action.component';
import { ItrDilogComponent } from '../itr-dilog/itr-dilog.component';

@Component({
  selector: 'app-itr',
  templateUrl: './itr.component.html',
  styleUrls: ['./itr.component.scss']
})
export class ItrComponent {
  rowClass: any;
  AddTypeData:any;
  private gridApi!: GridApi<any>;
  public rowData : any;

  constructor(private route: Router, private hrServies: HrServiceService,
    private toast: ToastrService,public dialog: MatDialog
   ) {
   this.rowClass = 'rowClass';
 }

 ngOnInit(): void {
  this.getAllItr()
 }
  public columnDefs = [
    {
      headerName: 'Sr No.',
      field: 'componentType_id',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: "grid-cell-centered",
      flex:1,
      minWidth:150,
    },
    {
      headerName: 'EmpManualCode',
      field: 'component_code',
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
      headerName: 'Name',
      field: 'component_name',
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
      headerName: 'Designation',
      field: 'component_name',
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
      field: 'component_name',
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
      headerName: 'JoiningDate',
      field: 'component_name',
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
      headerName: 'Eligibility',
      field: 'Eligibility',
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
      headerName: 'Submitted',
      field: 'Submitted',
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
      headerName: 'Update',
      field: 'component_name',
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
      headerName: 'Actions',
      field: 'componentType_id', sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      flex:1,
      minWidth:150,
      cellRenderer: ItrActionComponent,
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
    
    const dialogRef = this.dialog.open(ItrDilogComponent, { width: '600px', data: { id: e.data.componentType_id } });
    dialogRef.afterClosed().subscribe(result => {
      
    })
  }

  getAllItr(){
    this.hrServies.getAllItr().subscribe((res:any)=>{
      this.rowData = res.data;
    })
  }
}
