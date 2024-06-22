import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { calendarFormat } from 'moment';
import { ToastrService } from 'ngx-toastr';
import { EmpRegistrationService } from 'src/app/@shared/services/emp-registration.service';
import { LeadService } from 'src/app/@shared/services/lead.service';
import { GridApi, GridReadyEvent } from 'ag-grid-community';
import { RecruitService } from 'src/app/@shared/services/recruitment.service';
import { ConfigurationalmasterService } from '../../../../../@shared/services/configurationalmaster.service'
// import { ActionsComponent } from '../actions/actions.component';
import { ItticketingService } from 'src/app/@shared/services/itticketing.service';
import { el } from '@fullcalendar/core/internal-common';
import { concat } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
// import { ExpenseDialogComponent } from '../expense-dialog/expense-dialog.component';
import { MomentDateAdapter } from "@angular/material-moment-adapter";
import Swal from 'sweetalert2';
import { DatePipe } from "@angular/common";
import { jsPDF } from 'jspdf';
import domtoimage from 'dom-to-image';
import { NotificationServiceService } from 'src/app/@shared/services/notification/notification-service.service';
import { ActionsComponent } from '../../travel-request/actions/actions.component';
import { TravelActionComponent } from '../travel-action/travel-action.component';
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
  selector: 'app-draft-travel-update',
  templateUrl: './draft-travel-update.component.html',
  styleUrls: ['./draft-travel-update.component.scss'],
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
export class DraftTravelUpdateComponent {
Login_user_id: any = localStorage.getItem('signInUser');
  loginUserId: any = JSON.parse(this.Login_user_id).employee_id
  loginUserName: any = JSON.parse(this.Login_user_id).first_name
  leadForm: FormGroup;
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
  rowDataBookTiket: any;
  // fileDetails: any;
  errorMsg: string;
  nonBillable: boolean = false;
  showTickets: boolean = false;
  rowClass: string;
  rowDataNew: any;
  addContact: boolean = false;
  twoWayTicket: boolean = false;
  gridApi: GridApi<any>;
  enableSubmit: boolean = false;
  enableSuggest: boolean = false;
  enableConfirm: boolean = false;
  enableApprove: boolean = false;
  enableBooked: boolean = false;
  taskOrderList: any;
  statusTravel: boolean = false;
  rowDataTwo: any;
  trainOn: boolean = false;
  flightOn: boolean = false;
  busOn: boolean = false;
  retunYes: boolean = false;
  retunNo: boolean = false
  nonBillableStatusUp: boolean = false;
  returnTicketHead: boolean = false;
  cancelTicketStatus: boolean = false;
  expenseId_taskOrder: boolean = false;
  fileDetails2: { filePath: string | any; file: any } = {
    filePath: '',
    file: null,
  };
  fileDetails: { filePath: string | any; file: any } = {
    filePath: '',
    file: null,
  };
  fileInvoice: { filePath: string | any; file: any } = {
    filePath: '',
    file: null,
  };
  task_id: any;
  emplId: any;
  ticketId: any;
  rowDataTrain: any;
  rowDataBus: any;
  dataExpense: any;
  taskData: string;
  rowDataSuggested: any;
  rowConfirmData: any;
  nonBillableStatus: any;
  returnBtn: boolean = false
  // now = new Date();
  billableStatus: boolean = false;
  now = new Date();
  year = this.now.getFullYear();
  month = this.now.getMonth();
  // day = this.now.getDay();
  dates = this.now.getDate();
  maxDate = moment({ year: this.year + 100, month: this.month, date: this.dates }).format('MM-DD-YYYY');
  minDate = moment({ year: this.year - 0, month: this.month, date: this.dates }).format('MM-DD-YYYY');
  ticketValue: any;
  taskNonBillable: any;
  expenseId: any;
  expenseIdData: any;
  saveOpen: boolean = false;
  pdfFile: any = '../../../../../../assets/icons/pdfimg.png';
  wordFile: any = '../../../../../../assets/icons/word.png';
  loggedInUser: any;
  currencyList: any;
  removeTaskOrderFiled: boolean = true;
  task_order_nonBilable: boolean = false;
  trainSelected: boolean = false;
  flightSelected: boolean = false;
  rateCurrency: any;
  currencyValue: any;
  finalCurrnecyValue: number;
  billamountvalue: number;
  fullAmount: number;
  travelChildData: any;
  expenseChildId: any;
  expenseIdCopy: any;
  Emp_id_noti: any;
  Emp_name_noti: any;
  Emp_role_noti: any;
  Emp_roleID_noti: any;
  Emp_mail_noti: any;
  res1: any;
  toDate: any;
  leadIdCopy: any;
  travelChiledId: any;
  taskLeadId: any;
  travelTicketData: any;
  idTicket: any;
  constructor(private fb: FormBuilder,
    private leadService: LeadService,
    private route: Router,
    private recruitService: RecruitService,
    private activeroute: ActivatedRoute,
    private toast: ToastrService,
    private _itteketService: ItticketingService,
    private configService: ConfigurationalmasterService,
    private _empRegistration: EmpRegistrationService,
    public dialog: MatDialog,
    private _lmsNotification: NotificationServiceService

  ) {
    this.leadForm = this.fb.group({

      travel_id: new FormControl(null),
      travel_type: new FormControl(null),
      travel_desc: new FormControl(null),
      travel_approval: new FormControl(null),
      expense_approval: new FormControl(null),
      task_order: new FormControl(null),
      travel_ticket: new FormControl(null),
      traveler_name: new FormControl(null),
      flight_no: new FormControl(null),
      travel_date: new FormControl(null),
      quotation_currency: new FormControl(null),
      travel_amount: new FormControl(null),
      mode_of_travel: new FormControl(null),
      modeOf_travel: new FormControl(null),
      travel_form: new FormControl(null),
      travel_to: new FormControl(null),
      remarks: new FormControl(null),
      attach_ticket: new FormControl(null),
      attach_invoice: new FormControl(null),
      attach_remarks: new FormControl(null),
      remarks_confirm: new FormControl(null),
      time: new FormControl(null),
      dateOf_travel: new FormControl(null),
      flight_name: new FormControl(null),
      departure: new FormControl(null),
      arrival: new FormControl(null),
      time_travel: new FormControl(null),
      ticketType: new FormControl(null),
      ticketTypeDetails: new FormControl(null),
      time_travel_To: new FormControl(null),
      finalAmount: new FormControl(null),
      exr: new FormControl(null),
      arrivalTime: new FormControl(),
      select_agent:new FormControl(),
      tableRows: new FormArray([
        new FormGroup({
          traveler_name: new FormControl(null),
          dateOf_travel: new FormControl(null),
          modeOf_travel: new FormControl(null),
          travel_form: new FormControl(null),
          travel_to: new FormControl(null),
          time_travel: new FormControl(null),
          remarks: new FormControl(null),
          // modeOf_travel:new FormControl(null)
        })
      ]),
    })
    this.rowClass = 'rowClass'
  }

