import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { GridReadyEvent } from 'ag-grid-community';
import { EmpRegistrationService } from 'src/app/@shared/services/emp-registration.service';
import { LeadService } from 'src/app/@shared/services/lead.service';
import { RecruitService } from 'src/app/@shared/services/recruitment.service';
import { ConfigurationalmasterService } from '../../../../../@shared/services/configurationalmaster.service'
import { ItticketingService } from 'src/app/@shared/services/itticketing.service';
import { Subject } from 'rxjs';
import { ActionsComponent } from '../../travel-request/actions/actions.component';
// import { PdfDownloadComponent } from './pdf-download/pdf-download.component';
import { jsPDF } from 'jspdf';
import domtoimage from 'dom-to-image';
import { PdfDownloadComponent } from '../../my-expenses/my-expenses/pdf-download/pdf-download.component';
import { MomentDateAdapter } from "@angular/material-moment-adapter";
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { DatePipe } from '@angular/common';
import Swal from 'sweetalert2';
const MY_DATE_FORMAT = {
  parse: {
    dateInput: 'DD/MM/YYYY', // this is how your date will be parsed from Input
  },
  display: {
    dateInput: 'DD/MM/YYYY', // this is how your date will get displayed on the Input
    monthYearLabel: 'MMMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY'
  }
};
@Component({
  selector: 'app-update-my-expense',
  templateUrl: './update-my-expense.component.html',
  styleUrls: ['./update-my-expense.component.scss'],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE]
    },
    { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMAT },
    DatePipe
  ]
})
export class UpdateMyExpenseComponent {
  expenceForm: FormGroup;
  jobType: any;
  candidateArray: any;
  interviewGetId: any;
  candidateId: any;
  id: any;
  val: any;
  public searchResult: any;
  interview_id: any;
  clicked: boolean = false;
  cutomerType: boolean = false;
  sitAudit: boolean = false;
  lead_id: any;
  singleLeadData: any;
  mainId: string | null;
  mainEmployeeData: any;
  allAchievement: any;
  categoryList: any;
  myDate = new Date();
  countryList: any[] = [];
  cityList: any;
  stateList: any;
  countryName: any;
  standardList: any;
  allCompanyList: any;
  rowData: any;
  rowDataNew: any;
  errorMsg: string;
  nonBillable: boolean = false;
  gridApi: any;
  rowClass: any;
  showTickets: boolean = false;
  addContact: boolean = false;
  filename: any;
  attach_bill: any;
  billableStatus: boolean = false;
  task_order_nonBilable:boolean=false;
  fileDetails: { filePath: string | any; file: any } = {
    filePath: '',
    file: null,

  };
  fileDetails2: { filePath: string | any; file: any } = {
    filePath: '',
    file: null,

  };
  now = new Date();
  year = this.now.getFullYear();
  month = this.now.getMonth();
  date = this.now.getDate();
  minDate2: Date;

  getExpenseData: any;
  taskOrderList: any;
  expenseData: any;
  approveStatus: boolean = false;
  makePaymentStatus: boolean = false;
  makePaymentStatusApproved:boolean=false;
  minDateToFinish = new Subject<string>();
  task_id: any;
  maxDate = moment({ year: this.year + 100, month: this.month, date: this.date }).format('YYYY-MM-DD');
  minDate = moment({ year: this.year - 0, month: this.month, date: this.date }).format('YYYY-MM-DD');
  expenseDetailsId: any;
  expenseDetailsData: any;
  rowDataBookTiket: any;
  travelTicketAmount: any[] = [];
  totalAmount: any;
  expenseAmount: any[] = [];
  totalExpense: any;
  finalAmount: number;
  imageToUpload: any;
  pdfFile: any = '../../../../../../assets/icons/pdfimg.png';
  wordFile: any = '../../../../../../assets/icons/word.png';

