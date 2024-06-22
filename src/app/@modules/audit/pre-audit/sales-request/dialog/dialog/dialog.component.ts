import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { FormControl, Validators, FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { ConfigurationalmasterService } from 'src/app/@shared/services/configurationalmaster.service';
import { LeadService } from 'src/app/@shared/services/lead.service';
import { MatCalendarCellCssClasses } from '@angular/material/datepicker';
import { SalesRequestService } from 'src/app/@shared/services/salesrequest/sales-request.service';
// import { DropDownAnimation } from "./animations";
@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
  // standalone: true,
  // imports: [MatExpansionModule],

})
export class DialogComponent {
  panelOpenState = false;
  approval_form: any;
  FromDate: string;
  toDate: string;
  employee_id: any;
  author_course_id: any;
  traning_id: any;
  auditor_author_id: any;
  br_onTask_order: any;
  address: any;
  br: any;
  billing_add: any;
  state: any;
  associated_company: any;
  showAddress: boolean;
  city: any;
  country_name: any;
  eacodeData: any;
  statndardData: any;
  // daysSelected: any[] = [];
  auditor_details: any;
  auditor_dates: Date[];
  converted_Dates: any;
  isOpen = false;
  // isSelected:any;
  constructor(
    private salesRequest_:SalesRequestService,
    private fb: FormBuilder,
    private route: Router,
    private toster: ToastrService,
    private leadService: LeadService,
    private _configurationalMasterService: ConfigurationalmasterService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    console.log(data,"1111111");
    
    this.auditor_author_id = data.datas.audit_qualification_id;
    this.approval_fun();
  }
  ngOnInit() {
    this.getBookAuditorLeadwise()
    this.getallspa();
    this.getEacode();
    console.log('this.auditor_author_id', this.auditor_author_id);
    this.leadService
      .getbyidauditor(this.auditor_author_id)
      .subscribe((res: any) => {
        this.auditor_details = res.data;
        this.auditor_dates = this.auditor_details?.auditor_nomination_since;
        console.log('this.auditor_dates', this.auditor_dates);
        this.auditor_dates.forEach
        this.auditor_dates.forEach((res:any) =>
        {
          let date = new Date(res)
          this.converted_Dates.push(date);
          if(this.converted_Dates.length>1){

          }
        }

        );

      });

    this.leadService.getAllBR_onTASK_Order().subscribe((res: any) => {
      this.br_onTask_order = res.result;
      console.log('bt task details---', this.br_onTask_order);
      this.address =
        this.br_onTask_order[0]?.associated_company +
        '' +
        this.br_onTask_order[0]?.br_number;
      console.log('address---', this.address);
    });
  }
  getBookAuditorLeadwise(){

  }
  approval_fun() {
    this.approval_form = this.fb.group({
      associated_company: new FormControl(null, [Validators.required]),
      standard_audit: new FormControl(null, [Validators.required]),
      sector_audit: new FormControl(null, [Validators.required]),
      lead_auditor_cal: new FormControl(null, [Validators.required]),
    });
  }
  billingAddress(e: any) {
    console.log('event value', e.value);
    this.showAddress = true;
    this.leadService.get_ById_BR_Number(e.value).subscribe((res: any) => {
      (this.associated_company = res.data[0].associated_company),
        (this.br = res.data[0].br_number),
        (this.billing_add = res.data[0].street_address),
        (this.state = res.data[0].state_name);
      this.city = res.data[0].city_name;
      this.country_name = res.data[0].country_name;
    });
  }
  // isSelectedUnique: any = (event: any) => {
  //   const date =
  //     event.getFullYear() +
  //     '-' +
  //     ('00' + (event.getMonth() + 1)).slice(-2) +
  //     '-' +
  //     ('00' + event.getDate()).slice(-2);

  //   return this.daysSelected.find((x) => x == date) ? 'selected' : null;
  // };

  datesArray: Date[] = [
    new Date('2023-08-25'),
    new Date('2023-08-28'),
    new Date('2023-08-30'),
  ];

  isSelectedUnique = (cellDate: Date): string => {
    const date = cellDate.getDate();
    const month = cellDate.getMonth();
    const year = cellDate.getFullYear();

    if (
      this.datesArray.some(
        (d) => d.getDate() === date && d.getMonth() === month &&  d.getFullYear() === year
      )
    ) {
      return 'selected';
    }

    return '';
  };



  // select(event: any, calendar: any) {
  //   const date =
  //     event.getFullYear() +
  //     '-' +
  //     ('00' + (event.getMonth() + 1)).slice(-2) +
  //     '-' +
  //     ('00' + event.getDate()).slice(-2);
  //   const index = this.daysSelected.findIndex((x) => x == date);
  //   if (index < 0) this.daysSelected.push(date);
  //   else this.daysSelected.splice(index, 1);

  //   calendar.updateTodaysDate();
  // }
  getallspa() {
    this._configurationalMasterService.listAsses().subscribe((params: any) => {
      this.statndardData = params.data;
      console.log(this.statndardData, 'this.statndardData');
    });
  }
  getEacode() {
    this._configurationalMasterService.getEacode().subscribe((res: any) => {
      this.eacodeData = res.data;
      console.log(this.eacodeData, 'this.eacodeData');
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
    };

    this.leadService
      .book_auditor(this.auditor_author_id, data)
      .subscribe((res: any) => {});
  }
  now = new Date();
  year = this.now.getFullYear();
  month = this.now.getMonth();
  // day = this.now.getDay();
  date = this.now.getDate();
  maxDate = moment({
    year: this.year + 100,
    month: this.month,
    date: this.date,
  }).format('YYYY-MM-DD');
  minDate = moment({
    year: this.year - 0,
    month: this.month,
    date: this.date,
  }).format('YYYY-MM-DD');
  fromDate(e: any) {
    this.FromDate = moment(e.value).format('YYYY-MM-DD');
  }
  ToDate(e: any) {
    this.toDate = moment(e.value).format('YYYY/MM/DD');
  }
  daysSelected: any[] = 
  ["2023-09-19", "2023-09-20", "2023-09-21", "2023-09-22"]

  event: any=[];
  isSelected:any = (event: any) => {
    console.log(event,"event");
    const date = event.getFullYear()+"-" +("00" + (event.getMonth() + 1)).slice(-2) +"-" +("00" + event.getDate()).slice(-2);
    return this.daysSelected.find((x:any) => x == date) ? "selected" : null;
  };
  select(event: any, calendar: any) {
    console.log(event);
    console.log(calendar);
    const date = event.getFullYear()+"-"+("00" + (event.getMonth() + 1)).slice(-2) + "-" +("00" + event.getDate()).slice(-2);
    const index = this.daysSelected.findIndex(x => x == date);
    if (index < 0) this.daysSelected.push(date);
    else this.daysSelected.splice(index, 1);
    calendar.updateTodaysDate();
  }
}


