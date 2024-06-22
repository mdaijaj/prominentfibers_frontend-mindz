import { Component,OnInit } from '@angular/core';


import { MatDialog } from '@angular/material/dialog';
import { GridApi, GridReadyEvent } from 'ag-grid-community';
import { EmpRegistrationService } from 'src/app/@shared/services/emp-registration.service';
import { HeaderMenuService } from 'src/app/@shared/services/header-menu.service';
import { MyPendingActionComponent } from './my-pending-action/my-pending-action.component';


@Component({
  selector: 'app-my-pending-task',
  templateUrl: './my-pending-task.component.html',
  styleUrls: ['./my-pending-task.component.scss']
})
export class MyPendingTaskComponent  implements OnInit {

  ngOnInit(): void {
    
  }

  // private gridApi!: GridApi<any>;
  // rowData: any;
  // rowData2: any;
  // rowData1: any;
  // personalIdData: any;
  // propertyManager: any
  // text: any;
  // firstLastName: any;
  // rowClass: any;
  // buttonText: string = '';
  // buttonText1: string = '';
  // constructor(private header_menu: HeaderMenuService,
  //   private empService: EmpRegistrationService,
  //   public dialog: MatDialog) {
  //   this.rowClass = 'rowClass'
  // }

  // ngOnInit(): void {
  //   

  //   this.header_menu.pengingList().subscribe((res: any) => {
  //     this.rowData = res.result;
  //     
  //   })

  //   let approve: any = document.getElementsByClassName('approve');
  //   let reject: any = document.querySelector('.reject');
  //   
  //   
  // }

  // public columnDefs = [
  //   {
  //     headerName: 'S.No',
  //     field: 'i',
  //     sortable: true,
  //     resizable: true,
  //     wrapHeaderText: true,
  //     autoHeaderHeight: true,
  //     cellClass: "grid-cell-centered",
  //     valueGetter: 'node.rowIndex+1',
  //     flex:1,
  //     minWidth:150
  //   },
  //   {
  //     headerName: 'Candidate Name',
  //     field: 'condidate_name',
  //     sortable: true,
  //     resizable: true,
  //     wrapHeaderText: true,
  //     autoHeaderHeight: true,
  //     cellClass: "grid-cell-centered",
  //     flex:1,
  //     minWidth:150
  //   },
  //   {
  //     headerName: 'Email',
  //     field: 'email',
  //     sortable: true,
  //     resizable: true,
  //     wrapHeaderText: true,
  //     autoHeaderHeight: true,
  //     cellClass: "grid-cell-centered",
  //     flex:1,
  //     minWidth:150
  //   },
  //   {
  //     headerName: 'Mobile',
  //     field: 'mobile',
  //     sortable: true,
  //     resizable: true,
  //     wrapHeaderText: true,
  //     autoHeaderHeight: true,
  //     cellClass: "grid-cell-centered",
  //     flex:1,
  //     minWidth:150
  //   },
  //   {
  //     headerName: 'Resume',
  //     field: 'upload_resume',
  //     sortable: true,
  //     resizable: true,
  //     wrapHeaderText: true,
  //     autoHeaderHeight: true,
  //     cellRenderer: PdfDownloadComponent,
  //     flex:1,
  //     minWidth:150
  //   },
  //   {
  //     headerName: 'Assigned Hiring Manager',
  //     field: 'assigned_hiring_manager',
  //     sortable: true,
  //     resizable: true,
  //     wrapHeaderText: true,
  //     autoHeaderHeight: true,
  //     flex:1,
  //     minWidth:150
  //   },
  //   {
  //     headerName: 'Action',
  //     field: 'approve_status',
  //     flex:1,
  //     minWidth:150,
  //     cellRenderer: MyPendingActionComponent,
  //     cellRendererParams: {
  //       className: 'mat-blue',
  //       hideRequestButton: true,
  //       hideDetailsButton: false,
  //       hideDownloadIcon: false,
  //       showCustomIcon: false, // Hide attachment icon
  //     },
  //   }

  // ];

  // onPageSizeChanged() {
  //   var value = (document.getElementById('page-size') as HTMLInputElement)
  //     .value;
  //   this.gridApi.paginationSetPageSize(Number(value));
  // }
  // onFilterTextBoxChanged() {
  //   this.gridApi.setQuickFilter(
  //     (document.getElementById('filter-text-box') as HTMLInputElement).value
  //   );
  // }
  // onGridReady(params: GridReadyEvent) {
  //   this.gridApi = params.api;
  //   

  // }


}
