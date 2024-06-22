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
import { ActionsComponent } from '../actions/actions.component';
import { ItticketingService } from 'src/app/@shared/services/itticketing.service';
import { el } from '@fullcalendar/core/internal-common';
import { concat } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { ExpenseDialogComponent } from '../expense-dialog/expense-dialog.component';
import { MomentDateAdapter } from "@angular/material-moment-adapter";
import Swal from 'sweetalert2';
import { DatePipe } from "@angular/common";
import { jsPDF } from 'jspdf';
import domtoimage from 'dom-to-image';
import { NotificationServiceService } from 'src/app/@shared/services/notification/notification-service.service';
import { TravelActionComponent } from '../../travel-req-draft/travel-action/travel-action.component';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { TravelActionsComponent } from './travel-actions/travel-actions.component';
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
  selector: 'app-travel-request',
  templateUrl: './travel-request.component.html',
  styleUrls: ['./travel-request.component.scss'],
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

export class TravelRequestComponent {

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
  maxToDate = moment({ year: this.year + 100, month: this.month, date: this.dates }).format('DD-MM-YYYY');
  minDate = moment({ year: this.year - 0, month: this.month, date: this.dates }).format('YYYY-MM-DD');

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
  chiledTravelId: any;
  expenseIdDataChiled: any;
  ontravelTable: boolean = false;
  urll: string;
  urll2: string;
  // minToDate: Date | null;
  // maxToDate: Date;
  nonBilTravelDetails: boolean = false;
  expensApprove: any;
  travelTicket: any;
  travelDetOpen: boolean = false;
  submitBtnOn: boolean = false;
  FromDate: string;
  agentData: any;
  tarvelDetailsForm: FormGroup;
  submitStatus: boolean = false;
  travelTicketForm: FormGroup;
  taskOrder: any;
  idTicket: any;
  travelTicketData: any;
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
    // this.minToDate = new Date(1900, 0, 1);
    // this.maxToDate = new Date(1900, 0, 1);
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
      // mode_of_travel: new FormControl(null),
      // modeOf_travel: new FormControl(null),
      // travel_form: new FormControl(null),
      // travel_to: new FormControl(null),
      // remarks: new FormControl(null),
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
      select_agent: new FormControl(null, Validators.required),
      // tableRows: new FormArray([
      //   new FormGroup({
      //     traveler_name: new FormControl(null),
      //     dateOf_travel: new FormControl(null),
      //     modeOf_travel: new FormControl(null),
      //     travel_form: new FormControl(null),
      //     travel_to: new FormControl(null),
      //     time_travel: new FormControl(null),
      //     remarks: new FormControl(null),
      //     // modeOf_travel:new FormControl(null)
      //   })
      // ]),
    }),
      this.tarvelDetailsForm = this.fb.group({
        traveler_name: new FormControl(null),
        dateOf_travel: new FormControl(null, Validators.required),
        modeOf_travel: new FormControl(null, Validators.required),
        travel_form: new FormControl(null, Validators.required),
        travel_to: new FormControl(null, Validators.required),
        time_travel: new FormControl(null, Validators.required),
        remarks: new FormControl(null),
        time_travel_To: new FormControl(null, Validators.required),
      }),
      this.travelTicketForm = this.fb.group({
        flight_no: new FormControl(null),
        travel_date: new FormControl(null),
        flight_name: new FormControl(null),
        exr: new FormControl(null),
        arrivalTime: new FormControl(),
        time: new FormControl(null),
        quotation_currency: new FormControl(null),
        travel_amount: new FormControl(null),
        finalAmount: new FormControl(null),
        mode_of_travel: new FormControl(null),
        departure: new FormControl(null),
        arrival: new FormControl(null),

      })
    this.rowClass = 'rowClass'
  }
  fromDate(e: any) {
    this.FromDate = moment(e.value).format('YYYY-MM-DD');
  }
  ngOnInit() {
    this.expenseIdDataChiled = "No Data";
    this.rowDataSuggested = "No Data"
    this.activeroute.queryParams.subscribe(params => {
      this.id = params;
      this.getEmployee_information(147)
      this.lead_id = this.id?.lead_id;
      this.task_id = this.id?.task_lead_id;
      this.taskNonBillable = this.id?.task_lead_id

      if (this.task_id) {
        this.leadService.getByIdLead(this.task_id).subscribe((res: any) => {
          this.singleLeadData = res.data;
          console.log(this.singleLeadData, 'this.singleLeadData');

          this.patchFormValueNew();
          this.taskData = `${this.singleLeadData?.taskOrder_no + "/" + this.singleLeadData?.associated_company + "/" + this.singleLeadData?.address2}`;
          const travel_type = this.singleLeadData?.travel_type;

          this.leadForm.patchValue({
            task_order: this.taskData,
            travel_ticket: travel_type,

          })

          if (this.singleLeadData.expense_category === "Billable") {
            this.billableStatus = true;
          }
          if (res.data.task_order_category === "Non-Billable") {
            this.task_order_nonBilable = true;
          }
        });
      }


      this.leadService.getByIdLead(this.lead_id).subscribe((res: any) => {
        this.dataExpense = res.data;
        console.log(this.dataExpense, 'this.dataExpense');

        this.patchFormValueNew();

      });
      this.patchFormValueDup();
    });
    if (this.lead_id) {
      this.leadService.getByIdTravel(this.lead_id).subscribe((res: any) => {
        this.singleLeadData = res.data;
        console.log(this.singleLeadData, 'this.singleLeadData');
        this.emplId = res.data?.empId;
        console.log(this.emplId, ' this.emplId');
        this.taskOrder = res.data?.task_order;
        console.log(this.taskOrder, 'this.taskOrder');

        this.taskData = `${this.singleLeadData.taskOrder_no + "/" + this.singleLeadData.associated_company + "/" + this.singleLeadData.address2}`;
        if (res.data.expense_id) {
          this.expenseId_taskOrder = true
        }
        if (this.singleLeadData?.status === 'Booked Tickets') {
          this.cancelTicketStatus = true;
        }
        this.tarvelDetailsForm.patchValue({
          traveler_name: this.singleLeadData?.traveler_name,
          // modeOf_travel: this.singleLeadData?.modeOf_travel,
          // travel_form: this.singleLeadData?.travel_form,
          // travel_to: this.singleLeadData?.travel_to,
          dateOf_travel: this.singleLeadData?.dateOf_travel,
          remarks: this.singleLeadData?.remarks,
          task_order: this.singleLeadData?.task_order,
          travel_ticket: this.singleLeadData?.travel_ticket


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
        if (res.data.status = "Submitted") {
          this.submitStatus = true
        }
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
    this.getBymultipleTravelChiled();
    this.getTaskOrder();
    this.patchDOmestic();
    this.getAllAgent()
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

    this.urll = this.route.url;
    console.log(this.urll, 'this.urll');
    this.urll2 = this.route.url.toString();
    console.log(this.urll2, 'this.urll2');
    this.ondetailsTable()
    this.idGetTicket()


  }

  ondetailsTable() {
    if (this.urll2 == '/master/expense-main/travel-request/travel-request/create-request') {
      this.nonBilTravelDetails = true;
    }
  }

  taskOrderRemove() {
    if (this.singleLeadData.task_order === "No Task Order Available") {
      this.removeTaskOrderFiled = true
    }
  }

  idGetTicket() {
    this.leadService.ticketIdCopy.subscribe((id: any) => {
      console.log(id, 'iddddd');
      this.idTicket = id
      this._itteketService.getByTravelTicketCopy(this.mainId, this.lead_id, this.idTicket).subscribe((res: any) => {
        this.travelTicketData = res.result[0];
        console.log(this.travelTicketData, 'this.travelChildData');
        this.addContact = true;
        const dateString =this.travelTicketData?.travel_date; // Replace with your date string
        const dateParts = dateString.split("-");
        const year = parseInt(dateParts[2], 10);
        const month = parseInt(dateParts[1], 10) - 1; // Month in JavaScript Date object is 0-based
        const day = parseInt(dateParts[0], 10);
        const date = new Date(year, month, day);
        console.log(date,'datedatedatedatedate');
        this.travelTicketForm.patchValue({
          flight_no: this.travelTicketData?.flight_no,
          travel_date: date,
          flight_name: this.travelTicketData?.flight_name,
          exr: this.travelTicketData?.exr,
          arrivalTime: this.travelTicketData?.arrivalTime,
          time: this.travelTicketData?.time,
          quotation_currency: Number(this.travelTicketData?.quotation_currency),
          travel_amount: this.travelTicketData?.travel_amount,
          finalAmount: this.travelTicketData?.finalAmount,
          mode_of_travel: this.travelTicketData?.mode_of_travel,
          departure: this.travelTicketData?.departure,
          arrival: this.travelTicketData?.arrival
        })
        // for (let i = 0; i <= res.result.length; i++) {
        //   if (res.result[i].travel_status == "Suggested") {
        //     this.hideInvoiceFileds = true;
        //   }
        // }

      });
    })


  }

  getByTravelTicketDetails() {

    // console.log(this.employeId, this.expenseIdTicket, this.ticketIdTravel, 'this.employeId,this.expenseIdTicket,this.ticketIdTravel');
    // // this.trippleId=`${this.employeId }`  +  `${ this.expenseIdTicket }`  +  `${ this.ticketIdTravel }`
    // console.log(this.trippleId, 'this.trippleId');



  }

  patchFormValueNew() {
    this.leadForm.patchValue({
      travel_type: this.singleLeadData?.task_order_category,
      task_order: this.singleLeadData?.taskOrder_no,

    })

  }
  patchFormValueDup() {
    this.leadForm.patchValue({
      travel_type: "Non-Billable"
    })
  }

  patchDOmestic() {
    this.leadForm.patchValue({
      travel_ticket: "Domestic"
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
          this.tarvelDetailsForm.patchValue({
            traveler_name: this.loggedInUser
          })
        })
      }

    }

    if (val.travel_type === "Non-Billable") {
      this.ontravelTable = true
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

  // flight
  // suggested
  public columnDefs = [
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
      headerName: 'Flight/Train No.',
      field: 'flight_no',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: "grid-cell-centered",
      flex: 1
    },
    {
      headerName: 'Flight/Train Name.',
      field: 'flight_name',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: "grid-cell-centered",
      flex: 1
    },
    {
      headerName: 'Travel Date',
      field: 'travel_date',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: "grid-cell-centered",
      flex: 1
    },

    {
      headerName: 'Departure Time',
      field: 'time',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: "grid-cell-centered",
      flex: 1
    },
    {
      headerName: 'Arrivel Time',
      field: 'arrivalTime',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: "grid-cell-centered",
      flex: 1
    },

    // {
    //   headerName: 'EXR',
    //   field: 'exr',
    //   sortable: true,
    //   resizable: true,
    //   wrapHeaderText: true,
    //   autoHeaderHeight: true,
    //   cellClass: "grid-cell-centered",
    //   flex:1
    // },

    {
      headerName: 'Departure',
      field: 'departure',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: "grid-cell-centered",
      flex: 1
    },
    {

      headerName: 'Arrival',
      field: 'arrival',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: "grid-cell-centered",
      flex: 1
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
    // {
    //   headerName: 'Available on Travel Date and Time',
    //   field: 'travel_date',
    //   sortable: true,
    //   resizable: true,
    //   wrapHeaderText: true,
    //   autoHeaderHeight: true,
    //   cellClass: "grid-cell-centered",
    //   flex:1
    // },
    {
      headerName: 'Currency',
      field: 'Currency_Type',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: "grid-cell-centered",
      flex: 1
    },
    // {
    //   headerName: 'Travel Amount',
    //   field: 'travel_amount',
    //   sortable: true,
    //   resizable: true,
    //   wrapHeaderText: true,
    //   autoHeaderHeight: true,
    //   cellClass: "grid-cell-centered",
    //   flex:1
    // },
    {
      headerName: 'Final Amount',
      field: 'finalAmount',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: "grid-cell-centered",
      flex: 1
    },
    {
      headerName: 'Mode of Travel',
      field: 'mode_of_travel',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: "grid-cell-centered",
      flex: 1
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
      // minWidth: 150
    },
    {
      headerName: 'Action',
      field: 'travel_status',
      cellRenderer: TravelActionsComponent,
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: "grid-cell-centered",
      flex: 1,
      // minWidth: 150
    },
  ];

  // train
  public columnDefstrain = [
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
      headerName: 'Train/Flight No.',
      field: 'flight_no',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: "grid-cell-centered",
      flex: 1
    },
    {
      headerName: 'Train/Flight Name.',
      field: 'flight_name',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: "grid-cell-centered",
      flex: 1
    },
    {
      headerName: 'Travel Date',
      field: 'travel_date',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: "grid-cell-centered",
      flex: 1
    },
    {
      headerName: 'Departure Time',
      field: 'time',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: "grid-cell-centered",
      flex: 1
    },
    {
      headerName: 'Arrivel Time',
      field: 'arrivalTime',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: "grid-cell-centered",
      flex: 1
    },
    {

      headerName: 'Departure',
      field: 'departure',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: "grid-cell-centered",
      flex: 1
    },
    {

      headerName: 'Arrival',
      field: 'arrival',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: "grid-cell-centered",
      flex: 1
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
      cellClass: "grid-cell-centered",
      flex: 1
    },
    {
      headerName: 'Currency',
      field: 'Currency_Type',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: "grid-cell-centered",
      flex: 1
    },

    {
      headerName: 'EXR',
      field: 'exr',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: "grid-cell-centered",
      flex: 1
    },

    {
      headerName: 'Travel Amount',
      field: 'travel_amount',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: "grid-cell-centered",
      flex: 1
    },
    {
      headerName: 'Final Amount',
      field: 'finalAmount',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: "grid-cell-centered",
      flex: 1
    },
    {
      headerName: 'Mode of Travel',
      field: 'mode_of_travel',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: "grid-cell-centered",
      flex: 1
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
      // minWidth: 150
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
      cellRenderer: ActionsComponent,
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
      cellRenderer: ActionsComponent,
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
      cellRenderer: ActionsComponent,
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


  public columnTravelChiledList = [
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

    const dialogRef = this.dialog.open(ExpenseDialogComponent, { width: '40%', data: { empId: e.data.employee_id, expenseId: e.data.expenseId, ticket_id: e.data.ticket_id } });
    dialogRef.afterClosed().subscribe(result => {

    })
  }


  onCellClickedCopy(e: any) {
    console.log(e, 'eee tikct copy');

    const dialogRef = this.dialog.open(ExpenseDialogComponent, { width: '40%', data: { empId: e.data.employee_id, expenseId: e.data.expenseId, ticket_id: e.data.ticket_id } });
    dialogRef.afterClosed().subscribe(result => {

    })
  }

  onCellClickedDtails(e: any) {
    console.log(e, 'eeeeeeeeee');

    // const dialogRef = this.dialog.open(ExpenseDialogComponent,{width:'500px',data:{travel_id:e.data.expensechildId,expense_id:e.data.expense_id}});
    //   dialogRef.afterClosed().subscribe(result => {
    //   })
    this.expenseChildId = e.data.expensechildId,
      this.expenseIdCopy = e.data.expense_id
    this.ticketDetailsOpen();
  }

  ticketDetailsOpen() {
    this.addContact = true;
    this._itteketService.getByTravelRequestChildDetails(this.expenseIdCopy, this.expenseChildId).subscribe((res: any) => {
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

      this.travelTicketForm.patchValue({
        departure: this.travelChildData[0]?.travel_form,
        arrival: this.travelChildData[0]?.travel_to,
        mode_of_travel: this.travelChildData[0]?.modeOf_travel,
        time: timeSplit[0],
        arrivalTime: timeSplit[1],
        travel_date: this.travelChildData[0].dateOf_travel
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



      console.log(this.currencyList, 'this.currencyList');

      // only suggested data
      let suggested: any = []
      for (let i = 0; i < res.result.length; i++) {
        if (res.result[i].travel_status == "Suggested") {
          suggested.push(res.result[i])
        }
      }

      this.rowDataSuggested = suggested;

      console.log(this.rowDataSuggested, ' this.rowDataSuggested');



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
  addBtn(e:any) {

    console.log(e,'eeeee test');
    
    this.addContact = !this.addContact;
    if( this.addContact===false){
      this.idTicket=null;
      this.cleanInput()
    }
  }

  addTravel() {
    this.saveOpen = !this.saveOpen;

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

    this.tarvelDetailsForm.patchValue({
      traveler_name: this.singleLeadData?.traveler_name,
      modeOf_travel: this.singleLeadData?.modeOf_travel,
      travel_form: this.singleLeadData?.travel_form,
      travel_to: this.singleLeadData?.travel_to,
      dateOf_travel: this.singleLeadData?.dateOf_travel,
      remarks: this.singleLeadData?.remarks,
      time_travel: this.singleLeadData?.time_travel
    })
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

    if (this.leadForm.invalid) {
      this.toast.error('Required fields should not be empty');
      return;
    }
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
          // status: "Submitted draft"
          taskLeadId: this.task_id,
          select_agent: Number(val.select_agent),
          empId: this.mainId,
          status: "Draft"

        }
        this.leadService.createTravelRequest(data, this.fileDetails.file).subscribe((res: any) => {
          this.expenseId = res.data.expense_id;
          this.expensApprove = res.data.expense_approval;
          this.travelTicket = res.data.travel_ticket;

          this.travelDetOpen = true
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
      console.log(this.expenseIdData, 'this.expenseIdData');


      // this.leadForm.patchValue({
      // departure: this.expenseIdData[0]?.travel_form,
      // arrival: this.expenseIdData[0]?.travel_to ,
      // modeOf_travel:this.expenseIdData[0]?.modeOf_travel

      // })       
      if (this.expenseIdData?.status === 'Submitted') {
        this.enableSubmit = true;
      }
    })
  }



  travelSubmitForm() {
    if (!this.expenseId) {
      // alert("sory");
      this.toast.warning("Please Create Travel Request")
      return;
    }
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
          task_order: val.task_order || "No Task Order Available",
          travel_ticket: val.travel_ticket,
          // traveler_name: val.traveler_name,
          // travel_date: moment(val.travel_date).format('YYYY-MM-DD'),
          // modeOf_travel: val.modeOf_travel,
          // travel_form: val.travel_form,
          // travel_to: val.travel_to,
          // remarks: val.remarks,
          empId: this.mainId,

          status: "Submitted"
        }
        this.leadService.updateTravel(this.expenseId, data).subscribe((res: any) => {

          this.route.navigate(
            ['master/expense-main/travel-request'],
            // { queryParams: { lead_id: this.lead_id } }
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


    this.travelTicketForm.patchValue({
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
          task_order: this.taskOrder || "No Task Order Available",
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
            ['master/expense-main/travel-request'],
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
  saveFlight() {

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
        let val = this.travelTicketForm.value;
        const data = {
          flight_no: val.flight_no,
          travel_date: moment(val.travel_date).format('DD-MM-YYYY'),
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
          sugested_employee_id: this.emplId,
          myexpense_status: "INACTIVE",
          travel_status: "Suggested"
        }
        this.leadService.createTravelTicket(data).subscribe((res: any) => {
          this.cleanInput();
          this.toast.success("Ticket Details Added Successfully..");
          this.getExpenseDetail();
          this.addContact = false;
          // this.route.navigate(['master/expense-main/expense-managment/travel-request/create-request'],
          //   { queryParams: { lead_id: this.lead_id } }
          // );
        })
      };
    });

}

 cleanInput() {
    this.travelTicketForm.get('flight_no')?.reset(),
      this.travelTicketForm.get('travel_date')?.reset(),
      this.travelTicketForm.get('travel_amount')?.reset(),
      this.travelTicketForm.get('quotation_currency')?.reset(),
      this.travelTicketForm.get('mode_of_travel')?.reset(),
      this.travelTicketForm.get('arrivalTime')?.reset()
    this.travelTicketForm.get('flight_name')?.reset(),
      this.travelTicketForm.get('time')?.reset(),
      this.travelTicketForm.get('finalAmount')?.reset(),
      this.travelTicketForm.get('time_travel')?.reset(),
      // this.travelTicketForm.get('time_travel')?.reset(),

      this.travelTicketForm.get('ticketTypeDetails')?.reset(),
      this.travelTicketForm.get('departure')?.reset(),
      this.travelTicketForm.get('arrival')?.reset(),
      this.travelTicketForm.get('exr')?.reset()

  }

  getConfirmTicketStatus() {
    this._itteketService.getTravelConfirmTicket().subscribe((res: any) => {
      this.rowConfirmData = res.result;
    })
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
if (this.tarvelDetailsForm.invalid) {
      this.toast.error('Required fields should not be empty');
      return;
    }

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


        let ticketData = this.tarvelDetailsForm.value;

        let data = {
          traveler_name: ticketData.traveler_name,
          dateOf_travel: moment(ticketData.dateOf_travel).format('YYYY-MM-DD'),
          modeOf_travel: ticketData.modeOf_travel,
          travel_form: ticketData.travel_form,
          travel_to: ticketData.travel_to,
          // time_travel: ticketData.time_travel,
          remarks: ticketData.remarks,
          ticketType: ticketData.ticketType,
          expense_id: this.expenseId,
          time_travel: ticketData.time_travel.concat("-", ticketData.time_travel_To),
          // modeOf_travel:ticketData.modeOf_travel
        }

        console.log(data, 'dataaaaaa<<<<<<<<<<<<');

        this._itteketService.travelerMultipleCreate(data).subscribe((res: any) => {
          console.log(res, 'res chiled data');
          this.chiledTravelId = res.data.expensechildId;
          console.log(this.chiledTravelId, 'this.chiledTravelId');
          this.submitBtnOn = true;
          this.saveOpen = false;
          this.cleanTicketInput();
          this.getBymultipleTravelChiled();
          this.toast.success("Ticket Add Successfully")

        },
          ((err: any) => {
            this.toast.error("Something Went To Wrong")
          })
        )
      };
    });

  }
  getBymultipleTravelChiled() {


    this._itteketService.travelMultipleGetBy(this.expenseId).subscribe((res: any) => {
      this.expenseIdDataChiled = res.data;
      console.log(this.expenseIdDataChiled, 'this.expenseIdDataChiled');

      console.log(this.currencyList, 'this.currencyList');

      // this.leadForm.patchValue({
      // departure: this.expenseIdData[0]?.travel_form,
      // arrival: this.expenseIdData[0]?.travel_to ,
      // modeOf_travel:this.expenseIdData[0]?.modeOf_travel

      // })       
      if (this.expenseIdData?.status === 'Submitted') {
        this.enableSubmit = true;
      }
    })
  }
  cleanTicketInput() {
    // this.leadForm.get('traveler_name')?.reset(),
    this.tarvelDetailsForm.get('dateOf_travel')?.reset(),
      this.tarvelDetailsForm.get('modeOf_travel')?.reset(),
      this.tarvelDetailsForm.get('travel_form')?.reset(),
      this.tarvelDetailsForm.get('travel_to')?.reset()
    this.tarvelDetailsForm.get('time_travel')?.reset(),
      this.tarvelDetailsForm.get('remarks')?.reset(),
      this.tarvelDetailsForm.get('ticketType')?.reset(),
      this.tarvelDetailsForm.get('time_travel_To')?.reset()


  }
  cancel() {
    this.route.navigate(['master/expense-main/travel-request'])
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

      this.travelTicketForm.patchValue({
        exr: res.data.rate
      })
    })


    this.currencyValue = e.value;

  }
  ToDate(e: any) {
    this.toDate = moment(e.value).format('DD/MM/YYYY');

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

  chnege(e: any) {
    console.log(e, 'eeeeeee');

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

  dateFilter = (date: Date | null): boolean => {
    console.log(date, 'date');

    if (date) {
      const currentDate = new Date();
      // Allow selection of dates equal to or after the current date
      console.log(currentDate, 'currentDate');

      return date >= currentDate;
    }
    return true; // Allow no selection if the date is null
  };

  // Handle date input change event
  dateInputChange(event: MatDatepickerInputEvent<Date>) {
    console.log('Selected date:', event.value);
  }

  getAllAgent() {
    this.leadService.getAllAgent().subscribe((res: any) => {
      this.agentData = res.data;
      console.log(this.agentData, 'this.agentData');

    })
  }

  updateTicket(){
   Swal.fire({
      title: 'Are you sure to Update this Travel Ticket Details ?',
      text: "You won't be able to revert this!",
      icon: 'question',
      showCancelButton: true,
      cancelButtonColor: "#f44336",
      confirmButtonColor: "#3f51b5",
      confirmButtonText: 'Yes',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.isConfirmed) {
        let val = this.travelTicketForm.value;
        const data = {
          flight_no: val.flight_no,
          travel_date: moment(val.travel_date).format('DD-MM-YYYY'),
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
          sugested_employee_id: this.emplId,
          myexpense_status: "INACTIVE",
          travel_status: "Suggested"
        }
        this._itteketService.updateTicketexpense(this.idTicket,data).subscribe((res: any) => {
          this.cleanInput();
          this.toast.success("Ticket Details Update Successfully..");
          this.getExpenseDetail();
          this.addContact = false;
          this.idTicket=null
          // this.route.navigate(['master/expense-main/expense-managment/travel-request/create-request'],
          //   { queryParams: { lead_id: this.lead_id } }
          // );
        })
      };
    });
  }
}
