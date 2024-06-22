import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { GridApi, GridReadyEvent } from 'ag-grid-community';
import * as moment from 'moment';
import { AppListDialogComponent } from 'src/app/@shared/app-list-dialog/app-list-dialog.component';
import { EmpMasterService } from 'src/app/@shared/services/emp-master.service';
import { EmpRegistrationService } from 'src/app/@shared/services/emp-registration.service';
import { HeadService } from 'src/app/@shared/services/head.service';
import { LeadService } from 'src/app/@shared/services/lead.service';
import { RecruitService } from 'src/app/@shared/services/recruitment.service';
import { ItticketingService } from 'src/app/@shared/services/itticketing.service';
import { ToastrService } from 'ngx-toastr';
import { ExpenseDialogComponent } from '../../travel-request/expense-dialog/expense-dialog.component';
import { MyExpenseEditDialogComponent } from '../my-expense-edit-dialog/my-expense-edit-dialog.component';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
@Component({
  selector: 'app-my-expenses-list',
  templateUrl: './my-expenses-list.component.html',
  styleUrls: ['./my-expenses-list.component.scss'],
})
export class MyExpenseListComponent {
  private gridApi!: GridApi<any>;
  leadForm: FormGroup;
  rowData: any;
  rowData2: any;
  rowData1: any;
  personalIdData: any;
  propertyManager: any;
  text: any;
  firstLastName: any;
  rowClass: any;
  clicked: boolean = false;
  id: any;
  lead_id: any;
  getExpenseData: any;
  openEdit: boolean = false;
  expenseDataById: any;
  expense_id: any;
  tiketId: any;
  searchExpensed:any='';
  empId:any;
  myExpenceForm: any
  fromDate: number;
  toDate: number;
  selectVal: any;
  billableData: any;
  nonBillable: any;
  startDate: any;
  // expense_report_no: any = ''
  minFromDate: Date;
  maxFromDate: Date | null;
  minToDate: Date | null;
  maxToDate: Date;
  FromDateExpense: any;
  toDateExpense:any
  getExpenseRowData: any;
  constructor(
    private emp_master: EmpMasterService,
    private activeroute: ActivatedRoute,
    private empService: EmpRegistrationService,
    public route: Router,
    private fb: FormBuilder,
    private recruitService: RecruitService,
    private head: HeadService,
    private _itteketService: ItticketingService,
    private leadService: LeadService,
    private toast: ToastrService,
    public dialog: MatDialog
  ) {
    this.leadForm = this.fb.group({
      expense_report_no: new FormControl(null, [
        Validators.pattern('([0-9]){3}$'),
      ]),
      expense_type: new FormControl(),
      expense_desc: new FormControl(),
      expense_advance: new FormControl(),
      exp_start_date: new FormControl(null),
      expense_status: new FormControl(null),
    });
    this.myExpenceForm=this.fb.group({
      select_type:new FormControl(),
      
       start_date:new FormControl(),
       end_date:new FormControl(),
    })
    this.rowClass = 'rowClass';
    this.minFromDate = new Date(1900, 0, 1);
    this.maxFromDate = new Date();

    this.minToDate = new Date(1900, 0, 1);
    this.maxToDate = new Date();
  }

  
  fromDateChange(type: string, event: MatDatepickerInputEvent<Date>) {
    console.log(`${type}: ${event.value}`);
    this.minToDate = event.value;

    if (event.value !== null) {
      this.maxToDate = new Date(
        event!.value.getFullYear(),
        event!.value.getMonth(),
        event!.value.getDate() + 30
      );
    }
  }

  toDateChange(type: string, event: MatDatepickerInputEvent<Date>) {
    this.maxFromDate = event.value;

    if (event.value !== null) {
      this.minFromDate = new Date(
        event!.value.getFullYear(),
        event!.value.getMonth(),
        event!.value.getDate() - 30
      );
    }
  }
  ngOnInit(): void {
    
    this.head.clicked.subscribe((data) => {
      this.clicked = data;
    });
    // this.activeroute.queryParams.subscribe(params => {
    //   this.id = params;
    //   
    //   this.lead_id = this.id.lead_id;
    // });
    // this.leadService.getOpenHouseNew().subscribe((res:any) => {
    //   
    //   this.rowData = res.data;
    // })

    this.empId=localStorage.getItem('EmpMainId')
    console.log(this.empId);
    this.getListExpense();
    
    
  }

