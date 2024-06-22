import { AfterViewInit, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ICellRendererParams } from 'ag-grid-community';
import { PurchaseOrderComponent } from '../../purchase-order/purchase-order.component';
import { RbacMasterService } from 'src/app/@shared/services/rbac-master.service';
import { PoApprovedDialogComponent } from '../po-approved-dialog/po-approved-dialog.component';

@Component({
  selector: 'app-po-issued-action',
  templateUrl: './po-issued-action.component.html',
  styleUrls: ['./po-issued-action.component.scss']
})
export class PoIssuedActionComponent implements OnInit, AfterViewInit {
  public cellValue: any;
  assignAction: any;
  constructor(
    private route: Router,
    public dialog: MatDialog,
    private router: Router,
    private _rbackService: RbacMasterService,
  ) {
    // this.data = localStorage.getItem("jobId");
    // 

  }

  ngOnInit(): void {

  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.assignAction = this._rbackService.accessAssignAction();
    }, 0);
  }

  agInit(params: ICellRendererParams): void {
    this.cellValue = this.getValueToDisplay(params);
  }
  getValueToDisplay(params: ICellRendererParams) {
    return params.valueFormatted ? params.valueFormatted : params.data
  }
  refresh(params: ICellRendererParams): boolean {
    // set value into cell again
    this.cellValue = this.getValueToDisplay(params);
    return true;
  }

  onCellClicked(e: any) {
    e.stopPropagation()
    const dialogRef = this.dialog.open(PurchaseOrderComponent, { width: '500px', data: { cellData: this.cellValue, po_id: this.cellValue.po_id } });
    dialogRef.afterClosed().subscribe((result: any) => {
    })
  }
  proceedToApp() {
    // e.stopPropagation()
    const dialogRef = this.dialog.open(PoApprovedDialogComponent, { width: '500px', data: { cellData: this.cellValue } });
    dialogRef.afterClosed().subscribe(result => {

    })
  }
  edit(e: any) {
    e.stopPropagation();
    this.router.navigate(['master/itticket/purchase-inventory/vendor-quotation/approve-process'], { queryParams: { pr_id: this.cellValue.procurement_product_id, isRejected: true } })
  }

}
