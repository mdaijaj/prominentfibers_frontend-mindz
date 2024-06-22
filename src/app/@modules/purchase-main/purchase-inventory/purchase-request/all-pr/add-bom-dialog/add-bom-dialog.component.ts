import { Component, Inject } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { PurchaseRequestService } from 'src/app/@shared/services/purchase-request.service';

@Component({
  selector: 'app-add-bom-dialog',
  templateUrl: './add-bom-dialog.component.html',
  styleUrls: ['./add-bom-dialog.component.scss']
})
export class AddBomDialogComponent {
  cellData: any;
  all_prod_data: any;
  selectService: any = [];
  cat_id: any;
  getCat_data: any;
  quantity: number;
  filteredData: any
  getAllBomData: { id: number; bomCategory: string; }[];
  productAll: any;
  varientAll: any;
  items: { service_id: number; service_code: string; service_name: string; service_description: string; MVP: string; service_document: string; status: string; isDeleted: boolean; createdAt: string; updatedAt: string; service_category_id: number; ServicesCategory: { id: number; service_category_code: string; service_category_name: string; service_category_description: string; status: string; isDeleted: boolean; createdAt: string; updatedAt: string; }; }[];
  itemData: any;
  bomForm: any;
  bomData: any;
  constructor(private toast:ToastrService, public dialog: MatDialogRef<AddBomDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private prService: PurchaseRequestService, private fb: FormBuilder) {
    this.cellData = this.data.cellData;

    this.bomForm = this.fb.group({
      bomCategory:new FormControl(null,[Validators.required]),
      product_name:new FormControl(null,[Validators.required]),
      varient:new FormControl(null,[Validators.required]),
      noOfBOM:new FormControl(null,[Validators.required])
})
  }

  ngOnInit() {
    this.prService.getAllServiceMaster().subscribe((res: any) => {
      this.all_prod_data = res.data;
      console.log(res,'ressss');
      
      this.filteredData = this.all_prod_data;
      this.all_prod_data.forEach((pro: any) => {
        pro['quantity'] = this.quantity
      });
    })

    this.prService.getAllServiceCategory().subscribe((res: any) => {
      this.getCat_data = res.data;
      console.log(this.getCat_data, "service");

    })

    this.getAllBom();
    
    this.items=[
      {
      service_code: "MC42OTUWMZ",
      service_id: 2,
        service_name: "sfsdfs",
        service_description: "sdfsdfsdfs",
        MVP: "34",
        service_document: "app/master/MasterDocuments/image-1705571475669.jpg",
        status: "ACTIVE",
        isDeleted: false,
        createdAt: "2024-01-08T12:55:59.000Z",
        updatedAt: "2024-01-11T05:27:32.000Z",
        service_category_id: 3,
        ServicesCategory: {
              id: 3,
              service_category_code: "MC4WMTM1OT",
              service_category_name: "test Category1ivsdsg",
              service_category_description: "ggggggggggggggggg",
              status: "ACTIVE",
              isDeleted: false,
              createdAt: "2024-01-13T05:04:41.000Z",
              updatedAt: "2024-01-13T05:04:41.000Z"
          }
      },
      {
          service_id: 1,
          service_code: "MC4YMDY4OT",
          service_name: "khjkh",
          service_description: "gtjhgj",
          MVP: "3",
          service_document: "app/master/MasterDocuments/image-1705571197358.png",
          status: "ACTIVE",
          isDeleted: false,
          createdAt: "2024-01-08T12:53:59.000Z",
          updatedAt: "2024-01-11T05:27:59.000Z",
          service_category_id: 2,
          ServicesCategory: {
              id: 2,
              service_category_code: "MC45ODIYOD",
              service_category_name: "jkkjkjkjkj",
              service_category_description: "jhkhkjkjkjk",
              status: "ACTIVE",
              isDeleted: false,
              createdAt: "2024-01-08T10:14:42.000Z",
              updatedAt: "2024-01-08T10:14:42.000Z"
          }
      }
  ]
  }

  getProductAllBom() {
    let data: any = {
      bom_type: this.cat_id
    }
    this.prService.getProductAllBom(data).subscribe((res: any) => {
      this.productAll = res.result;
      console.log(this.productAll, "productAll");

    })
  }

  selectVarient(e:any){
    console.log(e,'eeeee');
    let data={
      product_variant:e.value.product_variant
    }
   this.prService.getAllItemVerient(e.value.product_id,data).subscribe((res: any) => {
      this.itemData = res.data;
      
      console.log(res,'res');
      console.log(this.itemData, "itemData");

    })
  }
  checkboxClicked(e: any, data: any) {
    if (e.target.checked) {
      this.selectService.push(data)
    } else {
      let index = this.selectService.findIndex((a: any) => a.service_id === data.service_id)
      this.selectService.splice(index, 1)
    }
    console.log(this.selectService);

  }

  closeDialog() {

    if (this.bomForm.invalid) {
      this.toast.error('Required fields should not be empty', 'Fields Error');

      return;
    }
   this.bomData=this.bomForm.value;
    console.log(this.bomData,'valllll');
    
    this.dialog.close(this.bomData);
    // this.dialog.close(this.selectService);
  }

  onQuntity(e: any) {
    ["e", "E", "+", "-"].includes(e.key) && e.preventDefault()
  }

  selectCateGory(e: any) {
    console.log(e,'eees');
    
    if(e.value==1){
      this.cat_id="PRODUCTION"
    }else if(e.value==2){
      this.cat_id="PACKGING"

    }
    // this.cat_id = e.value;
    if (this.cat_id == null || undefined) {
      this.filteredData = this.all_prod_data;
    } else {
      this.filteredData = this.all_prod_data.filter((res: any) => res.service_category_id == this.cat_id);
    }
    this.getProductAllBom();
  }

  // getCategoryIdBy(){
  //   let id =  this.cat_id;
  //     this.prService.getCategoryIdBy(id).subscribe((res:any)=>{
  //       this.all_prod_data= res.data;
  //     })
  // }
  getAllBom() {
    let data = [
      { id: 1, bomCategory: 'PRODUCTION' },
      { id: 2, bomCategory: 'PACKGING' }
    ]
    console.log(data, 'data');
    this.getAllBomData = data;
  }

  selectProduct(e: any) {
    console.log(e, 'eeeeee');
    this.prService.getByVerient(e.value).subscribe((res: any) => {
      this.varientAll = res.productName;
      console.log(this.varientAll, "varientAll");

    })
  }
  getByVerient() {
    // this.prService.getProductAllBom(id).subscribe((res:any)=>{
    //   this.productAll= res.result;
    //   console.log(this.productAll, "productAll");

    // })
  }
}
