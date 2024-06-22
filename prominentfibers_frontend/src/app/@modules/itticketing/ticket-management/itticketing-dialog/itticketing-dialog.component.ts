import { Component,Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ItticketingService } from 'src/app/@shared/services/itticketing.service';

@Component({
  selector: 'app-itticketing-dialog',
  templateUrl: './itticketing-dialog.component.html',
  styleUrls: ['./itticketing-dialog.component.scss']
})
export class ItticketingDialogComponent {
  itTicketing_number: any;
  itTicketingGetByData: any;

  constructor(private _itTicketingService:ItticketingService,  public dialog: MatDialogRef<ItticketingDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any){
      
      
this.itTicketing_number=data.itTicketing_number;

}
  ngOnInit(){
this.getByIdItticketing()
  }

  getByIdItticketing() {
    
    
    this._itTicketingService.getByIdItticketing(this.itTicketing_number).subscribe((res: any) => {
      this.itTicketingGetByData = res.data;
      
     
    })
  }
}
