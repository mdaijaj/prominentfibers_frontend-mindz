import { Component, Inject } from '@angular/core';
import { FormControl, Validators, FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { LeadService } from 'src/app/@shared/services/lead.service';

@Component({
  selector: 'app-dialog-auditor-assign',
  templateUrl: './dialog-auditor-assign.component.html',
  styleUrls: ['./dialog-auditor-assign.component.scss']
})
export class DialogAuditorAssignComponent {
  approval_form: any;
  FromDate: string;
  toDate: string;
  employee_id: any;
  author_course_id: any;
  traning_id: any;
  auditor_author_id: any;
  br_onTask_order: any;

  constructor(
    private fb: FormBuilder,
    private route: Router,
    private toster: ToastrService,
    private leadService:LeadService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    
    this.auditor_author_id = data.data.data.audit_qualification_id
    // this.author_course_id = data.data.author_course_id
    // this.author_course_id = data.data.author_course_id
    // this.traning_id = data.data.traning_id
    this.approval_fun();
  }
  ngOnInit(){
    this.leadService.getAllBR_onTASK_Order().subscribe((res:any)=>{
      this.br_onTask_order=res.result
      
      
    })
  }
  approval_fun() {
    this.approval_form = this.fb.group({
      associated_company: new FormControl(null,[Validators.required]),
      start_date: new FormControl(null,[Validators.required]),
      end_date: new FormControl(null, [Validators.required]),
    });
  }
  reloadCurrentRoute() {
    let currentUrl = this.route.url;
    this.route.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.route.navigate([currentUrl]);
    });
  }
  submit(e: any) {
    
    const data = {
      auditor_author_Id: this.auditor_author_id,
      auditor_nomination_since: moment(e.start_date).format('YYYY-MM-DD'),
      auditor_valid_until: moment(e.end_date).format('YYYY-MM-DD'),
      status: 'Booked',
    }
    
    this.leadService.book_auditor(this.auditor_author_id,data).subscribe((res:any)=>{
      
      
    })
  }
  now = new Date();
  year = this.now.getFullYear();
  month = this.now.getMonth();
  // day = this.now.getDay();
  date = this.now.getDate();
  maxDate = moment({ year: this.year + 100, month: this.month, date: this.date }).format('YYYY-MM-DD');
  minDate = moment({ year: this.year - 0, month: this.month, date: this.date }).format('YYYY-MM-DD');
  fromDate(e: any) {
    this.FromDate = moment(e.value).format('YYYY-MM-DD');
  }
  ToDate(e: any) {
    this.toDate = moment(e.value).format('YYYY/MM/DD');
    
  }

}

