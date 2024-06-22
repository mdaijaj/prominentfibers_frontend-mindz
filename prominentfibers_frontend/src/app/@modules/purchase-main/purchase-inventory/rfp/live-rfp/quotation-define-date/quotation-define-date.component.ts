import { Component, Inject } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { PurchaseRequestService } from 'src/app/@shared/services/purchase-request.service';

@Component({
  selector: 'app-quotation-define-date',
  templateUrl: './quotation-define-date.component.html',
  styleUrls: ['./quotation-define-date.component.scss']
})
export class QuotationDefineDateComponent {
  extendDateForm:FormGroup;
  quotation_id:any
constructor( 
  private fb:FormBuilder,
  private toast: ToastrService,
  private route:Router,
  private prService: PurchaseRequestService,
  public dialog: MatDialogRef<QuotationDefineDateComponent>,
  @Inject(MAT_DIALOG_DATA) public data: any,
  ){
this.extendDateForm = this.fb.group({
  end_date: new FormControl(null, [Validators.required]),
});

}

ngOnInit(): void {

}

private queryParamString(params: any): string {
  return Object.keys(params)
    .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`) .join('&');
}

sendNegotiationLink(){
  
  if (this.extendDateForm.invalid) {
    this.toast.error('Required fields should not be empty', 'Fields Error');
    return;
  }
  let val = this.extendDateForm.value
  let outDate = moment(val.end_date).format("YYYY-MM-DD");
  const route = window.location.origin + '/send-rfp-link';
  let ParamsDate = btoa(outDate);
  const params = {validDate:ParamsDate,pr_id : this.data.procurement_product_id,role:'Negotiation',vendorId:0};
  const routeWithParams = `${route}?${this.queryParamString(params)}`;

  let formData =new FormData();
  let vandors = JSON.stringify(this.data.vendors);
  formData.append( `site_url`,routeWithParams );
  formData.append("end_date", outDate);
  formData.append(`vendors`, vandors);
  formData.append(`vendors_invited_count`, this.data.vendors_invited_count);

   this.prService.procurementProductId.subscribe((res:any) =>{
    this.quotation_id = res;
  });

  
  
  if(this.quotation_id != null || this.quotation_id != undefined){
    this.prService.sendRfpLink(formData).subscribe((res:any) =>{
      if(res.code == 200){
        this.toast.success('Link send successfully');
        this.route.navigateByUrl('master/itticket/purchase-inventory/rfp/live-rfp')
      }
    })
  }

}
}
