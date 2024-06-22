import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { GridApi, GridReadyEvent } from 'ag-grid-community';
import * as moment from 'moment';
import { ActionComponent } from 'src/app/@shared/action/action.component';

import { AppListDialogComponent } from 'src/app/@shared/app-list-dialog/app-list-dialog.component';
import { EmpMasterService } from 'src/app/@shared/services/emp-master.service';
import { EmpRegistrationService } from 'src/app/@shared/services/emp-registration.service';
import { HeadService } from 'src/app/@shared/services/head.service';
import { LeadService } from 'src/app/@shared/services/lead.service';
import { RbacMasterService } from 'src/app/@shared/services/rbac-master.service';
import { RecruitService } from 'src/app/@shared/services/recruitment.service';
@Component({
  selector: 'app-open-house-training-list',
  templateUrl: './open-house-training-list.component.html',
  styleUrls: ['./open-house-training-list.component.scss']
})
export class OpenHouseListComponent {
  private gridApi!: GridApi<any>;
  rowData: any;
  rowData2: any;
  rowData1: any;
  personalIdData: any;
  propertyManager: any
  text: any;
  firstLastName: any;
  rowClass: any;
  clicked: boolean = false;
  id: any;
  lead_id: any;
  assignAction:any;
  Login_user: any = localStorage.getItem('signInUser');
  Login_user_id:any = JSON.parse(this.Login_user).employee_id;
  
  constructor(private emp_master: EmpMasterService, private activeroute: ActivatedRoute,private _rbackService:RbacMasterService,
    private empService: EmpRegistrationService, public route: Router,
    private recruitService: RecruitService, private head: HeadService,
    private leadService: LeadService,
    public dialog: MatDialog) {
    this.rowClass = 'rowClass'
  }

  ngOnInit(): void {

    this.head.clicked.subscribe(data => {
      this.clicked = data;
    })
    this.activeroute.queryParams.subscribe(params => {
      this.id = params;

      this.lead_id = this.id.lead_id;
    });
    // this.leadService.getOpenHouseNew().subscribe((res: any) => {

    //   this.rowData = res.data;
    // })
    this.leadService.getOpenHouseNew1(this.Login_user_id).subscribe((res: any) => {

      this.rowData = res.data;
    })

  }

  ngAfterViewInit(): void {
    setTimeout(()=>{
      this.assignAction = this._rbackService.accessAssignAction();
    },0);
  }

  openCreate() {
    this.route.navigate(
      ['master/audit/pre-audit/open-house-training/create-training'],
      { queryParams: { lead_id: this.lead_id } }
    );
  }

  navigateTOPayment(){
    this.route.navigate(
      ['open-house-training/payment-link'],
      { queryParams: { lead_id: this.lead_id } }
    );
  }

  navigateTORegistaration(){
    this.route.navigate(
      ['open-house-training/registration-link'],
      { queryParams: { lead_id: this.lead_id } }
    );
  }

  public columnDefs = [
    {
      headerName: 'S.No',
      field: 'open_house_training_id',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: "grid-cell-centered",
      flex: 1,
      minWidth: 150
    },
    {
      headerName: 'Venue',
      field: 'venue',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: "grid-cell-centered",
      flex: 1,
      minWidth: 150
    },
    {
      headerName: 'Program Title',
      field: 'program_title',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: "grid-cell-centered",
      flex: 1,
      minWidth: 150
    },
    {
      headerName: 'Product of Training',
      field: 'program_name',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: "grid-cell-centered",
      flex: 1,
      minWidth: 150
    },
    {
      headerName: 'Program Start Date',
      field: 'open_house_start_date',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: "grid-cell-centered",
      flex: 1,
      minWidth: 150
    },
    {
      headerName: 'Program End Date',
      field: 'open_house_end_date',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: "grid-cell-centered",
      flex: 1,
      minWidth: 150
    },
    {
      headerName: 'Organizer',
      field: 'program_organizer',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: "grid-cell-centered",
      flex: 1,
      minWidth: 150
    },
    {
      headerName: 'BR Number',
      field: 'br_number',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: "grid-cell-centered",
      flex: 1,
      minWidth: 150
    },
    {
      headerName: 'Program Location',
      field: 'program_location',
      valueFormatter: this.dateFormatter,
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      flex: 1,
      minWidth: 150
    },
    {
      headerName: 'Program Cost',
      field: 'program_cost',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: "grid-cell-centered",
      flex: 1,
      minWidth: 150
    },
    {
      headerName: 'Created By',
      field: 'created_by',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: "grid-cell-centered",
      flex: 1,
      minWidth: 150
    },
    {
      headerName: 'Created Date',
      field: 'created_date',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: "grid-cell-centered",
      flex: 1,
      minWidth: 150
    },
    {
      headerName: 'Status',
      field: 'status',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: "grid-cell-centered",
      flex: 1,
      minWidth: 150
    },
    {
      headerName: 'Action',
      field: 'id',
      flex: 1,
      minWidth: 150,
      cellRenderer: ActionComponent,
      cellRendererParams: {
        className: 'mat-blue',
        hideRequestButton: true,
        hideDetailsButton: true,
        hideDownloadIcon: true,
        showCustomIcon: true, // Hide attachment icon
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
  onCellClicked(e: any) {

    const dialogRef = this.dialog.open(AppListDialogComponent, { width: '500px', data: { verifyId: e.data.candidtaes_v_Id } });
    dialogRef.afterClosed().subscribe(result => {

    })
  }
}
