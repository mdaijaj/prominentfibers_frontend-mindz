import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ICellRendererParams, Logger } from 'ag-grid-community';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { LmsServiceService } from 'src/app/@shared/services/lms-service.service';
import { RbacMasterService } from 'src/app/@shared/services/rbac-master.service';
import { SalesRequestService } from 'src/app/@shared/services/salesrequest/sales-request.service';

@Component({
  selector: 'app-action',
  templateUrl: './action.component.html',
  styleUrls: ['./action.component.scss']
})
export class ActionComponent  {
  docID: any
  isChecked = false;
  getFormData: any
  downloadData: any
  achieveId: any;
  checkedActive: any;
  checkedInActive: any;
  checkedAuther: any;
  window: any;
  checked: any;
  checkBox: any;
  assignAction: any;
  salesRequestID: any;
  salesRequestData: any;

  constructor(private route: Router, 
   private salesRequest_:SalesRequestService,
    private _rbackService: RbacMasterService,
    public dialog: MatDialog, private toast: ToastrService, private _lmsService: LmsServiceService) {
  }

  ngOnInit(): void {
    
    // this.downloadAll();

  };
  ngAfterViewInit(): void {
    setTimeout(() => {
      this.assignAction = this._rbackService.accessAssignAction();
      console.log(this.assignAction, "assign");
    }, 0);
  };
  reloadCurrentRoute() {
    let currentUrl = this.route.url;
    this.route.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.route.navigate([currentUrl]);
    });
  }
  public cellValue: any;

  agInit(params: ICellRendererParams): void {
    this.cellValue = this.getValueToDisplay(params);
    
  }
  getValueToDisplay(params: ICellRendererParams) {
    
    this.checkBox = params.data.isChecked;
    
    if (this.checkBox === true) {
      this.isChecked = true;
    } else {
      this.isChecked = false;
    }
    this.salesRequestID=params.data.sales_request?.sales_request_id;
    return params.data.sales_request?.sales_request_id;
  }

  refresh(params: ICellRendererParams): boolean {
    // set value into cell again
    
    this.cellValue = this.getValueToDisplay(params);
    return true;
  }

  edit(e: any) {
    e.stopPropagation();
    console.log(this.salesRequestID,"ididid");
    
    
    // 
    this.route.navigate(['master/audit/audit-management/sales-request/bookauditor'],
      { queryParams: { SR_id: this.cellValue } }
    )
    this.salesRequest_.getbyID_SalesRequest(this.salesRequestID).subscribe(
      (res: any) => {
        this.salesRequestData = res.data;
        console.log(this.salesRequestData,"salesReq data");
        
      })
  }

  delete(e: any) {
    e.stopPropagation();
    

  }
  toggle(e: any, isChecked: boolean) {
    e.stopPropagation();
    
    // let checked =isChecked;
    

    if (isChecked) {
      this.checkedActive = 'ACTIVE';

      
      // 
    } else {
      this.checkedActive = 'INACTIVE';
      
      // 
    }

    let body = {
      status: this.checkedActive,
      isChecked: isChecked,
    }
    
    if (this.checkBox === true) {
      this._lmsService.delete(this.cellValue, body).subscribe((res: any) => {
        this.checkedAuther = res;
        this.toast.success("Auther data successfully Inactivate")
      })
      this.reloadCurrentRoute();
    } else {
      this._lmsService.delete(this.cellValue, body).subscribe((res: any) => {
        this.checkedAuther = res;
        this.toast.success("Auther data successfully activate")
        

      })
      this.reloadCurrentRoute();
    }

  }
  openDialog() {
    // const dialogRef
    //   = this.dialog.open(AutherViewComponent, {
    //     width: '30%',
    //     // maxWidth: '100vw',
    //     // maxHeight: '100vh',
    //     // height: '100%',
    //     // panelClass: 'full-screen-modal',
    //     data: { id: this.cellValue }
    //   });
    // dialogRef.afterClosed().subscribe(result => {
      
    // });
  }


}

