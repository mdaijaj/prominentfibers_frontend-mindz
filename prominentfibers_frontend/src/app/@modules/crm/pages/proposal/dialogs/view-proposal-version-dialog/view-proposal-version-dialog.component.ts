import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GridApi, GridReadyEvent } from 'ag-grid-community';
import { environment } from 'src/app/environments/environment';
import { CrmService } from 'src/app/@shared/services/crm/crm.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AssignUserService } from 'src/app/@shared/services/crm/assign-user.service';
import { ToastrService } from 'ngx-toastr';
import { ProposalService } from 'src/app/@shared/services/crm/proposal.service';
import { ActivatedRoute, Router } from '@angular/router';
// import { RecruitService } from 'src/app/@service/recruitment.service';
@Component({
  selector: 'app-view-proposal-version-dialog',
  templateUrl: './view-proposal-version-dialog.component.html',
  styleUrls: ['./view-proposal-version-dialog.component.scss'],
})
export class ViewProposalVersionDialogComponent {
  userLoginId: any;
  rowData: any = [];
  singleData: any;

  constructor(
    private router: Router,
    private $proposal: ProposalService,
    public dialog: MatDialogRef<ViewProposalVersionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.singleData = data?.id;
  }

  ngOnInit(): void {
    this.userLoginId = localStorage.getItem('EmpMainId')
    if (this.userLoginId) {
      this.getProposalList();
    }
  }

  // Get version list start
  getProposalList() {
    try {
      this.$proposal.proposalVersionList(this.singleData?.id).subscribe((response: any) => {
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
  // GGet version list end

  // View proposal start
  viewProposal(data: any) {
    this.dialog.close();
    this.router.navigate(["master/crm/create-proposal"],
      { queryParams: { version_id: data?.id, proposalId: data?.proposal_id, proposal_list_id: data?.proposal_list_id, actionType: 'view' } })
  }

}