  item2: number;
  taskData: any;
  rowExpenseCopy: any;
  myExpenseId: any;
  currencyList: any;
  pendingStatusOn:boolean=false;
  leadgenerationId: any;
  pendingStatusOnBillable:boolean=false;
  billamountvalue: any;
  currencyValue: any;
  finalCurrnecyValue: any;
  rateCurrency: any;
  fullAmount:any;
  preDefineExpense:boolean=false;
  quantitySerch: any;
  finalAmounSecont: number;
  rateCurrencyCopy: any;
  amountPreDefine: number;
  expenseDetailsDataCopy: any;
  rowExpenseCopys: any;
  stateAll: any;
  cityAll: any;
  expenseForData: any;
  expenceDetailsForm: FormGroup;
  statusExpen: boolean=false;
  draftExpense: boolean=false;
  constructor(private fb: FormBuilder,
    private leadService: LeadService,
    private route: Router,
    private recruitService: RecruitService,
    private activeroute: ActivatedRoute,
    private toast: ToastrService,
    private configService: ConfigurationalmasterService,
    private _empRegistration: EmpRegistrationService,
    private _itteketService: ItticketingService
  ) {
    this.expenceForm = this.fb.group({

      expense_report_no: new FormControl(null),
      expense_type: new FormControl(),
      expense_name: new FormControl(null,Validators.required),
      expense_desc: new FormControl(null,Validators.required),
      expense_advance: new FormControl(),
      task_order: new FormControl(),
      travel_tickets: new FormControl(),
      expense_requestId: new FormControl(),
      expense_details: new FormControl(),
      expensefor: new FormControl(null),
      billAmount: new FormControl(null),
      quotation_currency: new FormControl(null),
      contact_email: new FormControl(null),
      contact_department: new FormControl(null),
      contact_primary: new FormControl(null),
      contact_setPrimary: new FormControl(null),
      contact_review_form: new FormControl(null),
      attach_bill: new FormControl(null),
      travel_ticket: new FormControl(null),
      // exp_start_date: new FormControl(null),
      // // exp_end_date: new FormControl(null),
      // expenseApprovalfile: new FormControl(null),
      // expenseApproval: new FormControl(null),
      // travel_ticket: new FormControl(null),
      // travel_remarks: new FormControl(null),
      // expense_location:new FormControl(null),
      // quantity:new FormControl(null),
      // exr:new FormControl(null),
      // finalAmount:new FormControl(null),
      // exr2:new FormControl(null),
      // finalAmount2:new FormControl(null),
      // // finalAmount:new FormControl(null),
      // // exr2:new FormControl(null),
      // // finalAmount2:new FormControl(null),
      // expenseforCopy:new FormControl(null),
      // stateExpense:new FormControl(null),
      // cityExpense:new FormControl(null)
    })
    this.expenceDetailsForm = this.fb.group({
      exp_start_date: new FormControl(null),
      // exp_end_date: new FormControl(null),
      expenseApprovalfile: new FormControl(null),
      expenseApproval: new FormControl(null),
      
      travel_remarks: new FormControl(null),
      expense_location:new FormControl(null,Validators.required),
      quantity:new FormControl(null),
      exr:new FormControl(null),
      finalAmount:new FormControl(null),
      exr2:new FormControl(null),
      finalAmount2:new FormControl(null),
      expenseforCopy:new FormControl(null),
      stateExpense:new FormControl(null),
      cityExpense:new FormControl(null),
      quotation_currency: new FormControl(null),
      billAmount: new FormControl(null),


    })
    this.minDateToFinish.subscribe((r: any) => {
      this.minDate2 = new Date(r);
    })
    this.rowClass = 'rowClass'
  }

  ngOnInit() {
    this.getExpenseDetail();
    this.getTaskOrder();
    this.getCurrency();
    this.getPreAuditExpense();
    this.getStateMyExpense();
    this.getCityMyExpense();
    this.activeroute.queryParams.subscribe(params => {
      this.id = params;
      this.lead_id = this.id?.myexpense_id;
      this.task_id = this.id?.task_lead_id;
      

      if (this.task_id) {
        this.leadService.getByIdLead(this.task_id).subscribe((res: any) => {
          this.singleLeadData = res.data;
          // this.approvedStatus()
          
          this.leadgenerationId=res.data.lead_genration_id;
          

          this.taskData = `${this.singleLeadData?.taskOrder_no + "/" + this.singleLeadData?.associated_company + "/" + this.singleLeadData?.address2}`;
          
          this.expenceForm.patchValue({
            task_order: this.taskData,
            expense_type:this.singleLeadData.task_order_category
          })
      if (res.data.task_order_category === "Non-Billable") {
        this.task_order_nonBilable = true;
        this.pendingStatusOn=true;
      }
      if (res.data.task_order_category === "Billable") {
        // this.task_order_nonBilable = true;
        this.pendingStatusOnBillable=true;
      }
          // this.patchFormValueNew();
        });
      }
      
      if(!this.task_id){
        this.patchFormValueDup()
      }
      if (this.lead_id || this.task_id === undefined) {
        this.nonBillable = true;
        // this.patchFormValueDup();
      } else {
        this.nonBillable = false;
      }
    });
    this._itteketService.getByExpense(this.lead_id).subscribe((res: any) => {
      
      this.expenseData = res.data;
      console.log(this.expenseData,'this.expenseData');
   
      if(res.data?.status=="Expense Draft"){
        this.draftExpense=true;
      }
      // this.statusExpen=res.data?.status="Pending"
      if(res.data?.status=="Pending"){
        this.statusExpen=true;
      }
      this.postedStatus();
      this.approvedStatus();
      
      if (res.data.expense_type === "Billable") {
        this.billableStatus = true;
      }
      this.patchFormValue();
      this.checkStatus();
    })
    this.mainId = localStorage.getItem("EmpMainId");
    
    if (this.mainId != undefined) {
      this._empRegistration.getByUserId(this.mainId).subscribe((res) => {
        this.mainEmployeeData = res.data;
        
      })
    }
    this._itteketService.getExpenseTicketActive(this.mainId,this.lead_id).subscribe((res: any) => {
      
      let bookData: any = []

      for (let i = 0; i < res.result.length; i++) {
        if (res.result[i].travel_status == "Confirmed") {
          bookData.push(res.result[i])
        }
      }
      
      this.rowDataBookTiket = bookData;
      const modify_status=[]
      for(let a=0;a<this.rowDataBookTiket.length;a++){
        this.rowDataBookTiket[a].modify_status="Booked"

      }
      
      // for (let item of this.rowDataBookTiket) {
      //   this.travelTicketAmount.push(item.travel_amount);
      //   this.totalAmount = this.travelTicketAmount.reduce((acc: any, cur: any) => acc + cur, 0);
      // }
      
      this.finalPrice();
    })

    this.leadService.messageSubject.subscribe((idExpense: any) => {
      
      this.expenseDetailsId = idExpense;
      if (idExpense) {
        this.addContact = true;
        // this.expenceDetails();
        this.expenceDetailsGetByCopy()

      }
    })
    // this.getExpenseDetailsCopy();
    this.getExpenseDetailsCopyTwo();
    
// this.patchTravelTicket()
  }

