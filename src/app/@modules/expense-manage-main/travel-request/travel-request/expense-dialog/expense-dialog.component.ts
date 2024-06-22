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
  ticketId: any;
  id: any;
  lead_id: any;
  myExpense_id: any;
  expenseDataById: any;
  expenseDetailId: any;
  expenseDetailsData: any;
  confirmIconData: any;
  confirmIdData: any;
  // fileDetails2: any;
  mangeNum: boolean = false;
  errorMsg: string;
  fileDetails2: { filePath: string | any; file: any } = {
    filePath: '',
    file: null,
  };
  leadForm: any
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
  onbordForm: any;
  // fb: any;
  totleInvoiceCopy: any;
  expenseDetailsDataCopy: any;
  travelTicketId: any;
  travelChildData: any;
  expenseId: any;
  employeId: any;
  expenseIdTicket: any;
  ticketIdTravel: any;
  travelTicketData: any;
  expenseIdUser: any;
  dataTravelRequst: any;
  trippleId: any;
  travelDetailChiled: any;
  travelDetailsId: any;
  travelChildDataCopy: any;
  expenseIdTravelChiled: any;
  employidTicket: any;
  expenseIdtravel: any;
  ticketIdTravelCopy: any;
  travelTicketConfirm: any;
  employeIdProcessing: any;
  expenseIdTicketProcessing: any;
  ticketIdTravelProcessing: any;
  allStatusList: any;
  processingForm: any;
  travelTicketDataProcessing: any;
  processingStatusId: string;
  myExpenseIdProcesing: any;
  expenseDetailsDataProcessing: any;
  expenseDetailIdProces: any;
  pdfFile: any = '../../../../../../assets/icons/pdfimg.png';
  attachBill: boolean = false;
  hideInvoiceFileds: boolean = false;
  cancelTicketId: any;
  cancelEmpId: any;
  cancelExpenseId: any;
  travelTicketCancel: any;
  statusCancel: any;
  agentTicket: any;
  ticketCancelApprovedId: any;
  cancelApprovedEmpId: any;
  cancelApprovedExpenseId: any;
  traveltickeCanceltApproved: any;
  constructor(private _itteketService: ItticketingService, public dialog: MatDialogRef<ExpenseDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private _leadService: LeadService, private activeroute: ActivatedRoute, private toster: ToastrService,
    private leadService: LeadService,
    private route: Router,
    private recruitService: RecruitService,
    private fb: FormBuilder
  ) {
    this.leadForm = this.fb.group({
      attach_ticket: new FormControl(),
      attach_invoice: new FormControl(),
      mangement_fee: new FormControl(),
      upload_onbording: new FormControl
    })

    this.onbordForm = this.fb.group({
      upload_onbording: new FormControl(null)
    })

    this.processingForm = this.fb.group({
      verifier_comment: new FormControl(),
      verifier_name: new FormControl(),
      verifier_comment2: new FormControl(),
      verifier_name2: new FormControl()
    })

    this.ticketId = data.itTicketing_number;

    console.log(data, 'dataaaa');
    this.expenseIdUser = data.expenseId;

    this.travelTicketId = data.travel_id;
    this.expenseId = data.expense_id;
    this.confirmTicket = data.confirmTicketId;
    this.myExpense_id = data.myexpense_id;

    this.expenseDetailId = data.expenseDetailId;

    this.confirmIconData = data.confirmTicketId;

    this.uploadOnbordingId = data.uploadOnbording;

    this.employeId = data.empId,
    this.expenseIdTicket = data.expenseId,
    this.ticketIdTravel = data.ticket_id,
    this.travelDetailChiled = data.expensechildId;


    // processing pop
    this.employeIdProcessing = data.empIdProcessing,

    this.expenseIdTicketProcessing = data.expenseIdProcessing,
     
    this.ticketIdTravelProcessing = data.ticket_idProcessing,
      
    // empIdProcessing
    // expenseIdProcessing
    // ticket_idProcessing
    this.myExpenseIdProcesing = data.myExpenseIdProces;
    this.expenseDetailIdProces = data.expenseDetailIdProces;
 

    // travel details chiled
    this.travelDetailsId = data.travelDetailId;
    console.log(this.travelDetailsId, 'this.travelDetailsId');
    this.expenseIdTravelChiled = data.expenseTravelChiled;
   
    //   employId

    // expenseIdTravel
    // ticketIdtravel
    //
    this.employidTicket = data.employId;
    this.expenseIdtravel = data.expenseIdTravel;
    this.ticketIdTravelCopy = data.ticketIdtravel;

    this.cancelTicketId = data.ticketCancelId;
    this.cancelEmpId = data.cancelEmpId;
    this.cancelExpenseId = data.cancelExpenseId;
    this.agentTicket=data.agent;
   
    this.ticketCancelApprovedId=data.ticketCancelApprovedId;
 
    
    this.cancelApprovedEmpId=data.cancelApprovedEmpId;
    

this.cancelApprovedExpenseId=data.cancelApprovedExpenseId;


  }

  ngOnInit(): void {
    this.activeroute.queryParams.subscribe(params => {
      this.id = params;
      this.lead_id = this.id.lead_id;

    });

    if (this.expenseDetailIdProces) {
      this.expenceDetailsgetByProcessing();
    }
    if (this.myExpense_id) {
      this.editExpense();

    }
    if (this.ticketId) {
      this.getByTicketList();

    }
    if (this.confirmIconData) {
      this.getByConfirmDialog();
    }
    this.expenceDetails();
    this.getByConfirmDialog();
    this.getBytravelData();
    this.expenceDetailsgetByCopy();
    this.getByTravelDetailsChiled();
    this.getByTravelTicketDetails();
    this.Allverifierstatusget();
    this.getByTravelTicketDetailsProcessing();
    if (this.travelTicketId || this.expenseId) {
    }

    if (this.expenseIdUser) {
      this.getByTravelRequest();

    }

    if (this.travelDetailsId) {
      this.ticketDetailsOpen()
    }

    this.getConfirmTravel();

    if (this.cancelTicketId) {
      this.getCancelTravel()

    }
    
      this.getCancelApprovedTravel();
    
  }
  getByTicketList() {
    this._leadService.getByTravelTicket(this.ticketId).subscribe((res: any) => {
      this.ticketData = res.data;


    })
  }
  getStatus(e: any) {

    this.status = e.value;

  }
  statusGet() {
    let data = {
      travel_status: this.status,
      attach_ticket: null,
      attach_invoice: null
    }

    this._leadService.updateTravelTiket(this.ticketIdTravelCopy, data).subscribe((res: any) => {
      this.confirmForm();
    })
  }
  confirmForm() {
    const data = {
      status: "Confirmed"
    }
    this._leadService.updateTravel(this.lead_id, data).subscribe((res: any) => {

      this.toster.success("Travel Ticket Status Updated ")
      this.reload();
    })
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

      if (res.data.attachedBill == null) {
        this.attachBill = true;

      }

    });
  }

  getByTravelDetailsChiled() {
    console.log(this.expenseId, this.travelTicketId, 'this.expenseId,this.travelTicketId');
    this._itteketService.getByTravelRequestChildDetails(this.expenseId, this.travelDetailChiled).subscribe((res: any) => {
      this.travelChildData = res.data;
      
    });
  }

  getByTravelTicketDetails() {

    // console.log(this.employeId, this.expenseIdTicket, this.ticketIdTravel, 'this.employeId,this.expenseIdTicket,this.ticketIdTravel');
    // this.trippleId=`${this.employeId }`  +  `${ this.expenseIdTicket }`  +  `${ this.ticketIdTravel }`
    

    this._itteketService.getByTravelTicketCopy(this.employeId, this.expenseIdTicket, this.ticketIdTravel).subscribe((res: any) => {
      this.travelTicketData = res.result;
      console.log(this.travelTicketData, 'this.travelChildData');

      for (let i = 0; i <= res.result.length; i++) {
        if (res.result[i].travel_status == "Suggested") {
          this.hideInvoiceFileds = true;
        }
      }

    });

  }
  getByConfirmDialog() {


    this._leadService.getByExpenseTicketBy(this.confirmIconData).subscribe((res: any) => {


      this.confirmIdData = res.data;
      // console.log(this.confirmIdData, ' this.confirmIdData ');

      this.totleamount = res.data[0]?.finalAmount;

      // this.cgstAmount=this.totleamount * 9/100;

      // this.sgstAmount=this.totleamount * 9/100;

      this.totleInvoice = this.totleamount + this.cgstAmount + this.sgstAmount;


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

  attachOnbording(fileInput: File[] | any) {
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
  submitTravel() {

    let val = this.leadForm.value;

    const formData = new FormData();

    formData.append("attach_ticket", this.fileDetails2.file);
    formData.append("attach_invoice", this.fileInvoice.file);
    formData.append("attach_remarks", val.attach_remarks);
    formData.append("mangement_fee", this.totleFee);

    this.leadService.updateBookTicketFile(this.confirmTicket, formData).subscribe((res: any) => {

      this.toster.success("Add Successfully");
      this.reload();
      // this.route.navigate(['master/itticket/expense-management/travel-request']);
    })


  }
  submitOnbording() {
    let val = this.onbordForm.value;

    const formData = new FormData();

    formData.append("upload_onbording", this.fileOnbord.file);


    this._itteketService.updateUploadOnbording(this.uploadOnbordingId, formData).subscribe((res: any) => {

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

    formData.append("attach_ticket", this.fileDetails2.file);
    formData.append("attach_invoice", this.fileInvoice.file);
    formData.append("attach_remarks", val.attach_remarks)





    this.leadService.updateTravel(this.lead_id, data).subscribe((res: any) => {

      this.toster.success("Booked Tickets Successfully");
      this.route.navigate(['master/expense-main/expense-management/travel-request']);
    },
      (err: any) => {
        this.toster.error("Something Went To wrong")
      }
    )


    this.leadService.updateBookTicketFile(this.confirmTicket, formData).subscribe((res: any) => {

      // this.toast.success("Booked Tickets Successfully");
      // this.route.navigate(['master/itticket/expense-management/travel-request']);
    })

  }
  onSearchChange(e: any) {
    this.mangeNum = true;

    let am = e.target.value;
    this.managementFee = Number(am);



    this.totleFee = this.totleInvoice + this.managementFee;

    // var am=document.getElementsByName("mangement_fee")[e.target.value];
    // 
    this.cgstAmount = this.managementFee * 9 / 100;
    this.sgstAmount = this.managementFee * 9 / 100;



    this.totleInvoiceCopy = this.cgstAmount + this.sgstAmount + this.totleamount
    this.totleFee = this.totleInvoiceCopy + this.managementFee;


  }

  getBytravelData() {

    this.leadService.getByIdTravel(this.uploadOnbordingId).subscribe((res: any) => {
      this.uploadBoardData = [res.data];
      //       
      // this.taskData=`${this.singleLeadData.taskOrder_no + "/" + this.singleLeadData.associated_company + "/" + this.singleLeadData.address2}`;


    })
  }

  getByTravelRequest() {
    console.log(this.expenseIdUser, 'this.expenseIdUser');

    this.leadService.getByIdTravel(this.expenseIdUser).subscribe((res: any) => {
      this.dataTravelRequst = [res.data];
      console.log(this.dataTravelRequst, 'this.dataTravelRequst');

    })
  }




  ticketDetailsOpen() {

    this._itteketService.getByTravelRequestChildDetails(this.expenseIdTravelChiled, this.travelDetailsId).subscribe((res: any) => {
      this.travelChildDataCopy = res.data;
      console.log(this.travelChildDataCopy, 'this.travelChildDataCopy');
      let timetr = res.data[0].time_travel;
      let timeSplit = timetr.split("-")
      console.log(timetr, 'timetr');
      console.log(timeSplit, 'timeSplit');


      // this.leadForm.patchValue({
      //   departure: this.travelChildData[0]?.travel_form,
      //   arrival: this.travelChildData[0]?.travel_to,
      //   mode_of_travel: this.travelChildData[0]?.modeOf_travel,
      //   time: timeSplit[0],
      //   arrivalTime: timeSplit[1],
      //   travel_date: this.travelChildData[0].dateOf_travel
      // })



    });
  }



  getConfirmTravel() {
    this._itteketService.getByTravelTicketCopy(this.employidTicket, this.expenseIdtravel, this.ticketIdTravelCopy).subscribe((res: any) => {
      this.travelTicketConfirm = res.result[0];
      console.log(this.travelTicketConfirm, 'this.travelTicketConfirm');


    });

  }

  // processing ticket details updated
  Allverifierstatusget() {
    this._itteketService.Allverifierstatusget().subscribe((params: any) => {
      this.allStatusList = params.data;
      console.log(this.allStatusList, 'this.allStatusList');

    })
  }


  updateverifierstatus() {
    let val = this.processingForm.value;
    console.log(val, 'val');

    let payload = {
      verifier_status_name: val.verifier_name,
      verifier_comment: val.verifier_comment,
    }

    this.processingStatusId = `${this.employeIdProcessing}` + `${'/'}` + `${this.ticketIdTravelProcessing}`
    this._itteketService.verifierstatusupdate(this.processingStatusId, payload).subscribe(
      (res: any) => {

        this.reload();
        this.toster.success('Verifier Status Updated Successfully');
      },
      (err: any) => {
        this.toster.error(
          "Something Went To Wrong",
          'Error Message'
        );

      }
    );
  }

  getByTravelTicketDetailsProcessing() {

    console.log(this.employeId, this.expenseIdTicket, this.ticketIdTravel, 'this.employeId,this.expenseIdTicket,this.ticketIdTravel');
    // this.trippleId=`${this.employeId }`  +  `${ this.expenseIdTicket }`  +  `${ this.ticketIdTravel }`
    console.log(this.trippleId, 'this.trippleId');
    // employeIdProcessing
    // expenseIdTicketProcessing
    // ticketIdTravelProcessing
    this._itteketService.getByTravelTicketCopy(this.employeIdProcessing, this.expenseIdTicketProcessing, this.ticketIdTravelProcessing).subscribe((res: any) => {
      this.travelTicketDataProcessing = res.result;
      console.log(this.travelTicketDataProcessing, 'this.travelTicketDataProcessing');

      this.processingForm.patchValue({
        verifier_comment: this.travelTicketDataProcessing[0]?.verifier_comment,
        verifier_name: this.travelTicketDataProcessing[0]?.verifier_status_name
      })
    });

  }
  expenceDetailsgetByProcessing() {
    console.log(this.expenseDetailIdProces, 'this.expenseDetailIdProces enter function');

    this._itteketService.getByExpenseDetailsIdCopy(this.expenseDetailIdProces).subscribe((res: any) => {
      console.log(res, 'res');
      if (res.data.attachedBill == null) {
        this.attachBill = true;

      }
      this.expenseDetailsDataProcessing = res.data;
      this.processingForm.patchValue({
        verifier_comment2: this.expenseDetailsDataProcessing?.verifier_comment,
        verifier_name2: this.expenseDetailsDataProcessing?.verifier_status_name
      })

    });
  }

  // expenceDetailsgetByProcessing() {
  //   this._itteketService.getByExpenseDetailsIdCopy(this.myExpenseIdProcesing).subscribe((res: any) => {
  //     this.expenseDetailsDataProcessing = res.data;
  //     this.processingForm.patchValue({
  //       verifier_comment2:this.expenseDetailsDataProcessing[0].verifier_comment,
  //       verifier_name2:this.expenseDetailsDataProcessing[0].verifier_status_name
  //     })

  //   });
  // }

  updateexpenseverifierstatusProces() {
    let val = this.processingForm.value;
    console.log(val, 'val');

    let payload = {
      verifier_status_name: val.verifier_name2,
      verifier_comment: val.verifier_comment2,
    }

    this._itteketService.expenseverifierstatusupdate(this.expenseDetailIdProces, payload).subscribe(
      (res: any) => {

        this.toster.success('Verifier Status Updated Successfully');
        this.reload();
      },
      (err: any) => {
        this.toster.error(
          "Something Went To Wrong"

        );

      }
    );
  }

  getCancelTravel() {
    //   this.cancelTicketId
    // this.cancelEmpId
    // this.cancelExpenseId
    this._itteketService.getByTravelTicketCopy(this.cancelEmpId, this.cancelExpenseId, this.cancelTicketId).subscribe((res: any) => {
      this.travelTicketCancel = res.result[0];
      this.traveltickeCanceltApproved=res.result[0];
     
    });

  }
  getCancelApprovedTravel() {
    //   this.cancelTicketId
    // this.cancelEmpId
    // this.cancelExpenseId
//     ticketCancelApprovedId
// cancelApprovedEmpId
// cancelApprovedExpenseId
    this._itteketService.getByTravelTicketCopy(this.cancelApprovedEmpId, this.cancelApprovedExpenseId, this.ticketCancelApprovedId).subscribe((res: any) => {

      this.traveltickeCanceltApproved=res.result[0];
      console.log(this.traveltickeCanceltApproved,'this.traveltickeCanceltApproved');
      
    });

  }
  getCancel(e: any) {
    this.statusCancel = e.value;

  }
  statusUpdate() {
    console.log(this.cancelExpenseId,'this.cancelExpenseId');
    
    let data = {
      travel_status: this.statusCancel,
      attach_ticket: null,
      attach_invoice: null,
      expenseId:this.cancelExpenseId,
      employee_id:this.cancelEmpId,
      select_agent:this.agentTicket
    }

    console.log(data);
    


    this._itteketService.updateCancelReuest(this.cancelTicketId, data).subscribe((res: any) => {

      // this.rowDataConfirm=res.result;
      this.reload();
      this.toster.success("Ticket Updated Successfully");

    })
  }
  reload() {
    setTimeout(() => {
      window.location.reload();
    }, 500); // Activate after 5 minutes.
  }
}
