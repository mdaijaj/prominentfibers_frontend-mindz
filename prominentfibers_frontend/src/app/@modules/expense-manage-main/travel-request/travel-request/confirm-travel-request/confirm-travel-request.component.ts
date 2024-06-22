import { Component } from '@angular/core';
import {
  CellValueChangedEvent,
  ICellRendererParams,
} from 'ag-grid-community';

import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
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
import Swal from 'sweetalert2';
import { ActionsConfirmComponent } from './actions/actionsConfirm.component';
@Component({
  selector: 'app-confirm-travel-request',
  templateUrl: './confirm-travel-request.component.html',
  styleUrls: ['./confirm-travel-request.component.scss']
})
export class ConfirmTravelRequestComponent {
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
  travelData1: any = [];
  // fileDetails: any;
  errorMsg: string;
  nonBillable: boolean = false;
  showTickets: boolean = false;
  rowClass: string;
  rowDataNew: any;
  addContact: boolean = false;
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
  expenseIdData: any;
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
  expenseDetailsId: any;
  tiketId: any;
  expenseDetailsData: any;
  ticketData: any;
  status: any;
  now = new Date();
  arr: any;
  expenseId_taskOrder: boolean = false;
  year = this.now.getFullYear();
  month = this.now.getMonth();
  // day = this.now.getDay();
  date = this.now.getDate();
  removeTaskOrderFiled: boolean = false;
  maxDate = moment({ year: this.year + 100, month: this.month, date: this.date }).format('YYYY-MM-DD');
  minDate = moment({ year: this.year - 0, month: this.month, date: this.date }).format('YYYY-MM-DD');
  tiketIdStaus: any;
  pdfFile: any = '../../../../../../assets/icons/pdfimg.png';
  wordFile: any = '../../../../../../assets/icons/word.png';
  confirmBtnEnable: boolean = false;
  oneConfirmSuggest: any;
  confirmTicketSta: any;
  taskLeadId: any;
  leadData: any;
  constructor(private fb: FormBuilder,
    private leadService: LeadService,
    private route: Router,
    private recruitService: RecruitService,
    private activeroute: ActivatedRoute,
    private toast: ToastrService,
    private _itteketService: ItticketingService,
    private configService: ConfigurationalmasterService,
    private _empRegistration: EmpRegistrationService,
    public dialog: MatDialog
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
      select_agent: new FormControl(null)
    })
    this.rowClass = 'rowClass'
  }

  ngOnInit() {
    this.activeroute.queryParams.subscribe(params => {
      this.id = params;
      this.lead_id = this.id?.lead_id;
      this.task_id = this.id?.task_lead_id;
      if (this.lead_id) {
        this.leadService.getByIdLead(this.task_id).subscribe((res: any) => {
          this.singleLeadData = res.data;
          this.patchFormValueNew();
          if (res.data.expense_id) {
            this.expenseId_taskOrder = true
          }

          //     this.taskData=`${this.singleLeadData?.taskOrder_no + "/" + this.singleLeadData?.associated_company + "/" + this.singleLeadData?.address2}`;
          // 
        });

        this.leadForm.patchValue({
          task_order: this.singleLeadData.task_order
        })

      }

      this.leadService.getByIdLead(this.lead_id).subscribe((res: any) => {
        this.dataExpense = res.data;
        this.patchFormValueNew();

      });
      this.patchFormValueDup();
    });
    if (this.lead_id) {
      this.leadService.getByIdTravel(this.lead_id).subscribe((res: any) => {
        this.singleLeadData = res.data;
        console.log(this.singleLeadData, ' this.singleLeadData copy');
        this.taskLeadId=Number(res.data?.taskLeadId)
        //       
        // this.taskData=`${this.singleLeadData.taskOrder_no + "/" + this.singleLeadData.associated_company + "/" + this.singleLeadData.address2}`;
        this.lead();

        this.taskOrderRemove()

        // if(this.singleLeadData.travel_type="Billable"){

        // }
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
          this.busOn = false;
        } else if (res.data.modeOf_travel === "Flight") {
          this.trainOn = false;
          this.flightOn = true;
          this.busOn = false;
        } else if (res.data.modeOf_travel === 'Bus') {
          this.trainOn = false;
          this.flightOn = false;
          this.busOn = true;
        }

        this.patchFormvalue();
      })
    }

    this.getAchievementList();
    this.patchFormvalue();
    this.getCategory();
    this.getStandardProgram();
    // this.getCompanyList()
    // this.getCity();
    this.getConfirmTicketStatus();
    this.getTaskOrder();
    this.getBymultipleTravel();

    this.mainId = localStorage.getItem("EmpMainId");


    this.getExpenseDetail();
    if (this.mainId != undefined) {
      this._empRegistration.getByUserId(this.mainId).subscribe((res) => {
        this.mainEmployeeData = res.data;

        this.getAchievementList();
        // this.patchFormvalue();
      })
    }

    this.leadService.ticketSubject.subscribe((idExpense: any) => {

      this.tiketId = idExpense;


      if (this.tiketId) {
        this.addContact = true;
        this.getByTicketList()

      }
    })
    // this.statusGet();
  }
  patchFormValueNew() {


    // this.leadForm.patchValue({
    //   travel_type: "Billable",
    //   task_order:this.singleLeadData?.taskOrder_no
    // })
  }
  patchFormValueDup() {
    this.leadForm.patchValue({
      travel_type: "Non-Billable"
    })
  }

  lead(){
    this.leadService.getByIdLead(this.taskLeadId).subscribe((res: any) => {
      this.leadData = res.data;
      console.log( this.leadData,' this.leadData');
      
    });
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
  taskOrderRemove() {
    if (this.singleLeadData.task_order === "No Task Order Available") {
      this.removeTaskOrderFiled = true
    }
  }
  // flight
  // suggested
  public columnDefs: any = [
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
      cellEditor: 'agSelectCellEditor',
      editable: true,
      cellEditorParams: {
        values: this.travelData1,
      },
      flex: 1,
      minWidth: 150
    },
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

  // train
  public columnDefstrain: any = [
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
      headerName: 'Flight No.',
      field: 'flight_no',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: "grid-cell-centered",
      flex: 1
    },
    {
      headerName: 'Travel Date ',
      field: 'travel_date',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: "grid-cell-centered",
      flex: 1
    },
    // {
    //   headerName: 'Travel Time',
    //   field: 'travel_time',
    //   sortable: true,
    //   resizable: true,
    //   wrapHeaderText: true,
    //   autoHeaderHeight: true,
    //   cellClass: "grid-cell-centered",
    //   flex:1
    // },
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
    //   headerName: 'Travel Type',
    //   field: 'travel_amount',    
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
    //   cellClass: "grid-cell-centered",
    //   flex:1
    // },

    // {
    //   headerName: 'Travel Amount',
    //   field: 'travel_amount',
    //   sortable: true,
    //   resizable: true,
    //   wrapHeaderText: true,
    //   autoHeaderHeight: true,
    //   cellClass: "grid-cell-centered"   ,
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
      // minWidth:150,
      // cellEditor: 'agSelectCellEditor',
      // editable: true,
      // cellEditorParams: {
      //   values: this.travelData1,
      // }, 

    },
    {
      headerName: 'Action',
      field: 'expense_id',
      flex: 1,
      cellRenderer: ActionsConfirmComponent,
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
      headerName: 'Travel Type',
      field: 'travel_amount',
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
      minWidth: 150,

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
    //   headerName: 'Status',
    //   field: 'travel_status',
    //   sortable: true,
    //   resizable: true,
    //   wrapHeaderText: true,
    //   autoHeaderHeight: true,
    //   cellClass: "grid-cell-centered",
    //   flex:1,
    //   minWidth:150
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
  onCellClicked(e: any) {
    console.log(e, 'eeeeeeeeee');

    const dialogRef = this.dialog.open(ExpenseDialogComponent, { width: '500px', data: { expensechildId: e.data.expensechildId, expense_id: e.data.expense_id } });
    dialogRef.afterClosed().subscribe(result => {

    })
  }
  onCellClickedTick(e: any) {
    console.log(e, 'ee');
    //     if(this.oneConfirmSuggest===true){
    // this.toast.warning("You Have Already Confirmed Ticket");
    // return
    //     }
    const dialogRef
      = this.dialog.open(ExpenseDialogComponent, {
        width: '40%',
        // maxWidth: '100vw',
        // maxHeight: '100vh',
        // height: '100%',
        // panelClass: 'full-screen-modal',
        data: { employId: e.data.employee_id, expenseIdTravel: e.data.expenseId, ticketIdtravel: e.data.ticket_id }

      });

    dialogRef.afterClosed().subscribe(result => {

    });
  }


  // onCellClicked(e:any){
  //   console.log(e,'eeee ticket');

  //   const dialogRef = this.dialog.open(ExpenseDialogComponent,{width:'500px',data:{empId:e.data.employee_id,expenseId:e.data.expenseId,ticket_id:e.data.ticket_id}});
  //     dialogRef.afterClosed().subscribe(result => {

  //     })
  // }


  onCellClickedCopy(e: any) {
    console.log(e, 'eee tikct copy');
    // e.stopPropagation();
    const dialogRef = this.dialog.open(ExpenseDialogComponent, { width: '500px', data: { empId: e.data.employee_id, expenseId: e.data.expenseId, ticket_id: e.data.ticket_id } });
    dialogRef.afterClosed().subscribe(result => {

    })
  }


  dateFormatter(createdAt: any) {
    return moment(createdAt).format('DD/MM/YYYY');
  }
  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;
    console.log(params, 'params this componet');


  }
  addBtn() {
    this.addContact = !this.addContact;
  }
  getExpenseDetail() {
    this.leadService.getTravelTicketCopy(this.mainId, this.lead_id).subscribe((res: any) => {

      this.rowData = res.result;

      // only suggested data
      let suggested: any = []
      for (let i = 0; i < res.result.length; i++) {
        if (res.result[i].travel_status == "Suggested") {
          suggested.push(res.result[i])
        }
        else if (res.result[i].travel_status == "Confirmed") {
          suggested.push(res.result[i])
        }
      }

      console.log(suggested, 'suggested??????????????');

      this.rowDataSuggested = suggested;

      const confirmData: any = [];
      for (let i = 0; i < suggested.length; i++) {
        confirmData.push(suggested[i].travel_status);
        if (suggested[i].travel_status === "Confirmed") {
          this.confirmBtnEnable = true;
        }
      }
      console.log(confirmData, 'confirmData?????????');

      // this.oneConfirmSuggest=confirmData.every("Confirmed")
      // console.log(this.oneConfirmSuggest,'this.oneConfirmSuggest');

      const confirmCount = confirmData.filter((item: any) => item === "Confirmed").length;

      if (confirmCount === 1) {
        console.log(true);
        this.confirmTicketSta = true;
      } else if (confirmCount === 0) {
        this.confirmTicketSta = 'ZeroData'
      }
      else {
        console.log(false);
        this.confirmTicketSta = false;

      }




      this.rowDataTrain = suggested;

    })
  }

  agInit(params: ICellRendererParams): void {

  }


  onCellValueChanged(event: CellValueChangedEvent) {


  }

  reload() {
    setTimeout(() => {
      window.location.reload();
    }, 500); // Activate after 5 minutes.
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
      task_order: this.singleLeadData?.task_order,
      // task_order: this.taskData ,
      travel_ticket: this.singleLeadData?.travel_ticket,
      traveler_name: this.singleLeadData?.traveler_name,
      modeOf_travel: this.singleLeadData?.modeOf_travel,
      travel_form: this.singleLeadData?.travel_form,
      travel_to: this.singleLeadData?.travel_to,
      dateOf_travel: this.singleLeadData?.dateOf_travel,
      remarks: this.singleLeadData?.remarks,
      select_agent: this.singleLeadData?.select_agent
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
    // if(this.singleLeadData?.travel_type==="Billable"){
    //   this.nonBillable=false;
    // }
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
  nonBillableFunc() {
    this.nonBillable = true;
  }
  billableFunc() {
    this.nonBillable = false;
  }
  customerType() {
    this.cutomerType = true;
  }
  yesTickets() {
    this.showTickets = true;
  }
  noTickets() {
    this.showTickets = false;
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
    let val = this.leadForm.value;

    const formData = new FormData();

    const data = {
      // travel_id: val.travel_id,
      travel_type: val.travel_type,
      travel_desc: val.travel_desc,
      travel_approval: val.travel_approval,
      dateOf_travel: moment(val.dateOf_travel).format('YYYY-MM-DD'),
      task_order: val.task_order,
      travel_ticket: val.travel_ticket,
      traveler_name: val.traveler_name,
      // travel_date: moment(val.travel_date).format('YYYY-MM-DD'),
      modeOf_travel: val.modeOf_travel,
      travel_form: val.travel_form,
      travel_to: val.travel_to,
      remarks: val.remarks,
      status: "Submitted"
    }



    this.leadService.createTravelRequest(data, this.fileDetails.file).subscribe((res: any) => {

      // this.route.navigate(["master/lead/lead-management/assign-lead"]),
      this.toast.success("Travel Request Added Successfully..")
      this.route.navigate(
        ['master/expense-main/expense-management/travel-request'],
        { queryParams: { lead_id: this.lead_id } }
      );
    },
      (err: any) => {
        if (err.status === 403) {
          this.toast.warning("Expense Travel Id Already Exist Already Exits!")

        } else if (err.status === 500) {
          this.toast.error("Something Went to Wrong")
        }
      }
    )

  }
  getTaskOrder() {
    this._itteketService.getTaskOrder().subscribe((res: any) => {

      this.taskOrderList = res.result;



      // this.leadForm.patchValue({
      //   task_order:`${res.result.taskOrder_no}` + this.taskOrderList.associated_company
      //   // +this.taskOrderList.associated_company +  this.taskOrderList.address2
      //   // task_order:`${this.taskOrderList.taskOrder_no} + ${this.taskOrderList.associated_company}`
      // })
    })
  }
  reject() {
    const data = {
      status: "Rejected"
    }
    this.leadService.editLead(this.lead_id, data).subscribe((res: any) => {

      this.toast.success(res.message);
      this.route.navigate(['master/expense-main/expense-management/travel-request'],
        { queryParams: { lead_id: this.lead_id } }
      );
    })
  }

  suggestForm() {
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
      status: "Suggested"
    }

   this.leadService.updateTravel(this.lead_id, data).subscribe((res: any) => {

      this.route.navigate(
        ['master/expense-main/expense-management/travel-request'],
        { queryParams: { lead_id: this.lead_id } }
      );
      this.toast.success("Updated Successfully")
    },
      (err: any) => {
        this.toast.error("Somthing Went To Wrong")
      }
    )
  }
  saveFlight() {
    let val = this.leadForm.value;
    const data = {
      flight_no: val.flight_no,
      travel_date: val.travel_date,
      travel_amount: val.travel_amount,
      mode_of_travel: val.mode_of_travel,
      travel_time: val.time,
      employee_id: Number(this.mainId),
      travel_status: "Suggested"
    }
    this.leadService.createTravelTicket(data).subscribe((res: any) => {

      this.cleanInput();
      this.toast.success("Ticket Details Added Successfully..");
      this.getExpenseDetail();
      // this.route.navigate(['master/itticket/expense-management/travel-request/create-request'],
      //   { queryParams: { lead_id: this.lead_id } }
      // );
    })
  }


  confirmForm() {


    if (this.confirmTicketSta == false) {
      this.toast.warning(" Please Only One Ticket COnfirm");
      return;
    } else if (this.confirmTicketSta == "ZeroData") {
      this.toast.warning("Please Confirm The Ticket")
      return
    }


    Swal.fire({
      title: 'Are you sure to Confirm this Travel Reuest ?',
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
          status: "Confirmed"
        }
        this.leadService.updateTravel(this.lead_id, data).subscribe((res: any) => {

          this.toast.success("Confirm Successfully");
          // this.route.navigate(['master/expense-main/expense-managment/travel-request'],{queryParams:{ticketId:this.tiketIdStaus}});
          this.route.navigate(['master/expense-main/travel-request']
            // ,{queryParams:{ticketId:this.tiketIdStaus}}
          );

        })
      };
    });


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
      this.route.navigate(['master/expense-main/expense-management/travel-request']);
    },
      (err: any) => {
        this.toast.error("Something Went To wrong")
      }
    )


    this.leadService.updateBookTicketFile(this.ticketId, formData).subscribe((res: any) => {

      // this.toast.success("Booked Tickets Successfully");
      // this.route.navigate(['master/itticket/expense-management/travel-request']);
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
      this.leadForm.get('mode_of_travel')?.reset(),
      this.leadForm.get('time')?.reset()

    // this.expenceForm.get('attach_bill')?.reset()
  }

  getConfirmTicketStatus() {
    this._itteketService.getTravelConfirmTicket().subscribe((res: any) => {
      this.rowConfirmData = res.result;
    })
  }
  expenceDetails() {
    this._itteketService.getByExpenseDetails(this.tiketId).subscribe((res: any) => {
      this.expenseDetailsData = res.data;

      this.leadForm.patchValue({
        expensefor: this.expenseDetailsData.expensefor,
        billAmount: this.expenseDetailsData.billAmount,
        exp_start_date: this.expenseDetailsData.exp_start_date,
        exp_end_date: this.expenseDetailsData.exp_end_date

      })

    });
  }
  getByTicketList() {
    this.leadService.getByTravelTicket(this.tiketId).subscribe((res: any) => {
      this.ticketData = res.data;

      this.leadForm.patchValue({
        // expensefor:this.expenseDetailsData.expensefor,
        // billAmount:this.expenseDetailsData.billAmount,
        // exp_start_date:this.expenseDetailsData.exp_start_date,
        // exp_end_date:this.expenseDetailsData.exp_end_date
        flight_no: this.ticketData.flight_no,
        travel_date: this.ticketData.travel_date,
        travel_amount: this.ticketData.travel_amount,
        mode_of_travel: this.ticketData.mode_of_travel,
        time: this.ticketData.time
      })
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


    this.leadService.updateTravelTiket(this.tiketId, data).subscribe((res: any) => {

      this.toast.success("Ticket Successfully Updated")

      this.addContact = false;
      let suggesteded: any = []
      //     for(let i=0;i<this.rowData[0]; i++){
      //       if(this.rowData[0].travel_status == "Confirmed"){
      //         suggested.push(this.rowData[0])
      //     }
      // }

      this.leadService.getTravelTicket(this.mainId).subscribe((res: any) => {

        this.rowData = res.result;
        // 



      })

      //  this.getExpenseDetail();
    })

  }
  getBymultipleTravel() {


    this._itteketService.travelMultipleGetBy(this.lead_id).subscribe((res: any) => {
      this.expenseIdData = res.data;

      if (this.expenseIdData?.status === 'Submitted') {
        this.enableSubmit = true;
      }
    })
  }
  cancel() {
    this.route.navigate(['master/expense-main/travel-request/user-access'])
  }
}
