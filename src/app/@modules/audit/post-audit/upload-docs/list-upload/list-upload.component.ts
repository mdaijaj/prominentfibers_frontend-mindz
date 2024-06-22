import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ThirdPartyDraggable } from '@fullcalendar/interaction';
import { GridApi, GridReadyEvent } from 'ag-grid-community';
import * as moment from 'moment';
import { ActionComponent } from 'src/app/@modules/lead/action/action.component';
import { AppListDialogComponent } from 'src/app/@shared/app-list-dialog/app-list-dialog.component';
import { SubjectBehaviourPostAuditExportService } from 'src/app/@shared/pipe/exportModule_Pipe/subject-behaviour-post-audit-export.service';
import { EmpMasterService } from 'src/app/@shared/services/emp-master.service';
import { EmpRegistrationService } from 'src/app/@shared/services/emp-registration.service';
import { HeadService } from 'src/app/@shared/services/head.service';
import { LeadService } from 'src/app/@shared/services/lead.service';
import { RecruitService } from 'src/app/@shared/services/recruitment.service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-list-upload',
  templateUrl: './list-upload.component.html',
  styleUrls: ['./list-upload.component.scss']
})
export class ListUploadComponent {
  private gridApi!: GridApi<any>;
  rowData:any;
  rowData2:any;
  rowData1:any;
  personalIdData:any;
  propertyManager:any
  text:any;
  firstLastName:any;
  rowClass: any;
  clicked: boolean = false;
  department: any;
  constructor(private emp_master:EmpMasterService,
    private empService : EmpRegistrationService,
    private recruitService: RecruitService,private head:HeadService,
    private leadService: LeadService,
    private _SubjectBehaviourExport:SubjectBehaviourPostAuditExportService,
    public dialog: MatDialog) {
   this._SubjectBehaviourExport.getDepartmentType().
   subscribe((res:any)=>{
    this.department=res
    
    if(this.department=='Lead_Mangagement'){
      
      
      this.ExportDataInExcelFormate(this.rowData)
    }
    
   })
      
      
      this.rowClass = 'rowClass'
     }

  ngOnInit(): void {
  
   this.head.clicked.subscribe(data=>{
    this.clicked = data;
  })
  this.leadService.getUploadDoc2().subscribe((res:any) => {
    
    this.rowData = res.result;
  })  
   
  }
  ExportDataInExcelFormate(jsonData: any) {
    let filename = 'SalesAndMarketing.xlsx';
    let data = jsonData;
    let ws = XLSX.utils.json_to_sheet(data);
    var wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "People");
    XLSX.writeFile(wb, filename);
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
      headerName: 'BR Number',
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
      headerName: 'Associated Company',
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
      headerName: 'Associated Contact Person',
      field: 'first_name',    
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: "grid-cell-centered",
      flex:1,
      minWidth:155,
    },
    {
      headerName: 'Email',
      field: 'email',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: "grid-cell-centered",
      flex:1,
      minWidth:150,
    },
    {
      headerName: 'State/Region',
      field: 'state_name',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: "grid-cell-centered",
      flex:1,
      minWidth:150,
    },
    
    {
      headerName: 'Status',
      field: 'status',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: "grid-cell-centered",
      flex:1,
      minWidth:150,
      cellStyle: function (params: any) {
        if (params.value.toLowerCase() == 'Open'.toLowerCase()) {
          return { color: 'green' };
        }else if (params.value.toLowerCase() == 'Validated'.toLowerCase()) {
          return { color: 'purple' };
        }else if (params.value.toLowerCase() == 'Assigned'.toLowerCase()) {
          return { color: 'blue' };
        }else if (params.value.toLowerCase() == 'Prospect'.toLowerCase()) {
          return { color: 'yellow' };
        }else if (params.value.toLowerCase() == 'Account'.toLowerCase()) {
          return { color: 'violet' };
        }else if (params.value.toLowerCase() == 'Opportunity'.toLowerCase()) {
          return { color: 'blue' };
        }else if (params.value.toLowerCase() == 'Rejected'.toLowerCase()) {
          return { color: 'red' };
        } else {
          return { color: 'orange' };
        }
      },
    },
    {
      headerName: 'Action',
      field: 'id',
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

  dateFormatter(createdAt: any) {
    return moment(createdAt).format('DD/MM/YYYY');
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
  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;
    

  }
  onCellClicked(e:any){
    
    const dialogRef = this.dialog.open(AppListDialogComponent,{width:'500px',data:{lead_id:e.data.lead_genration_id}});
      dialogRef.afterClosed().subscribe(result => {
        
      })
  }
  onBtnExportDataAsExcel() {
    this.gridApi.exportDataAsExcel({
      processRowGroupCallback: rowGroupCallback,
    });
  }
}
function rowGroupCallback(params:any) {
  return params.node.key;
}
