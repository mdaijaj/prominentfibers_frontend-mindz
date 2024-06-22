import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { VendorManagementService } from 'src/app/@shared/services/vendor-management.service';
import { OutwardDailogComponent } from '../../../courier-outward/courier-outward-list/outward-dailog/outward-dailog.component';
import { AdminSupportService } from 'src/app/@shared/services/admin-support.service';

@Component({
  selector: 'app-amc-dailog',
  templateUrl: './amc-dailog.component.html',
  styleUrls: ['./amc-dailog.component.scss']
})
export class AmcDailogComponent {
  localTime:any;
  fromDate: any;
  toDate: any;
  id: any;
  singleData: any;
  constructor(public dialog: MatDialogRef<OutwardDailogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private adminService: AdminSupportService
   ) {
    this.id = this.data.id;
    
  }

  ngOnInit(): void {
    this.getVendorById();
  }

  getVendorById(){
   this.adminService.get_ById_AMC_Agreement(this.id).subscribe((res:any)=>{
    this.singleData = res.data;
    
    
   })
  }
}
