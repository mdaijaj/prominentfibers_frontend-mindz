import { Component, Inject } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { ItticketingService } from 'src/app/@shared/services/itticketing.service';
import { LeadService } from 'src/app/@shared/services/lead.service';
import { RecruitService } from 'src/app/@shared/services/recruitment.service';

@Component({
  selector: 'app-expense-dialog',
  templateUrl: './expense-dialog.component.html',
  styleUrls: ['./expense-dialog.component.scss']
})
export class ExpenseDialogComponent {
  status: any;
  ticketData: any;
  ticketId:any;
  id: any;
  lead_id: any;
  myExpense_id:any;
  expenseDataById:any;
  expenseDetailId:any;
  expenseDetailsData: any;
  confirmIconData: any;
  confirmIdData: any;
  // fileDetails2: any;
  mangeNum:boolean=false;
  errorMsg: string;
  fileDetails2: { filePath: string | any; file: any } = {
    filePath: '',
    file: null,
  };
  leadForm:any
  fileInvoice: { filePath: string | any; file: any } = {
    filePath: '',
    file: null,
  };
  fileOnbord: { filePath: string | any; file: any } = {
    filePath: '',
    file: null,
  };
  confirmTicket: any;
  totleamount: any;
  cgstAmoun: number;
  cgstAmount: number;
  sgstAmount: number;
  totleInvoice: any;
  totleFee: any;
  managementFee: any;
  uploadBoardData: any;
  uploadOnbordingId: any;
  onbordForm:any;
  // fb: any;
  totleInvoiceCopy: any;
  expenseDetailsDataCopy: any;
  constructor(private _itteketService: ItticketingService,public dialog: MatDialogRef<ExpenseDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,private _leadService:LeadService, private activeroute: ActivatedRoute, private toster: ToastrService,
    private leadService: LeadService, 
    private route: Router, 
    private recruitService: RecruitService, 
    private fb: FormBuilder
   ){
    this.leadForm = this.fb.group({
      attach_ticket:new FormControl(),
      attach_invoice:new FormControl(),
      mangement_fee:new FormControl(),
      upload_onbording:new FormControl
    })

    this.onbordForm=this.fb.group({
      upload_onbording:new FormControl(null)
    })
      this.ticketId=data.itTicketing_number;
      
      
      this.confirmTicket=data.confirmTicketId;
      this.myExpense_id=data.myexpense_id;
      
      this.expenseDetailId=data.expenseDetailId;
      
      this.confirmIconData=data.confirmTicketId;
      
      this.uploadOnbordingId=data.uploadOnbording;
      
      
  }
  
