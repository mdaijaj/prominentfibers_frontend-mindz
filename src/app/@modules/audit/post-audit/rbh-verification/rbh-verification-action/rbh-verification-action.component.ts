import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ICellRendererParams } from 'ag-grid-community';

@Component({
  selector: 'app-rbh-verification-action',
  templateUrl: './rbh-verification-action.component.html',
  styleUrls: ['./rbh-verification-action.component.scss']
})
export class RbhVerificationActionComponent {
  constructor(
    private route: Router,
    public dialog: MatDialog,
    private router:Router
  ) { }

  ngOnInit(): void {}
  public cellValue: any;

  agInit(params: ICellRendererParams): void {
    this.cellValue = params
  }
  getValueToDisplay(params: ICellRendererParams) {
    return params
  }
  refresh(params: ICellRendererParams): boolean {
    this.cellValue = this.getValueToDisplay(params);
    return true;
  }

  navigateToPaymentCheck(e:any) {
    e.stopPropagation();
    this.router.navigate(['master/audit/post-audit/rbh_verification/rbh_check'], { queryParams: { audit_id: this.cellValue.data.lead_genration_id}})
  }
}
