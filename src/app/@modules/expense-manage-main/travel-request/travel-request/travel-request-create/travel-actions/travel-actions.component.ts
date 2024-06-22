import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ICellRendererParams } from 'ag-grid-community';
import { ExportService } from 'src/app/@shared/services/export/export.service';
import { ItticketingService } from 'src/app/@shared/services/itticketing.service';
import { LeadService } from 'src/app/@shared/services/lead.service';

@Component({
  selector: 'app-travel-actions',
  templateUrl: './travel-actions.component.html',
  styleUrls: ['./travel-actions.component.scss']
})
export class TravelActionsComponent {
  public cellValue: any;
  tiketId: any;

  constructor(
    private route: Router,
    public dialog: MatDialog,
    private router:Router,
    private leadService:LeadService,
    private downloadService: ExportService,
    private _itticketSerive:ItticketingService
  ) {
    
    
  }
  reloadCurrentRoute() {
    let currentUrl = this.route.url;
    this.route.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.route.navigate([currentUrl]);
    });
  }

  agInit(params: ICellRendererParams): void {
    this.cellValue = this.getValueToDisplay(params);
    console.log(params,'paraams agInit');
    
  }
  getValueToDisplay(params: ICellRendererParams) {
 console.log(params,'params');
 this.tiketId=params.data?.ticket_id;
 console.log(this.tiketId,'this.tiketId');
 
}
refresh(params: ICellRendererParams) {
  // set value into cell again
  
  this.cellValue = this.getValueToDisplay(params);
}
edit(e:any){
  e.stopPropagation();
  console.log(e,'eeeee');
  this.leadService.ticketIdShare(this.tiketId);
}
}
