import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { GrnServiceService } from '../grnService/grn-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { PoActionComponent } from '../po-action/po-action.component';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { is } from 'date-fns/locale';

@Component({
  selector: 'app-po-list-details',
  templateUrl: './po-list-details.component.html',
  styleUrls: ['./po-list-details.component.scss']
})
export class PoListDetailsComponent   implements OnInit {
  POformGroup:FormGroup;
  submitBtn:boolean=false;
  imageToUpload:any;
imagePath: any;
  constructor(public _location:Location,private _GrnService:GrnServiceService,
    private _ActiveRoute:ActivatedRoute,
    private _fb:FormBuilder ,public dialog: MatDialog,private _toasterService:ToastrService,private router:Router
    ){
    this.POformGroup=_fb.group({
      po_number:new FormControl(),
      po_date:new FormControl(),
      po_type:new FormControl(),
      invoice_no:new FormControl(),
      invoice_date:new FormControl(),
      image:new FormControl(),
      grnItem : new FormArray([
        new FormGroup({
          item_cat:new FormControl(),
          item_name:new FormControl(),
          manage_by:new FormControl(),
          item_code:new FormControl(),
          po_qty:new FormControl(),
          rcvd_qty:new FormControl(),
          reject_qty:new FormControl(),
        }),
      ]),
    })

 
  }
  get GrnDataItem() {
    return this.POformGroup.get('grnItem') as FormArray;
  }
  grnDataAllItems:any;
  po_id:any
  ngOnInit(): void {
    this._ActiveRoute.queryParams.subscribe((res:any)=>{
      this.po_id=res.po_id
      if(res.po_id){
        this._GrnService.getPoListById(res.po_id).subscribe((response:any)=>{  
          this.grnDataAllItems=response.data.po_item_details
          console.log( this.grnDataAllItems,' this.grnDataAllItems');
          
          const isValid = this.grnDataAllItems.every((item:any) => {
            const itemMaster = item.ItemMaster;
            return (
              itemMaster &&
              itemMaster.hasOwnProperty('receiveQty') &&
              itemMaster.hasOwnProperty('rejectQty') &&
              itemMaster.hasOwnProperty('rejectedCount') 
               
            );
          });
          console.log(isValid,'isValid');
          
          if(isValid){
            this.submitBtn=true;
          }else{
            this.submitBtn=false;

          }
          if(response){
            this.POformGroup.patchValue({
              po_number:response?.data?.po_number,
              po_date:moment(response.data.po_date).format('DD-MM-YYYY'),
              po_type:response?.data?.po_type ,
            })
          }
          
            for(let i =0;i<this.grnDataAllItems.length;i++){ 
               
              const formGroup = this.GrnDataItem.at(i) as FormGroup;
              
              if (formGroup) {
              if(this.grnDataAllItems[i].ItemMaster.manage_by === 'S.No. Only')
                {
                  formGroup.get('reject_qty')?.disable();
                }
               
                formGroup.patchValue({
                  item_id:this.grnDataAllItems[i].ItemMaster.id,
                  manage_by:this.grnDataAllItems[i].ItemMaster?.manage_by,
                  item_cat:this.grnDataAllItems[i].ItemMaster?.asset_category.asset_category_name,
                  item_name:this.grnDataAllItems[i].ItemMaster?.item_name,
                  item_code:this.grnDataAllItems[i].ItemMaster?.item_code,
                  po_qty:this.grnDataAllItems[i].item_quantity,
                  rcvd_qty:this.grnDataAllItems[i].ItemMaster.receiveQty,
                  reject_qty: this.grnDataAllItems[i].ItemMaster.manage_by === 'S.No. Only'
                    ? this.grnDataAllItems[i].ItemMaster.rejectedCount
                    : this.grnDataAllItems[i].ItemMaster.rejectQty,
                });
                
              } 
            else {
              this.GrnDataItem.push(
                this._fb.group({
                  item_id:this.grnDataAllItems[i]?.ItemMaster?.id,
                  manage_by:this.grnDataAllItems[i]?.ItemMaster?.manage_by,
                  item_cat:this.grnDataAllItems[i]?.ItemMaster?.asset_category?.asset_category_name,
                  item_name:this.grnDataAllItems[i]?.ItemMaster?.item_name,
                  item_code:this.grnDataAllItems[i]?.ItemMaster?.item_code,
                  po_qty:this.grnDataAllItems[i]?.item_quantity,
                  rcvd_qty:this.grnDataAllItems[i].ItemMaster.receiveQty,
                  reject_qty:this.grnDataAllItems[i].ItemMaster.manage_by === 'S.No. Only'
                    ? this.grnDataAllItems[i].ItemMaster.rejectedCount
                    : this.grnDataAllItems[i].ItemMaster.rejectQty,
                }));
                 
            }
                
            }
             
             
          });
          
      
      }
    
    })

  
     

  }
  goBack(){
    this._location.back();
  }
  openPopUp(data:any,event:any){
     
    if(data.value.rcvd_qty === undefined ||  data.value.rcvd_qty === null ){
      this._toasterService.error('Rcvd Qty and Reject Qty should not be blank !!', 'Error Message');
  }
  else if(+data.value.rcvd_qty > data.value.po_qty){
      this._toasterService.error('Rcvd Qty should be less than Po Qty !!', 'Error Msg');
  }
  else if(+data.value.reject_qty > data.value.rcvd_qty){
      this._toasterService.error('Reject Qty should be less than Rcvd Qty !!', 'Error Msg');
  }
  //  else if(data.value.rcvd_qty > data.value.po_qty){
  //     this._toasterService.error('Rcvd Qty should be less than Po Qty !!','Error Msg')

  //     }
  //     else if( data.value.reject_qty > data.value.rcvd_qty){
  //       this._toasterService.error('Reject Qty should be less than Rcvd Qty !!','Error Msg')
  
  //       }
else {
  this.grnDataAllItems.map((res:any)=>{
    if(res.ItemMaster.item_name==data.value.item_name){
      const dialogRef = this.dialog.open(PoActionComponent, {
         data: { item_id: res,formData: data.value},
         width: '600px',
       });
     
       dialogRef.afterClosed().subscribe((result:any) => {
         
       });

    }
  })
 }   
  }