  ngOnInit() {

    
    this.chiledData();
    this.ticketDetailsOpen();

    this.activeroute.queryParams.subscribe(params => {
      this.id = params;
      this.getEmployee_information(147)
      this.lead_id = this.id?.lead_id;
      this.task_id = this.id?.task_lead_id;
      this.taskNonBillable = this.id?.task_lead_id
      // if (this.task_id) {
      //   this.leadService.getByIdLead(this.task_id).subscribe((res: any) => {
      //     this.singleLeadData = res.data;
      //     console.log(this.singleLeadData, 'this.singleLeadData');

      //     this.patchFormValueNew();
      //     this.taskData = `${this.singleLeadData?.taskOrder_no + "/" + this.singleLeadData?.associated_company + "/" + this.singleLeadData?.address2}`;
      //     const travel_type = this.singleLeadData?.travel_type;

      //     this.leadForm.patchValue({
      //       task_order: this.taskData,
      //       travel_ticket: travel_type,

      //     })

      //     if (this.singleLeadData.expense_category === "Billable") {
      //       this.billableStatus = true;
      //     }
      //     if (res.data.task_order_category === "Non-Billable") {
      //       this.task_order_nonBilable = true;
      //     }
      //   });
      // }


     
      this.patchFormValueDup();
    });
    if (this.lead_id) {
      this.leadService.getByIdTravel(this.lead_id).subscribe((res: any) => {

        console.log(res,'res singledadata')
        this.singleLeadData = res.data;
        this.taskLeadId=Number(res.data?.taskLeadId);
        console.log(this.taskLeadId,'this.taskLeadId');
        this.leadService.getByIdLead(this.taskLeadId).subscribe((res: any) => {
          this.dataExpense = res.data;
          console.log(this.dataExpense,'this.dataExpense');
          this.leadIdCopy=res.data?.lead_genration_id;
          console.log(this.leadIdCopy,'this.leadIdCopy');
          
          this.patchFormValueNew();
    
        });
        this.taskData = `${this.singleLeadData.taskOrder_no + "/" + this.singleLeadData.associated_company + "/" + this.singleLeadData.address2}`;
        if (res.data.expense_id) {
          this.expenseId_taskOrder = true
        }
        if (this.singleLeadData?.status === 'Booked Tickets') {
          this.cancelTicketStatus = true;
        }
        this.leadForm.patchValue({
          traveler_name: this.singleLeadData?.traveler_name,
          // modeOf_travel: this.singleLeadData?.modeOf_travel,
          // travel_form: this.singleLeadData?.travel_form,
          // travel_to: this.singleLeadData?.travel_to,
          dateOf_travel: this.singleLeadData?.dateOf_travel,
          remarks: this.singleLeadData?.remarks,
          task_order: this.singleLeadData?.task_order,
          travel_ticket: this.singleLeadData?.travel_ticket,
          travel_type:this.singleLeadData?.travel_type,
          select_agent:Number(this.singleLeadData?.select_agent)

        })
        if (res.data.travel_type === "Billable") {
          this.billableStatus = true;
        }

        if (res.data.travel_type === "Non-Billable") {
          this.nonBillableStatusUp = true;
        }

        this.statusTravel = res.data.status;


        if (this.singleLeadData?.travel_ticket === "Yes") {
          this.showTickets = true;
        } else {
          this.showTickets = false;
        }

        if (res.data.status === 'Suggested' || res.data.status === 'Confirmed') {
          this.statusTravel = true
        } else {
          this.statusTravel = false;
        }


        if (res.data.modeOf_travel === 'Train') {
          this.trainOn = true;
          this.flightOn = false;
          // this.busOn=false;
        } else if (res.data.modeOf_travel === "Flight") {
          this.trainOn = false;
          this.flightOn = true;
          // this.busOn=false;
        }
        // else if(res.data.modeOf_travel==='Bus'){
        //   this.trainOn=false;
        //   this.flightOn=false;
        //   this.busOn=true;
        // }
        this.taskOrderRemove()
        this.patchFormvalue();
      })

    }

    
  

    this.getAchievementList();
    this.patchFormvalue();
    this.getCategory();
    this.getStandardProgram();
    this.getCompanyList()
    this.getConfirmTicketStatus();
    this.getTaskOrder();
    this.mainId = localStorage.getItem("EmpMainId");

    this.getBymultipleTravel();
    this.getExpenseDetail();
    this.getCurrency();
    if (this.mainId != undefined) {
      this._empRegistration.getByUserId(this.mainId).subscribe((res) => {
        this.mainEmployeeData = res.data;
        this.loggedInUser = this.mainEmployeeData.first_name;
        this.getAchievementList();
        // this.patchFormvalue();
      })
    }

    this.patchNonBillable();
    this.flightSelected = true;
    this.leadForm.patchValue({
      dateOf_travel:null
    })
  
  }
 

