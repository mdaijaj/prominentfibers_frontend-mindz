import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AdminSupportService } from 'src/app/@shared/services/admin-support.service';

@Component({
  selector: 'app-inward-dailog',
  templateUrl: './inward-dailog.component.html',
  styleUrls: ['./inward-dailog.component.scss']
})
export class InwardDailogComponent {
  localTime:any;
  fromDate: any;
  toDate: any;
  id: any;
  singleData: any;
  constructor(public dialog: MatDialogRef<InwardDailogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private adminService: AdminSupportService,
   ) {
    this.id = this.data.id;
    console.log(this.id);
  }

  ngOnInit(): void {
    this.getById();
  }

  getById(){
   this.adminService.getSingleInward(this.id).subscribe((res:any)=>{
    this.singleData = res.data;     
   })
  }
}
