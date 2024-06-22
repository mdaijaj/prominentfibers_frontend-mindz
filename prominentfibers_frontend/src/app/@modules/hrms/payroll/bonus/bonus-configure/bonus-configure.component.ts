import { Component } from '@angular/core';
import {
  GridApi,
  GridReadyEvent
} from 'ag-grid-community';
import 'ag-grid-enterprise';
import { ActivatedRoute, Router } from '@angular/router';
import { BonusConfigureActionComponent } from './bonus-configure-action/bonus-configure-action.component';
import { HrServiceService } from 'src/app/@shared/services/hr-service.service';
import { FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { BonusConfigDilogComponent } from './bonus-config-dilog/bonus-config-dilog.component';
import { MatDialog } from '@angular/material/dialog';
@Component({
  selector: 'app-bonus-configure',
  templateUrl: './bonus-configure.component.html',
  styleUrls: ['./bonus-configure.component.scss']
})
export class BonusConfigureComponent {
  rowClass: any;
  private gridApi!: GridApi<any>;

  constructor(private route: Router, private fb: FormBuilder,public dialog: MatDialog,
    private hrServies: HrServiceService, private toast: ToastrService,
    private activeroute: ActivatedRoute) {
    this.rowClass = 'rowClass'
  }

  ngOnInit(){
   this.getAllBonusConfig()
  }


  public rowData:any;
  public columnDefs = [
    {
      headerName: 'Sr No.',
      field: 'bonus_id',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: "grid-cell-centered",
      flex:1,
      minWidth:150,
    },
    {
      headerName: 'Bonus Name',
      field: 'bonus_name',
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
      headerName: 'Bonus Series',
      field: 'bonus_series', sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: "grid-cell-centered",
      flex:1,
      minWidth:150,
    },
 
    {
      headerName: 'Amount',
      field: 'amount', sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: "grid-cell-centered",
      flex:1,
      minWidth:150,
    },
    {
      headerName: 'Actions',
      field: 'bonus_id', sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      flex:1,
      minWidth:150,
      cellRenderer: BonusConfigureActionComponent,
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

  goToEmpBonusCreate(path:any) {
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

  getAllBonusConfig(){
    this.hrServies.getAllBonusConfig().subscribe((res:any)=>{
     this.rowData = res.data;
     
     
    })
  }

  onCellClicked(e: any) {
    
    const dialogRef = this.dialog.open(BonusConfigDilogComponent, { width: '400px', data: { id: e.data.bonus_id} });
    dialogRef.afterClosed().subscribe(result => {
      
    })
  }

}
