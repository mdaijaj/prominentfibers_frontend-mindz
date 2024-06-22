import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ICellRendererParams } from 'ag-grid-community';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { ExpenseDialogComponent } from '../expense-dialog/expense-dialog.component';
import { LeadService } from 'src/app/@shared/services/lead.service';
import { ExportService } from 'src/app/@shared/services/export/export.service';
import { ItticketingService } from 'src/app/@shared/services/itticketing.service';

@Component({
  selector: 'app-actions',
  templateUrl: './actions.component.html',
  styleUrls: ['./actions.component.scss'],
})
export class ActionsComponent {
  travelId: any;
  enableConfirm: boolean = false;
  enableApprove: boolean = false;
  enableSuggest: boolean = false;
  enableSubmit: boolean = false;
  enableBooked: boolean = false;
  enableSuggestTwo:boolean=false;
  tiketId: any;
  expenseId: any;
  taskLeadId: any;
  confirmIcon:boolean=false;
  expense_detailId: any;
  confirmTicketId: any;
  urll: any;
  urll2: any;
  data: any;
  expenceTask: any;
  travelTask:boolean=false;
  expenseTask:boolean=false;
  traveltask: any;
  tr:boolean=false;
  ec:boolean=false;
  ticketId: any;
  toaster: any;
  travelData: any;
  bookTicket:boolean=false;
  cancelRequest:boolean=false;
  cancelRequestApproved:boolean=false;
  cancelStatus:boolean=false;
  travelIdBording: any;
  // filesArray:any[]=[];
  enableProcessing: boolean=false;
  enablePosted:boolean=false;
  billableStatus: boolean=false;
  nonBillableStatus:boolean=false;
  enableManageApprovel:boolean=false;
  enableOpen:boolean=false;
  downloadTicket:boolean=false;
  expenseIdCopy: any;
  empId:any;
  expenseDraft: boolean;
  myExpenseId: any;
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
    this.urll = this.route.url;

this.urll2 = this.route.url.toString();

this.expenceTask=(this.urll2.slice(79, 97))


this.traveltask = (this.urll2.slice(84, 97))

this.empId=localStorage.getItem('EmpMainId');


if(this.urll2=='/master/expense-main/travel-request/travel-request/task-order-travel?expense_create=travel-create'){
this.tr=true;
}else if(this.urll2=='/master/expense-main/expense-managment/my-expenses/task-order-list?expense_create=expense-create'){
this.ec=true;
}

// if(this.traveltask){
// this.travelTask=true
//  this.expenseTask=false;

// }

// if(this.expenceTask){
// this.expenseTask=true;
//  this.travelTask=false;
// }
this.getByZip()

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
    
  }
  getValueToDisplay(params: ICellRendererParams) {
    
    this.travelId = params.data.expense_id;
    this.expenseIdCopy= params.data.expense_id;
    this.tiketId=params.data?.ticket_id;
    this.confirmTicketId=params.data?.ticket_id;
    this.expenseId=params.data?.myexpense_id;
    this.taskLeadId = params.data?.lead_genration_id;
    this.expense_detailId=params.data?.exp_detail_id;
    this.travelIdBording=params.data?.expense_id;
    this.myExpenseId=params.data?.myexpense_id;
    
    
    
    if (params.data.status === 'Submitted') {
      this.enableSubmit = true;
    }
    if (params.data.travel_status === 'Suggested') {
      this.enableSuggest = true;
    }
    if (params.data.status === 'Suggested') {
      this.enableSuggestTwo = true;
    }
    if (params.data.status === 'Confirmed') {
      this.enableConfirm = true;
    }
    if (params.data.status === 'Booked Tickets') {
      this.downloadTicket = true;
    }
    if (params.data.status === 'Pending') {
      this.enableBooked = true;
    }
    if (params.data.status === 'Approved') {
      this.enableApprove = true;
    }
    if (params.data.travel_status === 'Confirmed') {
      this.confirmIcon=true;
      }

      if(params.data.status==='Booked Tickets'){
         this.bookTicket=true;
      }
      if(params.data.status==='Cancel Request'){
        this.cancelRequest=true;
        }

        if(params.data.status==='Cancel Request Approved'){
          this.cancelRequestApproved=true;
          }

  if (params.data.travel_status === 'Confirmed') {
    this.cancelStatus = true;
  }
  if (params.data.status === 'Open') {
    this.enableOpen = true;
  }
  if (params.data.status === 'Processing' && params.data.expense_type=="Billable") {
    this.enableProcessing = true;
  }
  if (params.data.status === 'Posted') {
    this.enablePosted = true;
  }
  if (params.data.status === 'ManageApproval') {
    // this.enableManageApprovel = true;
    this.enableProcessing = true;

  }

  if (params.data.status === 'Expense Draft') {
    this.expenseDraft = true;
  }

  if(params.data.expense_type === "Non-Billable" && params.data.status === "Processing"){
    this.enableManageApprovel = true;

  }

  if(params.data.task_order===null){
this.nonBillableStatus=true;

  }
  else{
this.billableStatus=true;

  }
    if (params.data.expense_id) {
      return this.travelId
    } else if (params.data.lead_genration_id) {
      return this.taskLeadId
    } else {
      return this.expenseId
    }
    
    
  }
  refresh(params: ICellRendererParams): boolean {
    // set value into cell again
    
    this.cellValue = this.getValueToDisplay(params);
    
    
    if (params) {
      const ticket = this.allCountryData.find(
        (e: any) => e.ticket_id === params.data.ticket_id
      );
      

      const data: any = {
        ticket_id: ticket.ticket_id,
      };

      
      if (params.data.color === null && params.data.color !== '') {
        const ticket_id: number = Number(params.data.ticket_id);

        this. updatetravelstatus(ticket_id, data);
        // this.updateSingleCountry(countryss_id,data)
        
      }
     else {
      this.toaster.error(
        'Something went wrong please try again',
        'Error Message'
      );
    }
  }
    this.cellValue = this.getValueToDisplay(params);
    return true;
  }

  
  edit(){
    this.router.navigate(["master/expense-main/expense-managment/travel-request/create-request"],{queryParams:{lead_id:this.cellValue }})
  }
  editConfirm(){
    this.router.navigate(["master/expense-main/expense-managment/travel-request/confirm-travel-request"],{queryParams:{lead_id:this.cellValue}})
  }
 
  editBook(){
    this.router.navigate(["master/expense-main/expense-managment/travel-request/book-travel-request"],{queryParams:{lead_id:this.cellValue}})

  }
  postStatus() {
    // this.router.navigate(["master/expense-main/expense-managment/my-expenses/create-expense"],{queryParams:{lead_id:this.cellValue}})
    this.router.navigate(["master/expense-main/expense-managment/make-payment/make-payment-create"],{queryParams:{lead_id:this.cellValue}})

  }
  bookedFunc2() {
    this.router.navigate(["master/expense-main/expense-managment/make-payment/make-payment-create"],{queryParams:{lead_id:this.cellValue}})
  }
  enableApproved(e:any){
    e.stopPropagation();
    this.router.navigate(["master/expense-main/expense-managment/aproved-reject-user/approved-reject-create"],{queryParams:{lead_id:this.cellValue}})

  }
  bookedFunc() {
    this.router.navigate(["master/expense-main/expense-managment/approve-expense/approve-expense-create"],{queryParams:{lead_id:this.cellValue}})
  }
  createTask() {
    this.router.navigate(["master/expense-main/expense-managment/my-expenses/create-expense"],{queryParams:{task_lead_id:this.cellValue}})
  }
  createTravel() {
    this.router.navigate(["master/expense-main/expense-managment/travel-request/create-request"],{queryParams:{task_lead_id:this.cellValue}})
  }
  validate(e: any) {
    e.stopPropagation();
    this.router.navigate(["master/expense-main/expense-managment/travel-request/create-request"],{queryParams:{lead_id:this.cellValue}})
  }
  cancelTicket(e: any) {
    e.stopPropagation();
    this.router.navigate(["master/expense-main/expense-managment/travel-request/cancel-reuest"],{queryParams:{lead_id:this.cellValue}})
  }
  cancelTicketReuest(e: any) {
    e.stopPropagation();
    this.router.navigate(["master/expense-main/expense-managment/travel-request/cancel-reuest"],{queryParams:{lead_id:this.cellValue}})
  }
  confirmCancelTicket(e: any) {
    e.stopPropagation();
    this.router.navigate(["master/expense-main/expense-managment/travel-request/cancel-reuest"],{queryParams:{lead_id:this.cellValue}})
  }

  postedExpense(e: any) {
    e.stopPropagation();
    this.router.navigate(["master/expense-main/expense-managment/posted-expense/posted"],{queryParams:{lead_id:this.cellValue}})
  }
  mangeExpense(e:any){
    this.router.navigate(["master/expense-main/expense-managment/manger-expense/manger-expense"],{queryParams:{lead_id:this.cellValue}})

  }
  manageExpenseStatus(e:any){
    e.stopPropagation();

    this.router.navigate(["master/expense-main/expense-managment/manger-expense/manger-expense"],{queryParams:{lead_id:this.cellValue}})

  }
  processingStatus(e:any){
    e.stopPropagation();
    this.router.navigate(["master/expense-main/expense-managment/processing-expense/processing"],{queryParams:{lead_id:this.cellValue}})
  }
  viewDialog(e:any){
    
  }
  downloadTickets(e: any) {
    e.stopPropagation();
    this.router.navigate(["master/expense-main/expense-managment/travel-request/download-ticket"],{queryParams:{lead_id:this.cellValue}})
  }

  draftUpdate(e: any) {
    e.stopPropagation();
    this.router.navigate(["master/expense-main/expense-managment/my-expenses/update-my-expense"],{queryParams:{myexpense_id:this.myExpenseId}})
  }

  expenseDetailEdit(e:any){
    e.stopPropagation();
    this.leadService.sayMessage(this.expense_detailId);

  }
  updateConfirm(e:any){
    e.stopPropagation();
    this.leadService.ticket(this.tiketId);
  }
  ticketIdConfirm(e:any){
    e.stopPropagation();
    this.leadService.ticketIdConfirm(this.expense_detailId);

  }

  updatetravelstatus(id: any, data: any) {
    this.leadService.updateTravelTiket(this.ticketId,data).subscribe(
      (res: any) => {
        
        this.toaster.success('State Updated Successfully');
      },
      (err: any) => {
        this.toaster.error(
          'Something went wrong please try again',
          'Error Message'
        );
        
      }
    );
  }

  openDialog() {

    // const dialogRef
    //   = this.dialog.open(ItticketingDialogComponent, {
    //     // width: '100%',
    //     // maxWidth: '100vw',
    //     // maxHeight: '100vh',
    //     // height: '100%',
    //     // panelClass: 'full-screen-modal',
    //     data: { itTicketing_number: this.cellValue }
        
    //   });
      
    // dialogRef.afterClosed().subscribe(result => {
    //   
    // });
    // 
    
  }

  view(e:any){
    e.stopPropagation();

     const dialogRef
      = this.dialog.open(ExpenseDialogComponent, {
        // width: '100%',
        // maxWidth: '100vw',
        // maxHeight: '100vh',
        // height: '100%',
        // panelClass: 'full-screen-modal',
        data: { itTicketing_number: this.tiketId}
        
      });
      
    dialogRef.afterClosed().subscribe(result => {
      
    });
    
  }
  expenceDetailsView(e:any){
    e.stopPropagation();
    const dialogRef
    = this.dialog.open(ExpenseDialogComponent, {
       width: '40%',
      // maxWidth: '100vw',
      // maxHeight: '100vh',
      // height: '100%',
      // panelClass: 'full-screen-modal',
      data: { expenseDetailId:this.expense_detailId}
      
    });
    
  dialogRef.afterClosed().subscribe(result => {
    
  });
  
  }

  confirmClick(e:any){
    e.stopPropagation();
    const dialogRef
    = this.dialog.open(ExpenseDialogComponent, {
       width: '40%',
      // maxWidth: '100vw',
      // maxHeight: '100vh',
      // height: '100%',
      // panelClass: 'full-screen-modal',
      data: { confirmTicketId:this.confirmTicketId}
      
    });
    
  dialogRef.afterClosed().subscribe(result => {
    
  });
  
  }
  cancelStatusPopup(e:any){
    const dialogRef
    = this.dialog.open(ExpenseDialogComponent, {
       width: '40%',
      // maxWidth: '100vw',
      // maxHeight: '100vh',
      // height: '100%',
      // panelClass: 'full-screen-modal',
      data: { confirmTicketId:this.confirmTicketId}
      
    });
    
  dialogRef.afterClosed().subscribe(result => {
    
  });
  
  }

  uploadOnbording(e:any){
    e.stopPropagation();
    
    
    const dialogRef
    = this.dialog.open(ExpenseDialogComponent, {
       width: '40%',
      // maxWidth: '100vw',
      // maxHeight: '100vh',
      // height: '100%',
      // panelClass: 'full-screen-modal',
      data: { uploadOnbording:this.travelIdBording}
      
    });
    
  dialogRef.afterClosed().subscribe(result => {
    
  });
  
  }
  filesArray: any[] = [
    // {
    //   filePath:
    //     'https://dqsdevapi.elitetraveltech.in/documents/employee_photo-1677830279416.pdf',
    // },
    // {
    //   filePath:
    //     'https://dqsdevapi.elitetraveltech.in/documents/employee_photo-1677830279419.pdf',
    // },

    // {
    //   filePath:
    //     'https://dqsdevapi.elitetraveltech.in/documents/employee_photo-1677064810072.png',
    // },
  ];

  getByZip(){
    this._itticketSerive.zipGetFile(this.expenseId).subscribe((res:any)=>{
      
      this.filesArray=res.data;
      
      
    })
  }
  downloadFile() {
    this.downloadService.createZip(
      this.filesArray?.map((c) => c.attachedBill),
      'DQS_Project_Folder'
    );
  }

  zohoIntegrat(e:any){
    e.stopPropagation();
    this.router.navigate(["master/finance/account-payable/all-recived-invoice/expense-invoice"])
  }
  expenseDetailDelete(e:any){
    e.stopPropagation();

this.leadService.expenseDetailDelete(this.expense_detailId).subscribe((res:any)=>{
  console.log(res,'resssss');
  this.reload()
})
  }
  reload(){
    setTimeout(() => {
      window.location.reload();
    }, 500); // Activate after 5 minutes.
  }
}
