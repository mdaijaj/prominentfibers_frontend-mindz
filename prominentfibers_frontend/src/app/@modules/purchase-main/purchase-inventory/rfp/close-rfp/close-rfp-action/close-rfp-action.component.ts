import { AfterViewInit, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { GridApi, ICellRendererParams } from 'ag-grid-community';
import { CloseRfpExtendDateComponent } from '../close-rfp-extend-date/close-rfp-extend-date.component';
import { PurchaseRequestService } from 'src/app/@shared/services/purchase-request.service';
import { ToastrService } from 'ngx-toastr';
import { DataUpdateService } from 'src/app/@shared/services/data-update.service';
import { RbacMasterService } from 'src/app/@shared/services/rbac-master.service';

@Component({
  selector: 'app-close-rfp-action',
  templateUrl: './close-rfp-action.component.html',
  styleUrls: ['./close-rfp-action.component.scss']
})
export class CloseRfpActionComponent implements OnInit, AfterViewInit{
  assignAction: any;
  // private gridApi!: GridApi;
  constructor(
    private route: Router,
    public dialog: MatDialog,
    private router:Router,
    private prService: PurchaseRequestService,
    private toastr:ToastrService,
    private updateTableData:DataUpdateService,
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

  // onCellClicked(e:any){
  //   
  //   e.stopPropagation()
  //   const dialogRef = this.dialog.open(ToBeAppDilogComponent, { width: '400px', data: { cellData: this.cellValue.data} });
  //   dialogRef.afterClosed().subscribe(result => {
  //     
  //   })
  // }

  proceedToApp(e:any) {
    e.stopPropagation();
    
    this.router.navigate(['master/itticket/purchase-inventory/purchase-request/all-pr-list/create-pr'], { queryParams: { pr_id: this.cellValue.data.procurement_product_id, status:  'to_be_app'}})
  }

  extendDate(e:any){
    
    this.prService.procurementProductId.next(this.cellValue.data.procurement_product_id)
    const dialogRef = this.dialog.open(CloseRfpExtendDateComponent, { width: '450px', data: { cellData: e.data} });
    dialogRef.afterClosed().subscribe(result => {
      
    })
  };

  navigateToQuotation() {
    this.router.navigate(['master/purchase-main/rfp/live-rfp/quotation-details'], { queryParams: { pr_id: this.cellValue.data.procurement_product_id } })
  }

  deleteRfp(){
    
    let id = this.cellValue.data.procurement_product_id;
    let data ={
      status: "INACTIVE"
    }
     this.prService.deleteLiveRfp(id,data).subscribe((res:any) => {
        if(res && res.code == 200){
          this.toastr.success('RFP deleted successfully.')
          this.getAllCloseRfpData()
        }
     },err =>{
        this.toastr.error('Something went wrong')
     })
  }

  getAllCloseRfpData(){
    this.prService.getAllCloseRfp().subscribe((res:any)=>{
      const rowData = res;
      this.updateTableData.setTableData(rowData)
      })
  }

}
