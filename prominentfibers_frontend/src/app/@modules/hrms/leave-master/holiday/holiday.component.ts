import { AfterViewInit, Component, OnInit } from '@angular/core';
import {
  GridApi,
  GridReadyEvent
} from 'ag-grid-community';
import 'ag-grid-enterprise';
import { Router } from '@angular/router';
import { ActionComponent } from './action/action.component';
import { HrServiceService } from 'src/app/@shared/services/hr-service.service';
import * as moment from 'moment';
import { HolidayDilogComponent } from './holiday-dilog/holiday-dilog.component';
import { MatDialog } from '@angular/material/dialog';
import { ImportHolidayPopupComponent } from './import-holiday-popup/import-holiday-popup.component';
import { RbacMasterService } from 'src/app/@shared/services/rbac-master.service';


@Component({
  selector: 'app-holiday',
  templateUrl: './holiday.component.html',
  styleUrls: ['./holiday.component.scss']
})
export class HolidayComponent implements OnInit, AfterViewInit {
  rowClass: any;
  filter:boolean=false;
  private gridApi!: GridApi<any>;
  public rowData :any;
  assignAction:any;
  constructor(private route: Router, private hrServies: HrServiceService, private _rbackService:RbacMasterService,
    public dialog: MatDialog) {
    this.rowClass = 'rowClass'
  }

  ngOnInit (){
    this.getAllHoliday();

  }

  ngAfterViewInit(): void {
    setTimeout(()=>{
      this.assignAction = this._rbackService.accessAssignAction();
    },0);
  }

  public columnDefs = [
    {
      headerName: 'Sr No.',
      valueGetter: "node.rowIndex + 1",
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: "grid-cell-centered",
      flex:1,
      minWidth:150,
    },
    {
      headerName: 'Holiday Name',
      field: 'holiday_name',
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
      headerName: 'Resion',
      field: 'resion',
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
      headerName: 'Holiday From',
      field: 'holiday_from', sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: "grid-cell-centered",
      flex:1,
      minWidth:150,
      valueFormatter:(params:any)=>{
        
        return moment(new Date(params.value)).format('LL')
        
      },
    },
    {
      headerName: 'Holiday To',
      field: 'holiday_to', sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: "grid-cell-centered",
      flex:1,
      minWidth:150,
      valueFormatter:(params:any)=>{
        return moment(new Date(params.value)).format('LL')
      },
    },
    {
      headerName: 'Status',
      field: 'holiday_status', sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: "grid-cell-centered",
      flex:1,
      minWidth:150,
    },
    {
      headerName: 'Actions',
      field: 'holiday_id', sortable: true,
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

  openFIlterMenu(){
   this.filter = !this.filter;
  } 

  getAllHoliday (){
    this.hrServies.getAllHoliday().subscribe((res: any) => {
      this.rowData = res.data;
      
    }); 
  }

  onCellClicked(e: any) {
    
    const dialogRef = this.dialog.open(HolidayDilogComponent, { width: '400px', data: { id: e.data.holiday_id} });
    dialogRef.afterClosed().subscribe(result => {
      
    })
  }

  onBtnExportDataAsExcel() {
    this.gridApi.exportDataAsExcel({
      processRowGroupCallback: rowGroupCallback,
    });
  }

  onBtnImportDataAsExcel(){
    const dialogRef = this.dialog.open(ImportHolidayPopupComponent, {
      width: '550px',
    });

    dialogRef.afterClosed().subscribe(result => {
      
    });
  }
}

function rowGroupCallback(params:any) {
  return params.node.key;
}