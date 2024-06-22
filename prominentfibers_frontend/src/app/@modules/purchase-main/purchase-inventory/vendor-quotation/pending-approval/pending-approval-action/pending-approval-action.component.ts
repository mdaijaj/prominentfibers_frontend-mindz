import { AfterViewInit, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ICellRendererParams } from 'ag-grid-community';
import { RbacMasterService } from 'src/app/@shared/services/rbac-master.service';

@Component({
  selector: 'app-pending-approval-action',
  templateUrl: './pending-approval-action.component.html',
  styleUrls: ['./pending-approval-action.component.scss']
})
export class PendingApprovalActionComponent implements OnInit, AfterViewInit {
  
  commonId:any
  assignAction: any;
  constructor(
    private route: Router,
    public dialog: MatDialog,
    private router:Router,
    private _rbackService:RbacMasterService,
  ) {
  }


  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    setTimeout(()=>{
      this.assignAction = this._rbackService.accessAssignAction();
    },0); 
  }
  public cellValue: any;

  agInit(params: ICellRendererParams): void {
    this.cellValue = params

    if(this.cellValue != undefined){
        this.commonId = this.cellValue.data.procurement_product_id
    }   
    
  }
  getValueToDisplay(params: ICellRendererParams) {
    
    return params
  }
  refresh(params: ICellRendererParams): boolean {
    // set value into cell again
    
    this.cellValue = this.getValueToDisplay(params);
    return true;
  }

  sendRfpLink(e:any) {
    e.stopPropagation();
    
    this.router.navigate(['master/itticket/purchase-inventory/vendor-quotation/approve-process'], { queryParams: { pr_id: this.commonId}})
  }
}
