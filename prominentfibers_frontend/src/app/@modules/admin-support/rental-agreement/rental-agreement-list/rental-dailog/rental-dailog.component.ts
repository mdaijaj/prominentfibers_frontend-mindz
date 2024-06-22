import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { VendorManagementService } from 'src/app/@shared/services/vendor-management.service';
import { InwardDailogComponent } from '../../../courier-inward/courier-inward-list/inward-dailog/inward-dailog.component';
import { AdminSupportService } from 'src/app/@shared/services/admin-support.service';

@Component({
  selector: 'app-rental-dailog',
  templateUrl: './rental-dailog.component.html',
  styleUrls: ['./rental-dailog.component.scss']
})
export class RentalDailogComponent {
  localTime:any;
  fromDate: any;
  toDate: any;
  id: any;
  singleData: any;
  constructor(public dialog: MatDialogRef<RentalDailogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private adminService: AdminSupportService
   ) {
    this.id = this.data.id;
    
  }

  ngOnInit(): void {
    this.getById();
  }

  getById(){
   this.adminService.get_ById_Rental_Agreement(this.id).subscribe((res:any)=>{
    this.singleData = res.data;
    
    
   })
  }
}
