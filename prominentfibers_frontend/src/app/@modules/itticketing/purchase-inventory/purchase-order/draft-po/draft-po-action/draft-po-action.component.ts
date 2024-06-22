import { AfterViewInit, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ICellRendererParams } from 'ag-grid-community';
import { PurchaseOrderComponent } from '../../purchase-order/purchase-order.component';
import { RbacMasterService } from 'src/app/@shared/services/rbac-master.service';

@Component({
  selector: 'app-draft-po-action',
  templateUrl: './draft-po-action.component.html',
  styleUrls: ['./draft-po-action.component.scss']
})
export class DraftPoActionComponent implements OnInit, AfterViewInit{
    public cellValue: any;
  assignAction: any;
    constructor(
      private route: Router,
      public dialog: MatDialog,
      private router:Router,
      private _rbackService:RbacMasterService,
    ) {

    }
  
    ngOnInit(): void {}

    ngAfterViewInit(): void {
      setTimeout(()=>{
        this.assignAction = this._rbackService.accessAssignAction();
      },0);
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
  
    onCellClicked(e:any){
      e.stopPropagation()
      const dialogRef = this.dialog.open(PurchaseOrderComponent, { width: '400px', data: { cellData: this.cellValue} });
      dialogRef.afterClosed().subscribe((result:any) => {
        
      })
    }
  
    navigateToPO(){
      this.router.navigate(['master/itticket/purchase-inventory/purchase-order/create-PO'], { queryParams: { pr_id: this.cellValue.procurement_product_id }})
    }
}
