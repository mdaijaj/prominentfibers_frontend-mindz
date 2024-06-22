import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { GridApi, GridReadyEvent } from 'ag-grid-community';
import * as moment from 'moment';
import { EmpRegistrationService } from 'src/app/@shared/services/emp-registration.service';
import { LmsServiceService } from 'src/app/@shared/services/lms-service.service';
import { log } from 'console';
import { LeadService } from 'src/app/@shared/services/lead.service';
import { TrainingViewComponent } from 'src/app/@modules/purchase-main/purchase-inventory/department-budget/training-view/training-view.component';

@Component({
  selector: 'app-updated-adv-plainng-list',
  templateUrl: './updated-adv-plainng-list.component.html',
  styleUrls: ['./updated-adv-plainng-list.component.scss']
})
export class UpdatedAdvPlainngListComponent {

  rowClass: any;
  private gridApi!: GridApi<any>;
  rowData: any;
  getData: any
  getFormData: any
  public cellValue: any;
  printsend: boolean;
  Login_user_id: any = localStorage.getItem('EmpMainId');
  lead_id: any;
  // assignUserList: any[];


  constructor(private _empService: EmpRegistrationService,
    public dialog: MatDialog,
    private activateRoute: ActivatedRoute,
    private leadService: LeadService,
  ) {
    this.activateRoute.queryParams.subscribe(
      (res: any) => {
        this.lead_id=res.lead_generate_id
        if (res.traningid) {
          // this.getAll(res.traningid);
        }


      })
    this.rowClass = 'rowClass'

  }
  ngOnInit(): void {
    localStorage.setItem("employee_id:", "undefined");
    this.updatedListByLead_id();
  }

  updatedListByLead_id(){
    this.leadService.updatedListByLead_id(this.lead_id).subscribe((res:any)=>{
      
      this.rowData=res.result
      
    })

  }

  // getAll(id: any) {
  //   this._lmsService.assignUserListByTrainingID(id).subscribe((res: any) => {
  //     
  //     let arr = res.data;
  //     
  //     let assignUserList: any = [];
  //     for (let i = 0; i < arr.length; i++) {
  //       for(let j=0;j<arr[i].add_user.length;j++){
  //         assignUserList.push(arr[i].add_user[j])
  //       }
  //     }
  //     
  //     for (let a = 0; a < arr.length; a++) {
  //       
  //       for (let b = 0; b < arr[a].add_user.length; b++) {
  //         
  //         arr[a].add_user[b].start_date = arr[a].start_date
  //         arr[a].add_user[b].end_date = arr[a].end_date
  //         arr[a].add_user[b].status = arr[a].status
  //       }
  //     }
  //     this.rowData = assignUserList
  //   },
  //     (error) => {
  //       console.error('An error occurred:', error);
  //     })
  // }


  public columnDefs = [
    {
      headerName: 'Advance Plaining ID.',
      field: 'advance_id',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: "grid-cell-centered",
      flex: 1,
      minWidth: 150
    },
    {
      headerName: 'Intimation Date',
      field: 'intimation_date', sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: "grid-cell-centered",
      // cellRenderer: this.customCellRendererFunc   
    },
    {
      headerName: 'Follow Up Date',
      field: 'follow_up_date',
      sortable: true,
      columnNo: "1",
      minWidth: 150,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: "grid-cell-centered",
      flex: 1
      //  cellRenderer: this.customCellRendererFunc   
    },
    {
      headerName: 'CIF Received Date',
      field: 'cif_received_date',
      sortable: true,
      columnNo: "1",
      minWidth: 150,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: "grid-cell-centered",
      flex: 1
      
      // cellRenderer: this.customCellRendererFunc   
    },
    {
      headerName: 'Status',
      field: 'status',
      autoHeaderHeight: true,
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      filter: true,
      flex: 1,
      minWidth: 150,
 

    },
    {
      headerName: 'Comments',
      field: 'remarks',
      autoHeaderHeight: true,
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      filter: true,
      flex: 1,
      minWidth: 150,
    

    },
  ];
  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;
    
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
  onCellClicked(e: any) {
    
    const dialogRef = this.dialog.open(TrainingViewComponent, { width: '500px', data: { id: e.data.traning_id } });
    dialogRef.afterClosed().subscribe(result => {
      
    })
  }


}
