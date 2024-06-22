import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import * as moment from 'moment';
import { PurchaseRequestService } from 'src/app/@shared/services/purchase-request.service';

@Component({
  selector: 'app-rejected-dilog',
  templateUrl: './rejected-dilog.component.html',
  styleUrls: ['./rejected-dilog.component.scss']
})
export class RejectedDilogComponent {
  cellData: any;
  createDate: string;
  procurement_requests: any;
  constructor(public dialog: MatDialogRef<RejectedDilogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private prService: PurchaseRequestService) {


  }
  ngOnInit() {
    let data = {
      po_type: this.data.cellData.po_category_type
    }
    this.prService.getByIdPO(this.data.cellData.po_id, data).subscribe((res: any) => {
      this.cellData = res.data[0];
      console.log(res.data, 'ressss.data');

      this.procurement_requests = res.data[0]?.po_item_details || res.data[0]?.po_service_details;
      console.log(this.procurement_requests, 'this.procurement_requests');

      this.createDate = moment(new Date(this.cellData.createdAt)).format('LL');
    });
  }
}