  taskOrderRemove() {
    if (this.singleLeadData.task_order === "No Task Order Available") {
      this.removeTaskOrderFiled = true
    }
  }

  patchFormValueNew() {
  //   this.leadForm.patchValue({
  //     travel_type: this.singleLeadData?.task_order_category,
  //     task_order: this.singleLeadData?.taskOrder_no,

  //   })

  }
  patchFormValueDup() {
    this.leadForm.patchValue({
      travel_type: "Non-Billable"
    })
  }

  patchNonBillable() {
    let val = this.leadForm.value;
    if (val.travel_type === "Non-Billable") {
      this.nonBillableStatus = true;
      if (this.mainId != undefined) {
        this._empRegistration.getByUserId(this.mainId).subscribe((res) => {
          this.mainEmployeeData = res.data;
          this.loggedInUser = this.mainEmployeeData.first_name;
          this.leadForm.patchValue({
            traveler_name: this.loggedInUser
          })
        })
      }

    }
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


    let file2 = this.fileDetails2.file.name.split('.');

    let fileExe = file2[file2.length - 1].toUpperCase();

    if (fileExe === "PDF") {
      // this.CF_1.tableRows.controls[i].imagePath = this.pdfFile;
      this.pdfFile = fileExe;
    }
  }

  // getBymultipleTravel() {


  //   this._itteketService.travelMultipleGetBy(this.lead_id).subscribe((res: any) => {
  //     this.expenseIdData = res.data;


  //     // this.leadForm.patchValue({
  //     // departure: this.expenseIdData[0]?.travel_form,
  //     // arrival: this.expenseIdData[0]?.travel_to ,
  //     // modeOf_travel:this.expenseIdData[0]?.modeOf_travel

  //     // })       
  //     if (this.expenseIdData?.status === 'Submitted') {
  //       this.enableSubmit = true;
  //     }
  //   })
  // }


  // flight
  // suggested
  public columnDefs = [
    {
      headerName: 'S.No',
      field: 'ticket_id',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: "grid-cell-centered"
    },
    {
      headerName: 'Flight/Train No.',
      field: 'flight_no',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: "grid-cell-centered"
    },
    {
      headerName: 'Flight/Train Name.',
      field: 'flight_name',
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
      headerName: 'Departure Time',
      field: 'exr',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: "grid-cell-centered"
    },
    {
      headerName: 'Arrivel Time',
      field: 'arrivalTime',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: "grid-cell-centered"
    },

    {
      headerName: 'EXR',
      field: 'exr',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: "grid-cell-centered"
    },

    {
      headerName: 'Departure',
      field: 'departure',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: "grid-cell-centered"
    },
    {

      headerName: 'Arrival',
      field: 'arrival',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: "grid-cell-centered"
    },
    // {
    //   headerName: 'Travel Type',
    //   field: 'travel_type',
    //   sortable: true,
    //   resizable: true,
    //   wrapHeaderText: true,
    //   autoHeaderHeight: true,
    //   cellClass: "grid-cell-centered"
    // },
    // {
    //   headerName: 'Ticket Type',
    //   field: 'ticketTypeDetails',
    //   sortable: true,
    //   resizable: true,
    //   wrapHeaderText: true,
    //   autoHeaderHeight: true,
    //   cellClass: "grid-cell-centered"
    // },
    {
      headerName: 'Available on Travel Date and Time',
      field: 'travel_date',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: "grid-cell-centered"
    },
    {
      headerName: 'Currency',
      field: 'quotation_currency',
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
      headerName: 'Final Amount',
      field: 'finalAmount',
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
      field: 'travel_status',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: "grid-cell-centered",
      flex: 1,
      minWidth: 150
    },
  ];

