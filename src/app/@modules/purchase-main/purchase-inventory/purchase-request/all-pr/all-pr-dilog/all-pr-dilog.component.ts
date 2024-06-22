import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import * as moment from 'moment';
import { PurchaseRequestService } from 'src/app/@shared/services/purchase-request.service';

@Component({
  selector: 'app-all-pr-dilog',
  templateUrl: './all-pr-dilog.component.html',
  styleUrls: ['./all-pr-dilog.component.scss']
})
export class AllPrDilogComponent {
  cellData: any;
  createDate: any;
  procurement_requests: any;
  constructor(public dialog: MatDialogRef<AllPrDilogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private prService: PurchaseRequestService) {
    
    


  }

  ngOnInit() {
    let data = {
      procurementId: this.data.cellData.procurement_id,
      PR_categories: this.data.cellData.PR_category
    }
    this.prService.getByIdPR(data).subscribe((res: any) => {
      this.cellData = res.data[0];
      console.log(res.data,'ressss.data');
      
      this.procurement_requests = res.data[0]?.procurement_item_requests || res.data[0]?.procurement_service_requests || res.data[0]?.procurement_BomItem_requests;
      console.log(this.procurement_requests,'this.procurement_requests');
      
      this.createDate = moment(new Date(this.cellData.createdAt)).format('LL');
    });
  }
}
