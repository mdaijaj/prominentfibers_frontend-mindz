import { Component } from '@angular/core';
import {
  GridApi,
  GridReadyEvent
} from 'ag-grid-community';
import 'ag-grid-enterprise';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ItticketingService } from 'src/app/@shared/services/itticketing.service'; 
import { ActionsComponent } from '../actions/actions.component';
import { ItticketingDialogComponent } from '../itticketing-dialog/itticketing-dialog.component';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import * as moment from 'moment';
@Component({
  selector: 'app-ticket-list',
  templateUrl: './ticket-list.component.html',
  styleUrls: ['./ticket-list.component.scss']
})
export class TicketListComponent {
  errorMessage: any;
  products: any = [];
  id: any;
  rowClass: any;
  private gridApi!: GridApi<any>;
  rowData: any;
  allstatus: any;
  openstatus:any;
  inprogressstatus:any;
  closestatus:any
  getselection: any;
  todaydate: any;
  itForm: FormGroup;
  singleTicketData: void;
  firstExample:any;
  secondExample:any
  FromDate: any;
  toDate: any;
  constructor(
    private _itTicketingService:ItticketingService,
    private router: Router,
    private fb: FormBuilder, private toast: ToastrService,
   public dialog: MatDialog
    ) {
    this.rowClass = 'rowClass'
  }

  ngOnInit(): void {
    this.getittIcketing()
    this. ticketingallstatus();
    this.ticketingopenstatus();
    this.ticketinginprogressstatus();
    this.ticketingclosestatus()
  }

  public columnDefs = [
    {
      headerName: 'Ticket No.',
      field: 'itTicketing_number',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: "grid-cell-centered",
      flex:1,
      minWidth:150
    },
    {
      headerName: 'Raised By',
      field: 'ticket_raised_by',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: "grid-cell-centered",
      flex:1,
      minWidth:150
    },
    {
      headerName: 'On-Behalf ',
      field: 'others_name',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: "grid-cell-centered",
      flex:1,
      minWidth:150
    },
    // {
    //   headerName: 'Ticket Assign To',
    //   field: 'ticket_assigned_to',
    //   sortable: true,
    //   resizable: true,
    //   wrapHeaderText: true,
    //   autoHeaderHeight: true,
    //   cellClass: "grid-cell-centered",
    //   flex:1,
    //   minWidth:170
    // },
    {
      headerName: 'Category',
      field: 'category',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: "grid-cell-centered",
      flex:1,
      minWidth:150
    },
    {
      headerName: 'Stage',
      field: 'stage',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: "grid-cell-centered",
      flex:1,
      minWidth:150
    },
    {
      headerName: 'Subject',
      field: 'subject',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: "grid-cell-centered",
      flex:1,
      minWidth:150
    },
    {
      headerName: 'Status',
      field: 'status', 
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: "grid-cell-centered",
      flex:1,
      minWidth:150,
      cellStyle: function (params: any) {
        if (params.value.toLowerCase() == 'Open'.toLowerCase()) {
          return { color: 'green' };
        }else if (params.value.toLowerCase() == 'In-Progress'.toLowerCase()) {
          return { color: 'blue' };
        }else if (params.value.toLowerCase() == 'Close'.toLowerCase()) {
          return { color: 'red' };
        } else {
          return { color: 'blue' };
        }
      },
    },
    {
      headerName: 'Action',
      field: 'employee_id',
      flex:1,
      minWidth:150,
     cellRenderer: ActionsComponent,
      cellRendererParams: {
        className: 'mat-blue',
        hideRequestButton: true,
        hideDetailsButton: false,
        hideDownloadIcon: false,
        showCustomIcon: false, // Hide attachment icon
      },
    }
  ];

  public StartdateSelect(event: any) {
    
    this.FromDate= moment(event.value).format('YYYY/MM/DD');
    
  }

  public EnddateSelect(event: any) {
    
    this.toDate= moment(event.value).format('YYYY/MM/DD');
    
  }
  searchticket()  {
    const data = {
        fromDate:this.FromDate,
        endDate:this.toDate,
    }
  
    this._itTicketingService.itTicketingcalendardate_select(data)
    .subscribe((res: any) => {
      
      this.rowData=res.data;
    },
    )
  }


  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;
    

  }
  onFilterTextBoxChanged() {
    this.gridApi.setQuickFilter(
      (document.getElementById('filter-text-box') as HTMLInputElement).value
    );
  }
  onPageSizeChanged() {
    var value = (document.getElementById('page-size') as HTMLInputElement)
      .value;
    this.gridApi.paginationSetPageSize(Number(value));
  }
  getittIcketing(){
    this._itTicketingService.getittIcketing().subscribe((res:any)=>{
      this.rowData=res.data;
      
    })
  }
  ticketingallstatus(){
  this._itTicketingService.ticketingallstatus().subscribe((res:any)=>{
    this.allstatus=res.data;
    
  })
  }
  ticketingopenstatus(){
    this._itTicketingService.ticketingopenstatus().subscribe((res:any)=>{
      this.openstatus=res.data;
      
    })
    }
  ticketinginprogressstatus(){
    this._itTicketingService.ticketinginprogressstatus().subscribe((res:any)=>{
      this.inprogressstatus=res.data;
      
    })
  }
  ticketingclosestatus(){
    this._itTicketingService.ticketingclosestatus().subscribe((res:any)=>{
      this.closestatus=res.data;
      
      
    })
  }
  todayselect(){
    this._itTicketingService.itTicketingtodayselect().subscribe((res:any)=>{
      this.rowData=res.data;
    })
  }
  thisweakselect(){
    this._itTicketingService.itTicketingweakselect().subscribe((res:any)=>{
      this.rowData=res.data;
    })
  }
  thismonthselect(){
    this._itTicketingService.itTicketingmonthselect().subscribe((res:any)=>{
      this.rowData=res.data;
    })
  }

    onCellClicked(e:any){
      
      const dialogRef = this.dialog.open(ItticketingDialogComponent,
        {
          width:'400px',
        data:{
          itTicketing_number:e.data.itTicketing_number}
      }
      );
        dialogRef.afterClosed().subscribe(result => {
          
        })
    }
}
