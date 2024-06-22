import { AfterViewInit, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { GridApi, GridReadyEvent, ICellRendererParams } from 'ag-grid-community';
import { RbacMasterService } from 'src/app/@shared/services/rbac-master.service';
import { RecruitService } from 'src/app/@shared/services/recruitment.service';
import { CrmService } from 'src/app/@shared/services/crm/crm.service';
import { ViewLeadStatusDialogComponent } from '../dialogs/view-lead-status-dialog/view-lead-status-dialog.component';
import { Location } from '@angular/common';
import { ActionLeadStatusComponent } from '../action/action-lead-status/action-lead-status.component';

@Component({
  selector: 'app-lead-status',
  templateUrl: './lead-status.component.html',
  styleUrls: ['./lead-status.component.scss'],
})
export class LeadStatusComponent implements OnInit, AfterViewInit {
  private gridApi!: GridApi<any>;
  rowData: Candidate[] = [];
  candidate_id?: number;
  assignAction: any;
  rowClass: any;
  matBtnColor: boolean = true;
  userLoginId: any;

  constructor(
    private dialog: MatDialog,
    private recruitService: RecruitService,
    private _rbackService: RbacMasterService,
    private $crm: CrmService,
    private location: Location,

  ) {
    this.rowClass = 'rowClass';
  }

  ngOnInit(): void {
    this.userLoginId = localStorage.getItem('EmpMainId')
    if (this.userLoginId) {
      this.getLeadFormSetup(1);
    }
  }
  onPageSizeChanged() {
    var value = (document.getElementById('page-size') as HTMLInputElement)
      .value;
    this.gridApi.paginationSetPageSize(Number(value));
  }

  // Get all start
  getLeadFormSetup(data: any) {
    try {
      if (data == 1) this.matBtnColor = false;
      else this.matBtnColor = true;
      this.$crm.getLeadData(data, this.userLoginId).subscribe((response: any) => {
        if (response) {
          this.rowData = response.data;
        }
      }, err => {
        console.log(err);
      })
    } catch (error) {
      console.log(error);
    }
  }
  // Get all end

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.assignAction = this._rbackService.accessAssignAction();
    }, 0);
  }

  public columnDefs = [
    {
      headerName: 'S No.',
      valueGetter: 'node.rowIndex + 1',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: 'grid-cell-centered ',
      flex: 1,
    },
    {
      headerName: 'Contact Person Name',
      field: 'contact_person_name',
      minWidth: 175,
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: 'grid-cell-centered',
      flex: 1,
    },
    {
      headerName: 'Contact Number',
      field: 'contact_number',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: 'grid-cell-centered',
      flex: 1,
    },
    {
      headerName: 'Product Name',
      field: 'product_name',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: 'grid-cell-centered',
      flex: 1,
    },
    {
      headerName: 'Lead Owner',
      field: 'lead_owner',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: 'grid-cell-centered',
      flex: 1,
    },
    {
      headerName: 'Date',
      field: 'createdAt',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: 'grid-cell-centered',
      flex: 1,
    },
    {
      headerName: 'Action',
      field: 'id',
      flex: 1,
      minWidth: 150,
      cellRenderer: ActionLeadStatusComponent,
      cellRendererParams: {
        className: 'mat-blue',
        hideRequestButton: true,
        hideDetailsButton: false,
        hideDownloadIcon: false,
        showCustomIcon: false, // Hide attachment icon
      },
    },
  ];


  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;
    // 
  }

  onFilterTextBoxChanged() {
    this.gridApi.setQuickFilter(
      (document.getElementById('filter-text-box') as HTMLInputElement).value
    );
  }

  onCellClicked(e: any) {
    return
    this.candidate_id = e.data.candidate_id;
    const dialogRef = this.dialog.open(ViewLeadStatusDialogComponent, {
      width: '500px',
      data: e.data,
    });
    dialogRef.afterClosed().subscribe((result: any) => {

    });
  }

  goBack() {
    this.location.back()
  }

}

export interface Candidate {
  candidate_id: number;
  condidate_name: string;
  email: string;
  mobile: string;
  assigned_hiring_manager: string;
  status: string;
  updatedAt: string;
  upload_resume: string;
}