import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { ConfigurationalmasterService } from 'src/app/@shared/services/configurationalmaster.service';
import { PurchaseRequestService } from 'src/app/@shared/services/purchase-request.service';
import { VendorManagementService } from 'src/app/@shared/services/vendor-management.service';
import { environment } from 'src/app/environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-send-rfp-link',
  templateUrl: './send-rfp-link.component.html',
  styleUrls: ['./send-rfp-link.component.scss']
})
export class SendRfpLinkComponent {
  createPrForm: any;
  imageToUpload: any;
  imagePath: any;
  editDocData: any;
  vendorData: any = [];
  noOfVendor: any;
  id: any;
  singlePrData: any;
  sendRfpData: any;
  vendors_invited_count: any;
  // minDate = new Date();
  pro_Id: any;
  pro_category: any;
  procurement_requests: any;
  details_pr: any;
  myDate = new Date();
  now = new Date();
  year = this.now.getFullYear();
  month = this.now.getMonth();
  date = this.now.getDate();
  maxDate = moment({ year: this.year + 100, month: this.month, date: this.date }).format('YYYY-MM-DD');
  minDate = moment({ year: this.year - 0, month: this.month, date: this.date }).format('YYYY-MM-DD');
  minEndDate: Date;
  Pr_create_name: any;
  fileBind: string;
  rfpNumber: any;
  rfpLinkData: { link: string; }[];
  liveUrl: any;
  constructor(private route: Router,
    private toast: ToastrService,
    private activeroute: ActivatedRoute,
    public dialog: MatDialog, private fb: FormBuilder, private prService: PurchaseRequestService, private configurationalMasterService: ConfigurationalmasterService, private vendorService: VendorManagementService
  ) {
    this.createPrForm = this.fb.group({
      name: new FormControl(null),
      department: new FormControl(null),
      emp_id: new FormControl(null),
      alldata: new FormArray([]),
      location: new FormControl(null),
      state: new FormControl(null),
      pin: new FormControl(null),
      end_date: new FormControl(null),
      invite_no_vendor: new FormControl(null),
      delivery_address: new FormControl(null),
      file: new FormControl(null),
      vendors: new FormControl(null),
      start_date_pr: new FormControl(null),
      end_date_pr: new FormControl(null,Validators.required)
    })


    this.createPrForm.get('start_date_pr').valueChanges.subscribe((value: any) => {
      if (value) {
        // Set the minimum end date as the selected start date
        this.minEndDate = value;
        // Clear the end date if it's before the new minimum end date
        const endDate = this.createPrForm.get('end_date_pr').value;
        if (endDate < this.minEndDate) {
          this.createPrForm.get('end_date_pr').setValue(null);
        }
      }
    });
  }

  ngOnInit(): void {
    this.getAllVerifyVendors();
this.liveUrl='https://promininentfiber.elitetraveltech.in'
    this.activeroute.queryParams.subscribe((params: any) => {
      this.id = params.pr_id;
      console.log(params, 'params');
      this.pro_Id = params.pr_id;
      this.pro_category = params.pr_category;

      this.getByPr();
this.getRfp();
      if (this.id) {
        this.prService.getByIdPR(this.id).subscribe((res: any) => {
          this.singlePrData = res.data;
          this.CF_1['file'].setErrors(null);

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

          // this.createPrForm.patchValue({
          //   location: this.singlePrData?.location,
          //   state: this.singlePrData?.state,
          //   pin: this.singlePrData?.pin,
          //   city: this.singlePrData?.city,
          //   delivery_address: this.singlePrData?.delivery_address,
          // });
        });
      }

    });

  }

