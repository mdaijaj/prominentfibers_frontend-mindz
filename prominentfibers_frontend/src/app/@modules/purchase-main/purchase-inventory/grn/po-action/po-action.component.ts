import { Component, Inject, OnInit } from '@angular/core';
import { GrnServiceService } from '../grnService/grn-service.service';
import { PoListDetailsComponent } from '../po-list-details/po-list-details.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import * as moment from 'moment';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

 

@Component({
  selector: 'app-po-action',
  templateUrl: './po-action.component.html',
  styleUrls: ['./po-action.component.scss']
})
export class PoActionComponent implements OnInit {
   batachSerialform:FormGroup
  constructor(private _GrnService:GrnServiceService,public dialog: MatDialogRef<PoListDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,private _fb:FormBuilder,private toasterService:ToastrService,private route:Router,private _active:ActivatedRoute,private _location:Location){
      this.batachSerialform=_fb.group({
        batchNo:new FormControl(),
        batchType:new FormControl(),
        expiryDate:new FormControl(),
        po_item_id:new FormControl(),
        serialNoData : new FormArray([
          new FormGroup({
            Item_name: new FormControl(this.data.formData.item_name),
            itemSerialNo: new FormControl(),
            itemStatus: new FormControl(),
            Item_Id: new FormControl(this.data.item_id.item_id),
            po_item_id: new FormControl(this.data.item_id.po_item_id),
          }),
        ]),
      })

  
    }
    get itemsFormArray() {
      return this.batachSerialform.get('serialNoData') as FormArray;
    }
  po_id:any
 rcvd_qty:number=0;
 getAllGrnItems:any;
 grn_item_id:any;
ngOnInit(): void {
  this._active.queryParams.subscribe((res:any)=>{
    this.po_id=res.po_id
  })
  this.rcvd_qty=+this.data.formData.rcvd_qty;
  for (let i = 0; i < this.rcvd_qty-1; i++) {
    let data= this._fb.group({
      Item_name: new FormControl(this.data.formData.item_name),
      itemSerialNo: new FormControl(),
      itemStatus: new FormControl(),
      Item_Id: new FormControl(this.data.item_id.item_id),
     po_item_id: new FormControl(this.data.item_id.po_item_id),
    });
    this.itemsFormArray.push(data); 
}
console.log(this.data,'itemdata');
console.log(this.data.formData,'formData');
if(this.data.item_id.po_item_id){
this._GrnService.createCode(this.data.item_id.po_item_id).subscribe((response:any)=>{
  // console.log(response,'response');
  this.batachSerialform.patchValue({
    batchNo:response.data.batchNo
  })
})
}

if(this.data.item_id.ItemMaster.receiveQty!=null || this.data.item_id.ItemMaster.rejectQty!=null || this.data.item_id.ItemMaster.rejectedCount!=null)
{
  this._GrnService.getByIdItem(this.data.item_id.po_item_id).subscribe((resp:any)=>{
    this.getAllGrnItems=resp.data.grn_items[0].grn_item_statuses;
    this.grn_item_id=resp.data.grn_items[0].grn_item_id
    console.log(resp.data.grn_items);
    this.batachSerialform.patchValue({
      batchNo:resp.data.grn_items[0].grn_item_statuses[0].batchNo,
      expiryDate:resp.data.grn_items[0].grn_item_statuses[0].expiryDate
    })
    for(let i =0;i<this.getAllGrnItems.length;i++){ 
      const formGroup = this.itemsFormArray.at(i) as FormGroup;
    if (formGroup) {
        formGroup.patchValue({
          itemStatus:this.getAllGrnItems[i]. itemStatus ,
          itemSerialNo:this.getAllGrnItems[i].itemSerialNo,
        });
         
      } 
    else {
      this.itemsFormArray.push(
        this._fb.group({
          itemStatus:this.getAllGrnItems[i]. itemStatus ,
          itemSerialNo:this.getAllGrnItems[i]?.itemSerialNo, 
        }));
    }
        
    }
     
  })
  
}
}

ngSubmitData(mydata:any){
if(this.data.item_id.ItemMaster.receiveQty!=null || this.data.item_id.ItemMaster.rejectQty!=null || this.data.item_id.ItemMaster.rejectedCount!=null){
  let data={
    receiveQty:this.data.formData.rcvd_qty, 
   rejectQty:this.data.formData.reject_qty,
  batchType:this.data.item_id.ItemMaster.manage_by,
  batchNo:mydata.value.batchNo,
  expiryDate:moment(mydata.value.expiryDate).format('YYYY-MM-DD'),
  po_item_id:this.data.item_id.po_item_id,
  item:mydata.value.serialNoData
}
this._GrnService.updateGrnItem(this.grn_item_id,data).subscribe((response:any)=>{
  if(response){
    this.toasterService.success(response.message)
    this.reloadCurrentRoute()
    this.dialog.close()
     

  }
 },(err:any)=>{
  this.toasterService.error(err.error.message)
 })
     
}
else{


  if(this.data.item_id.ItemMaster.manage_by=='S.No. Only')
  {
    let data={
        receiveQty:this.data.formData.rcvd_qty, 
       rejectQty:this.data.formData.reject_qty,
      batchType:this.data.item_id.ItemMaster.manage_by,
      batchNo:mydata.value.batchNo,
      expiryDate:moment(mydata.value.expiryDate).format('YYYY-MM-DD'),
      po_item_id:this.data.item_id.po_item_id,
      item:mydata.value.serialNoData
    }
     
    this._GrnService.createGrnItem(data).subscribe((response:any)=>{
      if(response){
        this.toasterService.success(response.message)
        this.reloadCurrentRoute()
        this.dialog.close()
        setTimeout(() => {
          this._location.back()
        }, 100);
         
      }
     },(err:any)=>{
      this.toasterService.error(err.error.message)
     }) 
  }
  else{
    let data={
      receiveQty:this.data.formData.rcvd_qty, 
      rejectQty:this.data.formData.reject_qty,
      batchType:this.data.item_id.ItemMaster.manage_by,
      batchNo:mydata.value.batchNo,
      expiryDate:moment(mydata.value.expiryDate).format('YYYY-MM-DD'),
      po_item_id:this.data.item_id.po_item_id
    }
     this._GrnService.createGrnItem(data).subscribe((response:any)=>{
      if(response){
        this.toasterService.success(response.message)
         
        this.reloadCurrentRoute()
        this.dialog.close()
        setTimeout(() => {
          this._location.back()
        }, 100);
      }
     },(err:any)=>{
      this.toasterService.error(err.error.message)
     })  
       
  }
}
}
getPoListById(id:any)
{
  this._GrnService.getPoListById(id).subscribe((response:any)=>{
    return response;
  })
}

reloadCurrentRoute() {
  this.route.routeReuseStrategy.shouldReuseRoute = () => false;
  const currentUrl = this.route.url + '?'
  this.route.navigateByUrl(currentUrl).then(() => {
    this.route.navigated = false;
    this.route.navigate([this.route.url]);
  });
}








}


