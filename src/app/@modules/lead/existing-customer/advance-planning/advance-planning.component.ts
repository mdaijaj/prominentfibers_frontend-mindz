import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { GridApi, GridReadyEvent } from 'ag-grid-community';
import * as moment from 'moment';
import { AppListDialogComponent } from 'src/app/@shared/app-list-dialog/app-list-dialog.component';
import { HeadService } from 'src/app/@shared/services/head.service';
import { LeadService } from 'src/app/@shared/services/lead.service';
import { ActionComponent } from '../advance-planning/action/action.component';
import { Router } from '@angular/router';
@Component({
  selector: 'app-advance-planning',
  templateUrl: './advance-planning.component.html',
  styleUrls: ['./advance-planning.component.scss']
})
export class AdvancePlanningComponent 
{
constructor(private router: Router){  
}
  // ra_tra200(){
    // this.router.navigate(['master/lead/existing-customer/advance-planning/RA-TRA200'])
    // { queryParams: { id: data.traning_id } });
  // }
  ra_tra180(){
    this.router.navigate(['master/lead/existing-customer/advance-planning'])
    // { queryParams: { id: data.traning_id } });
  }
  ra_tra150(){
    this.router.navigate(['master/lead/existing-customer/advance-planning'])
    // { queryParams: { id: data.traning_id } });
  }
  ra_tra120(){
    this.router.navigate(['master/lead/existing-customer/advance-planning'])
    // { queryParams: { id: data.traning_id } });
  }
  ra_tra90(){
    this.router.navigate(['master/lead/existing-customer/advance-planning'])
    // { queryParams: { id: data.traning_id } });
  }
  ra_tra45(){
    this.router.navigate(['master/lead/existing-customer/advance-planning'])
    // { queryParams: { id: data.traning_id } });
  }

}

// {
//   private gridApi!: GridApi<any>;
//   rowData:any;
//   rowClass: any;
//   clicked: boolean = false;
//   constructor(private head:HeadService,
//     private leadService: LeadService,
//     public dialog: MatDialog) {
//     this.rowClass = 'rowClass'
//   }

//   ngOnInit(): void {

//     this.leadService.getVerifiedDqsData().subscribe((res:any)=>{
//     this.rowData=res.result;
//     
//   }) ,

//   
  

//   }

//   public columnDefs = [
//     {
//       headerName: 'S.No',
//       field: 'lead_genration_id',
//       sortable: true,
//       resizable: true,
//       wrapHeaderText: true,
//       autoHeaderHeight: true,
//       cellClass: "grid-cell-centered",
//       minWidth: 150,
//     },
//     {
//       headerName: 'BR Number',
//       field: 'br_number',
//       sortable: true,
//       resizable: true,
//       wrapHeaderText: true,
//       autoHeaderHeight: true,
//       cellClass: "grid-cell-centered",
//       minWidth: 150,
//     },
//     {
//       headerName: 'Company Name',
//       field: 'associated_company',
//       sortable: true,
//       resizable: true,
//       wrapHeaderText: true,
//       autoHeaderHeight: true,
//       cellClass: "grid-cell-centered",
//       minWidth: 150,
//     },
//     {
//       headerName: 'Product Name',
//       field: 'contact_owner',
//       sortable: true,
//       resizable: true,
//       wrapHeaderText: true,
//       autoHeaderHeight: true,
//       cellClass: "grid-cell-centered",
//       minWidth: 155,
//     },

//     {
//       headerName: 'State/Region',
//       field: 'state',
//       sortable: true,
//       resizable: true,
//       wrapHeaderText: true,
//       autoHeaderHeight: true,
//       cellClass: "grid-cell-centered",
//       minWidth: 150,
//     },
    
//     {
//       headerName: 'Audit Start Date',
//       field: 'training_start_date',
//       sortable: true,
//       resizable: true,
//       wrapHeaderText: true,
//       autoHeaderHeight: true,
//       cellClass: "grid-cell-centered",
//       minWidth: 150,
//     },
//     {
//       headerName: 'Audit End Date',
//       field: 'training_end_date',
//       sortable: true,
//       resizable: true,
//       wrapHeaderText: true,
//       autoHeaderHeight: true,
//       cellClass: "grid-cell-centered",
//       minWidth:150,
//     },
//     {
//       headerName: 'Remaining Count',
//       field: 'remaining_count',
//       sortable: true,
//       resizable: true,
//       wrapHeaderText: true,
//       autoHeaderHeight: true,
//       cellClass: "grid-cell-centered",
//       minWidth: 150,
//     },
//     {
//       headerName: 'Action',
//       field: 'lead_genration_id',
//       minWidth: 150,
//       cellRenderer: ActionComponent,
//       cellRendererParams: {
//         className: 'mat-blue',
//         hideRequestButton: true,
//         hideDetailsButton: false,
//         hideDownloadIcon: false,
//         showCustomIcon: false, 
//       },
//       cellClass: "grid-cell-centered"
//     }
 
//   ];

//   dateFormatter(createdAt: any) {
//     return moment(createdAt).format('DD/MM/YYYY');
//   }

//   onPageSizeChanged() {
//     var value = (document.getElementById('page-size') as HTMLInputElement)
//       .value;
//     this.gridApi.paginationSetPageSize(Number(value));
//   }
//   onFilterTextBoxChanged() {
//     this.gridApi.setQuickFilter(
//       (document.getElementById('filter-text-box') as HTMLInputElement).value
//     );
//   }
//   onGridReady(params: GridReadyEvent) {
//     this.gridApi = params.api;
//     

//   }
//   onCellClicked(e: any) {
//     
//     const dialogRef = this.dialog.open(AppListDialogComponent, { width: '500px', data: { lead_id: e.data.lead_genration_id } });
//     dialogRef.afterClosed().subscribe(result => {
//       
//     })
//   }
// }
