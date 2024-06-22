import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ICellRendererParams } from 'ag-grid-community';
import { PurchaseOrderComponent } from 'src/app/@modules/itticketing/purchase-inventory/purchase-order/purchase-order/purchase-order.component';

@Component({
  selector: 'app-rejected-audit-action',
  templateUrl: './rejected-audit-action.component.html',
  styleUrls: ['./rejected-audit-action.component.scss']
})
export class RejectedAuditActionComponent {
    constructor(
      private route: Router,
      public dialog: MatDialog,
      private router:Router,
    ) {
      // this.data = localStorage.getItem("jobId");
      // 
      
    }
  
    ngOnInit(): void {}

    public cellValue: any;
  
    agInit(params: ICellRendererParams): void {
      this.cellValue = params
      console.log(this.cellValue,"lllllll");
    }
    getValueToDisplay(params: ICellRendererParams) {
      
      return params
    }
    refresh(params: ICellRendererParams): boolean {
      // set value into cell again
      
      this.cellValue = this.getValueToDisplay(params);
      return true;
    }
  
    onCellClicked(e:any){
      
      e.stopPropagation()
      const dialogRef = this.dialog.open(PurchaseOrderComponent, { width: '400px', data: { cellData: this.cellValue.data} });
      dialogRef.afterClosed().subscribe(result => {
      })
    }

    navigate(){
    if(this.cellValue.data.status == 'l1 Review Rejected'){
      this.route.navigate(
        ['master/audit/post-audit/under-l1-review/post-audit-verification'],
        { queryParams: { audit_id: this.cellValue.data.lead_genration_id, type: 'underL1Review',auditor_status: 'rejected'} }
      );
    } else if(this.cellValue.data.status == 'Completeness Check Rejected'){
      this.route.navigate(
        ['master/audit/post-audit/completeness-check/completness-create'],
        { queryParams: { audit_id: this.cellValue.data.lead_genration_id, type: 'completenessCheck',auditor_status: 'rejected'} }
      );
    }else if(this.cellValue.data.status == 'Technical Review Rejected'){
      this.route.navigate(
        ['master/audit/post-audit/techreview/techreview-audit-verification'],
        { queryParams: { techreviewaudit_id: this.cellValue.data.lead_genration_id, type: 'undertechReview',auditor_status: 'rejected' } }
      );
    }
    }
}
