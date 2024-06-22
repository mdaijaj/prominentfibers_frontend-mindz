

import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { GridApi, GridReadyEvent } from 'ag-grid-community';
import * as moment from 'moment';
import { AppListDialogComponent } from 'src/app/@shared/app-list-dialog/app-list-dialog.component';
import { EmpMasterService } from 'src/app/@shared/services/emp-master.service';
import { EmpRegistrationService } from 'src/app/@shared/services/emp-registration.service';
import { HeadService } from 'src/app/@shared/services/head.service';
import { LeadService } from 'src/app/@shared/services/lead.service';
import { RecruitService } from 'src/app/@shared/services/recruitment.service';
import { ActionsComponent } from '../../travel-request/actions/actions.component';
import { ItticketingService } from 'src/app/@shared/services/itticketing.service';
// import { ActionsComponent } from '../actions/actions.component';

@Component({
  selector: 'app-agent-list',
  templateUrl: './agent-list.component.html',
  styleUrls: ['./agent-list.component.scss']
})
export class AgentListComponent {

  private gridApi!: GridApi<any>;
  rowData:any;
  rowData2:any;
  rowData1:any;
  personalIdData:any;
  propertyManager:any
  text:any;
  firstLastName:any;
  rowClass: any;
  clicked: boolean = false;
  id: any;
  lead_id: any;
  empId: string | null;
  constructor(private emp_master:EmpMasterService, private activeroute: ActivatedRoute,
    private empService : EmpRegistrationService, public route: Router,
    private recruitService: RecruitService,private head:HeadService,
    private leadService: LeadService, private _itTecting:ItticketingService,
    public dialog: MatDialog) {
      this.rowClass = 'rowClass'
     }



  ngOnInit(): void {

   
   this.head.clicked.subscribe(data=>{
    this.clicked = data;
  })
  this.activeroute.queryParams.subscribe(params => {
    this.id = params;
    
    this.lead_id = this.id.lead_id;
  });
this.empId=localStorage.getItem('EmpMainId');

  this._itTecting.getAllAgentList(this.empId).subscribe((res:any) => {
    
    // let travelName:any=[]
    
    // for(let a=0;a<res.result.length;a++){
    //   res.result[a].traversName = [];
    //   for(let b=0;b<res.result[a].expensechildren.length;b++){
    //     let index = res.result[a].traversName.findIndex((e:any)=>e === res.result[a].expensechildren[b].traveler_name)
    //    res.result ;
    //    if(index != -1){
    //       res.result[a].traversName.push(res.result[a].expensechildren[b].traveler_name)
    //    }
    //   }

    // }
  // 


    let arr = res.result;
    let filterData:any = [];
for(let i=0; i<arr.length; i++){
  filterData.push(arr[i])
  let index = filterData.findIndex((e:any)=>e.expense_id === arr[i].expense_id);

  if(index === -1){
  filterData.push(arr[i])
  }else{
    filterData[index].travlerName = [];
    filterData[index].dataofTravel = [];
    filterData[index].travelForm = [];
    filterData[index].travelTo = [];
    filterData[index].time_travel = [];
    filterData[index].modeOf_travel = [];


    filterData[index].expensechildren.map((e:any)=>{
      filterData[index].travlerName.push(e.traveler_name),
      filterData[index].dataofTravel.push(e.dateOf_travel),
      filterData[index].travelForm.push(e.travel_form),
      filterData[index].travelTo.push(e.travel_to),
      filterData[index].time_travel.push(e.time_travel),
      filterData[index].modeOf_travel.push(e.modeOf_travel)



    })


    filterData[index].travlerName = String(filterData[index].travlerName),
    filterData[index].dataofTravel = String(filterData[index].dataofTravel),
    filterData[index].travelForm = String(filterData[index].travelForm),
    filterData[index].travelTo = String(filterData[index].travelTo),
    filterData[index].time_travel = String(filterData[index].time_travel),
    filterData[index].modeOf_travel = String(filterData[index].modeOf_travel),



    delete filterData[index].expensechildren
  }
}

this.rowData=filterData
  })  

//  let arr = [ {
//     expense_id: 3,
//     travel_id: 102,
//     travel_type: "Billable",
//     travel_desc: "aa",
//     travel_approval: "Yes",
//     expense_approval: "https://dqsapi.elitetraveltech.in/",
//     expensechildren: [
//         {
//             dateOf_travel: "2023-05-16",
//             traveler_name: "Hariom",
//             modeOf_travel: "Train",
//         },
//         {
//             dateOf_travel: "2023-05-17",
//             traveler_name: "Ramayan",
//             modeOf_travel: "Train",
//         }
//     ]
// },
// {
//   expense_id: 4,
//   travel_id: 102,
//   travel_type: "Billable",
//   travel_desc: "aa",
//   travel_approval: "Yes",
//   expense_approval: "https://dqsapi.elitetraveltech.in/",
//   expensechildren: [
//       {
//           dateOf_travel: "2023-05-16",
//           traveler_name: "Hartttiom",
//           modeOf_travel: "Train",
//       },
//       {
//           dateOf_travel: "2023-05-17",
//           traveler_name: "Ramarrrryan",
//           modeOf_travel: "Train",
//       }
//   ]
// },
// ]
    

  }

