import { Component } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { GridApi } from 'ag-grid-community';
import { GridReadyEvent } from 'ag-grid-community';
import { LeadService } from 'src/app/@shared/services/lead.service';
import * as moment from 'moment';
import { AppListDialogComponent } from 'src/app/@shared/app-list-dialog/app-list-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { ActionComponent } from 'src/app/@modules/lead/action/action.component';

@Component({
  selector: 'app-upload-certifi-list',
  templateUrl: './upload-certifi-list.component.html',
  styleUrls: ['./upload-certifi-list.component.scss']
})
export class UploadCertifiListComponent {
  private gridApi!: GridApi<any>;
  rowData:any;
  auditForm:any;
  FromDate: string;
  toDate: string;
constructor(private fb: FormBuilder,private leadService:LeadService, public dialog: MatDialog){
this.auditForm=this.fb.group({
  startDate: new FormControl(null),
  endDate: new FormControl(null),
})
}

ngOnInit(): void {
  this.leadService.getUploadCertificates().subscribe((res:any) => {
    
    this.rowData = res.result;
  })
  // this.getAllData() ;
 }
  public columnDefs = [
    {
      headerName: 'S.No',
      field: 'lead_genration_id',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: "grid-cell-centered",
      flex:1,
      minWidth:150,
    },
    {
      headerName: 'BR Number ',
      field: 'br_number',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: "grid-cell-centered",
      flex:1,
      minWidth:150,
    },
    {
      headerName: 'Associated Comapany ',
      field: 'associated_company',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: "grid-cell-centered",
      flex:1,
      minWidth:150,
    },
    {
      headerName: 'Product Name',
      field: 'product_request',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: "grid-cell-centered",
      flex:1,
      minWidth:150,
    },
    // {
    //   headerName: 'Stage',
    //   field: 'stage',    
    //   sortable: true,
    //   resizable: true,
    //   wrapHeaderText: true,
    //   autoHeaderHeight: true,
    //   cellClass: "grid-cell-centered",
    //   flex:1,
    //   minWidth:150,
    // },
    {
      headerName: 'Start Date',
      field: 'training_start_date',    
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: "grid-cell-centered",
      flex:1,
      minWidth:155,
    },
    {
      headerName: 'End Date',
      field: 'training_end_date',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: "grid-cell-centered",
      flex:1,
      minWidth:150,
    },
    {
      headerName: 'status',
      field: 'status',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: "grid-cell-centered",
      flex:1,
      minWidth:150,
      cellStyle:{color:'orange'}
    },
    {
      headerName: 'Action',
      field: 'lead_genration_id',
      flex:1,
      minWidth:150,
      cellRenderer: ActionComponent,
      cellRendererParams: {
        className: 'mat-blue',
        hideRequestButton: true,
        hideDetailsButton: false,
        hideDownloadIcon: false,
        showCustomIcon: false, // Hide attachment icon
      },
      cellClass: "grid-cell-centered"
    }
   ];

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
  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;
    

  }
  onCellClicked(e:any){
    
    const dialogRef = this.dialog.open(AppListDialogComponent,{width:'500px',data:{lead_id:e.data.lead_genration_id}});
      dialogRef.afterClosed().subscribe(result => {
        
      })
  }

  // getAllData(){
  //   this.leadService.getWork().subscribe((res:any) => {
  //     
  //     this.rowData = res.result;
  //   })
  // }
  public StartdateSelect(event: any) {
    
    this.FromDate= moment(event.value).format('YYYY-MM-DD');
    
  }

  public EnddateSelect(event: any) {
    
    this.toDate= moment(event.value).format('YYYY-MM-DD');
    
  }
  searchticket()  {
    const data = {
        fromDate:this.FromDate,
        endDate:this.toDate,
    }
  
    this.leadService.getUnderL1Date(data)
    .subscribe((res: any) => {
      
      this.rowData=res.data;
    },
    )
  }
}