  dratStatus(){
    if(this.expenseData?.expense_type=="Billable"){

    }
  }
 postedStatus(){
    if(this.expenseData.status==="Posted"){
     this.pendingStatusOn=false;
    }
    // else if(this.expenseData.status==="Approved"){
    //   this.pendingStatusOn=false;
    //   this.pendingStatusOnBillable=true
    // }

    // if(this.expenseData.status==="Approved"){
    //   this.pendingStatusOn=false;
    //   this.pendingStatusOnBillable=false
    // }
  }
  approvedStatus(){
    if(this.expenseData.status==="Approved"){
      this.pendingStatusOn=false;
     }
  }
  public columnDefs = [
    {
      headerName: 'S.No',
      valueGetter: "node.rowIndex + 1",
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      flex:1,
      cellClass: "grid-cell-centered"
    },
    {
      headerName: 'Expense for',
      field: 'expensefor',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: "grid-cell-centered",
      flex:1,
    },
   
    // {
    //   headerName: 'Attached Bill ',
    //   field: 'attachedBill',
    //   sortable: true,
    //   resizable: true,
    //   wrapHeaderText: true,
    //   autoHeaderHeight: true,
    //   cellClass: "grid-cell-centered",
    //   minWidth: 150,
    //   cellRenderer: PdfDownloadComponent,
      
    //   flex:1,
    // },
    {
      headerName: 'Date of Expenses ',
      field: 'exp_start_date',
      sortable: true,
      // valueFormatter: function(params: any) {
      //   return moment(params.value).format('DD/MM/YYYY');
      // },
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: "grid-cell-centered",
      flex:1,
    },
    {
      headerName: 'Expense Location',
      field: 'expense_location',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: "grid-cell-centered",
      flex:1,
    },
    {
      headerName: 'Currency',
      field: 'Currency_Type',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: "grid-cell-centered",
      flex:1,
    },
    {
      headerName: 'Bill Amount',
      field: 'billAmount',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: "grid-cell-centered",
      flex:1,
    },
    {
      headerName: 'Quantity',
      field: 'quantity',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: "grid-cell-centered",
      flex:1,
    },
    {
      headerName: 'EXR',
      field: 'exr',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: "grid-cell-centered",
      flex:1,
    },
    {
      headerName: 'Final Amount',
      field: 'finalAmount',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: "grid-cell-centered",
      flex:1,
    },
    {
      headerName: 'Action',
      field: 'expense_id',
      cellRenderer: ActionsComponent,
      cellRendererParams: {
        className: 'mat-blue',
        hideRequestButton: true,
        hideDetailsButton: false,
        hideDownloadIcon: false,
        showCustomIcon: false, // Hide attachment icon
      },
      cellClass: "grid-cell-centered",
      flex:1,
    }


  ];
  public columnDefsConfirm = [
    {
      headerName: 'S.No',
      field: 'ticket_id',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: "grid-cell-centered",
      flex:1
    },
    {
      headerName: 'Flight No.',
      field: 'flight_no',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: "grid-cell-centered",
      flex:1
    },
    {
      headerName: 'Travel Date',
      field: 'travel_date',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: "grid-cell-centered",
      flex:1
    },
    
    {
      headerName: 'Travel Amount',
      field: 'travel_amount',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: "grid-cell-centered",
      flex:1
    },
    {
      headerName: 'Mode of Travel',
      field: 'mode_of_travel',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: "grid-cell-centered",
      flex:1
    },
    {
      headerName: 'Ticket Download',
      field: 'attach_ticket',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: "grid-cell-centered",
      flex:1
      // cellRenderer: TicketPdfDownloadComponent,
    },
    {
      headerName: 'Status',
      field: 'modify_status',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: "grid-cell-centered",
      flex: 1,
      minWidth: 150
    },

  ];

