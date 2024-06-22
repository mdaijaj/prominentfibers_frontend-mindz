import { AfterViewInit, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { GridApi, GridReadyEvent, ICellRendererParams } from 'ag-grid-community';
import { RbacMasterService } from 'src/app/@shared/services/rbac-master.service';
import { RecruitService } from 'src/app/@shared/services/recruitment.service';
import { CrmService } from 'src/app/@shared/services/crm/crm.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-lead-description',
  templateUrl: './lead-description.component.html',
  styleUrls: ['./lead-description.component.scss'],
})
export class LeadDescriptionComponent implements OnInit, AfterViewInit {
  private gridApi!: GridApi<any>;
  rowData: Candidate[] = [];
  candidate_id?: number;
  assignAction: any;
  rowClass: any;
  achivementForm: FormGroup;
  productList: any = [];

  constructor(
    private dialog: MatDialog,
    private recruitService: RecruitService,
    private _rbackService: RbacMasterService,
    private $crm: CrmService,
    private fb: FormBuilder,

  ) {
    this.rowClass = 'rowClass';

    this.achivementForm = this.fb.group({
      product_name: new FormControl(null, Validators.required),
      lead_owner: new FormControl(null, Validators.required),
      employee_name: new FormControl(null, Validators.required),
    });
  }

  ngOnInit(): void {
    let userLoginId: any = localStorage.getItem('EmpMainId')
    if (userLoginId) {
      this.getLeadData();
      this.getProductName();
    }
  }

  // Get all start
  getLeadData() {
    try {
      this.$crm.getLeadData(1, null).subscribe((response: any) => {
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

  // Get product name start
  getProductName() {
    try {
      this.$crm.getProductName().subscribe((response: any) => {
        if (response) {
          this.productList = response.data;
        }
      }, err => {
        console.log(err);
      })
    } catch (error) {
      console.log(error);
    }
  }
  // Get product name end

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
      headerName: 'Name',
      field: 'lead_owner',
      minWidth: 175,
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: 'grid-cell-centered',
      flex: 1,
    },
    {
      headerName: 'Date',
      field: 'lead_created_date',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: 'grid-cell-centered',
      flex: 1,
    },
    {
      headerName: 'Description',
      field: 'description',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: 'grid-cell-centered',
      flex: 1,
    },
    {
      headerName: 'Status',
      field: 'status',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: 'grid-cell-centered',
      flex: 1,
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
    console.log(e)
  }

  onSubmitForm(){
    console.log('Submitted');
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