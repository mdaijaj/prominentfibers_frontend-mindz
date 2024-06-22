import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { log } from 'console';
import * as moment from 'moment';
import { LeadService } from 'src/app/@shared/services/lead.service';
import { MatCalendarCellClassFunction } from '@angular/material/datepicker';
import { DateAdapter } from '@angular/material/core';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-booking-date',
  templateUrl: './booking-date.component.html',
  styleUrls: ['./booking-date.component.scss']
})
export class BookingDateComponent {

  now = new Date();
  year = this.now.getFullYear();
  month = this.now.getMonth();
  // day = this.now.getDay();
  date = this.now.getDate();
  // maxDate = moment({ year: this.year, month: this.month, date: 29 }).format('YYYY-MM-DD');
  maxDate: Date; // This variable will hold the maximum date value.
  minDate = moment({ year: this.year - 0, month: this.month, date: this.date }).format('YYYY-MM-DD');
  inputValue: string; // Declare a property
  employees: any;
  leadAuditorNames: string;
  finalList: any = [];
  auditor: any = [];
  index: any;
  index_: any;
  indices: any;
  save_check: boolean = false;
  FromDate: string;
  toDate: string;
  wo_id: any;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
  public dialog: MatDialogRef<BookingDateComponent>,
    private leadService: LeadService,
    private activatedRoute:ActivatedRoute,
    private dateAdapter: DateAdapter<Date>) {
    this.maxDate = new Date();
    this.data = data
      this.activatedRoute.queryParams.subscribe((res:any)=>{
      this.wo_id=res.WO_ID;
    })
  }
  ngOnInit() {
    console.log(this.now, "now");
    console.log(this.year, "year");
    console.log(this.month, "month");
    console.log(this.date, "month");
    this.auditor = [
      { id: 5, dates: ["2023-10-12", "2023-10-13"] },
      { id: 10, dates: ["2023-10-15", "2023-10-16"] },
      { id: 32, dates: ["2023-10-11", "2023-10-28"] },
    ]
    console.log(this.data, "data")
    let output: any = [];
    // Iterate over the different arrays and extract the required data
    for (const key in this.data.data) {
      if (Array.isArray(this.data.data[key])) {
        output = output.concat(this.data.data[key]);
      }
    }
    console.log(output, "output");
    this.employees = output
    let dateArray: any = [];
    let mandays: any;
    // Loop through the 'aa' array and add the 'date' property
    for (let i = 0; i < this.employees.length; i++) {
      this.employees[i].Select_Date_ = dateArray;
      this.employees[i].noOfMandays = mandays;
    }
    console.log(this.employees,"data comming");

  }

  list: any = []
  listModi: any = [];
  logSelectedDate(employee: any) {
    this.list.push({ Id: employee.audit_qualification_id, type: employee.type, employeeName: employee.auditor_first_name, Date: employee.selectedDate })
    // console.log({Id:employee.emp, employeeName: employee.employeeName, Date: employee.selectedDate });
    const uniqueData: any = [];
    this.list.forEach((item: any) => {
      const existingItemIndex = uniqueData.findIndex((data: any) => data.Id === item.Id);
      if (existingItemIndex !== -1) {
        // If the data with the same "Id" already exists, replace it with the new data
        uniqueData[existingItemIndex] = item;
      } else {
        // If the data with a new "Id" is encountered, add it to the uniqueData array
        uniqueData.push(item);
      }
    });
    console.log(uniqueData);
    this.listModi = uniqueData
    
  }
  save() {
    this.save_check = true
    console.log(this.employees);
    // for (let a = 0; a < this.employees.length; a++) {
    //   this.employees[a].noOfMandays = 2
    // }
    let output: any = {};
    // Iterate through the input array and categorize objects into the output object
    this.employees.forEach((item: any) => {
      if (!output[item.type]) {
        output[item.type] = [];
      }
      output[item.type].push(item);
    });
    output.br_number = this.data.data.br_number,
    output.lead_genration_id = this.data.data.lead_genration_id,
    output.status= "Blocked Auditor",
    output.workOrdercomponentId=this.wo_id
    console.log(output);
    this.dialog.close(output)
  }
  dateOd(data: any) {
    console.log(data.emp, "od");
  }
  daysSelected: any[] = [];
  commingData: any[] = [
    // "2023-10-12",
    // "2023-10-13",
  ];

  isSelected: any = (event: any) => {
    console.log("isSel");
    console.log(this.commingData, "comming");
    console.log(event, "comming");


    const date =
      event.getFullYear() +
      "-" +
      ("00" + (event.getMonth() + 1)).slice(-2) +
      "-" +
      ("00" + event.getDate()).slice(-2);
    console.log(date, "date");

    return this.daysSelected.find(x => x == date) ? "selected" : null;
  };
  emp_id(id: any, i: any) {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Month is zero-based, so we add 1 and pad with 0 if necessary.
    const day = String(currentDate.getDate()).padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;
    const today = this.dateAdapter.today();
    const date1: any = new Date(formattedDate);
    const date2: any = new Date(id.valid);
    const timeDifference: any = date2 - date1;
    const daysDifference = timeDifference / (1000 * 60 * 60 * 24);
    this.maxDate = new Date(today);
    this.maxDate.setDate(today.getDate() + daysDifference);
    this.daysSelected = []
    this.index_ = i
    const tt = ["2023-10-12", "2023-10-13"]
    const event = new Date(); // Replace this with your event data
    const result = this.isSelected(event);
  }

  select(event: any, calendar: any, emp: any, id: any) {
    let indices = emp.map((element: any, index: any) => index);
    this.indices = indices
    const dates: any = [];
    const date =
      event.getFullYear() +
      "-" +
      ("00" + (event.getMonth() + 1)).slice(-2) +
      "-" +
      ("00" + event.getDate()).slice(-2);
    console.log(date, "date");
    const index = this.daysSelected.findIndex(x => x == date);
    console.log(index, "index");
    if (index < 0) this.daysSelected.push(date);
    else this.daysSelected.splice(index, 1);
    // this.leadAuditorNames = this.daysSelected.toString()
    console.log(this.daysSelected, "daysSelected");
    emp[this.index_].Select_Date_ = (this.daysSelected)
    this.leadAuditorNames = emp
    console.log(this.leadAuditorNames, "emp");
    calendar.updateTodaysDate();
    this.finalList = emp
    // this.commingData = ["2023-10-12", "2023-10-13"]
    console.log(this.commingData, "comming");
  }



  fromDate(e: any) {
    this.FromDate = moment(e.value).format('YYYY-MM-DD');
  }
  ToDate(e: any) {
    this.toDate = moment(e.value).format('YYYY/MM/DD');

  }


  dateClass: MatCalendarCellClassFunction<Date> = (cellDate, view) => {

    console.log(cellDate, view,);

    // Only highligh dates inside the month view.
    if (view === 'month') {
      const date = cellDate.getDate();

      // Highlight the 1st and 20th day of each month.
      return (date === 1 || date === 20) ? 'example-custom-date-class' : '';
    }

    return '';
  }
}

