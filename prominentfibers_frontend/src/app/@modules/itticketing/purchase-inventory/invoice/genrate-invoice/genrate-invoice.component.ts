import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormBuilder, FormControl, FormArray, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import * as moment from 'moment';
import { PurchaseRequestService } from 'src/app/@shared/services/purchase-request.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-genrate-invoice',
  templateUrl: './genrate-invoice.component.html',
  styleUrls: ['./genrate-invoice.component.scss']
})
export class GenrateInvoiceComponent {
  raiseInvoiceForm: FormGroup;
  imageToUpload: any;
  imagePath: any;
  id: any;
  singlePrData: any;
  endData: any;


  constructor(private route: Router,
    private toast: ToastrService,
    private activeroute: ActivatedRoute,
    public dialog: MatDialog, private fb: FormBuilder,
    private prService: PurchaseRequestService,
  ) {
    this.raiseInvoiceForm = this.fb.group({
      name: new FormControl(null),
      department: new FormControl(null),
      emp_id: new FormControl(null),
      alldata: new FormArray([]),
      location: new FormControl(null),
      state: new FormControl(null),
      pin: new FormControl(null),
      delivery_address: new FormControl(null),
      vendors: new FormControl(null),
      raised_by: new FormControl(null),
      po_date: new FormControl(null),
      vendor_name: new FormControl(null),
      remark: new FormControl(null),
      unitPrice: new FormControl(null),
      quantity: new FormControl(null),
      ammount: new FormControl(null),
      sgst: new FormControl(null),
      cgst: new FormControl(null),
      igst: new FormControl(null),
      total: new FormControl(null),
      poNumber: new FormControl(null),
      invoice_date: new FormControl(null, [Validators.required]),
      invoice_remarks: new FormControl(null, [Validators.required]),
      po_status: new FormControl(null),
      additonal_charges:new FormControl(null),
      delivery_charges:new FormControl(null),
      grand_total:new FormControl(null),
      invoice_file:new FormControl(null, [Validators.required])
    });
  }

  ngOnInit(): void {
    this.activeroute.queryParams.subscribe((params: any) => {
      this.id = params.pr_id;
    });
    if (this.id) {
      this.prService.getInvoiceDetailsById(this.id).subscribe((res: any) => {
        this.singlePrData = res.data;

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

        this.raiseInvoiceForm.patchValue({
          location: this.singlePrData?.location,
          state: this.singlePrData?.state,
          pin: this.singlePrData?.pin,
          city: this.singlePrData?.city,
          delivery_address: this.singlePrData?.delivery_address,
          raised_by: this.singlePrData?.raised_by,
          po_date:this.singlePrData?.po_date,
          remark: this.singlePrData?.vendor_remarks,
          vendor_name:this.singlePrData.vendor_name,
          unitPrice: this.singlePrData?.price_amt,
          quantity: this.singlePrData?.unit,
          ammount: this.singlePrData?.price_amt*this.singlePrData?.unit,
          sgst: this.singlePrData?.sgst,
          cgst: this.singlePrData?.cgst,
          igst: this.singlePrData?.igst,
          total:this.singlePrData?.total,
          poNumber:this.singlePrData?.po_details_id,
          delivery_charges:this.singlePrData?.delivery_charges,
          additonal_charges: this.singlePrData?.additional_charges,
          grand_total:this.singlePrData?.grand_total,
        });
      });
    }
  }

  get CF_1(): any {
    return this.raiseInvoiceForm.controls;
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
          confirmButtonColor: "#8B817D",
          confirmButtonText: 'Ok',
        })
      }
    } else {
      Swal.fire({
        imageUrl: imagePath,
        imageHeight: 250,
        imageAlt: 'Profile Image',
        confirmButtonColor: "#8B817D",
        confirmButtonText: 'Ok',
      })
    }
  };
  genrateInvoice() {
    let val = this.raiseInvoiceForm.value;
    let invoice_date  = moment(this.raiseInvoiceForm.value.invoice_date).format("YYYY-MM-DD");
    // this.raiseInvoiceForm.patchValue({
    //   invoice_date: invoice_date,
    //   po_status: 'ISSUED INVOICE',
    //   // invoice_file: this.imageToUpload
    // })
    let formData =new FormData();
    formData.append("invoice_remarks", val.invoice_remarks);
    formData.append("invoice_date", invoice_date);
    formData.append("invoice_file", this.imageToUpload);
    formData.append( "po_status", 'ISSUED INVOICE')
    if (this.raiseInvoiceForm.invalid) {
    this.toast.error('Required fields should not be empty', 'Fields Error');
    return;
  }


  this.prService.genrateInvoice(this.id, formData).subscribe((res: any) => {
    if (res.code == 200) {
      this.toast.success('Invoice Raised Successfully');
      this.route.navigateByUrl('/master/finance/account-payable/all-recived-invoice/vendor-invoice-list')
    }
  },err => {
    this.toast.error('Something Went Wrong');
  })
 }
}