  onChange(e: any) {
    if (e.target.files && e.target.files[0]) {
      const data: FileList = e.target.files;
      this.imageToUpload = data.item(0) || null;
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imagePath = e.target.result;
      };
      reader.readAsDataURL(this.imageToUpload);
    }
   
  }
  onsubmitData(data:any){ 
     if(this.POformGroup.invalid){
        this._toasterService.error('All the field is required','Error Message')
        return
     }
     let items=this.grnDataAllItems?.map((res:any)=>({
      Item_Id:res.ItemMaster.id,
      receiveQty:res.ItemMaster.receiveQty,
      rejectQty:res.ItemMaster?.manage_by === 'S.No. Only'?res.ItemMaster.rejectQty
    :res.ItemMaster.rejectedCount
    }))
    console.log(items,'items');
    
     const formData=new FormData()
    formData.append('PO_Id',this.po_id)
    formData.append('invoiceNo',data.invoice_no)
    formData.append('invoiceDate',moment(data.invoice_date).format('YYYY-MM-DD'))
    formData.append('invoiceDoc',this.imageToUpload)
    formData.append('grnStatus','COMPLETE')
    formData.append('item',JSON.stringify(items))
    
     this._GrnService.createGrnData(formData).subscribe((response:any)=>{
      if(response){
        this._toasterService.success(response.message)
        this.router.navigate(['/master/purchase-main/grn'],{ queryParams: { status: 'Complete'}})
      }
     },(err:any)=>{
      this._toasterService.success(err.error.message)
     })
  }
  onsubmitPartial(data:any){
    if(this.POformGroup.invalid){
      this._toasterService.error('All the field is required','Error Message')
      return
   }
   let items=this.grnDataAllItems.map((res:any)=>({
    Item_Id:res.ItemMaster.id,
    receiveQty:res.ItemMaster.receiveQty,
    rejectQty:res.ItemMaster?.manage_by === 'S.No. Only'?res.ItemMaster?.rejectedCount:res.ItemMaster?.rejectQty
  }))
  console.log(items,'items');
  
   const formData=new FormData()
  formData.append('PO_Id',this.po_id)
  formData.append('invoiceNo',data.invoice_no)
  formData.append('invoiceDate',moment(data.invoice_date).format('YYYY-MM-DD'))
  formData.append('invoiceDoc',this.imageToUpload)
  formData.append('grnStatus','PARTIAL')
  formData.append('item',JSON.stringify(items))
  
   this._GrnService.createGrnData(formData).subscribe((response:any)=>{
    if(response){
      this._toasterService.success(response.message)
      this.router.navigate(['/master/purchase-main/grn'],{ queryParams: { status: 'Partial'}})
    }
   },(err:any)=>{
    this._toasterService.success(err.error.message)
   })
  }
 
  getGrnData(data:any){
    console.log(data,'mydata');
    
  }

  close(){
    this.router.navigate(['/master/purchase-main/grn'])
  }

}
