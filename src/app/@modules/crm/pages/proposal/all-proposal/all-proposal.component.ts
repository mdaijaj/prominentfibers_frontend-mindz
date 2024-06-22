import { Component, OnInit } from '@angular/core';
import { GridApi, GridReadyEvent } from 'ag-grid-community';
import { Location } from '@angular/common';
import { ProposalService } from 'src/app/@shared/services/crm/proposal.service';
import { Router } from '@angular/router';
import { ActionViewProposalVersionComponent } from '../action-proposal/action-view-proposal-version/action-view-proposal-version.component';

@Component({
  selector: 'app-all-proposal',
  templateUrl: './all-proposal.component.html',
  styleUrls: ['./all-proposal.component.scss'],
})
export class AllProposalComponent implements OnInit {
  private gridApi!: GridApi<any>;
  rowData: any = [];
  rowClass: any;
  userLoginId: any;

  constructor(
    private $proposal: ProposalService,
    private location: Location,
    private router: Router,

  ) {
    this.rowClass = 'rowClass';
  }

  ngOnInit(): void {
    this.userLoginId = localStorage.getItem('EmpMainId')
    if (this.userLoginId) {
      this.getProposalList();
    }
  }

  onPageSizeChanged() {
    var value = (document.getElementById('page-size') as HTMLInputElement)
      .value;
    this.gridApi.paginationSetPageSize(Number(value));
  }

  // Get all start
  getProposalList() {
    try {
      this.$proposal.getProposalList('4', 'status', this.userLoginId).subscribe((response: any) => {
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
      headerName: 'Created By',
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
      headerName: 'Action',
      field: 'id',
      flex: 1,
      minWidth: 150,
      cellRenderer: ActionViewProposalVersionComponent,
      cellRendererParams: {
        className: 'mat-blue',
        hideRequestButton: true,
        hideDetailsButton: false,
        hideDownloadIcon: false,
        showCustomIcon: false,
      },
    },
  ];

  // Custome render start
  clickIt(params: any) {
    this.router.navigate(["master/crm/create-proposal"], { queryParams: { proposalId: params?.data?.id } })
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

  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;
  }

}
