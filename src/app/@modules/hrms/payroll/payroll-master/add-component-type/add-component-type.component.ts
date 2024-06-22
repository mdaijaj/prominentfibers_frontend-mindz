import { Component, OnInit } from '@angular/core';
import {
  GridApi,
  GridReadyEvent
} from 'ag-grid-community';
import 'ag-grid-enterprise';
import { Router } from '@angular/router';
import { AddTypeActionComponent } from './add-type-action/add-type-action.component';
import { HrServiceService } from 'src/app/@shared/services/hr-service.service';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AddTypeDilogComponent } from './add-type-dilog/add-type-dilog.component';

@Component({
  selector: 'app-add-component-type',
  templateUrl: './add-component-type.component.html',
  styleUrls: ['./add-component-type.component.scss']
})
export class AddComponentTypeComponent {
  rowClass: any;
  AddTypeData:any;
  private gridApi!: GridApi<any>;
  public rowData : any;
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
      headerName: 'Code',
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
      minWidth:300,
    },
    {
      headerName: 'Actions',
      field: 'componentType_id', sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      flex:1,
      minWidth:150,
      cellRenderer: AddTypeActionComponent,
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



  constructor(private route: Router, private hrServies: HrServiceService,
     private toast: ToastrService,public dialog: MatDialog
    ) {
    this.rowClass = 'rowClass';
  }

  ngOnInit(): void {
    this.getAddType();
  }

  goToHolidayCreate(path:any) {
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

  getAddType(){
    this.hrServies.getAddTypeList().subscribe((res: any) => {
      this.rowData = res.data;
      
    });
  }

  onCellClicked(e: any) {
    
    const dialogRef = this.dialog.open(AddTypeDilogComponent, { width: '500px', data: { id: e.data.componentType_id } });
    dialogRef.afterClosed().subscribe(result => {
      
    })
  }
}
