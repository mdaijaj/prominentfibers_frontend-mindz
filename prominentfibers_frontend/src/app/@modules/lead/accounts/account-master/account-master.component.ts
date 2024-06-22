import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { GridApi, GridReadyEvent,ColDef } from 'ag-grid-community';
import 'ag-grid-enterprise';
import { ToastrService } from 'ngx-toastr';
import * as moment from 'moment';
import { AppListDialogComponent } from 'src/app/@shared/app-list-dialog/app-list-dialog.component';
import { EmpMasterService } from 'src/app/@shared/services/emp-master.service';
import { EmpRegistrationService } from 'src/app/@shared/services/emp-registration.service';
import { HeadService } from 'src/app/@shared/services/head.service';
import { LeadService } from 'src/app/@shared/services/lead.service';
import { RecruitService } from 'src/app/@shared/services/recruitment.service';
import { ActionComponent } from '../../action/action.component';
import { AccountMasterActionComponent } from './account-master-action/account-master-action.component';

@Component({
  selector: 'app-account-master',
  templateUrl: './account-master.component.html',
  styleUrls: ['./account-master.component.scss']
})
export class AccountMasterComponent {
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
  id: any;
  lead_id: any;
  menuAccessData: any;
  employId: string | null;
  userId: any;
  assignById: any;
  lead_genration_id: any;
  leadId: any;
  new_location_id: any;
  constructor(private emp_master:EmpMasterService, private activeroute: ActivatedRoute,
    private empService : EmpRegistrationService, public route: Router,
    private recruitService: RecruitService,private head:HeadService,
    private leadService: LeadService,  private toast: ToastrService,
    public dialog: MatDialog) {
      this.rowClass = 'rowClass'
     }

  ngOnInit(): void {
   
   this.head.clicked.subscribe(data=>{
    this.clicked = data;
  })
  this.activeroute.queryParams.subscribe(params => {
    this.id = params;
    
    this.lead_id = this.id.lead_id;
    // 
    this.userId=this.id.userId || 1000;
    // this.assignById=this.id.assignById || 1000
    
    
  });

  this.assignById=localStorage.getItem('EmpMainId')
  
  
  
  

  this.leadService.getAccountMaster(this.assignById).subscribe((res:any) => {
    
    this.rowData = res.result;
  }) 

  }

  openCreate() {
    this.route.navigate(
      ['master/lead/lead-management/assign-lead/assign-lead'],
      { queryParams: { lead_id: this.lead_id } }
    );
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
    },
    {
      headerName: 'Br Number',
      field: 'br_number',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: "grid-cell-centered",
    },
    {
      headerName: 'Customer Type',
      field: 'customer_type',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: "grid-cell-centered",
    },
    {
      headerName: 'Associated Company',
      field: 'associated_company',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: "grid-cell-centered",
      rowGroup: true,
    },
    {
      headerName: 'Associated Contact Person',
      field: 'first_name',    
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: "grid-cell-centered",
    },
    {
      headerName: 'Contact Owner',
      field: 'contact_owner',    
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: "grid-cell-centered",
    },
    {
      headerName: 'DQS Contact Source',
      field: 'dqs_Contact_name',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: "grid-cell-centered",
    },
    {
      headerName: 'Lead Created By',
      field: 'lead_created_by_name',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: "grid-cell-centered",
    },
    {
      headerName: 'Lead Created Date',
      field: 'lead_created_date',
      // valueFormatter: this.dateFormatter,
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
    },
    {
      headerName: 'State',
      field: 'state_name',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: "grid-cell-centered",
    },
    {
      headerName: 'Region',
      field: 'region_name',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: "grid-cell-centered",
    },
    {
      headerName: 'Regional Business Head',
      field: 'regional_bussiness_lead_name',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: "grid-cell-centered",
    },
    {
      headerName: 'Validated By',
      field: 'validated_by',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: "grid-cell-centered",
    },
    {
      headerName: 'Validated Date',
      field: 'lead_validated_date',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: "grid-cell-centered",
    },
    {
      headerName: 'Assigned By',
      field: 'assigned_by',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: "grid-cell-centered",
    },
    {
      headerName: 'Assigned Date',
      field: 'assigned_date',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: "grid-cell-centered",
    },
    {
      headerName: 'Status',
      field: 'status',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: "grid-cell-centered",
      cellStyle: function (params: any) {
        if (params?.value?.toLowerCase() == 'Open'.toLowerCase()) {
          return { color: 'green' };
        } else {
          return { color: 'blue' };
        }
      },
    },
    {
      headerName: 'Action',
      field: 'lead_genration_id',
      flex:1,
      minWidth:260,
      cellRenderer: AccountMasterActionComponent,
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

  dateFormatter(lead_created_date: any) {
    return moment(lead_created_date).format('DD/MM/YYYY');
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
    
    if(e.data!==undefined){
    const dialogRef = this.dialog.open(AppListDialogComponent,{width:'500px',data:{lead_id:e.data?.lead_genration_id}});
      dialogRef.afterClosed().subscribe(result => {
        
      })
  } else{
    this.toast.warning("Please click on Group Cell to show the data")

   }
//   getByMenuAccess(){
//     let empId=localStorage.getItem('MyEmpId');
// 

//     this.leadService.getbyRoleAssign(empId).subscribe((res:any)=>{
//       this.menuAccessData=res;
//       
      
//     })
//   }
  }
}
