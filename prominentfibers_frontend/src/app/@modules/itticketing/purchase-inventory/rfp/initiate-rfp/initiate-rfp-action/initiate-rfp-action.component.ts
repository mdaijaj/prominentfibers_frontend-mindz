import { AfterViewInit, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ICellRendererParams } from 'ag-grid-community';
import { RbacMasterService } from 'src/app/@shared/services/rbac-master.service';

@Component({
  selector: 'app-initiate-rfp-action',
  templateUrl: './initiate-rfp-action.component.html',
  styleUrls: ['./initiate-rfp-action.component.scss']
})
export class InitiateRfpActionComponent implements OnInit, AfterViewInit{
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

  ngOnInit(): void {};
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

  // onCellClicked(e:any){
  //   
  //   e.stopPropagation()
  //   const dialogRef = this.dialog.open(ToBeAppDilogComponent, { width: '400px', data: { cellData: this.cellValue.data} });
  //   dialogRef.afterClosed().subscribe(result => {
  //     
  //   })
  // }

  sendRfpLink(e:any) {
    e.stopPropagation();
    
    this.router.navigate(['master/itticket/purchase-inventory/rfp/initiate-rfp/send-rfp'], { queryParams: { pr_id: this.cellValue.data.procurement_product_id}})
  }
}
