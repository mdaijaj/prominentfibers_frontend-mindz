import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import * as moment from 'moment';

@Component({
  selector: 'app-purchase-order',
  templateUrl: './purchase-order.component.html',
  styleUrls: ['./purchase-order.component.scss']
})
export class PurchaseOrderComponent {
  cellData: any;
  createDate: string;
  constructor(public dialog: MatDialogRef<PurchaseOrderComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,) {
    this.cellData = this.data.cellData;
    this.createDate = moment(new Date(this.cellData.createdAt)).format('LL');
    
  }
}
