import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { PurchaseRequestService } from 'src/app/@shared/services/purchase-request.service';

@Component({
  selector: 'app-close-rfp-extend-date',
  templateUrl: './close-rfp-extend-date.component.html',
  styleUrls: ['./close-rfp-extend-date.component.scss']
})
export class CloseRfpExtendDateComponent implements OnInit{
  extendDateForm:FormGroup;
  procurement_product_id:any
constructor( 
  private fb:FormBuilder,
  private toast: ToastrService,
  private prService: PurchaseRequestService,
  ){
this.extendDateForm = this.fb.group({
  end_date: new FormControl(null, [Validators.required]),
});
}

ngOnInit(): void {
  
}

updateDate(){
  
  if (this.extendDateForm.invalid) {
    this.toast.error('Required fields should not be empty', 'Fields Error');
    
    return;
  }
  let val = this.extendDateForm.value
  let outDate = moment(val.end_date).format("YYYY-MM-DD");
  
  let formData =new FormData();
  formData.append("end_date", outDate);

   this.prService.procurementProductId.subscribe((res:any) =>{
    
    this.procurement_product_id = res;
  });

  
  
  if(this.procurement_product_id != null || this.procurement_product_id != undefined){
    this.prService.updateExtendDate(this.procurement_product_id,formData).subscribe(res =>{
      
      
    })
  }

}

}