  // train
  public columnDefstrain = [
    {
      headerName: 'S.No',
      field: 'ticket_id',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: "grid-cell-centered"
    },
    {
      headerName: 'Train/Flight No.',
      field: 'flight_no',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: "grid-cell-centered"
    },
    {
      headerName: 'Train/Flight Name.',
      field: 'flight_name',
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
      headerName: 'Departure Time',
      field: 'time',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: "grid-cell-centered"
    },
    {
      headerName: 'Arrivel Time',
      field: 'arrivalTime',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: "grid-cell-centered"
    },
    {

      headerName: 'Departure',
      field: 'departure',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: "grid-cell-centered"
    },
    {

      headerName: 'Arrival',
      field: 'arrival',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: "grid-cell-centered"
    },
    // {
    //   headerName: 'Travel Type',
    //   field: 'travel_type',
    //   sortable: true,
    //   resizable: true,
    //   wrapHeaderText: true,
    //   autoHeaderHeight: true,
    //   cellClass: "grid-cell-centered"
    // },
    // {
    //   headerName: 'Ticket Type',
    //   field: 'ticketTypeDetails',
    //   sortable: true,
    //   resizable: true,
    //   wrapHeaderText: true,
    //   autoHeaderHeight: true,
    //   cellClass: "grid-cell-centered"
    // },
    {
      headerName: 'Available on Travel Date and Time',
      field: 'travel_date',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: "grid-cell-centered"
    },
    {
      headerName: 'Currency',
      field: 'quotation_currency',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: "grid-cell-centered"
    },

    {
      headerName: 'EXR',
      field: 'exr',
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
      headerName: 'Final Amount',
      field: 'finalAmount',
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
      field: 'travel_status',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: "grid-cell-centered",
      flex: 1,
      minWidth: 150
    },

  ];
  // bus
  public columnDefsBus = [
    {
      headerName: 'S.No',
      field: 'ticket_id',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: "grid-cell-centered"
    },
    {
      headerName: 'Bus No.',
      field: 'flight_no',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: "grid-cell-centered"
    },
    {
      headerName: 'Available on Travel Date and Time',
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
      field: 'travel_status',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: "grid-cell-centered",
      flex: 1,
      minWidth: 150
    },
    {
      headerName: 'Action',
      field: 'expense_id',
      // cellRenderer: ActionsComponent,
      cellRendererParams: {
        className: 'mat-blue',
        hideRequestButton: true,
        hideDetailsButton: false,
        hideDownloadIcon: false,
        showCustomIcon: false, // Hide attachment icon
      },
      cellClass: "grid-cell-centered"
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
      headerName: 'Available on Travel Date and Time',
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
      field: 'travel_status',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: "grid-cell-centered",
      flex: 1,
      minWidth: 150
    },
    {
      headerName: 'Action',
      field: 'expense_id',
      // cellRenderer: ActionsComponent,
      cellRendererParams: {
        className: 'mat-blue',
        hideRequestButton: true,
        hideDetailsButton: false,
        hideDownloadIcon: false,
        showCustomIcon: false, // Hide attachment icon
      },
      cellClass: "grid-cell-centered"
    }


  ];
  public columnTravelList = [
    {
      headerName: 'S.No',
      valueGetter: "node.rowIndex + 1",
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: "grid-cell-centered",
      flex: 1
    },
    {
      headerName: 'Traveler Name',
      field: 'traveler_name',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: "grid-cell-centered",
      flex: 1
    },
    {
      headerName: 'Booking Date',
      field: 'dateOf_travel',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: "grid-cell-centered",
      flex: 1
    }, {
      headerName: 'Mode of Travel',
      field: 'modeOf_travel',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: "grid-cell-centered",
      flex: 1
    }, {

      headerName: 'Travel From',
      field: 'travel_form',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: "grid-cell-centered",
      flex: 1
    },
    {
      headerName: 'Travel to',
      field: 'travel_to',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: "grid-cell-centered",
      flex: 1
    },
    {
      headerName: 'Time',
      field: 'time_travel',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: "grid-cell-centered",
      flex: 1
    },
    {
      headerName: 'Remarks',
      field: 'remarks',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: "grid-cell-centered",
      flex: 1
    },
    // {
    //   headerName: 'Ticket Type',
    //   field: 'ticketType',
    //   sortable: true,
    //   resizable: true,
    //   wrapHeaderText: true,
    //   autoHeaderHeight: true,
    //   cellClass: "grid-cell-centered"
    // },
    {
      headerName: 'Action',
      field: 'expense_id',
      flex: 1,
      cellRenderer: TravelActionComponent,
      cellRendererParams: {
        className: 'mat-blue',
        hideRequestButton: true,
        hideDetailsButton: false,
        hideDownloadIcon: false,
        showCustomIcon: false, // Hide attachment icon
      },
      cellClass: "grid-cell-centered"
    }
  ];

  onCellClicked(e: any) {
    console.log(e, 'eeee ticket');

    // const dialogRef = this.dialog.open(ExpenseDialogComponent, { width: '40%', data: { empId: e.data.employee_id, expenseId: e.data.expenseId, ticket_id: e.data.ticket_id } });
    // dialogRef.afterClosed().subscribe(result => {

    // })
  }


  onCellClickedCopy(e: any) {
    console.log(e, 'eee tikct copy');

    // const dialogRef = this.dialog.open(ExpenseDialogComponent, { width: '40%', data: { empId: e.data.employee_id, expenseId: e.data.expenseId, ticket_id: e.data.ticket_id } });
    // dialogRef.afterClosed().subscribe(result => {

    // })
  }

  onCellClickedDtails(e: any) {
    console.log(e, 'eeeeeeeeee');

    // const dialogRef = this.dialog.open(ExpenseDialogComponent,{width:'500px',data:{travel_id:e.data.expensechildId,expense_id:e.data.expense_id}});
    //   dialogRef.afterClosed().subscribe(result => {
    //   })
    this.expenseChildId = e.data.expensechildId,
      this.expenseIdCopy = e.data.expense_id
    // this.ticketDetailsOpen();
    
    
  }

