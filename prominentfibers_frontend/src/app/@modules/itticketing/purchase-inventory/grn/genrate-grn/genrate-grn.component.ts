import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, FormArray, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { PurchaseRequestService } from 'src/app/@shared/services/purchase-request.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-genrate-grn',
  templateUrl: './genrate-grn.component.html',
  styleUrls: ['./genrate-grn.component.scss']
})
export class GenrateGrnComponent {
    genrateGRNForm: FormGroup;
    imageToUpload: any;
    imagePath: any;
    id: any;
    singlePrData: any;
    endData: any;
    inputReadonly = true;
    minDate = new Date();
  
  
    constructor(private route: Router,
      private toast: ToastrService,
      private activeroute: ActivatedRoute,
      public dialog: MatDialog, private fb: FormBuilder,
      private prService: PurchaseRequestService,
    ) {
      this.genrateGRNForm = this.fb.group({
        name: new FormControl(null),
        department: new FormControl(null),
        emp_id: new FormControl(null),
        alldata: new FormArray([]),
        location: new FormControl(null),
        state: new FormControl(null),
        pin: new FormControl(null),
        end_date: new FormControl(null),
        delivery_address: new FormControl(null),
        raisedBy: new FormControl(null),
        poDate: new FormControl(null),
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
        invoiceDate: new FormControl(null),
        invoiceRemark: new FormControl(null),
        invoice_n_o: new FormControl(null),
        grn_date: new FormControl(null, [Validators.required]),
        grn_item_n_o: new FormControl(null, [Validators.required]),
        grn_location: new FormControl(null, [Validators.required]),
        grn_file:new FormControl(null, [Validators.required]),
        additonal_charges:new FormControl(null),
        delivery_charges:new FormControl(null),
        grand_total:new FormControl(null),
      });

    }
  
    ngOnInit(): void {
      this.activeroute.queryParams.subscribe((params: any) => {
        this.id = params.pr_id;
      });
      if (this.id) {
        this.prService.getForGRNById(this.id).subscribe((res: any) => {
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
  
          this.genrateGRNForm.patchValue({
            location: this.singlePrData?.location,
            state: this.singlePrData?.state,
            pin: this.singlePrData?.pin,
            city: this.singlePrData?.city,
            delivery_address: this.singlePrData?.delivery_address,
            raisedBy: this.singlePrData?.raised_by,
            poDate:this.singlePrData?.po_date,
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
            invoiceDate:this.singlePrData?.invoice_date,
            invoiceRemark: this.singlePrData?.invoice_remarks,
            invoice_n_o:this.singlePrData?.invoice_n_o,
            delivery_charges:this.singlePrData?.delivery_charges,
            additonal_charges: this.singlePrData?.additional_charges,
            grand_total:this.singlePrData?.grand_total,
          });
        });
      }
    }
  
    get CF_1(): any {
      return this.genrateGRNForm.controls;
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

    checkUnit(event:any){
      if(event != null){
        if(event.target.value > this.singlePrData?.unit){
          this.toast.error('The number of items cannot exceed the total number of the unit.')
          return;
        }
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
  saveGRNData() {
    if (this.genrateGRNForm.value.grn_item_n_o > this.singlePrData?.unit) {
      this.toast.error('The number of items cannot exceed the total number of the unit.')
      return;
    }
    let grnDate = moment(this.genrateGRNForm.value.grnDate).format("YYYY-MM-DD");
    let val = this.genrateGRNForm.value;
    let formData = new FormData();

    formData.append("grn_item_n_o", val.grn_item_n_o);
    formData.append("grn_date", grnDate);
    formData.append("grn_location", val.grn_location);
    formData.append("grn_file", this.imageToUpload);
    formData.append(`procurement_product_id`, this.id)
    if (this.genrateGRNForm.invalid) {
      this.toast.error('Required fields should not be empty', 'Fields Error');
      return;
    }

    this.prService.updateGRNById(this.id, formData).subscribe((res: any) => {
      if (res.code == 200) {
        this.toast.success('GRN genrated Successfully Successfully');
        this.route.navigateByUrl('/master/itticket/purchase-inventory/grn')
      }
    }, err => {
      this.toast.error('Something Went Wrong');
    })
    
  }
  
}
