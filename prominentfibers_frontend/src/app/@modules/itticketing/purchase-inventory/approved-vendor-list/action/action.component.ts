import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ICellRendererParams } from 'ag-grid-community';
import { RbacMasterService } from 'src/app/@shared/services/rbac-master.service';
import { VendorManagementService } from 'src/app/@shared/services/vendor-management.service';

@Component({
  selector: 'app-action',
  templateUrl: './action.component.html',
  styleUrls: ['./action.component.scss']
})
export class ActionApprovedComponent implements OnInit, AfterViewInit{
  cellValue: any;
  assignAction: any;
  constructor(private route: Router,
    private vendorService: VendorManagementService,
    private _rbackService:RbacMasterService,) {}
  ngOnInit(): void {
    
  }

  ngAfterViewInit(): void {
    setTimeout(()=>{
      this.assignAction = this._rbackService.accessAssignAction();
    },0);
  }

  agInit(params: ICellRendererParams): void {
    this.cellValue = this.getValueToDisplay(params);
    
  }
  getValueToDisplay(params: ICellRendererParams) {
    
    return params.valueFormatted ? params.valueFormatted : params.data.vendor_management_id;
  }

  edit(e:any){
    e.stopPropagation();
    this.route.navigate(['master/purchase-inventory/create-vender/basic-details'],
      { queryParams: { id: this.cellValue}})
      this.vendorService.setVendorId(Number(this.cellValue))
  }
}
