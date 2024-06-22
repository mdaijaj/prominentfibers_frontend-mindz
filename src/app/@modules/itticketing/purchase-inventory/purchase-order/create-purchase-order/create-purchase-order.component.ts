import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, FormArray, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { PurchaseRequestService } from 'src/app/@shared/services/purchase-request.service';

@Component({
  selector: 'app-create-purchase-order',
  templateUrl: './create-purchase-order.component.html',
  styleUrls: ['./create-purchase-order.component.scss']
})
export class CreatePurchaseOrderComponent {
    raisePOForm: FormGroup;
    remarkForm: FormGroup;
    imageToUpload: any;
    imagePath: any;
    id: any;
    singlePrData: any;
    endData: any;
    Login_user_id: any = localStorage.getItem('signInUser');
    loginUserName: any = JSON.parse(this.Login_user_id).first_name;
    todayDate:any= new Date()
  
  
    constructor(private route: Router,
      private toast: ToastrService,
      private activeroute: ActivatedRoute,
      public dialog: MatDialog, private fb: FormBuilder,
      private prService: PurchaseRequestService,
    ) {
      this.raisePOForm = this.fb.group({
        name: new FormControl(null),
        department: new FormControl(null),
        emp_id: new FormControl(null),
        alldata: new FormArray([]),
        location: new FormControl(null, [Validators.required]),
        state: new FormControl(null, [Validators.required]),
        pin: new FormControl(null, [Validators.required]),
        delivery_address: new FormControl(null, [Validators.required]),
        file: new FormControl(null, [Validators.required]),
        raised_by: new FormControl(null, [Validators.required]),
        po_date: new FormControl(null, [Validators.required]),
        vendor_name: new FormControl(null),
        remark: new FormControl(null),
        unitPrice: new FormControl(null),
        quantity: new FormControl(null),
        ammount: new FormControl(null),
        sgst: new FormControl(null),
        cgst: new FormControl(null),
        igst: new FormControl(null),
        total: new FormControl(null),
        po_status: new FormControl(null),
        additonal_charges:new FormControl(null),
        delivery_charges:new FormControl(null),
        grand_total:new FormControl(null),
        statusVendor:new FormControl("vendorInvoice")
      });
  
      this.remarkForm = this.fb.group({
        remarks_approvel: new FormControl(null, [Validators.required]),
      }) 
    }
  
    ngOnInit(): void {
      this.activeroute.queryParams.subscribe((params: any) => {
        this.id = params.pr_id;
      });
      if (this.id) {
        this.prService.getPOById(this.id).subscribe((res: any) => {
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
  
          this.raisePOForm.patchValue({
            location: this.singlePrData?.location,
            state: this.singlePrData?.state,
            pin: this.singlePrData?.pin,
            city: this.singlePrData?.city,
            delivery_address: this.singlePrData?.delivery_address,
            raised_by: this.loginUserName,
            po_date:this.todayDate,
            remark: this.singlePrData?.vendor_remarks,
            vendor_name:this.singlePrData.vendor_name,
            unitPrice: this.singlePrData?.price_amt,
            quantity: this.singlePrData?.unit,
            ammount: this.singlePrData?.price_amt*this.singlePrData?.unit,
            sgst: this.singlePrData?.sgst,
            cgst: this.singlePrData?.cgst,
            igst: this.singlePrData?.igst,
            total:this.calculateTotalValue(this.singlePrData?.unit,this.singlePrData?.price_amt,this.singlePrData?.sgst,this.singlePrData?.cgst,this.singlePrData?.igst),
            delivery_charges:this.singlePrData?.delivery_charges,
            additonal_charges: this.singlePrData?.additional_charges,
            grand_total:this.calculateTotalValue(this.singlePrData?.unit,this.singlePrData?.price_amt,this.singlePrData?.sgst,this.singlePrData?.cgst,this.singlePrData?.igst) + this.singlePrData?.delivery_charges + this.singlePrData?.additional_charges,
          });
        });
      }
    }
  
    get CF_1(): any {
      return this.raisePOForm.controls;
    }


  createPurchaseOrder(status: string) {
    let data = this.raisePOForm.value;
    let poDate = moment(this.raisePOForm.value.po_date).format("YYYY-MM-DD");
    this.raisePOForm.patchValue({
      po_date: poDate,
      po_status: status,
      grand_total:data.grand_total,
    })
    
    if (this.raisePOForm.invalid) {
      this.toast.error('Required fields should not be empty', 'Fields Error');
      return;
    }
    let val = this.raisePOForm.value;
    
    this.prService.createPurchageOrder(this.id, val).subscribe((res: any) => {
      if (res.code == 200) {
        if (val.po_status == 'ISSUED PO') {
          this.route.navigateByUrl('/master/itticket/purchase-inventory/purchase-order/po-issued')
          this.toast.success('Purchase Order Raised Successfully');
        } else {
          this.route.navigateByUrl('/master/itticket/purchase-inventory/purchase-order/draft-pos')
          this.toast.success('Purchase Order Saved as Draft Successfully');
        }
      }
    }, err => {
      this.toast.error('Something went Wrong')
    })
  }

   calculateTotalValue( unit:number,amount: number, sgst: number, cgst: number, igst: number): number {
    let totalAmount = unit*amount
    const totalSGST = (totalAmount * sgst) / 100;
    const totalCGST = (totalAmount * cgst) / 100;
    const totalIGST = (totalAmount * igst) / 100;

    const totalValue = totalAmount + totalSGST + totalCGST + totalIGST;
    return totalValue;
  }
}
