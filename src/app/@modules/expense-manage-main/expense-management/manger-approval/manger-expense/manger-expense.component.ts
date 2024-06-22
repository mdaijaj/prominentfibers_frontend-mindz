// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-manger-expense',
//   templateUrl: './manger-expense.component.html',
//   styleUrls: ['./manger-expense.component.scss']
// })
// export class MangerExpenseComponent {

// }
import { Component } from '@angular/core';
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
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';
import { ActivatedRoute, Router } from '@angular/router';
import { PdfDownloadComponent } from '../../my-expenses/my-expenses/pdf-download/pdf-download.component';
import Swal from 'sweetalert2';
import { ExpenseDialogComponent } from '../../../travel-request/travel-request/expense-dialog/expense-dialog.component';
import { MatDialog } from '@angular/material/dialog';
// import { PdfDownloadComponent } from '../my-expenses/pdf-download/pdf-download.component';
@Component({
  selector: 'app-manger-expense',
  templateUrl: './manger-expense.component.html',
  styleUrls: ['./manger-expense.component.scss']
})
export class MangerExpenseComponent {
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
  constructor(private fb: FormBuilder,
    private leadService: LeadService,
    private route: Router,
    private recruitService: RecruitService,
    private activeroute: ActivatedRoute,
    private toast: ToastrService,
    private configService: ConfigurationalmasterService,
    private _empRegistration: EmpRegistrationService,
    private _itteketService: ItticketingService,
    public dialog: MatDialog

  ) {
    this.expenceForm = this.fb.group({

      expense_report_no: new FormControl(null, [Validators.required, Validators.pattern('([0-9]){3}$'),]),
      expense_type: new FormControl(),
      expense_name: new FormControl(),
      expense_desc: new FormControl(),
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
      exp_start_date: new FormControl(null),
      // exp_end_date: new FormControl(null),
      expenseApprovalfile: new FormControl(null),
      expenseApproval: new FormControl(null),
      travel_ticket: new FormControl(null),
      travel_remarks: new FormControl(null),
      expense_location:new FormControl(null),
      date_posted:new FormControl(null),
      remarks_posted:new FormControl(null)
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
    this.activeroute.queryParams.subscribe(params => {
      this.id = params;
      this.lead_id = this.id?.lead_id;
      this.task_id = this.id?.task_lead_id;
      

      if (this.task_id) {
        this.leadService.getByIdLead(this.task_id).subscribe((res: any) => {
          this.singleLeadData = res.data;
          
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
      this.travelTicketPatch();
      
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
    this.leadService.getTravelTicket(this.mainId).subscribe((res: any) => {
      
      let newData: any = []
      for (var i = 0; i < res.result.length; i++) {
        
        if (res.result[i].travel_status == "Confirmed") {
          newData.push(res.result[i])
        }
        else if (res.result[i].travel_status != "Confirmed") {
          newData.push(res.result[i])
        }
      }
      

      this.rowData = newData;
      
      let bookData: any = []

      for (let i = 0; i < res.result.length; i++) {
        if (res.result[i].travel_status == "Confirmed") {
          bookData.push(res.result[i])
        }
      }
      
      this.rowDataBookTiket = bookData;
      
      for (let item of this.rowDataBookTiket) {
        this.travelTicketAmount.push(item.travel_amount);
        this.totalAmount = this.travelTicketAmount.reduce((acc: any, cur: any) => acc + cur, 0);
      }
      const modify_status=[]
      for(let a=0;a<this.rowDataBookTiket.length;a++){
        this.rowDataBookTiket[a].modify_status="Booked"

      }
      
      
      this.finalPrice();
    })

    this.leadService.messageSubject.subscribe((idExpense: any) => {
      
      this.expenseDetailsId = idExpense;
      if (this.expenseDetailsId) {
        this.addContact = true;
        this.expenceDetails()

      }
    })
    this.getExpenseDetailsCopy();
    this.getExpenseDetailsCopyTwo();
    this.patchDate()
  }

patchDate(){
  this.expenceForm.patchValue({
    date_posted:this.myDate
  })
}

travelTicketPatch(){
  this.expenceForm.patchValue({
    travel_ticket:this.expenseData.travel_ticket
  })
  if(this.expenseData.travel_ticket==="Yes"){
      this.showTickets=true;
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
      cellClass: "grid-cell-centered",
      flex:1
    },
    {
      headerName: 'Expense for',
      field: 'expensefor',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: "grid-cell-centered",
      flex:1
    },
    // {
    //   headerName: 'Bill Amount',
    //   field: 'billAmount',
    //   sortable: true,
    //   resizable: true,
    //   wrapHeaderText: true,
    //   autoHeaderHeight: true,
    //   cellClass: "grid-cell-centered",
    //   flex:1
    // },
    {
      headerName: 'Attached Bill ',
      field: 'attachedBill',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: "grid-cell-centered",
      flex:1,
      cellRenderer: PdfDownloadComponent,

    },
    {
      headerName: 'Date of Expenses ',
      field: 'exp_start_date',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: "grid-cell-centered",
      flex:1
    },
    {
      headerName: 'Expense Location',
      field: 'expense_location',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: "grid-cell-centered",
      flex:1
    },
    // {
    //   headerName: 'Currency',
    //   field: 'quotation_currency',
    //   sortable: true,
    //   resizable: true,
    //   wrapHeaderText: true,
    //   autoHeaderHeight: true,
    //   cellClass: "grid-cell-centered"
    // },
    // {
    //   headerName: 'Quantity',
    //   field: 'quantity',
    //   sortable: true,
    //   resizable: true,
    //   wrapHeaderText: true,
    //   autoHeaderHeight: true,
    //   cellClass: "grid-cell-centered"
    // },
    // {
    //   headerName: 'EXR',
    //   field: 'exr',
    //   sortable: true,
    //   resizable: true,
    //   wrapHeaderText: true,
    //   autoHeaderHeight: true,
    //   cellClass: "grid-cell-centered"
    // },
    {
      headerName: 'Final Amount',
      field: 'finalAmount',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: "grid-cell-centered",
      flex:1
    },
    // {
    //   headerName: 'End Date of Expenses ',
    //   field: 'exp_end_date',
    //   sortable: true,
    //   resizable: true,
    //   wrapHeaderText: true,
    //   autoHeaderHeight: true,
    //   cellClass: "grid-cell-centered"
    // },
    // {
    //   headerName: 'Action',
    //   field: 'expense_id',
    //   cellRenderer: ActionsComponent,
    //   cellRendererParams: {
    //     className: 'mat-blue',
    //     hideRequestButton: true,
    //     hideDetailsButton: false,
    //     hideDownloadIcon: false,
    //     showCustomIcon: false, // Hide attachment icon
    //   },
    //   cellClass: "grid-cell-centered"
    // }


  ];
  public columnDefsConfirm = [
    {
      headerName: 'S.No',
      valueGetter: "node.rowIndex + 1",

      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: "grid-cell-centered"
    },
    {
      headerName: 'Flight No.',
      field: 'flight_no',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: "grid-cell-centered"
    },
    {
      headerName: 'Travel Date',
      field: 'travel_date',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: "grid-cell-centered"
    },
    {
      headerName: 'Travel Amount',
      field: 'travel_amount',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: "grid-cell-centered"
    },
    {
      headerName: 'Mode of Travel',
      field: 'mode_of_travel',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: "grid-cell-centered"
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
    if (this.expenseData?.status === "Approved") {
      this.makePaymentStatus = true;
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
    }
  }
  patchFormValueDup() {
    this.expenceForm.patchValue({
      expense_type: "Non-Billable"
    })
  }
  patchFormValueNew() {
    this.expenceForm.patchValue({
      expense_type: "Billable",
    })
  }
  addBtn() {
    this.addContact = !this.addContact;
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
    if (val.invalid) {
      this.toast.error("Fields Are Required");
      return
    }
    
    if (!this.task_id) {
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
        leadId:this.leadgenerationId,
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
    } else {
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
        leadId:this.leadgenerationId,

        status: "Approved"
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


  }

  submitNonBilable(){
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
        task_order: this.taskData,
        travel_tickets: val.travel_tickets,
        expense_requestId: val.expense_requestId,
        expense_details: val.expense_details,
        expenseApproval: val.expenseApproval,
        travel_ticket: val.travel_ticket,
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
    this.route.navigate(['master/expense-main/expense-managment/my-expenses']);

  }
  approveForm() {
    let val = this.expenceForm.value;
    if (val.invalid) {
      this.toast.error("Fields Are Required");
      return
    }
    
    Swal.fire({
      title: 'Are you sure to Approval this Expense?',
      text: "You won't be able to revert this!",
      icon: 'question',
      showCancelButton: true,
      cancelButtonColor: "#f44336",
      confirmButtonColor: "#3f51b5",
      confirmButtonText: 'Yes',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.isConfirmed) {
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
          status: "Approved"
        }
          this._itteketService.editByExpense(this.lead_id, data).subscribe((res: any) => {
          
          this.toast.success("My Expense Created Successfully..");
          this.route.navigate(['master/expense-main/expense-managment/make-payment']);
        },
         (error: any) => {
            if (error.status === 403) {
              this.toast.warning("Expense Travel Id Already Already Exits");
    
            } else {
              this.toast.error("Something Went TO Wrong");
    
            }
          }
        )

      };
    });







  }

  paymentForm() {
    let val = this.expenceForm.value;
    if (val.invalid) {
      this.toast.error("Fields Are Required");
      return
    }
    
    // let data = {
    //   expense_report_no: val.expense_report_no,
    //   expense_type: val.expense_type,
    //   expense_name: val.expense_name,
    //   expense_desc: val.expense_desc,
    //   expense_advance: val.expense_advance,
    //   task_order: val.task_order,
    //   travel_tickets: val.travel_tickets,
    //   expense_requestId: val.expense_requestId,
    //   expense_details: val.expense_details,
    //   expenseApproval: val.expenseApproval,
    //   travel_ticket: val.travel_ticket,
    //   travel_remarks: val.travel_remarks,
    //   status: "Processing"
    // }
    //   this._itteketService.editByExpense(this.lead_id, data).subscribe((res: any) => {
      
    //   this.toast.success(" Manager Approvel My Expense Successfully..");
    //   this.route.navigate(['master/expense-main/expense-managment/posted-expense/posted-list']);
    // },
    // (error: any) => {
    //     if (error.status === 403) {
    //       this.toast.warning("Expense Travel Id Already Already Exits");

    //     } else {
    //       this.toast.error("Something Went TO Wrong");

    //     }
    //   }
    // )



    Swal.fire({
      title: 'Are you sure to Updated this Expense ?',
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
          status: "ManageApproval",
        }
          this._itteketService.editByExpense(this.lead_id, data).subscribe((res: any) => {
          
          this.toast.success(" Manager Updated My Expense Successfully..");
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
      };
    });




  }
  reject() {   
  }
  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;
    

  }
  onCellClicked(e: any) {
    console.log(e,'eee');
    
    const dialogRef
    = this.dialog.open(ExpenseDialogComponent, {
       width: '40%',
      // maxWidth: '100vw',
      // maxHeight: '100vh',
      // height: '100%',
      // panelClass: 'full-screen-modal',
      data: { expenseDetailId:e.data.exp_detail_id}
      
    });
    
  dialogRef.afterClosed().subscribe(result => {
    
  });
  }

  getTaskOrder() {
    this._itteketService.getTaskOrder().subscribe((res: any) => {
      
      this.taskOrderList = res.result;
    })
  }

  submitExpenseDetail() {
    let val = this.expenceForm.value;
    const formData = new FormData();
    
    let data = {
      myexpense_id: this.myExpenseId,
      expensefor: val.expensefor,
      billAmount: val.billAmount,
      quotation_currency: val.quotation_currency,
      exp_start_date: moment(val.exp_start_date).format('YYYY-MM-DD'),
      // exp_end_date: moment(val.exp_end_date).format('YYYY-MM-DD'),
      expense_location:val.expense_location
    } 
    
    
    this._itteketService.createExpenseDetails(data, this.fileDetails.file).subscribe((res: any) => {
      
      this.toast.success("Expense Details Added Successfully");
      this.getExpenseDetail();
      this.getExpenseDetailsCopy()
      this.cleanInput()
    },
      (error: any) => {
        this.toast.error("Something Went To Wrong")
      }
    )
  }

  updateExpenseDetail() {
    let val = this.expenceForm.value;
    const formData = new FormData();

    
    let data = {
      expensefor: val.expensefor,
      billAmount: val.billAmount,
      exp_start_date: moment(val.exp_start_date).format('YYYY-MM-DD'),
      // exp_end_date: moment(val.exp_end_date).format('YYYY-MM-DD'),
      expense_location:val.expense_location

    }

    this._itteketService.updateExpense(this.expenseDetailsId, data).subscribe((res: any) => {
      
      this.toast.success("Expense Details Update Successfully");
      this.getExpenseDetail();
      this.addContact = false;
      this.cleanInput();
    },
      (error: any) => {
        this.toast.error("Something Went To Wrong")
      }
    )
  }
  cleanInput() {
    this.expenceForm.get('expensefor')?.reset(),
      this.expenceForm.get('billAmount')?.reset(),
      this.expenceForm.get('exp_start_date')?.reset()
      // this.expenceForm.get('exp_end_date')?.reset()
    // this.expenceForm.get('attach_bill')?.reset()
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
        // exp_end_date: this.expenseDetailsData.exp_end_date

      })

    });
  }
  getExpenseDetailsCopy() {
    this._itteketService.getExpenseDetailsCopy(this.myExpenseId).subscribe((res: any) => {
      this.rowExpenseCopy = res.data;
      

    })
  }
  getExpenseDetailsCopyTwo() {
    this._itteketService.getExpenseDetailsCopy(this.lead_id).subscribe((res: any) => {
      this.rowExpenseCopy = res.data;
      
    })
  }
  cancel() {
    Swal.fire({
      title: 'Are you sure to Cancel this Expense?',
      text: "You won't be able to revert this!",
      icon: 'question',
      showCancelButton: true,
      cancelButtonColor: "#f44336",
      confirmButtonColor: "#3f51b5",
      confirmButtonText: 'Yes',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.isConfirmed) {
        this.route.navigate(['master/expense-main/expense-managment/manger-expense/mager-list'])
  };
    });


  }

  getCurrency() {
    this.configService.getQuotationcurrency().subscribe((res: any) => {
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
}
