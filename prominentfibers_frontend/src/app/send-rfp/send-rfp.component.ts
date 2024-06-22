import { Component } from '@angular/core';
import { FormBuilder, FormControl, Validators, FormArray, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { PurchaseRequestService } from '../@shared/services/purchase-request.service';
import Swal from 'sweetalert2';
import { ConfigurationalmasterService } from '../@shared/services/configurationalmaster.service';
import * as moment from 'moment';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-send-rfp',
  templateUrl: './send-rfp.component.html',
  styleUrls: ['./send-rfp.component.scss']
})
export class SendRfpComponent {
  createPrForm: any;
  imageToUpload: any;
  imagePath: any;
  editDocData: any;
  vendorData: any;
  noOfVendor: any;
  id: any;
  singlePrData: any;
  sendRfpData: any;
  endData: any;
 
  currencyData: any;
  vendorId:any;
  role:any;
  previousQuoteData:any
  rfp_no: any;
  details_pr:any
  procurement_requests: any;
  sgstDisabled: boolean=false;

  CF_3: any;
  someCondition:boolean=false;
  totleCgstIgst: any;
  totelIgst: any;
  totelAmount: any;
  totalAmountPrice: any;
  fileBind: string;
  allArrayData: any;
  rfpNo: any;
  vendor_id: any;
  type_pr: any;
  constructor(private route: Router,
    private toast: ToastrService,
    private activeroute: ActivatedRoute,
    public dialog: MatDialog,
    private fb: FormBuilder,
    private prService: PurchaseRequestService,
    private configurationalMasterService: ConfigurationalmasterService,
  ) {
    this.createPrForm = this.fb.group({
      name: new FormControl(null),
      department: new FormControl(null),
      emp_id: new FormControl(null),
      alldata: new FormArray([]),
      location: new FormControl(null, [Validators.required]),
      state: new FormControl(null, [Validators.required]),
      pin: new FormControl(null, [Validators.required]),
      end_date: new FormControl(null, [Validators.required]),
      invite_no_vendor: new FormControl(null, [Validators.required]),
      delivery_address: new FormControl(null, [Validators.required]),
      file: new FormControl(null, [Validators.required]),
      vendors: new FormControl(null, [Validators.required]),
      
      vendor_remarks: new FormControl(null, [Validators.required]),
      vendor_uploaded_document: new FormControl(null, [Validators.required]),
      // rfpArray: new FormArray([
      //   new FormGroup({
      //     price_amt: new FormControl(null),
      // sgst: new FormControl(null),
      // cgst: new FormControl(null),
      // igst: new FormControl(null),
      // delivery_charges: new FormControl(null),
      // additional_charges: new FormControl(null),
      // currency: new FormControl(null),
      // gst_Type:new FormControl(null)
      //   }),
      // ])
    });
    this.CF_3 = this.fb.group({
      rfpArray: this.fb.array([])
    });
    // this.createPrForm = this.fb.group({
     
    // })

  }
  expirationDate: Date;
  currentDate: Date = new Date();
  linkExpired:boolean=false;
  get rfpArray(): FormArray {
    return this.createPrForm.get('rfpArray') as FormArray;
  }
  // get CF_3(): any {
  //   return this.createPrForm.controls;
  // }
  ngOnInit(): void {
    this.activeroute.queryParams.subscribe((params: any) => {
      console.log(params,'paramssss');
      this.rfp_no=`${params.Rfp_no},${params.vendor_id}`;
      this.rfpNo=params.Rfp_no;
      this.vendor_id=params.vendor_id;
      this.type_pr=params.type
      console.log(this.rfp_no,'this.rfp_no');
      
      this.vendorId=params.vendor_id;

      if(params.type=="Bom"){
      this.getByBomLink();
      }else if(params.type=="Service"){
      this.getByRfpServiceLink()
      }
      else{
         this.getByRfpLink();
      }
      this.id = params.pr_id;
      this.role = params.role;
      let expDate = params.validDate
      let decode = atob(expDate);
      this.expirationDate = new Date(decode);
      this.expirationDate.setHours(23,59,59,59)
      if (this.currentDate > this.expirationDate) {
        this.linkExpired = true
        this.toast.error('Link has expired')
        this.route.ngOnDestroy();
        setTimeout(() => {
          window.close();
        },5000);
        return;
      }else{
        this.toast.clear();
      }
    });

    this.configurationalMasterService.getVendorType().subscribe((params: any) => {
        this.vendorData = params.data;
      });

      this.getCurrency()

    if (this.id) {
      this.prService.getByIdPR(this.id).subscribe((res: any) => {
        this.singlePrData = res.data;
        this.CF_1['file'].setErrors(null);
        
        this.endData = moment(new Date(this.singlePrData.end_date)).format('LL');
        <FormArray>this.CF_1.alldata.push(
          new FormGroup({
            product_image: new FormControl(this.singlePrData?.product_image),
            item_name: new FormControl(this.singlePrData?.item_name),
            item_code: new FormControl(this.singlePrData?.item_code),
            unit: new FormControl(this.singlePrData?.unit),
            priority: new FormControl(this.singlePrData?.priority),
            mvp: new FormControl(this.singlePrData?.mvp),
          })
        );

        this.createPrForm.patchValue({
          location: this.singlePrData?.location,
          state: this.singlePrData?.state,
          pin: this.singlePrData?.pin,
          city: this.singlePrData?.city,
          delivery_address: this.singlePrData?.delivery_address,
        });
      });
    }
    this.getPreviousQuotationDetailsbyVendor()

   const control = this.createPrForm?.get('rfpArray') as FormArray;
console.log(control,'control data');
  }
 
// new start
initForm() {
  console.log(this.procurement_requests,'procurement_requests');
  
  const rfpArray = this.CF_3.get('rfpArray') as FormArray;
  this.procurement_requests?.forEach((item:any) => {
    rfpArray.push(this.createItem(item));
  });

  console.log(rfpArray,'rfpArrayrfpArrayrfpArray');
  
}
createItem(item:any): FormGroup {
  return this.fb.group({
    item_document: [item.item_document],
    product_name: [item.product_name || item.item_name || "-"],
    item_code: [item.item_code || "-"],
    product_quantity: [item.product_quantity || "-"],
    priority: [item.priority || "-"],
    mvp_product: [item.mvp_product || item.mvp || "-"],
    price_amt: [''],
    gst_Type: [''],
    sgst: [''],
    cgst: [''],
    igst: [''],
    delivery_charges: [''],
    additional_charges: [''],
    currency: [''],
    item_id:[item.item_id],
    index:[item.index],
    totelAmount:['']
    
  });
}


//  item getBy
  getByRfpLink(){
    this.prService.getByRfpLink(this.rfp_no).subscribe((res:any)=>{
      console.log(res,'ressssss');
      this.details_pr = res.data[0];
       this.procurement_requests = res.data[0]?.procurement_item_requests || res.data[0]?.procurement_service_requests || res.data[0]?.procurement_BomItem_requests;
      
    //   this.procurement_requests= [
    //     {
    //         item_quantity: 1,
    //         priority: "HIGH",
    //         mvp: 2,
    //         asset_category_id: 1,
    //         item_id: 9,
    //         ItemMaster: {
    //             item_code: "MC40MZQWNT",
    //             item_document: "app/master/MasterDocuments/image-1709182746353.pdf",
    //             item_name: "trtrtweewwe",
    //             MVP: "435234",
    //             asset_category: {
    //                 "asset_category_name": "computer Software"
    //             }
    //         }
    //     },
    //     {
    //         item_quantity: 2,
    //         priority: "HIGH",
    //         mvp: 4,
    //         asset_category_id: 6,
    //         item_id: 8,
    //         ItemMaster: {
    //             item_code: "MC4YMJU4ND",
    //             item_document: "",
    //             item_name: "test hard",
    //             MVP: "2",
    //             asset_category: {
    //                 asset_category_name: "computer Hardware "
    //             }
    //         }
    //     }
    // ]
    console.log(this.procurement_requests,'this.procurement_requests');
    this.fileBind = `${environment.servralUrl + '/' + this.details_pr?.file}`;
    console.log(this.fileBind, 'this.fileBind');
      const data = [];

      for (let a = 0; a <= this.procurement_requests.length-1; a++) {

        data.push({
          PR_category: this.procurement_requests[a]?.PR_category,
          product_name: this.procurement_requests[a]?.product_name,
          product_varient: this.procurement_requests[a]?.product_varient,
          item_quantity: this.procurement_requests[a]?.item_quantity,
          mvp: this.procurement_requests[a]?.mvp,
          mvp_product: this.procurement_requests[a]?.mvp_product,
          product_quantity: this.procurement_requests[a]?.product_quantity || this.procurement_requests[a]?.item_quantity,
          item_code: this.procurement_requests[a]?.ItemMaster?.item_code,
          item_document: `${environment.servralUrl + '/' + this.procurement_requests[a]?.ItemMaster?.item_document}`,
          item_name: this.procurement_requests[a]?.ItemMaster?.item_name,
          item_id: this.procurement_requests[a]?.item_id,
          priority: this.procurement_requests[a]?.priority,
          index:a
        })
      }

      console.log(data, 'data patch');
      this.procurement_requests = data;
      this.initForm();

    })
  }
// bom GteBy
  getByBomLink(){
    this.prService.getByRfpBomLink(this.vendor_id,this.rfpNo,this.type_pr).subscribe((res:any)=>{
      console.log(res,'ressssss');
      this.details_pr = res.data;
      this.procurement_requests = res.data?.procurement_BomItem_requests;

      const data = [];

      for (let a = 0; a <= this.procurement_requests.length - 1; a++) {

        data.push({
          PR_category: this.procurement_requests[a]?.PR_category,
          product_name: this.procurement_requests[a]?.product_name,
          product_varient: this.procurement_requests[a]?.product_varient,
          item_quantity: this.procurement_requests[a]?.item_quantity,
          mvp: this.procurement_requests[a]?.mvp,
          mvp_product: this.procurement_requests[a]?.mvp_product,
          product_quantity: this.procurement_requests[a]?.product_quantity || this.procurement_requests[a]?.item_quantity,
          item_code: this.procurement_requests[a]?.item_code,
          item_document: `${environment.servralUrl + '/' + this.procurement_requests[a]?.ItemMaster?.item_document}`,
          item_name: this.procurement_requests[a]?.ItemMaster?.item_name,
          item_id: this.procurement_requests[a]?.item_id,
          priority: this.procurement_requests[a]?.priority,
          index:a
        })
      }
      console.log(data, 'data patch');
      // console.log(this.CF_3.rfpArray,' this.CF_3.rfpArray ');  
      
      this.procurement_requests = data;
      //  this.CF_3.rfpArray = data;
      this.initForm();

    })
  }
  // service getBy
  getByRfpServiceLink(){
    this.prService.getByRfpServiceLink(this.vendor_id,this.rfpNo,this.type_pr).subscribe((res:any)=>{
      console.log(res,'ressssss');
      this.details_pr = res.data;
      this.procurement_requests = res.data?.procurement_serviceItem_requests;
      console.log(this.procurement_requests,'this.procurement_requests service');

      const data = [];

for (let a = 0; a <= this.procurement_requests.length - 1; a++) {
   data.push({
    PR_category: this.procurement_requests[a]?.PR_category,
    product_name: this.procurement_requests[a]?.service_name,
    product_varient: this.procurement_requests[a]?.product_varient,
    item_quantity: this.procurement_requests[a]?.service_quantity,
    mvp: this.procurement_requests[a]?.mvp,
    mvp_product: this.procurement_requests[a]?.mvp_product,
    product_quantity: this.procurement_requests[a]?.service_quantity,
    item_code: this.procurement_requests[a]?.service_code,
    item_document: `${environment.servralUrl + '/' + this.procurement_requests[a]?.service_document}`,
    item_name: this.procurement_requests[a]?.service_name,
    item_id: this.procurement_requests[a]?.service_id,
    priority: this.procurement_requests[a]?.priority,
    index:a
  })
}

console.log(data, 'data patch');
this.procurement_requests=data;
this.initForm();

    })
  }

