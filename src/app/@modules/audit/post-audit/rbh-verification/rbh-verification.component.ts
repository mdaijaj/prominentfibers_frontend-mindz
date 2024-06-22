import { Component } from '@angular/core';
import { FormControl, FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { GridApi, GridReadyEvent } from 'ag-grid-community';
import * as moment from 'moment';
import { AppListDialogComponent } from 'src/app/@shared/app-list-dialog/app-list-dialog.component';
import { LeadService } from 'src/app/@shared/services/lead.service';
import { ActionComponent } from '../../pre-audit/auditor-master/action/action.component';
import { RbhVerificationActionComponent } from './rbh-verification-action/rbh-verification-action.component';

@Component({
  selector: 'app-rbh-verification',
  templateUrl: './rbh-verification.component.html',
  styleUrls: ['./rbh-verification.component.scss']
})
export class RbhVerificationComponent {
    private gridApi!: GridApi<any>;
    rowData:any;
    auditForm:any;
    FromDate: any;
    toDate: any;
    startDate = new FormControl();
    endDate = new FormControl();
  constructor(private fb: FormBuilder,private leadService:LeadService, public dialog: MatDialog){
  this.auditForm=this.fb.group({
    startDate: new FormControl(null),
    endDate: new FormControl(null),
  })
  }
  
  ngOnInit(): void {
    this.getAllData() 
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
        cellStyle:{ color: 'purple' }
      },
      {
        headerName: 'Action',
        field: 'lead_genration_id',
        flex:1,
        minWidth:260,
        cellRenderer: RbhVerificationActionComponent,
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
  
  
    getAllData(){
      this.leadService.getAllRbhVerification().subscribe((res:any) => {
        this.rowData = res.result;
      })
    }
    public StartdateSelect(event: any) {
      
      this.FromDate= moment(event.value).format('YYYY/MM/DD');
      
    }
  
    public EnddateSelect(event: any) {
      
      this.toDate= moment(event.value).format('YYYY/MM/DD');
      
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
    onCellClicked(e:any){
      
      const dialogRef = this.dialog.open(AppListDialogComponent,{width:'500px',data:{lead_id:e.data.lead_genration_id}});
        dialogRef.afterClosed().subscribe(result => {
          
        })
    }
  
}
