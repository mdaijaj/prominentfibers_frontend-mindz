import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { ConfigurationalmasterService } from 'src/app/@shared/services/configurationalmaster.service';
import { PurchaseRequestService } from 'src/app/@shared/services/purchase-request.service';
import { VendorManagementService } from 'src/app/@shared/services/vendor-management.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-send-rfp-link',
  templateUrl: './send-rfp-link.component.html',
  styleUrls: ['./send-rfp-link.component.scss']
})
export class SendRfpLinkComponent {
  createPrForm: FormGroup;
  imageToUpload: any;
  imagePath: any;
  editDocData:any;
  vendorData: any = [];
  noOfVendor: any;
  id: any;
  singlePrData: any;
  sendRfpData: any;
  vendors_invited_count:any;
  minDate = new Date();

  constructor(  private route: Router,
    private toast: ToastrService,
    private activeroute: ActivatedRoute,
    public dialog: MatDialog, private fb:FormBuilder, private prService: PurchaseRequestService, private configurationalMasterService: ConfigurationalmasterService, private vendorService: VendorManagementService
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
        vendors :new FormControl(null, [Validators.required]),
      })
     }

     ngOnInit(): void {
      this.activeroute.queryParams.subscribe((params: any) => {
        this.id = params.pr_id;
       
      });

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
  
          this.createPrForm.patchValue({
            location: this.singlePrData?.location,
            state: this.singlePrData?.state,
            pin: this.singlePrData?.pin,
            city: this.singlePrData?.city,
            delivery_address: this.singlePrData?.delivery_address,
          });
        });
      }

      this.getAllVerifyVendors();
     }

     get CF_1(): any {
      return this.createPrForm.controls;
    }
  
  
    deleteRow(i: number){
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

    onVendorChange(e:any){
     this.noOfVendor = e.value;
     
     this.createPrForm.controls['invite_no_vendor'].patchValue(this.noOfVendor.length);
     this.vendors_invited_count = this.noOfVendor.length
    
    }
    private queryParamString(params: any): string {
      return Object.keys(params)
        .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`) .join('&');
    }

    sendRfpLink(){
      if (this.createPrForm.invalid) {
        this.toast.error('Required fields should not be empty', 'Fields Error');
        
        return;
      }
      
      let val = this.createPrForm.value;
      var outDate = moment(val.end_date).format("YYYY-MM-DD");
      const route = window.location.origin + '/send-rfp-link'
      let ParamsDate = btoa(outDate);
      const params = {validDate:ParamsDate, pr_id : this.id,vendorId:0};
      const routeWithParams = `${route}?${this.queryParamString(params)}`;

      let formData =new FormData();
      let vandors = JSON.stringify(this.noOfVendor);
      formData.append(`vendors`, vandors);
      formData.append("end_date", outDate);
      formData.append("file", this.imageToUpload);
      formData.append(`vendors_invited_count`,this.vendors_invited_count);
      formData.append( `site_url`,routeWithParams );
      this.prService.sendRfpLink(this.id, formData).subscribe((res:any)=>{
        this.sendRfpData = res.data;
        if (res.code == 200) {
          this.toast.success('successfully emailed the RFP link to all vendors');
          this.route.navigate(['master/itticket/purchase-inventory/rfp/live-rfp']);
        }   
      })
    }

    getAllVerifyVendors(){
     this.vendorService.getAllVerifyVendor().subscribe((res:any)=>{
      let allVendor = res.data;
      allVendor.forEach((ven:any) => {
        if(ven.asset_category_id  == this.singlePrData.asset_category_id){
          this.vendorData.push(ven);
        }
      });
     });
    }
}
