import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import * as moment from 'moment';
import { PurchaseRequestService } from 'src/app/@shared/services/purchase-request.service';
import { AllPrDilogComponent } from '../../../purchase-request/all-pr/all-pr-dilog/all-pr-dilog.component';

@Component({
  selector: 'app-rejected-quotation-view',
  templateUrl: './rejected-quotation-view.component.html',
  styleUrls: ['./rejected-quotation-view.component.scss']
})
export class RejectedQuotationViewComponent {
  cellData: any;
  createDate: any;
  constructor(public dialog: MatDialogRef<AllPrDilogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private prService: PurchaseRequestService) {
    this.cellData = this.data.cellData;
    this.createDate = moment(new Date(this.cellData.createdAt)).format('LL');

    
  }

  ngOnInit() {
  }
}
