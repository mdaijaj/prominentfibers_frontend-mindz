import { Component, OnInit } from '@angular/core';
import { GridApi, GridReadyEvent } from 'ag-grid-community';
import { Location } from '@angular/common';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { ProposalService } from 'src/app/@shared/services/crm/proposal.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-discount-request',
  templateUrl: './discount-request.component.html',
  styleUrls: ['./discount-request.component.scss'],
})
export class DiscountRequestComponent implements OnInit {
  private gridApi!: GridApi<any>;
  rowData: any = [];
  candidate_id?: number;
  assignAction: any;
  rowClass: any;
  leadSummaryForm: FormGroup;
  userLoginId: any;

  constructor(
    private fb: FormBuilder,
    private $proposal: ProposalService,
    private location: Location,
    private router: Router,

  ) {
    this.rowClass = 'rowClass';
    this.leadSummaryForm = this.fb.group({
      branch_id: new FormControl('3'),
    });
  }

  ngOnInit(): void {
    this.userLoginId = localStorage.getItem('EmpMainId')
    if (this.userLoginId) {
      this.getProposalList('3');
    }
  }

  onPageSizeChanged() {
    var value = (document.getElementById('page-size') as HTMLInputElement)
      .value;
    this.gridApi.paginationSetPageSize(Number(value));
  }


  // Get all start
  getProposalList(status: any) {
    try {
      this.$proposal.getProposalList(status, 'status', this.userLoginId).subscribe((response: any) => {
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
      headerName: 'Proposal Number',
      field: 'proposal_no', // Replace with your actual field name
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: 'grid-cell-centered',
      flex: 1,
      cellRenderer: this.customCellRenderer.bind(this), // Ensure correct 'this' context
    },
    {
      headerName: 'Company Name',
      field: 'company_name',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: 'grid-cell-centered',
      flex: 1,
    },
    {
      headerName: 'Requested By',
      field: 'first_name',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: 'grid-cell-centered',
      flex: 1,
    },
    {
      headerName: 'Quotation Amount',
      field: 'grant_total',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: 'grid-cell-centered',
      flex: 1,
    },
    {
      headerName: 'Created Date',
      field: 'createdAt',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: 'grid-cell-centered',
      flex: 1,
    },
    {
      headerName: 'Status',
      field: 'proposal_status',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: 'grid-cell-centered',
      flex: 1,
    },
  ];

  // Custome render start
  clickIt(params: any) {
    this.router.navigate(["master/crm/create-proposal"], { queryParams: { proposalId: params?.data?.id, actionType: this.actionType } })
  }

  customCellRenderer(params: any) {
    const cellValue = params.value;
    const clickableContent = document.createElement('div');
    clickableContent.style.cursor = 'pointer';
    clickableContent.style.textDecoration = 'underline';
    clickableContent.innerText = cellValue;
    clickableContent.addEventListener('click', () => {
      this.clickIt(params);
    });
    return clickableContent;
  }
  // Custome render end

  onFilterTextBoxChanged() {
    this.gridApi.setQuickFilter(
      (document.getElementById('filter-text-box') as HTMLInputElement).value
    );
  }

  goBack() {
    this.location.back();
  }

  tabs: any[] = [
    { label: 'My Discount List' },
    { label: 'Pending Proposal List' },
    { label: 'Approved Discount List' },
    { label: 'Rejected Discount List' },
  ];

  actionType: String = 'view';

  tabChange(event: MatTabChangeEvent): void {
    let label = event?.tab?.textLabel;
    let status = "";
    if (label == "Pending Proposal List") status = "0";
    else if (label == "Approved Discount List") status = "1";
    else if (label == "Rejected Discount List") status = "2";
    else status = "3";
    this.getProposalList(status);
    if (label == 'Pending Proposal List') this.actionType = 'approval';
    else this.actionType = 'view'
  }

  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;
  }

}
