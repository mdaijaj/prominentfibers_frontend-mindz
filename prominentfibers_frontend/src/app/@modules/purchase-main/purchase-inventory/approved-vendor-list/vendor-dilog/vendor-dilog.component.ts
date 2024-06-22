import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { VendorManagementService } from 'src/app/@shared/services/vendor-management.service';
import { UploadDocument } from '../../upload-document/upload-document';

@Component({
  selector: 'app-vendor-dilog',
  templateUrl: './vendor-dilog.component.html',
  styleUrls: ['./vendor-dilog.component.scss']
})
export class VendorDilogComponentApp {
  localTime:any;
  fromDate: any;
  toDate: any;
  vendor_id: any;
  singleVendorData: any;
  constructor(public dialog: MatDialogRef<VendorDilogComponentApp>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private vendorService: VendorManagementService
   ) {
    this.vendor_id = this.data.id;
    
  }

  ngOnInit(): void {
    this.getVendorById();
  }

  getVendorById(){
   this.vendorService.getVendorById(this.vendor_id).subscribe((res:any)=>{
    this.singleVendorData = res.data;
    
    
   })
  }
}
