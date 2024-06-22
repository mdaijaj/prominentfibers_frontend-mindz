import { Component } from '@angular/core';
import { CellValueChangedEvent, GridApi, GridReadyEvent } from 'ag-grid-community';
import { ItrDilogComponent } from './itr-dilog/itr-dilog.component';
import { ItrActionComponent } from './itr-action/itr-action.component';
import { Router } from '@angular/router';
import { HrServiceService } from 'src/app/@shared/services/hr-service.service';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-itr-deduction',
  templateUrl: './itr-deduction.component.html',
  styleUrls: ['./itr-deduction.component.scss']
})
export class ItrDeductionComponent {
  rowClass: any;
  AddTypeData:any;
  private gridApi!: GridApi<any>;
  public rowData : any;
  year: number;

  public month =[
    {id:1, value:"January"},
    {id:2,value:"February"},
    {id:3,value:"March"},
    {id:4,value:"April"},
    {id:5,value:"May"},
    {id:6,value:"June"},
    {id:7,value:"July"},
    {id:8,value:"August"},
    {id:9,value:"September"},
    {id:10,value:"October"},
    {id:11,value:"November"},
    {id:12,value:"December"},
  ]
  public selectmonth ='';
  ItrDeductionForm: FormGroup;
  depList: any;
  filterInput: any;

  constructor(private route: Router, private hrServies: HrServiceService,
    private toast: ToastrService,public dialog: MatDialog, private fb: FormBuilder,

   ) {
   this.rowClass = 'rowClass';
  this.getAllItr()

  this.ItrDeductionForm = this.fb.group({
    year: new FormControl(null, [Validators.required]),
    month: new FormControl(null, [Validators.required]),
    update: new FormControl(null, [Validators.required]),
  })

 }

 ngOnInit(): void {
  this.getAllDep()
  this.getAllItr()
  const d = new Date();
  this.year = d.getFullYear();
  const d1 = new Date();
let name = this.month[d1.getMonth()];

this.selectmonth = name.value;
this.ItrDeductionForm.patchValue({
  year: this.year,
  month: this.selectmonth,
})

 }
  public columnDefs = [
    {
      headerName: 'Sr No.',
      field: 'itrdeduction_Id',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: "grid-cell-centered",
      flex:1,
      minWidth:150,
    },
    {
      headerName: 'EmpManualCode',
      field: 'Eligibility',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: "grid-cell-centered",
      valueFormatter: 'JSON.parse(value)',
      flex:1,
      minWidth:150,
    },
    {
      headerName: 'Name',
      field: 'Eligibility',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: "grid-cell-centered",
      valueFormatter: 'JSON.parse(value)',
      flex:1,
      minWidth:150,
    },
    {
      headerName: 'Designation',
      field: 'Eligibility',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: "grid-cell-centered",
      valueFormatter: 'JSON.parse(value)',
      flex:1,
      minWidth:150,
    },
    {
      headerName: 'Department',
      field: 'Eligibility',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: "grid-cell-centered",
      valueFormatter: 'JSON.parse(value)',
      flex:1,
      minWidth:150,
    },
    {
      headerName: 'JoiningDate',
      field: 'Eligibility',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: "grid-cell-centered",
      valueFormatter: 'JSON.parse(value)',
      flex:1,
      minWidth:150,
    },
    {
      headerName: 'Eligibility',
      field: 'Eligibility',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: "grid-cell-centered",
      valueFormatter: 'JSON.parse(value)',
      flex:1,
      minWidth:150,
    },
    {
      headerName: 'Submitted',
      field: 'Submitted',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: "grid-cell-centered",
      valueFormatter: 'JSON.parse(value)',
      flex:1,
      minWidth:150,
    },
    {
      headerName: 'Update',
      field: 'itr_deduction_update',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: "grid-cell-centered",
      valueFormatter: 'JSON.parse(value)',
      flex:1,
      minWidth:150,
      editable: true,

    },
    {
      headerName: 'Actions',
      field: 'itrdeduction_Id', sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      flex:1,
      minWidth:150,
      cellRenderer: ItrActionComponent,
      cellRendererParams: {
        className: 'mat-blue',
        hideRequestButton: true,
        hideDetailsButton: false,
        hideDownloadIcon: false,
        showCustomIcon: false,
      },
      cellClass: "grid-cell-centered",
    },

  ];

  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;


  }

  onCellValueChanged(event: CellValueChangedEvent) {
    // let id1 = event.data.states_id;
    let id2 = event.data.itrdeduction_Id;
  let val = event.newValue
    //  --------------- change on cell -------------------


    let sta = event.data;


    // if(val==event.data.update){
      this.hrServies.updateItrDeduct(id2, sta).subscribe(
        (res: any) => {

          this.toast.success(res.message)
        }, (err: any) => {

        });
    // }
  }

  onPageSizeChanged() {
    var value = (document.getElementById('page-size') as HTMLInputElement)
      .value;
    this.gridApi.paginationSetPageSize(Number(value));
  }

  onFilterTextBoxChanged(e:any) {

   let data = this.gridApi.setQuickFilter(
    e.value
    );


  }

  onCellClicked(e: any) {

    if (e.column.colId === "itr_deduction_update") return;
    const dialogRef = this.dialog.open(ItrDilogComponent, { width: '400px', data: { id: e.data.itrdeduction_Id}});
    dialogRef.afterClosed().subscribe(result => {

    })
  }

  getAllItr(){
    this.hrServies.getAllItr().subscribe((res:any)=>{
      this.rowData = res.data;


    })
  }

  getAllDep(){
    this.hrServies.getDepList().subscribe((res:any)=>{
      this.depList = res.data;
    })
  }
  onBtnExportDataAsExcel() {
    this.gridApi.exportDataAsExcel({
      processRowGroupCallback: rowGroupCallback,
    });
  }
}

function rowGroupCallback(params:any) {
return params.node.key;
}