  // calculartion items
  keyUpPrice(e:any,control:any,id:any){
    console.log(e,'eee');
    console.log(control?.value,'controlll');
    console.log(id,'iddd');
    const data:any = control.parent.controls[id] as FormGroup;
    console.log(data,'dataaa');
    let item=control?.value;
  
    if(control?.value.gst_Type == "CGST/SGST"){
      let amountSgst = data?.value.price_amt * data?.value.sgst / 100;
      let totelSgst = data?.value.price_amt + amountSgst;
      // console.log(totelSgst,'totleSgst');
      
    let amountCgst= data?.value.price_amt * data?.value.cgst / 100;
    // let totelCgst = amountCgst + totelSgst;
    // console.log(totelCgst,'totelCgst');
    
this.totleCgstIgst= totelSgst + amountCgst + data?.value.delivery_charges + data?.value.additional_charges;

      // console.log(this.totleCgstIgst,'totleCgstIgst');

    }else{
    let amountIgst = data?.value.price_amt * data?.value.igst / 100;
let allAmountIgst=data?.value.price_amt + amountIgst;
console.log(allAmountIgst,'alligst');

 this.totelIgst=allAmountIgst + data?.value.delivery_charges + data?.value.additional_charges;

      console.log(this.totelIgst,'totelIgst');

    }

    
    // this.cgstAmount = this.managementFee * 9 / 100;
    // this.sgstAmount = this.managementFee * 9 / 100;
  }

