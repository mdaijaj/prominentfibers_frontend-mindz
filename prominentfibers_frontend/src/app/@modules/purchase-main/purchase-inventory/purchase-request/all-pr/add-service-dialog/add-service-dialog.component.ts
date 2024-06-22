import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { PurchaseRequestService } from 'src/app/@shared/services/purchase-request.service';

@Component({
  selector: 'app-add-service-dialog',
  templateUrl: './add-service-dialog.component.html',
  styleUrls: ['./add-service-dialog.component.scss']
})
export class AddServiceDialogComponent {
  cellData: any;
  all_prod_data: any;
  selectService: any=[];
  cat_id: any;
  getCat_data: any;
  quantity:number;
  filteredData:any
  constructor(public dialog: MatDialogRef<AddServiceDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private prService: PurchaseRequestService) {
    this.cellData = this.data.cellData;
    
  }

  ngOnInit(){
    this.prService.getAllServiceMaster().subscribe((res:any)=>{
      this.all_prod_data= res.data;
      this.filteredData  = this.all_prod_data;
      this.all_prod_data.forEach((pro:any) =>{
        pro['quantity'] = this.quantity
      });
    })

    this.prService.getAllServiceCategory().subscribe((res:any)=>{
      this.getCat_data= res.data;
      console.log(this.getCat_data, "service");
      
    })
  }

  checkboxClicked(e:any,data:any){
    if(e.target.checked){
      this.selectService.push(data)
    }else{
      let index = this.selectService.findIndex((a:any)=> a.service_id === data.service_id)
      this.selectService.splice(index,1)
    }
    console.log(this.selectService);
    
  }

  closeDialog() {
   this.dialog.close(this.selectService);
}

  onQuntity(e:any){
    ["e", "E", "+", "-"].includes(e.key) && e.preventDefault()
  }

  selectCateGory(e:any){
    this.cat_id = e.value;
    if (this.cat_id == null || undefined){
      this.filteredData  = this.all_prod_data;
    }else{
      this.filteredData  = this.all_prod_data.filter((res:any) => res.service_category_id == this.cat_id);
    } 
  }

  // getCategoryIdBy(){
  //   let id =  this.cat_id;
  //     this.prService.getCategoryIdBy(id).subscribe((res:any)=>{
  //       this.all_prod_data= res.data;
  //     })
  // }

}