  getRfp(){
    this.vendorService.getRfpNumber().subscribe((res:any)=>{
      console.log(res,'resss');
      this.rfpNumber=res.data;
    })
  }
  get CF_1(): any {
    return this.createPrForm.controls;
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

  onVendorChange(e: any, index: any, data: any) {

    console.log(e, 'eeeeeee');
  
    let eValue = e.value
    console.log(eValue, 'eValue');
    console.log(data, 'data');

    const item_vender: any = [];

    for (let a = 0; a <= eValue.length - 1; a++) {
      // item_vender.push(eValue[a]?.vendor_management_id),
      // item_vender.push(eValue[a]?.vendor_name)
      item_vender.push({
        id: eValue[a]?.vendor_management_id,
        // vendor_name: eValue[a]?.vendor_name
      })

    }
    console.log(item_vender, 'item_vender');
    const itemData: any = [];

    this.procurement_requests[index].venderSelectedList = e.value;
    console.log('itemData', this.procurement_requests);

    itemData?.map((item: any) => {
      if (item?.item_id == data?.item_id) {
        item.list = item_vender;
      }
    })



    console.log(itemData, 'itemDatacopy');


    console.log(this.procurement_requests, 'procurement_requests return');

    this.noOfVendor = e.value;

    this.createPrForm.controls['invite_no_vendor'].patchValue(this.noOfVendor.length);
    this.vendors_invited_count = this.noOfVendor.length

  }
  private queryParamString(params: any): string {
    console.log(params, 'paramsparams');

    return Object.keys(params)
      .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`).join('&');
  }
  removeDuplicates(array: any[]) {
    let uniqueIds: any[] = [];
    return array.filter(obj => {
        if (uniqueIds.indexOf(obj.id) === -1) {
            uniqueIds.push(obj.id);
            return true;
        }
        return false;
    });
}
  sendRfpLink() {
    // if (this.createPrForm.invalid) {
    //   this.toast.error('Required fields should not be empty', 'Fields Error');

    //   return;
    // }
    if (this.createPrForm.invalid) {
      this.toast.error('Required fields should not be empty', 'Fields Error');
      return;
    }
 console.log(this.procurement_requests,'this.procurement_requests');
//  const modifyData=[]
 const modifyData = this.procurement_requests?.map((item:any) => {
  return {
      item_id: item.item_id,
      service_id:item.service_id,
      list: item.venderSelectedList?.map((vendor:any) => vendor?.vendor_management_id)
  };
});

console.log(modifyData,'modifyData');
modifyData.forEach((item:any)=>{
  if(item.list==undefined){
    return this.toast.warning("Pls Assign The Vendor In Perticular Item")

  }
})
modifyData.forEach((item:any) => {
  item.list.forEach((id:any, index:any) => {
    item.list[index] = { id, ...item.list[index] };
  });
});
console.log(modifyData,'modifyData copy');

let val = this.createPrForm.value;
 var outDate = moment(val.end_date_pr).format("YYYY-MM-DD");
  const route = window.location.origin + '/send-rfp-link'
  console.log(route,'route test');
   // let ParamsDate = btoa(outDate);
   const rfpLinkModify=[]
   let mergedArray = [];
   for(let i=0 ;i<=modifyData.length;i++){
    console.log(modifyData[i]?.list,'modify list id');
    mergedArray.push(...(modifyData[i]?.list || []));

   }
//  console.log(rfpLinkModify,'rfpLinkModify');
 console.log(mergedArray,'mergedArray');
 const data = this.removeDuplicates(mergedArray);
  console.log(data,'data ');
  
    for(let b=0 ; b<=data.length-1; b++){
      console.log(data[b],'data');
      // if(data[b]?.id==)
      const params = {  rfpNumber: this.rfpNumber, vendorId: data[b]?.id };
   console.log(params,'params');
   const routeWithParams = `${environment.servralUrl}?${this.queryParamString(params)}`;
   console.log(routeWithParams,'routeWithParams');
   rfpLinkModify.push({
    link:routeWithParams
   })
    }
    console.log(rfpLinkModify,'rfpLinkModify');
    this.rfpLinkData=rfpLinkModify
    let formData = new FormData();
    // let vandors = JSON.stringify(this.noOfVendor);
    // formData.append(`vendors`, vandors);
    formData.append("end_date", outDate);
    // formData.append("file", this.imageToUpload);
    formData.append(`vendors_invited_count`, this.vendors_invited_count);
    formData.append(`procurement_id`, this.pro_Id);

    // formData.append(`site_url`, routeWithParams);
    
    let linkRfp = JSON.stringify(this.rfpLinkData);
    formData.append('site_url', `${this.liveUrl+'/send-rfp-link'}` );
    formData.append('Rfp_Number','RFP-1');
    let alld = JSON.stringify(modifyData);
console.log(alld,'alldalld');

    if(this.pro_category == "BOM PR"){
      alert("bom")
      formData.append('bom_details', alld);
      formData.append('procurement_type',"Bom");

      this.prService.sendRfpBom(formData).subscribe((res: any) => {
        this.sendRfpData = res.data;
        if (res.code == 200) {
          this.toast.success('successfully emailed the RFP link to all vendors');
          this.route.navigate(['master/itticket/purchase-inventory/rfp/live-rfp']);
        }
      })
    }else if (this.pro_category == "Item PR"){
      alert("item")
      
      formData.append('item_detail', alld);
      formData.append('procurement_type',"Item");

 this.prService.sendRfpLink(formData).subscribe((res: any) => {
      this.sendRfpData = res.data;
      if (res.code == 200) {
        this.toast.success('successfully emailed the RFP link to all vendors');
        this.route.navigate(['master/itticket/purchase-inventory/rfp/live-rfp']);
      }
    })
    } else if(this.pro_category == "Service PR"){
      alert("service")
       formData.append('services_details', alld);
      formData.append('procurement_type',"Service");

 this.prService.sendRfpService(formData).subscribe((res: any) => {
      this.sendRfpData = res.data;
      if (res.code == 200) {
        this.toast.success('successfully emailed the RFP link to all vendors');
        this.route.navigate(['master/itticket/purchase-inventory/rfp/live-rfp']);
      }
    })
    }
    //  formData.append('file', this.imageToUpload);



// let sendData={
//   end_date:outDate,
//   vendors_invited_count:this.vendors_invited_count,
//   item_detail:alld,
//   rfpLinkData:linkRfp
// }

// console.log(sendData);

    // formData.append('type', val.type);
    this.pro_Id
   

  }

  getAllVerifyVendors() {
    this.vendorService.getAllVerifyVendor().subscribe((res: any) => {
      let allVendor = res.data;
      console.log(allVendor, 'allVendor');
      console.log(this.singlePrData, 'this.singlePrData');
      this.vendorData = res.data
      // allVendor.forEach((ven:any) => {
      //   if(ven.asset_category_id  == this.singlePrData.asset_category_id){
      //     this.vendorData.push(ven);
      //   }
      // });

    });

    //  const data=[
    //   {vendor_management_id:1,vendor_name:"Ashutosh"},
    //   {vendor_management_id:2,vendor_name:"Rahul"},
    //   {vendor_management_id:3,vendor_name:"Lakhan"},


    //  ]
    //  this.vendorData=data;

  }

  getByPr() {
    
    let data = {
      procurementId: Number(this.pro_Id),
      PR_categories: this.pro_category
    }
    console.log(data, 'dataaaaa');

    this.prService.getByIdPR(data).subscribe((res: any) => {
      

      console.log(res.data, 'ressss.data');
      this.details_pr = res.data[0];
      this.Pr_create_name = res.result

      this.procurement_requests = res.data[0]?.procurement_item_requests || res.data[0]?.procurement_service_requests || res.data[0]?.procurement_BomItem_requests;


      console.log(this.procurement_requests, 'this.procurement_requests');
      this.fileBind = `${environment.servralUrl + '/' + this.details_pr?.file}`;
      console.log(this.fileBind, 'this.fileBind');

      // this.createDate = moment(new Date(this.cellData.createdAt)).format('LL');

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
          item_code: this.procurement_requests[a]?.ItemMaster?.item_code || this.procurement_requests[a]?.tbl_servicemaster.service_code,
          item_document: `${environment.servralUrl + '/' + this.procurement_requests[a]?.ItemMaster?.item_document || this.procurement_requests[a]?.tbl_servicemaster?.service_document}`,
          item_name: this.procurement_requests[a]?.ItemMaster?.item_name ||  this.procurement_requests[a]?.tbl_servicemaster.service_name,
          item_id: this.procurement_requests[a]?.item_id,
          priority: this.procurement_requests[a]?.priority,
          service_id:this.procurement_requests[a]?.service_id
        })
      }

      console.log(data, 'data patch');
      this.procurement_requests = data;
      
      this.procurement_requests?.map((item: any) => {
        item.vendor_list = this.vendorData;
      })

      this.createPrForm.patchValue({
        start_date_pr: this.myDate,
        location: this.details_pr?.location,
        state: this.details_pr?.state,
        pin: this.details_pr?.pin,
        city: this.details_pr?.city,
        delivery_address: this.details_pr?.delivery_address,
        file: `${environment.servralUrl + '/' + this.details_pr?.file}`
      })
    });




  }
}
