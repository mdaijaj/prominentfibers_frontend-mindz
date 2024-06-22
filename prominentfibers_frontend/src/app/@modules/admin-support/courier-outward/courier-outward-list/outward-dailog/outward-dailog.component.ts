import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import * as moment from 'moment';
import { AdminSupportService } from 'src/app/@shared/services/admin-support.service';
import { VendorManagementService } from 'src/app/@shared/services/vendor-management.service';

@Component({
  selector: 'app-outward-dailog',
  templateUrl: './outward-dailog.component.html',
  styleUrls: ['./outward-dailog.component.scss']
})
export class OutwardDailogComponent {
  localTime:any;
  fromDate: any;
  toDate: any;
  id: any;
  singleData: any;
  user_id: any;
  dispatch_date: string;
  date_of_delivery: string;
  constructor(public dialog: MatDialogRef<OutwardDailogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private adminService: AdminSupportService
   ) {
    this.id = this.data.id;
    
  }

  ngOnInit(): void {
    let lg: any = localStorage.getItem('signInUser');
    let loginUser = JSON.parse(lg);
    console.log('loginUser', loginUser);
    this.user_id = loginUser.employee_id;
    
    this.getById();
  }

  getById(){
   this.adminService.single_outward(this.id,this.user_id).subscribe((res:any)=>{
    this.singleData = res.data;
    this.dispatch_date = moment(this.singleData?.dispatched_date).format('YYYY-MM-DD');
    this.date_of_delivery = moment(this.singleData?.date_of_delivery).format('YYYY-MM-DD');
   })
  }
}