  currencySele(cur:any,id:any,control:any){
    console.log(cur,'currrr');
    console.log(this.totleCgstIgst,'this.totleCgstIgst');
    console.log(this.totelIgst,'this.totelIgst');
    console.log(id,'id',control,"control");
    const data = this.CF_3?.get('rfpArray') as FormArray;
    console.log(control.value, 'control');
    console.log(data,'data');
    let list= data.at(id);
    
    if(control.value.gst_Type == "CGST/SGST"){
      const newTotalAmount  = this.totleCgstIgst * Number(cur.value.rate);
      list.patchValue({
        totelAmount: newTotalAmount
      })
    }else if(control.value.gst_Type == "IGST"){
      const newTotalAmount  = this.totelIgst * Number(cur.value.rate);
      list.patchValue({
        totelAmount: newTotalAmount
      })
    }
// console.log(newTotalAmount,'newTotalAmount');

    console.log(list,'list');
   
  
    let totalAmountPrice = 0;
    for (let a = 0; a <= data.value.length - 1; a++) {
      console.log(data.value[a], 'control.value[a]');

      totalAmountPrice += data.value[a]?.totelAmount
    }
    console.log(totalAmountPrice, 'this.totalAmountPrice');
    this.totalAmountPrice = totalAmountPrice;

    this.allArrayData=data.value;
    console.log(this.allArrayData,'this.allArrayData');

    this.allArrayData.map((items:any)=>{
      items.currency_type=items?.currency?.Currency_Convert_id
    })
   
  const editAllData=[];

  for(let a=0; a<=this.allArrayData.length-1;a++){
    editAllData.push({
      price_amt:this.allArrayData[a]?.price_amt,
      sgst: this.allArrayData[a]?.sgst,
      cgst: this.allArrayData[a]?.cgst,
      igst: this.allArrayData[a]?.igst,
      delivery_charges:this.allArrayData[a]?.delivery_charges,
      additional_charges:this.allArrayData[a]?.additional_charges,
      currency:this.allArrayData[a]?.currency_type,
      // vendor_remarks:this.allArrayData[a]?.price_amt,
      //  vendor_uploaded_docthis.allArrayData[a]?.price_amtment: vendor_uploaded,
      procurement_product_id:this.allArrayData[a]?.item_id
    })
  }
    console.log(editAllData,'editAllData');
    this.allArrayData=editAllData
  }
  getPreviousQuotationDetailsbyVendor(){
    this.prService.getPreviousQuotationDetails(this.id,this.vendorId).subscribe((res: any) => {
      console.log(res,'Resssssssssssssssss');
      if(res && res.data){
        this.previousQuoteData = res.data
      }
    },(err =>{
      this.toast.error(err)
    }))
  }

