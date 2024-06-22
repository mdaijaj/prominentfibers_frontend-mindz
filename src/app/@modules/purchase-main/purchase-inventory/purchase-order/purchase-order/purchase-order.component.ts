import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import * as moment from 'moment';
import { PurchaseRequestService } from 'src/app/@shared/services/purchase-request.service';

@Component({
  selector: 'app-purchase-order',
  templateUrl: './purchase-order.component.html',
  styleUrls: ['./purchase-order.component.scss']
})
export class PurchaseOrderComponent {
  cellData: any;
  createDate: string;
  procurement_requests: any;
  constructor(public dialog: MatDialogRef<PurchaseOrderComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private prService: PurchaseRequestService) {
    // this.cellData = this.data.cellData;
    // this.createDate = moment(new Date(this.cellData.createdAt)).format('LL');
    
  }
  ngOnInit() {
    let data = {
      po_type: this.data.cellData.po_category_type
    }
    this.prService.getByIdPO(this.data.po_id?this.data.po_id:this.data.cellData.id,data).subscribe((res: any) => {
      this.cellData = res.data[0];
      console.log(res.data,'ressss.data');
      
      this.procurement_requests = res.data[0]?.po_item_details || res.data[0]?.po_service_details;
      console.log(this.procurement_requests,'this.procurement_requests');
      
      this.createDate = moment(new Date(this.cellData.createdAt)).format('LL');
    });
  }
}
