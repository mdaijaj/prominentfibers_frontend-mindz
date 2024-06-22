import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AdminSupportService } from 'src/app/@shared/services/admin-support.service';

@Component({
  selector: 'app-insurance-dailog',
  templateUrl: './insurance-dailog.component.html',
  styleUrls: ['./insurance-dailog.component.scss']
})
export class InsuranceDailogComponent {
  localTime:any;
  fromDate: any;
  toDate: any;
  id: any;
  singleData: any;
  constructor(public dialog: MatDialogRef<InsuranceDailogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private adminService: AdminSupportService
   ) {
    this.id = this.data.id;
    console.log(this.id);
    
    
  }

  ngOnInit(): void {
    this.getById();
  }

  getById(){
   this.adminService.get_ById_ins(this.id).subscribe((res:any)=>{
    this.singleData = res.data; 
   })
  }
}
