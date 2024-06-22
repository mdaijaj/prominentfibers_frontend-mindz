import { AfterViewInit, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ICellRendererParams } from 'ag-grid-community';
import { PurchaseOrderComponent } from '../purchase-order/purchase-order.component';
import { RbacMasterService } from 'src/app/@shared/services/rbac-master.service';

@Component({
  selector: 'app-puchase-order-action',
  templateUrl: './puchase-order-action.component.html',
  styleUrls: ['./puchase-order-action.component.scss']
})
export class PuchaseOrderActionComponent implements OnInit , AfterViewInit{
    assignAction: any;
    constructor(
      private route: Router,
      public dialog: MatDialog,
      private router:Router,
      private _rbackService:RbacMasterService,
    ) {
      // this.data = localStorage.getItem("jobId");
      // 
      
    }
  
    ngOnInit(): void {}

    ngAfterViewInit(): void {
      setTimeout(()=>{
        this.assignAction = this._rbackService.accessAssignAction();
      },0);  
    }
    public cellValue: any;
  
    agInit(params: ICellRendererParams): void {
      this.cellValue = params
      
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
      const dialogRef = this.dialog.open(PurchaseOrderComponent, { width: '500px', data: { cellData: this.cellValue.data} });
      dialogRef.afterClosed().subscribe(result => {
      })
    }

    navigateToPO(){
      this.router.navigate(['master/itticket/purchase-inventory/purchase-order/create-PO'], { queryParams: { pr_id: this.cellValue.data.procurement_product_id }})
    }
}
