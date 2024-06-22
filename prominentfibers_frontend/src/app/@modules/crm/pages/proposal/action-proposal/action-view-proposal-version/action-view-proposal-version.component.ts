import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ICellRendererParams } from 'ag-grid-community';
import { MatDialog } from '@angular/material/dialog';
import { RbacMasterService } from 'src/app/@shared/services/rbac-master.service';
import { ViewProposalVersionDialogComponent } from '../../dialogs/view-proposal-version-dialog/view-proposal-version-dialog.component';
@Component({
  selector: 'app-action-view-proposal-version',
  templateUrl: './action-view-proposal-version.component.html',
  styleUrls: ['./action-view-proposal-version.component.scss'],

})
export class ActionViewProposalVersionComponent implements OnInit {
  assignAction: any;
  singleData: any = {};
  constructor(
    private route: Router,
    public dialog: MatDialog,
    private _rbackService: RbacMasterService,
  ) {
  }

  ngOnInit(): void {
    this.assignAction = this._rbackService?.accessAssignAction();
  }

  // Ag grid start
  public cellValue: any;
  reloadCurrentRoute() {
    let currentUrl = this.route.url;
    this.route.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.route.navigate([currentUrl]);
    });
  }
  agInit(params: ICellRendererParams): void {
    this.cellValue = this.getValueToDisplay(params);
    this.singleData = params.data;

  }
  getValueToDisplay(params: ICellRendererParams) {
    return params.valueFormatted ? params.valueFormatted : params.data.employee_id;
  }

  refresh(params: ICellRendererParams): boolean {
    // set value into cell again
    this.cellValue = this.getValueToDisplay(params);
    return true;
  }
  // Ag grid end

  viewProposalVersion() {
    const dialogRef = this.dialog.open(ViewProposalVersionDialogComponent, {
      width: '90%',
      data: { id: this.singleData },
    });
    dialogRef.afterClosed().subscribe((result: any) => {

    });
  }

  editProposal() {
    this.route.navigate(["master/crm/create-proposal"], { queryParams: { proposalId: this.singleData?.id, actionType: 'edit' } })
  }

}
