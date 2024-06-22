import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { VendorManagementService } from 'src/app/@shared/services/vendor-management.service';

@Component({
  selector: 'app-reject-dailog',
  templateUrl: './reject-dailog.component.html',
  styleUrls: ['./reject-dailog.component.scss']
})
export class RejectDailogComponent {
  localTime:any;
  fromDate: any;
  toDate: any;
  vendor_id: any;
  singleVendorData: any;
  constructor(public dialog: MatDialogRef<RejectDailogComponent>,
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
