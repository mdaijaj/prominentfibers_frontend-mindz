import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { PurchaseRequestService } from 'src/app/@shared/services/purchase-request.service';

@Component({
  selector: 'app-add-product-dilog',
  templateUrl: './add-product-dilog.component.html',
  styleUrls: ['./add-product-dilog.component.scss']
})
export class AddProductDilogComponent {
  cellData: any;
  all_prod_data: any;
  selectItem: any=[];
  cat_id: any;
  getCat_data: any;
  quantity:number;
  filteredData:any
  constructor(public dialog: MatDialogRef<AddProductDilogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private prService: PurchaseRequestService) {
    this.cellData = this.data.cellData;
    
  }

  ngOnInit(){
    this.prService.getAllProd().subscribe((res:any)=>{
      this.all_prod_data= res.data;
      this.filteredData  = this.all_prod_data;
      this.all_prod_data.forEach((pro:any) =>{
        pro['quantity'] = this.quantity
      });
    })

    this.prService.getAllCategory().subscribe((res:any)=>{
      this.getCat_data= res.data;
    })
  }

  checkboxClicked(e:any,data:any){
    if(e.target.checked){
      this.selectItem.push(data)
    }else{
      let index = this.selectItem.findIndex((a:any)=> a.item_id === data.item_id)
      this.selectItem.splice(index,1)
    }
    console.log(this.selectItem);
    
  }

  closeDialog() {
   this.dialog.close(this.selectItem);
}

  onQuntity(e:any){
    ["e", "E", "+", "-"].includes(e.key) && e.preventDefault()
  }

  selectCateGory(e:any){
    this.cat_id = e.value;
    if (this.cat_id == null || undefined){
      this.filteredData  = this.all_prod_data;
    }else{
      this.filteredData  = this.all_prod_data.filter((res:any) => res.asset_id == this.cat_id);
    } 
  }

  // getCategoryIdBy(){
  //   let id =  this.cat_id;
  //     this.prService.getCategoryIdBy(id).subscribe((res:any)=>{
  //       this.all_prod_data= res.data;
  //     })
  // }

}