  get CF_1(): any {
    return this.createPrForm.controls;
  }

  getCurrency() {
    this.configurationalMasterService.CurrencyList().subscribe((res: any) => {
      this.currencyData = res.data;
    })
  }
  deleteRow(i: number) {
    <FormArray>this.CF_1.alldata.removeAt(i);
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


  seePreview(path: string, imagePath: any) {
    if (!this.imagePath) {
      if (path) {
        Swal.fire({
          imageUrl: path,
          imageHeight: 250,
          imageAlt: 'Uploaded Document',
          confirmButtonColor: "#063178",
          confirmButtonText: 'Ok',
        })
      }
    } else {
      Swal.fire({
        imageUrl: imagePath,
        imageHeight: 250,
        imageAlt: 'Profile Image',
        confirmButtonColor: "#063178",
        confirmButtonText: 'Ok',
      })
    }
  };

  onVendorChange(e: any) {
    this.noOfVendor = e.value;
    
    this.createPrForm.controls['invite_no_vendor'].patchValue(this.noOfVendor.length)

  }

  sendRfpLink() {
    
    // if (this.createPrForm.invalid) {
    //   this.toast.error('Required fields should not be empty', 'Fields Error');
      
    //   return;
    // }

    let val = this.createPrForm.value;
    const data: any = {
      price_amt: Number(val.price_amt),
      additional_charges: Number(val.additional_charges),
      cgst: Number(val.cgst),
      sgst: Number(val.sgst),
      igst: Number(val.igst),
      delivery_charges: Number(val.delivery_charges),
    }
    
    let formData = new FormData();
    // formData.append("vendor_uploaded_document", this.imageToUpload);
    // formData.append('price_amt', data.price_amt);
    // formData.append("additional_charges", data.additional_charges);
    // formData.append("cgst", data.cgst);
    // formData.append("sgst", data.sgst);
    // formData.append("igst", data.igst);
    // formData.append("delivery_charges", data.delivery_charges);
    // formData.append("vendor_remarks", val.vendor_remarks);
    formData.append("vendors",this.vendor_id);
    // formData.append("pr_id",this.details_pr?.procurement_id);
    formData.append("type",this.type_pr);
    let alld = JSON.stringify(this.allArrayData);
    console.log(alld,'alldalld');
    formData.append("product_details",alld);
    formData.append("products_amount",this.totalAmountPrice);
    
    
    
    this.prService.updateVendorData(this.vendorId, formData).subscribe((res: any) => {
      if (res.code == 200) {
        this.toast.success('Proposal sent successfully');
        this.route.navigate(['master/itticket/purchase-inventory/rfp/live-rfp',]);
      }
    })
  }
  
  getType(event:any){
console.log(event,'event');
// if(event.value=="CGST/SGST"){
// let list=
// }else{

// }
  }
  gstType(control: any, i: number) {
    const data:any = control.parent.controls[i] as FormGroup;
    console.log(data,'dataaa');
    let item=control.value
    this.cleanInput(i);
    if (item.gst_Type === "CGST/SGST") {
      data.get('igst').disable();
      data.get('cgst').enable();
      data.get('sgst').enable();
    } else if(item.gst_Type === "IGST"){
      data.get('cgst').disable();
      data.get('sgst').disable();
      data.get('igst').enable();

    }
  }

  remove(i:any){
    this.cleanInput(i);
    this.CF_3.get('igst')?.reset();
    const data = this.CF_3.get('rfpArray') as FormArray;
    const item = data.at(i);
    const price:any = item.get('price_amt');
    const gstType:any = item.get('gst_Type');
    price.setValue(null);
    gstType.setValue(null);
    let totalAmountPrice = 0;
    for (let a = 0; a <= data.value.length - 1; a++) {
      console.log(data.value[a], 'control.value[a]');

      totalAmountPrice += data.value[a]?.totelAmount
    }
    console.log(totalAmountPrice, 'this.totalAmountPrice');
    this.totalAmountPrice = totalAmountPrice
  }
  cleanInput(i:any) {
    this.CF_3.get('igst')?.reset();
    const data = this.CF_3.get('rfpArray') as FormArray;
    const item = data.at(i);
    const igstControl:any = item.get('igst');
    const cgstControl:any = item.get('cgst');
    const sgstControl:any = item.get('sgst');
    const deleveryCharge:any = item.get('delivery_charges');
    const aditionalCharge:any = item.get('additional_charges');
    const currency:any = item.get('currency');
    const totalAmount:any = item.get('totelAmount');

    
    igstControl.setValue(null);
    cgstControl.setValue(null);
sgstControl.setValue(null);
deleveryCharge.setValue(null);
aditionalCharge.setValue(null);
currency.setValue(null);
totalAmount.setValue(null);
  }
  getGstTypeControl(i: number) {
    console.log(i,'iiii');
    
    return this.createPrForm.get('rfpArray')?.at(i)?.get('gst_Type');
  }
disableFields(itemId:any,index:any) {
  console.log(itemId,'item id');
  console.log(index,'index');
  
//   const igstValue = this.createPrForm.get('igst')?.value;
//   const sgstValue = this.createPrForm.get('sgst')?.value;
//   const cgstValue = this.createPrForm.get('cgst')?.value;
// console.log(igstValue,'igstValue');
// console.log(sgstValue,'sgstValue');
// console.log(cgstValue,'cgstValue');
//  debugger
const control = this.createPrForm?.get('rfpArray') as FormArray;
console.log(control,'control');
if (control.value[0]?.igst) {
  // debugger
// this.disabledCgst=true;
}
// console.log(control,'controlll');
// console.log(control.value[0]?.igst,'control.value.igst');
// const sgstControl:any = (control.at(0) as FormGroup).get('sgst');
// console.log(sgstControl,'sgstControl');


  // if (index && control.value[0]?.igst) {
  //   // this.createPrForm.get('sgst')?.disable();
  //   // this.createPrForm.get('cgst')?.disable();
  //   sgstControl.disable();
  // } 
  // else if (sgstValue && cgstValue) {
  //   this.createPrForm.get('igst')?.disable();
  // } else {
  //   this.createPrForm.get('sgst')?.enable();
  //   this.createPrForm.get('cgst')?.enable();
  //   this.createPrForm.get('igst')?.enable();
  // }
}
isCGST_SGST(i: number): boolean {
  console.log(i,'iii cgst');
  
  const control = this.createPrForm.get('rfpArray')?.at(i)?.get('gst_Type');
  console.log(control,'control cgst');
  
  return control?.value === 'CGST/SGST';
}

isIGST(i: number): boolean {
  console.log(i,'igst');
  
  const control = this.createPrForm.get('rfpArray')?.at(i)?.get('gst_Type');
  console.log(control,'control igst');

  return control?.value === 'IGST';
}
patchData(e: any): FormArray {
  return new FormArray(
    e.map((x: any) => {
      const obj = new FormGroup({});
      Object.keys(x).forEach((k) => {
        obj.addControl(k, new FormControl(x[k]));
      });
      return obj;
    })
  );
};
}


