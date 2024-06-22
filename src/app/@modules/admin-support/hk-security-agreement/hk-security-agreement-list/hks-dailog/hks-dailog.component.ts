import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AdminSupportService } from 'src/app/@shared/services/admin-support.service';
import { RentalDailogComponent } from '../../../rental-agreement/rental-agreement-list/rental-dailog/rental-dailog.component';

@Component({
  selector: 'app-hks-dailog',
  templateUrl: './hks-dailog.component.html',
  styleUrls: ['./hks-dailog.component.scss']
})
export class HksDailogComponent {
  localTime:any;
  fromDate: any;
  toDate: any;
  id: any;
  singleData: any;
  constructor(public dialog: MatDialogRef<HksDailogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private adminService: AdminSupportService
   ) {
    this.id = this.data.id;
    
  }

  ngOnInit(): void {
    this.getById();
  }

  getById(){
   this.adminService.get_ById_hk(this.id).subscribe((res:any)=>{
    this.singleData = res.data; 
   })
  }
}