  checkStatus() {
    
    if (this.expenseData?.status === "Pending") {
      this.approveStatus = true;
    }
    if (this.expenseData?.status === "Posted") {
      this.makePaymentStatus = true;
    }

    if (this.expenseData?.status === "Approved") {
      this.makePaymentStatusApproved = true;
    }
  }
  patchFormValue() {
    

    this.expenceForm.patchValue({
      expense_report_no: this.expenseData?.expense_report_no,
      expense_type: this.expenseData.expense_type,
      expense_name: this.expenseData?.expense_name,
      expense_desc: this.expenseData?.expense_desc,
      expense_advance: this.expenseData?.expense_advance,
      expenseApproval: this.expenseData?.expenseApproval,
      task_order: this.expenseData?.task_order,
      travel_ticket: this.expenseData?.travel_ticket

    })

    if (this.expenseData?.expense_type === "Non-Billable") {
      this.nonBillable = true;
      // this.pendingStatusOn=true
    }
  }
  patchFormValueDup() {
    this.expenceForm.patchValue({
      expense_type: "Non-Billable"
    })
    this.pendingStatusOn=true

  }
  patchFormValueNew() {
    this.expenceForm.patchValue({
      expense_type: "Billable",
    })
  }
  addBtn() {
    this.addContact = !this.addContact;
    if( this.addContact===false){
      this.expenseDetailsId=null;
      this.cleanInput()
    }
   
  }
  dateFormatter(createdAt: any) {
    return moment(createdAt).format('DD/MM/YYYY');
  }

  yesTickets() {
    this.showTickets = true;
  }
  noTickets() {
    this.showTickets = false;
  }
  fileInputChange(fileInput: File[] | any) {
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
        this.fileDetails.filePath = reader.result;
      };
      

