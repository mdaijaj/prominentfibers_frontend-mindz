import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { PurchaseRequestService } from 'src/app/@shared/services/purchase-request.service';
import * as moment from 'moment';
import { Router } from '@angular/router';
import { DataUpdateService } from 'src/app/@shared/services/data-update.service';

@Component({
  selector: 'app-extend-pr-date',
  templateUrl: './extend-pr-date.component.html',
  styleUrls: ['./extend-pr-date.component.scss']
})
export class ExtendPrDateComponent implements OnInit{

  extendDateForm:FormGroup;
  procurement_product_id:any;
  currentDate:Date = new Date()
constructor( 
  private fb:FormBuilder,
  private route: Router,
  private toast: ToastrService,
  private prService: PurchaseRequestService,
  private updateTableData:DataUpdateService
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
  const selectedDate = moment(val.end_date);
  const currentDate = moment(this.currentDate);
  
  // if(selectedDate.isAfter(currentDate)){
  //   console.log('Selected date is grater');
  // }else 
  if(selectedDate.isBefore(currentDate)){
    this.toast.error('Selected Date should not be smaller than current date','Valid Date Error');
    return;
  }
  var outDate = moment(val.end_date).format("YYYY-MM-DD");

  let dateData ={
    end_date:outDate
  }
   this.prService.procurementProductId.subscribe((res:any) =>{
    this.procurement_product_id = res;
  });

  
  
  if(this.procurement_product_id != null || this.procurement_product_id != undefined){
    this.prService.updateExtendDate(this.procurement_product_id,dateData).subscribe((res:any) =>{
      if(res && res.code == 200){
        this.toast.success('Date Updated successfully.');
        this.getAllLiveRfpData();
      }
   },err =>{
      this.toast.error('Something went wrong')
   })
  }
}

getAllLiveRfpData(){
  this.prService.getAllLiveRfp().subscribe((res:any)=>{
    const rowData = res;
    this.updateTableData.setTableData(rowData)
    })
}


}
