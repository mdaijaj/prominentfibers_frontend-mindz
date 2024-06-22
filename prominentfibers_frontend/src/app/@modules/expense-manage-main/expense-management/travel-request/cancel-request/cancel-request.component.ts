import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { calendarFormat } from 'moment';
import { ToastrService } from 'ngx-toastr';
import { EmpRegistrationService } from 'src/app/@shared/services/emp-registration.service';
import { LeadService } from 'src/app/@shared/services/lead.service';
import { CellValueChangedEvent, GridApi, GridReadyEvent } from 'ag-grid-community';
import { RecruitService } from 'src/app/@shared/services/recruitment.service';
import { ConfigurationalmasterService } from '../../../../../@shared/services/configurationalmaster.service'
import { ActionsComponent } from '../actions/actions.component';
import { ItticketingService } from 'src/app/@shared/services/itticketing.service';
import { el } from '@fullcalendar/core/internal-common';
import { concat } from 'rxjs';
@Component({
  selector: 'app-cancel-request',
  templateUrl: './cancel-request.component.html',
  styleUrls: ['./cancel-request.component.scss']
})
export class CancelRequestComponent {
  leadForm: FormGroup;
  jobType: any;
  candidateArray: any;
  interviewGetId:any;
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
  // rowData: any;
  rowDataBookTiket:any;
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
  statusTravel: boolean=false;
  rowDataTwo: any;
  trainOn:boolean=false;
  flightOn:boolean=false;
  busOn:boolean=false;
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
  confirmData: any;
  tiketId: any;
  rowDataConfirm: any;
  tiketIdd:any;
  expenseIdData: any;
  pdfFile: any = '../../../../../../assets/icons/pdfimg.png';
  wordFile: any = '../../../../../../assets/icons/word.png';
  cancelReuest:boolean=false;
  cancelReuestBook:boolean=false;
  cancelReuestAproved:boolean=false;
  mangeNum:boolean=false;
  managementFee: any;
  totleInvoice: any;
  totleFee: any;
  confirmIdData: any;
  ticketData: any;
  totleamount: any;
  cgstAmount: number;
  sgstAmount: number;
  confirmIconData: any;
  tiketIdStaus: any;
  travelData1: any =[];
  arr: { status: string; }[];
  cancelRequestData:boolean=false;
  rowCancelData:any;
  removeTaskOrderFiled:boolean=false;
  empId: any;
  totleInvoiceCopy: any;
  empIdd: any;
  constructor(private fb: FormBuilder, 
    private leadService: LeadService, 
    private route: Router, 
    private recruitService: RecruitService, 
    private activeroute: ActivatedRoute,
    private toast: ToastrService,
    private _itteketService: ItticketingService,
    private configService: ConfigurationalmasterService,
    private _empRegistration: EmpRegistrationService,
   
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
          remarks_confirm:new FormControl(null),
          time:new FormControl(null),
          dateOf_travel:new FormControl(null),
          flight_name:new FormControl(null),
          departure:new FormControl(null),
          arrival:new FormControl(null),
          time_travel:new FormControl(null)
      })
      this.rowClass = 'rowClass'
  }

  ngOnInit() {
    this.tiketIdd=localStorage.getItem('tiketIdStaus')
      
    this.activeroute.queryParams.subscribe(params => {
      this.id = params;
      this.lead_id = this.id?.lead_id;
      this.task_id = this.id?.task_lead_id;
      
      
      
      
      
      if (this.task_id) {
        this.leadService.getByIdLead(this.task_id).subscribe((res:any) => {
          this.singleLeadData = res.data;
          this.patchFormValueNew();
          
          this.taskData=`${this.singleLeadData?.taskOrder_no + "/" + this.singleLeadData?.associated_company + "/" + this.singleLeadData?.address2}`;
      
        });
      }
      
      
      // if (this.lead_id && this.task_id === undefined) {
      //   this.nonBillable = true;
      //   
      //   this.patchFormValueDup();
      // } else {
      //   this.nonBillable = false;
      //   this.patchFormValueDup();

      // }
      this.leadService.getByIdLead( this.lead_id).subscribe((res:any) => {
        this.dataExpense = res.data;
        this.patchFormValueNew();
        
      });
      this.patchFormValueDup();
    });
    if (this.lead_id) {
        this.leadService.getByIdTravel(this.lead_id).subscribe((res:any) => {
        this.singleLeadData = res.data;
  //       
  // this.taskData=`${this.singleLeadData.taskOrder_no + "/" + this.singleLeadData.associated_company + "/" + this.singleLeadData.address2}`;
         
        
  this.taskOrderRemove();
        this.statusTravel=res.data.status;
        
       
        if(res.data?.status==="Booked Tickets"){
          this.cancelReuestBook=true;
          }
            
       if(res.data?.status==="Cancel Request"){
          this.cancelReuest=true;
          }
          if(res.data?.status==="Cancel Request Approved"){
            this.cancelReuestAproved=true;
            }

    if (this.singleLeadData?.travel_ticket === "Yes") {
          this.showTickets = true;
        } else {
          this.showTickets = false;
        }
  
        if(res.data.status==='Suggested' || res.data.status==='Confirmed'){
           this.statusTravel=true
        }else{
           this.statusTravel=false;
        }

if(res.data.status==='Cancel Request'){
this.cancelRequestData=true;
}

        if(res.data.modeOf_travel==='Train'){
            this.trainOn=true;
            this.flightOn=false;
            this.busOn=false;
        }else if(res.data.modeOf_travel==="Flight"){
          this.trainOn=false;
          this.flightOn=true;
          this.busOn=false;
        }else if(res.data.modeOf_travel==='Bus'){
          this.trainOn=false;
          this.flightOn=false;
          this.busOn=true;
        }
        this.patchFormvalue();
      })
    }

    this.getAchievementList();
    this.patchFormvalue();
    this.getCategory();
    this.getStandardProgram();
    this.getCompanyList()
    // this.getCity();
    this.getConfirmTicketStatus();
    this.getTaskOrder();
this.getBymultipleTravel();
    this.mainId = localStorage.getItem("EmpMainId");
      
      
    // this.getExpenseDetail();
      if (this.mainId != undefined) {
        this._empRegistration.getByUserId(this.mainId).subscribe((res) => {
          this.mainEmployeeData = res.data;
          
          this.getAchievementList();
          // this.patchFormvalue();
        })
      }
    this.getByTicketConfirm();
      this.getByCancelRequestData();
  }
  taskOrderRemove(){
    if(this.singleLeadData.task_order==="No Task Order Available"){
      this.removeTaskOrderFiled=true
    }
  }
  patchFormValueNew() {
    
    
    this.leadForm.patchValue({
      travel_type: "Billable",
      // task_order:this.singleLeadData?.taskOrder_no
    })
  }
  patchFormValueDup() {
    this.leadForm.patchValue({
      travel_type: "Non-Billable"
    })
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
    
    
    let file2=this.fileDetails2.file.name.split('.');
    
    let fileExe=file2[file2.length - 1].toUpperCase();
    
    if (fileExe === "PDF") {
      // this.CF_1.tableRows.controls[i].imagePath = this.pdfFile;
      this.pdfFile=fileExe;
    }
  }
  
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
      flex:1,
      minWidth:150
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
      headerName: 'Train No.',
      field: 'flight_no',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: "grid-cell-centered"
    },
    {
      headerName: 'Available on Travel Date ',
      field: 'travel_date',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: "grid-cell-centered"
    },
    {
      headerName: 'Available on Travel Time',
      field: 'travel_time',
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
      flex:1,
      minWidth:150
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
// bus
  // public columnDefsBus = [
  //   {
  //     headerName: 'S.No',
  //     field: 'ticket_id',
  //     sortable: true,
  //     resizable: true,
  //     wrapHeaderText: true,
  //     autoHeaderHeight: true,
  //     cellClass: "grid-cell-centered"
  //   },
  //   {
  //     headerName: 'Bus No.',
  //     field: 'flight_no',
  //     sortable: true,
  //     resizable: true,
  //     wrapHeaderText: true,
  //     autoHeaderHeight: true,
  //     cellClass: "grid-cell-centered"
  //   },
  //   {
  //     headerName: 'Available on Travel Date and Time',
  //     field: 'travel_date',
  //     sortable: true,
  //     resizable: true,
  //     wrapHeaderText: true,
  //     autoHeaderHeight: true,
  //     cellClass: "grid-cell-centered"
  //   },
  //   {
  //     headerName: 'Travel Amount',
  //     field: 'travel_amount',    
  //     sortable: true,
  //     resizable: true,
  //     wrapHeaderText: true,
  //     autoHeaderHeight: true,
  //     cellClass: "grid-cell-centered"
  //   },
  //   {
  //     headerName: 'Mode of Travel',
  //     field: 'mode_of_travel',
  //     sortable: true,
  //     resizable: true,
  //     wrapHeaderText: true,
  //     autoHeaderHeight: true,
  //     cellClass: "grid-cell-centered"
  //   },
  //   {
  //     headerName: 'Status',
  //     field: 'travel_status',
  //     sortable: true,
  //     resizable: true,
  //     wrapHeaderText: true,
  //     autoHeaderHeight: true,
  //     cellClass: "grid-cell-centered",
  //     flex:1,
  //     minWidth:150
  //   },
  //   {
  //     headerName: 'Action',
  //     field: 'expense_id',
  //     cellRenderer: ActionsComponent,
  //     cellRendererParams: {
  //       className: 'mat-blue',
  //       hideRequestButton: true,
  //       hideDetailsButton: false,
  //       hideDownloadIcon: false,
  //       showCustomIcon: false, // Hide attachment icon
  //     },
  //     cellClass: "grid-cell-centered"
  //   }
    

  // ];
 
  onCellClicked(e:any){
    
    // const dialogRef = this.dialog.open(AppListDialogComponent,{width:'500px',data:{verifyId:e.data.candidtaes_v_Id}});
    //   dialogRef.afterClosed().subscribe(result => {
    //     
    //   })
  }
  public columnDefsConfirm:any = [
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
      headerName: 'Ticket Type',
      field: 'ticketTypeDetails',    
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
      flex:1,
      minWidth:150,
      cellEditor: 'agSelectCellEditor',
      editable: true,
      cellEditorParams: {
        values: this.travelData1,
     
    },
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
  // cancel Coldef

  public columnDefsConfirmCancel:any = [
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
      headerName: 'Ticket Type',
      field: 'ticketTypeDetails',    
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
      flex:1,
      minWidth:150,
      cellEditor: 'agSelectCellEditor',
      editable: true,
      cellEditorParams: {
        values: this.travelData1,
     
    },
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
  public columnTravelList = [
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
      headerName: 'Traveler Name',
      field: 'traveler_name',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: "grid-cell-centered"
    },
    {
      headerName: 'Date Of Travel',
      field: 'dateOf_travel',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: "grid-cell-centered"
    },{
      headerName: 'Mode of Travel',
      field: 'modeOf_travel',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: "grid-cell-centered"
    },{
      
      headerName: 'Travel From',
      field: 'travel_form',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: "grid-cell-centered"
    },
    {
      headerName: 'Travel to',
      field: 'travel_to',    
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: "grid-cell-centered"
    },
    {
      headerName: 'Ticket Type',
      field: 'ticketType',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: "grid-cell-centered"
    },
    {
      headerName: 'Time',
      field: 'time_travel',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: "grid-cell-centered"
    },
    {
      headerName: 'Remarks',
      field: 'remarks',    
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: "grid-cell-centered"
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
  // onCellClicked(e:any){
  //   
    // const dialogRef = this.dialog.open(AppListDialogComponent,{width:'500px',data:{verifyId:e.data.candidtaes_v_Id}});
    //   dialogRef.afterClosed().subscribe(result => {
    //     
    //   })
  // }
//   getExpenseDetail(){
//     this.leadService.getTravelTicket(this.mainId).subscribe((res:any) => {
//       
//       // this.rowData = res.result;
//       let newData: any = []
//       for (var i = 0; i < res.result.length; i++) {
//         
//         if (res.result[i].travel_status == "Confirmed") {
//           newData.push(res.result[i])
//         }
//         else if (res.result[i].travel_status != "Confirmed") {
//           newData.push(res.result[i])
//         }
//       }
//       
      
//       this.rowData = newData;
//       this.rowDataTrain=newData;
//       this.rowDataBus=newData;
//       
//       
//       

//       // only suggested data
//       let suggested:any=[]
//       for(let i=0;i<res.result.length; i++){
//         if(res.result[i].travel_status == "Suggested"){
//           suggested.push(res.result[i])
//       }
// }
//       
//       this.rowDataSuggested=suggested;

//       // only confirm status
//       let bookData: any = []

//       for(let i=0;i<res.result.length; i++){
//               if(res.result[i].travel_status == "Confirmed"){
//                bookData.push(res.result[i])
//             }
//       }
//       
//       this.rowDataBookTiket = bookData;
//       
//       this.ticketId=this.rowDataBookTiket[0]?.ticket_id;
//       
      
//       
//        // this.rowData = res.result;

//     })  
//   }

   
  
  dateFormatter(createdAt: any) {
    return moment(createdAt).format('DD/MM/YYYY');
  }
  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;
    

  }
  addBtn() {
    this.addContact = !this.addContact;
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
  onCellValueChanged(event: CellValueChangedEvent) {
    // let data={
    //   travel_status:this.status,
    //   attach_ticket:null,
    //   attach_invoice:null
    // }
    
    let data={
      travel_status:event.data.travel_status
    }
    this.tiketIdStaus=event.data.ticket_id;
    
    this.leadService.ticketIdConfirm(this.tiketIdStaus);
localStorage.setItem('tiketIdStaus',this.tiketIdStaus)
    this._itteketService.updateCancelReuest(this.tiketIdStaus,data).subscribe((res:any)=>{
      
      // this.rowDataConfirm=res.result;
      // this.confirmForm();
      this.toast.success("Ticket Cancel Successfully");

    })
  }
  // getCity() {
  //   this.configService.getCity().subscribe((res: any) => {
  //     this.rowData = res.data;
  //     

  //   })
  // }

  fetchSeries(value: String) {
    if (value === '') {
      return this.searchResult = []
    }
    this.searchResult = this.allAchievement.filter(function (series:any) {
      
      return series.first_name.toLowerCase().startsWith(value)
    })
    
  }
  
  candidateClick(e:any){
    
    this.candidateId = e;
    this.recruitService.interViewGetIdBy(e).subscribe((res:any)=>{
      this.interviewGetId=res.data;
      
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
      task_order: this.singleLeadData?.task_order ,
      // task_order: this.taskData ,
      travel_ticket: this.singleLeadData?.travel_ticket,
      traveler_name: this.singleLeadData?.traveler_name,
       modeOf_travel: this.singleLeadData?.modeOf_travel,
      travel_form: this.singleLeadData?.travel_form,
      travel_to: this.singleLeadData?.travel_to,
      dateOf_travel:this.singleLeadData?.dateOf_travel,
      remarks: this.singleLeadData?.remarks,
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
    const vel=this.leadForm.value;
    
    
    if(this.singleLeadData?.travel_type==='Non-Billable'){
       this.nonBillable=true;
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
    
    
    
    this.leadService.createTravelRequest(data,this.fileDetails.file).subscribe((res:any) => {
      
      // this.route.navigate(["master/lead/lead-management/assign-lead"]),
      this.toast.success("Travel Request Added Successfully..")
      this.route.navigate(
        ['master/expense-main/expense-managment/travel-request'],
        { queryParams: { lead_id: this.lead_id } }
      );
    },
    (err:any)=>{
      if(err.status===403){
          this.toast.warning("Expense Travel Id Already Exist Already Exits!")
         
           }else if(err.status===500){
                 this.toast.error("Something Went to Wrong")
      }
    }
    )
    
  }
  getTaskOrder() {
    this._itteketService.getTaskOrder().subscribe((res:any) => {
      
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
    this.leadService.editLead(this.lead_id, data).subscribe((res:any) => {
      
      this.toast.success(res.message);
      this.route.navigate(['master/expense-main/expense-managment/travel-request'],
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
//     travel_id:dqsss11
// travel_type:non-Biliable
// travel_desc:rahul kumar
// travel_approval:new user
// expense_approval: false
// task_order:1
// travel_ticket: false
// traveler_name:rahul khan
// dateOf_travel:02-03-2023
// modeOf_travel:test
// travel_form:dqs
// travel_to:dafd
// remarks:fdgdfg
// status:Booked_Ticket

    
    
    
    this.leadService.updateTravel(this.lead_id, data).subscribe((res:any) => {
      
      this.route.navigate(
        ['master/expense-main/expense-management/travel-request'],
        { queryParams: { lead_id: this.lead_id } }
      );
      this.toast.success("Updated Successfully")
    },
    (err:any)=>{
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
      travel_time:val.time,
      employee_id: Number( this.mainId),
      travel_status:"Suggested"
    }
    this.leadService.createTravelTicket(data).subscribe((res:any) => {
      
      this.cleanInput();
      this.toast.success("Ticket Details Added Successfully..");
    // this.getExpenseDetail();
    this.route.navigate(['master/expense-main/expense-managment/travel-request/create-request'],
        { queryParams: { lead_id: this.lead_id } }
      );
    })
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
      status: "Confirmed"
    }
    this.leadService.updateTravel(this.lead_id, data).subscribe((res:any) => {
      
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

    formData.append("attach_ticket",this.fileDetails2.file);
    formData.append("attach_invoice",this.fileInvoice.file);
    formData.append("attach_remarks",val.attach_remarks)
    
    
    

    
    this.leadService.updateTravel(this.lead_id, data).subscribe((res:any) => {
      
      this.toast.success("Booked Tickets Successfully");
      this.route.navigate(['master/expense-main/expense-managment/travel-request']);
    },
    (err:any)=>{
      this.toast.error("Something Went To wrong")
    }
    )
    
    
    this.leadService.updateBookTicketFile(this.ticketId, formData).subscribe((res:any) => {
      
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
    this.leadService.updateTravel(this.lead_id, data).subscribe((res:any) => {
      
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
    this.leadService.updateTravel(this.lead_id, data).subscribe((res:any) => {
      
    })
  }
  cleanInput(){
    this.leadForm.get('flight_no')?.reset(),
    this.leadForm.get('travel_date')?.reset(),
    this.leadForm.get('travel_amount')?.reset(),
    this.leadForm.get('mode_of_travel')?.reset(),
    this.leadForm.get('time')?.reset()

    // this.expenceForm.get('attach_bill')?.reset()
  }

  getConfirmTicketStatus(){
    this._itteketService.getTravelConfirmTicket().subscribe((res:any)=>{
      this.rowConfirmData=res.result;
    })
  }
  getByTicketConfirm(){

    // if(this.singleLeadData?.status==="Cancel Request Approved"){
      
    // }
    this.empId=localStorage.getItem('EmpMainId')
    

    this.leadService.getTravelTicketConfirmcopy(this.empId,this.lead_id).subscribe((res:any)=>{
      this.rowDataConfirm=res.result;
      
      console.log(this.rowDataConfirm,'this.rowDataConfirm');
      
  
      // this.leadService.getByTravelTicketConfirm().subscribe((res:any)=>{
      //   this.rowDataConfirm=res.data;
         
        this.arr = [
          { status:'Confirmed'},
           { status:'Cancel'}
         ]
         this.arr.forEach((element: any) => {
          this.travelData1.push(element.status);
        });
  
        this.columnDefsConfirm[6].cellEditorParams.values = this.travelData1;
// if(this.singleLeadData?.status==="Cancel Request Approved"){
//   let newData: any = []
//   for (var i = 0; i < res.data.length; i++) {
//     
//     if (res.data[i].status == "Cancel") {
//       newData.push(res.data[i])
//     }
//     // else if (res.result[i].status != "Confirmed") {
//     //   newData.push(res.result[i])
//     // }
//   }
// this.rowDataConfirm=newData
// }
        
      })
     }

     getBymultipleTravel(){
      
      
      this._itteketService.travelMultipleGetBy(this.lead_id).subscribe((res:any)=>{
      this.expenseIdData=res.data;
      
      if (this.expenseIdData?.status === 'Submitted') {
        this.enableSubmit = true;
      }
      })
    }
    cancel(){
      this.route.navigate(['master/expense-main/expense-managment/travel-request'])
    }
    cancelTicket(){
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
        time_travel:val.time_travel,
        status: "Cancel Request"
      }
  
      
      
      
      this.leadService.updateTravel(this.lead_id, data).subscribe((res:any) => {
        
        // this.route.navigate(
        //   ['master/expense-main/expense-managment/travel-request'],
        //   { queryParams: { lead_id: this.lead_id } }
        // );
        this.route.navigate(
          ['master/expense-main/expense-managment/manger-access'],
          { queryParams: { lead_id: this.lead_id } }
        );
        this.toast.success("Updated Successfully")
      },
      (err:any)=>{
        this.toast.error("Somthing Went To Wrong")
      }
      )
    }
    cancelTicketApprove(){
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
        time_travel:val.time_travel,
        status: "Cancel Request Approved"
      }
  
      
      
      
      this.leadService.updateTravel(this.lead_id, data).subscribe((res:any) => {
        
        // this.route.navigate(
        //   ['master/expense-main/expense-managment/travel-request'],
        //   { queryParams: { lead_id: this.lead_id } }
        // );
        this.route.navigate(
          ['master/expense-main/expense-managment/agent-access'],
          { queryParams: { lead_id: this.lead_id } }
        );
        this.toast.success("Updated Successfully")
      },
      (err:any)=>{
        this.toast.error("Somthing Went To Wrong")
      }
      )
    }

    cancelTicketReject(){
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
        time_travel:val.time_travel,
        status: "Booked Tickets"
      }
  
      
      
      
      this.leadService.updateTravel(this.lead_id, data).subscribe((res:any) => {
        
        this.route.navigate(
          ['master/expense-main/expense-managment/travel-request'],
          { queryParams: { lead_id: this.lead_id } }
        );
        this.toast.success("Updated Successfully")
      },
      (err:any)=>{
        this.toast.error("Somthing Went To Wrong")
      }
      )
    }
    cancelTicketConfirm(){
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
        time_travel:val.time_travel,
        status: "Confirm Cancel Ticket"
      }
  
      
      
      
      this.leadService.updateTravel(this.lead_id, data).subscribe((res:any) => {
        
        this.route.navigate(
          ['master/expense-main/expense-managment/travel-request'],
          { queryParams: { lead_id: this.lead_id } }
        );
        this.route.navigate(
          ['master/expense-main/expense-managment/user-access'],
          { queryParams: { lead_id: this.lead_id } }
        );
        this.toast.success("Updated Successfully")
      },
      (err:any)=>{
        this.toast.error("Somthing Went To Wrong")
      }
      )
    }
    getByConfirmDialog(){
      
      
      this.leadService.getByExpenseTicketBy(this.confirmIconData).subscribe((res:any)=>{
        
        
        this.confirmIdData=res.data;
        
        this.totleamount=res.data[0].travel_amount;
        
        this.cgstAmount=this.totleamount * 9/100;
        
        this.sgstAmount=this.totleamount * 9/100;
        
        this.totleInvoice=this.totleamount+ this.cgstAmount+this.sgstAmount;
        
        
      })
    }
   

    getByCancelRequestData(){
      this.empIdd=localStorage.getItem('EmpMainId')
      
      this._itteketService.getAllCancelTicket(this.empIdd,this.lead_id).subscribe((res:any)=>{
      
      this.rowCancelData=res.result;
      console.log(this.rowCancelData,'this.rowCancelData');
      
      // this.confirmIdData=res.data;
      
      this.totleamount=res.result[0]?.travel_amount;
      
      // this.cgstAmount=this.totleamount * 9/100;
      
      // this.sgstAmount=this.totleamount * 9/100;
      
      this.totleInvoice=this.totleamount- this.cgstAmount-this.sgstAmount;
      
      })
    }
    onSearchChange(e:any){
      this.mangeNum=true;
    
    let am=e.target.value;
    this.managementFee=Number(am);
    
    
    
    
    this.cgstAmount=this.managementFee* 9/100;
this.sgstAmount=this.managementFee* 9/100;



this.totleInvoiceCopy=this.cgstAmount+this.sgstAmount+this.totleamount;
this.totleFee=this.totleInvoiceCopy - this.managementFee;
    
    // var am=document.getElementsByName("mangement_fee")[e.target.value];
    // 
    
    
    }
}
