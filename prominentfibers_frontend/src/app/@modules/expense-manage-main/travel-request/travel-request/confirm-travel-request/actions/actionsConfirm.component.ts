import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ICellRendererParams } from 'ag-grid-community';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
// import { ExpenseDialogComponent } from '../expense-dialog/expense-dialog.component';
import { LeadService } from 'src/app/@shared/services/lead.service';
import { ExportService } from 'src/app/@shared/services/export/export.service';
import { ItticketingService } from 'src/app/@shared/services/itticketing.service';
import { ExpenseDialogComponent } from '../../expense-dialog/expense-dialog.component';

@Component({
  selector: 'app-actions',
  templateUrl: './actionsConfirm.component.html',
  styleUrls: ['./actionsConfirm.component.scss'],
})
export class ActionsConfirmComponent {
  empId: any;
  expenseIdTikcet: any;
  ticketIdTravel: any;

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
  allCountryData: any;

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
     // this.travelId = params.data.expense_id;
     console.log(params,'getValue');
     
     this.empId=params.data.employee_id;
     this.expenseIdTikcet=params.data.expenseId;
     this.ticketIdTravel=params.data.ticket_id;

  
    
  }
  refresh(params: ICellRendererParams): boolean {
    // set value into cell again
    
    this.cellValue = this.getValueToDisplay(params);
    
    
    this.cellValue = this.getValueToDisplay(params);
    return true;
  }
  // confirmForm(e:any){
  //   e.stopPropagation()
  //   const dialogRef
  //   = this.dialog.open(ExpenseDialogComponent, {
  //      width: '40%',
  //     // maxWidth: '100vw',
  //     // maxHeight: '100vh',
  //     // height: '100%',
  //     // panelClass: 'full-screen-modal',
  //     data: {employId:this.empId,expenseIdTravel:this.expenseIdTikcet,ticketIdtravel:this.ticketIdTravel}
      
  //   });
    
  // dialogRef.afterClosed().subscribe(result => {
    
  // });
  // }
  
}
