import { Component,Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ItticketingService } from 'src/app/@shared/services/itticketing.service';

@Component({
  selector: 'app-new-ticket-dialog',
  templateUrl: './new-ticket-dialog.component.html',
  styleUrls: ['./new-ticket-dialog.component.scss']
})
export class NewTicketDialogComponent {
  itTicketing_number: any;
  itTicketingGetByData: any;

  constructor(private _itTicketingService:ItticketingService,  public dialog: MatDialogRef<NewTicketDialogComponent>,
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
