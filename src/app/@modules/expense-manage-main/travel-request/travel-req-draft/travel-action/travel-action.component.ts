import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ICellRendererParams } from 'ag-grid-community';
import { ExportService } from 'src/app/@shared/services/export/export.service';
import { ItticketingService } from 'src/app/@shared/services/itticketing.service';
import { LeadService } from 'src/app/@shared/services/lead.service';
import { ExpenseDialogComponent } from '../../travel-request/expense-dialog/expense-dialog.component';

@Component({
  selector: 'app-travel-action',
  templateUrl: './travel-action.component.html',
  styleUrls: ['./travel-action.component.scss']
})
export class TravelActionComponent {
  travelId: any;
  expenseChild:boolean=false;
  expenseIdCopy: any;
  travelDetailsId: any;
  tiketId: any;
  constructor(
    private route: Router,
    public dialog: MatDialog,
    private router:Router,
    private leadService:LeadService,
    private downloadService: ExportService,
    private _itticketSerive:ItticketingService
  ) {
    // this.data = localStorage.getItem("jobId");
    // 
    
  }
  ngOnInit(): void {

  }
  public cellValue: any;

  agInit(params: ICellRendererParams): void {
    this.cellValue = this.getValueToDisplay(params);
    console.log(params,'paraams agInit');
    
  }
  getValueToDisplay(params: ICellRendererParams) {
    console.log(params,'params');
    
    this.travelId = params.data.expense_id;
    this.expenseIdCopy= params.data.expense_id;

    this.travelDetailsId=params.data.expensechildId;
    this.tiketId=params.data?.ticket_id;
    console.log(this.tiketId,'this.tiketId');
    if(params.data.expensechildId){
      this.expenseChild=true
        }
  }
  refresh(params: ICellRendererParams): boolean {
    // set value into cell again
    this.cellValue = this.getValueToDisplay(params);
    this.cellValue = this.getValueToDisplay(params);
    return true;
  }


  travelDetails(e:any){
    const dialogRef
    = this.dialog.open(ExpenseDialogComponent, {
       width: '40%',
      // maxWidth: '100vw',
      // maxHeight: '100vh',
      // height: '100%',
      // panelClass: 'full-screen-modal',
      data: { travelDetailId:this.travelDetailsId ,expenseTravelChiled:this.expenseIdCopy}
      
    });
    
  dialogRef.afterClosed().subscribe(result => {
    
  });
  }
  updateConfirm(e:any){
    
  }
  travelChiled(e:any){
    console.log(this.travelDetailsId,'this.expenseIdCopy');
    
    e.stopPropagation();
    this.leadService.travelChiled(this.travelDetailsId);

  }
  edit(e:any){
    e.stopPropagation();
    console.log(this.tiketId,'eeeee this.tiketId');
    this.leadService.ticketIdShare(this.tiketId);
    
  }
}