  ngOnInit(): void {
    this.activeroute.queryParams.subscribe(params => {
      this.id = params;
      this.lead_id = this.id.lead_id;
   
   
    });
if( this.myExpense_id){
  this.editExpense();
  
}
    if(this.ticketId){
      this.getByTicketList();

    }
    if(this.confirmIconData){
this.getByConfirmDialog();
    }
this.expenceDetails();
this.getByConfirmDialog();
this.getBytravelData();
this.expenceDetailsgetByCopy();
  }
  getByTicketList(){
    this._leadService.getByTravelTicket(this.ticketId).subscribe((res:any)=>{
      this.ticketData=res.data;
      
      
    })
  }
  getStatus(e:any){
    
    this.status=e.value;
    
}
statusGet(){

  let data={
    travel_status:this.status,
    attach_ticket:null,
    attach_invoice:null
  }
  
  
  this._leadService.updateTravelTiket(this.ticketId,data).subscribe((res:any)=>{
    
    this.confirmForm();
  })
}
confirmForm() {
  const data = {
    status: "Confirmed"
  }
  this._leadService.updateTravel(this.lead_id, data).subscribe((res:any) => {
    
    this.toster.success("Travel Ticket Status Updated ")
    // this.reload();
  })
}

reload(){
  setTimeout(() => {
    window.location.reload();
  }, 500); // Activate after 5 minutes.
}

editExpense() {
  

  this._itteketService.getByExpense(this.myExpense_id).subscribe((res: any) => {
    this.expenseDataById = res.data;
    
   
  });
}

expenceDetails() {
   this._itteketService.getByExpenseDetails(this.expenseDetailId).subscribe((res: any) => {
    
    
    this.expenseDetailsData = res.data;
    
   
  });
}
expenceDetailsgetByCopy() {
  this._itteketService.getByExpenseDetailsIdCopy(this.expenseDetailId).subscribe((res: any) => {
   
   
   this.expenseDetailsDataCopy = res.data;
   
  
 });
}
getByConfirmDialog(){
  
  
  this._leadService.getByExpenseTicketBy(this.confirmIconData).subscribe((res:any)=>{
    
    
    this.confirmIdData=res.data;
    
    this.totleamount=res.data[0]?.travel_amount;
    
    // this.cgstAmount=this.totleamount * 9/100;
    
    // this.sgstAmount=this.totleamount * 9/100;
    
    this.totleInvoice=this.totleamount+ this.cgstAmount+this.sgstAmount;
    
    
  })
}
attchApprovalFile(fileInput: File[] | any) {
  this.errorMsg = '';
  if (fileInput.target.files && fileInput.target.files[0]) {
    const file = fileInput.target.files[0];
    const reader = new FileReader();
    const fileSizeInMb = file.size / 1024 ** 2;
    if (fileSizeInMb > 30) {
      this.errorMsg = 'File size should be less than 30MB';
      return;
    }
    reader.onload = (e: any) => {
      this.fileDetails2.filePath = reader.result;
    };
    reader.readAsDataURL(file);
    this.fileDetails2.file = file;
  } else {
    this.fileDetails2 = { filePath: '', file: null };
  }
  
  
}

attachInvoiceFile(fileInput: File[] | any) {
  this.errorMsg = '';
  if (fileInput.target.files && fileInput.target.files[0]) {
    const file = fileInput.target.files[0];
    const reader = new FileReader();
    const fileSizeInMb = file.size / 1024 ** 2;
    if (fileSizeInMb > 30) {
      this.errorMsg = 'File size should be less than 30MB';
      return;
    }
    reader.onload = (e: any) => {
      this.fileInvoice.filePath = reader.result;
    };
    reader.readAsDataURL(file);
    this.fileInvoice.file = file;
  } else {
    this.fileInvoice = { filePath: '', file: null };
  }

  
  
}

attachOnbording(fileInput: File[] | any){
  this.errorMsg = '';
  if (fileInput.target.files && fileInput.target.files[0]) {
    const file = fileInput.target.files[0];
    const reader = new FileReader();
    const fileSizeInMb = file.size / 1024 ** 2;
    if (fileSizeInMb > 30) {
      this.errorMsg = 'File size should be less than 30MB';
      return;
    }
    reader.onload = (e: any) => {
      this.fileOnbord.filePath = reader.result;
    };
    reader.readAsDataURL(file);
    this.fileOnbord.file = file;
  } else {
    this.fileOnbord = { filePath: '', file: null };
  }

  
  
}
submitTravel(){

    let val = this.leadForm.value;
    
    
    // const data = {
    //   travel_id: val.travel_id,
    //   travel_type: val.travel_type,
    //   travel_desc: val.travel_desc,
    //   travel_approval: val.travel_approval,
    //   expense_approval: val.expense_approval,
    //   task_order: val.task_order,
    //   travel_ticket: val.travel_ticket,
    //   traveler_name: val.traveler_name,
    //   travel_date: moment(val.travel_date).format('YYYY-MM-DD'),
    //   modeOf_travel: val.modeOf_travel,
    //   travel_form: val.travel_form,
    //   travel_to: val.travel_to,
    //   remarks: val.remarks,
    //   // attach_ticket:this.fileDetails2.file,
    //   // attach_invoice:this.fileInvoice.file,
    //   status: "Booked Tickets"
    // }
    const formData = new FormData();

    formData.append("attach_ticket",this.fileDetails2.file);
    formData.append("attach_invoice",this.fileInvoice.file);
    formData.append("attach_remarks",val.attach_remarks);
    formData.append("mangement_fee",val.mangement_fee);
    
    
    

    
    // this.leadService.updateTravel(this.lead_id, data).subscribe((res:any) => {
    //   
    //   this.toster.success("Booked Tickets Successfully");
    //   this.route.navigate(['master/itticket/expense-management/travel-request']);
    // },
    // (err:any)=>{
    //   this.toster.error("Something Went To wrong")
    // }
    // )
    
    
    this.leadService.updateBookTicketFile(this.confirmTicket, formData).subscribe((res:any) => {
      
       this.toster.success("Add Successfully");
      // this.route.navigate(['master/itticket/expense-management/travel-request']);
    })
    
  
}
submitOnbording(){
let val=this.onbordForm.value;

const formData = new FormData();

    formData.append("upload_onbording",this.fileOnbord.file);
    
    
    this._itteketService.updateUploadOnbording( this.uploadOnbordingId, formData).subscribe((res:any) => {
      
       this.toster.success("Upload Onbording Pass Successfully");
      // this.route.navigate(['master/itticket/expense-management/travel-request']);
    })
}
bookForm() {
  let val = this.leadForm.value;
  
  
  const data = {
    travel_id: val.travel_id,
    travel_type: val.travel_type,
    travel_desc: val.travel_desc,
    travel_approval: val.travel_approval,
    expense_approval: val.expense_approval,
    task_order: val.task_order,
    travel_ticket: val.travel_ticket,
    traveler_name: val.traveler_name,
    travel_date: moment(val.travel_date).format('YYYY-MM-DD'),
    modeOf_travel: val.modeOf_travel,
    travel_form: val.travel_form,
    travel_to: val.travel_to,
    remarks: val.remarks,
    // attach_ticket:this.fileDetails2.file,
    // attach_invoice:this.fileInvoice.file,
    status: "Booked Tickets"
  }
  const formData = new FormData();

  formData.append("attach_ticket",this.fileDetails2.file);
  formData.append("attach_invoice",this.fileInvoice.file);
  formData.append("attach_remarks",val.attach_remarks)
  
  
  

  
  this.leadService.updateTravel(this.lead_id, data).subscribe((res:any) => {
    
    this.toster.success("Booked Tickets Successfully");
    this.route.navigate(['master/expense-main/expense-management/travel-request']);
  },
  (err:any)=>{
    this.toster.error("Something Went To wrong")
  }
  )
  
  
  this.leadService.updateBookTicketFile(this.confirmTicket, formData).subscribe((res:any) => {
    
    // this.toast.success("Booked Tickets Successfully");
    // this.route.navigate(['master/itticket/expense-management/travel-request']);
  })
  
}
onSearchChange(e:any){
  this.mangeNum=true;

let am=e.target.value;
this.managementFee=Number(am);



this.totleFee=this.totleInvoice + this.managementFee;

// var am=document.getElementsByName("mangement_fee")[e.target.value];
// 
this.cgstAmount=this.managementFee* 9/100;
this.sgstAmount=this.managementFee* 9/100;



this.totleInvoiceCopy=this.cgstAmount+this.sgstAmount+this.totleamount
this.totleFee=this.totleInvoiceCopy + this.managementFee;


}

getBytravelData(){
  
    this.leadService.getByIdTravel(this.uploadOnbordingId).subscribe((res:any) => {
      this.uploadBoardData = [res.data];
//       
// this.taskData=`${this.singleLeadData.taskOrder_no + "/" + this.singleLeadData.associated_company + "/" + this.singleLeadData.address2}`;
     
     
})
}
}