  openCreate() {
    this.route.navigate(
      ['master/expense-main/expense-managment/my-expenses/task-order-list'],
      { queryParams: { expense_create: "expense-create" } }
    );
  }
  openApprovelist(){
    this.route.navigate(
      ['master/expense-main/expense-managment/aproved-reject-user']
    
    );
  }

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
  getListExpense() {
    console.log(this.empId);
    let id=Number(this.empId)
    this._itteketService.getExpenselist(id).subscribe((res: any) => {
      this.getExpenseData = res.result.reverse();
      console.log(this.getExpenseData,'this.getExpenseData');
      
      const billable:any=[];
      const nonbillable:any=[];
      for(let i=0;i<=this.getExpenseData.length;i++){
if(this.getExpenseData[i]?.expense_type=="Billable"){
  billable.push(this.getExpenseData[i])
}
 else if(this.getExpenseData[i]?.expense_type=="Non-Billable"){
  nonbillable.push(this.getExpenseData[i])
}
      }
      console.log(billable,'billable');
      console.log(nonbillable,'nonbillable');
this.billableData=billable;
this.nonBillable=nonbillable
      
    });
  }
  editExpense(e: any,data:any) {
    console.log(e,'eee');
    console.log(data,'dataaaa');
    
    // 
    // this.expense_id=e;
    // 
    
    // this.openEdit = true;
    // 
    // this._itteketService.getByExpense(e).subscribe((res: any) => {
    //   this.expenseDataById = res.data;
    //   
    //   this.patchValueForm();
    // });
    

// const dialogRef
//       = this.dialog.open(MyExpenseEditDialogComponent, {
//          width: '45%',
//         // maxWidth: '100vw',
//         // maxHeight: '100vh',
//         // height: '100%',
//         // panelClass: 'full-screen-modal',
//         data: { myexpense_id:  e}
        
//       });
      
//     dialogRef.afterClosed().subscribe(result => {
      
//     });
if(data.status==="Pending" || data.status==='Open' || data.status==='Reject' || data.status==='Posted Reject' ||data.status==='Processing Reject'){
  this.route.navigate(['master/expense-main/expense-managment/my-expenses/update-my-expense'],{queryParams:{myexpense_id:e}});

}else{
  this.toast.warning("You Are Not Update This Stage")
}
  }

  patchValueForm() {
    const newDate = moment(this.expenseDataById?.createdAt).format(
      'DD/MM/YYYY'
    );
    this.leadForm.patchValue({
      expense_report_no: this.expenseDataById?.expense_report_no,
      expense_type: this.expenseDataById?.expense_type,
      expense_desc: this.expenseDataById?.expense_desc,
      expense_advance: this.expenseDataById?.expense_advance,
      exp_start_date: newDate,
      expense_status: this.expenseDataById?.status,
    });
  }
  submitForm(e: any) {
    let val = this.leadForm.value;
    
    let data = {
      expense_report_no: val.expense_report_no,
      expense_type: val.expense_type,
      expense_desc: val.expense_desc,
      expense_advance: val.expense_advance,
      exp_start_date: val.exp_start_date,
      status: val.expense_status,
    };

    
    this._itteketService.editByExpense( this.expense_id,data).subscribe(
      (res: any) => {
        
        this.toast.success('My Expense Updated Successfully..');
        // this.route.navigate(['master/itticket/expense-management/my-expenses']);
        this.getListExpense();
        this.openEdit=false;
      },
      (error: any) => {
        this.toast.error('Something Went TO Wrong');
      }
    );
  }

  viewClick(e:any){


const dialogRef
      = this.dialog.open(ExpenseDialogComponent, {
         width: '40%',
        // maxWidth: '100vw',
        // maxHeight: '100vh',
        // height: '100%',
        // panelClass: 'full-screen-modal',
        data: { myexpense_id:  e}
        
      });
      
    dialogRef.afterClosed().subscribe(result => {
      
    });
    // 
  }

  cancel(){
    this.openEdit=false;
  }
  backClick(){
    this.route.navigate(['master/expense-main/expense-management'])
  }

expense(){
  
}

  date1(e: any) {
    this.FromDateExpense= moment(e.value).format('YYYY-MM-DD');
    
  }
  date2(e: any) {
    this.toDateExpense= moment(e.value).format('YYYY-MM-DD');
    
  }
 
  searchticket()  {
    const data = {
      start_date:this.FromDateExpense,
      end_date:this.toDateExpense,
    }
  
    this._itteketService.filterPostExpenseDetail(this.empId,data)
    .subscribe((res: any) => {
      console.log(res,'resss');
      this.myExpenceForm.patchValue({
        select_type:null
      })
      this.getExpenseData=res.result.reverse();
     this.getExpenseRowData=res.result;
     console.log( this.getExpenseRowData,' this.getExpenseRowData');
     const billable:any=[];
     const nonbillable:any=[];
     for(let a=0;a<=this.getExpenseRowData.length;a++){
      if(this.getExpenseRowData[a]?.expense_type=="Billable"){
        billable.push(this.getExpenseRowData[a])
      }
       else if(this.getExpenseRowData[a]?.expense_type=="Non-Billable"){
        nonbillable.push(this.getExpenseRowData[a])
      }
     }
     this.billableData=billable;
     this.nonBillable=nonbillable


    },
    )
  }
  changeType(e:any){
    console.log(e,'eeeeeee');
    this.selectVal=e.value;
    if(this.selectVal==='Billable'){
// console.log();
this.getExpenseData=this.billableData;

    }else if(this.selectVal==='Non-Billable'){
      this.getExpenseData=this.nonBillable
 }
 console.log(this.getExpenseData,'this.getExpenseData inter');
    
  }
  openDraftlist(){
    this.route.navigate(
      ['master/expense-main/expense-managment/my-expenses/draft-my-expense']
    
    );
  }
}
