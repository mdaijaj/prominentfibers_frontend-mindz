import { Component,Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { ItticketingService } from 'src/app/@shared/services/itticketing.service';
import { LeadService } from 'src/app/@shared/services/lead.service';

@Component({
  selector: 'app-my-expense-edit-dialog',
  templateUrl: './my-expense-edit-dialog.component.html',
  styleUrls: ['./my-expense-edit-dialog.component.scss']
})
export class MyExpenseEditDialogComponent {
  leadForm:FormGroup;
  myExpenseId: any;
  expenseDataById: any;
  leadId: any;
  leadData: any;
  expenseDataView: any;

  constructor(private fb:FormBuilder,public dialog: MatDialogRef<MyExpenseEditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,private _itteketService: ItticketingService,private toast: ToastrService,private leadService:LeadService){
    this.leadForm = this.fb.group({
      expense_report_no: new FormControl(null),
      expense_type: new FormControl(null),
      expense_desc: new FormControl(null),
      expense_advance: new FormControl(null),
      exp_start_date: new FormControl(null),
      expense_status: new FormControl(null),
    });

    console.log(data,'data');
    this.leadId=data.lead_id;
    console.log(this.leadId,'this.leadId');
    
    this.myExpenseId=data.myexpense_id;
   console.log(this.myExpenseId,'this.myExpenseId')
    this.expenseDataView=data.myexpense_id_copy;
    console.log(this.expenseDataView,'this.expenseDataView');
    
    
    
  }
  ngOnInit(): void {
  this.getByExpense();
  this.getByLeadData();
  if(this.expenseDataView){
this.getByExpenseDetails();
  }
  }

  getByLeadData(){
    this.leadService.getByIdLead(this.leadId).subscribe((res: any) => {
      this.leadData = res.data;
      console.log(this.leadData,'this.leadData');
      
    })
  }

  getByExpense(){
    this._itteketService.getByExpense(this.myExpenseId).subscribe((res: any) => {
      this.expenseDataById = res.data;
      
      this.patchValueForm();
    });
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
  cancel(){

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

    
    this._itteketService.editByExpense( this.myExpenseId,data).subscribe(
      (res: any) => {
        
        this.toast.success('My Expense Updated Successfully..');
        // this.route.navigate(['master/itticket/expense-management/my-expenses']);
        // this.getListExpense();
        // this.openEdit=false;
        this.timeout();
      },
      (error: any) => {
        this.toast.error('Something Went TO Wrong');
      }
    );
  }

  timeout(){
    setTimeout(function(){
      window.location.reload();
   }, 2000);
  }


  getByExpenseDetails(){
    this._itteketService.getByExpense(this.expenseDataView).subscribe((res: any) => {
      this.expenseDataById = [res.data];
      console.log(this.expenseDataById,'this.expenseDataById');
      
    });
  }
  
}