  openCreate() {
    this.route.navigate(
      ['master/expense-main/expense-managment/travel-request/task-order-travel'],
      { queryParams: { expense_create: "travel-create" } }
    );
  }

  public columnDefs = [
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
      headerName: 'Travel ID',
      field: 'travel_id',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: "grid-cell-centered"
    },
    {
      headerName: 'Task Order',
      field: 'task_order',
      cellRenderer: (params: any) => params.value === 'undefined' ? " " : params.value,
      
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: "grid-cell-centered"
    },
    // {
    //   headerName: 'Travel Description',
    //   field: 'travel_desc',
    //   sortable: true,
    //   resizable: true,
    //   wrapHeaderText: true,
    //   autoHeaderHeight: true,
    //   cellClass: "grid-cell-centered"
    // },
    // {
    //   headerName: 'Travel Approval',
    //   field: 'travel_approval',    
    //   sortable: true,
    //   resizable: true,
    //   wrapHeaderText: true,
    //   autoHeaderHeight: true,
    //   cellClass: "grid-cell-centered"
    // },
    // {
    //   headerName: 'Expense Approval',
    //   field: 'expense_approval',
    //   sortable: true,
    //   resizable: true,
    //   wrapHeaderText: true,
    //   autoHeaderHeight: true,
    //   cellClass: "grid-cell-centered"
    // },
    // {
    //   headerName: 'Task Order',
    //   field: 'task_order',
    //   sortable: true,
    //   resizable: true,
    //   wrapHeaderText: true,
    //   autoHeaderHeight: true,
    //   cellClass: "grid-cell-centered"
    // },
    // {
    //   headerName: 'Travel Ticket',
    //   field: 'travel_ticket',
    //   sortable: true,
    //   resizable: true,
    //   wrapHeaderText: true,    
    //   autoHeaderHeight: true,
    //   cellClass: "grid-cell-centered"
    // },
    {
      headerName: 'Traveler Name',
      field: 'travlerName',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: "grid-cell-centered"
    },
    {
      headerName: 'Booking Date/Travel Date',
      field: 'dataofTravel',
      // valueFormatter: this.dateFormatter,
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
    },
    {
      headerName: 'Travel Type',
      field: 'travel_type',
      
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
    },
    {
      headerName: 'Mode Of Travel',
      field: 'modeOf_travel',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: "grid-cell-centered"
    },
    {
      headerName: 'Travel From',
      field: 'travelForm',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: "grid-cell-centered"
    },
    {
      headerName: 'Travel To',
      field: 'travelTo',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: "grid-cell-centered"
    },
    {
      headerName: 'Suggested Time',
      field: 'time_travel',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: "grid-cell-centered"
    },
    // {
    //   headerName: 'Remarks',
    //   field: 'remarks',
    //   sortable: true,
    //   resizable: true,
    //   wrapHeaderText: true,
    //   autoHeaderHeight: true,
    //   cellClass: "grid-cell-centered"
    // },
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
        if (params.value.toLowerCase() == 'Suggested'.toLowerCase()) {
          return { color: 'orange' };
        }else if (params.value.toLowerCase() == 'Confirmed'.toLowerCase()) {
          return { color: 'blue' };
        }else if (params.value.toLowerCase() == 'Booked Tickets'.toLowerCase()) {
          return { color: 'green' };
        }
        else if (params.value.toLowerCase() == 'Cancel Request'.toLowerCase()) {
          return { color: 'red' };
        }
        else if (params.value.toLowerCase() == 'Submitted'.toLowerCase()) {
          return { color: '#7B3F00' };
        }
        // else {
        //   return { color: 'blue' };
        // }
      },
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

  dateFormatter(createdAt: any) {
    return moment(createdAt).format('DD/MM/YYYY');
  }
  
  onPageSizeChanged() {
    var value = (document.getElementById('page-size') as HTMLInputElement)
      .value;
    this.gridApi.paginationSetPageSize(Number(value));
  }
  onFilterTextBoxChanged() {
    this.gridApi.setQuickFilter(
      (document.getElementById('filter-text-box') as HTMLInputElement).value
    );
  }
  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;
    

  }
  onCellClicked(e:any){
    
    const dialogRef = this.dialog.open(AppListDialogComponent,{width:'500px',data:{verifyId:e.data.candidtaes_v_Id}});
      dialogRef.afterClosed().subscribe(result => {
        
      })
  }

  backClick(){
    this.route.navigate(['master/expense-main/expense-managment'])
  }



}