  ticketDetailsOpen() {
    this.addContact = true;
    this._itteketService.getByTravelRequestChildDetails(this.lead_id, this.travelChiledId).subscribe((res: any) => {
      this.travelChildData = res.data;
      console.log(this.travelChildData, 'this.travelChildData');
      let timetr = res.data[0].time_travel;
      let timeSplit = timetr.split("-")
      console.log(timetr, 'timetr');
      console.log(timeSplit, 'timeSplit');

      // if(this.travelChildData[0]?.modeOf_travel==="Train"){
      // this.
      // }else if(this.travelChildData[0]?.modeOf_travel==="Flight"){

      // }

      this.leadForm.patchValue({
        departure: this.travelChildData[0]?.travel_form,
        arrival: this.travelChildData[0]?.travel_to,
        mode_of_travel: this.travelChildData[0]?.modeOf_travel,
        time: timeSplit[0],
        arrivalTime: timeSplit[1],
        dateOf_travel: this.travelChildData[0].dateOf_travel,
        travel_form:this.travelChildData[0].travel_form,
        travel_to:this.travelChildData[0].travel_to,
        time_travel:timeSplit[0],
        time_travel_To:timeSplit[1],
        remarks:this.travelChildData[0].remarks
      })



    });
  }
  getExpenseDetail() {
    this.leadService.getTravelTicketCopy(this.mainId, this.lead_id).subscribe((res: any) => {

      // this.rowData = res.result;
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
      this.rowDataTrain = newData;
      this.rowDataBus = newData;




      // only suggested data
      let suggested: any = []
      for (let i = 0; i < res.result.length; i++) {
        if (res.result[i].travel_status == "Suggested") {
          suggested.push(res.result[i])
        }
      }

      this.rowDataSuggested = suggested;

      // only confirm status
      let bookData: any = []

      for (let i = 0; i < res.result.length; i++) {
        if (res.result[i].travel_status == "Confirmed") {
          bookData.push(res.result[i])
        }
      }

      this.rowDataBookTiket = bookData;

      this.ticketId = this.rowDataBookTiket[0]?.ticket_id;



      // this.rowData = res.result;

    })
  }
  dateFormatter(createdAt: any) {
    return moment(createdAt).format('DD/MM/YYYY');
  }
  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;


  }
  addBtn() {
    this.addContact = !this.addContact;
  }
  roundTripAdd() {
    this.twoWayTicket = !this.twoWayTicket;
  }
  getCompanyList() {
    this.leadService.getCompany().subscribe(
      (res: any) => {

        this.allCompanyList = res.result;
      },
      (err) => {

      }
    );
  }
  fetchSeries(value: String) {
    if (value === '') {
      return this.searchResult = []
    }
    this.searchResult = this.allAchievement.filter(function (series: any) {

      return series.first_name.toLowerCase().startsWith(value)
    })

  }

  candidateClick(e: any) {

    this.candidateId = e;
    this.recruitService.interViewGetIdBy(e).subscribe((res: any) => {
      this.interviewGetId = res.data;

      this.patchFormvalue();
    })
  }

  getCategory() {
    this.configService.listCategory().subscribe((res: any) => {
      this.categoryList = res.data;

    })
  }

  getAchievementList() {
    this.recruitService.getAllAchivement().subscribe(
      (res: any) => {

        this.allAchievement = res.data;
      },
      (err) => {

      }
    );
  }

  patchFormvalue() {
    this.leadForm.patchValue({
      travel_id: this.singleLeadData?.travel_id,
      travel_type: this.singleLeadData?.travel_type || "Non-Billable",
      travel_desc: this.singleLeadData?.travel_desc,
      travel_approval: this.singleLeadData?.travel_approval,
      expense_approval: this.singleLeadData?.expense_approval,
      travel_ticket: this.singleLeadData?.travel_ticket,
      traveler_name: this.singleLeadData?.traveler_name,
      modeOf_travel: this.singleLeadData?.modeOf_travel,
      travel_form: this.singleLeadData?.travel_form,
      travel_to: this.singleLeadData?.travel_to,
      dateOf_travel: this.singleLeadData?.dateOf_travel,
      remarks: this.singleLeadData?.remarks,
      time_travel: this.singleLeadData?.time_travel
    });
    if (this.singleLeadData?.status === 'Submitted') {
      this.enableSubmit = true;
    }
    if (this.singleLeadData?.status === 'Suggested') {
      this.enableSuggest = true;

    }
    if (this.singleLeadData?.status === 'Confirmed') {
      this.enableConfirm = true;
    }
    if (this.singleLeadData?.status === 'Booked Tickets') {
      this.enableBooked = true;
    }
    if (this.singleLeadData?.status === 'Approved') {
      this.enableApprove = true;
    }

    if (this.singleLeadData?.status === 'Booked Tickets') {
      this.cancelTicketStatus = true;
    }
    const vel = this.leadForm.value;


    if (this.singleLeadData?.travel_type === 'Non-Billable') {
      this.nonBillable = true;
    }

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

  getStandardProgram() {
    this.configService.listAsses().subscribe((res: any) => {
      this.standardList = res.data;

    });
  }
  // nonBillableFunc() {
  //   this.nonBillable = true;
  // }
  // billableFunc() {
  //   this.nonBillable = false;
  // }
  customerType() {
    this.cutomerType = true;
  }
  yesTickets() {
    this.showTickets = true;
  }
  noTickets() {
    this.showTickets = false;
  }

  // customerTypeNew() {
  //   this.cutomerType = false;
  // }

  siteAudit() {
    this.sitAudit = true;
  }

  siteAuditNew() {
    this.sitAudit = false;
  }
  submitForm() {
    Swal.fire({
      title: 'Are you sure to Create this Travel Request ?',
      text: "You won't be able to revert this!",
      icon: 'question',
      showCancelButton: true,
      cancelButtonColor: "#f44336",
      confirmButtonColor: "#3f51b5",
      confirmButtonText: 'Yes',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.isConfirmed) {
        let val = this.leadForm.value;

        const formData = new FormData();

        const data = {
          // travel_id: val.travel_id,
          travel_type: val.travel_type,
          travel_desc: val.travel_desc,
          travel_approval: val.travel_approval,
          dateOf_travel: moment(val.dateOf_travel).format('YYYY-MM-DD'),
          task_order: this.taskData || "No Task Order Available",
          travel_ticket: val.travel_ticket,
          time_travel: val.time_travel,
          status: "Submitted"
        }
        this.leadService.createTravelRequest(data, this.fileDetails.file).subscribe((res: any) => {
          this.saveOpen = true;
          this.expenseId = res.data.expense_id;
          this.toast.success("Travel Request Added Successfully..")
          this.create_notification();
        },
          (err: any) => {
            if (err.status === 403) {
              this.toast.warning("Expense Travel Id Already Exist Already Exits!")

            } else if (err.status === 500) {
              this.toast.error("Something Went to Wrong")
            }
          }
        )
      };
    });
  }





  getBymultipleTravel() {
    this._itteketService.travelMultipleGetBy(this.lead_id).subscribe((res: any) => {
      this.expenseIdData = res.data;
      if (this.expenseIdData?.status === 'Submitted') {
        this.enableSubmit = true;
      }
    })
  }
  travelSubmitForm() {

    Swal.fire({
       title: 'Are you sure to Submit this Travel Reuest ?',
       text: "You won't be able to revert this!",
       icon: 'question',
       showCancelButton: true,
       cancelButtonColor: "#f44336",
       confirmButtonColor: "#3f51b5",
       confirmButtonText: 'Yes',
       cancelButtonText: 'No'
     }).then((result) => {
       if (result.isConfirmed) {
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
       status: "Submitted"
     }
     this.leadService.updateTravel(this.lead_id, data).subscribe((res:any) => {
       
this.route.navigate(
     ['master/expense-main/travel-request'],
    //  { queryParams: { lead_id: this.lead_id } 
    // }
   );

   this.toast.success("Travel Request Created")
 
     })
       };
     });
 
 
   






 //  this.route.navigate(
 //     ['master/expense-main/travel-request/agent-access'],
 //     { queryParams: { lead_id: this.lead_id } }
 //   );

 //   this.toast.success("Travel Request Created")
 }
  onSearchChange(e: any) {
    // this.mangeNum=true;

    this.billamountvalue = e.target.value;

    this.fullAmount = this.rateCurrency * this.billamountvalue;


    this.leadForm.patchValue({
      finalAmount: this.fullAmount
    })
    // this.managementFee=Number(am);
    // 
    // 

    // this.totleFee=this.totleInvoice + this.managementFee;
    // 
    // var am=document.getElementsByName("mangement_fee")[e.target.value];
    // 


  }
  getTaskOrder() {
    this._itteketService.getTaskOrder().subscribe((res: any) => {

      this.taskOrderList = res.result;


    })
  }
  reject() {
    const data = {
      status: "Rejected"
    }
    this.leadService.editLead(this.lead_id, data).subscribe((res: any) => {

      this.toast.success(res.message);
      this.route.navigate(['master/expense-main/expense-managment/travel-request'],
        { queryParams: { lead_id: this.lead_id } }
      );
    })
  }

  suggestForm() {
    //   let val = this.leadForm.value;
    //   const data = {
    //     travel_id: val.travel_id,
    //     travel_type: val.travel_type,
    //     travel_desc: val.travel_desc,
    //     travel_approval: val.travel_approval,
    //     expense_approval: val.expense_approval,
    //     task_order: val.task_order || "No Task Order Available",
    //     travel_ticket: val.travel_ticket,
    //     traveler_name: val.traveler_name,
    //     dateOf_travel: moment(val.dateOf_travel).format('YYYY-MM-DD'),
    //     modeOf_travel: val.modeOf_travel,
    //     travel_form: val.travel_form,
    //     travel_to: val.travel_to,
    //     remarks: val.remarks,
    //     // attach_ticket:'',
    //     // attach_invoice:'',
    //     time_travel: val.time_travel,
    //     status: "Suggested"
    //   }

    // this.leadService.updateTravel(this.lead_id, data).subscribe((res: any) => {
    //     this.route.navigate(
    //       ['master/expense-main/travel-request/user-access'],
    //       { queryParams: { lead_id: this.lead_id } }
    //     );
    //     this.toast.success("Updated Successfully")
    //   },
    //     (err: any) => {
    //       this.toast.error("Somthing Went To Wrong")
    //     }
    //   )


    Swal.fire({
      title: 'Are you sure to Suggest this Travel Request ?',
      text: "You won't be able to revert this!",
      icon: 'question',
      showCancelButton: true,
      cancelButtonColor: "#f44336",
      confirmButtonColor: "#3f51b5",
      confirmButtonText: 'Yes',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.isConfirmed) {

        let val = this.leadForm.value;
        const data = {
          travel_id: val.travel_id,
          travel_type: val.travel_type,
          travel_desc: val.travel_desc,
          travel_approval: val.travel_approval,
          expense_approval: val.expense_approval,
          task_order: val.task_order || "No Task Order Available",
          travel_ticket: val.travel_ticket,
          traveler_name: val.traveler_name,
          dateOf_travel: moment(val.dateOf_travel).format('YYYY-MM-DD'),
          modeOf_travel: val.modeOf_travel,
          travel_form: val.travel_form,
          travel_to: val.travel_to,
          remarks: val.remarks,
          // attach_ticket:'',
          // attach_invoice:'',
          time_travel: val.time_travel,
          status: "Suggested"
        }

        this.leadService.updateTravel(this.lead_id, data).subscribe((res: any) => {
          this.route.navigate(
            ['master/expense-main/travel-request/user-access'],
            { queryParams: { lead_id: this.lead_id } }
          );
          this.toast.success("Updated Successfully")
        },
          (err: any) => {
            this.toast.error("Somthing Went To Wrong")
          }
        )

      };
    });


  }
  addTravel() {
    this.saveOpen = !this.saveOpen;

  }
  saveFlight() {
    // let val = this.leadForm.value;
    // const data = {
    //   flight_no: val.flight_no,
    //   travel_date: val.travel_date,
    //   travel_amount: val.travel_amount,
    //   quotation_currency: val.quotation_currency,
    //   mode_of_travel: val.mode_of_travel,
    //   travel_time: val.time,
    //   employee_id: Number(this.mainId),
    //   flight_name: val.flight_name,
    //   departure: val.departure,
    //   arrival: val.arrival,
    //   ticketTypeDetails: val.ticketTypeDetails,
    //   expenseId:Number(this.lead_id),
    //   time:val.time,
    //   finalAmount:val.finalAmount,
    //   exr:val.exr,
    //   arrivalTime:val.arrivalTime,
    //   myexpense_status: "INACTIVE",
    //   travel_status: "Suggested"
    // }
    // this.leadService.createTravelTicket(data).subscribe((res: any) => {
    //   this.cleanInput();
    //   this.toast.success("Ticket Details Added Successfully..");
    //   this.getExpenseDetail();
    //   // this.route.navigate(['master/expense-main/expense-managment/travel-request/create-request'],
    //   //   { queryParams: { lead_id: this.lead_id } }
    //   // );
    // })

    // this._itteketService.createExpenseTicketCopy(data).subscribe((res: any) => {
    //   
    //   this.cleanInput();
    //   this.toast.success("Ticket Details Added Successfully..");
    //   this.getExpenseDetail();
    //   // this.route.navigate(['master/expense-main/expense-managment/travel-request/create-request'],
    //   //   { queryParams: { lead_id: this.lead_id } }
    //   // );
    // })
    Swal.fire({
      title: 'Are you sure to Add this Travel Ticket Details ?',
      text: "You won't be able to revert this!",
      icon: 'question',
      showCancelButton: true,
      cancelButtonColor: "#f44336",
      confirmButtonColor: "#3f51b5",
      confirmButtonText: 'Yes',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.isConfirmed) {
        let val = this.leadForm.value;
        const data = {
          flight_no: val.flight_no,
          travel_date: moment(val.travel_date ).format('YYYY-MM-DD'),
          travel_amount: val.travel_amount,
          quotation_currency: val.quotation_currency,
          mode_of_travel: val.mode_of_travel,
          travel_time: val.time,
          employee_id: Number(this.mainId),
          flight_name: val.flight_name,
          departure: val.departure,
          arrival: val.arrival,
          ticketTypeDetails: val.ticketTypeDetails,
          expenseId: Number(this.lead_id),
          time: val.time,
          finalAmount: val.finalAmount,
          exr: val.exr,
          arrivalTime: val.arrivalTime,
          myexpense_status: "INACTIVE",
          travel_status: "Suggested"
        }
        this.leadService.createTravelTicket(data).subscribe((res: any) => {
          this.cleanInput();
          this.toast.success("Ticket Details Added Successfully..");
          this.getExpenseDetail();
          // this.route.navigate(['master/expense-main/expense-managment/travel-request/create-request'],
          //   { queryParams: { lead_id: this.lead_id } }
          // );
        })
      };
    });



  }


  confirmForm() {
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
      time_travel: val.time_travel,
      status: "Confirmed"
    }
    this.leadService.updateTravel(this.lead_id, data).subscribe((res: any) => {

      this.toast.success("Confirm Successfully");
      this.route.navigate(['master/expense-main/expense-managment/travel-request']);
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

      this.toast.success("Booked Tickets Successfully");
      this.route.navigate(['master/expense-main/expense-managment/travel-request']);
    },
      (err: any) => {
        this.toast.error("Something Went To wrong")
      }
    )


    this.leadService.updateBookTicketFile(this.ticketId, formData).subscribe((res: any) => {


    })

  }
  approveForm() {
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
      status: "Approved"
    }
    this.leadService.updateTravel(this.lead_id, data).subscribe((res: any) => {

    })
  }
  paymentForm() {
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
      status: "Payment Done"
    }
    this.leadService.updateTravel(this.lead_id, data).subscribe((res: any) => {

    })
  }
  cleanInput() {
    this.leadForm.get('flight_no')?.reset(),
      this.leadForm.get('travel_date')?.reset(),
      this.leadForm.get('travel_amount')?.reset(),
      this.leadForm.get('quotation_currency')?.reset(),
      this.leadForm.get('mode_of_travel')?.reset(),
      this.leadForm.get('arrivalTime')?.reset()
    this.leadForm.get('flight_name')?.reset(),
      this.leadForm.get('time')?.reset(),
      this.leadForm.get('finalAmount')?.reset(),
      this.leadForm.get('time_travel')?.reset(),
      // this.leadForm.get('time_travel')?.reset(),

      this.leadForm.get('ticketTypeDetails')?.reset(),
      this.leadForm.get('departure')?.reset(),
      this.leadForm.get('arrival')?.reset(),
      this.leadForm.get('exr')?.reset()

  }

  getConfirmTicketStatus() {
    this._itteketService.getTravelConfirmTicket().subscribe((res: any) => {
      this.rowConfirmData = res.result;
    })
  }
  changevent(e: any) {

    this.returnTicketHead = true;
    // if(e.checked=true){
    //   this.retunYes=false;

    // }else{
    //   this.retunYes=true
    // }
    //     if(this.customGetData && this.customGetData.length !=0){
    // alert("You are not able to add new Family Details")
    //     }else 
    // if (this.customGetData.length === 0) {
    // if(e.checked===true){
    const tableRows = this.leadForm.get('tableRows') as FormArray;
    <FormArray>this.CF_1.tableRows.push(
      new FormGroup({
        traveler_name: new FormControl(null),
        dateOf_travel: new FormControl(null),
        modeOf_travel: new FormControl(null),
        travel_form: new FormControl(null),
        travel_to: new FormControl(null),
        time_travel: new FormControl(null),
        remarks: new FormControl(null)
      })
    )
    // }
  }
  get CF_1(): any { return this.leadForm.controls };

  changConfirmNo(e: any) {
    if (e.checked = true) {
      this.retunNo = false;

    } else {
      this.retunNo = true
    }
  }

  returnSelect(e: any) {

    this.ticketValue = e.value;

    if (this.ticketValue === "Round Trip") {
      this.returnBtn = true;
    } else if (this.ticketValue === "One Way") {
      this.returnBtn = false
    }


  }


  addTickt() {

    // let ticketData = this.leadForm.value;

    // let data = {
    //   traveler_name: ticketData.traveler_name,
    //   dateOf_travel: ticketData.dateOf_travel,
    //   modeOf_travel: ticketData.modeOf_travel,
    //   travel_form: ticketData.travel_form,
    //   travel_to: ticketData.travel_to,
    //   // time_travel: ticketData.time_travel,
    //   remarks: ticketData.remarks,
    //   ticketType: ticketData.ticketType,
    //   expense_id: this.expenseId,
    //   time_travel:ticketData.time_travel.concat("-",ticketData.time_travel_To),
    //   // modeOf_travel:ticketData.modeOf_travel
    // }
    //   this._itteketService.travelerMultipleCreate(data).subscribe((res: any) => {

    //   this.cleanTicketInput();
    //   this.toast.success("Ticket Add Successfully")

    // },
    //   ((err: any) => {
    //     this.toast.error("Something Went To Wrong")
    //   })
    // )

    Swal.fire({
      title: 'Are you sure to Add this Travel Details ?',
      text: "You won't be able to revert this!",
      icon: 'question',
      showCancelButton: true,
      cancelButtonColor: "#f44336",
      confirmButtonColor: "#3f51b5",
      confirmButtonText: 'Yes',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.isConfirmed) {


        let ticketData = this.leadForm.value;

        let data = {
          traveler_name: ticketData.traveler_name,
          dateOf_travel: moment(ticketData.dateOf_travel).format('YYYY-MM-DD'),
          modeOf_travel: ticketData.modeOf_travel,
          travel_form: ticketData.travel_form,
          travel_to: ticketData.travel_to,
          // time_travel: ticketData.time_travel,
          remarks: ticketData.remarks,
          ticketType: ticketData.ticketType,
          expense_id:this.lead_id,
          time_travel: ticketData.time_travel.concat("-", ticketData.time_travel_To),
          // modeOf_travel:ticketData.modeOf_travel
        }

        console.log(data,'dataaaaaa<<<<<<<<<<<<');
        
          this._itteketService.travelerMultipleCreate(data).subscribe((res: any) => {
          this.saveOpen=false
          this.cleanTicketInput();
          this.toast.success("Ticket Add Successfully");
          this.getBymultipleTravel();

        },
          ((err: any) => {
            this.toast.error("Something Went To Wrong")
          })
        )
      };
    });

  }

  cleanTicketInput() {
    // this.leadForm.get('traveler_name')?.reset(),
    this.leadForm.get('dateOf_travel')?.reset(),
      this.leadForm.get('modeOf_travel')?.reset(),
      this.leadForm.get('travel_form')?.reset(),
      this.leadForm.get('travel_to')?.reset()
    this.leadForm.get('time_travel')?.reset(),
      this.leadForm.get('remarks')?.reset(),
      this.leadForm.get('ticketType')?.reset(),
      this.leadForm.get('time_travel_To')?.reset()


  }



  
  cancel() {
    this.route.navigate(['master/expense-main/travel-request'])
  }

  cancelTicket() {
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
      dateOf_travel: moment(val.dateOf_travel).format('YYYY-MM-DD'),
      modeOf_travel: val.modeOf_travel,
      travel_form: val.travel_form,
      travel_to: val.travel_to,
      remarks: val.remarks,
      // attach_ticket:'',
      // attach_invoice:'',
      time_travel: val.time_travel,
      status: "Cancel Request"
    }




    this.leadService.updateTravel(this.lead_id, data).subscribe((res: any) => {

      this.route.navigate(
        ['master/expense-main/expense-managment/travel-request'],
        { queryParams: { lead_id: this.lead_id } }
      );
      this.toast.success("Updated Successfully")
    },
      (err: any) => {
        this.toast.error("Somthing Went To Wrong")
      }
    )
  }
  getCurrency() {
    this._itteketService.getAllExpenseCurrency().subscribe((res: any) => {
      this.currencyList = res.data;

    });
  }
  trainSelect() {
    this.trainSelected = true;
    this.flightSelected = false;

  }
  flightSelect() {
    this.flightSelected = true;
    this.trainSelected = false;

  }


  selectCurrency(e: any) {

    let currencyId = e.value;


    this._itteketService.getByCurrency(currencyId).subscribe((res: any) => {

      this.rateCurrency = res.data.rate;


      this.leadForm.patchValue({
        exr: res.data.rate
      })
    })


    this.currencyValue = e.value;


    // if(e.value==="INR"){
    //    this.finalCurrnecyValue=this.billamountvalue * 1
    // }else if(e.value==="USD"){
    //   this.finalCurrnecyValue=this.billamountvalue * 84
    // }
  }
  ToDate(e:any){
    this.toDate= moment(e.value).format('DD/MM/YYYY');
    
  }
  getEmployee_information(id: any) {
    this._lmsNotification.get_EmployeeDetails(id).subscribe((res: any) => {
      console.log(res, "information emp");
      this.Emp_id_noti = id
      this.Emp_name_noti = res.data.first_name
      this.Emp_mail_noti = res.data.employee_official_email
      this.Emp_role_noti = res.data.user_role
      this.Emp_roleID_noti = res.data.role_master_id
    })
  }
  create_notification() {
    let data =
      [
        {
          employee_id: this.Emp_id_noti,
          emp_name: this.Emp_name_noti,
          employee_official_email: this.Emp_mail_noti,
          role: this.Emp_role_noti,
          role_id: this.Emp_roleID_noti,
          type: 'EM',
          remark: "User has sent travel request. Please check.",
          subject: "Regarding travel request",
          textData: `
        Dear ${this.Emp_name_noti}, <br>
             It is informed to you that user has sent to you travel request. Please check and action on it.
              <br>   Regards,
              XYZ
        `,
        }
      ]
    this._lmsNotification.create_notification(data).subscribe((responsive: any) => {
      console.log(responsive);
      // this.toast.success("noti")
      this.res1 = responsive
    },
      // (error)=>{
      //   this.toast.error("Somthing went wrong","ERROR")

      // }
    )
  }

  chnege(e:any){
    console.log(e,'eeeeeee');
    
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

  chiledData(){
    this.leadService.travelChiledId.subscribe((id:any)=>{
      console.log(id,'idd chiled');
      this.travelChiledId=id;
      this.ticketDetailsOpen();
    })
  }
}
