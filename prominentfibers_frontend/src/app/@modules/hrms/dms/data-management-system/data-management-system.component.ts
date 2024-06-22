import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { GridApi, GridReadyEvent } from 'ag-grid-community';
import { getAriaLevel } from 'ag-grid-community/dist/lib/utils/aria';
import { DMSService } from 'src/app/@shared/services/dms.service';
import { EmpRegistrationService } from 'src/app/@shared/services/emp-registration.service';
import { ActionComponent } from '../../dms/data-management-system/action/action.component';
import { EmpListDialogComponent } from '../../employee-master/employee/employee-list/emp-list-dialog/emp-list-dialog.component';
import { DMSDialogComponent } from './dms-dialog/dms-dialog.component';
import * as moment from 'moment';
import { Router } from '@angular/router';
import { ICellRendererParams } from 'ag-grid-community';
import { RbacMasterService } from 'src/app/@shared/services/rbac-master.service';



@Component({
  selector: 'app-data-management-system',
  templateUrl: './data-management-system.component.html',
  styleUrls: ['./data-management-system.component.scss']
})
export class DataManagementSystemComponent {
  rowClass: any;
  private gridApi!: GridApi<any>;
  rowData: any;
  getData:any
  getFormData:any
  public cellValue: any;
  getEmployeeID: string | null;
  assignAction:any;


  constructor(private _empService: EmpRegistrationService, 
    public dialog: MatDialog,
    private route: Router,
    private _rbackService:RbacMasterService,
    private _dmsService:DMSService) {
    this.rowClass = 'rowClass'
  }

  getAll(){
    this._dmsService.getList().subscribe(res=>{
      this.getData=res;
      
    })
  }
  ngOnInit(): void {
    this.getEmployeeID=localStorage.getItem("employee_id");
    
    
    this._dmsService.getList().subscribe((res: any) => {
      this.rowData = res.result;
      
    })
  }

  ngAfterViewInit(): void {
    setTimeout(()=>{
      this.assignAction = this._rbackService.accessAssignAction();
    },0);
  };

  public columnDefs = [
    {
      headerName: 'S.No.',
      field: 'i',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      valueGetter: 'node.rowIndex+1',
      cellClass: "grid-cell-centered",
      flex:1,
      minWidth:150
    },
    {
      headerName: 'Folder Name',
      field: 'folder_name', 
      sortable: true,
      columnNo:"1",
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: "grid-cell-centered",
      flex:1,
      minWidth:150
      // cellRenderer: this.customCellRendererFunc   
    },
    {
      headerName: 'Created Date',
      field: 'createdAt',
      autoHeaderHeight: true,
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      filter: true,
      flex:1,
      minWidth:150,
      valueFormatter: function (params:any) {
        return moment(params.value).format('DD-MM-YYYY');
    },

    },
    {
      headerName: 'File Category',
      field: 'file_category', sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: "grid-cell-centered",
      flex:1,
      minWidth:150
    },
    {
      headerName: 'Author',
      field: 'author', sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: "grid-cell-centered",
      flex:1,
      minWidth:150
    },
    {
      headerName: 'Version',
      field: 'version', sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: "grid-cell-centered",
      flex:1,
      minWidth:150
    },

    {
      headerName: 'Action',
      field: 'status',
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

//   onCellClicked(e:any) {
//  if(e.column.instanceId===1){
//   
//   this.route.navigate(['master/hrms/DMS/dataManagement/editFolder'], 
//     { queryParams: { document_master_id: e.data.document_master_id }})
//     
//     this._dmsService.getFolderFormData().subscribe(
//       (res:any)=>
//       {
//         this.getFormData=res;
//         
//       })
//  }
//     else{
//       const dialogRef = this.dialog.open(DMSDialogComponent, { width: '40%', data: { id: e.data.document_master_id } });
//       dialogRef.afterClosed().subscribe(result => {
//         
//       })
//     }
//   }
onCellClicked(e:any) {
  console.log(e,"ee");
  
  if(e.colDef.columnNo!=='1'){
    const dialogRef = this.dialog.open(DMSDialogComponent, { width: '40%', data: { id: e.data.document_master_id } });
    dialogRef.afterClosed().subscribe(result => {
      
    })
    }
     else{
      
      this.route.navigate(['master/hrms/DMS/dataManagement/editFolder'], 
        { queryParams: { document_master_id: e.data.document_master_id }})
        
        this._dmsService.getFolderFormData().subscribe(
          (res:any)=>
          {
            this.getFormData=res;
            
          })
     }
   }
}