      reader.readAsDataURL(file);
      this.fileDetails.file = file;
    } else {
      this.fileDetails = { filePath: '', file: null };
    }

  }
  expenseApprovalFile(fileInput: File[] | any) {
    this.errorMsg = '';
    if (fileInput.target.files && fileInput.target.files[0]) {
      const file = fileInput.target.files[0];
      // this.imageToUpload = file.item(0);

      // let file2 = this.imageToUpload.name.split('.');
      // let fileExe = file[file.length - 1].toUpperCase();
      // 

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
    
    
    let file2 = this.fileDetails2.file.name.split('.');
    
    let fileExe = file2[file2.length - 1].toUpperCase();
    
    if (fileExe === "PDF") {
      this.pdfFile = fileExe;
    }
  }
  fetchSeries(value: String) {
    if (value === '') {
      return this.searchResult = []
    }
    this.searchResult = this.allAchievement.filter(function (series: any) {
      
      return series.first_name.toLowerCase().startsWith(value)
    })
  }


  nonBillableFunc() {
    this.nonBillable = true;
  }
  billableFunc() {
    this.nonBillable = false;
  }
  customerType() {
    this.cutomerType = true;
  }

  customerTypeNew() {
    this.cutomerType = false;
  }

  siteAudit() {
    this.sitAudit = true;
  }

  siteAuditNew() {
    this.sitAudit = false;
  }
  submitForm() {
   
    let val = this.expenceForm.value;
    if(this.expenceForm.invalid){
      this.toast.error('Required fields should not be empty');

      return;
      }
    
    
    if(this.expenseData?.status==="Pending" || this.expenseData?.status==="Posted Reject" || this.expenseData?.status==="Processing Reject"){
      let data = {
        expense_report_no: val.expense_report_no,
        expense_type: val.expense_type,
        expense_name: val.expense_name,
        expense_desc: val.expense_desc,
        expense_advance: val.expense_advance,
        task_order: val.task_order,
        travel_tickets: val.travel_tickets,
        expense_requestId: val.expense_requestId,
        expense_details: val.expense_details,
        expenseApproval: val.expenseApproval,
        travel_ticket: val.travel_ticket,
        status: "Pending"
      }
  
      this._itteketService.editByExpense(this.lead_id, data).subscribe((res: any) => {
        // this.toast.success("My Expense Updated Successfully..");
        this.route.navigate(['master/expense-main/expense-managment/approve-expense'])
        this.toast.success("My Expense Updated Successfully");
        // this.route.navigate(['master/expense-main/expense-managment/processing-expense/processing-list']);
      },
  
  
        (error: any) => {
          if (error.status === 403) {
            this.toast.warning("Expense Travel Id Already Already Exits");
  
          } else {
            this.toast.error("Something Went TO Wrong");
  
          }
        }
      )
  

    }else if(this.expenseData?.status==="Reject"){
      let data = {
        expense_report_no: val.expense_report_no,
        expense_type: val.expense_type,
        expense_name: val.expense_name,
        expense_desc: val.expense_desc,
        expense_advance: val.expense_advance,
        task_order: val.task_order,
        travel_tickets: val.travel_tickets,
        expense_requestId: val.expense_requestId,
        expense_details: val.expense_details,
        expenseApproval: val.expenseApproval,
        travel_ticket: val.travel_ticket,
        status: "Pending"
      }
  
      this._itteketService.editByExpense(this.lead_id, data).subscribe((res: any) => {
        // this.toast.success("My Expense Updated Successfully..");
        this.route.navigate(['master/expense-main/expense-managment/approve-expense'])
        this.toast.success("My Expense Updated Successfully");
        // this.route.navigate(['master/expense-main/expense-managment/processing-expense/processing-list']);
      },
  
  
        (error: any) => {
          if (error.status === 403) {
            this.toast.warning("Expense Travel Id Already Already Exits");
  
          } else {
            this.toast.error("Something Went TO Wrong");
  
          }
        }
      )
    } else if(this.expenseData?.status==="Open"){
      let data = {
        expense_report_no: val.expense_report_no,
        expense_type: val.expense_type,
        expense_name: val.expense_name,
        expense_desc: val.expense_desc,
        expense_advance: val.expense_advance,
        task_order: val.task_order,
        travel_tickets: val.travel_tickets,
        expense_requestId: val.expense_requestId,
        expense_details: val.expense_details,
        expenseApproval: val.expenseApproval,
        travel_ticket: val.travel_ticket,
        status: "Open"
      }
  
      this._itteketService.editByExpense(this.lead_id, data).subscribe((res: any) => {
        // this.toast.success("My Expense Updated Successfully..");
        this.route.navigate(['master/expense-main/expense-managment'])
        this.toast.success("My Expense Updated Successfully");
        // this.route.navigate(['master/expense-main/expense-managment/processing-expense/processing-list']);
      },
  
  
        (error: any) => {
          if (error.status === 403) {
            this.toast.warning("Expense Travel Id Already Already Exits");
  
          } else {
            this.toast.error("Something Went TO Wrong");
  
          }
        }
      )
    }


  }

  submitFormDraft(){
    Swal.fire({
      title: 'Are you sure to Save this Expense ?',
      text: "You won't be able to revert this!",
      icon: 'question',
      showCancelButton: true,
      cancelButtonColor: "#f44336",
      confirmButtonColor: "#3f51b5",
      confirmButtonText: 'Yes',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.isConfirmed) {
        
        let val = this.expenceForm.value;
       
        if (this.expenseData?.expense_type=="Non-Billable") {
          // alert('Non-bilable')
          let data = {
            expense_report_no: val.expense_report_no,
            expense_type: val.expense_type,
            expense_name: val.expense_name,
            expense_desc: val.expense_desc,
            expense_advance:Number( val.expense_advance||0),
            task_order: this.taskData,
            travel_tickets: val.travel_tickets,
            expense_requestId: val.expense_requestId,
            expense_details: val.expense_details,
            expenseApproval: val.expenseApproval,
            travel_ticket: val.travel_ticket,
            leadId:this.leadgenerationId,
            // ticket_id:this.ticketIds,
            role_id:this.mainId,
            status: "Pending"
          }
          this._itteketService.editByExpense(this.lead_id, data).subscribe((res: any) => {
            
            this.toast.success("My Expense Created Successfully..");
            this.route.navigate(['master/expense-main/expense-managment']);
          },
          (error: any) => {
              if (error.status === 403) {
                this.toast.warning("Expense Travel Id Already Already Exits");
      
              } else {
                this.toast.error("Something Went TO Wrong");
      
              }
            }
          )
        } else if(this.expenseData?.expense_type=="Billable") {
          // alert('bilable')
          let data = {
            expense_report_no: val.expense_report_no,
            expense_type: val.expense_type,
            expense_name: val.expense_name,
            expense_desc: val.expense_desc,
            expense_advance:Number( val.expense_advance||0),
            task_order: this.taskData,
            travel_tickets: val.travel_ticket,
            expense_requestId: val.expense_requestId,
            expense_details: val.expense_details,
            expenseApproval: val.expenseApproval,
            travel_ticket: val.travel_ticket,
            leadId:this.leadgenerationId,
            role_id:this.mainId,

            // ticket_id:this.ticketIds,
            // ticketArr:JSON.stringify(this.ticketIds),
            status: "Open"
          }
    
          this._itteketService.editByExpense(this.lead_id, data).subscribe((res: any) => {
            
            this.toast.success("My Expense Created Successfully..");
            this.route.navigate(['master/expense-main/expense-managment']);
          },
          (error: any) => {
              if (error.status === 403) {
                this.toast.warning("Expense Travel Id Already Already Exits");
      
              } else {
                this.toast.error("Something Went TO Wrong");
      
              }
            }
          )
        }
      };
    });

  }
  submitNonBilable(){
    let val = this.expenceForm.value;
    //vikash
    // if (this.expenceForm.invalid) {
    //   this.toast.error(
    //     'Required fields should not be empty.',
    //     'Error Occurred!'
    //   );
    //   return;
    // }
    
    
      let data = {
        expense_report_no: val.expense_report_no,
        expense_type: val.expense_type,
        expense_name: val.expense_name,
        expense_desc: val.expense_desc,
        expense_advance: val.expense_advance,
        task_order: this.taskData,
        travel_tickets: val.travel_tickets,
        expense_requestId: val.expense_requestId,
        expense_details: val.expense_details,
        expenseApproval: val.expenseApproval,
        travel_ticket: val.travel_ticket,
        // leadId:null,

        status: "Pending"
      }

      
      

      this._itteketService.createExpense(data, this.fileDetails2.file).subscribe((res: any) => {
        
        this.myExpenseId = res.data.myexpense_id;
        

        this.toast.success("My Expense Created Successfully..");        
      },


        (error: any) => {
          if (error.status === 403) {
            this.toast.warning("Expense Travel Id Already Already Exits");

          } else {
            this.toast.error("Something Went TO Wrong");

          }
        }
      )
    
    

  }
  submitFormFinal() {
    //VIKASH
    // if (this.expenceForm.invalid) {
    //   this.toast.error(
    //     'Required fields should not be empty.',
    //     'Error Occurred!'
    //   );
    //   return;
    // }
    this.route.navigate(['master/expense-main/expense-managment/my-expenses']);

  }
  approveForm() {
    this.route.navigate(['master/expense-main/expense-managment/processing-expense/processing-list'])
    this.toast.success("My Expense Approved Successfully");
  }

  paymentForm() {
    let val = this.expenceForm.value;
    if (val.invalid) {
      this.toast.error("Fields Are Required");
      return
    }
    
    let data = {
      expense_report_no: val.expense_report_no,
      expense_type: val.expense_type,
      expense_name: val.expense_name,
      expense_desc: val.expense_desc,
      expense_advance: val.expense_advance,
      task_order: val.task_order,
      travel_tickets: val.travel_tickets,
      expense_requestId: val.expense_requestId,
      expense_details: val.expense_details,
      expenseApproval: val.expenseApproval,
      travel_ticket: val.travel_ticket,
      travel_remarks: val.travel_remarks,
      status: "Paid"
    }

    
    

    this._itteketService.editByExpense(this.lead_id, data).subscribe((res: any) => {
      
      this.toast.success("My Expense Created Successfully..");
      this.route.navigate(['master/expense-main/expense-managment/paid-expense']);
    },


      (error: any) => {
        if (error.status === 403) {
          this.toast.warning("Expense Travel Id Already Already Exits");

        } else {
          this.toast.error("Something Went TO Wrong");

        }
      }
    )

  }
  reject() {   
  }
  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;
    

  }
  onCellClicked(e: any) {
    
  }

  getTaskOrder() {
    this._itteketService.getTaskOrder().subscribe((res: any) => {
      
      this.taskOrderList = res.result;
    })
  }

  submitExpenseDetail() {
    //Vikash
    // if (this.expenceForm.invalid) {
    //   this.toast.error(
    //     'Required fields should not be empty.',
    //     'Error Occurred!'
    //   );
    //   return;
    // }
    let val = this.expenceDetailsForm.value;
    const formData = new FormData();
    if(this.expenceDetailsForm.invalid){
      this.toast.error('Required fields should not be empty');

      return;
      }
    let data = {
      myexpense_id: this.lead_id,
      expensefor: val.expensefor || val.expenseforCopy,
      billAmount: val.billAmount,
      quotation_currency: val.quotation_currency,
      exp_start_date: moment(val.exp_start_date).format('DD-MM-YYYY'),
      // exp_end_date: moment(val.exp_end_date).format('YYYY-MM-DD'),
      expense_location:val.expense_location,
      exr:Number(val.exr||val.exr2),
      finalAmount:Number(val.finalAmount||val.finalAmount2),
      quantity:Number(val.quantity)
    } 
   


    
    
    this._itteketService.createExpenseDetails(data, this.fileDetails.file).subscribe((res: any) => {
      
      this.toast.success("Expense Details Added Successfully");
      // this.getExpenseDetail();
      this.getExpenseDetailsCopy()
      this.getExpenseDetailsCopyTwo();
      this.addContact = false;

      this.cleanInput()
    },
      (error: any) => {
        this.toast.error("Something Went To Wrong")
      }
    )
  }

  updateExpenseDetail() {
    let val = this.expenceDetailsForm.value;
    const formData = new FormData();
    if(this.expenceDetailsForm.invalid){
      this.toast.error('Required fields should not be empty');

      return;
      }
    
    let data = {
      // expensefor: val.expensefor,
      // billAmount: val.billAmount,
      // exp_start_date: moment(val.exp_start_date).format('YYYY-MM-DD'),
      // // exp_end_date: moment(val.exp_end_date).format('YYYY-MM-DD'),
      // expense_location:val.expense_location


      expensefor: val.expenseforCopy,
      // billAmount: val.billAmount,
      // exp_start_date: moment(val.exp_start_date).format('YYYY-MM-DD'),
      // exp_end_date: moment(val.exp_end_date).format('YYYY-MM-DD'),
      // expense_location:val.expense_location,
      billAmount: val.billAmount,
      quotation_currency: val.quotation_currency,
      exp_start_date: moment(val.exp_start_date).format('DD-MM-YYYY'),
      // exp_end_date: moment(val.exp_end_date).format('YYYY-MM-DD'),
      expense_location:val.expense_location,
      exr:Number(val.exr2),
      finalAmount:Number(val.finalAmount2),
      quantity:Number(val.quantity),
    }

    this._itteketService.updateExpense(this.expenseDetailsId, data).subscribe((res: any) => {
      
      this.toast.success("Expense Details Update Successfully");
      // this.getExpenseDetail();
      this.getExpenseDetailsCopyTwo();
      this.getExpenseDetailsCopy();
      this.expenseDetailsId=null;
     
      this.addContact = false;
      this.cleanInput();
    },
      (error: any) => {
        this.toast.error("Something Went To Wrong")
      }
    )
  }
  cleanInput() {
    this.expenceDetailsForm.get('expensefor')?.reset(),
      this.expenceDetailsForm.get('billAmount')?.reset(),
      this.expenceDetailsForm.get('exp_start_date')?.reset()
      this.expenceDetailsForm.get('expense_location')?.reset(),
    this.expenceDetailsForm.get('quotation_currency')?.reset(),
    this.expenceDetailsForm.get('expenseforCopy')?.reset(),
    this.expenceDetailsForm.get('exr2')?.reset(),
    this.expenceDetailsForm.get('quantity')?.reset(),
    this.expenceDetailsForm.get('finalAmount2')?.reset()

  }

  getExpenseDetail() {
    this._itteketService.getExpenseDetails().subscribe((res: any) => {
      this.rowDataNew = res.result;
      
      for (let item of this.rowDataNew) {
        this.item2 = parseInt(item.billAmount)
         

        this.expenseAmount.push(this.item2);
         

        this.totalExpense = this.expenseAmount.reduce((acc, cur) => acc + Number(cur), 0)
      }
      

    })
  }



  finalPrice() {
    
    const advance = Number(this.expenseData?.expense_advance)
    const final = this.totalAmount + parseInt(this.totalExpense);
    const deductions = advance + this.totalAmount;
    
    
    
    
    
    
    
    this.finalAmount = final - deductions;
    

  }

  dateChange(e: any) {
    this.minDateToFinish.next(e.value.toString());
  }

  expenceDetails() {
    this._itteketService.getByExpenseDetails(this.expenseDetailsId).subscribe((res: any) => {
      this.expenseDetailsData = res.data;
      
      this.expenceForm.patchValue({
        expensefor: this.expenseDetailsData.expensefor,
        billAmount: this.expenseDetailsData.billAmount,
        exp_start_date: this.expenseDetailsData.exp_start_date,
        quotation_currency: this.expenseDetailsData.quotation_currency,
        expense_location:this.expenseDetailsData.expense_location

      })

    });
  }

  expenceDetailsGetByCopy() {
    this._itteketService.getByExpenseDetailsIdCopy(this.expenseDetailsId).subscribe((res: any) => {
      this.expenseDetailsDataCopy = res.data;
      
      const dateString =this.expenseDetailsDataCopy?.exp_start_date; // Replace with your date string
const dateParts = dateString.split("-");
const year = parseInt(dateParts[2], 10);
const month = parseInt(dateParts[1], 10) - 1; // Month in JavaScript Date object is 0-based
const day = parseInt(dateParts[0], 10);
const date = new Date(year, month, day);
console.log(date,'datedatedatedatedate');


      this.expenceDetailsForm.patchValue({
        expensefor: this.expenseDetailsDataCopy?.expensefor,
        billAmount: this.expenseDetailsDataCopy?.billAmount,
        exp_start_date:date,
        quotation_currency: Number(this.expenseDetailsDataCopy?.quotation_currency),
        expense_location:this.expenseDetailsDataCopy?.expense_location,
        expenseforCopy:this.expenseDetailsDataCopy?.expensefor,
       
        quantity:this.expenseDetailsDataCopy?.quantity,
        exr2:this.expenseDetailsDataCopy?.exr,
        finalAmount2:this.expenseDetailsDataCopy?.finalAmount,

      })

    });
  }

  getExpenseDetailsCopy() {
    this._itteketService.getExpenseDetailsCopy(this.lead_id).subscribe((res: any) => {
      this.rowExpenseCopy = res.data;
      

    })
  }
  getExpenseDetailsCopyTwo() {
    this._itteketService.getExpenseDetailsCopy(this.lead_id).subscribe((res: any) => {
      this.rowExpenseCopys = res.data;
      
    })
  }
  cancel() {
    this.route.navigate(['master/expense-main/expense-managment/my-expenses'])
  }

  getCurrency() {
    this._itteketService.getAllExpenseCurrency().subscribe((res: any) => {
      this.currencyList = res.data;
      
    });
  }
  pdfGenerate() {
    const dashboard = document.getElementById('dashboard');

    const dashboardHeight = dashboard!.clientHeight;
    const dashboardWidth = dashboard!.clientWidth;
    const options = { background: 'white', width: dashboardWidth, height: dashboardHeight };

    domtoimage.toPng(dashboard!, options).then((imgData) => {
      const doc = new jsPDF(dashboardWidth > dashboardHeight ? 'l' : 'p', 'mm', [dashboardWidth, dashboardHeight]);
      const imgProps = doc.getImageProperties(imgData);
      const pdfWidth = doc.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

      doc.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      window.open(URL.createObjectURL(doc.output("blob")));
    });
  }

  selectCurrency(e:any){

let currencyId=e.value;


this._itteketService.getByCurrency(currencyId).subscribe((res:any)=>{
  
  this.rateCurrency=res.data.rate;
  
  
  this.expenceDetailsForm.patchValue({
    exr:res.data.rate
  })
})

  
  this.currencyValue=e.value;
  
  
  if(e.value==="INR"){
     this.finalCurrnecyValue=this.billamountvalue * 1
  }else if(e.value==="USD"){
    this.finalCurrnecyValue=this.billamountvalue * 84
  }
  

  }

  onSearchChange(e:any){
    // this.mangeNum=true;
  
 this.billamountvalue=e.target.value;
  
  this.fullAmount=this.rateCurrency * this.billamountvalue;
  
  
  this.expenceDetailsForm.patchValue({
    finalAmount:this.fullAmount
  })                                     
  // this.managementFee=Number(am);
  // 
  // 
  
  // this.totleFee=this.totleInvoice + this.managementFee;
  // 
  // var am=document.getElementsByName("mangement_fee")[e.target.value];
  // 
  
  
  }
  keyUpAmount(){
    let val=this.expenceDetailsForm.value;
    let ammm=val.exr2 * val.billAmount * val.quantity;

    this.expenceDetailsForm.patchValue({
      finalAmount2:ammm
    })
  }

  changeExpense(e:any){
    
    if(e.checked===true){
      this.preDefineExpense=true;

    }else if(e.checked===false){
      this.preDefineExpense=false;

    }

  }


  exrClick(e:any){
console.log(e,'eeeeexr');

  }
  onSearchQuantity(e:any){
   this.quantitySerch=e.target.value;
   this.finalAmounSecont= this.quantitySerch * this.billamountvalue;
   this.amountPreDefine=this.rateCurrencyCopy * this.finalAmounSecont;
   
   
   this.expenceDetailsForm.patchValue({
    finalAmount2: this.amountPreDefine
   })

  }



  selectCurrencyCopy(e:any){

    let currencyId=e.value;
    
    
    this._itteketService.getByCurrency(currencyId).subscribe((res:any)=>{
      
      this.rateCurrencyCopy=res.data.rate;
this.keyUpAmount();
      
      this.expenceDetailsForm.patchValue({
        exr2:res.data.rate
      })
    })
    
      
      }

      getStateID(e:any){
            
        this.leadService.getCityByID(e.value).subscribe((res:any) => {
        
        this.cityList = res.data;
        console.log( this.cityList,' this.cityList');
        
          });
  }
  getStateMyExpense(){
    this._itteketService.getStateMyExpense().subscribe((res:any)=>{
      this.stateAll=res.data;
      console.log( this.stateAll,' this.stateAll');
      
      
    })
  }
  getCityMyExpense(){
     this._itteketService.getStateMyExpense().subscribe((res:any)=>{
       this.cityAll=res.data;
       console.log(this.cityAll,'this.cityAll');
       

})
}

getPreAuditExpense(){
  this._itteketService.getPreAuditExpense().subscribe((res:any)=>{
    this.expenseForData=res.data;
    
    
  })
}
}
