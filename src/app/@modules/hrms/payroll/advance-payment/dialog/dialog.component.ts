import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HrServiceService } from 'src/app/@shared/services/hr-service.service';
@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent {
  singleHolidayData: any;
  ad_id: any;
  emp_ad_details: any;
  installment_month: any;
  constructor(private hrService: HrServiceService, private toast: ToastrService,
    private activeroute: ActivatedRoute,public dialog: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,){
      this.ad_id = this.data.id;
    }
  ngOnInit(): void {
    if (this.ad_id) {
      console.log(this.ad_id,"emp_id");
     this.hrService.getById_AdvPayment(this.ad_id).subscribe((res: any) => {
       this.emp_ad_details = res.data
       this.installment_month = res.data.installment_data
       ;
     })
   } else {
     
   }
 }
}